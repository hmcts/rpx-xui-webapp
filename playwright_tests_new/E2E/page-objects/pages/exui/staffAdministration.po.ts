import type { Locator, Page } from '@playwright/test';

export class StaffAdministrationPage {
  constructor(private readonly page: Page) {}

  readonly userListHeading = this.page.getByRole('heading', { name: 'User list' });
  readonly userDetailsHeading = this.page.getByRole('heading', { name: 'User details' });
  readonly userDetails = this.userDetailsHeading.locator('..');
  readonly addUserHeading = this.page.getByRole('heading', { name: 'Add user' });
  readonly editUserHeading = this.page.getByRole('heading', { name: 'Edit user' });
  readonly addUserButton = this.page.getByRole('button', { name: 'Add new user' });
  readonly updateButton = this.page.getByRole('button', { name: 'Update', exact: true });
  readonly continueButton = this.page.getByRole('button', { name: 'Continue', exact: true });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit', exact: true });
  readonly suspendButton = this.page.getByRole('button', { name: 'Suspend', exact: true });
  readonly restoreButton = this.page.getByRole('button', { name: 'Restore', exact: true });
  readonly resendActivationButton = this.page.getByRole('button', { name: 'Resend activation email' });
  readonly firstName = this.page.getByLabel('First name');
  readonly lastName = this.page.getByLabel('Last name');
  readonly email = this.page.getByLabel('Email');
  readonly emailId = this.page.locator('#email_id');
  readonly region = this.page.getByLabel('Region');
  readonly immigrationAndAsylum = this.page.getByLabel('Immigration and Asylum');
  readonly family = this.page.getByLabel('Family', { exact: true });
  readonly userType = this.page.getByLabel('User type');
  readonly caseAllocator = this.page.getByLabel('Case allocator');
  readonly taskSupervisor = this.page.getByLabel('Task supervisor');
  readonly caseworker = this.page.getByLabel('Caseworker', { exact: true });
  readonly seniorCaseworker = this.page.getByLabel('Senior caseworker');
  readonly primaryLocation = this.page.locator('#base_locations_primary');
  readonly emailFormatError = this.page.locator('#email_id-email-error');
  readonly firstNameRequiredError = this.page.locator('#first_name-required-error');
  readonly cancelButton = this.page.getByRole('button', { name: 'Cancel', exact: true });
  readonly advancedSearchButton = this.page.getByRole('button', { name: 'Advanced search', exact: true });
  readonly advancedUserType = this.page.locator('#user-type select');
  readonly advancedJobTitle = this.page.locator('#user-job-title select');
  readonly paginationResults = this.page.locator('exui-staff-user-list .hmcts-pagination__results');
  readonly advancedStatus = this.page.locator('#user-status select');
  readonly advancedSearchSubmit = this.page.locator('#applyFilter');
  // Shared pagination anchors have no href, so they do not expose a link role.
  readonly secondPage = this.page.locator('#pagination-label a').filter({ hasText: /^page\s+2$/ });
  readonly missingPrimaryLocationError = this.page.locator('#location-required-error');
  readonly noResults = this.page.locator('#user-list-no-results');

  userRow(name: string | RegExp): Locator {
    return this.page.getByRole('row', { name });
  }

  summaryRow(label: string): Locator {
    return this.page.locator('.govuk-summary-list__row').filter({ hasText: label }).first();
  }

  async fillNewUserDetails(details: {
    firstName: string;
    lastName: string;
    email: string;
    region: string;
    service: string;
    userType: string;
    jobTitle: string;
  }): Promise<void> {
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);
    await this.email.fill(details.email);
    await this.region.selectOption({ label: details.region });
    await this.page.getByLabel(details.service, { exact: true }).check();
    await this.userType.selectOption({ label: details.userType });
    await this.page.getByLabel(details.jobTitle, { exact: true }).check();
  }

  async searchForUser(name: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Search for a user by name' }).fill(name);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();
  }

  async addPrimaryLocation(search: string, location: string): Promise<void> {
    await this.page.locator('#location-primary').fill(search);
    await this.page.getByRole('option', { name: location }).click();
    await this.page.getByRole('link', { name: 'Add primary location' }).click();
  }
}
