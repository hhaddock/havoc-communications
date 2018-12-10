import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { 
  MatCardModule, 
  MatButtonModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDividerModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatSelectModule,
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FriendDetailsComponent } from './friend-details/friend-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AdminHomeDashComponent } from './admin-home-dash/admin-home-dash.component';
import { ModHomeDashComponent } from './mod-home-dash/mod-home-dash.component';
import { WebrtcComponent } from './webrtc/webrtc.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProfileComponent,
    FriendsComponent,
    HomeComponent,
    LoginComponent,
    FriendDetailsComponent,
    CreateAccountComponent,
    AdminHomeDashComponent,
    ModHomeDashComponent,
    WebrtcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    HttpModule,
    MatGridListModule,
    FormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
