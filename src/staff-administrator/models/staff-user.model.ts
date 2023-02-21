export interface StaffUser {
  id?: string;
  firstName: string;
  lastName: string;
  userCategory: string;
  userType: string;
  jobTitle: string;
  locations: string[];
  region: string;
  services: string[];
  suspended: boolean;
  email: string;
  additionalLocations?: string[];
  primaryLocation?: StaffLocation;
  primaryRole?: any;
  roles: string[];
  skills?: string[];
}

export interface StaffLocation {
  id: string;
  is_primary: boolean;
  location?: string;
}

export interface StaffRole {
  id: string;
  is_primary: boolean;
  role: string;
}
