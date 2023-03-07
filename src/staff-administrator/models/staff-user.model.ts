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
  role?: StaffRole[] ;
  skills?: StaffSkill[];
  case_allocator: string;
  staff_admin: string;
  task_supervisor: string;
}

export interface StaffLocation {
  id?: string;
  is_primary: boolean;
  location?: string;
  location_id?: number;
}

export interface StaffRole {
  id: string;
  is_primary: boolean;
  role: string;
  role_id?: string;
}

export interface StaffSkill {
  description: string;
  skill_code: string;
  skill_id: number;
}
