import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { UserRouteService } from './user-route.service';

describe('UserRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [UserRouteService]
  }));

  it('should be created', () => {
    const service: UserRouteService = TestBed.get(UserRouteService);
    expect(service).toBeTruthy();
  });
});
