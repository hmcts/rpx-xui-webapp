export interface StaffUser {
  id?: string;
  first_name: string;
  last_name: string;
  userCategory: string;
  user_type: string;
  jobTitle: string;
  locations: string[];
  region: string;
  // TODO: Was previously a string array - needs to be list of objects in some instances
  // but ideally need to separate any string list usages to different field
  services?: any[];
  suspended: boolean;
  email: string;
  additionalLocations?: string[];
  primaryLocation?: StaffLocation;
  primaryRole?: any;
  roles: string[];
  skills?: string[];
  case_allocator?: boolean;
  task_supervisor?: boolean;
  staff_admin?: boolean;
  work_area?: any;
  role?: any;
  base_locations?: any;
  base_location?: any;
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

export interface WorkArea {
  service_code: string;
  area_of_work: string;
}

export interface ServiceInformation {
  service: string;
  service_code: string;
}
