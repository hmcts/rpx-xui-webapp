/* eslint-disable semi */
import { TaskAction } from '.';

export default interface Task {
  assignee: string;
  assigneeName: string;
  [key: string]: any;
  id: string;
  case_id: string;
  caseName: string;
  caseCategory: string;
  location: string;
  description: string;
  taskName: string;
  dueDate: Date;
  actions: TaskAction[];
  warnings?: boolean;
  derivedIcon?: string;
  jurisdiction?: string;
  isNew?: boolean;
  major_priority?: number;
}

export interface TaskResponse {
  tasks: Task[];
  total_records: number;
}
