import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseFlagReferenceModel } from '../../../models/caseFlagReference.model';
import { EditHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';
import { HearingConditions } from '../../../models/hearingConditions';
import { hearingStatusMappings } from '../../../models/hearingStatusMappings';
import { ACTION, HearingDateEnum, HearingTemplate, LaCaseStatus, Mode } from '../../../models/hearings.enum';
import { JudicialUserModel } from '../../../models/judicialUser.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
import { LocationsDataService } from '../../../services/locations-data.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-edit-summary',
  templateUrl: './hearing-edit-summary.component.html'
})
export class HearingEditSummaryComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public readonly REGION_ID = '7';
  public caseReference: string;
  public status: string;
  public requestSubmittedDate: string;
  public responseReceivedDate: string;
  public caseStatus: string;
  public isHearingListed: boolean;
  public showPanelDetailsSection: boolean;
  public showLanguageRequirementsSection$: Observable<boolean>;
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

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly locationsDataService: LocationsDataService) {
    super(hearingStore, hearingsService, route);
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
    this.caseReference = String(this.hearingRequestMainModel.caseDetails.caseRef).replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
    this.status = hearingStatusMappings.find((mapping) => mapping.hmcStatus === this.hearingRequestMainModel.requestDetails?.status)?.exuiDisplayStatus || '';
    this.requestSubmittedDate = moment(this.hearingRequestMainModel?.requestDetails?.timestamp)?.format(HearingDateEnum.DisplayMonth) || '';
    this.responseReceivedDate = moment(this.hearingRequestMainModel.hearingResponse?.receivedDateTime).format(HearingDateEnum.DisplayMonth) || '';
    this.caseStatus = this.hearingRequestMainModel.hearingResponse?.laCaseStatus || '';
    this.isHearingListed = this.caseStatus === LaCaseStatus.LISTED;
    this.showPanelDetailsSection = this.serviceHearingValuesModel?.screenFlow?.findIndex((screen) => screen.screenName === 'hearing-panel') > -1;

    const locationIds = this.hearingRequestMainModel.hearingDetails.hearingLocations?.map((location) => location.locationId).join(',');
    this.showLanguageRequirementsSection$ = this.locationsDataService.getLocationById(locationIds).pipe(
      map((locations) => {
        return !locations.some((location) => location.region_id === this.REGION_ID);
      })
    );
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public onChange(event: EditHearingChangeConfig): void {
    const hearingCondition: HearingConditions = {
      fragmentId: event.fragmentId,
      mode: Mode.VIEW_EDIT
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigateByUrl(event.changeLink);
  }

  public onSubmit(): void {
    // TO DO: Will be implemented in one of the ticktes of CR-84
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
