export type YesNo = 'Yes' | 'No';

export type AdditionalFacility = 'Custody Cell' | 'Laptop' | 'Projector' | 'Witness Room';

export type HearingMethod = 'In Person' | 'Telephone' | 'Video';

export type specificJudge = YesNo;

export type hearingPriority = 'Standard' | 'Urgent';

export type howWillParticipantAttend = 'In Person' | 'Telephone' | 'Video' | 'Not in Attendence';

export type LengthOfHearing = {
  days: number;
  hours: number;
  minutes: number;
};

export type HearingDate = {
  day?: number;
  month?: number;
  year?: number;
};

export type HearingDateRange = {
  mustListAfter: HearingDate;
  mustListBefore: HearingDate;
};

export type TypeOfJudges =
  | 'Circuit Judge'
  | 'Deputy Circuit Judge'
  | 'Deputy District Judge'
  | 'Deputy High Court Judge'
  | 'District Judge'
  | 'District Judge Magistrates Court'
  | 'High Court Judge'
  | 'Magistrate (JP)'
  | 'Recorder';

export type HearingStage =
  | 'Allocation'
  | 'Appeal'
  | 'Application'
  | 'breach'
  | 'committal'
  | 'costs'
  | 'judgment'
  | 'Case Management Conference'
  | 'Case Management Hearing'
  | 'Committal'
  | 'Conciliation'
  | 'Decision Hearing'
  | 'First Hearing Dispute Resolution Appointment (FHDRA)'
  | 'Settlement Conference'
  | 'Safeguarding Gatekeeping Appointment'
  | 'Review'
  | 'Pre Hearing Review'
  | 'Permission Hearing'
  | 'Dispute Resolution Appointment'
  | 'Finding of Fact'
  | 'First Hearing'
  | 'Full/Final hearing'
  | 'Further Case Management Hearing'
  | '2nd Gatekeeping Appointment'
  | 'Ground Rules Hearing'
  | 'Human Rights Act Application';

export interface HearingFacilitiesData {
  additionalSecurity?: YesNo;
  additionalFacilities?: AdditionalFacility[];
}

export interface HearingAttendenceData {
  paperHearing?: YesNo;
  hearingMethod?: HearingMethod[];
  attendHearingHow?: howWillParticipantAttend[];
  numberOfPeopleAttendingHearing?: string;
}

export interface HearingDetailsData {
  hearingInWelsh?: YesNo;
  specificJudge?: YesNo;
  judgeType?: TypeOfJudges[];
  excludedJudge?: string;
  hearingSpecificDate?: YesNo;
  firstDateOfHearing?: HearingDate;
  secondDateOfHearing?: HearingDate;
  hearingPriority?: hearingPriority;
  linkedHearing?: YesNo;
  additionalInstructions?: string;
}

export interface HearingVenueData {
  name?: string;
}

export interface HearingStageData {
  stage?: HearingStage;
}

export interface HearingDuration {
  days?: number;
  hours?: number;
  minutes?: number;
}
// Page key registry - Add more page interfaces based on the pageFlows
export interface JourneyPages {
  hearingFacilities: HearingFacilitiesData;
  hearingStage: HearingStageData;
  hearingAttendence: HearingAttendenceData;
  hearingVenue: HearingVenueData;
  hearingDetails: HearingDetailsData;
  hearingDuration: HearingDuration;
}

export type PageKey = keyof JourneyPages;

// HearingJourneyModel
export class HearingJourneyModel {
  private data: JourneyPages = {
    hearingFacilities: {},
    hearingStage: {},
    hearingAttendence: {},
    hearingVenue: {},
    hearingDetails: {},
    hearingDuration: {},
    // ......
  };

  /** Set a single field on a page */
  set<P extends PageKey, F extends keyof JourneyPages[P]>(page: P, field: F, value: JourneyPages[P][F]): this {
    this.data[page][field] = value;
    return this;
  }

  /** Get a single field from a page */
  get<P extends PageKey, F extends keyof JourneyPages[P]>(page: P, field: F): JourneyPages[P][F] {
    return this.data[page][field];
  }
}
