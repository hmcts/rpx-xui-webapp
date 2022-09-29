import { Injectable } from '@angular/core';
import moment from 'moment';
import { ActualDayPartyModel, ActualHearingDayModel, HearingActualsMainModel, PlannedDayPartyModel } from '../models/hearingActualsMainModel';

export class ActualHearingsUtils {
  public static isHearingDaysUpdated: boolean;
  public static isHearingPartiesUpdated: boolean;

  private static replaceTime(dateTime: string, time: moment.Moment): string {
    return moment(dateTime, 'YYYY-MM-DDTHH:mm:ssZ').set({
      hour: time.get('hour'),
      minute: time.get('minute'),
    }).toISOString();
  }

  private static getDate(dateTime: string): string {
    return dateTime ? moment(dateTime).format('YYYY-MM-DD') : null;
  }

  public static getActualHearingDay(hearingActualsMainModel: HearingActualsMainModel, value: any): ActualHearingDayModel[] {
    const hearingStartTime = (hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0 && hearingActualsMainModel.hearingActuals.actualHearingDays[0].hearingStartTime)
      || (hearingActualsMainModel.hearingPlanned && hearingActualsMainModel.hearingPlanned.plannedHearingDays
        && hearingActualsMainModel.hearingPlanned.plannedHearingDays.length > 0 && hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].plannedStartTime);
    const hearingEndTime = (hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0 && hearingActualsMainModel.hearingActuals.actualHearingDays[0].hearingEndTime)
      || (hearingActualsMainModel.hearingPlanned && hearingActualsMainModel.hearingPlanned.plannedHearingDays
        && hearingActualsMainModel.hearingPlanned.plannedHearingDays.length > 0 && hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].plannedEndTime);
    const pauseStartTime = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length && hearingActualsMainModel.hearingActuals.actualHearingDays[0]
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes.length
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0] && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0].pauseStartTime;
    const pauseEndTime = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length && hearingActualsMainModel.hearingActuals.actualHearingDays[0]
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes.length
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0] && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0].pauseEndTime;
    const hearingDate = this.getDate(hearingStartTime);
    const isPauseStartTimeValid = moment(pauseStartTime, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
    let pauseDateTimes = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length && hearingActualsMainModel.hearingActuals.actualHearingDays[0]
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes || null;
    if (value) {
      let changedPauseStartTime;
      let changedPauseEndTime;
      const moPauseStartTime = moment(value.pauseStartTime, 'HH:mm');
      const moPauseEndTime = moment(value.pauseEndTime, 'HH:mm');
      if (isPauseStartTimeValid) {
        changedPauseStartTime = this.replaceTime(pauseStartTime, moPauseStartTime);
      } else {
        changedPauseStartTime = this.replaceTime(hearingDate, moPauseStartTime);
      }
      const isPauseEndTimeValid = moment(pauseEndTime, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
      if (isPauseEndTimeValid) {
        changedPauseEndTime = this.replaceTime(pauseEndTime, moPauseEndTime);
      } else {
        changedPauseEndTime = this.replaceTime(hearingDate, moPauseEndTime);
      }
      if (value.pauseStartTime && value.pauseEndTime) {
        pauseDateTimes = [
          {
            pauseStartTime: changedPauseStartTime,
            pauseEndTime: changedPauseEndTime
          }
        ];
      } else {
        pauseDateTimes = null;
      }
    }

    const actualInDay1 = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0];
    const actualHearingDays = [
      {
        ...actualInDay1,
        hearingDate,
        hearingStartTime: value ? this.replaceTime(hearingStartTime, moment(value.hearingStartTime, 'HH:mm')) : hearingStartTime,
        hearingEndTime: value ? this.replaceTime(hearingEndTime, moment(value.hearingEndTime, 'HH:mm')) : hearingEndTime,
        pauseDateTimes
      }
    ];
    return actualHearingDays;
  }
  public static getActualHearingParties(hearingActualsMainModel: HearingActualsMainModel, parties: ActualDayPartyModel[], participants: ActualDayPartyModel[]): ActualHearingDayModel[] {
    const actualHearingParties = [
      {
        ...hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays[0],
        actualDayParties: [...participants, ...parties],
      }
    ];
    return actualHearingParties;
  }
}
