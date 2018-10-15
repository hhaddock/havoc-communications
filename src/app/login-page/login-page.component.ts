import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  title: String
  constructor() { 
    console.log('[login-page] constructor()')
    this.title = 'blah'
  }

  ngOnInit() {
    console.log('[login-page] ngOnInit()')
  }

}
