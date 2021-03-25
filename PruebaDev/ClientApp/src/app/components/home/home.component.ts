import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../_services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent
{
  cur_user: null;
  user_name: null;

  constructor(private router: Router,
    private api: ApiService) {
    this.api.cur_usr.subscribe(x => this.cur_user = x);

    this.user_name = this.cur_user.user.username

  }

  logout()
  {
    this.api.logout();
    this.router.navigate(['/login']);
  }
}
