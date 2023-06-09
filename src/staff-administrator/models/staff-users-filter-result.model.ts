export interface StaffUsersFilterResult {
  email_id: string;
  first_name: string;
  last_name: string;
  suspended: boolean;
  user_type: string;
  userCategory: string;

  task_supervisor: boolean;
  case_allocator: boolean;
  staff_admin: boolean;

  roles: {
    role_id: number,
    role: string,
    is_primary: boolean,
    created_time?: Date,
    last_updated_time?: Date,
  }[];

  skills: {
    skill_id: number;
    description: string;
    skill_code: string
  }[];

  services: {
    service: string;
    service_code: string;
  }[];

  base_locations: {
    created_time?: Date,
    last_updated_time?: Date,
    location_id: number,
    location: string,
    is_primary: boolean
  }[];

  region: string;
  region_id: number;
}
