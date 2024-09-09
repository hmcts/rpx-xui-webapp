import { Page, expect } from '@playwright/test';

export class CaseView {
  private page: Page;
  private nextStep = '#next-step';

  constructor(page: Page) {
    this.page = page;
  }

  async clickNextStep(event: string) {
    await this.page.waitForSelector(this.nextStep);
    await this.page.selectOption(this.nextStep, { label: event });
    await this.page.click("button[type='submit']");
  }
}
