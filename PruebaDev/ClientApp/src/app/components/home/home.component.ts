import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../_services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent
{
  user_name: null;

  constructor(private router: Router,
    private api: ApiService)
  {
    let cur_user = this.api.currentUserValue;
    this.user_name = cur_user.user.username;
  }

  logout()
  {
    this.api.logout();
    this.router.navigate(['/login']);
  }
}
