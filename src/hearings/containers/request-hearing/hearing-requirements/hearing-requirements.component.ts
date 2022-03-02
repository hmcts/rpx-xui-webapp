import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromHearingStore from '../../../../hearings/store';
import {CaseFlagReferenceModel} from '../../../models/caseFlagReference.model';
import {HearingConditions} from '../../../models/hearingConditions';
import {HearingRequestMainModel} from '../../../models/hearingRequestMain.model';
import {ACTION, CaseFlagType, Mode} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import {HearingsUtils} from '../../../utils/hearings.utils';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
})
export class HearingRequirementsComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public caseFlagsRefData: CaseFlagReferenceModel[];
  public caseFlagType: CaseFlagType = CaseFlagType.REASONABLE_ADJUSTMENT;
  public lostFocus: boolean = false;
  public referenceId: string;

  @HostListener('window:focus', ['$event'])
  public onFocus(): void {
    if (this.lostFocus) {
      this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.referenceId));
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
  }

  public ngOnInit(): void {
    if (this.hearingListMainModel) {
      this.referenceId = this.hearingListMainModel.caseRef;
    }
    if (HearingsUtils.hasPropertyAndValue(this.hearingCondition, 'mode', Mode.CREATE)
      && HearingsUtils.hasPropertyAndValue(this.hearingCondition, 'isInit', true)
      && this.serviceHearingValuesModel) {
      this.initializeHearingRequestFromHearingValues();
    }
  }

  public initializeHearingRequestFromHearingValues(): void {
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
        panelRequirements: null,
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
      partyDetails: []
    };
    this.hearingStore.dispatch(new fromHearingStore.InitializeHearingRequest(hearingRequestMainModel));
    this.initializeHearingCondition();
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
