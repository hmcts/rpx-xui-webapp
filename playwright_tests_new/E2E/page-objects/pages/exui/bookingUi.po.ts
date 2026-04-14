import { Page } from '@playwright/test';
import { Base } from '../../base';

const BOOKING_UI_READY_TIMEOUT_MS = 15_000;

export class BookingUiPage extends Base {
  readonly container = this.page.locator('exui-booking-home');
  readonly heading = this.page.getByRole('heading', { level: 1, name: 'Work access' });
  readonly chooseExistingBookingRadio = this.page.getByLabel('Choose an existing booking');
  readonly createNewBookingRadio = this.page.getByLabel('Create a new booking');
  readonly viewTasksAndCasesRadio = this.page.getByLabel('View tasks and cases');
  readonly continueButton = this.container.locator('button.govuk-button[type="button"]').filter({ hasText: 'Continue' });

  constructor(page: Page) {
    super(page);
  }

  public async goto(): Promise<void> {
    await this.page.goto('/booking', { waitUntil: 'domcontentloaded' });
    await this.waitForReady();
  }

  public async waitForReady(): Promise<void> {
    await this.page.waitForURL(/\/booking$/, { timeout: BOOKING_UI_READY_TIMEOUT_MS });
    await this.container.waitFor({ state: 'visible', timeout: BOOKING_UI_READY_TIMEOUT_MS });
    await this.heading.waitFor({ state: 'visible', timeout: BOOKING_UI_READY_TIMEOUT_MS });
  }

  public async selectChooseExistingBooking(): Promise<void> {
    await this.chooseExistingBookingRadio.check();
  }

  public async selectCreateNewBooking(): Promise<void> {
    await this.createNewBookingRadio.check();
  }

  public async selectViewTasksAndCases(): Promise<void> {
    await this.viewTasksAndCasesRadio.check();
  }
}
