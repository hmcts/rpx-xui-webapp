import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationSearchContainerComponent } from '../request-hearing/location-search-container/location-search-container.component';

@Component({
  selector: 'exui-view-hearing',
  templateUrl: './view-hearing.component.html',
  styleUrls: ['./view-hearing.component.scss']
})
export class ViewHearingComponent {
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
