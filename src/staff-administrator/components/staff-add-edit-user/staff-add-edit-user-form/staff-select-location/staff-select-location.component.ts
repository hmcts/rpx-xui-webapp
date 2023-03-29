import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RefDataService } from '@hmcts/rpx-xui-common-lib';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'exui-staff-select-location',
  templateUrl: './staff-select-location.component.html',
  styleUrls: ['./staff-select-location.component.scss']
})
export class StaffSelectLocationComponent implements OnInit {
  public locationControl = new FormControl([]);
  public filteredList$: Observable<LocationByEPIMMSModel[] | boolean>;
  public searchTermFormControl: FormControl = new FormControl('');

  public get selectedLocations(): LocationByEPIMMSModel[] {
    return this.locationControl.value;
  }

  constructor(private readonly refDataService: RefDataService) {

  }
  public ngOnInit() {
    this.filteredList$ = this.searchTermFormControl.valueChanges.pipe(
      switchMap((term: string) => iif(
          // Seems more responsive to do length 0 if locationsByServiceCodes are cached
          () => (!!term && term.length >= 0),
          this.refDataService.getLocationsByServiceCodes(
            ['AAA7', 'BFA1']
          ).pipe(
            // Filter locations by the search input term and the chosen property name
            map((locations) => locations
              .filter((location) => location.venue_name.toLowerCase().includes(term.toLowerCase()))),
            // Filter out locations that are already selected
            map((locations) => this.filterUnselectedLocations(locations, this.selectedLocations)),
            // Filter out duplicate locations (by propertyNameFilter)
            map((locations) => locations.filter((location, index, array) =>
              index === array.findIndex((item) => item.venue_name === location.venue_name)
            )),
          ),
          // Returns false if the search term is empty to not show the autocomplete field i.e. ngIf should be false
          of(false)
        )
      )
    );
  }
  public addLocation() {

  }

  public removeLocation(item: any) {}

  private filterUnselectedLocations(
    locations: LocationByEPIMMSModel[],
    selectedLocations: LocationByEPIMMSModel[],
  ): LocationByEPIMMSModel[] {
    return locations.filter(
      location => !selectedLocations.map(selectedLocation => selectedLocation.epimms_id).includes(location.epimms_id) && location.venue_name
    );
  }
}
