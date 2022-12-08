export interface StaffAddNewUser {
  email_id: string,
  first_name: string,
  last_name: string,
  services: {
    service: string,
    service_code: string
  }[],
  region: string,
  region_id: 1,
  roles: {
    role_id: string,
    role: string,
    is_primary: true
  }[],
  task_supervisor: boolean,
  case_allocator: boolean,
  staff_admin: boolean,
  suspended: boolean,
  // base_locations: this.prepareLocationPayload(),
  // user_type: this.userType,
  // skills: this.skillsPayload
};


