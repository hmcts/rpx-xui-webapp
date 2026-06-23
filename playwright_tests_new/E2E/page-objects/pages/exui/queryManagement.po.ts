import { expect, type Page } from '@playwright/test';
import { Base } from '../../base';

export class QueryManagementPage extends Base {
  readonly container = this.page.locator('exui-query-management-container');
  readonly content = this.container.locator('main#content');
  readonly qualifyingQuestionOptions = this.content.locator('ccd-qualifying-question-options');
  readonly raiseQueryForm = this.content.locator('ccd-query-write-raise-query');
  readonly reviewQueryDetails = this.content.locator('ccd-query-check-your-answers');
  readonly confirmation = this.content.locator('ccd-query-confirmation');

  readonly raiseANewQueryHeading = this.qualifyingQuestionOptions.locator('h1.govuk-fieldset__heading');
  readonly raiseANewQueryRadio = this.qualifyingQuestionOptions.locator(
    'input.govuk-radios__input[name="qualifyingQuestionOption"][id="Raise a new query"]'
  );
  readonly continueButton = this.content.locator('.govuk-button-group button.govuk-button:not(.govuk-button--secondary)').first();
  readonly enterQueryDetailsHeading = this.raiseQueryForm.locator('h1.govuk-heading-l');
  readonly querySubjectInput = this.raiseQueryForm.locator('input#subject');
  readonly queryDetailInput = this.raiseQueryForm.locator('textarea#body');
  readonly hearingRelatedNoRadio = this.raiseQueryForm.locator('input#isHearingRelated-no');
  readonly reviewQueryDetailsHeading = this.reviewQueryDetails.locator('h1.govuk-heading-l');
  readonly reviewSummaryValues = this.reviewQueryDetails.locator('.govuk-summary-list__value');
  readonly submitButton = this.reviewQueryDetails.locator('button.govuk-button[type="submit"]');
  readonly querySubmittedHeading = this.confirmation.locator('.govuk-panel__title');
  readonly querySubmittedConfirmation = this.confirmation.locator('.qm-confirmation.govuk-panel__body');

  constructor(page: Page) {
    super(page);
  }

  async chooseRaiseAQueryJourney(caseReference: string): Promise<void> {
    await expect(this.page).toHaveURL(this.queryManagementUrl(caseReference));
    await expect(this.raiseANewQueryHeading).toBeVisible();
    await expect(this.raiseANewQueryHeading).toContainText('Raise a new query');

    await this.raiseANewQueryRadio.check();
    await this.continueButton.click();

    await expect(this.page).toHaveURL(this.raiseAQueryUrl(caseReference));
    await expect(this.enterQueryDetailsHeading).toBeVisible();
    await expect(this.enterQueryDetailsHeading).toContainText('Enter query details');
  }

  async enterQueryDetailsAndContinue(subject: string, detail: string): Promise<void> {
    await this.querySubjectInput.fill(subject);
    await this.queryDetailInput.fill(detail);
    await this.hearingRelatedNoRadio.check();
    await this.continueButton.click();
  }

  async expectReviewQueryDetails(subject: string, detail: string): Promise<void> {
    await expect(this.reviewQueryDetailsHeading).toBeVisible();
    await expect(this.reviewQueryDetailsHeading).toContainText('Review query details');
    await expect(this.reviewSummaryValues.nth(0)).toContainText(subject);
    await expect(this.reviewSummaryValues.nth(1)).toContainText(detail);
    await expect(this.reviewSummaryValues.nth(2)).toContainText('No');
  }

  async submitQuery(): Promise<void> {
    await this.submitButton.click();
  }

  async expectQuerySubmitted(confirmationHeader: string): Promise<void> {
    await expect(this.querySubmittedHeading).toBeVisible();
    await expect(this.querySubmittedHeading).toContainText('Query submitted');
    await expect(this.querySubmittedConfirmation).toContainText(confirmationHeader);
  }

  private queryManagementUrl(caseReference: string): RegExp {
    return new RegExp(`/query-management/query/${caseReference}(?:$|[/?#])`);
  }

  private raiseAQueryUrl(caseReference: string): RegExp {
    return new RegExp(`/query-management/query/${caseReference}/raiseAQuery(?:$|[/?#])`);
  }
}
