import CaseAction from './case-action.model';

export default interface Case {
  [key: string]: any;
  id: string;
  case_id: string;
  caseName: string;
  caseCategory: string;
  assignee?: string;
  roleName?: string;
  roleCategory?: string;
  location: string;
  location_id?: string;
  location_name?: string;
  taskName: string;
  dueDate: Date;
  actions: CaseAction[];
  derivedIcon?: string;
  isNew?: boolean;
}
