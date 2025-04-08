import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../app/store';
import { HearingsGuard } from './hearings-guard';

import { Observable } from 'rxjs';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';
import { CaseNotifier } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class HearingAmendmentsGuard extends HearingsGuard {
  constructor(protected readonly appStore: Store<fromAppStore.State>,
    protected readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService,
    protected readonly caseNotifier: CaseNotifier) {
    super(appStore, caseNotifier, hearingJurisdictionConfigService);
  }

  canActivate(): Observable<boolean> {
    return super.hasMatchedPermissions();
  }
}
