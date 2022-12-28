import * as moment from 'moment';
import {HearingConditions} from '../models/hearingConditions';
import {HearingDayScheduleModel} from '../models/hearingDaySchedule.model';
import {LovRefDataModel} from '../models/lovRefData.model';

export class HearingsUtils {
  public static hasPropertyAndValue(conditions: HearingConditions, propertyName: string, propertyValue: any): boolean {
    return conditions && conditions.hasOwnProperty(propertyName) && conditions[propertyName] === propertyValue;
  }

  public static flattenArray(models: LovRefDataModel[]): LovRefDataModel[] {
    if (Array.isArray(models)) {
      return models.concat(...models.map(lovData => lovData.child_nodes && lovData.child_nodes.length ?
        this.flattenArray(lovData.child_nodes) : []));
    } else {
      return models;
    }
  }

  public static getValue(key: string, lovRefDataModels: LovRefDataModel[]): string {
    const flatChannels = HearingsUtils.flattenArray(lovRefDataModels);
    const foundChannel = flatChannels && flatChannels.find(channel => channel.key === key);
    return foundChannel ? foundChannel.value_en : key;
  }

  public static getValues(keys: string[], lovRefDataModels: LovRefDataModel[]): string[] {
    const flatChannels = HearingsUtils.flattenArray(lovRefDataModels);
    const result = keys && keys.length && keys.map(key => {
      const foundChannel = flatChannels.find(channel => channel.key === key);
      return foundChannel ? foundChannel.value_en : key;
    });
    return result;
  }

  public static sortHearingDaySchedule(hearingDaySchedule: HearingDayScheduleModel[]): HearingDayScheduleModel[] {
    if (!hearingDaySchedule || hearingDaySchedule.length === 0) {
      return hearingDaySchedule;
    }
    return hearingDaySchedule.slice().sort((schedule1, schedule2) =>
      moment.utc(schedule1.hearingStartDateTime).diff(moment.utc(schedule2.hearingStartDateTime))
    );
  }
}
