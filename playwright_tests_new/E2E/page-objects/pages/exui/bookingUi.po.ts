import { Page } from '@playwright/test';
import { Base } from '../../base';

export type CreateBookingRequest = {
  userId: string;
  locationId: string;
  regionId: string;
  beginDate: string;
  endDate: string;
};

export type CreateBookingResponse = {
  bookingResponse: {
    id: string;
    userId: string;
    regionId: string;
    locationId: string;
    created: string;
    beginTime: string;
    endTime: string;
    log: string;
  };
};

export type BookingDayRange = {
  beginDate: string;
  endDate: string;
};

export const getUtcDayRangeForLocalDate = (beginDate: Date, endDate: Date): BookingDayRange => {
  return {
    beginDate: new Date(Date.UTC(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate(), 0, 0, 0, 0)).toISOString(),
    endDate: new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999)).toISOString(),
  };
};

export const normalizeCreateBookingDates = (beginDate: Date, endDate: Date): BookingDayRange => {
  let normalizedBeginDate = beginDate;
  let normalizedEndDate = endDate;

  if (normalizedBeginDate.getHours() !== normalizedBeginDate.getUTCHours()) {
    normalizedBeginDate = new Date(
      Date.UTC(
        normalizedBeginDate.getFullYear(),
        normalizedBeginDate.getMonth(),
        normalizedBeginDate.getDate(),
        0,
        0,
        0,
        0
      )
    );
  }

  if (normalizedEndDate.getHours() !== normalizedEndDate.getUTCHours()) {
    normalizedEndDate = new Date(
      Date.UTC(
        normalizedEndDate.getFullYear(),
        normalizedEndDate.getMonth(),
        normalizedEndDate.getDate(),
        23,
        59,
        59,
        999
      )
    );
  }

  return {
    beginDate: normalizedBeginDate.toISOString(),
    endDate: normalizedEndDate.toISOString(),
  };
};

export const getExpectedTodayOnlyCreateBookingRange = (beginDate: Date): BookingDayRange => {
  const endDate = new Date(beginDate);
  endDate.setHours(23, 59, 59, 999);
  return normalizeCreateBookingDates(beginDate, endDate);
};

type SummaryPair = { key: string; value: string };

export class BookingUiPage extends Base {
  readonly container = this.page.locator('#content');
  readonly options = this.container.locator('.govuk-radios__item');
  readonly existingBookings = this.container.locator('.govuk-grid-column-one-third');
  readonly heading = this.page.getByRole('heading', { level: 1, name: 'Work access' });
  readonly button = this.container.locator('button.govuk-button');
  readonly continueButton = this.button.filter({ hasText: 'Continue' });
  readonly bookingButton = this.button.filter({ hasText: 'Confirm Booking' });
  readonly bookingDateRadio = this.container.locator('.govuk-radios__label');

  readonly locationSearch = this.page.locator('#inputLocationSearch');
  readonly locationAutocomplete = this.page.locator('#mat-autocomplete-0');
  readonly locationAutocompleteOptions = this.locationAutocomplete.locator('mat-option');

  readonly bookingSummaryLine = this.page.locator('.govuk-summary-list');

  constructor(page: Page) {
    super(page);
  }

  public async goto(): Promise<void> {
    await this.page.goto('/booking', { waitUntil: 'domcontentloaded' });
  }

  public async selectOption(optionText: string): Promise<void> {
    await this.page.getByLabel(optionText).check();
  }

  public async selectFirstLocationFromSearch(searchText: string): Promise<void> {
    await this.locationSearch.fill(searchText);
    await this.locationAutocomplete.waitFor({ state: 'visible' });
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  public async getSummaryListPairs(): Promise<SummaryPair[]> {
    const rows = this.page.locator('.govuk-summary-list__row');
    const count = await rows.count();
    const pairs: SummaryPair[] = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const key = (await row.locator('.govuk-summary-list__key').innerText()).trim();
      const value = (await row.locator('.govuk-summary-list__value').innerText()).trim();

      pairs.push({ key, value });
    }

    return pairs;
  }
}
