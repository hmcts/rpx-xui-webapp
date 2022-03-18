import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { DurationType } from '../../models/enums';

@Component({
  selector: 'exui-role-access-duration-base',
  template: ''
})
export class RoleAccessDurationBaseComponent {
  // properties
  public anotherPeriod: boolean;
  public configStart: GovUiConfigModel;
  public configEnd: GovUiConfigModel;
  public readonly durations: Duration[];
  public endDateErrorMessage: ErrorMessagesModel;
  public title = 'Title';
  public caption = 'Caption';
  public isEndDateError = false;
  public isStartDateError = false;
  public selectedDuration: DurationType;
  public startDateErrorMessage: ErrorMessagesModel;

  // form group and controls
  public formGroup: FormGroup;
  public startDateDay: FormControl;
  public startDateMonth: FormControl;
  public startDateYear: FormControl;
  public endDateDay: FormControl;
  public endDateMonth: FormControl;
  public endDateYear: FormControl;
  public radioSelected: FormControl;

  constructor(
    public readonly builder: FormBuilder
  ) {
    this.durations = [
      { id: '1', name: DurationType.SEVEN_DAYS, description: '', checked: false },
      { id: '2', name: DurationType.INDEFINITE, description: '', checked: false },
      { id: '3', name: DurationType.ANOTHER_PERIOD, description: '', checked: false }
    ];
    this.startDateDay = new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]);
    this.startDateMonth = new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)])
    this.startDateYear = new FormControl('', Validators.required);
    this.endDateDay = new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]);
    this.endDateMonth = new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)])
    this.endDateYear = new FormControl('', Validators.required);
    this.radioSelected = new FormControl('', Validators.required);

    this.configStart = {
      id: 'startDate',
      name: 'startDate',
      hint: 'For example, 01 01 2022',
      label: 'Date Starts'
    };
    this.configEnd = {
      id: 'endDate',
      name: 'endDate',
      hint: 'For example, 01 01 2022',
      label: 'Date Ends'
    };
  }

  public getFormGroup(): FormGroup {
    return this.builder.group({
      startDate_day: this.startDateDay,
      startDate_month: this.startDateMonth,
      startDate_year: this.startDateYear,
      endDate_day: this.endDateDay,
      endDate_month: this.endDateMonth,
      endDate_year: this.endDateYear,
      radioSelected: this.radioSelected
    });
  }

  public onSelectOption(item: DurationType): void {
    this.anotherPeriod = item === DurationType.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }

}

// TODO; SARD - move to separate file for resuability
export interface Duration {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}
