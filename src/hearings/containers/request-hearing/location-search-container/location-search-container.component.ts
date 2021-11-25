import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { LocationModel } from 'api/locations/models/location.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';
@Component({
  selector: 'exui-location-search-container',
  templateUrl: './location-search-container.component.html',
})
export class LocationSearchContainerComponent implements OnInit {
  public serviceId: string = 'SSCS';
  public locations$: Observable<LocationModel[]>;
  public locationType: string;
  public findLocationForm: FormGroup;
  public selectedLocations$: Observable<LocationModel[]>;
  public selectedLocation: LocationModel;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, fb: FormBuilder) {
    this.findLocationForm =  fb.group({
      locationSelected: [null]
    });

    this.selectedLocations$ = of([]);
  }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingsList)).pipe(
      map(hearingList => hearingList.caseHearingsMainModel ? hearingList.caseHearingsMainModel.hmctsServiceID : '')
    ).subscribe(id => {
      this.serviceId = id ? id : this.serviceId;
    });
  }

  public addSelection() {
    this.selectedLocations$.subscribe(selectedLocations => {
        selectedLocations.push(this.findLocationForm.controls.locationSelected.value as LocationModel);
        this.findLocationForm.controls.locationSelected.setValue(undefined);
        this.locations$ = of([]);
    });
  }

  public removeSelection(location: LocationModel) {
    this.selectedLocations$.subscribe(selectedLocations => {
      const index = selectedLocations.findIndex(selectedLocation => selectedLocation.court_venue_id === location.court_venue_id);
      selectedLocations.splice(index, 1);
    });
  }
}
