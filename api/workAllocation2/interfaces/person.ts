export interface Person {
    id: string;
    name: string;
    email: string;
    domain: PersonRole;
}
export interface SearchOptions {
    searchTerm: string;
    jurisdiction: string;
}

export enum PersonRole {
    JUDICIAL = 'Judicial',
    CASEWORKER = 'Legal Ops',
    ADMIN = 'Admin',
    ALL = 'All',
}
