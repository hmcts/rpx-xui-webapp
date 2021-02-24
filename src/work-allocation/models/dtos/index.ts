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

export interface Caseworker {
  idamId: string;
  firstName: string;
  lastName: string;
  email: string;
  location: Location;
}

export interface LocationSummary {
  id: string;
  locationName: string;
}

export interface Location extends LocationSummary {
  services: string[];
}

export interface SearchTaskParameter {
  key: string;
  operator: string;
  values: string[];
}
export interface SearchTaskRequest {
  search_parameters: SearchTaskParameter[];
}

export interface Task {
  assignee: Assignee;
  caseData: CaseData;
  dueDate: Date;
  name: string;
  state: string;
}

export interface TaskList {
  tasks: Task[];
}

export interface TaskSearchParameter {
  ccdId?: string;
  eventId?: string;
  jurisdiction?: string[];
  location?: string[];
  postEventState?: string;
  preEventState?: string;
  state?: string[];
  user?: string[];
}

export interface TaskSearchParameters {
  parameters: TaskSearchParameter[];
}
