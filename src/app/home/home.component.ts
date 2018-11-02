import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { UserRouteService } from '../user-route.service';
import { NotificationRouteService } from '../notification-route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: { username: string, session_token: string, perm_code: number, perm_level: string } = { username: '', session_token: '', perm_code: 0, perm_level: '' }
  isAdmin: boolean = false
  isMod: boolean = false

  constructor(public dataServe: DataService, public userRoute: UserRouteService, public notifRoute: NotificationRouteService) {
    //this.dataServe.userData = JSON.parse(localStorage.getItem('user'))
    switch (this.userRoute.getPermissionCode()) {
      case 10:
      this.isAdmin = true
      this.isMod = true
      break
      case 5:
      this.isMod = true
      break
    }
  }

  ngOnInit() {
    this.notifRoute.getAll().subscribe(res => {
      console.log(res)
    })
  }

}
