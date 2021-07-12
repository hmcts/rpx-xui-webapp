import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'exui-allocate-role-container',
  templateUrl: './allocate-role-container.component.html',
  styleUrls: ['./allocate-role-container.component.scss']
})
export class AllocateRoleContainerComponent implements OnInit {
  public DESCRIBE_EXCLUSION_CONTROL_NAME = 'text';
  public allocationForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
  }

  public ngOnInit() {
    this.allocationForm = this.createAllocationForm();
  }

  public continue(value: any, valid: boolean): void {
    this.allocationForm.get(this.DESCRIBE_EXCLUSION_CONTROL_NAME).markAsTouched();
    if (valid) {
      console.log(value);
    }
  }

  private createAllocationForm(): FormGroup {
    return this.fb.group({
      [this.DESCRIBE_EXCLUSION_CONTROL_NAME]: ['', [Validators.required]]
    });
  }
}
