import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationSearchContainerComponent } from '../location-search-container/location-search-container.component';

@Component({
  selector: 'xui-hearing-venue',
  templateUrl: './hearing-venue.component.html',
  styleUrls: ['./hearing-venue.component.scss']
})
export class HearingVenueComponent {
  @ViewChild(LocationSearchContainerComponent) public searchLocationContainerComponent: LocationSearchContainerComponent;
  public findLocationFormGroup: FormGroup;
  dirty: boolean;
  constructor(fb: FormBuilder) {
    this.findLocationFormGroup =  fb.group({
      locationSelectedFormControl: [null, Validators.required]
    });
  }

  public getLocationSearchFocus() {
    if (this.searchLocationContainerComponent.searchLocationComponent &&
        this.searchLocationContainerComponent.searchLocationComponent.autoCompleteInputBox &&
        this.searchLocationContainerComponent.searchLocationComponent.autoCompleteInputBox.nativeElement) {
          this.searchLocationContainerComponent.searchLocationComponent.autoCompleteInputBox.nativeElement.focus();
    }
  }
}
