import * as moment from 'moment';
import {
  ActualHearingDayModel,
  HearingActualsMainModel,
  HearingActualsModel
} from '../models/hearingActualsMainModel';

export class ActualHearingsUtils {
  public static isHearingDaysUpdated: boolean;
  public static isHearingPartiesUpdated: boolean;

  public static getDate(dateTime: string): string {
    return dateTime ? moment(dateTime).format('YYYY-MM-DD') : null;
  }

  public static getActualHearingDays(hearingActualsMainModel: HearingActualsMainModel): ActualHearingDayModel[] {
    let hearingDays: ActualHearingDayModel[];
    const hasAnyActuals = hearingActualsMainModel.hearingActuals &&
      (hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0);

    hearingDays = hearingActualsMainModel.hearingPlanned.plannedHearingDays.map(
        (plannedDay) => {
          let existingActualData = {} as ActualHearingDayModel;
          if (hasAnyActuals) {
            existingActualData = hearingActualsMainModel.hearingActuals.actualHearingDays.find(
              item => item.hearingDate === this.getDate(plannedDay.plannedStartTime)
            );
          }

          return {
            hearingDate: (existingActualData && existingActualData.hearingDate) || this.getDate(plannedDay.plannedStartTime),
            hearingStartTime: (existingActualData && existingActualData.hearingStartTime) || plannedDay.plannedStartTime,
            hearingEndTime: (existingActualData && existingActualData.hearingEndTime) || plannedDay.plannedEndTime,
            pauseDateTimes: (existingActualData && existingActualData.pauseDateTimes) || [],
            notRequired: (existingActualData && existingActualData.notRequired) || false,
            actualDayParties: ((existingActualData && existingActualData.actualDayParties && existingActualData.actualDayParties.length > 0)
                && existingActualData.actualDayParties)
                || plannedDay.parties.map(
                  (party) => {
                    return {
                      actualPartyId: party.partyID,
                      partyRole: party.partyRole,
                      partyChannelSubType: party.partyChannelSubType,
                      representedParty: null,
                      didNotAttendFlag: false,
                      individualDetails: { firstName: party.individualDetails.firstName, lastName: party.individualDetails.lastName },
                      actualOrganisationName: party.organisationDetails ? party.organisationDetails.name : null
                    };
                  })
              };
        });


    if (hearingDays && hearingDays.length > 0) {
      hearingDays = hearingDays.sort((a, b) => {
        return Date.parse(a.hearingDate) === Date.parse(b.hearingDate) ? 0 : Date.parse(a.hearingDate) > Date.parse(b.hearingDate) ? 1 : -1;
      });
    }

    return hearingDays;
  }

  public static mergeSingleHearingPartActuals(hearingActualsMainModel: HearingActualsMainModel, hearingDate: string,
                                              updatedActuals: ActualHearingDayModel): HearingActualsModel {
    const hearingActuals = {
      actualHearingDays: hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
        ? [...hearingActualsMainModel.hearingActuals.actualHearingDays] : [],
    } as HearingActualsModel;

    if (hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.hearingOutcome
        && hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult) {
      hearingActuals.hearingOutcome = {...hearingActualsMainModel.hearingActuals.hearingOutcome};
    }

    let indexOfActual: number;
    if (hearingActuals.actualHearingDays && hearingActuals.actualHearingDays.length > 0) {
      indexOfActual = hearingActuals.actualHearingDays.findIndex(
        item => item.hearingDate === hearingDate
      );
    }

    if (indexOfActual >= 0) {
      hearingActuals.actualHearingDays[indexOfActual] = {
        ...hearingActuals.actualHearingDays[indexOfActual],
        ...updatedActuals
      };
    } else {
      const plannedHearingDate = hearingActualsMainModel.hearingPlanned.plannedHearingDays.find((day) => ActualHearingsUtils.getDate(day.plannedStartTime) === hearingDate);

      const newHearingActual = {
        hearingDate,
        hearingStartTime: plannedHearingDate.plannedStartTime,
        hearingEndTime: plannedHearingDate.plannedEndTime,
        actualDayParties: [],
        pauseDateTimes: [],
        notRequired: null,
      };

      hearingActuals.actualHearingDays.push({
        ...newHearingActual,
        ...updatedActuals
      });
    }

    return hearingActuals;
  }

  public static getActualDayIndexFromHearingDate(hearingActualsMainModel: HearingActualsMainModel, hearingDate): number | undefined {
    const hasActualsHearingDays = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0;
    let index: number;
    if (hasActualsHearingDays) {
      index = hearingActualsMainModel.hearingActuals.actualHearingDays
        .findIndex(item => item.hearingDate === hearingDate);
    }

    return index;
  }

  public static getPlannedDayIndexFromHearingDate(hearingActualsMainModel: HearingActualsMainModel, hearingDate): number | undefined {
    const hasPlannedHearingDays = hearingActualsMainModel.hearingPlanned && hearingActualsMainModel.hearingPlanned.plannedHearingDays;
    let index: number;
    if (hasPlannedHearingDays) {
      index = hearingActualsMainModel.hearingPlanned.plannedHearingDays
        .findIndex(item => ActualHearingsUtils.getDate(item.plannedStartTime) === hearingDate);
    }

    return index;
  }
}
