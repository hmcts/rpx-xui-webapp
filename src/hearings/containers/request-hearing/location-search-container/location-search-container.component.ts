import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '@hmcts/rpx-xui-common-lib/lib/services/locations/location.service';
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
  @Input() public selectedLocations$: Observable<LocationModel[]>;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, private readonly locationService: LocationService, fb: FormBuilder) {
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

    this.findLocationForm.controls.locationSelected.valueChanges.subscribe(locationSelected => this.addSelection(locationSelected));
  }

  public addSelection(location: LocationModel) {
    if (location) {
      this.selectedLocations$.subscribe(selectedLocations => {
          selectedLocations.push(location);
          // this.selectedLocation = null;
          this.locations$ = of([]);
      });
    }

    // this.selectedLocation = undefined;
  }

  public removeSelection(location: LocationModel) {
    this.selectedLocations$.subscribe(selectedLocations => {
      const index = selectedLocations.findIndex(selectedLocation => selectedLocation.court_venue_id === location.court_venue_id);
      selectedLocations.splice(index, 1);
    });
  }

  public getLocations(term: string): Observable<LocationModel[]> {
    return this.locationService.getAllLocations(this.serviceId, this.locationType, term);
  }
}
