import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { ToastService } from '../../_services/toast.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  cur_user = null;

  constructor(private api: ApiService,
              public toast: ToastService)
  {
    this.api.cur_usr.subscribe(x => this.cur_user = x);
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout()
  {
    this.api.logout();

    this.toast.show('Logout Succesful',
      {
        classname: 'bg-success text-light',
        delay: 2000,
        autohide: true,
        headertext: 'User Logout Successfully'
      });
  }

}
