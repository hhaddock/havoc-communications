import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeDashComponent } from './admin-home-dash.component';

describe('AdminHomeDashComponent', () => {
  let component: AdminHomeDashComponent;
  let fixture: ComponentFixture<AdminHomeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
