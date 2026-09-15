import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync } from '@angular/router';
import { DecentralisedRedirectService } from './decentralised-redirect.service';
import { Injectable } from '@angular/core';
import { DecentralisedEvent } from './decentralised-event';

/**
 * This guard will redirect the request to the decentralised service web application.
 * For this to occur:
 * - the eventID must be marked as decentralised
 * - the case type must be provided
 * - either the jurisdiction ID (for create events) or the case ID (for edit events) must be provided
 * - a service URL must be provided for the case type.
 *   If no mapping is provided then an error is thrown since this is a configuration error
 */
@Injectable({
  providedIn: 'root',
})
export class DecentralisedEventGuard implements CanActivate, CanActivateChild {
  constructor(private decentralisedRedirectService: DecentralisedRedirectService) {}

  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    const eventId = route.paramMap.get('eid');

    if (eventId && DecentralisedEvent.isDecentralisedEvent(eventId)) {
      const caseType = route.paramMap.get('ctid');

      if (caseType) {
        const caseId = route.paramMap.get('cid');
        const jurisdiction = route.paramMap.get('jid');

        let event;
        if (caseId) {
          event = DecentralisedEvent.of(eventId, caseType, caseId, route.queryParams);
        } else if (jurisdiction) {
          event = DecentralisedEvent.createCase(eventId, caseType, jurisdiction, route.queryParams);
        }

        if (event) {
          const baseUrl = this.decentralisedRedirectService.getBaseUrl(caseType);

          if (baseUrl) {
            this.decentralisedRedirectService.redirectEvent(baseUrl, event);
            return false;
          } else {
            // fail fast since decentralised events should have the required configuration
            throw new Error(`Event ${eventId} is decentralised for case type ${caseType} 
              but the required parameters are not provided`);
          }
        }
      }
    }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute);
  }
}
