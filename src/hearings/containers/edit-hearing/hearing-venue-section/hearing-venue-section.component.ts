import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HearingLocationModel } from '../../../models/hearingLocation.model';
import { LocationByEPIMMSModel } from '../../../models/location.model';
import { LocationsDataService } from '../../../services/locations-data.service';

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
