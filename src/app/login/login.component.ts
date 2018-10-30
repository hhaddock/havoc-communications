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
  signupData: any
  userData: { session_token: string, username: string } = { session_token: '', username: '' }

  constructor(private dataServe: DataService, private AppC: AppComponent) {

  }

  ngOnInit() {
  }

  login() {
    this.dataServe.login(this.loginData.username, this.loginData.password)
    .subscribe(res => {
      if (res.status == 200) {
        const data = res.data
        this.userData.session_token = data.session_token
        this.userData.username = data.username
        localStorage.setItem('user', JSON.stringify(this.userData))
        this.AppC.userIsActive = true
      }
    });
  }

}
