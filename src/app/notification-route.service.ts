import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { UserRouteService } from './user-route.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationRouteService {

  private httpOps = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }
  private url: string

  constructor(private userRoute: UserRouteService, private http: HttpClient, private dataServe: DataService) {
    this.url = this.dataServe.getAPIurl()
  }

  getAll(): any {
    const user = this.userRoute.getUserAndToken()
    return this.http.post(this.url + 'notification/get_notifications', JSON.stringify(user), this.httpOps)
  }
}
