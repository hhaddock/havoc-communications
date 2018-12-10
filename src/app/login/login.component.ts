import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { DataService } from '../data.service';
import { UserRouteService } from '../user-route.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: { username: string, password: string } = { username: '', password: '' }
  isLoginFilled: boolean = false

  constructor(private dataServe: DataService, private AppC: AppComponent, private userRoute: UserRouteService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  login() {
    if (this.loginFormFilled()) {
      this.userRoute.login(this.loginData.username, this.loginData.password)
      .subscribe(res => {
        console.log(res)
        if (res.status == 200) {
          this.userRoute.setUser(res.data.user_details)
          this.userRoute.updateInLocalStorage()
          this.AppC.userIsActive = true
        } else {
          this.snackBar.open(res.status, res.data, {
            duration: 3000
          });
        }
      });
    } else {
      this.snackBar.open('All inputs required', 'ERROR', {
        duration: 3000
      });
    }
  }

  loginFormFilled() {
    return (!this.dataServe.isEmpty(this.loginData.username) && !this.dataServe.isEmpty(this.loginData.password))
  }

}
