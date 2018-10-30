import { Component } from '@angular/core';

import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'havoc-communications'
  userIsActive: boolean

  constructor(private dataServe: DataService) {
    this.checkUserStatus()
  }

  logout() {
    let user: any = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.dataServe.logout().subscribe(res => {
        if (res.status == 200 && res.data == "OK") {
          this.userIsActive = false
          user.username = ""
          user.session_token = ""
          localStorage.setItem('user', JSON.stringify(user))
        } else {
          this.userIsActive = false
        }
      });
    }
  }

  checkUserStatus() {
    let user = localStorage.getItem('user')
    if (user) {
      this.dataServe.getUserStatus().subscribe(res => {
        console.log(res)
        if (res.status == 200 && res.data == "OK") {
          this.userIsActive = true
        } else {
          this.userIsActive = false
        }
      });
    }
  }

  _setUserLocalStorage() {
    const user = {
      username: 'test',
      password: '1234'
    }

    localStorage.setItem('user', JSON.stringify(user))
  }
}
