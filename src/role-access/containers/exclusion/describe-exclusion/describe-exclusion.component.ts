import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ErrorMessage } from '../../../../app/models';
import { ExclusionNavigationEvent, ExclusionState, ExclusionStateData } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-describe-exclusion',
  templateUrl: './describe-exclusion.component.html',
  styleUrls: ['./describe-exclusion.component.scss']
})
export class DescribeExclusionComponent implements OnInit, OnDestroy {

  @Input() public navEvent: ExclusionNavigation;
  @Input() public title: string = 'Describe the exclusion';
  @Input() public caption: string = 'Add an exclusion';

  public submitted: boolean = true;
  public controlName = 'text';
  public formGroup: FormGroup;
  public error: ErrorMessage = null;
  public subscription: Subscription;

  constructor(public readonly store: Store<fromFeature.State>,
              public readonly fb: FormBuilder) {
      this.formGroup = this.fb.group({[this.controlName]: ['', [Validators.required]]
    });
  }

  public ngOnInit(): void {
    this.submitted = false;
    this.subscription = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe(exclusion => this.setExclusionDescription(exclusion));
  }

  public setExclusionDescription(exclusion: ExclusionStateData): void {
    if (exclusion && exclusion.exclusionDescription) {
      this.formGroup.get(this.controlName).setValue(exclusion.exclusionDescription);
    }
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    this.submitted = true;
    this.formGroup.get(this.controlName).markAsTouched();
    if (!this.formGroup.valid) {
      this.error = this.getErrorObject();
      return;
    }
    this.error = null;
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.UpdateDescribeExclusionText(ExclusionState.CHECK_ANSWERS, this.formGroup.value.text));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public getErrorObject(): ErrorMessage {
    return {
      title: 'There is a problem',
      description: 'Enter exclusion',
      fieldId: 'exclusion-description'
    };
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
