import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHomeDashComponent } from './admin-home-dash.component';

import {MatToolbarModule, MatTooltip, MatTooltipModule} from '@angular/material';


describe('AdminHomeDashComponent', () => {
  let component: AdminHomeDashComponent;
  let fixture: ComponentFixture<AdminHomeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatTooltipModule
      ],
      declarations: [ AdminHomeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
