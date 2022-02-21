export interface LovRefDataModel {
  key: string;
  value_en: string;
  value_cy: string;
  hintText_EN: string;
  hintTextCY: string;
  order: number;
  parentKey: string;
  selected?: boolean;
  child_nodes?: LovRefDataModel[];
}

export interface LovRefDataByServiceModel {
  serviceID: string;
  values: LovRefDataModel[];
}

export interface LovRefDataByCategoryModel {
  categoryKey: string;
  services: LovRefDataByServiceModel[];
}
