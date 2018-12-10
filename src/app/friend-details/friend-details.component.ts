import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss']
})
export class FriendDetailsComponent implements OnInit {

  friend: any
  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe(params => this.friend = params.id)
  }

  ngOnInit() {
    this.data.getFriendDetails(this.friend).subscribe(
      data => this.friend = data
    );
  }

}
