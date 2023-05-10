export interface StaffUser {
  email_id: string;
  first_name: string;
  last_name: string;
  suspended: boolean;
  user_type: string;
  jobTitle?: string[];
  task_supervisor: boolean;
  case_allocator: boolean;
  staff_admin: boolean;
  idam_roles: string[];
  up_idam_status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';

  roles: {
    role_id: string,
    role: string,
    is_primary: boolean,
    created_time?: Date,
    last_updated_time?: Date,
  }[];

  skills: {
    skill_id: number;
    description: string;
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
