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

export interface ISessionStorageService {
  getItem(key: string, removeAfterRead?: boolean): string;
  setItem(key: string, value: string): void;
}
