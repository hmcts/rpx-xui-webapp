import { StaffDataUser } from '../models/staff-data-user.model';

export const STAFF_REF_USERS_LIST: StaffDataUser[] = [
  {
    firstName: "Kevin",
    lastName: "Silver",
    userCategory: "",
    userType: "",
    jobTitle: "Job Title",
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
  },
  {
    firstName: "Victoria",
    lastName: "Patton",
    userCategory: "",
    userType: "",
    jobTitle: "Job Title",
    locations: [
      "Locatin Y",
    ],
    region: "London",
    services: [
      "Mock Service 2",
    ],
    suspended: false,
  },
];
