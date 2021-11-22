import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'exui-date-priority-hearing',
  templateUrl: './date-priority-hearing.component.html',
  styleUrls: ['./date-priority-hearing.component.scss']
})
export class DatePriorityHearingComponent implements OnInit {
  public priorityForm: FormGroup;
  public checkedHearingAvailability: string;
  public partiesNotAvailableDates: string[];

  constructor(private readonly formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm();
    // TODO: Get dates from a service
    this.partiesNotAvailableDates = ['2 November 2021', '3 November 2021', '4 November 2021'];
  }

  /**
   * Inits form
   */
  public initForm(): void {
    this.priorityForm = this.formBuilder.group({
      durationLength: this.formBuilder.group({
        hours: [],
        minutes: []
      }),
      hearingAvailability: [],
    });
  }

  public showDateAvailability(): void {
    this.checkedHearingAvailability = this.priorityForm.get('hearingAvailability').value;
  }

}
