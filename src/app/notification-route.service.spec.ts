import { TestBed } from '@angular/core/testing';
import { NotificationRouteService } from './notification-route.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FriendRouteService } from './friend-route.service';

describe('NotificationRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [NotificationRouteService]
  }));

  it('should be created', () => {
    const service: NotificationRouteService = TestBed.get(NotificationRouteService);
    expect(service).toBeTruthy();
  });
});
