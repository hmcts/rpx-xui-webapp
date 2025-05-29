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

// This enum only used for node layer and should match PersonRole in common-lib
export enum PersonRole {
  JUDICIAL = 'Judicial',
  CASEWORKER = 'Legal Ops',
  ADMIN = 'Admin',
  CTSC = 'CTSC',
  ALL = 'All',
}
