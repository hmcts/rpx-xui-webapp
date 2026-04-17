import { Page } from '@playwright/test';
import { Base } from '../../base';

export class BookingPage extends Base {
  readonly heading = this.page.getByRole('heading', { level: 1, name: 'Work access' });
  readonly existingBookingsRadio = this.page.getByRole('radio', { name: 'Choose an existing booking' });
  readonly createNewBookingRadio = this.page.getByRole('radio', { name: 'Create a new booking' });
  readonly viewTasksAndCasesRadio = this.page.getByRole('radio', { name: 'View tasks and cases' });
  readonly continueButton = this.page.locator('form > button.govuk-button[type="button"]').first();
  readonly existingBookingCards = this.page.locator('#conditional-booking-type-0 .govuk-grid-column-one-third');
  readonly locationHeading = this.page.getByRole('heading', { level: 1, name: 'Select a location' });
  readonly locationSearchInput = this.page.locator('#inputLocationSearch');
  readonly locationSearchOptions = this.page.getByRole('option');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('/booking', { waitUntil: 'domcontentloaded' });
    await this.heading.waitFor({ state: 'visible' });
  }

  getExistingBookingCard(locationName: string) {
    return this.existingBookingCards.filter({ hasText: locationName }).first();
  }

  getExistingBookingContinueButton(locationName: string) {
    return this.getExistingBookingCard(locationName).locator('button.govuk-button.govuk-button--secondary').first();
  }
}
