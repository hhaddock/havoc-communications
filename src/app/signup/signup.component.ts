import { Component, OnInit } from '@angular/core';

import { AdminHomeDashComponent } from '../admin-home-dash/admin-home-dash.component';
import { DataService } from '../data.service';
import { UserRouteService } from '../user-route.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  permLevels: { value: number, title: string }[] = [
    { value: 1, title: 'User' },
    { value: 5, title: 'Moderator' },
    { value: 10, title: 'Administrator' }
  ]
  pass_conf: string = ''

  signupData: {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    fk_permission_code: number
  } = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    fk_permission_code: 1
  }

  constructor(public ahdc: AdminHomeDashComponent, public dataServe: DataService, public userRoute: UserRouteService) { }

  ngOnInit() {
  }

  confirm() {
    if (this.inputsArentEmpty()) {
      if (this.dataServe.isEmail(this.signupData.email)) {
        if (this.signupData.password == this.pass_conf) {
          this.userRoute.create(this.signupData).subscribe(res => {
            if (res.status == 200) {
              console.log('User created!')
            } else {
              console.log('User NOT created')
              console.log(res)
            }
          });
        } else {
          console.log('Passwords dont match')
        }
      } else {
        console.log('Invalid email')
      }
    } else {
      console.log('Inputs are empty')
    }
  }

  cancel() {
    this.ahdc.showContent(-1)
  }

  permLevelChanged(event: any) {
    this.signupData.fk_permission_code = event.value
  }

  inputsArentEmpty(): boolean {
    let flag = true
    flag = (!this.dataServe.isEmpty(this.signupData.first_name) && !this.dataServe.isEmpty(this.signupData.last_name) &&
            !this.dataServe.isEmpty(this.signupData.username) && !this.dataServe.isEmpty(this.signupData.email) &&
            !this.dataServe.isEmpty(this.signupData.password) && !this.dataServe.isEmpty(this.pass_conf))
    return flag;
  }

}
