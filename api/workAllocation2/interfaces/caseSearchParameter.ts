export interface CaseSearchParameters {
  parameters: CaseSearchParameter[];
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

export interface SearchCaseParameter {
  key: string;
  operator: string;
  values: string[];
}

export interface SearchCaseRequest {
  search_parameters: SearchCaseParameter[];
}
