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
  primaryLocation: string;
  roles: string[];
  skills?: string[];
}
