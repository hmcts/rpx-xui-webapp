/* tslint:disable:object-literal-sort-keys */
import { RefDataByCategoryModel, RefDataByServiceModel, RefDataModel } from '../models/refData.model';

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

export const SSCS_STAGES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_STAGES_REF,
};

export const SSCS_PRIORITIES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_PRIORITIES_REF,
};

export const SSCS_JUDGE_TYPES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_JUDGE_TYPES_REF,
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
    categoryKey: 'JudgeType',
    services: [SSCS_JUDGE_TYPES],
  },
];
