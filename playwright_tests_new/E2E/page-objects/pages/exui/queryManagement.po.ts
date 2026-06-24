import { expect, type Page } from '@playwright/test';
import { Base } from '../../base';

export class QueryManagementPage extends Base {
  readonly container = this.page.locator('exui-query-management-container');
  readonly content = this.container.locator('main#content');
  readonly qualifyingQuestionOptions = this.content.locator('ccd-qualifying-question-options');
  readonly raiseQueryForm = this.content.locator('ccd-query-write-raise-query');
  readonly respondQueryForm = this.content.locator('ccd-query-write-respond-to-query');
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
  readonly responseDetailInput = this.respondQueryForm.locator('textarea#body');
  readonly hearingRelatedNoRadio = this.raiseQueryForm.locator('input#isHearingRelated-no');
  readonly respondToQueryHeading = this.respondQueryForm.locator('h1.govuk-heading-m');
  readonly reviewQueryDetailsHeading = this.reviewQueryDetails.locator('h1.govuk-heading-l');
  readonly reviewSummaryValues = this.reviewQueryDetails.locator('.govuk-summary-list__value');
  readonly submitButton = this.reviewQueryDetails.locator('button.govuk-button[type="submit"]');
  readonly querySubmittedHeading = this.confirmation.locator('.govuk-panel__title');
  readonly querySubmittedConfirmation = this.confirmation.locator('.qm-confirmation.govuk-panel__body');
  readonly queryResponseSubmittedConfirmation = this.confirmation.locator('.govuk-panel__body');
  readonly queryList = this.page.locator('ccd-query-list');
  readonly queryDetails = this.page.locator('ccd-query-details');

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

  async expectRespondToQueryPage(caseReference: string, queryId: string, taskId: string): Promise<void> {
    await expect(this.page).toHaveURL(this.respondToQueryUrl(caseReference, queryId, taskId));
    await expect(this.respondQueryForm).toBeVisible();
    await expect(this.respondToQueryHeading).toContainText('Respond to a query');
    await expect(this.responseDetailInput).toBeVisible();
  }

  async enterResponseDetailsAndContinue(detail: string): Promise<void> {
    await this.responseDetailInput.fill(detail);
    await this.continueButton.click();
  }

  async expectReviewQueryResponseDetails(subject: string, detail: string): Promise<void> {
    await expect(this.reviewQueryDetailsHeading).toBeVisible();
    await expect(this.reviewQueryDetailsHeading).toContainText('Review query response details');
    await expect(this.reviewSummaryValues.nth(0)).toContainText(subject);
    await expect(this.reviewSummaryValues.nth(1)).toContainText(detail);
    await expect(this.reviewSummaryValues.nth(2)).toContainText('No answer');
  }

  async expectFollowUpQueryPage(caseReference: string, queryId: string): Promise<void> {
    await expect(this.page).toHaveURL(this.followUpQueryUrl(caseReference, queryId));
    await expect(this.respondQueryForm).toBeVisible();
    await expect(this.respondToQueryHeading).toContainText('Ask a follow-up question');
    await expect(this.responseDetailInput).toBeVisible();
  }

  async enterFollowUpDetailsAndContinue(detail: string): Promise<void> {
    await this.responseDetailInput.fill(detail);
    await this.continueButton.click();
  }

  async expectReviewFollowUpQueryDetails(detail: string): Promise<void> {
    await expect(this.reviewQueryDetailsHeading).toBeVisible();
    await expect(this.reviewQueryDetailsHeading).toContainText('Review query details');
    await expect(this.reviewSummaryValues.nth(0)).toContainText(detail);
  }

  async submitQuery(): Promise<void> {
    await this.submitButton.click();
  }

  async expectQuerySubmitted(confirmationHeader: string): Promise<void> {
    await expect(this.querySubmittedHeading).toBeVisible();
    await expect(this.querySubmittedHeading).toContainText('Query submitted');
    await expect(this.querySubmittedConfirmation).toContainText(confirmationHeader);
  }

  async expectQueryResponseSubmitted(): Promise<void> {
    await expect(this.querySubmittedHeading).toBeVisible();
    await expect(this.querySubmittedHeading).toContainText('Query response submitted');
    await expect(this.queryResponseSubmittedConfirmation).toContainText('This query response has been added to the case');
  }

  async expectQueryInQueriesTable(subject: string, partyName: string, senderName: string): Promise<void> {
    await expect(this.queryList).toBeVisible();
    await expect(this.queryList.locator('.query-list__caption')).toContainText(partyName);

    const queryRow = this.queryList.getByRole('row', { name: new RegExp(this.escapeRegExp(subject)) }).first();
    await expect(queryRow).toBeVisible();
    await expect(queryRow).toContainText(subject);
    await expect(queryRow).toContainText(senderName);
  }

  async openQueryFromQueriesTable(subject: string): Promise<void> {
    await this.queryList.getByRole('button', { name: subject, exact: true }).click();
    await expect(this.queryDetails).toBeVisible();
  }

  async expectQueryDetailsShown(options: {
    body: string;
    hearingRelated: string;
    senderName: string;
    subject: string;
  }): Promise<void> {
    await expect(this.queryDetails.locator('.govuk-table__caption').filter({ hasText: 'Query details' })).toBeVisible();
    await this.expectQueryDetailsRow('Sender name', options.senderName);
    await this.expectQueryDetailsRow('Query subject', options.subject);
    await this.expectQueryDetailsRow('Query body', options.body);
    await this.expectQueryDetailsRow('Is the query hearing related?', options.hearingRelated);
  }

  private async expectQueryDetailsRow(label: string, value: string): Promise<void> {
    const row = this.queryDetails.locator('tr').filter({ hasText: label }).first();
    await expect(row).toBeVisible();
    await expect(row.locator('.govuk-table__cell')).toContainText(value);
  }

  private queryManagementUrl(caseReference: string): RegExp {
    return new RegExp(`/query-management/query/${caseReference}(?:$|[/?#])`);
  }

  private raiseAQueryUrl(caseReference: string): RegExp {
    return new RegExp(`/query-management/query/${caseReference}/raiseAQuery(?:$|[/?#])`);
  }

  private respondToQueryUrl(caseReference: string, queryId: string, taskId: string): RegExp {
    return new RegExp(`/query-management/query/${caseReference}/3/${queryId}\\?tid=${taskId}(?:$|[&#])`);
  }

  private followUpQueryUrl(caseReference: string, queryId: string): RegExp {
    return new RegExp(`/query-management/query/${caseReference}/4/${queryId}(?:$|[/?#])`);
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  }
}
