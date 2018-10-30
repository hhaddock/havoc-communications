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
  userData: { username: string, session_token: string, perm_code: number, perm_level: string } = { username: '', session_token: '', perm_code: 0, perm_level: '' }

  constructor(public dataServe: DataService) {
    //this.dataServe.userData = JSON.parse(localStorage.getItem('user'))
    this.checkUserStatus()
  }

  logout() {
    this.dataServe.logout().subscribe(res => {
      if (res.status == 200 && res.data == "OK") {
        this.userIsActive = false
        this.dataServe.clearUserData()
        this.dataServe.setLocalStorage()
      } else {
        this.userIsActive = false
        this.dataServe.clearUserData()
        this.dataServe.setLocalStorage()
      }
    });
  }

  checkUserStatus() {
    this.dataServe.getUserStatus().subscribe(res => {
      if (res.status == 200 && res.data == "OK") {
        this.userIsActive = true
      } else {
        this.userIsActive = false
      }
    });
  }
}
