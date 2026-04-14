import { Page } from '@playwright/test';
import { Base } from '../../base';

const BOOKING_UI_READY_TIMEOUT_MS = 15_000;

export class BookingUiPage extends Base {
  readonly container = this.page.locator('exui-booking-home');
  readonly options = this.container.locator('.govuk-radios__item');
  readonly existingBookings = this.container.locator('.govuk-grid-column-one-third');
  readonly heading = this.page.getByRole('heading', { level: 1, name: 'Work access' });
  readonly continueButton = this.container.locator('button.govuk-button[type="button"]').filter({ hasText: 'Continue' });

  constructor(page: Page) {
    super(page);
  }

  public async selectOption(optionText: string): Promise<void> {
    await this.page.getByLabel(optionText).check();
  }
}
