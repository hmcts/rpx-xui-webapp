import nodeAppDataModels from '../../api/data/nodeAppDataModels';

export type WorkFilterRoleAssignment = {
  jurisdiction: string;
  substantive?: string;
  roleType: 'ORGANISATION' | 'CASE';
  baseLocation?: string;
  region?: string;
  bookable?: boolean | string;
  isCaseAllocator?: boolean;
};

export type WorkFilterLocation = {
  court_name?: string;
  court_type?: string;
  court_type_id?: string;
  court_venue_id?: string;
  epimms_id: string;
  region?: string;
  region_id?: string;
  site_name: string;
};

export type WorkFilterLocationSearchScenario = {
  name: string;
  roleAssignments: WorkFilterRoleAssignment[];
};

export const workFilterSupportedJurisdictions = ['IA', 'SSCS', 'CIVIL'];

export const workFilterSupportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'SSCS', serviceName: 'Social Security and Child Support' },
  { serviceId: 'CIVIL', serviceName: 'Civil' },
];

export function buildWorkFiltersUserDetails(roleAssignments: WorkFilterRoleAssignment[], userId = 'work-filter-user') {
  const userDetails = nodeAppDataModels.getUserDetails_oauth();

  userDetails.userInfo.id = userId;
  userDetails.userInfo.uid = userId;
  userDetails.userInfo.roles = ['caseworker', 'caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer'];
  userDetails.userInfo.roleCategory = 'LEGAL_OPERATIONS';
  userDetails.roleAssignmentInfo = roleAssignments;

  return userDetails;
}

export function buildWorkFilterLocation(epimmsId: string, siteName: string): WorkFilterLocation {
  return {
    court_name: siteName,
    court_type: 'Tribunal',
    court_type_id: '31',
    court_venue_id: epimmsId,
    epimms_id: epimmsId,
    region: 'London',
    region_id: '1',
    site_name: siteName,
  };
}

export function buildWorkFilterLocationSearchResults(serviceIds: string, count: number): WorkFilterLocation[] {
  return Array.from({ length: count }, (_, index) =>
    buildWorkFilterLocation(String(700000 + index), `${serviceIds} Court ${index + 1}`)
  );
}

export const defaultWorkFilterLocationsById = [
  buildWorkFilterLocation('20001', 'IA Court Centre 1'),
  buildWorkFilterLocation('30001', 'SSCS Hearing Centre 1'),
];

export const workFilterLocationSearchScenarios: WorkFilterLocationSearchScenario[] = [
  {
    name: 'organisation roles across IA and SSCS',
    roleAssignments: [
      { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION' },
      { jurisdiction: 'SSCS', substantive: 'Y', roleType: 'ORGANISATION' },
    ],
  },
  {
    name: 'case role for IA and organisation role for SSCS',
    roleAssignments: [
      { jurisdiction: 'IA', substantive: 'Y', roleType: 'CASE' },
      { jurisdiction: 'SSCS', substantive: 'Y', roleType: 'ORGANISATION' },
    ],
  },
  {
    name: 'organisation role for IA and case role for SSCS',
    roleAssignments: [
      { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION' },
      { jurisdiction: 'SSCS', substantive: 'Y', roleType: 'CASE' },
    ],
  },
];
