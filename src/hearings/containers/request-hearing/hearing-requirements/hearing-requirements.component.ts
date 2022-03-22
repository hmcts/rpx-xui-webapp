import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromHearingStore from '../../../../hearings/store';
import {CaseFlagGroup} from '../../../models/caseFlagGroup.model';
import {CaseFlagReferenceModel} from '../../../models/caseFlagReference.model';
import {HearingConditions, KEY_IS_INIT, KEY_MODE} from '../../../models/hearingConditions';
import {HearingRequestMainModel} from '../../../models/hearingRequestMain.model';
import {ACTION, CaseFlagType, Mode} from '../../../models/hearings.enum';
import {PartyDetailsModel} from '../../../models/partyDetails.model';
import {PartyFlagsDisplayModel} from '../../../models/partyFlags.model';
import {HearingsService} from '../../../services/hearings.service';
import {CaseFlagsUtils} from '../../../utils/case-flags.utils';
import {HearingsUtils} from '../../../utils/hearings.utils';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
})
export class HearingRequirementsComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public caseFlagsRefData: CaseFlagReferenceModel[];
  public caseFlagType: CaseFlagType = CaseFlagType.REASONABLE_ADJUSTMENT;
  public reasonableAdjustmentFlags: CaseFlagGroup[] = [];
  public lostFocus: boolean = false;
  public referenceId: string;

  @HostListener('window:focus', ['$event'])
  public onFocus(): void {
    if (this.lostFocus) {
      this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.referenceId));
      setTimeout(() => this.initializeHearingRequestFromHearingValues(), 500);
      this.lostFocus = false;
    }
  }

  @HostListener('window:blur', ['$event'])
  public onBlur(): void {
    this.lostFocus = true;
  }

  constructor(protected readonly route: ActivatedRoute,
              public readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService, route);
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
    this.reasonableAdjustmentFlags = CaseFlagsUtils.displayCaseFlagsGroup(this.serviceHearingValuesModel.caseFlags.flags, this.caseFlagsRefData, this.caseFlagType);
  }

  public ngOnInit(): void {
    if (this.hearingListMainModel) {
      this.referenceId = this.hearingListMainModel.caseRef;
    }
    if (HearingsUtils.hasPropertyAndValue(this.hearingCondition, KEY_MODE, Mode.CREATE)
      && HearingsUtils.hasPropertyAndValue(this.hearingCondition, KEY_IS_INIT, true)
      && this.serviceHearingValuesModel) {
      this.initializeHearingRequestFromHearingValues();
      this.initializeHearingCondition();
    }
  }

  public initializeHearingRequestFromHearingValues(): void {
    const combinedParties: PartyDetailsModel[] = this.combinePartiesWithIndOrOrg(this.serviceHearingValuesModel.parties);
    const hearingRequestMainModel: HearingRequestMainModel = {
      requestDetails: {
        requestTimeStamp: null
      },
      hearingDetails: {
        duration: this.serviceHearingValuesModel.duration,
        hearingType: this.serviceHearingValuesModel.hearingType,
        hearingLocations: this.serviceHearingValuesModel.hearingLocations,
        hearingIsLinkedFlag: this.serviceHearingValuesModel.hearingIsLinkedFlag,
        hearingWindow: this.serviceHearingValuesModel.hearingWindow,
        privateHearingRequiredFlag: this.serviceHearingValuesModel.privateHearingRequiredFlag,
        panelRequirements: this.serviceHearingValuesModel.panelRequirements,
        autolistFlag: this.serviceHearingValuesModel.autoListFlag,
        hearingPriorityType: this.serviceHearingValuesModel.hearingPriorityType,
        numberOfPhysicalAttendees: this.serviceHearingValuesModel.numberOfPhysicalAttendees,
        hearingInWelshFlag: this.serviceHearingValuesModel.hearingInWelshFlag,
        facilitiesRequired: this.serviceHearingValuesModel.facilitiesRequired,
        listingComments: this.serviceHearingValuesModel.listingComments,
        hearingRequester: this.serviceHearingValuesModel.hearingRequester,
        leadJudgeContractType: this.serviceHearingValuesModel.leadJudgeContractType,
      },
      caseDetails: {
        hmctsServiceCode: this.hearingListMainModel.hmctsServiceID || null,
        caseRef: this.hearingListMainModel.caseRef || null,
        requestTimeStamp: null,
        hearingID: null,
        caseDeepLink: null,
        hmctsInternalCaseName: this.serviceHearingValuesModel.caseName,
        publicCaseName: this.serviceHearingValuesModel.caseName,
        caseAdditionalSecurityFlag: this.serviceHearingValuesModel.caseAdditionalSecurityFlag,
        caseCategories: [],
        caseManagementLocationCode: null,
        caserestrictedFlag: null,
        caseSLAStartDate: null,
      },
      partyDetails: combinedParties
    };
    this.hearingStore.dispatch(new fromHearingStore.InitializeHearingRequest(hearingRequestMainModel));
  }

  public combinePartiesWithIndOrOrg(partyDetails: PartyDetailsModel[]): PartyDetailsModel[] {
    const combinedPartyDetails: PartyDetailsModel[] = [];
    partyDetails.forEach(partyDetail => {
      const party: PartyDetailsModel = {
        ...partyDetail,
        individualDetails: {
          ...partyDetail.individualDetails,
          reasonableAdjustments: this.getAllPartyFlagsByPartyId(partyDetail.partyID)
            .filter(flagId => flagId !== CaseFlagsUtils.LANGUAGE_INTERPRETER_FLAG_ID),
          interpreterLanguage: this.getAllPartyFlagsByPartyId(partyDetail.partyID)
            .includes(CaseFlagsUtils.LANGUAGE_INTERPRETER_FLAG_ID) ? CaseFlagsUtils.LANGUAGE_INTERPRETER_FLAG_ID : null,
        },
        organisationDetails: {
          ...partyDetail.organisationDetails
        }
      };
      combinedPartyDetails.push(party);
    });
    return combinedPartyDetails;
  }

  public getAllPartyFlagsByPartyId(partyID: string): string[] {
    const allRAFs: PartyFlagsDisplayModel[] = this.reasonableAdjustmentFlags.reduce((previousValue, currentValue) =>
      [...previousValue, ...currentValue.partyFlags], []
    );
    return allRAFs.filter(flag => flag.partyID === partyID).map(filterFlag => filterFlag.flagId);
  }

  public initializeHearingCondition(): void {
    const strRegions = this.serviceHearingValuesModel.hearingLocations.map(location => location.region).join(',');
    const hearingCondition: HearingConditions = {
      isInit: false,
      region: strRegions
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
  }

  protected executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy() {
    super.unsubscribe();
  }
}
