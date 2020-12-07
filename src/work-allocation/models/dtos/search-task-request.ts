export interface SearchTaskParameter {
  key: string;
  operator: string;
  values: string[];
}
export interface SearchTaskRequest {
  search_parameters: SearchTaskParameter[];
}
