import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../../app/services';
import { EnvironmentService } from '../../app/shared/services/environment.service';
import {
  buildDecentralisedEventUrl,
  BuildDecentralisedEventUrlParams,
  getExpectedSubFromUserDetails,
} from '../utils/decentralised-event-redirect.util';

export type DecentralisedRedirectParams = Omit<BuildDecentralisedEventUrlParams, 'baseUrls' | 'expectedSub'>;

@Injectable({
  providedIn: 'root',
})
export class DecentralisedEventRedirectService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly sessionStorageService: SessionStorageService,
    @Inject(Window) private readonly window: Window
  ) {}

  public tryRedirect(params: DecentralisedRedirectParams): boolean {
    const redirectUrl = buildDecentralisedEventUrl({
      ...params,
      baseUrls: this.environmentService.get('decentralisedEventBaseUrls'),
      expectedSub: getExpectedSubFromUserDetails(this.sessionStorageService.getItem('userDetails')),
    });

    if (redirectUrl) {
      this.window.location.assign(redirectUrl);
      return true;
    }

    return false;
  }
}
