import { CategoryType } from './hearings.enum';

// Used to define the case category data structure returned from the API, and used in the summary page
export interface CaseCategoryModel {
  categoryType: CategoryType;
  categoryValue: string;
  categoryParent?: string;
}

// Used to define the case category data structure used in the summary page
export interface CaseCategoryDisplayModel extends CaseCategoryModel {
  categoryDisplayValue: string;
  childNodes?: CaseCategoryDisplayModel[];
}
