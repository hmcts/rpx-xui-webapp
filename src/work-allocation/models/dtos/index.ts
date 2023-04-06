import { RoleCategory } from '../../../role-access/models';

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
  roleCategory: RoleCategory;
}

export interface CaseworkersByService {
  service: string;
  caseworkers: Caseworker[];
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
  regionId?: string;
}

export interface Location extends LocationSummary {
  services: string[];
}

export interface LocationByEPIMMSModel {
  epimms_id: string;
  site_name: string;
  court_name?: string;
  open_for_public?: string;
  region_id: string;
  region: string;
  cluster_id?: string;
  cluster_name?: string;
  court_status?: string;
  court_open_date?: string;
  closed_date?: string;
  postcode: string;
  court_address: string;
  phone_number?: string;
  court_location_code?: string;
  dx_address?: string;
  welsh_site_name?: string;
  welsh_court_address?: string;
  venue_name?: string;
  is_case_management_location: string;
  is_hearing_location: string;
}

export interface LocationsByService {
  service?: string;
  serviceCode?: string;
  regions?: string[];
  locations: Location[];
  // switch to mark whether we should get all locations for this service
  getAllLocations?: boolean;
  bookable?: boolean;
}

// different to above - groups locations by region for location filter logic
export interface LocationsByRegion {
  regionId: string;
  locations: string[];
}

// need to store from API, rather than local
export interface Region {
  region_id: string;
  description: string;
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
  values: string[] | string;
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
  values?: any;
  value?: any;
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
  request_context?: string;
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

export interface TaskNamesResponse {
  taskName: string;
  taskId: number;
}
