import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RefDataService } from '@hmcts/rpx-xui-common-lib';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

interface StaffUserLocation {
  location_id: string;
  location: string;
  is_primary: boolean;
}

@Component({
  selector: 'exui-staff-select-location',
  templateUrl: './staff-select-location.component.html',
  styleUrls: ['./staff-select-location.component.scss']
})
export class StaffSelectLocationComponent implements OnInit {
  @Input() public mode: 'primary' | 'secondary';
  @Input() public formGroup: FormGroup;
  @Input() public controlName: string;
  public locationControl: FormControl;
  public filteredList$: Observable<LocationByEPIMMSModel[] | boolean>;
  public searchTermFormControl: FormControl = new FormControl('');
  public autocompleteSelectedLocation: LocationByEPIMMSModel | false;

  public get selectedLocations(): StaffUserLocation[] {
    return this.locationControl?.value;
  }

  constructor(private readonly refDataService: RefDataService) {}

  public ngOnInit() {
    this.locationControl = this.formGroup.get(this.controlName) as FormControl;

    this.filteredList$ = this.searchTermFormControl.valueChanges.pipe(
      tap((term) => {
        if (this.autocompleteSelectedLocation && term !== this.autocompleteSelectedLocation?.venue_name) {
          this.autocompleteSelectedLocation = false;
        }
      }),
      switchMap((term: string) => iif(
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

  public onSelectionChange(location: LocationByEPIMMSModel) {
    this.searchTermFormControl.setValue(location.venue_name);
  }

  public addLocation() {
    if (this.autocompleteSelectedLocation) {
      const locationToBeAdded = {
        location_id: this.autocompleteSelectedLocation.epimms_id,
        location: this.autocompleteSelectedLocation.venue_name,
        is_primary: this.mode === 'primary'
      };

      this.locationControl.setValue([...this.selectedLocations, locationToBeAdded]);

      this.searchTermFormControl.setValue('', { emitEvent: false });
      this.autocompleteSelectedLocation = false;
    }
  }

  public removeLocation(location: StaffUserLocation) {
    const updatedLocations = this.selectedLocations.filter(
      (selectedLocation) => selectedLocation.location_id !== location.location_id
    );
    this.locationControl.setValue(updatedLocations);
  }

  private filterUnselectedLocations(
    locations: LocationByEPIMMSModel[],
    selectedLocations: StaffUserLocation[],
  ): LocationByEPIMMSModel[] {
    return locations.filter(
      location => !selectedLocations.map(selectedLocation => selectedLocation.location_id).includes(location.epimms_id) && location.venue_name
    );
  }
}
