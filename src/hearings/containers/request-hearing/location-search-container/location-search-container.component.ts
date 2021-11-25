import { Component, OnInit } from '@angular/core';
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
  public locationType: string;
  public findLocationForm: FormGroup;
  public selectedLocations$: Observable<LocationModel[]>;
  public selectedLocation: LocationModel;
  public serviceIds: string = 'SSCS';

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, fb: FormBuilder) {
    this.findLocationForm =  fb.group({
      locationSelected: [null]
    });

    this.selectedLocations$ = of([]);
  }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    ).subscribe(id => {
      this.serviceIds = id ? id : this.serviceIds;
    });
  }

  public addSelection() {
    this.selectedLocations$.subscribe(selectedLocations => {
        selectedLocations.push(this.findLocationForm.controls.locationSelected.value as LocationModel);
        this.findLocationForm.controls.locationSelected.setValue(undefined);
    });
  }

  public removeSelection(location: LocationModel) {
    this.selectedLocations$.subscribe(selectedLocations => {
      const index = selectedLocations.findIndex(selectedLocation => selectedLocation.court_venue_id === location.court_venue_id);
      selectedLocations.splice(index, 1);
    });
  }
}
