import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../_services/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Array<any>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCustomers().subscribe(
      _rsp =>
      {
        console.log(_rsp);
      },
      _err =>
      {
        console.error(_err);
      });
  }

}
