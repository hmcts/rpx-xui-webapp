import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';
import {ACTION} from '../../../models/hearings.enum';
import { PartyUnavailabilityRange } from '../../../models/partyUnavilabilityRange.model';
import { RefDataModel } from '../../../models/refData.model';
import {HearingsService} from '../../../services/hearings.service';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-timing',
  templateUrl: './hearing-timing.component.html',
  styleUrls: ['./hearing-timing.component.scss']
})
export class HearingTimingComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public priorityForm: FormGroup;
  public priorities: RefDataModel[];
  public checkedHearingAvailability: string;
  public partiesNotAvailableDates: string[] = [];
  public firstHearingDate: GovUiConfigModel;
  public earliestHearingDate: GovUiConfigModel;
  public latestHearingDate: GovUiConfigModel;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService);
  }

  public ngOnInit(): void {
    this.initDateConfig();
    this.initForm();
    this.priorities = this.route.snapshot.data.hearingPriorities.sort((currentPriority, nextPriority) => (currentPriority.order < nextPriority.order ? -1 : 1));
    this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel),
      map((hearingValues): PartyUnavailabilityRange[] => hearingValues && hearingValues.parties && hearingValues.parties.map(dates => dates.unavailability).flat()))
      .subscribe((unavailabilityDateList: PartyUnavailabilityRange[]) => {
        if (unavailabilityDateList) {
          this.checkUnavailableDatesList(unavailabilityDateList);
        }
      });
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

  public checkUnavailableDatesList(dateList: PartyUnavailabilityRange[]): void {
    dateList.forEach(dateRange => {
      this.setUnavailableDates(dateRange);
    });
    this.partiesNotAvailableDates.sort((currentDate, previousDate) => new Date(currentDate).getTime() - new Date(previousDate).getTime());
  }

  public setUnavailableDates(dateRange): void {
    const startDate = moment(dateRange.start);
    const endDate = moment(dateRange.end);

    while (startDate <= endDate) {
      const currentDate = startDate.format('DD MMMM YYYY');
      const isWeekDay: boolean = (startDate.weekday() !== 6) && (startDate.weekday() !== 0);
      if (isWeekDay && !this.partiesNotAvailableDates.includes(currentDate)) {
        this.partiesNotAvailableDates.push(currentDate);
      }
      startDate.add(1, 'd');
    }
  }

  public executeAction(action: ACTION): void {
    if (this.isFormValid()) {
      super.navigateAction(action);
    }
  }

  public isFormValid(): boolean {
    // TODO verify if form group is valid
    return true;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
