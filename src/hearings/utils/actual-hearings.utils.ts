import * as moment from 'moment';
import {ActualDayPartyModel, ActualHearingDayModel, HearingActualsMainModel} from '../models/hearingActualsMainModel';
import {HearingDateEnum} from '../models/hearings.enum';
import * as _ from 'lodash';

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

  public static getActualHearingDay(hearingActualsMainModel: HearingActualsMainModel): ActualHearingDayModel[] {
    let hearingDays;
    if (!hearingActualsMainModel.hearingActuals) {
      const arr = hearingActualsMainModel.hearingPlanned.plannedHearingDays.map((plannedDay) => {
        return {
          hearingDate: this.getDate(plannedDay.plannedStartTime),
          hearingStartTime: plannedDay.plannedStartTime,
          hearingEndTime: plannedDay.plannedEndTime,
          pauseDateTimes: [],
          notRequired: false,
          actualDayParties: plannedDay.parties.map((party) => {
            return {
              actualPartyId: party.partyID,
              partyRole: party.partyRole,
              partyChannelSubType: party.partyChannelSubType,
              representedParty: '',
              didNotAttendFlag: false,
              individualDetails: { firstName: party.individualDetails.firstName, lastName: party.individualDetails.lastName },
              actualOrganisationName: party.organisationDetails ? party.organisationDetails.name : null
            }
          })
        }
      });
      hearingDays = arr;

    } else {

      if (hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0) {
        const arr = hearingActualsMainModel.hearingPlanned.plannedHearingDays.forEach((plannedDay) => {
          const existing = hearingActualsMainModel.hearingActuals.actualHearingDays.find( item => item.hearingDate === this.getDate(plannedDay.plannedStartTime));
          if (!existing) {
            return {
              hearingDate: this.getDate(plannedDay.plannedStartTime),
              hearingStartTime: plannedDay.plannedStartTime,
              hearingEndTime: plannedDay.plannedEndTime,
              pauseDateTimes: [],
              notRequired: false,
              actualDayParties: plannedDay.parties.map((party) => {
                return {
                  actualPartyId: party.partyID,
                  partyRole: party.partyRole,
                  partyChannelSubType: party.partyChannelSubType,
                  representedParty: '',
                  didNotAttendFlag: false,
                  individualDetails: { firstName: party.individualDetails.firstName, lastName: party.individualDetails.lastName },
                  actualOrganisationName: party.organisationDetails ? party.organisationDetails.name : null
                }
              })
            }
          }
        });
        hearingDays = arr;
      }
    }
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
