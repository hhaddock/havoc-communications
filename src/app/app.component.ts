import { Component } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Havoc Communications Platform';
  sideNavOpened: Boolean
  isLoggedIn: Boolean
  roomNumber: Number
}
