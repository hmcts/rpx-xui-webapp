import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';

export class AccessRequestPage extends Base {
  private static readonly NAVIGATION_ATTEMPTS = 3;
  private static readonly NAVIGATION_TIMEOUT_MS = 30_000;

  readonly requestAccessButton = this.page.getByRole('button', { name: 'Request access' });
  readonly continueButton = this.page.getByRole('button', { name: 'Continue', exact: true });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit', exact: true });
  readonly errorMessages = this.page.locator('.govuk-error-message');
  readonly authorisationNeededText = this.page.getByText('Authorisation is needed to access this case');
  readonly challengedAccessNeededText = this.page.getByText('This case requires challenged access.');

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

  public async gotoReviewSpecificRequest(path: string): Promise<void> {
    await this.gotoPathAndWaitFor(path, this.reviewSpecificHeading, 'review specific access request');
  }

  public async gotoReviewSpecificRequestServiceDown(path: string): Promise<void> {
    await this.gotoPathAndWaitForUrl(path, /\/service-down$/, 'review specific access service down');
  }

  public async gotoSpecificAccessCaseDetails(path: string): Promise<void> {
    await this.gotoPathAndWaitFor(path, this.authorisationNeededText, 'specific access case details');
  }

  public async gotoChallengedAccessCaseDetails(path: string): Promise<void> {
    await this.gotoPathAndWaitFor(path, this.challengedAccessNeededText, 'challenged access case details');
  }

  public async gotoSpecificAccessRequest(path: string): Promise<void> {
    await this.gotoPathAndWaitFor(path, this.specificAccessReasonInput, 'specific access request');
  }

  public async gotoChallengedAccessRequest(path: string): Promise<void> {
    await this.gotoPathAndWaitFor(path, this.challengedAccessHeading, 'challenged access request');
  }

  public async fillReviewPeriodEndDate(day: string, month: string, year: string): Promise<void> {
    await this.endDateDayInput.fill(day);
    await this.endDateMonthInput.fill(month);
    await this.endDateYearInput.fill(year);
  }

  private async gotoPathAndWaitFor(path: string, readyLocator: Locator, label: string): Promise<void> {
    const targetPattern = this.pathPattern(path);
    let lastError: unknown;

    for (let attempt = 1; attempt <= AccessRequestPage.NAVIGATION_ATTEMPTS; attempt += 1) {
      try {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: AccessRequestPage.NAVIGATION_TIMEOUT_MS });
        await this.page.waitForURL(targetPattern, { timeout: AccessRequestPage.NAVIGATION_TIMEOUT_MS }).catch(() => undefined);

        if (/chrome-error:\/\/chromewebdata/i.test(this.page.url()) || !targetPattern.test(this.page.url())) {
          throw new Error(`${label} navigation did not reach ${path}; current URL is ${this.page.url()}`);
        }

        await readyLocator.waitFor({ state: 'visible', timeout: AccessRequestPage.NAVIGATION_TIMEOUT_MS });
        return;
      } catch (error) {
        lastError = error;
        if (attempt >= AccessRequestPage.NAVIGATION_ATTEMPTS || !this.isRetriableNavigationError(error)) {
          throw error;
        }
        await this.page.waitForTimeout(1_000);
      }
    }

    throw new Error(`${label} navigation failed for ${path}: ${String(lastError)}`);
  }

  private async gotoPathAndWaitForUrl(path: string, targetPattern: RegExp, label: string): Promise<void> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= AccessRequestPage.NAVIGATION_ATTEMPTS; attempt += 1) {
      try {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: AccessRequestPage.NAVIGATION_TIMEOUT_MS });

        if (/chrome-error:\/\/chromewebdata/i.test(this.page.url())) {
          throw new Error(`${label} navigation reached ${this.page.url()}`);
        }

        await this.page.waitForURL(targetPattern, { timeout: AccessRequestPage.NAVIGATION_TIMEOUT_MS });
        return;
      } catch (error) {
        lastError = error;
        if (attempt >= AccessRequestPage.NAVIGATION_ATTEMPTS || !this.isRetriableNavigationError(error)) {
          throw error;
        }
        await this.page.waitForTimeout(1_000);
      }
    }

    throw new Error(`${label} navigation failed for ${path}: ${String(lastError)}`);
  }

  private pathPattern(path: string): RegExp {
    const escapedPath = path.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    return new RegExp(`${escapedPath}(?:[/?#]|$)`);
  }

  private isRetriableNavigationError(error: unknown): boolean {
    return (
      error instanceof Error &&
      /net::ERR|ERR_|Timeout|waiting for|locator\.waitFor|chrome-error:\/\/chromewebdata|did not reach|Navigation failed|interrupted.*navigation/i.test(
        error.message
      )
    );
  }
}
