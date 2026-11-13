export const staffUserId = 'staff-jane-001';
export const secondStaffUserId = 'staff-jane-002';

export const staffUser = {
  case_worker_id: staffUserId,
  email_id: 'jane.smith@example.test',
  first_name: 'Jane',
  last_name: 'Smith',
  suspended: false,
  user_type: 'Legal operations',
  task_supervisor: false,
  case_allocator: true,
  staff_admin: false,
  idam_roles: [],
  up_idam_status: 'ACTIVE',
  roles: [{ role_id: 'role-1', role: 'Caseworker', is_primary: true }],
  skills: [],
  services: [{ service: 'Immigration and Asylum', service_code: 'IA' }],
  base_locations: [{ location_id: '1', location: 'Taylor House', is_primary: true, service_codes: ['IA'] }],
  region: 'London',
  region_id: 1,
};

export const secondStaffUser = {
  ...staffUser,
  case_worker_id: secondStaffUserId,
  first_name: 'Jane',
  last_name: 'Doe',
  email_id: 'jane.doe@example.test',
};

export const staffFilterOptions = {
  userTypes: [{ key: 'Legal operations', label: 'Legal operations' }],
  jobTitles: [
    { key: 'role-1', label: 'Caseworker' },
    { key: 'role-2', label: 'Senior caseworker' },
  ],
  skills: [],
  services: [
    { service_code: 'IA', service_description: 'Immigration and Asylum' },
    { service_code: 'FA', service_description: 'Family' },
  ],
  regions: [{ region_id: 1, description: 'London' }],
};

export function staffSearchResults(items: (typeof staffUser)[] = [staffUser]) {
  return { items, pageNumber: 1, pageSize: 15, totalItems: items.length };
}
