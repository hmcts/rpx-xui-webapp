export interface CaseList {
  cases: Case[];
}

export interface Case {
  id: string;
  type: string;
  task_state: string;
  task_system: string;
  security_classification: string;
  task_title: string;
  created_date: string;
  due_date: string;
  location_name: string;
  location: string;
  jurisdiction: string;
  region: string;
  case_type_id: string;
  case_id: string;
  case_category: string;
  case_name: string;
  auto_assigned: boolean;
  actions: CaseAction[];
  execution_type: string;
  assignee: string;
  dueDate: string;
  taskName: string;
  caseName: string;
  caseCategory: string;
  assigneeName: string;
  name: string;
}

export interface CaseAction {
  id: string;
  title: string;
}

export interface Assignee {
  id: string;
  userName: string;
}

export interface CaseData {
  category: string;
  location: LocationSummary;
  name: string;
  reference: string;
}

export interface LocationSummary {
  id: string;
  locationName: string;
}

export interface Location {
  id: string;
  locationName: string;
  services: string[];
}

export interface LocationApi {
  location_id: string;
  location: string;
  is_primary: boolean;
  services: string[];
}

export interface Caseworker {
  firstName: string;
  lastName: string;
  idamId: string;
  email: string;
  location: Location;
}

export interface CaseworkerApi {
  first_name: string;
  last_name: string;
  id: string;
  email_id: string;
  base_location: LocationApi[];
}
