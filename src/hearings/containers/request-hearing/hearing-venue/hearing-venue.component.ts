import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SearchLocationComponent} from '@hmcts/rpx-xui-common-lib';
import {LocationByEPIMMSModel} from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as fromHearingStore from '../../../../hearings/store';
import {HearingLocationModel} from '../../../models/hearingLocation.model';
import {ACTION, HearingErrorMessage, HMCLocationType} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import {LocationsDataService} from '../../../services/locations-data.service';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-venue',
  templateUrl: './hearing-venue.component.html',
  styleUrls: ['./hearing-venue.component.scss']
})
export class HearingVenueComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public locationType: string;
  public locationSub: Subscription;
  public selectedLocation: LocationByEPIMMSModel;
  public serviceIds: string = '';
  public findLocationFormGroup: FormGroup;

  @ViewChild(SearchLocationComponent) public searchLocationComponent: SearchLocationComponent;
  public selectedLocations: LocationByEPIMMSModel[];
  public validationErrors: { id: string, message: string }[] = [];

  constructor(public readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly fb: FormBuilder,
              protected readonly hearingsService: HearingsService,
              protected readonly locationsDataService: LocationsDataService,
              protected readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService, route);
    this.findLocationFormGroup = fb.group({
      locationSelectedFormControl: [null, Validators.required]
    });

    this.selectedLocations = [];
  }

  public ngOnInit(): void {
    this.reInitiateState();
    this.serviceIds = this.serviceHearingValuesModel.hmctsServiceID;
  }

  public reInitiateState() {
    if (this.hearingRequestMainModel.hearingDetails &&
      this.hearingRequestMainModel.hearingDetails.hearingLocations &&
      this.hearingRequestMainModel.hearingDetails.hearingLocations.length) {
      const locationIds = this.hearingRequestMainModel.hearingDetails.hearingLocations.map(location => location.locationId).join(',');
      this.locationSub = this.locationsDataService.getLocationById(locationIds).subscribe(locations => {
        this.selectedLocations = locations;
      });
    }
  }

  public addSelection(): void {
    if (this.findLocationFormGroup.controls.locationSelectedFormControl.value) {
      this.appendLocation(this.selectedLocations);
      this.validationErrors = [];
    } else {
      this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
      this.setLocationError(HearingErrorMessage.ENTER_A_VALID_LOCATION);
    }
  }

  private setLocationError(message: string) {
    this.findLocationFormGroup.controls.locationSelectedFormControl.markAsDirty();
    this.validationErrors.push({id: 'input-selected-location-label', message});
  }

  public appendLocation(selectedLocations: LocationByEPIMMSModel[]) {
    selectedLocations.push(this.findLocationFormGroup.controls.locationSelectedFormControl.value as LocationByEPIMMSModel);
    this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
    this.findLocationFormGroup.controls.locationSelectedFormControl.markAsPristine();
    this.updateHearingConditions();
  }

  public removeSelection(location: LocationByEPIMMSModel): void {
    const index = this.selectedLocations.findIndex(selectedLocation => selectedLocation.epimms_id === location.epimms_id);
    this.selectedLocations.splice(index, 1);
    this.updateHearingConditions();
  }

  public updateHearingConditions(): void {
    const strRegions = this.selectedLocations.map(location => location.region).join(',');
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions({region: strRegions}));
  }

  public isLocationValid() {
    if (!this.findLocationFormGroup.controls.locationSelectedFormControl.valid &&
      this.findLocationFormGroup.controls.locationSelectedFormControl.errors.required &&
      this.findLocationFormGroup.controls.locationSelectedFormControl.dirty) {
      return false;
    } else {
      this.validationErrors = [];
      return true;
    }
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      if (this.isFormValid()) {
        this.prepareHearingRequestData();
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public prepareHearingRequestData(): void {
    const locations: HearingLocationModel[] = this.selectedLocations.map(locationByEPIMMSModel => {
      return {
        locationType: HMCLocationType.COURT,
        locationId: locationByEPIMMSModel.epimms_id,
        locationName: locationByEPIMMSModel.court_name,
        region: locationByEPIMMSModel.region,
      } as HearingLocationModel;
    });
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        hearingLocations: locations
      }
    };
  }

  public isFormValid(): boolean {
    let returnValue: boolean = true;
    if (this.findLocationFormGroup.controls.locationSelectedFormControl.valid) {
      returnValue = false;
      this.setLocationError(HearingErrorMessage.ENTER_A_VALID_LOCATION);
    }

    if (!this.selectedLocations.length) {
      returnValue = false;
      this.setLocationError(HearingErrorMessage.ENTER_A_LOCATION);
    }
    return returnValue;
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    if (this.locationSub) {
      this.locationSub.unsubscribe();
    }
  }
}
