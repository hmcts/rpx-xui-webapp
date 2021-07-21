import { FieldConfig } from '../common';
import { SortOrder, TaskService } from './../../enums';

export default interface TaskServiceConfig {
  service: TaskService;
  defaultSortDirection: SortOrder;
  defaultSortFieldName: string;
  fields: FieldConfig[];
}
