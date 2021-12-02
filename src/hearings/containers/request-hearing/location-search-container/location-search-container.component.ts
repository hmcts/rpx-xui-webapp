import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { SearchLocationComponent } from '@hmcts/rpx-xui-common-lib';
import { Store, select } from '@ngrx/store';
import { LocationByEPIMSModel } from 'api/locations/models/location.model';
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
  public selectedLocations$: Observable<LocationByEPIMSModel[]>;
  public locationsFound$: Observable<LocationByEPIMSModel[]>;
  public selectedLocation: LocationByEPIMSModel;
  public serviceIds: string = 'SSCS';
  public dirty: boolean = false;
  @ViewChild(SearchLocationComponent) public searchLocationComponent: SearchLocationComponent;
  @Input() public control: AbstractControl;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, fb: FormBuilder) {
    this.selectedLocations$ = of([]);
    this.locationsFound$ = of([]);
  }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    ).subscribe(id => {
      this.serviceIds = id ? id : this.serviceIds;
    });

    this.control.valueChanges.subscribe((newValue) => newValue.value ? this.control.markAsPristine(): this.control.markAsDirty());

    if (this.searchLocationComponent.autoCompleteInputBox && this.searchLocationComponent.autoCompleteInputBox.nativeElement) {
      this.searchLocationComponent.autoCompleteInputBox.nativeElement.focus();
    }
  }

  public addSelection(): void {
    if (this.control.value) {
      this.selectedLocations$.subscribe(selectedLocations => {
          selectedLocations.push(this.control.value as LocationByEPIMSModel);
          this.control.setValue(undefined);
          this.control.markAsPristine();
      });
    } else {
      this.control.setValue(undefined);
      this.control.markAsDirty();
    }
  }

  public removeSelection(location: LocationByEPIMSModel): void {
    this.selectedLocations$.subscribe(selectedLocations => {
      const index = selectedLocations.findIndex(selectedLocation => selectedLocation.epims_id === location.epims_id);
      selectedLocations.splice(index, 1);
    });
  }
}
