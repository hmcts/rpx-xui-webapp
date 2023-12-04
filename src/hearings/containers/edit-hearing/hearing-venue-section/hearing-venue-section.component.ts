import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HearingLocationModel } from '../../../models/hearingLocation.model';
import { LocationByEPIMMSModel } from '../../../models/location.model';
import { LocationsDataService } from '../../../services/locations-data.service';
import { editHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-hearing-venue-section',
  templateUrl: './hearing-venue-section.component.html'
})
export class HearingVenueSectionComponent implements OnInit {
  @Input() public hearingLocations: HearingLocationModel[];
  @Output() public changeEditHearing = new EventEmitter<string>();

  public locations$: Observable<LocationByEPIMMSModel[]>;

  constructor(private readonly locationsDataService: LocationsDataService) {
  }

  public ngOnInit(): void {
    const locationIds = this.hearingLocations.map((hearingLocation) => hearingLocation.locationId).join(',');
    this.locations$ = this.locationsDataService.getLocationById(locationIds);
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    if (fragmentId === 'additionalSecurityRequired') {
      changeLink = '/hearings/request/hearing-facilities#additionalSecurityYes';
    } else {
      changeLink = '/hearings/request/hearing-facilities#immigrationDetentionCentre';
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
