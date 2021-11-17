import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessage } from 'src/app/models';

export const NAME_ERROR: ErrorMessage = {
  title: 'There is a problem',
  description: 'You must select Yes or No',
  fieldId: 'welsh-hint',
};

@Component({
  selector: 'exui-welsh-hearing',
  templateUrl: './welsh-hearing.component.html',
  styleUrls: ['./welsh-hearing.component.scss'],
})
export class WelshHearingComponent implements OnInit {
  public error: ErrorMessage = null;
  public welshForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.initForm();
  }

  /**
   * Inits form
   */
  public initForm() {
    this.welshForm = this.formBuilder.group({
      hearingInWelshFlag: [false, Validators.required],
    });
  }

  /**
   * Determines whether submit on
   * @returns void if invalid form
   */
  public onSubmit(): void {
    if (!this.welshForm.valid) {
      this.error = NAME_ERROR;
      return;
    }
    this.error = null;
  }
}
