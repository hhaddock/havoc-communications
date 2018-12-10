import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import {SidebarComponent} from './sidebar/sidebar.component';
import {LoginComponent} from './login/login.component';
import {MatToolbarModule,MatTooltipModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpModule } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule,
        RouterTestingModule,
        MatToolbarModule,
        MatTooltipModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        SidebarComponent,
        LoginComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
