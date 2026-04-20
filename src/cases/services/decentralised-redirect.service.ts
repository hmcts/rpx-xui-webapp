import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../../app/services';
import { EnvironmentService } from '../../app/shared/services/environment.service';
import {
  buildDecentralisedEventUrl,
  buildDecentralisedNocUrl,
  BuildDecentralisedEventUrlInput,
  BuildDecentralisedNocUrlInput,
  getExpectedSubFromUserDetails,
} from '../utils/decentralised-redirect.util';

@Injectable({
  providedIn: 'root',
})
export class DecentralisedRedirectService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly sessionStorageService: SessionStorageService,
    @Inject(Window) private readonly window: Window
  ) {}

  public tryEventRedirect(params: BuildDecentralisedEventUrlInput): boolean {
    const redirectUrl = buildDecentralisedEventUrl(
      params,
      this.environmentService.get('decentralisedCaseTypeBaseUrls'),
      getExpectedSubFromUserDetails(this.sessionStorageService.getItem('userDetails'))
    );

    if (redirectUrl) {
      this.window.location.assign(redirectUrl);
      return true;
    }

    return false;
  }

  public tryNocRedirect(params: BuildDecentralisedNocUrlInput): boolean {
    const redirectUrl = buildDecentralisedNocUrl(
      params,
      this.environmentService.get('decentralisedCaseTypeBaseUrls'),
      getExpectedSubFromUserDetails(this.sessionStorageService.getItem('userDetails'))
    );

    if (redirectUrl) {
      this.window.location.assign(redirectUrl);
      return true;
    }

    return false;
  }
}
