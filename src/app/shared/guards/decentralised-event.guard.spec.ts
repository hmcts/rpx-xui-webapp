import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { decentralisedEventGuard, decentralisedEventChildGuard } from './decentralised-event.guard';
import { DecentralisedRoutingService } from '../services/decentralised-routing.service';
import { WINDOW } from '../tokens/window.token';

describe('decentralisedEventGuard', () => {
  let routingService: jasmine.SpyObj<DecentralisedRoutingService>;
  let windowMock: { location: { assign: jasmine.Spy } };

  beforeEach(() => {
    routingService = jasmine.createSpyObj('DecentralisedRoutingService', ['getRedirectUrlFromRoute']);
    windowMock = { location: { assign: jasmine.createSpy('assign') } };

    TestBed.configureTestingModule({
      providers: [
        { provide: DecentralisedRoutingService, useValue: routingService },
        { provide: WINDOW, useValue: windowMock }
      ]
    });
  });

  it('should allow navigation when no redirect is needed', () => {
    const route = { params: { eid: 'someEvent' } } as unknown as ActivatedRouteSnapshot;
    const state = { root: {} } as RouterStateSnapshot;

    routingService.getRedirectUrlFromRoute.and.returnValue(null);

    const result = TestBed.runInInjectionContext(() => decentralisedEventGuard(route, state));

    expect(result).toBeTrue();
    expect(routingService.getRedirectUrlFromRoute).toHaveBeenCalledWith(route);
    expect(windowMock.location.assign).not.toHaveBeenCalled();
  });

  it('should redirect and block navigation when redirect is needed', () => {
    const route = { params: { eid: 'ext:custom' } } as unknown as ActivatedRouteSnapshot;
    const state = { root: {} } as RouterStateSnapshot;

    routingService.getRedirectUrlFromRoute.and.returnValue('https://example.com/path');

    const result = TestBed.runInInjectionContext(() => decentralisedEventGuard(route, state));

    expect(result).toBeFalse();
    expect(routingService.getRedirectUrlFromRoute).toHaveBeenCalledWith(route);
    expect(windowMock.location.assign).toHaveBeenCalledWith('https://example.com/path');
  });

  it('should work as child guard', () => {
    const route = { params: { eid: 'ext:child' } } as unknown as ActivatedRouteSnapshot;
    const state = { root: {} } as RouterStateSnapshot;

    routingService.getRedirectUrlFromRoute.and.returnValue('https://example.com/child');

    const result = TestBed.runInInjectionContext(() => decentralisedEventChildGuard(route, state));

    expect(result).toBeFalse();
    expect(routingService.getRedirectUrlFromRoute).toHaveBeenCalledWith(route);
    expect(windowMock.location.assign).toHaveBeenCalledWith('https://example.com/child');
  });
});
