import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import * as fromHearingStore from '../../../../../hearings/store';
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

  public hearingState$: Observable<fromHearingStore.State>;
  public showAmmendedForHeading: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;
  public hearingLocationsToCompare: string[];

  constructor(private readonly locationsDataService: LocationsDataService,
    private readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    const locationIds = this.hearingLocations.map((hearingLocation) => hearingLocation.locationId).join(',');
    this.locations$ = this.locationsDataService.getLocationById(locationIds);
    this.hearingState$.subscribe((state) => {
      this.hearingLocationsToCompare = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingLocations.map((loc) => loc.locationId);
      const objB = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingLocations.map((loc) => loc.locationId);
      this.showAmmendedForHeading = !_.isEqual(this.hearingLocationsToCompare, objB);
    });
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-venue#inputLocationSearch';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  public showAmmended(locationId: string): boolean {
    return !this.hearingLocationsToCompare.includes(locationId);
  }
}
