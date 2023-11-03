import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { HearingRequestStateData } from '../../../models/hearingRequestStateData.model';
import { ACTION, Mode } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HEARING_VIEW_EDIT_SUMMARY_TEMPLATE } from '../../../templates/hearing-view-edit-summary.template';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'exui-hearing-view-edit-summary',
  templateUrl: './hearing-view-edit-summary.component.html'
})
export class HearingViewEditSummaryComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public template = HEARING_VIEW_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW_EDIT;
  public caseId: string;
  public validationErrors: { id: string, message: string }[] = [];
  private initialAndCurrentStates$: Observable<[HearingRequestStateData, HearingRequestStateData]>;
  private initialAndCurrentStatesSubscription: Subscription;
  private hearingValuesSubscription: Subscription;
  private readonly notUpdatedMessage = 'The request has not been updated';

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              protected readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService, route);
  }

  public ngOnInit(): void {
    console.log('SERVICE HEARING VALUES 1', this.serviceHearingValuesModel);
    this.caseId = this.hearingRequestMainModel.caseDetails?.caseRef;
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.caseId));
    this.setPropertiesUpdatedOnPageVisit();
  }

  private getInitialAndCurrentState(): Observable<[HearingRequestStateData, HearingRequestStateData]> {
    const initialHearingState$ = this.hearingStore.select(fromHearingStore.getHearingRequestToCompare);
    const currentHearingState$ = this.hearingStore.select(fromHearingStore.getHearingRequest);
    return combineLatest([initialHearingState$, currentHearingState$]);
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.VIEW_EDIT_REASON) {
      this.initialAndCurrentStates$ = this.getInitialAndCurrentState();
      this.initialAndCurrentStatesSubscription = this.initialAndCurrentStates$.pipe(take(1)).subscribe((state) => {
        const stateChanged = !_.isEqual(state[0], state[1]);
        if (stateChanged) {
          super.navigateAction(action);
        } else {
          this.validationErrors = [{ id: 'no-update', message: this.notUpdatedMessage }];
        }
      });
    } else {
      super.navigateAction(action);
    }
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    this.initialAndCurrentStatesSubscription?.unsubscribe();
    this.hearingValuesSubscription?.unsubscribe();
  }

  private setPropertiesUpdatedOnPageVisit(): void {
    this.hearingValuesSubscription = this.hearingStore.select(fromHearingStore.getHearingValues).pipe(take(1)).subscribe((hearingValues) => {
      console.log('SERVICE HEARING VALUES 2', this.serviceHearingValuesModel);
      const serviceHearingValues = hearingValues.serviceHearingValuesModel;
      this.hearingsService.propertiesUpdatedOnPageVisit = {
        caseFlags: serviceHearingValues.caseFlags,
        facilitiesRequired: serviceHearingValues.facilitiesRequired,
        parties: serviceHearingValues.parties
      };
      console.log('propertiesUpdatedOnPageVisit', this.hearingsService.propertiesUpdatedOnPageVisit);
    });
  }
}
