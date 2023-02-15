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
  email_id: string;
  primary_location: string;
  roles?: any;
  skills?: string[];
  case_allocator?: boolean;
  task_supervisor?: boolean;
  staff_admin?: boolean;
  work_area?: any;
  role?: any;
  base_locations?: any;
  base_location?: any;
}
