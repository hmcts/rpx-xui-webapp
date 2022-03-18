import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DurationType } from '../../models/enums';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';

@Component({
  selector: 'exui-role-access-duration',
  templateUrl: './role-access-duration.component.html',
  styleUrls: ['./role-access-duration.component.scss']
})
export class RoleAccessDurationComponent implements OnInit {
  @Input() caption = 'Caption';
  @Input() configEnd:GovUiConfigModel;
  @Input() configStart:GovUiConfigModel;
  @Input() defaultDuration = DurationType.SEVEN_DAYS;
  @Input() durations: Duration[] = [];
  @Input() title = 'Title';

  // properties
  public endDateErrorMessage: ErrorMessagesModel;
  public startDateErrorMessage: ErrorMessagesModel;
  public validationErrors: RoleAccessDurationValidationError[] = [];

  // form group and controls
  public formGroup: FormGroup;
  public startDateDay: FormControl;
  public startDateMonth: FormControl;
  public startDateYear: FormControl;
  public endDateDay: FormControl;
  public endDateMonth: FormControl;
  public endDateYear: FormControl;
  public selectedDuration: FormControl;

  constructor(
    private readonly fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.setupFormControls();
    this.setupForm();
    this.setupDefaultDuration();
  }

  public setupDefaultDuration(): void {
    const defaultDuration = this.durations.find(duration => duration.name === this.defaultDuration);
    if (typeof defaultDuration !== 'undefined') {
      defaultDuration.checked = true;
      this.selectedDuration.setValue(defaultDuration.name);
    }
  }

  public setupFormControls(): void {
    const dayValidators = [Validators.required, Validators.min(1), Validators.max(31)];
    const monthValidators = [Validators.required, Validators.min(1), Validators.max(12)];
    const yearValidators = [Validators.required];

    this.startDateDay = new FormControl('', dayValidators);
    this.startDateMonth = new FormControl('', monthValidators)
    this.startDateYear = new FormControl('', yearValidators);
    this.endDateDay = new FormControl('', dayValidators);
    this.endDateMonth = new FormControl('', monthValidators)
    this.endDateYear = new FormControl('', yearValidators);
    this.selectedDuration = new FormControl('', Validators.required);
  }

  public setupForm(): void {
    this.formGroup = this.fb.group({
      startDate_day: this.startDateDay,
      startDate_month: this.startDateMonth,
      startDate_year: this.startDateYear,
      endDate_day: this.endDateDay,
      endDate_month: this.endDateMonth,
      endDate_year: this.endDateYear,
      selectedDuration: this.selectedDuration
    });
  }

  public onSelectDuration(duration: Duration): void {
    if (duration.name !== DurationType.ANOTHER_PERIOD) {
      this.resetValidationErrorMessages();
      this.formGroup.setErrors(null);
    }
  }

  public resetValidationErrorMessages(): void {
    this.validationErrors = [];
    this.startDateErrorMessage = null;
    this.endDateErrorMessage = null;
  }

  public isAnyError(): boolean {
    return Array.isArray(this.validationErrors) && this.validationErrors.length > 0;
  }

}

// TODO: SARD - move these to separate file?
export interface Duration {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

export interface RoleAccessDurationValidationError {
  controlId: string;
  documentHRef: string;
  errorMessage: string;
}
