import { faker } from '@faker-js/faker';

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
