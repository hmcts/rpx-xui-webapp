import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';

export class BookingUiPage extends Base {
  readonly container = this.page.locator('exui-booking-home');
  readonly heading = this.page.getByRole('heading', { level: 1, name: 'Work access' });
  readonly options = this.container.locator('.govuk-radios__item');
  readonly existingBookingPanel = this.container.locator('#conditional-booking-type-0');
  readonly existingBookingCards = this.existingBookingPanel.locator('.govuk-grid-column-one-third');
  readonly genericContinueButton = this.container.locator('form > button.govuk-button[type="button"]').first();
  readonly locationSearchTitle = this.container.getByText('Search for a location by name', { exact: true });

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/booking', { waitUntil: 'domcontentloaded' });
  }

  async selectOption(optionText: string): Promise<void> {
    await this.page.getByLabel(optionText, { exact: true }).check();
  }

  existingBookingCard(locationName: string): Locator {
    return this.existingBookingCards.filter({ hasText: locationName }).first();
  }

  existingBookingContinueButton(locationName: string): Locator {
    return this.existingBookingCard(locationName).locator('button.govuk-button').first();
  }
}
