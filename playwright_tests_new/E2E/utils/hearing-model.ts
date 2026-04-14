export type YesNo = 'Yes' | 'No';

export type AdditionalFacility = 'Custody Cell' | 'Laptop' | 'Projector' | 'Witness Room';

export type hearingMethods = 'In Person' | 'Telephone' | 'Video';

export type howWillParticipantAttend = 'In Person' | 'Telephone' | 'Video' | 'Not in Attendence';

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
  hearingMethod?: hearingMethods[];
  attendHearingHow?: howWillParticipantAttend;
}

export interface HearingStageData {
  stage?: HearingStage;
}

// Page key registry - Add more page interfaces based on the pageFlows
export interface JourneyPages {
  hearingFacilities: HearingFacilitiesData;
  hearingStage: HearingStageData;
  hearingAttendence: HearingAttendenceData;
}

export type PageKey = keyof JourneyPages;

// HearingJourneyModel
export class HearingJourneyModel {
  private data: JourneyPages = {
    hearingFacilities: {},
    hearingStage: {},
    hearingAttendence: {},
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
