import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { HearingRequestStateData } from '../models/hearingRequestStateData.model';
import { JudicialUserModel } from '../models/judicialUser.model';
import { JudicialRefDataService } from '../services/judicial-ref-data.service';
import { LovRefDataService } from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';

@Injectable({
  providedIn: 'root',
})

export class PanelAndJudgeDetailsResolver implements Resolve<JudicialUserModel[]> {
  public hearingRequestMainModel$: Observable<HearingRequestStateData>;
  public hearingRequestMainModel: HearingRequestMainModel;
  public constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly lovRefDataService: LovRefDataService,
    protected readonly judicialRefDataService: JudicialRefDataService
  ) {
    this.hearingRequestMainModel$ = this.hearingStore.pipe(
      select(fromHearingStore.getHearingRequest)
    );
    this.hearingStore
      .pipe(select(fromHearingStore.getHearingsFeatureState))
      .subscribe((hearingState) => {
        this.hearingRequestMainModel =
          hearingState.hearingRequest.hearingRequestMainModel;
      });
  }

  public resolve(
    route?: ActivatedRouteSnapshot
  ): Observable<JudicialUserModel[]> {
        return this.getReferenceData$(this.getPanelMemberIds());
  }

  public getPanelMemberIds(): string[] {
    return this.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.map(
      (ref) => ref.memberID
    );
  }

  public getReferenceData$(serviceId): Observable<JudicialUserModel[]> {
    return this.judicialRefDataService
      .searchJudicialUserByPersonalCodes(serviceId)
      .pipe(
        map((data) => data)
      );
  }
}
