import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../../app/services';
import { EnvironmentService } from '../../app/shared/services/environment.service';
import {
  buildDecentralisedEventUrl,
  BuildDecentralisedEventUrlInput,
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
    return this.redirect(
      buildDecentralisedEventUrl(
        params,
        this.environmentService.get('decentralisedCaseTypeConfig'),
        getExpectedSubFromUserDetails(this.sessionStorageService.getItem('userDetails'))
      )
    );
  }

  private redirect(url: string | null): boolean {
    if (!url) {
      return false;
    }

    this.window.location.assign(url);
    return true;
  }
}
