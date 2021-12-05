import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { SearchLocationComponent } from '@hmcts/rpx-xui-common-lib';
import { Store, select } from '@ngrx/store';
import { LocationByEPIMSModel } from 'api/locations/models/location.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';
@Component({
  selector: 'exui-location-search-container',
  templateUrl: './location-search-container.component.html',
  styleUrls: ['./location-search-container.component.scss']
})
export class LocationSearchContainerComponent implements OnInit  {
  public locationType: string;
  public selectedLocations$: Observable<LocationByEPIMSModel[]>;
  public locationsFound$: Observable<LocationByEPIMSModel[]>;
  public selectedLocation: LocationByEPIMSModel;
  public serviceIds: string = 'SSCS';
  public findLocationFormGroup: FormGroup;

  @ViewChild(SearchLocationComponent) public searchLocationComponent: SearchLocationComponent;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, fb: FormBuilder) {
    this.findLocationFormGroup =  fb.group({
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

    if (this.searchLocationComponent && this.searchLocationComponent.autoCompleteInputBox && this.searchLocationComponent.autoCompleteInputBox.nativeElement) {
      this.searchLocationComponent.autoCompleteInputBox.nativeElement.focus();
    }
  }

  public addSelection(): void {
    if (this.findLocationFormGroup.controls.locationSelectedFormControl.value) {
      this.selectedLocations$.subscribe(selectedLocations => {
          this.appendLocation(selectedLocations);
      });
    } else {
      this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
      this.findLocationFormGroup.controls.locationSelectedFormControl.markAsDirty();
    }
  }

  public appendLocation(selectedLocations: LocationByEPIMSModel[]) {
    selectedLocations.push(this.findLocationFormGroup.controls.locationSelectedFormControl.value as LocationByEPIMSModel);
    this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
    this.findLocationFormGroup.controls.locationSelectedFormControl.markAsPristine();
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
}
