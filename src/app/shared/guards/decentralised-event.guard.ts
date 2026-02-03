import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { WINDOW } from '../tokens/window.token';
import { DecentralisedRoutingService } from '../services/decentralised-routing.service';

export const decentralisedEventGuard: CanActivateFn = (route, state) => {
  const routingService = inject(DecentralisedRoutingService);
  const window = inject(WINDOW);

  const redirectUrl = routingService.getRedirectUrlFromRoute(route);
  if (redirectUrl) {
    window.location.assign(redirectUrl);
    return false;
  }
  return true;
};

export const decentralisedEventChildGuard: CanActivateChildFn = (route, state) => {
  return decentralisedEventGuard(route, state);
};
