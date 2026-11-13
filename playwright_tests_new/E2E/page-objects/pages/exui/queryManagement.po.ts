import { readFile } from 'node:fs/promises';
import type { Locator, Page } from '@playwright/test';
import { Base } from '../../base';

export class QueryManagementPage extends Base {
  readonly container = this.page.locator('exui-query-management-container');
  readonly content = this.container.locator('main#content');
  readonly qualifyingQuestionOptions = this.content.locator('ccd-qualifying-question-options');
  readonly raiseQueryForm = this.content.locator('ccd-query-write-raise-query');
  readonly respondQueryForm = this.content.locator('ccd-query-write-respond-to-query');
  readonly reviewQueryDetails = this.content.locator('ccd-query-check-your-answers');
  readonly confirmation = this.content.locator('ccd-query-confirmation');
  readonly errorSummary = this.content.locator('.govuk-error-summary, .error-summary').first();
  readonly errorSummaryTitle = this.errorSummary.locator('h2, h3').first();
  readonly validationErrors = this.errorSummary.locator('.validation-error');
  readonly eventCreationErrorHeading = this.page.getByRole('heading', { name: 'The event could not be created' });

  readonly raiseANewQueryHeading = this.qualifyingQuestionOptions.locator('h1.govuk-fieldset__heading');
  readonly raiseANewQueryRadio = this.qualifyingQuestionOptions.locator(
    'input.govuk-radios__input[name="qualifyingQuestionOption"][id="Raise a new query"]'
  );
  readonly continueButton = this.content.locator('.govuk-button-group button.govuk-button:not(.govuk-button--secondary)').first();
  readonly enterQueryDetailsHeading = this.raiseQueryForm.locator('h1.govuk-heading-l');
  readonly querySubjectInput = this.raiseQueryForm.locator('input#subject');
  readonly queryDetailInput = this.raiseQueryForm.locator('textarea#body');
  readonly responseDetailInput = this.respondQueryForm.locator('textarea#body');
  readonly closeQueryCheckbox = this.respondQueryForm.getByRole('checkbox', { name: 'I want to close this query' });
  readonly guidance = this.content.locator('ccd-qualifying-question-detail');
  readonly previousButton = this.content.getByRole('button', { name: 'Previous', exact: true });
  readonly hearingRelatedYesRadio = this.raiseQueryForm.locator('input#isHearingRelated-yes');
  readonly hearingDate = this.raiseQueryForm.locator('ccd-query-write-date-input');
  readonly documents = this.content.locator('ccd-query-write-add-documents');
  readonly hearingRelatedNoRadio = this.raiseQueryForm.locator('input#isHearingRelated-no');
  readonly respondToQueryHeading = this.respondQueryForm.locator('h1.govuk-heading-m');
  readonly reviewQueryDetailsHeading = this.reviewQueryDetails.locator('h1.govuk-heading-l');
  readonly reviewSummaryValues = this.reviewQueryDetails.locator('.govuk-summary-list__value');
  readonly submitButton = this.reviewQueryDetails.locator('button.govuk-button[type="submit"]');
  readonly querySubmittedHeading = this.confirmation.locator('.govuk-panel__title');
  readonly querySubmittedConfirmation = this.confirmation.locator('.qm-confirmation.govuk-panel__body');
  readonly queryResponseSubmittedConfirmation = this.confirmation.locator('.govuk-panel__body');
  readonly queryList = this.page.locator('ccd-query-list');
  readonly queryListCaption = this.queryList.locator('.query-list__caption');
  readonly queryDetails = this.page.locator('ccd-query-details');
  readonly readQueryManagementField = this.page.locator('ccd-read-query-management-field');
  readonly queryDetailsCaption = this.queryDetails.locator('table.query-details-table').first().locator('.govuk-table__caption');
  readonly followUpQueryButton = this.readQueryManagementField.locator('button#ask-follow-up-question');
  readonly activeTasks = this.page.locator('.active-tasks-container');
  readonly respondToQueryTaskLink = this.activeTasks
    .locator('a[href*="/query-management/query/"]')
    .filter({ hasText: 'Respond to query' });

  constructor(page: Page) {
    super(page);
  }

  async chooseRaiseAQueryJourney(): Promise<void> {
    await this.raiseANewQueryRadio.check();
    await this.continueButton.click();
  }

  async enterQueryDetailsAndContinue(subject: string, detail: string): Promise<void> {
    await this.querySubjectInput.fill(subject);
    await this.queryDetailInput.fill(detail);
    await this.hearingRelatedNoRadio.check();
    await this.continueButton.click();
  }

  async attachDocument(filename: string): Promise<void> {
    await this.documents.getByRole('button', { name: 'Add new', exact: true }).click();
    await this.documents.locator('input[type="file"]').setInputFiles({
      name: filename,
      mimeType: 'application/pdf',
      buffer: await readFile('playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf'),
    });
  }

  async removeDocument(): Promise<void> {
    await this.documents.getByRole('button', { name: /^Remove / }).click();
    await this.page.locator('ccd-remove-dialog').getByRole('button', { name: 'Remove', exact: true }).click();
  }

  async selectGuidance(name: string): Promise<void> {
    await this.qualifyingQuestionOptions.getByRole('radio', { name, exact: true }).check();
    await this.continueButton.click();
  }

  async enterHearingDate(day: string, month: string, year: string): Promise<void> {
    await this.hearingDate.getByLabel('Day', { exact: true }).fill(day);
    await this.hearingDate.getByLabel('Month', { exact: true }).fill(month);
    await this.hearingDate.getByLabel('Year', { exact: true }).fill(year);
  }

  reviewRow(label: string): Locator {
    return this.reviewQueryDetails
      .locator('.govuk-summary-list__row')
      .filter({ has: this.page.locator('.govuk-summary-list__key', { hasText: label }) });
  }

  async openRespondToQueryTask(): Promise<void> {
    await this.respondToQueryTaskLink.click();
  }

  async enterResponseDetailsAndContinue(detail: string): Promise<void> {
    await this.responseDetailInput.fill(detail);
    await this.continueButton.click();
  }

  async enterFollowUpDetailsAndContinue(detail: string): Promise<void> {
    await this.responseDetailInput.fill(detail);
    await this.continueButton.click();
  }

  async openFollowUpQuery(): Promise<void> {
    await this.followUpQueryButton.click();
  }

  async submitQuery(): Promise<void> {
    await this.submitButton.click();
  }

  queryListRow(subject: string): Locator {
    return this.queryList.locator('tbody tr.query-list__row').filter({ hasText: subject }).first();
  }

  async openQueryFromQueriesTable(subject: string): Promise<void> {
    await this.queryListRow(subject).locator('button.govuk-js-link').filter({ hasText: subject }).click();
  }

  queryDetailsRow(label: string): Locator {
    return this.queryDetails.locator('tr.govuk-table__row').filter({ hasText: label }).first();
  }

  queryDetailsRowValue(label: string): Locator {
    return this.queryDetailsRow(label).locator('.govuk-table__cell');
  }
}
