import * as moment from 'moment';
import { HearingConditions } from '../models/hearingConditions';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { HearingWindowModel } from '../models/hearingWindow.model';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { LovRefDataModel } from '../models/lovRefData.model';
import { PanelPreferenceModel } from '../models/panelPreference.model';
import { PartyDetailsModel } from '../models/partyDetails.model';

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

  public static getHearingWindow(hearingRequestMainModel: HearingRequestMainModel): HearingWindowModel {
    return hearingRequestMainModel.hearingDetails.hearingWindow && Object.keys(hearingRequestMainModel.hearingDetails.hearingWindow).length === 0
      ? null
      : hearingRequestMainModel.hearingDetails.hearingWindow;
  }

  public static getMustIncludedJudgeCount(panelPreferenceModel: PanelPreferenceModel[]): number {
    return panelPreferenceModel?.filter((preferences) => preferences.memberType === MemberType.JUDGE &&
      preferences.requirementType === RequirementType.MUSTINC).length || 0;
  }

  public static getRestOfRoleType(roleType: string[]): string[] {
    let rest: string[] = [];
    if (roleType?.length > 0) {
      rest = roleType.slice(1);
    }
    return rest;
  }

  public static getPartyChannelValue(refData: LovRefDataModel[], party: PartyDetailsModel): string {
    const channel = party.hearingSubChannel ? party.hearingSubChannel : party.individualDetails.preferredHearingChannel;
    if (channel) {
      const preferredHearingChannelRefData = refData.find((ref) => ref.key === channel);
      return preferredHearingChannelRefData?.value_en ? preferredHearingChannelRefData.value_en : `Undefined hearing channel: ${channel}`;
    } else {
      return 'No hearing channel selected'
    }
  }
  public static getNameFromFirstLast(first: string, last: string): string {
    const res:string[] = [];
    if (first) {
      res.push(first);
    }
    if (last) {
      res.push(last);
    }
    if (res.length > 0) {
      return res.join(' ');
    }
    return null;
  }

  public static getPartyName(partiesFromServiceValue: PartyDetailsModel[], partyInfo: PartyDetailsModel): string {
    const partyDetails = partiesFromServiceValue.find((pty) => pty.partyID === partyInfo.partyID);
    return (partyDetails && partyDetails.partyName)
      || HearingsUtils.getNameFromFirstLast(partyInfo.individualDetails.firstName,
        partyInfo.individualDetails.lastName)
      || `Error: ${partyInfo.partyID}`;
  }

}
