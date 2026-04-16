import { faker } from '@faker-js/faker';
import { buildHearingsUserDetailsMock } from './hearings.mock';

const DAY_MS = 24 * 60 * 60 * 1000;

export interface BookingUiMock {
  id: string;
  userId: string;
  regionId: string;
  locationId: string;
  created: string;
  beginTime: string;
  endTime: string;
  locationName: string;
}

export function buildBookingUserDetailsMock({
  userId,
  roles = ['caseworker-ia-iacjudge', 'caseworker-ia', 'caseworker', 'fee-paid-judge'],
  bookable = true,
}: {
  userId: string;
  roles?: string[];
  bookable?: boolean;
}) {
  const userDetails = buildHearingsUserDetailsMock(roles);

  userDetails.userInfo.id = userId;
  userDetails.userInfo.uid = userId;
  userDetails.userInfo.roleCategory = 'JUDICIAL';
  userDetails.roleAssignmentInfo = [
    {
      jurisdiction: 'IA',
      roleType: 'ORGANISATION',
      roleCategory: 'JUDICIAL',
      roleName: 'fee-paid-judge',
      substantive: 'Y',
      baseLocation: '765324',
      primaryLocation: '765324',
      bookable,
    },
  ];

  return userDetails;
}

export function buildExistingBookingsMock(userId: string, referenceDate: Date = new Date()): BookingUiMock[] {
  const now = referenceDate.getTime();
  const activeBegin = new Date(now - 2 * DAY_MS).toISOString();
  const activeEnd = new Date(now + 7 * DAY_MS).toISOString();
  const futureBegin = new Date(now + 30 * DAY_MS).toISOString();
  const futureEnd = new Date(now + 60 * DAY_MS).toISOString();

  return [
    {
      id: faker.string.uuid(),
      userId,
      regionId: '1',
      locationId: '20262',
      created: faker.date.recent({ days: 5, refDate: referenceDate }).toISOString(),
      beginTime: futureBegin,
      endTime: futureEnd,
      locationName: 'Central London County Court',
    },
    {
      id: faker.string.uuid(),
      userId,
      regionId: '1',
      locationId: '784131',
      created: faker.date.recent({ days: 5, refDate: referenceDate }).toISOString(),
      beginTime: activeBegin,
      endTime: activeEnd,
      locationName: "Bromley Magistrates' Court",
    },
  ];
}
