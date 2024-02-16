import * as moment from 'moment';
import { HearingConditions } from '../models/hearingConditions';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { HearingWindowModel } from '../models/hearingWindow.model';
import { HearingDateEnum } from '../models/hearings.enum';
import { LovRefDataModel } from '../models/lovRefData.model';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { IndividualDetailsModel } from '../models/individualDetails.model';

export class HearingsUtils {
  public static hasPropertyAndValue(conditions: HearingConditions, propertyName: string, propertyValue: any): boolean {
    return conditions && conditions.hasOwnProperty(propertyName) && conditions[propertyName] === propertyValue;
  }

  public static flattenArray(models: LovRefDataModel[]): LovRefDataModel[] {
    if (Array.isArray(models)) {
      return models.concat(...models.map((lovData) => lovData.child_nodes && lovData.child_nodes.length ?
        this.flattenArray(lovData.child_nodes) : []));
    }

    return models;
  }

  public static getValue(key: string, lovRefDataModels: LovRefDataModel[]): string {
    const flatChannels = HearingsUtils.flattenArray(lovRefDataModels);
    const foundChannel = flatChannels && flatChannels.find((channel) => channel.key === key);
    return foundChannel ? foundChannel.value_en : key;
  }

  public static getValues(keys: string[], lovRefDataModels: LovRefDataModel[]): string[] {
    const flatChannels = HearingsUtils.flattenArray(lovRefDataModels);
    return keys && keys.length && keys.map((key) => {
      const foundChannel = flatChannels.find((channel) => channel.key === key);
      return foundChannel ? foundChannel.value_en : key;
    });
  }

  public static sortHearingDaySchedule(hearingDaySchedule: HearingDayScheduleModel[]): HearingDayScheduleModel[] {
    if (!hearingDaySchedule || hearingDaySchedule.length === 0) {
      return hearingDaySchedule;
    }
    return hearingDaySchedule.slice().sort((schedule1, schedule2) =>
      moment.utc(schedule1.hearingStartDateTime).diff(moment.utc(schedule2.hearingStartDateTime))
    );
  }

  public static getHearingLength(duration: number): string {
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
    return '';
  }

  public static getHearingWindow(hearingRequestMainModel: HearingRequestMainModel): HearingWindowModel {
    return hearingRequestMainModel.hearingDetails.hearingWindow && Object.keys(hearingRequestMainModel.hearingDetails.hearingWindow).length === 0
      ? null
      : hearingRequestMainModel.hearingDetails.hearingWindow;
  }

  public static getPartiesNotAvailableDates(parties: PartyDetailsModel[]): string[] {
    const partiesNotAvailableDates: string[] = [];
    const unavailabilityDateList = parties.flatMap((party) => party.unavailabilityRanges);
    unavailabilityDateList?.forEach((dateRange) => {
      if (dateRange) {
        const startDate = moment(dateRange.unavailableFromDate);
        const endDate = moment(dateRange.unavailableToDate);

        while (startDate <= endDate) {
          const currentDate = startDate.format(HearingDateEnum.DisplayMonth);
          if (startDate.weekday() !== 6 && startDate.weekday() !== 0) {
            partiesNotAvailableDates.push(currentDate);
          }
          startDate.add(1, 'd');
        }
      }
    });
    return partiesNotAvailableDates;
  }

  public static getPartyNameFormatted(individualDetails: IndividualDetailsModel): string {
    if (individualDetails) {
      return `${individualDetails.firstName} ${individualDetails.lastName}`;
    }
    return '';
  }

  /**
   * Returns a boolean value based on the difference between
   * the party name in hearing request and the party name in service hearing values
   *
   * @static
   * @param {PartyDetailsModel} partyInHMC party in hearing request returned by HMC API
   * @param {PartyDetailsModel} partyInSHV party in service hearing values returned by the integrated service
   * @return {*}  {boolean}
   * @memberof HearingsUtils
   */
  public static hasPartyNameChanged(partyInHMC: PartyDetailsModel, partyInSHV: PartyDetailsModel): boolean {
    if (partyInHMC.individualDetails && partyInSHV.individualDetails) {
      if ((partyInHMC.individualDetails.firstName !== partyInSHV.individualDetails.firstName) ||
        (partyInHMC.individualDetails.lastName !== partyInSHV.individualDetails.lastName)) {
        return true;
      }
    }
    return false;
  }
}
