import { StaffDataUser } from '../models/staff-data-user.model';

export const STAFF_REF_USERS_LIST: StaffDataUser[] = [
  {
    id: 1,
    firstName: "Kevin",
    lastName: "Silver",
    userCategory: "",
    userType: "Officer1",
    jobTitle: ["Case worker"],
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
    userType: "ctsc",
    jobTitle: ["legal-caseworker"],
    locations: [
      "location-x", "location-y",
    ],
    region: "region-1",
    services: [
      "family-public-law",
      "employment-tribunals",
    ],
    suspended: true,
    email: "victoria@hmcts.com",
    primaryLocation: "location-y",
    roles: ["staff-administrator"],
    skills: ["adoption-underwriter", "adoption-caseworker"],
  },
];
