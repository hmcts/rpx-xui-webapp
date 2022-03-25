import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {Router} from 'express';
import {Observable, of} from 'rxjs';
import * as fromAppStore from '../../app/store';
import {Store} from '@ngrx/store';

@Injectable()
export class HearingsGuard implements CanActivate {

  constructor(private readonly router: Router,
              private readonly appStore: Store<fromAppStore.State>,
              private readonly featureToggleService: FeatureToggleService) {
  }

  public canActivate(): Observable<boolean> {
    return of(true);
  }
}
