import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import { HearingsService } from '../../../../../hearings/services/hearings.service';
import * as fromHearingStore from '../../../../../hearings/store';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { LovRefDataModel } from '../../../../models/lovRefData.model';

@Component({
  selector: 'exui-additional-facilities-section',
  templateUrl: './additional-facilities-section.component.html'
})
export class AdditionalFacilitiesSectionComponent implements OnInit {
  @Input() public additionalFacilitiesRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public additionalFacilitiesRequiredText: string;
  public additionalFacilities: string[] = [];
  public amendmentLabelEnum = AmendmentLabelStatus;
  public nonReasonableAdjustmentChangesRequired: boolean;
  public nonReasonableAdjustmentChangesConfirmed: boolean;
  public hearingState$: Observable<fromHearingStore.State>;
  public showAmended: boolean;
  public facilitiesRequiredToCompare: string[];

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
    private readonly hearingsService: HearingsService) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.additionalFacilitiesRequiredText = this.hearingRequestMainModel.caseDetails?.caseAdditionalSecurityFlag
      ? 'Yes'
      : 'No';

    this.hearingRequestMainModel.hearingDetails?.facilitiesRequired?.forEach((facility) => {
      const facilityFromRefData = this.additionalFacilitiesRefData.find((facilityRefData) => facilityRefData.key === facility);
      if (facilityFromRefData) {
        this.additionalFacilities.push(facilityFromRefData.value_en);
      }
    });

    this.nonReasonableAdjustmentChangesRequired = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.nonReasonableAdjustmentChangesRequired;
    this.nonReasonableAdjustmentChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.nonReasonableAdjustmentChangesConfirmed;
    this.hearingState$.subscribe((state) => {
      this.facilitiesRequiredToCompare = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.facilitiesRequired || [];
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag;
      const objB = state.hearingRequest.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag;
      this.showAmended = !_.isEqual(objA, objB);
    });
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    if (fragmentId === 'additionalSecurityRequired') {
      changeLink = '/hearings/request/hearing-facilities#additionalSecurityYes';
    } else {
      changeLink = '/hearings/request/hearing-facilities#immigrationDetentionCentre';
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  public showAmendedForFacilitiesRequired(facility: string): boolean {
    return !this.facilitiesRequiredToCompare.includes(this.additionalFacilitiesRefData.find((facilityRefData) => facilityRefData.value_en === facility).key);
  }
}
