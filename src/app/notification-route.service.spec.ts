import { TestBed } from '@angular/core/testing';

import { NotificationRouteService } from './notification-route.service';

describe('NotificationRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationRouteService = TestBed.get(NotificationRouteService);
    expect(service).toBeTruthy();
  });
});
