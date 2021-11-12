/* tslint:disable:object-literal-sort-keys */
import {RefDataByCategoryModel, RefDataByServiceModel, RefDataModel} from "../models/refData.model";

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

export const SSCS_STAGES: RefDataByServiceModel = {
  serviceID: 'SSCS',
  values: DEFAULT_STAGES_REF,
};

export const ALL_REF_DATA: RefDataByCategoryModel[] = [
  {
    categoryKey: 'HearingType',
    services: [SSCS_STAGES],
  },
];
