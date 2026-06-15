import {
  AdditionalFacility,
  HearingJourneyModel,
  HearingMethod,
  HowWillParticipantAttend,
  TypeOfJudges,
  YesNo,
} from '../../utils/hearing-model';

export const HEARINGS_USER_IDENTIFIER = 'HEARING_MANAGER_CR84_ON';
export const HEARING_REQUEST_EXPECTED_STATUS = 'WAITING TO BE LISTED';

export const prlHearingHappyPathScenario = {
  route: {
    jurisdictionId: 'PRIVATELAW',
    caseTypeId: 'PRLAPPS',
    caseReference: process.env.PRL_HEARINGS_CASE_REFERENCE,
    caseReferencePattern: process.env.PRL_HEARINGS_CASE_REFERENCE_PATTERN ?? '*',
    preferredStates: ['Judicial review', 'Prepare for hearing', 'Submitted', 'Case management'],
  },
  additionalInstructions: 'Additional instructions for E2E Playwright test',
  hearingFacilities: {
    additionalSecurity: 'Yes',
    additionalFacilities: ['Custody Cell', 'Laptop', 'Projector', 'Witness Room'],
  },
  hearingStage: {
    stage: 'Allocation',
  },
  hearingAttendance: {
    paperHearing: 'No',
    hearingMethod: ['Video', 'Telephone'],
    attendHearingHow: ['Video', 'Telephone'],
    numberOfPeopleAttendingHearing: '2',
  },
  hearingVenue: {
    searchTerm: 'Southampton',
  },
  hearingDetails: {
    hearingInWelsh: 'No',
    specificJudge: 'No',
    judgeType: ['Deputy High Court Judge', 'Deputy Circuit Judge'],
    linkedHearing: 'No',
    hearingSpecificDate: 'No',
    hearingPriority: 'Standard',
  },
  hearingDuration: {
    days: 0,
    hours: 1,
    minutes: 30,
  },
} satisfies {
  route: {
    jurisdictionId: string;
    caseTypeId: string;
    caseReference?: string;
    caseReferencePattern: string;
    preferredStates: string[];
  };
  additionalInstructions: string;
  hearingFacilities: {
    additionalSecurity: YesNo;
    additionalFacilities: AdditionalFacility[];
  };
  hearingStage: {
    stage: 'Allocation';
  };
  hearingAttendance: {
    paperHearing: YesNo;
    hearingMethod: HearingMethod[];
    attendHearingHow: HowWillParticipantAttend[];
    numberOfPeopleAttendingHearing: string;
  };
  hearingVenue: {
    searchTerm: string;
  };
  hearingDetails: {
    hearingInWelsh: YesNo;
    specificJudge: YesNo;
    judgeType: TypeOfJudges[];
    linkedHearing: YesNo;
    hearingSpecificDate: YesNo;
    hearingPriority: 'Standard';
  };
  hearingDuration: {
    days: number;
    hours: number;
    minutes: number;
  };
};

export function createHearingJourneyModel(scenario = prlHearingHappyPathScenario): HearingJourneyModel {
  const model = new HearingJourneyModel();

  model.set('hearingFacilities', 'additionalSecurity', scenario.hearingFacilities.additionalSecurity);
  model.set('hearingFacilities', 'additionalFacilities', scenario.hearingFacilities.additionalFacilities);
  model.set('hearingStage', 'stage', scenario.hearingStage.stage);
  model.set('hearingAttendance', 'paperHearing', scenario.hearingAttendance.paperHearing);
  model.set('hearingAttendance', 'hearingMethod', scenario.hearingAttendance.hearingMethod);
  model.set('hearingAttendance', 'attendHearingHow', scenario.hearingAttendance.attendHearingHow);
  model.set('hearingAttendance', 'numberOfPeopleAttendingHearing', scenario.hearingAttendance.numberOfPeopleAttendingHearing);
  model.set('hearingVenue', 'name', [scenario.hearingVenue.searchTerm]);
  model.set('hearingDetails', 'hearingInWelsh', scenario.hearingDetails.hearingInWelsh);
  model.set('hearingDetails', 'specificJudge', scenario.hearingDetails.specificJudge);
  model.set('hearingDetails', 'judgeType', scenario.hearingDetails.judgeType);
  model.set('hearingDetails', 'linkedHearing', scenario.hearingDetails.linkedHearing);
  model.set('hearingDetails', 'hearingSpecificDate', scenario.hearingDetails.hearingSpecificDate);
  model.set('hearingDetails', 'hearingPriority', scenario.hearingDetails.hearingPriority);
  model.set('hearingDuration', 'days', scenario.hearingDuration.days);
  model.set('hearingDuration', 'hours', scenario.hearingDuration.hours);
  model.set('hearingDuration', 'minutes', scenario.hearingDuration.minutes);

  return model;
}
