import { Party } from '../../../src/hearings/models/hearingActuals.model';
import {
  ActualDayParty,
  ActualHearingDay,
  HearingActualsModel,
  HearingResult,
  PlannedHearing
} from '../models/hearingActuals.model';
import { HMCStatus } from '../models/hearings.enum';
import { getRandomElement, getRandomProperty } from './mock-data-utils';

export function generateHearingActuals(numberOfActuals: number): HearingActualsModel[] {

  const hearingActuals: HearingActualsModel[] = [];

  for (let i = 0; i < numberOfActuals; i++) {
    hearingActuals.push({
      hearingActuals: {
        hearingOutcome: {
          hearingFinalFlag: getRandomElement([true, false]),
          hearingResult: getRandomProperty(HearingResult) as unknown as HearingResult,
          hearingResultDate: getRandomElement(['2019-01-01', '2019-01-02', '2019-01-03']),
          hearingResultReasonType: '',
          hearingType: getRandomElement([
            'Pre-hearing review',
            'Case management preliminary hearing - open',
            'Full hearing',
            'Initial hearing',
            'Directions hearing']
          ),
        },
        actualHearingDays: generateActualHearingDay(2),
      },
      hearingPlanned: {
        plannedHearingType: getRandomElement([1, 2, 3, 4, 5]),
        plannedHearingDays: generatePlannedHearings(4),
      },
      hmcStatus: getRandomProperty(HMCStatus) as unknown as HMCStatus,
    });
  }
  return hearingActuals;
}

function generateParties(numberOfParties: number): Party[] {
  const parties: Party[] = [];

  for (let i = 0; i < numberOfParties; i++) {
    const id = getRandomElement([1, 2, 3, 4, 5]);
    parties.push({
      individualDetails: {
        title: getRandomElement(['Mr', 'Mrs', 'Miss', 'Ms']),
        firstName: getRandomElement(['John', 'Jane', 'Mary', 'Bob', 'Tom']),
        lastName: getRandomElement(['Smith', 'Jones', 'Brown', 'Smith', 'Jones']),
      },
      organisationDetails: {
        cftOrganisationID: getRandomElement(['12345', '54321', '67890']),
        name: getRandomElement(['Company A', 'Company B', 'Company C', 'Company D', 'Company E']),
      },
      partyId: id,
      partyRole: id,
      partyChannelSubType: getRandomElement(['Email', 'Phone', 'Fax', 'Letter', 'Other']),
    });
  }
  return parties;
}

function generateActualDayParties(numberOfDayParties: number): ActualDayParty[] {
  const dayParties: ActualDayParty[] = [];

  for (let i = 0; i < numberOfDayParties; i++) {
    const id = getRandomElement([1, 2, 3, 4, 5]);
    dayParties.push({
      actualPartyId: id,
      actualIndividualDetails: {
        firstName: getRandomElement(['John', 'Jane', 'Mary', 'Bob', 'Tom']),
        lastName: getRandomElement(['Smith', 'Jones', 'Brown', 'Smith', 'Jones']),
      },
      actualOrganisationDetails: {
        name: getRandomElement(['Company A', 'Company B', 'Company C', 'Company D', 'Company E']),
      },
      didNotAttendFlag: getRandomElement([true, false]),
      partyId: id,
      partyChannelSubType: getRandomElement(['Email', 'Phone', 'Fax', 'Letter', 'Other']),
      partyRole: getRandomElement([1, 2, 3, 4, 5]),
      representedParty: getRandomElement([1, 2, 3, 4, 5]),
    });
  }
  return dayParties;
}

function generateActualHearingDay(numberOfActualHearingDays: number): ActualHearingDay[] {

  const actualHearingDays: ActualHearingDay[] = [];

  for (let i = 0; i < numberOfActualHearingDays; i++) {

    const actualHearingDay: ActualHearingDay = {
      hearingDate: getRandomElement(['2021-03-12', '2021-03-13', '2021-03-14']),
      hearingStartTime: '2021-03-12T09:00:00.000+0000',
      hearingEndTime: '2021-03-13T10:00:00.000+0000',
      pauseDateTimes: [],
      actualDayParties: generateActualDayParties(1),
    };

    actualHearingDays.push(actualHearingDay);
  }
  return actualHearingDays;
}

function generatePlannedHearings(numberOfPlannedHearingDays: number): PlannedHearing[] {
  const plannedHearings: PlannedHearing[] = [];

  for (let i = 0; i < numberOfPlannedHearingDays; i++) {
    const plannedHearing: PlannedHearing = {
      plannedStartTime: '2021-03-12T09:00:00.000+0000',
      plannedEndTime: '2021-03-13T10:00:00.000+0000',
      parties: generateParties(2),
    };
    plannedHearings.push(plannedHearing);
  }

  return plannedHearings;
}
