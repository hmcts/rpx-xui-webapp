import { Locator, Page } from '@playwright/test';
import { Base } from "../../base";
import {expect } from "../../../fixtures";

export class GlobalSearchPage extends Base {
  readonly CHANGE_SEARCH = 'Change search';
  readonly VIEW = 'View';
  // Locators
  readonly searchButton : Locator;
  readonly servicesOption : Locator;
  readonly searchLinkOnMenuBar : Locator;
  readonly caseIdTextBox = this.page.getByRole('textbox', { name: '16-digit case reference', exact: true });
  readonly serviceLabel: Locator;
  readonly viewLink : Locator;
  readonly courtLocation : Locator;
  readonly caseInformation : Locator;
  readonly courtName : Locator;
  readonly summaryTab : Locator;
  readonly changeSearchLink:Locator;
  readonly summaryHeading:Locator;
  readonly caseFileViewTab:Locator;
  readonly caseReference:Locator;
  readonly applicantOrPartyName: Locator;
  readonly previousSearchLink : Locator;
  readonly nextSearchLink : Locator;
  readonly searchResultsHeader : Locator;
  readonly searchResultsTable : Locator;


  async performGlobalSearchWithCase(caseId: string ) : Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    await this.serviceLabel.selectOption('PUBLICLAW');
    await this.searchButton.click();
  }

  async performPartialSearchOfCaseIdAndPartyName(caseId: string) : Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.caseIdTextBox.click();
    const first5Digits = caseId.substring(0,5);
    // search for term first5Digits*
    await this.caseIdTextBox.fill(`${first5Digits}*`);
    await this.applicantOrPartyName.fill('Will*');
    await this.serviceLabel.selectOption('PUBLICLAW');
    await this.searchButton.click();
  }


  async verifySearchResults() {
     expect(this.changeSearchLink.filter({ hasText: this.CHANGE_SEARCH}).isVisible());
     expect(this.viewLink.filter({ hasText: this.VIEW}).isVisible());
  }

  async verifyWildCardSearchResults(caseId: string) {
    expect(this.previousSearchLink.isVisible());
    expect(this.nextSearchLink.isVisible());
    expect(this.searchResultsHeader.isVisible());
    expect(this.changeSearchLink.filter({ hasText: this.CHANGE_SEARCH}).isVisible());
    expect(this.searchResultsTable.isVisible());

  }
  async verifyCaseDetails() {
    await this.viewLink.click();
    expect(this.caseFileViewTab.isVisible());
    expect(this.summaryTab.isVisible());
    //TODO expect(this.courtName).toHaveText('High Court Family Division');
  }

  constructor(page: Page) {
    super(page);
    this.searchButton = this.page.getByRole('button',{ name: 'Search'});
    this.courtLocation = this.page.getByRole('heading', { name: 'Royal Courts of Justice'});
    this.servicesOption = this.page.getByRole('combobox', { name: 'servicesList' });
    this.serviceLabel = this.page.getByLabel('Services');
    this.searchLinkOnMenuBar = this.page.getByRole('link', { name: 'Search' });
    // Note for viewLink - 'exact' MUST be true otherwise playwright Clicks on 'View' cookies.
    this.viewLink = this.page.getByRole('link', {name: ' View ', exact:true});
    this.caseInformation = this.page.getByRole('heading', {name: 'Case information'});
    this.courtName = this.page.locator('#case-viewer-field-read--caseSummaryCourtName');
    this.summaryTab = this.page.getByRole('tab', { name: 'Summary' });
    this.changeSearchLink = this.page.getByRole('paragraph');
    this.summaryHeading = this.page.getByText('Summary');
    this.caseFileViewTab = this.page.getByRole('tab', { name: 'Case File View' });
    this.caseReference = this.page.getByRole('heading', { name: 'Case reference' });
    this.applicantOrPartyName = this.page.getByRole('textbox', { name: 'Name' });
    this.previousSearchLink = this.page.getByRole('link', { name: 'Previous page' });
    this.nextSearchLink = this.page.getByRole('link', { name: 'Next page' });
    this.searchResultsHeader = this.page.getByRole('heading', { name: 'Search results' });
    //TODO - Assert presence of table object etc.
    this.searchResultsTable = this.page.locator('//*[@id="content"]/div/table');
  }
}
