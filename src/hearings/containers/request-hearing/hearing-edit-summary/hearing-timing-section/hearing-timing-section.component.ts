import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingDetailsModel } from '../../../../models/hearingDetails.model';
import { HearingDateEnum, RadioOptions } from '../../../../models/hearings.enum';
import { AmendmentLabelStatus } from '../../../../models/hearingsUpdateMode.enum';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { HearingsService } from '../../../../services/hearings.service';

@Component({
  selector: 'exui-hearing-timing-section',
  templateUrl: './hearing-timing-section.component.html'
})
export class HearingTimingSectionComponent implements OnInit {
  @Input() public hearingPrioritiesRefData: LovRefDataModel[];
  @Input() public hearingDetails: HearingDetailsModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  constructor(private readonly hearingsService: HearingsService) {}

  public hearingLength: string;
  public specificDate: string;
  public hearingPriority: string;
  public hearingWindowChangesConfirmed: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  public ngOnInit(): void {
    this.hearingWindowChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.hearingWindowFirstDateMustBeChangesConfirmed;
    this.hearingLength = this.getHearingLength();
    this.specificDate = this.getSpecificDate();
    this.hearingPriority = this.getHearingPriority();
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    switch (fragmentId) {
      case 'hearingLength':
        changeLink = '/hearings/request/hearing-timing#durationdays';
        break;
      case 'hearingSpecificDate':
        changeLink = '/hearings/request/hearing-timing#noSpecificDate';
        break;
      case 'hearingPriority':
        changeLink = '/hearings/request/hearing-timing#urgent';
        break;
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  private getHearingLength(): string {
    let duration = this.hearingDetails.duration;
    if (duration) {
      let days = 0;
      let hours = 0;
      let minutes = 0;
      if (duration > 0) {
        minutes = duration % 60;
        duration = duration - minutes;
        days = Math.floor((duration / 60) / 6);
        hours = Math.floor((duration / 60) % 6);
        let formattedHearingLength = '';
        if (days > 0) {
          const daysLabel = days > 1 ? 'Days' : 'Day';
          formattedHearingLength = `${days} ${daysLabel}`;
        }
        if (hours > 0) {
          const hoursLabel = hours > 1 ? 'Hours' : 'Hour';
          formattedHearingLength = formattedHearingLength.length > 0 ? `${formattedHearingLength} ${hours} ${hoursLabel}` : `${hours} ${hoursLabel}`;
        }
        if (minutes > 0) {
          const minutesLabel = 'Minutes';
          formattedHearingLength = formattedHearingLength.length > 0 ? `${formattedHearingLength} ${minutes} ${minutesLabel}` : `${minutes} ${minutesLabel}`;
        }
        if (formattedHearingLength.length > 0) {
          return formattedHearingLength;
        }
      }
    }
    return '';
  }

  private getSpecificDate(): string {
    let specificDateSelection: string = RadioOptions.NO;
    let earliestHearingDate: string = '';
    let latestHearingDate: string = '';
    const hearingWindow = this.hearingDetails.hearingWindow;

    if (hearingWindow?.dateRangeStart || hearingWindow?.dateRangeEnd) {
      specificDateSelection = RadioOptions.CHOOSE_DATE_RANGE;
      earliestHearingDate = moment(hearingWindow.dateRangeStart).format(HearingDateEnum.DisplayMonth);
      latestHearingDate = hearingWindow.dateRangeEnd && moment(hearingWindow.dateRangeEnd).format(HearingDateEnum.DisplayMonth);
      specificDateSelection += earliestHearingDate !== HearingDateEnum.InvalidDate ? `<br>Earliest start date: ${earliestHearingDate}` : '';
      specificDateSelection += latestHearingDate && latestHearingDate !== HearingDateEnum.InvalidDate ? `<br>Latest end date: ${latestHearingDate}` : '';
    } else if (hearingWindow?.firstDateTimeMustBe) {
      specificDateSelection = RadioOptions.YES;
      const firstDate = moment(hearingWindow.firstDateTimeMustBe).format(HearingDateEnum.DisplayMonth);
      specificDateSelection += firstDate !== HearingDateEnum.InvalidDate ? `<dt class="heading-h3 bottom-0">The first date of the hearing must be</dt>${firstDate}` : '';
    } else if (hearingWindow === null) {
      specificDateSelection = RadioOptions.NO;
    }

    return specificDateSelection;
  }

  private getHearingPriority(): string {
    const hearingPriorityFromRefData = this.hearingPrioritiesRefData.find((priority) => priority.key === this.hearingDetails.hearingPriorityType);
    return (hearingPriorityFromRefData?.value_en || '');
  }
}