import { expect, Locator, Page } from '@playwright/test';
import { HearingJourneyModel } from '../../../utils/hearing-model.ts';

type HearingAction = 'view-details' | 'view-or-edit' | 'cancel' | 'add-or-edit';

export class HearingsTabPage {
  constructor(private readonly page: Page) {}

  readonly container = this.page.locator('exui-case-hearings-ce');
  readonly emptyState = this.page.getByText('No current and upcoming hearings found', { exact: false });
  readonly reloadButton = this.page.locator('#reload-hearing-tab');
  readonly requestHearingButton = this.page.getByRole('button', { name: /request a hearing/i });
  readonly additionalSecurityYes = this.page.locator('#addition-security-confirmation #additionalSecurityYes');
  readonly additionalSecurityNo = this.page.locator('#addition-security-confirmation #additionalSecurityNo');

  sectionHeading(name: string): Locator {
    return this.page.locator('exui-case-hearings-list th.govuk-body-lead').filter({ hasText: name });
  }

  currentAndUpcomingHeading(name: string): Locator {
    return this.sectionHeading(name);
  }

  pastOrCancelledHeading(name = 'Past or cancelled'): Locator {
    return this.sectionHeading(name);
  }

  linkHearingButton(hearingId: string): Locator {
    return this.page.locator(`#link-hearing-link-${hearingId}`);
  }

  viewOrEditButton(hearingId: string): Locator {
    return this.page.locator(`#link-view-or-edit-${hearingId}`);
  }

  viewDetailsButton(hearingId: string): Locator {
    return this.page.locator(`#link-view-details-${hearingId}`);
  }

  cancelButton(hearingId: string): Locator {
    return this.page.locator(`#link-cancel-${hearingId}`);
  }

  addOrEditButton(hearingId: string): Locator {
    return this.page.locator(`#link-add-or-edit-${hearingId}`);
  }

  actionButton(hearingId: string, action: HearingAction): Locator {
    switch (action) {
      case 'view-or-edit':
        return this.viewOrEditButton(hearingId);
      case 'cancel':
        return this.cancelButton(hearingId);
      case 'add-or-edit':
        return this.addOrEditButton(hearingId);
      case 'view-details':
      default:
        return this.viewDetailsButton(hearingId);
    }
  }

  hearingRow(hearingId: string, action: HearingAction = 'view-details'): Locator {
    return this.page
      .locator('tr.govuk-table__row')
      .filter({ has: this.actionButton(hearingId, action) })
      .first();
  }

  async waitForReady(hearingId?: string, action: HearingAction = 'view-details'): Promise<void> {
    await expect(this.container).toBeVisible();
    await expect(this.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();

    if (!hearingId) {
      return;
    }

    const actionButton = this.actionButton(hearingId, action);
    try {
      await expect(actionButton).toBeVisible({ timeout: 20_000 });
    } catch (error) {
      if (await this.emptyState.isVisible()) {
        throw new Error('Hearings tab rendered empty state instead of the expected LISTED hearing row.');
      }

      if (await this.reloadButton.isVisible()) {
        throw new Error('Hearings tab rendered the reload state instead of the expected LISTED hearing row.');
      }

      throw error;
    }
  }

  async openViewDetails(hearingId: string): Promise<void> {
    await this.viewDetailsButton(hearingId).click();
  }

  async openLinkHearing(hearingId: string): Promise<void> {
    await this.linkHearingButton(hearingId).click();
  }

  async openRequestHearing(): Promise<void> {
    await this.requestHearingButton.click();
  }

  async openViewOrEdit(hearingId: string): Promise<void> {
    await this.viewOrEditButton(hearingId).click();
  }

  async additionalSecurity(model: HearingJourneyModel, page: Page): Promise<void> {
    const value = model.get('hearingFacilities', 'additionalSecurity');
    console.log('~~~~~~~~~~~SET VALUE for hearingFacilities ===', value);

    if (value === 'Yes') {
      await this.additionalSecurityYes.click();
    } else {
      await this.additionalSecurityNo.click();
    }
    const getValue = model.get('hearingFacilities', 'additionalSecurity');
    console.log('~~~~~~~~~~~GET VALUE for hearingFacilities ===', getValue);
  }
}
