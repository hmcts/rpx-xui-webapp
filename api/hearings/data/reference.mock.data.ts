/* tslint:disable:object-literal-sort-keys */
import { RefDataByCategoryModel, RefDataByServiceModel, RefDataModel } from '../models/refData.model';

export const DEFAULT_JUDGE_TYPES_REF: RefDataModel[] = [
  {
    key: 'tribunalJudge',
    value_en: 'Tribunal Judge',
    value_cy: '',
    hintText_EN: 'Tribunal',
    hintTextCY: '',
    order: 1,
    parentKey: null,
  },
  {
    key: 'deputyTribunalJudge',
    value_en: 'Deputy Tribunal Judge',
    value_cy: '',
    hintText_EN: 'Deputy',
    hintTextCY: '',
    order: 2,
    parentKey: null,
  },
  {
    key: 'regionalTribunalJudge',
    value_en: 'Regional Tribunal Judge',
    value_cy: '',
    hintText_EN: 'Regional',
    hintTextCY: '',
    order: 3,
    parentKey: null,
  },
];
export const DEFAULT_STAGES_REF: RefDataModel[] = [
  {
    key: 'initial',
    value_en: 'Initial',
    value_cy: '',
    hintText_EN: 'Initial',
    hintTextCY: '',
    order: 1,
    parentKey: null,
  },
  {
    key: 'final',
    value_en: 'Final',
    value_cy: '',
    hintText_EN: 'Final',
    hintTextCY: '',
    order: 2,
    parentKey: null,
  },
  {
    key: 'substantial',
    value_en: 'Substantial',
    value_cy: '',
    hintText_EN: 'Substantial',
    hintTextCY: '',
    order: 3,
    parentKey: null,
  },
  {
    key: 'case-management',
    value_en: 'Case management',
    value_cy: '',
    hintText_EN: 'Case management',
    hintTextCY: '',
    order: 4,
    parentKey: null,
  },
];

export const DEFAULT_PRIORITIES_REF: RefDataModel[] = [
  {
    key: 'urgent',
    value_en: 'Urgent',
    value_cy: '',
    hintText_EN: 'Urgent',
    hintTextCY: '',
    order: 1,
    parentKey: null,
  },
  {
    key: 'standard',
    value_en: 'Standard',
    value_cy: '',
    hintText_EN: 'Standard',
    hintTextCY: '',
    order: 2,
    parentKey: null,
  },
];

export const DEFAULT_PARTYCHANNEL_REF: RefDataModel[] = [
  {
    key: 'inPerson',
    value_en: 'In person',
    value_cy: '',
    hintText_EN: 'in person',
    hintTextCY: '',
    order: 1,
    parentKey: null,
  },
  {
    key: 'byPhone',
    value_en: 'By phone',
    value_cy: '',
    hintText_EN: 'By Phone',
    hintTextCY: '',
    order: 2,
    parentKey: null,
  },
  {
    key: 'byVideo',
    value_en: 'By video',
    value_cy: '',
    hintText_EN: 'By video',
    hintTextCY: '',
    order: 4,
    parentKey: null,
  },
  {
    key: 'notAttending',
    value_en: 'Not attending',
    value_cy: '',
    hintText_EN: 'not attending',
    hintTextCY: '',
    order: 5,
    parentKey: null,
  },
];
export const DEFAULT_HEARING_CANCEL_REF: RefDataModel[] = [
  {
    key: 'reasoneOne',
    value_en: 'Reason 1',
    value_cy: '',
    hintText_EN: 'reason 1',
    hintTextCY: '',
    order: 1,
    parentKey: null,
  },
  {
    key: 'reasoneTwo',
    value_en: 'Reason 2',
    value_cy: '',
    hintText_EN: 'Reason 2',
    hintTextCY: '',
    order: 2,
    parentKey: null,
  },
  {
    key: 'reasonThree',
    value_en: 'Reason 3',
    value_cy: '',
    hintText_EN: 'Reason 3',
    hintTextCY: '',
    order: 4,
    parentKey: null,
  },
];
export const ADDITIONAL_HEARING_FACILITIES_REF: RefDataModel[] = [
  {
    key: 'immigrationDetentionCentre',
    value_en: 'Immigration detention centre',
    value_cy: '',
    hintText_EN: 'Immigration detention centre',
    hintTextCY: '',
    order: 1,
    parentKey: null,
  },
  {
    key: 'inCameraCourt',
    value_en: 'In camera court',
    value_cy: '',
    hintText_EN: 'In camera court',
    hintTextCY: '',
    order: 2,
    parentKey: null,
  },
  {
    key: 'sameSexCourtroom',
    value_en: 'Same-sex courtroom',
    value_cy: '',
    hintText_EN: 'Same sex courtroom',
    hintTextCY: '',
    order: 3,
    parentKey: null,
  },
  {
    key: 'secureDock',
    value_en: 'Secure dock',
    value_cy: '',
    hintText_EN: 'Secure Dock',
    hintTextCY: '',
    order: 4,
    parentKey: null,
  },
  {
    key: 'witnessScreen',
    value_en: 'Witness screen',
    value_cy: '',
    hintText_EN: 'Witness Screen',
    hintTextCY: '',
    order: 4,
    parentKey: null,
  },
  {
    key: 'witnessRoom',
    value_en: 'Witness room',
    value_cy: '',
    hintText_EN: 'Witness Room',
    hintTextCY: '',
    order: 5,
    parentKey: null,
  },
  {
    key: 'videoConferencing',
    value_en: 'Video conferencing',
    value_cy: '',
    hintText_EN: 'Video Conferencing',
    hintTextCY: '',
    order: 5,
    parentKey: null,
  },
  {
    key: 'VideoFacility',
    value_en: 'Video facility',
    value_cy: '',
    hintText_EN: 'Video Facility',
    hintTextCY: '',
    order: 5,
    parentKey: null,
  },
  {
    key: 'prisonVideoLink',
    value_en: 'Prison video link',
    value_cy: '',
    hintText_EN: 'Prison Video Link',
    hintTextCY: '',
    order: 5,
    parentKey: null,
  },
];
export const SSCS_STAGES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_STAGES_REF,
};

export const SSCS_PRIORITIES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_PRIORITIES_REF,
};

export const SSCS_PARTY_CHANNEL: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_PARTYCHANNEL_REF,
};
export const SSCS_JUDGE_TYPES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_JUDGE_TYPES_REF,
};
export const SSCS_CANCEL_HEARING: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_HEARING_CANCEL_REF,
};
export const ADDITIONAL_HEARING_FACILITIES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: ADDITIONAL_HEARING_FACILITIES_REF,
};

export const ALL_REF_DATA: RefDataByCategoryModel[] = [
  {
    categoryKey: 'HearingType',
    services: [SSCS_STAGES],
  },
  {
    categoryKey: 'Priority',
    services: [SSCS_PRIORITIES],
  },
  {
    categoryKey: 'PartyChannel',
    services: [SSCS_PARTY_CHANNEL],
  },
  {
    categoryKey: 'JudgeType',
    services: [SSCS_JUDGE_TYPES],
  },
  {
    categoryKey: 'CancelHearingReason',
    services: [SSCS_CANCEL_HEARING],
  },
  {
    categoryKey: 'FacilitiesList',
    services: [ADDITIONAL_HEARING_FACILITIES],
  },
];
