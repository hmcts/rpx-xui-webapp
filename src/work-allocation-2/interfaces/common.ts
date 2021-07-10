export interface Caseworker {
    firstName: string;
    lastName: string;
    idamId: string;
    email: string;
    location: Location;
}

export interface Location {
    id: string;
    locationName: string;
    services: string[];
}
