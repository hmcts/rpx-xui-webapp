export interface Person {
    id: string;
    name: string;
    email: string;
    domain: string;
}
export interface SearchOptions {
    searchTerm: string;
    jurisdiction: string;
}

export enum PersonDomain {
    JUDICIAL = 'Judicial',
    CASEWORKER = 'Legal Ops',
    ADMIN = 'Admin',
    ALL = 'All',
}
