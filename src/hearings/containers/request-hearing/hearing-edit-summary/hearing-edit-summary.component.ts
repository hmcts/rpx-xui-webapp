import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../../app/app.constants';
import { CaseCategoryModel } from '../../../../hearings/models/caseCategory.model';
import { AfterPageVisitProperties, AutoUpdateMode, PagelessPropertiesEnum, WithinPagePropertiesEnum } from '../../../../hearings/models/hearingsUpdateMode.enum';
import { ServiceHearingValuesModel } from '../../../../hearings/models/serviceHearingValues.model';
import { CaseFlagReferenceModel } from '../../../models/caseFlagReference.model';
import { EditHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';
import { HearingConditions } from '../../../models/hearingConditions';
import { hearingStatusMappings } from '../../../models/hearingStatusMappings';
import { ACTION, CategoryType, HearingDateEnum, HearingScreensEnum, HearingTemplate, LaCaseStatus, Mode, PartyType } from '../../../models/hearings.enum';
import { JudicialUserModel } from '../../../models/judicialUser.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { PartyDetailsModel } from '../../../models/partyDetails.model';
import { HearingsFeatureService } from '../../../services/hearings-feature.service';
import { HearingsService } from '../../../services/hearings.service';
import { LocationsDataService } from '../../../services/locations-data.service';
import * as fromHearingStore from '../../../store';
import { HearingsUtils } from '../../../utils/hearings.utils';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-edit-summary',
  templateUrl: './hearing-edit-summary.component.html'
})
export class HearingEditSummaryComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public readonly REGION_ID = '7';
  public readonly LANGUAGE_INTERPRETER_FLAG_ID = 'PF0015';
  public caseReference: string;
  public status: string;
  public requestSubmittedDate: string;
  public responseReceivedDate: string;
  public caseStatus: string;
  public isHearingListed: boolean;
  public showLanguageRequirementsSection$: Observable<boolean>;
  public hearingValuesSubscription: Subscription;
  public featureToggleServiceSubscription: Subscription;
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
  public isHearingAmendmentsEnabled: boolean;
  public hearingTemplate = HearingTemplate;
  public isPagelessAttributeChanged: boolean = false;
  public afterPageVisit: AfterPageVisitProperties;
  public isWithinPageAttributeChanged: boolean = false;
  public pageVisitChangeExists: boolean = false;
  public sectionsToDisplay: string[];
  public hearingScreenEnum = HearingScreensEnum;
  private readonly notUpdatedMessage = 'The request has not been updated';

  constructor(private readonly router: Router,
    private readonly locationsDataService: LocationsDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly featureToggleService: FeatureToggleService,
    protected readonly hearingsFeatureService: HearingsFeatureService,
    protected readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService, featureToggleService, route);
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
    this.sectionsToDisplay = this.serviceHearingValuesModel?.screenFlow.map((screen) => screen.screenName);
    const locationIds = this.hearingRequestMainModel.hearingDetails.hearingLocations?.map((location) => location.locationId).join(',');
    this.showLanguageRequirementsSection$ = this.locationsDataService.getLocationById(locationIds).pipe(
      map((locations) => {
        return !locations.some((location) => location.region_id === this.REGION_ID);
      })
    );

    // Enable hearings manual amendments journey only if the feature is toggled on
    this.featureToggleServiceSubscription = this.hearingsFeatureService.isFeatureEnabled(AppConstants.FEATURE_NAMES.enableHearingAmendments).subscribe((enabled: boolean) => {
      this.isHearingAmendmentsEnabled = enabled;
      if (enabled) {
        this.setPropertiesUpdatedAutomatically();
      }
    });
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    this.hearingValuesSubscription?.unsubscribe();
    this.featureToggleServiceSubscription?.unsubscribe();
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.BACK) {
      this.router.navigate(['/', 'hearings', 'request', 'hearing-view-summary']);
    } else {
      if (action === ACTION.VIEW_EDIT_REASON) {
        const objA = JSON.parse(JSON.stringify(this.hearingRequestMainModel));
        const objB = JSON.parse(JSON.stringify(this.hearingRequestToCompareMainModel));
        if (_.isEqual(objA, objB)) {
          this.validationErrors = [{ id: 'no-update', message: this.notUpdatedMessage }];
          window.scrollTo({ top: 0, left: 0 });
          return;
        } else if (this.hearingsService.displayValidationError) {
          return;
        }
      }
      super.navigateAction(action);
    }
  }

  public onChange(event: EditHearingChangeConfig): void {
    const hearingCondition: HearingConditions = {
      fragmentId: event.fragmentId,
      mode: Mode.VIEW_EDIT,
      isHearingAmendmentsEnabled: this.isHearingAmendmentsEnabled
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

  private setPropertiesUpdatedAutomatically(): void {
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      caseDetails: {
        ...this.hearingRequestMainModel?.caseDetails,
        caseManagementLocationCode: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.caseManagementLocationCode, this.serviceHearingValuesModel.caseManagementLocationCode, AutoUpdateMode.PAGELESS, PagelessPropertiesEnum.CASE_MANAGEMENT_LOCATIONCODE),
        caseInterpreterRequiredFlag: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.caseInterpreterRequiredFlag, this.serviceHearingValuesModel.caseInterpreterRequiredFlag, AutoUpdateMode.PAGELESS, PagelessPropertiesEnum.CASE_INTERPRETER_REQUIRED_FLAG),
        hmctsInternalCaseName: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.hmctsInternalCaseName, this.serviceHearingValuesModel.hmctsInternalCaseName, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.HMCTS_INTERNAL_CASENAME),
        publicCaseName: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.publicCaseName, this.serviceHearingValuesModel.publicCaseName, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.PUBLIC_CASE_NAME),
        caserestrictedFlag: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel?.caseDetails.caserestrictedFlag, this.serviceHearingValuesModel.caserestrictedFlag, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.CASE_RESTRICTED_FLAG),
        caseCategories: this.compareAndUpdateCaseCategories(this.hearingRequestMainModel?.caseDetails.caseCategories, this.serviceHearingValuesModel.caseCategories)
      },
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        privateHearingRequiredFlag: this.compareAndUpdateServiceHearingValues(this.hearingRequestMainModel.hearingDetails.privateHearingRequiredFlag, this.serviceHearingValuesModel.privateHearingRequiredFlag, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.PRIVATE_HEARING_REQUIRED_FLAG)
      },
      partyDetails: [
        ...this.updatePartyDetails(this.serviceHearingValuesModel.parties)
      ]
    };

    // Set properties updated on page visit
    this.setPropertiesUpdatedOnPageVisit(this.serviceHearingValuesModel);

    // Set banner
    this.setBanner();

    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingRequest(this.hearingRequestMainModel, this.hearingCondition));
  }

  private setPropertiesUpdatedOnPageVisit(serviceHearingValues: ServiceHearingValuesModel): void {
    if (serviceHearingValues) {
      if (!_.isEqual(this.hearingsService.propertiesUpdatedOnPageVisit?.hearingId, this.hearingRequestMainModel.requestDetails.hearingRequestID)) {
        this.hearingsService.propertiesUpdatedOnPageVisit = {
          hearingId: this.hearingRequestMainModel.requestDetails.hearingRequestID,
          caseFlags: serviceHearingValues.caseFlags,
          parties: serviceHearingValues.parties,
          hearingWindow: serviceHearingValues.hearingWindow,
          afterPageVisit: {
            reasonableAdjustmentChangesRequired: this.pageVisitReasonableAdjustmentChangeExists(),
            nonReasonableAdjustmentChangesRequired: this.pageVisitNonReasonableAdjustmentChangeExists(),
            partyDetailsChangesRequired: this.pageVisitPartiesChangeExists(),
            hearingWindowChangesRequired: this.pageVisitHearingWindowChangeExists()
          }
        };
      }
    }
  }

  private compareAndUpdateCaseCategories(hmcCaseCategories: CaseCategoryModel[], shvCaseCategories: CaseCategoryModel[]): CaseCategoryModel[] {
    this.hearingsService.propertiesUpdatedAutomatically.withinPage.caseCategories = [];

    // Get case types
    const hmcCategoryValues = hmcCaseCategories.filter((caseCategories) => caseCategories.categoryType === CategoryType.CaseType).map((c) => c.categoryValue);
    const shvCategoryValues = shvCaseCategories.filter((caseCategories) => caseCategories.categoryType === CategoryType.CaseType).map((c) => c.categoryValue);

    const newCaseTypes = _.difference(shvCategoryValues, hmcCategoryValues);

    if (newCaseTypes.length > 0) {
      // Assign the new case types
      this.hearingsService.propertiesUpdatedAutomatically.withinPage.caseCategories = newCaseTypes;
    }

    hmcCategoryValues.forEach((hmcCategoryValue: string) => {
      // Check if subtype has changed
      const hmcSubTypes = hmcCaseCategories.filter((hmcCaseCategory) => hmcCaseCategory.categoryParent === hmcCategoryValue);
      const svhSubTypes = shvCaseCategories.filter((shvCaseCategory) => shvCaseCategory.categoryParent === hmcCategoryValue);

      if (!_.isEqual(hmcSubTypes, svhSubTypes)) {
        // Insert the existing category value for which the sub type has changed
        this.hearingsService.propertiesUpdatedAutomatically.withinPage.caseCategories.push(hmcCategoryValue);
      }
    });

    // Remove attribute with null to ignore change in CR-84 auto update
    const newCaseCategories: CaseCategoryModel[] = [];

    shvCaseCategories.forEach((s) => {
      const caseCategory: CaseCategoryModel = {
        categoryType: s.categoryType,
        categoryValue: s.categoryValue
      };

      if (s.categoryParent) {
        caseCategory.categoryParent = s.categoryParent;
      }
      newCaseCategories.push(caseCategory);
    });

    return newCaseCategories;
  }

  private compareAndUpdateServiceHearingValues(currentValue, serviceHearingValue, pageMode: AutoUpdateMode = null, property: string = null) {
    if (!currentValue && !serviceHearingValue) {
      return currentValue;
    }
    if (!_.isEqual(currentValue, serviceHearingValue)) {
      // Store ammended properties to dispay it in UI
      if (pageMode && (property || pageMode === AutoUpdateMode.PARTY)) {
        switch (pageMode) {
          case AutoUpdateMode.WITHIN_PAGE:
            this.hearingsService.propertiesUpdatedAutomatically.withinPage[property] = true;
            break;
          case AutoUpdateMode.PAGELESS:
            this.hearingsService.propertiesUpdatedAutomatically.pageless[property] = true;
            break;
          case AutoUpdateMode.PARTY:
            this.hearingsService.propertiesUpdatedAutomatically.pageless[PagelessPropertiesEnum.PARTIES] = true;
            break;
        }
      }
    }
    return serviceHearingValue;
  }

  private updatePartyDetails(parties: PartyDetailsModel[]): PartyDetailsModel[] {
    const newParty: PartyDetailsModel[] = [];
    if (Array.isArray(this.hearingRequestMainModel.partyDetails)) {
      this.hearingRequestMainModel.partyDetails.forEach((party) => {
        const serviceParty = parties.find((serviceParty) => serviceParty.partyID === party.partyID);
        if (serviceParty) {
          if (serviceParty.partyType === PartyType.IND) {
            newParty.push({
              ...party,
              partyRole: this.compareAndUpdateServiceHearingValues(party.partyRole, serviceParty.partyRole, AutoUpdateMode.PARTY),
              individualDetails: {
                ...party.individualDetails,
                relatedParties: this.compareAndUpdateServiceHearingValues(party.individualDetails?.relatedParties, serviceParty.individualDetails?.relatedParties, AutoUpdateMode.PARTY),
                custodyStatus: this.compareAndUpdateServiceHearingValues(party.individualDetails?.custodyStatus, serviceParty.individualDetails?.custodyStatus, AutoUpdateMode.PARTY),
                vulnerableFlag: this.compareAndUpdateServiceHearingValues(party.individualDetails?.vulnerableFlag, serviceParty.individualDetails?.vulnerableFlag, AutoUpdateMode.PARTY),
                vulnerabilityDetails: this.compareAndUpdateServiceHearingValues(party.individualDetails?.vulnerabilityDetails, serviceParty.individualDetails?.vulnerabilityDetails, AutoUpdateMode.PARTY),
                hearingChannelEmail: this.compareAndUpdateServiceHearingValues(party.individualDetails?.hearingChannelEmail, serviceParty.individualDetails?.hearingChannelEmail, AutoUpdateMode.PARTY),
                hearingChannelPhone: this.compareAndUpdateServiceHearingValues(party.individualDetails?.hearingChannelPhone, serviceParty.individualDetails?.hearingChannelPhone, AutoUpdateMode.PARTY)
              },
              unavailabilityDOW: this.compareAndUpdateServiceHearingValues(party?.unavailabilityDOW, serviceParty?.unavailabilityDOW, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.PARTIES),
              unavailabilityRanges: this.compareAndUpdateServiceHearingValues(party?.unavailabilityRanges, serviceParty?.unavailabilityRanges, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.PARTIES)
            });
          } else {
            newParty.push({
              ...party,
              partyRole: this.compareAndUpdateServiceHearingValues(party.partyRole, serviceParty.partyRole, AutoUpdateMode.PARTY),
              organisationDetails: {
                ...party.organisationDetails,
                name: this.compareAndUpdateServiceHearingValues(party.organisationDetails?.name, serviceParty.organisationDetails?.name),
                organisationType: this.compareAndUpdateServiceHearingValues(party.organisationDetails?.organisationType, serviceParty.organisationDetails?.organisationType, AutoUpdateMode.PARTY),
                cftOrganisationID: this.compareAndUpdateServiceHearingValues(party.organisationDetails?.cftOrganisationID, serviceParty.organisationDetails?.cftOrganisationID, AutoUpdateMode.PARTY)
              },
              unavailabilityDOW: this.compareAndUpdateServiceHearingValues(party?.unavailabilityDOW, serviceParty?.unavailabilityDOW, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.PARTIES),
              unavailabilityRanges: this.compareAndUpdateServiceHearingValues(party?.unavailabilityRanges, serviceParty?.unavailabilityRanges, AutoUpdateMode.WITHIN_PAGE, WithinPagePropertiesEnum.PARTIES)
            });
          }
        } else {
          newParty.push(party);
        }
      });
    }
    return newParty;
  }

  private setBanner(): void {
    // check pageless automatic update
    this.isPagelessAttributeChanged = Object.entries(this.hearingsService.propertiesUpdatedAutomatically.pageless).some((prop) => prop);

    // check automatic update within page
    this.isWithinPageAttributeChanged = Object.entries(this.hearingsService.propertiesUpdatedAutomatically.withinPage).some((prop) => prop);

    // Validation error display
    if (this.pageVisitReasonableAdjustmentChangeExists() ||
      this.pageVisitNonReasonableAdjustmentChangeExists() ||
      this.pageVisitPartiesChangeExists() ||
      this.pageVisitHearingWindowChangeExists()) {
      this.hearingsService.displayValidationError = true;
    } else {
      this.hearingsService.displayValidationError = false;
    }

    // Reset submit updated request event
    this.hearingsService.submitUpdatedRequestClicked = false;
  }

  private pageVisitReasonableAdjustmentChangeExists(): boolean {
    if (!this.sectionsToDisplay.includes(this.hearingScreenEnum.HEARING_REQUIREMENTS)) {
      // Do not consider reasonable adjustments as hearing requirements is not part of the screen flow
      return false;
    }
    if (this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.reasonableAdjustmentChangesConfirmed) {
      // Reasonable adjustment changes already confirmed
      return false;
    }

    // Get the individual parties
    const individualParties = this.hearingRequestMainModel.partyDetails.filter((party) => party.partyType === PartyType.IND);
    // Return true if there are changes to the interpreter languages
    const interpreterLanguagesSHV = this.serviceHearingValuesModel.parties.map(
      (party) => party.individualDetails?.interpreterLanguage
    )?.filter(
      (interpreterLanguage) => interpreterLanguage !== null && interpreterLanguage !== undefined
    ).sort((a, b) => {
      return a > b ? 1 : (a === b ? 0 : -1);
    });
    const interpreterLanguagesHMC = individualParties.map(
      (party) => party.individualDetails?.interpreterLanguage
    )?.filter(
      (interpreterLanguage) => interpreterLanguage !== null && interpreterLanguage !== undefined
    ).sort((a, b) => {
      return a > b ? 1 : (a === b ? 0 : -1);
    });
    if (!_.isEqual(interpreterLanguagesSHV, interpreterLanguagesHMC)) {
      return true;
    }

    // HMC stores only reasonable adjustment flag ids and language interpreter flag ids under parties
    // Get only the reasonable adjustment and language interpreter flag ids from SHV and sort them for easy comparison
    const caseFlagsSHV = this.serviceHearingValuesModel.caseFlags.flags;
    const flagIdsSHV = caseFlagsSHV.map((flag) => flag.flagId)?.filter((flagId) => flagId?.startsWith('RA'))?.sort((a, b) => {
      return a > b ? 1 : (a === b ? 0 : -1);
    });
    // Get individual parties reasonable adjustment flags and sort the result
    const partyFlagIds = individualParties.map((party) => party.individualDetails?.reasonableAdjustments)?.join(',').split(',').sort((a, b) => {
      return a > b ? 1 : (a === b ? 0 : -1);
    });
    // Convert to string for easy comparison as the partyFlagIds can be an array of empty strings;
    const partyFlagIdsString = partyFlagIds?.length > 0
      ? partyFlagIds?.filter((flagId) => flagId !== '').join()
      : '';

    // Return true if there are changes in reasonable adjustments and/or language interpreter flags
    if (flagIdsSHV.join() !== partyFlagIdsString) {
      return true;
    }
    // There are no changes for reasonable adjustments and language interpreter flags when compared SHV with HMC
    return false;
  }

  private pageVisitNonReasonableAdjustmentChangeExists(): boolean {
    if (!this.sectionsToDisplay.includes(this.hearingScreenEnum.HEARING_FACILITIES)) {
      // Do not consider non-reasonable adjustment case flags as hearing facilities is not part of the screen flow
      return false;
    }
    if (this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.nonReasonableAdjustmentChangesConfirmed) {
      // Reasonable adjustment changes already confirmed
      return false;
    }
    const caseFlagsModifiedDate = this.serviceHearingValuesModel.caseFlags.flags.map((flags) => flags.dateTimeModified);
    const caseFlagsCreatedDate = this.serviceHearingValuesModel.caseFlags.flags.map((flags) => flags.dateTimeCreated);
    const caseFlagsWithModifiedDate = caseFlagsModifiedDate.filter((date) => date !== null).filter((date) => date !== undefined);
    const caseFlagsWithCreatedDate = caseFlagsCreatedDate.filter((date) => date !== null).filter((date) => date !== undefined);

    if (caseFlagsWithModifiedDate.length > 0 || caseFlagsWithCreatedDate.length > 0) {
      // Check for the caseflags timestamp with HMC timestamp
      return caseFlagsWithModifiedDate.some((date) => new Date(date) > new Date(this.hearingRequestMainModel.requestDetails?.timestamp)) ||
        caseFlagsWithCreatedDate.some((date) => new Date(date) > new Date(this.hearingRequestMainModel.requestDetails?.timestamp));
    }
    return false;
  }

  private pageVisitPartiesChangeExists(): boolean {
    if (this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.partyDetailsChangesConfirmed) {
      // Reasonable adjustment changes already confirmed
      return false;
    }
    const partiesSHV = this.serviceHearingValuesModel.parties;
    const partiesHMC = this.hearingRequestMainModel.partyDetails;
    // Return true if the number of parties in SHV and HMC are different
    if (partiesSHV.length !== partiesHMC.length) {
      return true;
    }
    // Number of parties are the same in both SHV and HMC
    // Loop through the parties in SHV, locate the corresponding party in HMC
    // and return true if there are any changes in the party name of party type
    for (const partySHV of partiesSHV) {
      const party = partiesHMC.find((partyHMC) => partyHMC.partyID === partySHV.partyID);
      if (party.partyType !== partySHV.partyType ||
        HearingsUtils.hasPartyNameChanged(party, partySHV)) {
        return true;
      }
    }
    // There are no changes for parties when compared SHV with HMC
    return false;
  }

  private pageVisitHearingWindowChangeExists(): boolean {
    if (!this.sectionsToDisplay.includes(this.hearingScreenEnum.HEARING_TIMING)) {
      // Do not consider hearing window changes as hearing timing is not part of the screen flow
      return false;
    }
    if (this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.hearingWindowChangesConfirmed) {
      // Reasonable adjustment changes already confirmed
      return false;
    }
    const hearingWindowHMC = this.hearingRequestMainModel.hearingDetails.hearingWindow;
    if (hearingWindowHMC?.firstDateTimeMustBe) {
      const partiesNotAvailableDatesHMC = HearingsUtils.getPartiesNotAvailableDates(this.hearingRequestToCompareMainModel.partyDetails);
      const partiesNotAvailableDatesSHV = HearingsUtils.getPartiesNotAvailableDates(this.serviceHearingValuesModel.parties);
      if (!_.isEqual(partiesNotAvailableDatesSHV, partiesNotAvailableDatesHMC)) {
        return true;
      }
    }
    return false;
  }
}
