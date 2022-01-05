import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchLocationComponent } from '@hmcts/rpx-xui-common-lib';
import { LocationByEPIMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';
import { HearingLocationModel } from '../../../models/hearingLocation.model';
import { ACTION, CONDITION_OPERATOR } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-venue',
  templateUrl: './hearing-venue.component.html',
  styleUrls: ['./hearing-venue.component.scss']
})
export class HearingVenueComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public locationType: string;
  public selectedLocations$: Observable<LocationByEPIMSModel[]>;
  public locationsFound$: Observable<LocationByEPIMSModel[]>;
  public selectedLocation: LocationByEPIMSModel;
  public serviceIds: string = 'SSCS';
  public findLocationFormGroup: FormGroup;

  @ViewChild(SearchLocationComponent) public searchLocationComponent: SearchLocationComponent;
  public selectedLocationsSub: Subscription;
  private selectedLocations: LocationByEPIMSModel[];
  public validationErrors: { id: string, message: string }[] = [];

  constructor(
    public readonly hearingStore: Store<fromHearingStore.State>, fb: FormBuilder,
    protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
    this.findLocationFormGroup = fb.group({
      locationSelectedFormControl: [null, Validators.required]
    });

    this.selectedLocations$ = of([]);
    this.locationsFound$ = of([]);
  }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    ).subscribe(id => {
      this.serviceIds = id ? id : this.serviceIds;
    });

    if (this.hearingRequestMainModel.hearingDetails &&
      this.hearingRequestMainModel.hearingDetails.hearingLocations &&
      this.hearingRequestMainModel.hearingDetails.hearingLocations.length) {
      const locations: LocationByEPIMSModel[] = this.hearingRequestMainModel.hearingDetails.hearingLocations.map(hearingLocationModel => {
        return {
          epims_id: hearingLocationModel.locationId,
          court_name: hearingLocationModel.locationName,
        } as LocationByEPIMSModel;
      });
      this.selectedLocations$ = of(locations);
    }

    this.selectedLocations$.subscribe(selectedLocations => {
      this.selectedLocations = selectedLocations;
    });

    this.getLocationSearchFocus();
  }

  public addSelection(): void {
    if (this.findLocationFormGroup.controls.locationSelectedFormControl.value) {
      this.selectedLocations$.subscribe(selectedLocations => {
        this.appendLocation(selectedLocations);
        this.validationErrors = [];
      });
    } else {
      this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
      this.setLocationError('Enter a valid location');
    }
  }

  private setLocationError(message: string) {
    this.findLocationFormGroup.controls.locationSelectedFormControl.markAsDirty();
    this.validationErrors.push({ id: 'input-selected-location-label', message });
  }

  public appendLocation(selectedLocations: LocationByEPIMSModel[]) {
    selectedLocations.push(this.findLocationFormGroup.controls.locationSelectedFormControl.value as LocationByEPIMSModel);
    this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
    this.findLocationFormGroup.controls.locationSelectedFormControl.markAsPristine();
    this.locationsFound$ = of([]);
  }

  public removeSelection(location: LocationByEPIMSModel): void {
    this.selectedLocations$.subscribe(selectedLocations => {
      const index = selectedLocations.findIndex(selectedLocation => selectedLocation.epims_id === location.epims_id);
      selectedLocations.splice(index, 1);
    });
  }

  public getLocationSearchFocus() {
    if (this.searchLocationComponent &&
      this.searchLocationComponent.autoCompleteInputBox &&
      this.searchLocationComponent.autoCompleteInputBox.nativeElement) {
      this.searchLocationComponent.autoCompleteInputBox.nativeElement.focus();
    }
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
    const outcome = this.selectedLocations.filter(x => x.region && x.region.toLowerCase() === 'wales').length ? { region: 'Wales' } : { region: 'other' };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(outcome));
    const locations: HearingLocationModel[] = this.selectedLocations.map(locationByEPIMSModel => {
      return {
        locationType: 'hearing',
        locationId: locationByEPIMSModel.epims_id,
        locationName: locationByEPIMSModel.court_name
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
      this.setLocationError('Enter a valid location');
    }

    if (!this.selectedLocations.length) {
      returnValue = false;
      this.setLocationError('Enter a location');
    }
    return returnValue;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
