import { TestBed } from '@angular/core/testing';

import { FriendRouteService } from './friend-route.service';

describe('FriendRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendRouteService = TestBed.get(FriendRouteService);
    expect(service).toBeTruthy();
  });
});
