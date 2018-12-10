import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { setDefaultService } from 'selenium-webdriver/chrome';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }

  public userData: {
    session_token: string,
    username: string,
    first_name: string,
    last_name: string,
    fk_permission_code: number,
    permission_level: string
  }

  private apiPath: string = 'https://jsonplaceholder.typicode.com/'
  private apiUrl: string = 'https://api.havoc-communications.com/'

  constructor(private http: HttpClient, private https: Http) {
    this.userData = JSON.parse(localStorage.getItem('user'))
  }

  getAPIurl(): string {
    return this.apiUrl;
  }

  getHttpHeaders(): HttpHeaders {
    return this.httpOptions.headers
  }

  login(usrnm: string, psswd: string): any {
    const user = {
      username: usrnm,
      password: psswd
    }
    return this.http.post(this.apiUrl + 'user/login', JSON.stringify(user), this.httpOptions)
  }

  createUser(n_user: any): any {
    const user = {
      username: this.userData.username,
      session_token: this.userData.session_token,
      new_user: n_user
    }
    return this.http.post(this.apiUrl + 'user_admin/create_user', JSON.stringify(user), this.httpOptions)
  }

  getUserStatus(): any {
    const user = localStorage.getItem('user')
    return this.http.post(this.apiUrl + 'user/check_status', user, this.httpOptions)
  }

  logout(): any {
    const user = localStorage.getItem('user')
    return this.http.post(this.apiUrl + 'user/logout', user, this.httpOptions)
  }

  getFriends() {
    return this.http.get(this.apiPath + 'users')
  }

  getFriendDetails(friendId) {
    return this.http.get(this.apiPath + 'users/' + friendId)
  }

  isEmpty(str: string): boolean {
    const re = /^[\w!@#$%^&*.]+$/
    return !re.test(str)
  }

  isEmail(str: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(str)
  }

  setLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.userData))
  }

  clearUserData() {
    this.userData.first_name = ''
    this.userData.last_name = ''
    this.userData.session_token = ''
    this.userData.username = ''
    this.userData.fk_permission_code = 0
    this.userData.permission_level = ''
  }
}
