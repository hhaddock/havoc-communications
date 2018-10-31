import { TestBed } from '@angular/core/testing';

import { UserRouteService } from './user-route.service';

describe('UserRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRouteService = TestBed.get(UserRouteService);
    expect(service).toBeTruthy();
  });
});
