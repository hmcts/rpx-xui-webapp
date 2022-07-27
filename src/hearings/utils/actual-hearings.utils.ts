import * as moment from 'moment';
import { ActualDayPartyModel, ActualHearingDayModel, HearingActualsMainModel } from '../models/hearingActualsMainModel';

export class ActualHearingsUtils {
  public static isHearingDaysUpdated: boolean;
  public static isHearingPartiesUpdated: boolean;

  private static getDate(dateTime: string): string {
    return dateTime ? moment(dateTime).format('YYYY-MM-DD') : null;
  }

  private static extractActualsFromPlannedDays(hearingActualsMainModel) {
    const hearingDays = hearingActualsMainModel.hearingPlanned.plannedHearingDays.map((plannedDay) => {
      const existing = (hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays &&
        hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0)
        ? hearingActualsMainModel.hearingActuals.actualHearingDays.find((item) => Date.parse(item.hearingDate) === Date.parse(moment(plannedDay.plannedStartTime).format('YYYY-MM-DD')))
        : null;

      if (existing) {
        return existing;
      } else {
        return {
          hearingDate: this.getDate(plannedDay.plannedStartTime),
          hearingStartTime: plannedDay.plannedStartTime,
          hearingEndTime: plannedDay.plannedEndTime,
          pauseDateTimes: [],
          notRequired: false,
          actualDayParties: []
        };
      }
    });
    return hearingDays.filter(day => day !== undefined);
  }

  public static getActualHearingDay(hearingActualsMainModel: HearingActualsMainModel): ActualHearingDayModel[] {
    let hearingDays = this.extractActualsFromPlannedDays(hearingActualsMainModel);
    if (hearingDays && hearingDays.length > 0) {
      hearingDays = hearingDays.sort((a, b) => {
        return Date.parse(a.hearingDate) === Date.parse(b.hearingDate) ? 0 : Date.parse(a.hearingDate) > Date.parse(b.hearingDate) ? 1 : -1;
      });
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
