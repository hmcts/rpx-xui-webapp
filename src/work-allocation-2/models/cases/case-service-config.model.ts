import { CaseFieldConfig } from '.';
import { CaseService, SortOrder } from './../../enums';

export default interface CaseServiceConfig {
  service: CaseService;
  defaultSortDirection: SortOrder;
  defaultSortFieldName: string;
  fields: CaseFieldConfig[];
}
