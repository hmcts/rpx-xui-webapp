import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SpecificAccessNavigationEvent, SpecificAccessState, SpecificAccessStateData } from '../../../models';
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
    const  rejectedRole = {id: 'specific-access-denied', name: 'specific-access-denied'};
    const specificAccessMockState: SpecificAccessStateData = {
      state: SpecificAccessState.SPECIFIC_ACCESS_DURATION,
      accessReason: null,
      typeOfRole: rejectedRole,
      comment: this.infoCtrl.value,
      caseId: '1613568559071553',
      requestId: 'eb7b412d-9e8e-4e1e-8e6f-ad540d455945',
      originalSpecificAccessRequestId: '777b412d-9e8e-4e1e-8e6f-ad540d459999',
      taskId: '9b440fc1-d9cb-11ec-a8f0-eef41c565753',
      jurisdiction: 'IA',
      roleCategory: RoleCategory.CASEWORKER,
      requestedRole: 'specific-access-legal-operations',
      person: {id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null}
    }
    switch (navEvent) {
      case SpecificAccessNavigationEvent.CONTINUE:
        this.submitted = true;
        if (!this.formGroup.valid) {
          this.error = this.getErrorObject();
          return;
        }
        this.store.dispatch(new fromFeature.RequestMoreInfoSpecificAccessRequest(specificAccessMockState));
        break;
      default:
        throw new Error('Invalid option');
    }
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

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
