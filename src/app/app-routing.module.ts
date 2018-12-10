import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendDetailsComponent } from './friend-details/friend-details.component';
import { WebrtcComponent } from './webrtc/webrtc.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'friends/details/:id',
    component: FriendDetailsComponent
  },
  {
    path: 'webrtc',
    component: WebrtcComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
