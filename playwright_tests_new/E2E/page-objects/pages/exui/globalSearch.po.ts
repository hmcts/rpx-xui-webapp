import { Locator, Page } from '@playwright/test';
import { Base } from "../../base";
import {expect } from "../../../fixtures";

export class GlobalSearchPage extends Base {
  readonly CHANGE_SEARCH = 'Change search';
  readonly VIEW = 'View';

  // Locators
  readonly servicesOption = this.page.locator('#servicesList');
  readonly searchLinkOnMenuBar = this.page.locator('.hmcts-primary-navigation__link:has-text("Search")');
  readonly searchButton = this.page.locator('button[type="submit"]:has-text("Search")');
  readonly caseIdTextBox = this.page.locator('input#caseRef');
  // Note for viewLink - 'exact' MUST be true otherwise playwright Clicks on 'View' cookies.
  readonly viewLink =  this.page.getByRole('link', {name: ' View ', exact:true});
  readonly changeSearchLink = this.page.locator('.govuk-width-container .govuk-link');
  readonly searchResultTable = this.page.locator('.govuk-width-container .govuk-main-wrapper .govuk-table');
  // readonly courtLocation = this.page.getByRole('heading', { name: 'Royal Courts of Justice'});
  // readonly caseInformation =  this.page.getByRole('heading', {name: 'Case information'});
  // readonly courtName = this.page.locator('#case-viewer-field-read--caseSummaryCourtName');
  // readonly searchResultsContainer = this.page.locator('.govuk-width-container');
  readonly searchResultsTable = this.page.locator('.govuk-width-container .govuk-table');
  readonly applicantOrPartyName = this.page.locator('.govuk-form-group').locator('#fullName');
  readonly paginationLinks = this.page.locator('.govuk-width-container #pagination-label .hmcts-pagination__link');
  readonly searchResultsHeader = this.page.locator('.govuk-width-container .govuk-heading-xl');


  async performGlobalSearchWithCase(caseId: string, caseType:string ) : Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    await this.servicesOption.selectOption(caseType);
    await this.searchButton.click();
  }

  async performPartialSearchOfCaseIdAndPartyName(caseId: string) : Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.caseIdTextBox.click();
    const first5Digits = caseId.substring(0,5);
    // search with first 5 digits of valid case id Ex : 15665*
    await this.caseIdTextBox.fill(`${first5Digits}*`);
    await this.applicantOrPartyName.fill('Will*');
    await this.servicesOption.selectOption('PUBLICLAW');
    await this.searchButton.click();
  }


  async verifySearchResults() {
     expect(this.changeSearchLink.filter({ hasText: this.CHANGE_SEARCH}).isVisible());
     expect(this.viewLink.filter({ hasText: this.VIEW}).isVisible());
  }

  async viewCaseDetails() {
    await this.viewLink.click();
  }

  constructor(page: Page) {
    super(page);
  }
}
