import {HearingConditions} from '../models/hearingConditions';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';

export class HearingsUtils {
  public static hasPropertyAndValue(conditions: HearingConditions, propertyName: string, propertyValue: any): boolean {
    return conditions && conditions.hasOwnProperty(propertyName) && conditions[propertyName] === propertyValue;
  }

  public static sortHearingDaySchedule(hearingDaySchedule: HearingDayScheduleModel[]): HearingDayScheduleModel[] {
    if (!hearingDaySchedule || hearingDaySchedule.length === 0) {
      return hearingDaySchedule;
    }
    return hearingDaySchedule.slice().sort((schedule1, schedule2) =>
      schedule1.hearingStartDateTime > schedule2.hearingStartDateTime
        ? 1
        : schedule2.hearingStartDateTime > schedule1.hearingStartDateTime
          ? -1
          : 0
    );
  }
}
