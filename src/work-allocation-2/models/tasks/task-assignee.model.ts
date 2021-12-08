import { TaskPermission } from './task-permission.model';

export interface TaskAssigneeModel {
  id: string;
  assignee: string;
  task_title: string;
  dueDate: string;
  location_name: string;
  case_id: string;
  case_category: string;
  case_name: string;
  permissions: TaskPermission[];
}
