import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { RefDataModel } from '../../../../hearings/models/refData.model';

@Component({
  selector: 'exui-date-priority-hearing',
  templateUrl: './date-priority-hearing.component.html',
  styleUrls: ['./date-priority-hearing.component.scss']
})
export class DatePriorityHearingComponent implements OnInit {
  public priorityForm: FormGroup;
  public priorities: RefDataModel[];
  public checkedHearingAvailability: string;
  public partiesNotAvailableDates: string[];
  public firstHearingDate: GovUiConfigModel;
  public earliestHearingDate: GovUiConfigModel;
  public latestHearingDate: GovUiConfigModel;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.initDateConfig();
    this.initForm();
    this.priorities = this.route.snapshot.data.hearingPriorities.sort((currentPriority, nextPriority) => (currentPriority.order < nextPriority.order ? -1 : 1));
    // TODO: Get dates from a service
    this.partiesNotAvailableDates = ['2 November 2021', '3 November 2021', '4 November 2021'];
  }

  public initDateConfig(): void {
    this.firstHearingDate = {
      id: 'firstHearingDate',
      name: 'firstHearingDate',
      hint: '',
      classes: 'govuk-fieldset__legend govuk-fieldset__legend--s',
      label: 'The first date of the hearing must be'
    };

    this.earliestHearingDate = {
      id: 'earliestHearingDate',
      name: 'earliestHearingDate',
      hint: '',
      classes: 'govuk-fieldset__legend govuk-fieldset__legend--s',
      label: 'Earliest hearing date'
    };
    this.latestHearingDate = {
      id: 'latestHearingDate',
      name: 'latestHearingDate',
      hint: '',
      classes: 'govuk-fieldset__legend govuk-fieldset__legend--s',
      label: 'Latest hearing date'
    };
  }

  public initForm(): void {
    this.priorityForm = this.formBuilder.group({
      durationLength: this.formBuilder.group({
        hours: [],
        minutes: []
      }),
      firstHearingDate_day: [],
      firstHearingDate_month: [],
      firstHearingDate_year: [],
      earliestHearingDate_day: [],
      earliestHearingDate_month: [],
      earliestHearingDate_year: [],
      latestHearingDate_day: [],
      latestHearingDate_month: [],
      latestHearingDate_year: [],
      hearingAvailability: [],
    });
  }

  public showDateAvailability(): void {
    this.checkedHearingAvailability = this.priorityForm.get('hearingAvailability').value;
  }
}
