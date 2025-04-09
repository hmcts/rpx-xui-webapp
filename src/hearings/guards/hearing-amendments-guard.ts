import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../app/store';
import { HearingsGuard } from './hearings-guard';

import { Observable } from 'rxjs';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';
import { Router } from '@angular/router';

@Injectable()
export class HearingAmendmentsGuard extends HearingsGuard {
  constructor(protected readonly appStore: Store<fromAppStore.State>,
    protected readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService,
    protected readonly hearingStore: Store<fromAppStore.State>,
    protected readonly router: Router
  ) {
    super(appStore, hearingJurisdictionConfigService, hearingStore, router);
    console.log('HearingAmendmentsGuard');
  }

  canActivate(): Observable<boolean> {
    return super.hasMatchedPermissions();
  }
}
