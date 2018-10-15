import { Component } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLoggedIn: Boolean = false

  ngOnInit() {
    // this will be to auto-load the login/register
    // page based on session status
    if (!this.isLoggedIn) {
      // load login component (idk how rn)
    }
  }
}
