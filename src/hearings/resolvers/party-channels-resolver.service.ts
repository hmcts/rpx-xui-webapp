import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HearingCategory } from '../models/hearings.enum';
import { RefDataModel } from '../models/refData.model';
import { HearingsRefDataService } from '../services/hearings-ref-data.service';
import * as fromHearingStore from '../store';
import { RefDataResolver } from './ref-data-resolver.resolve';

@Injectable({
  providedIn: 'root'
})
export class PartyChannelsResolverService extends RefDataResolver implements Resolve<RefDataModel[]> {

  constructor(
    protected readonly hearingsDataService: HearingsRefDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>
  ) {
    super(hearingsDataService, hearingStore);
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<RefDataModel[]> {
    route.data.category = HearingCategory.PartyChannel;
    return super.resolve(route);
  }
}
