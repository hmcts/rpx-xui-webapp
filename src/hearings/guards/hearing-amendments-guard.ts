import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { HearingsGuard } from './hearings-guard';

import { Observable } from 'rxjs';
import { HearingJuristictionConfigService } from 'src/app/services/hearing-juristiction-config/hearing-juristiction-config.service';

@Injectable()
export class HearingAmendmentsGuard extends HearingsGuard {
  constructor(protected readonly appStore: Store<fromAppStore.State>,
    protected readonly sessionStorageService: SessionStorageService,
    protected readonly hearingJuristictionConfigService: HearingJuristictionConfigService) {
    super(appStore, sessionStorageService, hearingJuristictionConfigService);
  }

  canActivate(): Observable<boolean> {
    return super.hasMatchedPermissions();
  }
}
