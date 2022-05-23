import {CategoryType} from './hearings.enum';

export interface CaseCategoryModel {
  categoryType: CategoryType;
  categoryValue: string;
  categoryParent?: string;
}
