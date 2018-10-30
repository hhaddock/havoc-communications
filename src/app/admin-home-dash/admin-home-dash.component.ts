import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home-dash',
  templateUrl: './admin-home-dash.component.html',
  styleUrls: ['./admin-home-dash.component.scss']
})
export class AdminHomeDashComponent implements OnInit {

  showCreateUser: boolean = false
  contentTitle: string = ''

  constructor() { }

  ngOnInit() {
  }

  showContent(id: number) {
    switch (id) {
      case 0:
      this.showCreateUser = true
      this.contentTitle = '~ Create User'
      break
      default:
      this.showCreateUser = false
      this.contentTitle = ''
      break
    }
  }

}
