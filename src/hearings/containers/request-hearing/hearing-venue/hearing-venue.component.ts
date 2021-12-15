import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationByEPIMSModel} from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import {Observable, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';
import {HearingLocationModel} from '../../../models/hearingLocation.model';
import {HearingRequestMainModel} from '../../../models/hearingRequestMain.model';
import {ACTION} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';
import { Store, select } from '@ngrx/store';
import { SearchLocationComponent } from '@hmcts/rpx-xui-common-lib';

@Component({
  selector: 'exui-hearing-venue',
  templateUrl: './hearing-venue.component.html',
  styleUrls: ['./hearing-venue.component.scss']
})
export class HearingVenueComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public locationType: string;
  public findLocationFormGroup: FormGroup;
  public selectedLocationsSub: Subscription;
  public selectedLocations: LocationByEPIMSModel[] = [];
  public selectedLocations$: Observable<LocationByEPIMSModel[]>;
  public locationsFound$: Observable<LocationByEPIMSModel[]>;
  public serviceIds: string = 'SSCS';
  public hearingRequestMainModel: HearingRequestMainModel;
  @ViewChild(SearchLocationComponent) public searchLocationComponent: SearchLocationComponent;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              fb: FormBuilder) {
    super(hearingStore, hearingsService);
    this.findLocationFormGroup =  fb.group({
      locationSelectedFormControl: [null, Validators.required]
    });

    this.selectedLocations$ = of([]);
    this.locationsFound$ = of([]);
  }


  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    ).subscribe(id => {
      this.serviceIds = id ? id : this.serviceIds;
    });
    this.selectedLocationsSub = this.selectedLocations$.subscribe(selectedLocations => {
      this.selectedLocations = selectedLocations;
    });

    this.getLocationSearchFocus();
  }

  public addSelection(): void {
    if (this.findLocationFormGroup.controls.locationSelectedFormControl.value) {
      this.selectedLocations$.subscribe(selectedLocations => {
          this.appendLocation(selectedLocations);
          const strLocations = selectedLocations.map(location => location.region).join(',');
          this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions({region: strLocations}));
      });
    } else {
      this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
      this.findLocationFormGroup.controls.locationSelectedFormControl.markAsDirty();
    }

    // if (this.findLocationFormGroup.controls.locationSelectedFormControl.value) {
    //   this.selectedLocations$.subscribe(selectedLocations => {
    //     selectedLocations.push(this.findLocationFormGroup.controls.locationSelectedFormControl.value as LocationByEPIMSModel);
    //     this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
    //     const strLocations = selectedLocations.map(location => location.region).join(',');
    //     this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions({region: strLocations}));
    //   });
    // }
  }

  public appendLocation(selectedLocations: LocationByEPIMSModel[]) {
    selectedLocations.push(this.findLocationFormGroup.controls.locationSelectedFormControl.value as LocationByEPIMSModel);
    this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(undefined);
    this.findLocationFormGroup.controls.locationSelectedFormControl.markAsPristine();
    this.locationsFound$ = of([]);
  }

  public removeSelection(location: LocationByEPIMSModel): void {
    this.selectedLocations$.subscribe(selectedLocations => {
      const index = selectedLocations.findIndex(selectedLocation => selectedLocation.epims_id === location.epims_id);
      selectedLocations.splice(index, 1);
    });
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      this.checkFormData();
      if (this.isFormValid()) {
        this.prepareHearingRequestData();
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public prepareHearingRequestData(): void {
    const locations: HearingLocationModel[] = this.selectedLocations.map(locationByEPIMSModel => {
      return {
        locationType: 'hearing',
        locationId: locationByEPIMSModel.epims_id,
        locationName: locationByEPIMSModel.court_name
      } as HearingLocationModel;
    });
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        hearingLocations: locations
      }
    };
  }

  public isFormValid(): boolean {
    return this.findLocationFormGroup.valid;
  }

  public checkFormData(): void {
    if (this.selectedLocations.length === 0) {
      this.findLocationFormGroup.setErrors({
        locationNotSelected: true
      });
    } else {
      this.findLocationFormGroup.setErrors(null);
    }
  }

  public getLocationSearchFocus() {
    if (this.searchLocationComponent &&
        this.searchLocationComponent.autoCompleteInputBox &&
        this.searchLocationComponent.autoCompleteInputBox.nativeElement) {
          this.searchLocationComponent.autoCompleteInputBox.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    if (this.selectedLocationsSub) {
      this.selectedLocationsSub.unsubscribe();
    }
  }
}
