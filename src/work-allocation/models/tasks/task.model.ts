import { TaskAction } from '.';

export default interface Task {
  [key: string]: any;
  id: string;
  case_id: string;
  caseName: string;
  caseCategory: string;
  location: string;
  taskName: string;
  dueDate: Date;
  actions: TaskAction[];
}
