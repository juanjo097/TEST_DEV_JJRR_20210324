import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../_services/api.service';
import { ToastService } from '../../_services/toast.service';
import CryptoJS from 'crypto-js';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  //form group type
  form_login: FormGroup;
  loading = false;
  submitted = false;
  return_url: string;
  error: string;

  constructor(
    private form_builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public toast: ToastService
  )
  {
    // if user object not exists return to default path
    if (this.api.currentUserValue)
      this.router.navigate(['/']);
  }


  ngOnInit()
  {
    this.form_login = this.form_builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url tio the snapshot in url
    this.return_url = this.route.snapshot.queryParams['url'] || '/';

  }

  // helper to get better way to get access to form fields<<
  get f()
  {
    return this.form_login.controls;
  }

  onSubmit()
  {
    this.submitted = true;

    // return invalid form rsp
    if (this.form_login.invalid)
        return;

    // hash the password to sha256
    let hash = CryptoJS.SHA256(this.f.password.value).toString();
    
    this.loading = true;

    this.api.login(this.f.username.value, hash).pipe(first()).subscribe(
      _rsp =>
      {
        this.router.navigate([this.return_url]);
        this.toast.show('Login Succesful',
          {
            classname: 'bg-success text-light',
            delay: 4000,
            autohide: true,
            headertext: 'User Logged Successfully'
          });
      },
      _err =>
      {
        this.error = _err;
        console.log(this.error);
        this.toast.show(this.error['error'],
          {
            classname: 'bg-danger text-light',
            delay: 4000,
            autohide: true,
            headertext: 'Error Login'
          });
        this.loading = false;
      }
    )
    
  }

}
