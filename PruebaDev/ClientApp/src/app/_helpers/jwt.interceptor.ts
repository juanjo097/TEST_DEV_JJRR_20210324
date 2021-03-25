import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '../_services/api.service';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private api: ApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    if (request.headers.get("skip")) {
      console.log("ENTRA EN EL EXCLUDE");

      let headers = request.headers
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('User-Agent', 'PostmanRuntime/7.13.0');

      const cloneReq = request.clone({ headers });

      return next.handle(cloneReq);
    }
      
    // add authorization header with jwt token if available
    let currentUser = this.api.currentUserValue;

    if (currentUser && currentUser.token)
    {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}

