import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserRouteService {

  private httpOps = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }
  private url: string
  private user: {
    session_token: string,
    username: string,
    first_name: string,
    last_name: string,
    fk_permission_code: number,
    permission_level: string
  }
  //  { session_token: string, username: string, first_name: string, last_name: string, fk_permission_code: number, permission_level: string }

  constructor(private dataServe: DataService, private http: HttpClient) {
    this.url = this.dataServe.getAPIurl()
    //  this.httpOps.headers = this.dataServe.getHttpHeaders()
    this.updateFromLocalStorage()
  }

  /** Permission Code: 1 **/
  login(usrnm: string, psswd: string): any {
    const data = { username: usrnm, password: psswd }
    return this.http.post(this.url + 'user/login', JSON.stringify(data), this.httpOps)
  }

  logout(): any {
    const data = { username: this.user.username, session_token: this.user.session_token }
    return this.http.post(this.url + 'user/logout', JSON.stringify(data), this.httpOps)
  }

  status(): any {
    this.updateFromLocalStorage()
    console.log(this.user)
    const data = { username: this.user.username, session_token: this.user.session_token }
    return this.http.post(this.url + 'user/check_status', JSON.stringify(data), this.httpOps)
  }
  /** Permission Code: 1 **/

  /** Permission Code: 10 **/
  create(new_user: any): any {
    const data = {
      username: this.user.username,
      session_token: this.user.session_token,
      new_user: new_user
    }
    return this.http.post(this.url + 'user_admin/create_user', JSON.stringify(data), this.httpOps)
    //  { status: number, data: string }
  }

  getAll(): any {
    const data = { username: this.user.username, session_token: this.user.session_token }
    return this.http.post(this.url + 'user_admin/get_all_users', JSON.stringify(data), this.httpOps)
    //  { 
    //    status: number, 
    //    data: [{ 
    //      email: string, 
    //      username: string, 
    //      first_name: string, 
    //      last_name: string, 
    //      permission_code: number, 
    //      permission_level: string 
    //    }]
    //  }
  }

  update(fields: any): any {
    const data = {
      username: this.user.username,
      session_token: this.user.session_token,
      fields: fields
    }
    return this.http.post(this.url + 'user_admin/update_user', JSON.stringify(data), this.httpOps)
    //  { status: number, data: string }
  }

  delete(usrnm: string): any {
    const data = {
      username: this.user.username,
      session_token: this.user.session_token,
      delete_user: usrnm
    }
    return this.http.post(this.url + 'user_admin/delete_user', JSON.stringify(data), this.httpOps)
    //  { status: number, data: string }
  }

  getLogs(range: number = null): any {
    const data = {
      username: this.user.username,
      session_token: this.user.session_token,
      range: range
    }
    return this.http.post(this.url + 'user_admin/get_request_logs', JSON.stringify(data), this.httpOps)
    //  { 
    //    status: number, 
    //    data: [{ 
    //      log_id: number, 
    //      datetime_requested: string, 
    //      ip_address: string, 
    //      route_called: string, 
    //      fk_username: number, 
    //      body: { username: string, session_token: string, range: number },
    //      headers: string
    //    }]
    //  }
  }
  /** Permission Code: 10 **/

  updateInLocalStorage(): void {
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  updateFromLocalStorage(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  setUser(user: any): void {
    this.user = user
  }

  getPermissionCode(): number {
    return this.user.fk_permission_code
  }

  clearUser(): void {
    this.user = {
      session_token: 'a',
      username: 'b',
      first_name: 'c',
      last_name: 'd',
      fk_permission_code: 0,
      permission_level: 'e'
    }
    this.updateInLocalStorage()
  }

  getUserAndToken(): any {
    const data = {
      username: this.user.username,
      session_token: this.user.session_token
    }
    return data
  }

  getRole(): string {
    return this.user.permission_level.toUpperCase()
  }

  getUsername(): string {
    return this.user.username
  }
}
