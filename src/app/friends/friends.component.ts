import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  tFriends: any = []
  friends: any = []
  isSearching: boolean = false
  searchTerm: string = ''

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getFriends().subscribe(
      data => this.tFriends = this.friends = data
    );
  }

  showSearchInput(): void {
    this.isSearching = !this.isSearching
    if (!this.isSearching) {
      this.friends = this.tFriends
    }
  }

  removeFriend(id): void {
    this.friends.splice(id - 1, 1)
    for (let i = 0; i < this.friends.length; i++) {
      this.friends[i].id = i + 1;
    }
  }

  searchInputKeyUp(event: any): void {
    if (this.searchTerm != event.target.value) {
      this.searchTerm = event.target.value
      var reg = new RegExp('(' + this.searchTerm + ')', 'i')
      this.friends = []
      this.tFriends.forEach(element => {
        if (reg.test(element.username)) {
          console.log(element.username)
          this.friends.push(element)
        }
      });
    }
  }

}
