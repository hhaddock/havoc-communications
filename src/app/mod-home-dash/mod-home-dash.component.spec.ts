import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModHomeDashComponent } from './mod-home-dash.component';

describe('ModHomeDashComponent', () => {
  let component: ModHomeDashComponent;
  let fixture: ComponentFixture<ModHomeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModHomeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModHomeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
