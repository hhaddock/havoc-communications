import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRouteService } from './user-route.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationRouteService {

  constructor(private userRoute: UserRouteService, private http: HttpClient) { }
}
