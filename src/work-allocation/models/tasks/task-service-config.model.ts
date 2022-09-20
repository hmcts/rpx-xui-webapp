import { SortOrder, TaskService } from '../../enums';
import { FieldConfig } from '../common';

export default interface TaskServiceConfig {
  service: TaskService;
  defaultSortDirection: SortOrder;
  defaultSortFieldName: string;
  fields: FieldConfig[];
}
