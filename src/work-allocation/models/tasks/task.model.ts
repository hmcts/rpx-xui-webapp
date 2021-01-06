import { TaskAction } from '.';

export default interface Task {
  [key: string]: any;
  id: string;
  caseReference: string;
  caseName: string;
  caseCategory: string;
  location: string;
  alert?: boolean;
  taskName: string;
  dueDate: Date;
  actions: TaskAction[];
}
