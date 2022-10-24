import { StaffDataUser } from '../models/staff-data-user.model';

export const STAFF_REF_USERS_LIST: StaffDataUser[] = [
  {
    id: 1,
    firstName: "Kevin",
    lastName: "Silver",
    userCategory: "",
    userType: "Officer1",
    jobTitle: "Case worker",
    locations: [
      "Location 1",
      "Location 2",
    ],
    region: "North East",
    services: [
      "Mock Service",
      "Mock Service",
    ],
    suspended: false,
    email: "kevin@hmcts.com",
    primaryLocation: "Leeds",
  },
  {
    id: 2,
    firstName: "Victoria",
    lastName: "Patton",
    userCategory: "",
    userType: "Officer2",
    jobTitle: "Solicitor",
    locations: [
      "Locatin Y",
    ],
    region: "London",
    services: [
      "Mock Service 2",
    ],
    suspended: true,
    email: "victoria@hmcts.com",
    primaryLocation: "London",
    roles: "Case allocator",
    skills: ["SCSS"],
  },
];
