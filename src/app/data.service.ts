import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

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

  private apiPath: string = 'https://jsonplaceholder.typicode.com/'
  private apiUrl: string = 'https://dev.baked.kitty:12345/'

  constructor(private http: HttpClient, private https: Http) { }

  login(usrnm: string, psswd: string): any {
    let user = {
      username: usrnm,
      password: psswd
    }
    return this.http.post(this.apiUrl + 'user/login', JSON.stringify(user), this.httpOptions)
  }

  getUserStatus(): any {
    let user = localStorage.getItem('user')
    return this.http.post(this.apiUrl + 'user/check_status', user, this.httpOptions)
  }

  logout(): any {
    let user = localStorage.getItem('user')
    return this.http.post(this.apiUrl + 'user/logout', user, this.httpOptions)
  }

  getFriends() {
    return this.http.get(this.apiPath + 'users')
  }

  getFriendDetails(friendId) {
    return this.http.get(this.apiPath + 'users/' + friendId)
  }
}
