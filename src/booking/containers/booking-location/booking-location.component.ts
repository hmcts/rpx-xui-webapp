import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingCheckType, SearchLocationComponent } from '@hmcts/rpx-xui-common-lib';
import { LocationByEPIMMSModel as LocationByEpimmsModel } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import { BookingNavigationEvent, BookingProcess } from '../../models';

@Component({
  standalone: false,
  selector: 'exui-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent implements AfterViewInit, OnInit {
  @Input() public bookingProcess: BookingProcess;

  @Output() public bookingProcessChange = new EventEmitter<BookingProcess>();
  @Output() public eventTrigger = new EventEmitter();

  public bookingCheckType = BookingCheckType.POSSIBLE_BOOKINGS;
  public selectedLocations: LocationByEpimmsModel[] = [];
  public jurisdictions: string;
  public findLocationFormGroup: FormGroup;
  public formError: boolean;

  @ViewChild(SearchLocationComponent) public searchLocationComponent: SearchLocationComponent;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<fromRoot.State>,
  ) {
    this.findLocationFormGroup = this.fb.group({
      locationSelectedFormControl: [null, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.getJurisdictions();
    this.selectedLocations = this.bookingProcess.location ? [this.bookingProcess.location] : [];
  }

  public ngAfterViewInit(): void {
    this.getLocationSearchFocus();
    // TODO: CAM_BOOKING - remomve these if no longer needed
    // this.findLocationFormGroup.controls.locationSelectedFormControl.setValue(this.bookingProcess.location);
  }

  public onLocationChanged(location: LocationByEpimmsModel): void {
    this.bookingProcess.location = location;
    if (location) {
      this.formError = false;
    }
  }

  public onContinueClick(): void {
    this.formError = !this.bookingProcess.location;
    if (!this.bookingProcess.location) {
      // TODO: CAM_BOOKING - remove this?
      this.getLocationSearchFocus();
    } else {
      this.eventTrigger.emit(BookingNavigationEvent.LOCATIONCONTINUE);
    }
  }

  public getLocationSearchFocus(): void {
    // TODO: CAM_BOOKING - resolve focus
    //   if (this.searchLocationComponent &&
    //     this.searchLocationComponent.autoCompleteInputBox &&
    //     this.searchLocationComponent.autoCompleteInputBox.nativeElement) {
    //     this.searchLocationComponent.autoCompleteInputBox.nativeElement.focus();
    //   }
  }

  // get a comma separated list of unique jurisdictions from the user role assignment info
  private getJurisdictions(): void {
    this.store.pipe(select(fromRoot.getUserDetails)).subscribe((user) => {
      this.jurisdictions = Array.from(new Set(user.roleAssignmentInfo.filter((role) => role.bookable).map((a) => a.jurisdiction))).toString();
    });
  }
}
