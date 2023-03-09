export interface StaffDataUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  userCategory?: string;
  userType?: string;
  jobTitle?: string[];
  locations: string[];
  region: string;
  services: string[];
  suspended: boolean;
  email?: string;
  primaryLocation?: BaseLocation;
  roles?: string[];
  skills?: string[];
  additionalLocations?: string[];
  role?: StaffRole[];
  primaryRole?: StaffRole;
}

export interface StaffDataAPI {
  id?: number;
  first_name: string;
  last_name: string;
  user_category: string;
  user_type: string;
  job_title: string[];
  locations: string[];
  region: string;
  services: string[];
  suspended: boolean;
  email_id: string;
  base_location?: BaseLocation[];
  roles?: string[];
  skills?: string[];
  work_area: WorkArea[];
  primaryLocation?: BaseLocation;
  additionalLocations?: string[]
}

export interface WorkArea {
  area_of_work: string;
  service: string;
}

export interface BaseLocation {
  location: string;
  is_primary: boolean;
}

export interface StaffRole {
  role: string;
  is_primary: boolean;
}
