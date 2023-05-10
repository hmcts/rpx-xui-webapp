import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../../app/services';
import { HearingCategory } from '../models/hearings.enum';
import { LovRefDataModel } from '../models/lovRefData.model';
import { LovRefDataService } from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';
import { RefDataResolver } from './ref-data-resolver.resolve';
import { LoggerService } from '../../app/services/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class PanelRolesResolverService extends RefDataResolver implements Resolve<LovRefDataModel[]> {
  constructor(
    protected readonly lovRefDataService: LovRefDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly router: Router,
    protected readonly sessionStorageService: SessionStorageService,
    protected readonly loggerService: LoggerService
  ) {
    super(lovRefDataService, hearingStore, router, sessionStorageService, loggerService);
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<LovRefDataModel[]> {
    route.data.category = HearingCategory.PanelMemberType;
    return super.resolve(route);
  }
}
