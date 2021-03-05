export interface Assignee {
  userId: string;
  userName?: string;
}

export interface CaseData {
  category: string;
  location: LocationSummary;
  name: string;
  reference: string;
}

export interface Caseworker {
  id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  base_location: Location[];
}

export interface LocationSummary {
  location_id: string;
  location: string;
}

export interface Location extends LocationSummary {
  services: string[];
  is_primary?: boolean;
}

export interface SearchTaskParameter {
  key: string;
  operator: string;
  values: string[];
}
export interface SortParameter {
  sort_by: string;
  sort_order: string;
}

export interface SearchTaskRequest {
  search_parameters: SearchTaskParameter[];
  sorting_parameters: SortParameter[];
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
