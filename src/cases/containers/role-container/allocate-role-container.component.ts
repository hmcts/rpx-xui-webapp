import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorMessage } from '../../../app/models';

@Component({
  selector: 'exui-allocate-role-container',
  templateUrl: './allocate-role-container.component.html'
})
export class AllocateRoleContainerComponent implements OnInit, OnDestroy {
  public error: ErrorMessage = null;
  public submitted: boolean = false;
  public DESCRIBE_EXCLUSION_CONTROL_NAME = 'text';
  public allocationForm: FormGroup;
  private formSubscription: Subscription;

  constructor(private readonly fb: FormBuilder) {
  }

  public ngOnInit() {
    this.allocationForm = this.createAllocationForm();
    this.formSubscription = this.allocationForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.error = null;
    });
  }

  public ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  public continue(value: any, valid: boolean): void {
    this.submitted = true;
    this.allocationForm.get(this.DESCRIBE_EXCLUSION_CONTROL_NAME).markAsTouched();
    if (valid) {
      console.log(value);
    } else {
      this.error = {
        title: 'There is a problem',
        description: 'Enter exclusion',
        fieldId: 'exclusion-description'
      };
    }
  }

  private createAllocationForm(): FormGroup {
    return this.fb.group({
      [this.DESCRIBE_EXCLUSION_CONTROL_NAME]: ['', [Validators.required]]
    });
  }

}
