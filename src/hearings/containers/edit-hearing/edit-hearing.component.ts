import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditHearingChangeConfig } from 'src/hearings/models/editHearingChangeConfig.model';
import { CaseFlagReferenceModel } from '../../models/caseFlagReference.model';
import { HearingConditions } from '../../models/hearingConditions';
import { HearingListMainModel } from '../../models/hearingListMain.model';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';
import { hearingStatusMappings } from '../../models/hearingStatusMappings';
import { HearingDateEnum, HearingSummaryEnum, HearingTemplate, LaCaseStatus, Mode } from '../../models/hearings.enum';
import { JudicialUserModel } from '../../models/judicialUser.model';
import { LovRefDataModel } from '../../models/lovRefData.model';
import { ServiceHearingValuesModel } from '../../models/serviceHearingValues.model';
import { LocationsDataService } from '../../services/locations-data.service';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-edit-hearing',
  templateUrl: './edit-hearing.component.html'
})
export class EditHearingComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly REGION_ID = '7';
  public hearingState$: Observable<fromHearingStore.State>;
  public hearingStateSub: Subscription;
  public serviceHearingValuesModel: ServiceHearingValuesModel;
  public hearingRequestMainModel: HearingRequestMainModel;
  public hearingListMainModel: HearingListMainModel;
  public caseReference: string;
  public status: string;
  public requestSubmittedDate: string;
  public responseReceivedDate: string;
  public caseStatus: string;
  public isHearingListed: boolean;
  public showPanelDetailsSection: boolean;
  public showLanguageRequirementsSection$: Observable<boolean>;
  public showSpinner$: Observable<boolean>;
  public validationErrors: { id: string, message: string }[] = [];
  public additionalFacilitiesRefData: LovRefDataModel[];
  public caseFlagsRefData: CaseFlagReferenceModel[];
  public caseTypeRefData: LovRefDataModel[];
  public hearingPrioritiesRefData: LovRefDataModel[];
  public hearingStageOptionsRefData: LovRefDataModel[];
  public judgeTypesRefData: LovRefDataModel[];
  public judicialUsers: JudicialUserModel[];
  public partyChannelsRefData: LovRefDataModel[];
  public partySubChannelsRefData: LovRefDataModel[];
  public panelRolesRefData: LovRefDataModel[];
  public hearingTemplate = HearingTemplate;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly locationsDataService: LocationsDataService,
    private readonly loadingService: LoadingService) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
    this.additionalFacilitiesRefData = this.route.snapshot.data.additionFacilitiesOptions;
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
    this.caseTypeRefData = this.route.snapshot.data.caseType;
    this.hearingPrioritiesRefData = this.route.snapshot.data.hearingPriorities;
    this.hearingStageOptionsRefData = this.route.snapshot.data.hearingStageOptions;
    this.judgeTypesRefData = this.route.snapshot.data.judgeTypes;
    this.judicialUsers = this.route.snapshot.data.judicialUsers;
    this.partyChannelsRefData = this.route.snapshot.data.partyChannels;
    this.partySubChannelsRefData = this.route.snapshot.data.partySubChannels;
    this.panelRolesRefData = this.route.snapshot.data.otherPanelRoles;
  }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.hearingStateSub = this.hearingState$.subscribe((state) => {
      this.hearingRequestMainModel = state.hearingRequest.hearingRequestMainModel;
      this.serviceHearingValuesModel = state.hearingValues.serviceHearingValuesModel;

      this.caseReference = String(this.hearingRequestMainModel.caseDetails.caseRef).replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
      this.status = hearingStatusMappings.find((mapping) => mapping.hmcStatus === this.hearingRequestMainModel.requestDetails?.status)?.exuiDisplayStatus || '';
      this.requestSubmittedDate = moment(this.hearingRequestMainModel?.requestDetails?.timestamp)?.format(HearingDateEnum.DisplayMonth) || '';
      this.responseReceivedDate = moment(this.hearingRequestMainModel.hearingResponse?.receivedDateTime).format(HearingDateEnum.DisplayMonth) || '';
      this.caseStatus = this.hearingRequestMainModel.hearingResponse?.laCaseStatus || '';
      this.isHearingListed = this.caseStatus === LaCaseStatus.LISTED;
      this.showPanelDetailsSection = state.hearingValues?.serviceHearingValuesModel?.screenFlow?.findIndex((screen) => screen.screenName === 'hearing-panel') > -1;

      const locationIds = this.hearingRequestMainModel.hearingDetails.hearingLocations?.map((location) => location.locationId).join(',');
      this.showLanguageRequirementsSection$ = this.locationsDataService.getLocationById(locationIds).pipe(
        map((locations) => {
          return !locations.some((location) => location.region_id === this.REGION_ID);
        })
      );

      if (state.hearingRequest.lastError) {
        this.validationErrors = [];
        this.validationErrors.push({
          id: '', message: HearingSummaryEnum.BackendError
        });
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      }
      this.loadingService.unregister(loadingToken);
    }, () => {
      this.loadingService.unregister(loadingToken);
    });
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    this.hearingStateSub?.unsubscribe();
  }

  public onChange(event: EditHearingChangeConfig): void {
    const hearingCondition: HearingConditions = {
      fragmentId: event.fragmentId,
      mode: Mode.VIEW_EDIT
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigateByUrl(event.changeLink);
  }

  public fragmentFocus(): void {
    this.route.fragment.subscribe((frag) => {
      const element = document.getElementById(frag);
      if (element) {
        element.scrollIntoView();
        element.focus();
      }
    });
  }
}
