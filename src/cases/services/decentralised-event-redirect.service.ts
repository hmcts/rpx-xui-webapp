import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../../app/services';
import { EnvironmentService } from '../../app/shared/services/environment.service';
import {
  buildDecentralisedEventUrl,
  BuildDecentralisedEventUrlInput,
  getExpectedSubFromUserDetails,
} from '../utils/decentralised-event-redirect.util';

@Injectable({
  providedIn: 'root',
})
export class DecentralisedEventRedirectService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly sessionStorageService: SessionStorageService,
    @Inject(Window) private readonly window: Window
  ) {}

  public tryRedirect(params: BuildDecentralisedEventUrlInput): boolean {
    const redirectUrl = buildDecentralisedEventUrl(
      params,
      this.environmentService.get('decentralisedEventBaseUrls'),
      getExpectedSubFromUserDetails(this.sessionStorageService.getItem('userDetails'))
    );

    if (redirectUrl) {
      this.window.location.assign(redirectUrl);
      return true;
    }

    return false;
  }
}
