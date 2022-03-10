import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HearingCategory } from '../models/hearings.enum';
import { LovRefDataModel } from '../models/lovRefData.model';
import { LovRefDataService } from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';
import { RefDataResolver } from './ref-data-resolver.resolve';

@Injectable({
  providedIn: 'root'
})
export class HearingActualRoleResolverService extends RefDataResolver implements Resolve<LovRefDataModel[]> {

  constructor(
    protected readonly lovRefDataService: LovRefDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>
  ) {
    super(lovRefDataService, hearingStore);
  }

  public resolve(route?: ActivatedRouteSnapshot): Observable<LovRefDataModel[]> {
    route.data = {
      ...route.data,
      category: HearingCategory.HearingRoles
    };

    return super.resolve(route);
  }
}
