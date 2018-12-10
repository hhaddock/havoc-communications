import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FriendRouteService } from './friend-route.service';

describe('FriendRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [FriendRouteService]
  }));

  it('should be created', () => {
    const service: FriendRouteService = TestBed.get(FriendRouteService);
    expect(service).toBeTruthy();
  });
});
