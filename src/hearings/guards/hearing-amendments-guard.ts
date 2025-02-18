import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { HearingsGuard } from './hearings-guard';

import { Observable } from 'rxjs';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';

@Injectable()
export class HearingAmendmentsGuard extends HearingsGuard {
  constructor(protected readonly appStore: Store<fromAppStore.State>,
    protected readonly sessionStorageService: SessionStorageService,
    protected readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService) {
    super(appStore, sessionStorageService, hearingJurisdictionConfigService);
  }

  canActivate(): Observable<boolean> {
    return super.hasMatchedPermissions();
  }
}
