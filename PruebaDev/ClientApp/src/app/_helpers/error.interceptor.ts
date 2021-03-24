import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from '../_services/api.service';
import { ToastService } from '../_services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
  constructor(private api: ApiService,
              private toast: ToastService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request).pipe(catchError(err =>
    {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.api.logout();
        this.toast.show( 'Please Login' ,
          {
            classname: 'bg-danger text-light',
            delay: 4000,
            autohide: true,
            headertext: 'Token Expiration'
          });

      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
