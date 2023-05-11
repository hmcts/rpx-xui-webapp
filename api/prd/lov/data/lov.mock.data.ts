import { LovRefDataByCategoryModel, LovRefDataByServiceModel, LovRefDataModel } from '../models/lovRefData.model';

export const DEFAULT_JUDGE_TYPES_REF: LovRefDataModel[] = [
  {
    key: 'tj',
    value_en: 'Tribunal Judge',
    value_cy: '',
    hint_text_en: 'Tribunal',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'JudgeType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'dtj',
    value_en: 'Deputy Tribunal Judge',
    value_cy: '',
    hint_text_en: 'Deputy',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'JudgeType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'rtj',
    value_en: 'Regional Tribunal Judge',
    value_cy: '',
    hint_text_en: 'Regional',
    hint_text_cy: '',
    lov_order: 3,
    parent_key: null,
    category_key: 'JudgeType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_STAGES_REF: LovRefDataModel[] = [
  {
    key: 'BBA3-SUB',
    value_en: 'Substantive',
    value_cy: '',
    hint_text_en: 'Substantive',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'BBA3-DIR',
    value_en: 'Direction Hearings',
    value_cy: '',
    hint_text_en: 'Direction Hearings',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'BBA3-CHA',
    value_en: 'Chambers Outcome',
    value_cy: '',
    hint_text_en: 'Chambers Outcome',
    hint_text_cy: '',
    lov_order: 3,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_PRIORITIES_REF: LovRefDataModel[] = [
  {
    key: 'NORMAL',
    value_en: 'Normal',
    value_cy: '',
    hint_text_en: 'Normal',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'HearingPriority',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'HIGH',
    value_en: 'High',
    value_cy: '',
    hint_text_en: 'High',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'HearingPriority',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'CRITICAL',
    value_en: 'Critical',
    value_cy: '',
    hint_text_en: 'Critical',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'HearingPriority',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'PENDING',
    value_en: 'Pending',
    value_cy: '',
    hint_text_en: 'Pending',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'HearingPriority',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_PARTYCHANNEL_REF: LovRefDataModel[] = [
  {
    key: 'inPerson',
    value_en: 'In person',
    value_cy: '',
    hint_text_en: 'in person',
    hint_text_cy: 'Wyneb yn wyneb',
    lov_order: 1,
    parent_key: null,
    category_key: 'HearingChannel',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'byPhone',
    value_en: 'By phone',
    value_cy: '',
    hint_text_en: 'By Phone',
    hint_text_cy: 'Ffôn',
    lov_order: 2,
    parent_key: null,
    category_key: 'HearingChannel',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: [
      {
        key: 'telephone-btMeetMe',
        value_en: 'Telephone - BTMeetme',
        value_cy: '',
        hint_text_en: 'By Phone bTMeetme',
        hint_text_cy: '',
        lov_order: 1,
        parent_key: 'byPhone',
        category_key: 'HearingChannel',
        parent_category: 'byPhone',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        key: 'telephone-CVP',
        value_en: 'Telephone - CVP',
        value_cy: '',
        hint_text_en: 'By Phone CVP',
        hint_text_cy: '',
        lov_order: 2,
        parent_key: 'byPhone',
        category_key: 'HearingChannel',
        parent_category: 'byPhone',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        key: 'telephone-other',
        value_en: 'Telephone - Other',
        value_cy: '',
        hint_text_en: 'By Phone Other',
        hint_text_cy: '',
        lov_order: 3,
        parent_key: 'byPhone',
        category_key: 'HearingChannel',
        parent_category: 'byPhone',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        key: 'telephone-skype',
        value_en: 'Telephone - Skype',
        value_cy: '',
        hint_text_en: 'By Phone Skype',
        hint_text_cy: '',
        lov_order: 4,
        parent_key: 'byPhone',
        category_key: 'HearingChannel',
        parent_category: 'byPhone',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      }
    ],
    from: 'exui-default'
  },
  {
    key: 'byVideo',
    value_en: 'By video',
    value_cy: 'Fideo',
    hint_text_en: 'By video',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'HearingChannel',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: [
      {
        key: 'video-conference',
        value_en: 'Video Conference',
        value_cy: '',
        hint_text_en: 'By video conference',
        hint_text_cy: '',
        lov_order: 4,
        parent_key: 'byVideo',
        category_key: 'HearingChannel',
        parent_category: 'byVideo',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        key: 'video-other',
        value_en: 'Video - Other',
        value_cy: '',
        hint_text_en: 'By video other',
        hint_text_cy: '',
        lov_order: 4,
        parent_key: 'byVideo',
        category_key: 'HearingChannel',
        parent_category: 'byVideo',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        key: 'video-skype',
        value_en: 'Video - Skype',
        value_cy: '',
        hint_text_en: 'By video skype',
        hint_text_cy: '',
        lov_order: 4,
        parent_key: 'byVideo',
        category_key: 'HearingChannel',
        parent_category: 'byVideo',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        key: 'video-teams',
        value_en: 'Video - Teams',
        value_cy: '',
        hint_text_en: 'By video teams',
        hint_text_cy: '',
        lov_order: 4,
        parent_key: 'byVideo',
        category_key: 'HearingChannel',
        parent_category: 'byVideo',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      }
    ],
    from: 'exui-default'
  },
  {
    key: 'notAttending',
    value_en: 'Not attending',
    value_cy: '',
    hint_text_en: 'not attending',
    hint_text_cy: '',
    lov_order: 5,
    parent_key: null,
    category_key: 'HearingChannel',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'onPaper',
    value_en: 'Paper',
    value_cy: '',
    hint_text_en: 'Paper',
    hint_text_cy: '',
    lov_order: 6,
    parent_key: null,
    category_key: 'HearingChannel',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_HEARING_CANCEL_REF: LovRefDataModel[] = [
  {
    key: 'withdraw',
    value_en: 'Withdrawn',
    value_cy: '',
    hint_text_en: 'Withdrawn',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'struck',
    value_en: 'struck',
    value_cy: '',
    hint_text_en: 'struck',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'unable',
    value_en: 'Party Unable To Attend',
    value_cy: '',
    hint_text_en: 'Party Unable To Attend',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'exclusio',
    value_en: 'Exclusion',
    value_cy: '',
    hint_text_en: 'Exclusion',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'incompl',
    value_en: 'Incomplete Tribunal',
    value_cy: '',
    hint_text_en: 'Incomplete Tribunal',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'listerr',
    value_en: 'Listed In error',
    value_cy: '',
    hint_text_en: 'Listed In error',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'other',
    value_en: 'Other',
    value_cy: '',
    hint_text_en: 'Other',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'notready',
    value_en: 'No longer ready for hearing',
    value_cy: '',
    hint_text_en: 'No longer ready for hearing',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'settled',
    value_en: 'Settled',
    value_cy: '',
    hint_text_en: 'Settled',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'jodir',
    value_en: 'Judicial direction',
    value_cy: '',
    hint_text_en: 'Judicial direction',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'notpaid',
    value_en: 'Fee not paid',
    value_cy: '',
    hint_text_en: 'Fee not paid',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'lapsed',
    value_en: 'Lapsed',
    value_cy: '',
    hint_text_en: 'Lapsed',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'CaseManagementCancellationReasons',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_HEARING_ACTUAL_ADJOURN_REF: LovRefDataModel[] = [
  {
    key: 'postponedDueToExclusions',
    value_en: 'Postponed, due to Exclusions',
    value_cy: '',
    hint_text_en: 'Postponed, due to Exclusions',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'postponedDueToOtherReasons',
    value_en: 'Postponed, due to Other Reasons',
    value_cy: '',
    hint_text_en: 'Postponed, due to Other Reasons',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'postponedIncompleteTribunal',
    value_en: 'Postponed, Incomplete Tribunal',
    value_cy: '',
    hint_text_en: 'Postponed, Incomplete Tribunal',
    hint_text_cy: '',
    lov_order: 3,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'postponedNoReasonGiven',
    value_en: 'Postponed, No Reason Given',
    value_cy: '',
    hint_text_en: 'Postponed, No Reason Given',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'postponedOtherPartyUnableToAttend',
    value_en: 'Postponed, Other Party unable to attend',
    value_cy: '',
    hint_text_en: 'Postponed, Other Party unable to attend',
    hint_text_cy: '',
    lov_order: 5,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedAppellantToAttendOralRequestedDidNotAttendReasonGiven',
    value_en: 'Adjourned, Appellant to attend - oral requested - did not attend - reason given',
    value_cy: '',
    hint_text_en: 'Adjourned, Appellant to attend - oral requested - did not attend - reason given',
    hint_text_cy: '',
    lov_order: 6,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedAppellantToAttendOralRequestedDidNotAttendNoReason',
    value_en: 'Adjourned, Appellant to attend - oral requested - did not attend - no reason',
    value_cy: '',
    hint_text_en: 'Adjourned, Appellant to attend - oral requested - did not attend - no reason',
    hint_text_cy: '',
    lov_order: 7,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedAppellantToAttendPaperRequestedOrNoEnquiryFormReturned',
    value_en: 'Adjourned, Appellant to attend - paper requested or no Enquiry Form returned',
    value_cy: '',
    hint_text_en: 'Adjourned, Appellant to attend - paper requested or no Enquiry Form returned',
    hint_text_cy: '',
    lov_order: 8,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedFurtherMedicalEvidenceEssential',
    value_en: 'Adjourned, Further medical evidence essential',
    value_cy: '',
    hint_text_en: 'Adjourned, Further medical evidence essential',
    hint_text_cy: '',
    lov_order: 9,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedEvidenceOrFurtherResponseFromRespondentRequired',
    value_en: 'Adjourned, Evidence or further Response from Respondent required',
    value_cy: '',
    hint_text_en: 'Adjourned, Evidence or further Response from Respondent required',
    hint_text_cy: '',
    lov_order: 10,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedEvidenceOrSubmissionFromAppellantRequired',
    value_en: 'Adjourned, Evidence or submission from Appellant required',
    value_cy: '',
    hint_text_en: 'Adjourned, Evidence or submission from Appellant required',
    hint_text_cy: '',
    lov_order: 11,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedNoInterpreter',
    value_en: 'Adjourned, No Interpreter',
    value_cy: '',
    hint_text_en: 'Adjourned, No Interpreter',
    hint_text_cy: '',
    lov_order: 12,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedInsufficientTimeToDealWithCase',
    value_en: 'Adjourned, Insufficient time to deal with case',
    value_cy: '',
    hint_text_en: 'Adjourned, Insufficient time to deal with case',
    hint_text_cy: '',
    lov_order: 13,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedDocumentsSuppliedButNotBeforeTheTribunalAtTheHearing',
    value_en: 'Adjourned, Documents supplied but not before the Tribunal at the hearing',
    value_cy: '',
    hint_text_en: 'Adjourned, Documents supplied but not before the Tribunal at the hearing',
    hint_text_cy: '',
    lov_order: 14,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedPresentingOfficerToAttend',
    value_en: 'Adjourned, Presenting Officer to attend',
    value_cy: '',
    hint_text_en: 'Adjourned, Presenting Officer to attend',
    hint_text_cy: '',
    lov_order: 15,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedRespondentFailedToComplyWithDirection',
    value_en: 'Adjourned, Respondent failed to comply with direction',
    value_cy: '',
    hint_text_en: 'Adjourned, Respondent failed to comply with direction',
    hint_text_cy: '',
    lov_order: 16,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedOtherAdministrativeErrors',
    value_en: 'Adjourned, Other administrative errors (specify error)',
    value_cy: '',
    hint_text_en: 'Adjourned, Other administrative errors (specify error)',
    hint_text_cy: '',
    lov_order: 17,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedOtherReasonsForAdjourning',
    value_en: 'Adjourned, Other reasons for adjourning',
    value_cy: '',
    hint_text_en: 'Adjourned, Other reasons for adjourning',
    hint_text_cy: '',
    lov_order: 18,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedElementsOutstanding',
    value_en: 'Adjourned, element(s) outstanding',
    value_cy: '',
    hint_text_en: 'Adjourned, element(s) outstanding',
    hint_text_cy: '',
    lov_order: 19,
    parent_key: null,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedAllElementsAdjourned',
    value_en: 'Adjourned, All Elements Adjourned',
    value_cy: '',
    hint_text_en: 'Adjourned, All Elements Adjourned',
    hint_text_cy: '',
    lov_order: 20,
    category_key: 'ActualPartHeardReasonCodes',
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    key: 'adjournedListedPaperCaseNotHeardDueToLackOfTime',
    value_en: 'Adjourned, Listed paper case not heard due to lack of time',
    value_cy: '',
    hint_text_en: 'Adjourned, Listed paper case not heard due to lack of time',
    hint_text_cy: '',
    category_key: 'ActualPartHeardReasonCodes',
    lov_order: 21,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_HEARING_ACTUAL_CANCEL_REF: LovRefDataModel[] = [
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'withdraw',
    value_en: 'Withdrawn',
    value_cy: '',
    hint_text_en: 'Withdrawn',
    hint_text_cy: '',
    lov_order: 1,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'struck',
    value_en: 'Struck Out',
    value_cy: '',
    hint_text_en: 'Struck Out',
    hint_text_cy: '',
    lov_order: 2,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'unable',
    value_en: 'Party unable to attend',
    value_cy: '',
    hint_text_en: 'Party unable to attend',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'exclusio',
    value_en: 'Exclusion',
    value_cy: '',
    hint_text_en: 'Exclusion',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'incompl',
    value_en: 'Incomplete Tribunal',
    value_cy: '',
    hint_text_en: 'Incomplete Tribunal',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'listerr',
    value_en: 'Listed in error',
    value_cy: '',
    hint_text_en: 'Listed in error',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'other',
    value_en: 'Other',
    value_cy: '',
    hint_text_en: 'Other',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'notready',
    value_en: 'No longer ready for hearing',
    value_cy: '',
    hint_text_en: 'No longer ready for hearing',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'notatt',
    value_en: 'Party did not attend',
    value_cy: '',
    hint_text_en: 'Party did not attend',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'ActualCancellationReasonCodes',
    key: 'lapsed',
    value_en: 'Lapsed',
    value_cy: '',
    hint_text_en: 'Lapsed',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_ADDITIONAL_FACILITIES_REF: LovRefDataModel[] = [
  {
    category_key: 'Facilities',
    key: 'immigrationDetentionCentre',
    value_en: 'Immigration detention centre',
    value_cy: '',
    hint_text_en: 'Immigration detention centre',
    hint_text_cy: '',
    lov_order: 1,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'inCameraCourt',
    value_en: 'In camera court',
    value_cy: '',
    hint_text_en: 'In camera court',
    hint_text_cy: '',
    lov_order: 2,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'sameSexCourtroom',
    value_en: 'Same-sex courtroom',
    value_cy: '',
    hint_text_en: 'Same-sex courtroom',
    hint_text_cy: '',
    lov_order: 3,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'secureDock',
    value_en: 'Secure dock',
    value_cy: '',
    hint_text_en: 'Secure dock',
    hint_text_cy: '',
    lov_order: 4,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'witnessScreen',
    value_en: 'Witness Screen',
    value_cy: '',
    hint_text_en: 'Witness Screen',
    hint_text_cy: '',
    lov_order: 5,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'witnessRoom',
    value_en: 'Witness room',
    value_cy: '',
    hint_text_en: 'Witness room',
    hint_text_cy: '',
    lov_order: 6,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'videoConferencing',
    value_en: 'Video conferencing',
    value_cy: '',
    hint_text_en: 'Video Conferencing',
    hint_text_cy: '',
    lov_order: 7,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'VideoFacility',
    value_en: 'Video facility',
    value_cy: '',
    hint_text_en: 'Video facility',
    hint_text_cy: '',
    lov_order: 8,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'Facilities',
    key: 'prisonVideoLink',
    value_en: 'Prison Video Link',
    value_cy: '',
    hint_text_en: '',
    hint_text_cy: '',
    lov_order: 9,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const DEFAULT_PANEL_MEMBER_TYPE_REF: LovRefDataModel[] = [
  {
    category_key: 'PanelMemberType',
    key: 'BBA3-DQPM',
    value_en: 'Disability Qualified Panel Member',
    value_cy: '',
    hint_text_en: '',
    hint_text_cy: '',
    lov_order: null,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'PanelMemberType',
    key: 'BBA3-MQPM2',
    value_en: 'Medically Qualified Panel Member',
    value_cy: '',
    hint_text_en: '',
    hint_text_cy: '',
    lov_order: null,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: [
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM2-003',
        value_en: 'Eye Surgeon',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM2',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM2-004',
        value_en: 'General Practitioner',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM2',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM2-001',
        value_en: 'Cardiologist',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM2',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM2-002',
        value_en: 'Carer',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM2',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      }
    ],
    from: 'exui-default'
  },
  {
    category_key: 'PanelMemberType',
    key: 'BBA3-MQPM1',
    value_en: 'Medically Qualified Panel Member',
    value_cy: '',
    hint_text_en: '',
    hint_text_cy: '',
    lov_order: null,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: [
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM1-001',
        value_en: 'Cardiologist',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM1',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM1-002',
        value_en: 'Carer',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM1',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM1-004',
        value_en: 'General Practitioner',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM1',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      },
      {
        category_key: 'PanelMemberSpecialism',
        key: 'BBA3-MQPM1-003',
        value_en: 'Eye Surgeon',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: null,
        parent_category: 'PanelMemberType',
        parent_key: 'BBA3-MQPM1',
        active_flag: 'Y',
        child_nodes: null,
        from: 'exui-default'
      }
    ],
    from: 'exui-default'
  },
  {
    category_key: 'PanelMemberType',
    key: 'BBA3-FQPM',
    value_en: 'Financially Qualified Panel Member',
    value_cy: '',
    hint_text_en: '',
    hint_text_cy: '',
    lov_order: null,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  },
  {
    category_key: 'PanelMemberType',
    key: 'BBA3-RMM',
    value_en: 'Regional Medical Member',
    value_cy: '',
    hint_text_en: '',
    hint_text_cy: '',
    lov_order: null,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }
];

export const HEARING_ROLES_REF: LovRefDataModel[] = [
  {
    key: 'appellant',
    value_en: 'Appellant',
    value_cy: '',
    hint_text_en: 'Appellant',
    hint_text_cy: '',
    lov_order: 1,
    category_key: 'HearingRoles',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  },
  {
    key: 'claimant',
    value_en: 'Claimant',
    value_cy: '',
    hint_text_en: 'Claimant',
    hint_text_cy: '',
    lov_order: 2,
    category_key: 'HearingRoles',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  },
  {
    key: 'interpreter',
    value_en: 'Interpreter',
    value_cy: '',
    hint_text_en: 'Interpreter',
    hint_text_cy: '',
    lov_order: 3,
    category_key: 'HearingRoles',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  },
  {
    key: 'solicitor',
    value_en: 'Solicitor',
    value_cy: '',
    hint_text_en: 'Solicitor',
    hint_text_cy: '',
    lov_order: 4,
    category_key: 'HearingRoles',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  },
  {
    key: 'barrister',
    value_en: 'Barrister',
    value_cy: '',
    hint_text_en: 'Barrister',
    hint_text_cy: '',
    lov_order: 5,
    category_key: 'HearingRoles',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  }
];

export const CHANGE_HEARING_REASON: LovRefDataModel[] = [
  {
    key: 'partyreq',
    value_en: 'Party requested change',
    value_cy: '',
    hint_text_en: 'Party requested change',
    hint_text_cy: '',
    lov_order: 1,
    category_key: 'ChangeReasons',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  },
  {
    key: 'judgereq',
    value_en: 'Judge requested change',
    value_cy: '',
    hint_text_en: 'Judge requested change',
    hint_text_cy: '',
    lov_order: 2,
    category_key: 'ChangeReasons',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  },
  {
    key: 'adminreq',
    value_en: 'Admin requested change',
    value_cy: '',
    hint_text_en: 'Admin requested change',
    hint_text_cy: '',
    lov_order: 3,
    category_key: 'ChangeReasons',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  },
  {
    key: 'adminerr',
    value_en: 'Admin error',
    value_cy: '',
    hint_text_en: 'Admin error',
    hint_text_cy: '',
    lov_order: 3,
    category_key: 'ChangeReasons',
    parent_category: '',
    parent_key: '',
    active_flag: '',
    from: 'exui-default'
  }
];

export const DEFAULT_HEARING_ROLES: LovRefDataByServiceModel = {
  list_of_values: HEARING_ROLES_REF
};

export const DEFAULT_STAGES: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_STAGES_REF
};

export const DEFAULT_PRIORITIES: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_PRIORITIES_REF
};

export const DEFAULT_PARTY_CHANNEL: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_PARTYCHANNEL_REF
};

export const DEFAULT_JUDGE_TYPES: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_JUDGE_TYPES_REF
};

export const DEFAULT_CANCEL_HEARING: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_HEARING_CANCEL_REF
};

export const DEFAULT_ADDITIONAL_FACILITIES: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_ADDITIONAL_FACILITIES_REF
};

export const DEFAULT_PANEL_MEMBER_TYPE: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_PANEL_MEMBER_TYPE_REF
};

export const DEFAULT_ADJOURN_HEARING_ACTUAL: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_HEARING_ACTUAL_ADJOURN_REF
};

export const DEFAULT_CANCEL_HEARING_ACTUAL: LovRefDataByServiceModel = {
  list_of_values: DEFAULT_HEARING_ACTUAL_CANCEL_REF
};

export const DEFAULT_CHANGE_HEARING_REASON: LovRefDataByServiceModel = {
  list_of_values: CHANGE_HEARING_REASON
};

export const ALL_REF_DATA: LovRefDataByCategoryModel[] = [
  {
    categoryKey: 'HearingType',
    lovDataModel: DEFAULT_STAGES
  },
  {
    categoryKey: 'HearingPriority',
    lovDataModel: DEFAULT_PRIORITIES
  },
  {
    categoryKey: 'HearingChannel',
    lovDataModel: DEFAULT_PARTY_CHANNEL
  },
  {
    categoryKey: 'JudgeType',
    lovDataModel: DEFAULT_JUDGE_TYPES
  },
  {
    categoryKey: 'ActualPartHeardReasonCodes',
    lovDataModel: DEFAULT_ADJOURN_HEARING_ACTUAL
  },
  {
    categoryKey: 'ActualCancellationReasonCodes',
    lovDataModel: DEFAULT_CANCEL_HEARING_ACTUAL
  },
  {
    categoryKey: 'Facilities',
    lovDataModel: DEFAULT_ADDITIONAL_FACILITIES
  },
  {
    categoryKey: 'PanelMemberType',
    lovDataModel: DEFAULT_PANEL_MEMBER_TYPE
  },
  {
    categoryKey: 'HearingRoles',
    lovDataModel: DEFAULT_HEARING_ROLES
  },
  {
    categoryKey: 'CaseManagementCancellationReasons',
    lovDataModel: DEFAULT_CANCEL_HEARING
  },
  {
    categoryKey: 'ChangeReasons',
    lovDataModel: DEFAULT_CHANGE_HEARING_REASON
  }
];
