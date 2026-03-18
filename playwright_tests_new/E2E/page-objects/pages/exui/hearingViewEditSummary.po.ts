import { expect, Locator, Page } from '@playwright/test';

export class HearingViewEditSummaryPage {
  constructor(private readonly page: Page) {}

  readonly container = this.page.locator('exui-hearing-view-edit-summary, exui-hearing-edit-summary').first();
  readonly heading = this.container.locator('h1').first();
  readonly submitUpdatedRequestButton = this.page.getByRole('button', { name: /submit updated request/i });
  readonly submitChangeRequestButton = this.page.getByRole('button', { name: /submit change request/i });
  readonly changeReasonHeading = this.page.getByRole('heading', { name: /provide a reason for changing this hearing/i });
  readonly changeReasonCheckboxes = this.page.locator('#hearing-option-container .govuk-checkboxes__input');
  readonly errorSummaryHeading = this.page.getByText('There is a problem', { exact: true }).first();

  sectionHeading(name: string): Locator {
    return this.container.locator('h2.govuk-heading-m').filter({ hasText: name }).first();
  }

  summaryRow(label: string): Locator {
    return this.container
      .locator('.govuk-summary-list__row')
      .filter({
        has: this.page.getByText(label, { exact: true }),
      })
      .first();
  }

  rowChangeButton(label: string): Locator {
    return this.summaryRow(label).getByRole('button', { name: /change/i });
  }

  rowValue(label: string): Locator {
    return this.summaryRow(label).locator('.govuk-summary-list__value').first();
  }

  rowTag(label: string, tag: string): Locator {
    return this.rowValue(label).getByText(tag, { exact: true });
  }

  sectionTag(name: string, tag: string): Locator {
    return this.sectionHeading(name).getByText(tag, { exact: true });
  }

  async waitForReady(): Promise<void> {
    await expect(this.container).toBeVisible();
    await expect(this.heading).toHaveText(/view( or edit)? hearing|edit hearing/i);
  }

  async waitForChangeReasonReady(): Promise<void> {
    await expect(this.changeReasonHeading).toBeVisible();
    await expect(this.changeReasonCheckboxes.first()).toBeVisible();
  }
}
