import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { LocationByEPIMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';
@Component({
  selector: 'exui-location-search-container',
  templateUrl: './location-search-container.component.html',
  styleUrls: ['./location-search-container.component.scss']
})
export class LocationSearchContainerComponent implements OnInit {
  public locationType: string;
  public findLocationFormGroup: FormGroup;
  public selectedLocations$: Observable<LocationByEPIMSModel[]>;
  public serviceIds: string = 'SSCS';

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, fb: FormBuilder) {
    this.findLocationFormGroup =  fb.group({
      locationSelectedFormControl: [null]
    });
    this.selectedLocations$ = of([]);
  }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    ).subscribe(id => {
      this.serviceIds = id ? id : this.serviceIds;
    });
  }

  public addSelection(): void {
    if (this.findLocationFormGroup.controls.locationSelectedFormControl.value) {
      this.selectedLocations$.subscribe(selectedLocations => {
          selectedLocations.push(this.findLocationFormGroup.controls.locationSelectedFormControl.value as LocationByEPIMSModel);
          this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
      });
    }
  }

  public removeSelection(location: LocationByEPIMSModel): void {
    this.selectedLocations$.subscribe(selectedLocations => {
      const index = selectedLocations.findIndex(selectedLocation => selectedLocation.epims_id === location.epims_id);
      selectedLocations.splice(index, 1);
    });
  }
}
