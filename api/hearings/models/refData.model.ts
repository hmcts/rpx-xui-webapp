export interface RefDataModel {
  key: string;
  value_en: string;
  value_cy: string;
  hintText_EN: string;
  hintTextCY: string;
  order: number;
  parentKey: string;
}

export interface RefDataByServiceModel {
  serviceID: string;
  values: RefDataModel[];
}

export interface RefDataByCategoryModel {
  categoryKey: string;
  services: RefDataByServiceModel[];
}
