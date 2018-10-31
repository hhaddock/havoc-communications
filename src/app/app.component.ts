import { Component } from '@angular/core';

import { DataService } from './data.service';
import { UserRouteService } from './user-route.service';
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

  constructor(public dataServe: DataService, public userRoute: UserRouteService) {
    this.checkUserStatus()
  }

  logout() {
    this.userRoute.logout().subscribe(res => {
      if (res.status == 200 && res.data == "OK") {
        this.userIsActive = false
        this.userRoute.clearUser()
      }
    });
  }

  checkUserStatus() {
    if (localStorage.getItem('user') != null) {
      this.userRoute.status().subscribe(res => {
        if (res.status == 200 && res.data == "OK") {
          this.userIsActive = true
        } else {
          this.userIsActive = false
        }
      });
    } else {
      this.userIsActive = false
    }
  }
}
