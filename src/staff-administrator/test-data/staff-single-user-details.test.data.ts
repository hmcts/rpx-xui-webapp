import { StaffUser } from '../models/staff-user.model';

export const staffSingleUserDetailsTestData: StaffUser = {
  email_id: 'email@test.hmcts',
  first_name: 'Kevin',
  last_name: 'Silver',
  suspended: false,
  user_type: 'userType',
  task_supervisor: true,
  case_allocator: true,
  staff_admin: false,
  roles: [
    {
      role_id: 1,
      role: 'Role',
      is_primary: true,
    }
  ],
  skills: [
    {
      skill_id: 1,
      description: 'SKILLDESCRIPTION',
      skill_code: 'SKILLCODE',
    }
  ],
  services: [
    {
      service: 'service',
      service_code: 'SERVICE_CODE'
    }
  ],
  base_locations: [
    {
      location_id: 333,
      location: 'Location',
      is_primary: true
    }
  ],
  region: 'West Midlands',
  region_id: 12,

  initFromGenericFilter() {}
};
