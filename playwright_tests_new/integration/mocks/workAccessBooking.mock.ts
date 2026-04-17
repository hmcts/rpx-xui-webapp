import nodeAppDataModels from '../../api/data/nodeAppDataModels';

type RoleAssignmentInfo = Record<string, unknown>;

export type WorkAccessBooking = {
  appointmentId: string;
  locationId: string;
  locationName: string;
  beginTime: string;
  endTime: string;
};

export type WorkAccessLocation = {
  court_name: string;
  court_type: string;
  court_type_id: string;
  court_venue_id: string;
  epimms_id: string;
  region: string;
  region_id: string;
  site_name: string;
};

export function buildRelativeIsoDate(daysFromNow: number): string {
  const timestamp = new Date();
  timestamp.setUTCDate(timestamp.getUTCDate() + daysFromNow);
  timestamp.setUTCHours(9, 0, 0, 0);
  return timestamp.toISOString();
}

export function buildWorkAccessBooking(overrides: Partial<WorkAccessBooking> = {}): WorkAccessBooking {
  return {
    appointmentId: overrides.appointmentId ?? '1001',
    locationId: overrides.locationId ?? '100001',
    locationName: overrides.locationName ?? 'Test location 1',
    beginTime: overrides.beginTime ?? buildRelativeIsoDate(1),
    endTime: overrides.endTime ?? buildRelativeIsoDate(3),
  };
}

export function buildWorkAccessLocation(overrides: Partial<WorkAccessLocation> = {}): WorkAccessLocation {
  return {
    court_name: overrides.court_name ?? overrides.site_name ?? 'Taylor House',
    court_type: overrides.court_type ?? 'Tribunal',
    court_type_id: overrides.court_type_id ?? '31',
    court_venue_id: overrides.court_venue_id ?? overrides.epimms_id ?? '100001',
    epimms_id: overrides.epimms_id ?? '100001',
    region: overrides.region ?? 'London',
    region_id: overrides.region_id ?? '1',
    site_name: overrides.site_name ?? 'Taylor House',
  };
}

export function buildWorkAccessUserDetails(
  options: {
    roles?: string[];
    roleCategory?: string;
    roleAssignments?: RoleAssignmentInfo[];
    userId?: string;
  } = {}
) {
  const userDetails = nodeAppDataModels.getUserDetails_oauth();

  userDetails.userInfo.id = options.userId ?? String(userDetails.userInfo.id);
  userDetails.userInfo.uid = options.userId ?? String(userDetails.userInfo.id);
  userDetails.userInfo.roleCategory = options.roleCategory ?? 'JUDICIAL';
  userDetails.userInfo.roles = options.roles ?? ['caseworker', 'caseworker-ia', 'caseworker-ia-iacjudge', 'fee-paid-judge'];
  userDetails.roleAssignmentInfo = options.roleAssignments ?? [
    {
      jurisdiction: 'IA',
      roleType: 'ORGANISATION',
      roleCategory: 'JUDICIAL',
      roleName: 'fee-paid-judge',
      substantive: 'N',
      isCaseAllocator: true,
      bookable: 'true',
      contractType: 'Fee-Paid',
    },
  ];

  return userDetails;
}

export const defaultWorkAccessLocations = [
  buildWorkAccessLocation({ epimms_id: '100001', court_venue_id: '100001', site_name: 'Test location 1' }),
  buildWorkAccessLocation({ epimms_id: '100002', court_venue_id: '100002', site_name: 'Test location 2' }),
  buildWorkAccessLocation({ epimms_id: '100003', court_venue_id: '100003', site_name: 'Test location 3' }),
];

export const defaultWorkAccessBookings = [
  buildWorkAccessBooking({
    appointmentId: '1001',
    locationId: '100001',
    locationName: 'Test location 1',
    beginTime: buildRelativeIsoDate(-1),
    endTime: buildRelativeIsoDate(1),
  }),
  buildWorkAccessBooking({
    appointmentId: '1002',
    locationId: '100002',
    locationName: 'Test location 2',
    beginTime: buildRelativeIsoDate(2),
    endTime: buildRelativeIsoDate(4),
  }),
  buildWorkAccessBooking({
    appointmentId: '1003',
    locationId: '100003',
    locationName: 'Test location 3',
    beginTime: buildRelativeIsoDate(4),
    endTime: buildRelativeIsoDate(8),
  }),
];
