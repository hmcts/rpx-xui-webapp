import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { take, takeLast } from 'rxjs/operators';
import { HearingRequestStateData } from '../../../models/hearingRequestStateData.model';
import { ACTION, Mode } from '../../../models/hearings.enum';
import { PartyDetailsModel } from '../../../models/partyDetails.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HEARING_VIEW_EDIT_SUMMARY_TEMPLATE } from '../../../templates/hearing-view-edit-summary.template';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

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
    protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  public ngOnInit(): void {
    this.caseId = this.hearingRequestMainModel?.caseDetails?.caseRef;
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.caseId));
    this.setPropertiesUpdatedAutomatically();
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

  public setPropertiesUpdatedOnPageVisit(): void {
    this.hearingValuesSubscription = this.hearingStore.select(fromHearingStore.getHearingValues).pipe(take(1)).subscribe((hearingValues) => {
      const serviceHearingValues = hearingValues?.serviceHearingValuesModel;
      if (serviceHearingValues) {
        this.hearingsService.propertiesUpdatedOnPageVisit = {
          caseFlags: serviceHearingValues.caseFlags,
          parties: serviceHearingValues.parties
        };
      }
    });
  }

  public setPropertiesUpdatedAutomatically(): void {
    this.hearingValuesSubscription = this.hearingStore.select(fromHearingStore.getHearingValues).pipe(takeLast(1)).subscribe((hearingValues) => {
      if (hearingValues) {
        this.hearingRequestMainModel = {
          ...this.hearingRequestMainModel,
          caseDetails: {
            ...this.hearingRequestMainModel?.caseDetails,
            caseManagementLocationCode: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.caseManagementLocationCode, hearingValues.serviceHearingValuesModel.caseManagementLocationCode),
            hmctsInternalCaseName: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.hmctsInternalCaseName, hearingValues.serviceHearingValuesModel.hmctsInternalCaseName),
            publicCaseName: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.publicCaseName, hearingValues.serviceHearingValuesModel.publicCaseName),
            caserestrictedFlag: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.caserestrictedFlag, hearingValues.serviceHearingValuesModel.caserestrictedFlag),
            caseCategories: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.caseCategories, hearingValues.serviceHearingValuesModel.caseCategories)
          },
          hearingDetails: {
            ...this.hearingRequestMainModel.hearingDetails,
            privateHearingRequiredFlag: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel.hearingDetails.privateHearingRequiredFlag, hearingValues.serviceHearingValuesModel.privateHearingRequiredFlag),
            hearingInWelshFlag: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel.hearingDetails.hearingInWelshFlag, hearingValues.serviceHearingValuesModel.hearingInWelshFlag)
          },
          partyDetails: [
            ...this.updatePartyDetails(hearingValues.serviceHearingValuesModel.parties)
          ]
        };
      }
    });
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingRequest(this.hearingRequestMainModel, this.hearingCondition));
  }

  // To do: EUI- 8905
  private compareAndUpdateServiceHearingValues(currentValue, serviceHearingValue) {
    if (currentValue !== serviceHearingValue) {
      // Store ammended properties to dispay it in UI

    }
    return serviceHearingValue;
  }

  private updatePartyDetails(parties: PartyDetailsModel[]): PartyDetailsModel[] {
    const newParty: PartyDetailsModel[] = [];
    if (Array.isArray(this.hearingRequestMainModel.partyDetails)) {
      this.hearingRequestMainModel.partyDetails.forEach((party) => {
        const serviceParty = parties.find((serviceParty) => serviceParty.partyID === party.partyID);
        if (serviceParty) {
          newParty.push({
            ...party,
            partyRole: this.compareAndUpdateServiceHearingValues(party.partyRole, serviceParty.partyRole),
            individualDetails: {
              ...party.individualDetails,
              relatedParties: this.compareAndUpdateServiceHearingValues(party.individualDetails.relatedParties, serviceParty.individualDetails.relatedParties),
              custodyStatus: this.compareAndUpdateServiceHearingValues(party.individualDetails.custodyStatus, serviceParty.individualDetails.custodyStatus),
              vulnerableFlag: this.compareAndUpdateServiceHearingValues(party.individualDetails.vulnerableFlag, serviceParty.individualDetails.vulnerableFlag),
              vulnerabilityDetails: this.compareAndUpdateServiceHearingValues(party.individualDetails.vulnerabilityDetails, serviceParty.individualDetails.vulnerabilityDetails),
              hearingChannelEmail: this.compareAndUpdateServiceHearingValues(party.individualDetails.hearingChannelEmail, serviceParty.individualDetails.hearingChannelEmail),
              hearingChannelPhone: this.compareAndUpdateServiceHearingValues(party.individualDetails.hearingChannelPhone, serviceParty.individualDetails.hearingChannelPhone)
            },
            organisationDetails: {
              ...party.organisationDetails,
              name: this.compareAndUpdateServiceHearingValues(party.organisationDetails.name, serviceParty.organisationDetails?.name),
              organisationType: this.compareAndUpdateServiceHearingValues(party.organisationDetails.organisationType, serviceParty.organisationDetails?.organisationType),
              cftOrganisationID: this.compareAndUpdateServiceHearingValues(party.organisationDetails.cftOrganisationID, serviceParty.organisationDetails?.cftOrganisationID)
            },
            unavailabilityDOW: serviceParty.unavailabilityDOW,
            unavailabilityRanges: serviceParty.unavailabilityRanges
          });
        } else {
          newParty.push(party);
        }
      });
    }
    return newParty;
  }
}
