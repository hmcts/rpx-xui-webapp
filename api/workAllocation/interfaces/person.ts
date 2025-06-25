export interface Person {
  id: string;
  name: string;
  email: string;
  domain: PersonRole;
  knownAs?: string;
  personalCode?: string;
}

export interface SearchOptions {
  searchTerm: string;
  jurisdiction: string;
}

export enum PersonRole {
  JUDICIAL = 'Judicial',
  CASEWORKER = 'Legal Ops',
  ADMIN = 'Admin',
  CTSC = 'CTSC',
  ALL = 'All',
}
