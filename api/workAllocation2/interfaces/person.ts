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
    JUDICIAL = 1,
    CASEWORKER = 2,
    BOTH = 3,
}
