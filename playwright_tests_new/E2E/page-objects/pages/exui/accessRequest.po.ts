import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';

export class AccessRequestPage extends Base {
  readonly requestAccessButton = this.page.getByRole('button', { name: 'Request access' });
  readonly continueButton = this.page.getByRole('button', { name: 'Continue', exact: true });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit', exact: true });
  readonly errorMessages = this.page.locator('.govuk-error-message');

  readonly challengedAccessHeading = this.page.getByRole('heading', { name: 'Why do you need to access this case?' });
  readonly linkedCaseReasonRadio = this.page.getByLabel('The cases or parties are linked to the case I am working on');
  readonly consolidateReasonRadio = this.page.getByLabel('To determine if the case needs to be consolidated');
  readonly transferReasonRadio = this.page.getByLabel('To consider an order for transfer');
  readonly otherReasonRadio = this.page.getByLabel('Other reason');
  readonly challengedCaseReferenceInput = this.page.locator('#case-reference');
  readonly challengedOtherReasonInput = this.page.locator('#other-reason');
  readonly challengedAccessSuccessHeading = this.page.getByRole('heading', { name: 'Access successful' });
  readonly viewCaseFileLink = this.page.getByRole('link', { name: 'View case file' });

  readonly specificAccessContainer = this.page.locator('ccd-case-specific-access-request');
  readonly specificAccessReasonInput = this.page.locator('#specific-reason');
  readonly specificAccessSuccessContainer = this.page.locator('ccd-case-specific-access-success');

  readonly reviewSpecificHeading = this.page.getByRole('heading', { name: 'Review specific access request' });
  readonly approveRequestRadio = this.page.getByLabel('Approve request');
  readonly requestMoreInformationRadio = this.page.getByLabel('Request more information');
  readonly reviewDurationHeading = this.page.getByRole('heading', {
    name: 'How long do you want to give access to this case for?',
  });
  readonly sevenDaysRadio = this.page.getByLabel('7 days');
  readonly indefiniteRadio = this.page.getByLabel('Indefinite');
  readonly anotherPeriodRadio = this.page.getByLabel('Another period');
  readonly accessStartsLegend = this.page.locator('legend', { hasText: 'Access Starts' });
  readonly accessEndsText = this.page.getByText('Access Ends', { exact: true });
  readonly endDateDayInput = this.page.locator('#endDate-day');
  readonly endDateMonthInput = this.page.locator('#endDate-month');
  readonly endDateYearInput = this.page.locator('#endDate-year');
  readonly invalidEndDateMessage = this.page.getByText('Invalid End date');
  readonly requestMoreInformationHeading = this.page.getByRole('heading', { name: 'Request more information' });
  readonly reviewMoreDetailInput = this.page.locator('#more-detail');
  readonly accessApprovedHeading = this.page.getByRole('heading', { name: 'Access approved' });
  readonly requestDeniedHeading = this.page.getByRole('heading', { name: 'Request for access denied' });

  constructor(page: Page) {
    super(page);
  }

  public errorMessage(text: string): Locator {
    return this.errorMessages.filter({ hasText: text });
  }

  public async fillReviewPeriodEndDate(day: string, month: string, year: string): Promise<void> {
    await this.endDateDayInput.fill(day);
    await this.endDateMonthInput.fill(month);
    await this.endDateYearInput.fill(year);
  }
}
