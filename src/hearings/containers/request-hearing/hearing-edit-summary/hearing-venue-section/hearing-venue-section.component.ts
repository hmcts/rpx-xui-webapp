import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingLocationModel } from '../../../../models/hearingLocation.model';
import { LocationByEPIMMSModel } from '../../../../models/location.model';
import { LocationsDataService } from '../../../../services/locations-data.service';

@Component({
  selector: 'exui-hearing-venue-section',
  templateUrl: './hearing-venue-section.component.html'
})
export class HearingVenueSectionComponent implements OnInit {
  @Input() public hearingLocations: HearingLocationModel[];
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public locations$: Observable<LocationByEPIMMSModel[]>;

  constructor(private readonly locationsDataService: LocationsDataService) {
  }

  public ngOnInit(): void {
    const locationIds = this.hearingLocations.map((hearingLocation) => hearingLocation.locationId).join(',');
    this.locations$ = this.locationsDataService.getLocationById(locationIds);
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-venue#inputLocationSearch';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
