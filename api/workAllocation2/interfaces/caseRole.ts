export interface CaseRole {
  name: string;
  role: string;
  location: string;
  start: string;
  end: string;
  id: string;
  actions: Action[];
}

export interface Action {
  id: string;
  title: string;
}
