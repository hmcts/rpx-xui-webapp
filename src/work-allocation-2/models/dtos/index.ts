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
  idamId: string;
  firstName: string;
  lastName: string;
  email: string;
  location: Location;
}

export interface JudicialWorker {
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

export interface CaseSearchParameter {
  ccdId?: string;
  eventId?: string;
  jurisdiction?: string[];
  location?: string[];
  postEventState?: string;
  preEventState?: string;
  state?: string[];
  user?: string[];
}

export interface CaseSearchParameters {
  parameters: CaseSearchParameter[];
}

export interface SearchCaseParameter {
  key: string;
  operator: string;
  values: string[];
}

export interface SearchCaseRequest {
  search_parameters: SearchCaseParameter[];
  sorting_parameters: SortParameter[];
  search_by?: string;
  pagination_parameters?: PaginationParameter;
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

export interface PaginationParameter {
  page_number: number;
  page_size: number;
}

export interface SearchTaskRequest {
  search_parameters: SearchTaskParameter[];
  sorting_parameters: SortParameter[];
  search_by?: string;
  pagination_parameters?: PaginationParameter;
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

export interface Person {
  id: string;
  name: string;
  email: string;
  domain: string;
}

export interface SearchOptions {
  searchTerm: string;
  jurisdiction: PersonRole;
}

export enum PersonRole {
  JUDICIAL = 'Judicial',
  CASEWORKER = 'Legal Ops',
  ADMIN = 'Admin',
  ALL = 'All',
}
