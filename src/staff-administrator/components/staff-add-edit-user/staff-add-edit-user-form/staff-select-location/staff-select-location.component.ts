import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RefDataService } from '@hmcts/rpx-xui-common-lib';
import { combineLatest, iif, Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { LocationByEpimmsModelWithServiceCodes } from '../../../../models/location-by-service-code-model';
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

  public filteredList$: Observable<LocationByEpimmsModelWithServiceCodes[] | boolean>;
  public searchTermFormControl: FormControl = new FormControl('');
  public autocompleteSelectedLocation: LocationByEpimmsModelWithServiceCodes | false;
  private fullLocations: LocationByEpimmsModelWithServiceCodes[];

  private initialLocationServicesSet = false;

  public get selectedLocations(): StaffUserLocation[] {
    return this.locationsControl?.value;
  }

  constructor(private readonly refDataService: RefDataService) { }

  public ngOnInit() {
    this.filteredList$ = combineLatest([
      this.searchTermFormControl.valueChanges.pipe(startWith('')),
      this.serviceCodes$
    ]).pipe(
      tap(([term]: [string, string[]]) => {
        if (this.autocompleteSelectedLocation && term !== this.autocompleteSelectedLocation?.venue_name) {
          this.autocompleteSelectedLocation = false;
        }
      }),
      switchMap(([term, serviceCodes]: [string, string[]]) => iif(
        () => ((!!term && term.length >= 0) || !this.initialLocationServicesSet),
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
          // Give each location a respective list of service codes
          map((locations) => this.setLocationServiceCodes(locations)),
        ),
        // Returns false if the search term is empty to not show the autocomplete field i.e. ngIf should be false
        of(false)
      )
      )
    );
  }

  private setLocationServiceCodes(locations: LocationByEpimmsModelWithServiceCodes[]): LocationByEpimmsModelWithServiceCodes[] {
    locations.map((location) => {
      const currentId = location.epimms_id.toString();
      const serviceCodes = location.serviceCodes;
      location.serviceCodes = this.getAllServiceCodes(serviceCodes, currentId);
    });
    // EUI-8051 - as well as setting the correct service codes for new locations, we need to edit them for existing locations
    // note: we could edit location types to produce less code - i.e. making them the same
    const fixedSelectedLocations = this.locationsControl.value;
    fixedSelectedLocations.forEach((location) => {
      const currentId = location.location_id.toString();
      const serviceCodes = location.service_codes ? location.service_codes : [];
      location.service_codes = this.getAllServiceCodes(serviceCodes, currentId);
    });
    this.locationsControl.setValue(fixedSelectedLocations);
    this.initialLocationServicesSet = true;
    return locations;
  }

  private getAllServiceCodes(serviceCodes: string[], currentId: string): string[] {
    const duplicateServiceLocations = this.fullLocations.filter((duplicateLocation) => duplicateLocation.epimms_id === currentId && duplicateLocation.serviceCodes[0] !== serviceCodes[0]);
    duplicateServiceLocations.forEach((duplicateLocation) => {
      if (!serviceCodes.includes(duplicateLocation.serviceCodes[0])) {
        serviceCodes.push(duplicateLocation.serviceCodes[0]);
      }
    });
    return serviceCodes;
  }

  public onSelectionChange(location: LocationByEpimmsModelWithServiceCodes) {
    this.searchTermFormControl.setValue(location.venue_name);
  }

  public addLocation() {
    if (this.autocompleteSelectedLocation) {
      const locationToBeAdded = {
        location_id: this.autocompleteSelectedLocation.epimms_id,
        location: this.autocompleteSelectedLocation.venue_name,
        is_primary: this.isPrimaryMode,
        service_codes: this.autocompleteSelectedLocation.serviceCodes
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
    locations: LocationByEpimmsModelWithServiceCodes[],
    selectedLocations: StaffUserLocation[],
  ): LocationByEpimmsModelWithServiceCodes[] {
    this.fullLocations = locations;
    return locations.filter(
      (location) => !selectedLocations.map((selectedLocation) => selectedLocation.location_id).includes(location.epimms_id) && location.venue_name
    );
  }
}
