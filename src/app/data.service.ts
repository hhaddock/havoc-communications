import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiPath: string = 'https://jsonplaceholder.typicode.com/'

  constructor(private http: HttpClient) { }

  getUserStatus() {
    
  }

  getFriends() {
    return this.http.get(this.apiPath + 'users')
  }

  getFriendDetails(friendId) {
    return this.http.get(this.apiPath + 'users/' + friendId)
  }
}
