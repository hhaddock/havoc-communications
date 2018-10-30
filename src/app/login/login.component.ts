import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: { username: string, password: string } = { username: '', password: '' }
  isLoginFilled: boolean = false

  constructor(private dataServe: DataService, private AppC: AppComponent) {

  }

  ngOnInit() {
  }

  login() {
    this.dataServe.login(this.loginData.username, this.loginData.password)
    .subscribe(res => {
      if (res.status == 200) {
        this.dataServe.userData = res.data
        this.dataServe.setLocalStorage()
        this.AppC.userIsActive = true
      }
    });
  }

  signup() {

  }

  loginFormFilled() {
    this.isLoginFilled = (!this.dataServe.isEmpty(this.loginData.username) && !this.dataServe.isEmpty(this.loginData.password))
  }

}
