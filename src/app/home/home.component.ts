import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: { username: string, session_token: string, perm_code: number, perm_level: string } = { username: '', session_token: '', perm_code: 0, perm_level: '' }
  isAdmin: boolean = false
  isMod: boolean = false

  constructor(public dataServe: DataService) {
    //this.dataServe.userData = JSON.parse(localStorage.getItem('user'))
    switch (this.dataServe.userData.fk_permission_code) {
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
  }

}
