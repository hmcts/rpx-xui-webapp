import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RefDataService } from '@hmcts/rpx-xui-common-lib';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { combineLatest, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { StaffUserLocation } from '../../../../models/staff-user-location.model';

@Component({
  selector: 'exui-staff-select-location',
  templateUrl: './staff-select-location.component.html',
  styleUrls: ['./staff-select-location.component.scss']
})
export class StaffSelectLocationComponent implements OnInit {
  @Input() public isPrimaryMode = false;
  @Input() public locationsControl: FormControl;
  @Input() public addButtonTitle: string = 'Add location';
  @Input() public serviceCodes$: Observable<string[]> = of([]);

  public filteredList$: Observable<LocationByEPIMMSModel[] | boolean>;
  public searchTermFormControl: FormControl = new FormControl('');
  public autocompleteSelectedLocation: LocationByEPIMMSModel | false;

  public get selectedLocations(): StaffUserLocation[] {
    return this.locationsControl?.value;
  }

  constructor(private readonly refDataService: RefDataService) { }

  public ngOnInit() {
    this.filteredList$ = combineLatest([
      this.searchTermFormControl.valueChanges,
      this.serviceCodes$
    ]).pipe(
      tap(([term]: [string, string[]]) => {
        if (this.autocompleteSelectedLocation && term !== this.autocompleteSelectedLocation?.venue_name) {
          this.autocompleteSelectedLocation = false;
        }
      }),
      switchMap(([term, serviceCodes]: [string, string[]]) => iif(
        () => (!!term && term.length >= 0),
        this.refDataService.getLocationsByServiceCodes(
          serviceCodes
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
        is_primary: this.isPrimaryMode
      };

      // If Primary, we need to remove the other primary location first
      let currentSelectedLocations = this.selectedLocations;
      if (this.isPrimaryMode) {
        currentSelectedLocations = this.selectedLocations.filter(
          (selectedLocation) => !selectedLocation.is_primary
        );
      }

      this.locationsControl.setValue([...currentSelectedLocations, locationToBeAdded]);

      this.searchTermFormControl.setValue('', { emitEvent: false });
      this.autocompleteSelectedLocation = false;
    }
  }

  public removeLocation(location: StaffUserLocation) {
    const updatedLocations = this.selectedLocations.filter(
      (selectedLocation) => selectedLocation.location_id !== location.location_id
    );
    this.locationsControl.setValue(updatedLocations);
  }

  private filterUnselectedLocations(
    locations: LocationByEPIMMSModel[],
    selectedLocations: StaffUserLocation[],
  ): LocationByEPIMMSModel[] {
    return locations.filter(
      (location) => !selectedLocations.map((selectedLocation) => selectedLocation.location_id).includes(location.epimms_id) && location.venue_name
    );
  }
}
