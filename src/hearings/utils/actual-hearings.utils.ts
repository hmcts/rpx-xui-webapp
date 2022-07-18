import * as moment from 'moment';
import {ActualDayPartyModel, ActualHearingDayModel, HearingActualsMainModel} from '../models/hearingActualsMainModel';
import {HearingDateEnum} from '../models/hearings.enum';

export class ActualHearingsUtils {
  public static isHearingDaysUpdated: boolean;
  public static isHearingPartiesUpdated: boolean;

  private static replaceTime(dateTime: string, time: moment.Moment): string {
    return moment(dateTime, HearingDateEnum.DateAndTimeInZoneZ).set({
      hour: time.get('hour'),
      minute: time.get('minute'),
    }).toISOString();
  }

  private static getDate(dateTime: string): string {
    return dateTime ? moment(dateTime).format('YYYY-MM-DD') : null;
  }

  public static getActualHearingDay(hearingActualsMainModel: HearingActualsMainModel, value: any): ActualHearingDayModel[] {

    let hearingDays = hearingActualsMainModel.hearingPlanned && hearingActualsMainModel.hearingPlanned.plannedHearingDays
      && hearingActualsMainModel.hearingPlanned.plannedHearingDays.length > 0 && hearingActualsMainModel.hearingPlanned.plannedHearingDays.map(x => {
        return {
          hearingDate: this.getDate(x.plannedStartTime),
          hearingStartTime: x.plannedStartTime,
          hearingEndTime: x.plannedEndTime,
          pauseDateTimes: [],
          notRequired: false,
          actualDayParties: x.parties.map(p => {
            return {
              actualPartyId: p.partyID,
              partyRole: p.partyRole,
              partyChannelSubType: p.partyChannelSubType,
              representedParty: '',
              didNotAttendFlag: false,
              individualDetails: {firstName: p.individualDetails.firstName, lastName: p.individualDetails.lastName},
              actualOrganisationName: p.organisationDetails ? p.organisationDetails.name : null
            };
          })
        };
      });

    hearingDays = hearingDays.sort((a, b) => {
      return Date.parse(a.hearingDate) === Date.parse(b.hearingDate) ? 0 : Date.parse(a.hearingDate) > Date.parse(b.hearingDate) ? 1 : -1;
    });

    let pauseDateTimes = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length && hearingActualsMainModel.hearingActuals.actualHearingDays[0]
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes || null;

    const pauseStartTime = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length && hearingActualsMainModel.hearingActuals.actualHearingDays[0]
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes.length
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0] && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0].pauseStartTime;

    const pauseEndTime = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length && hearingActualsMainModel.hearingActuals.actualHearingDays[0]
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes.length
      && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0] && hearingActualsMainModel.hearingActuals.actualHearingDays[0].pauseDateTimes[0].pauseEndTime;

    const isPauseStartTimeValid = moment(pauseStartTime, HearingDateEnum.DateAndTimeInZoneZ, true).isValid();
    if (value) {
      const hearingStartTime = (hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
        && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0 && hearingActualsMainModel.hearingActuals.actualHearingDays[0].hearingStartTime)
        || (hearingActualsMainModel.hearingPlanned && hearingActualsMainModel.hearingPlanned.plannedHearingDays
          && hearingActualsMainModel.hearingPlanned.plannedHearingDays.length > 0 && hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].plannedStartTime);

      const hearingDate = this.getDate(hearingStartTime);
      let changedPauseStartTime;
      let changedPauseEndTime;
      const moPauseStartTime = moment(value.pauseStartTime, HearingDateEnum.DisplayTime);
      const moPauseEndTime = moment(value.pauseEndTime, HearingDateEnum.DisplayTime);
      if (isPauseStartTimeValid) {
        changedPauseStartTime = this.replaceTime(pauseStartTime, moPauseStartTime);
      } else {
        changedPauseStartTime = this.replaceTime(hearingDate, moPauseStartTime);
      }
      const isPauseEndTimeValid = moment(pauseEndTime, HearingDateEnum.DateAndTimeInZoneZ, true).isValid();
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
      const item = hearingDays.filter((x) => {
        return x.hearingDate === hearingDate;
      })[0];
      item.pauseDateTimes = pauseDateTimes;
    }
    return hearingDays as ActualHearingDayModel[];
  }

  public static getActualHearingParties(hearingActualsMainModel: HearingActualsMainModel, parties: ActualDayPartyModel[], participants: ActualDayPartyModel[]): ActualHearingDayModel[] {
    return [
      {
        ...hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays[0],
        actualDayParties: [...participants, ...parties],
      }
    ];
  }
}
