import { Injectable } from '@angular/core';
import {
  Router, CanActivate,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../_services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth_service: ApiService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
  {
    const user_logged = this.auth_service.currentUserValue;

    if (user_logged) 
      // authorised so return true
      return true;

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { url: state.url } });
    return false;
  }
}
