import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ErrorMessage } from '../../../app/models';
import * as fromRoot from '../../../app/store';
import {RoleAllocationType } from '../../../cases/enums/allocation-type';

@Component({
  selector: 'exui-allocate-role-container',
  templateUrl: './allocate-role-container.component.html'
})
export class AllocateRoleContainerComponent implements OnDestroy, OnInit {

  // relating to container
  public roleAllocationType: RoleAllocationType;
  public error: ErrorMessage = null;
  public submitted: boolean = false;
  public allocationForm: FormGroup;
  private formSubscription: Subscription;
  public locationInfo$: Observable<any>;

  // relating to allocating role
  public includeOther: boolean = false;

  // relating to describe exclusion
  public DESCRIBE_EXCLUSION_CONTROL_NAME = 'text';

  // this will be replaced by ngrx functionality in future
  public describingExclusion: string = 'choose';


  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.roleAllocationType = this.activatedRoute.snapshot.data.allocation as RoleAllocationType;
    // currently the case allocator role information is stored in location info
    this.locationInfo$ = this.store.pipe(select(fromRoot.getLocationInfo));
    this.locationInfo$.subscribe(li => {
      const firstLocationInfo = li[0];
      this.includeOther = firstLocationInfo && firstLocationInfo.isCaseAllocator ? firstLocationInfo.isCaseAllocator : false;
    });
    this.allocationForm = this.createAllocationForm();
    this.formSubscription = this.allocationForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.error = null;
    });
  }

  public ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  // currenly just used for describe exclusion
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
