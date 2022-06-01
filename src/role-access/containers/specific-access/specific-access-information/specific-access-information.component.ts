import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-information',
  templateUrl: './specific-access-information.component.html'
})
export class SpecificAccessInformationComponent implements OnDestroy, OnInit {

  @Input() public navEvent: SpecificAccessNavigation;
  @Input() public title = 'Request more information';
  @Input() public caption = 'Reject specific access request';

  public caseId: string;
  public caseName: string;
  public taskCreated: string;
  public requesterDetails: string;

  public subscription: Subscription;
  public formGroup: FormGroup;
  public infoCtrl: FormControl;
  public error: any = null;
  public controlName = 'infoCtrl';
  public submitted: boolean = true;

  constructor(public readonly store: Store<fromFeature.State>, private readonly fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.submitted = false;
    this.formGroup = this.fb.group({
      infoCtrl: new FormControl(null, Validators.required)
    });
    this.infoCtrl = this.formGroup.get('infoCtrl') as FormControl;
    this.store.pipe(select(fromFeature.getSpecificAccessState)).pipe(take(1)).subscribe((specificAccessState) => {
      if (specificAccessState.SpecificAccessMoreInformationFormData && specificAccessState.SpecificAccessMoreInformationFormData.InfoText) {
          this.infoCtrl.setValue(specificAccessState.SpecificAccessMoreInformationFormData.InfoText);
      }
    });
  }
  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    this.submitted = true;
    if (!this.formGroup.valid) {
      this.error = this.getErrorObject();
      return;
    }
    this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DENIED));
  }

  public getRawData(): any {
    return this.infoCtrl.value;
  }

  public getErrorObject(): any {
    return {
      title: 'There is a problem',
      description: 'Enter Details',
      fieldId: 'Description'
    };
  }

  public dispatchEvent(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.BACK:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW));
        break;
      default:
        throw new Error('Not yet implemented');
    }
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
