import { TaskFieldConfig } from '.';
import { TaskService, TaskSort } from './../../enums';

export default interface TaskServiceConfig {
  service: TaskService,
  defaultSortDirection: TaskSort,
  defaultSortFieldName: string,
  fields: TaskFieldConfig[]
};