import { Component, Input, OnInit } from '@angular/core';
import { HearingLocationModel } from '../../../models/hearingLocation.model';
import { LocationsDataService } from '../../../services/locations-data.service';
import { LocationByEPIMMSModel } from '../../../models/location.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'exui-hearing-venue-section',
  templateUrl: './hearing-venue-section.component.html'
})
export class HearingVenueSectionComponent implements OnInit {
  @Input() public hearingLocations: HearingLocationModel[];
  public locations$: Observable<LocationByEPIMMSModel[]>;

  constructor(private readonly locationsDataService: LocationsDataService) {
  }

  public ngOnInit(): void {
    const locationIds = this.hearingLocations.map((hearingLocation) => hearingLocation.locationId).join(',');
    this.locations$ = this.locationsDataService.getLocationById(locationIds);
  }
}
