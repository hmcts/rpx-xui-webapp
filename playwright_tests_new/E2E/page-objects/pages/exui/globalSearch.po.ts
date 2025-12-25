import { Locator, Page } from '@playwright/test';
import { Base } from "../../base";
import {expect } from "../../../fixtures";

export class GlobalSearchPage extends Base {
  // constants
  readonly PUBLIC_LAW = 'PUBLICLAW';
  readonly CHANGE_SEARCH = 'Change search';
  readonly VIEW = 'View';

  // Locators
  readonly searchButton : Locator;
  readonly servicesOption : Locator;
  readonly searchLinkOnMenuBar : Locator
  readonly caseIdTextBox = this.page.getByRole('textbox', { name: '16-digit case reference', exact: true });
  readonly searchResultsHeading = this.page.getByRole('heading', { name: 'Search results' });
  readonly serviceLabel: Locator;
  readonly viewLink : Locator;
  readonly courtLocation : Locator;
  readonly caseInformation : Locator;
  readonly courtName : Locator;
  readonly summaryTab : Locator;
  readonly changeSearchLink:Locator
  readonly summaryHeading:Locator
  readonly caseFileViewTab:Locator
  readonly caseReference:Locator

  async performGlobalSearchWithCase(caseId: string ) : Promise<void> {
    await this.searchLinkOnMenuBar.click();
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    await this.serviceLabel.selectOption('PUBLICLAW');
    await this.searchButton.click();
  }

  async verifySearchResults(caseId: string) {
     expect(this.changeSearchLink.filter({ hasText: this.CHANGE_SEARCH}).isVisible());
     expect(this.viewLink.filter({ hasText: this.VIEW}).isVisible());
  }

  async verifyCaseDetails(caseId: string) {
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
    // Note for viewLink - 'exact' MUST be true otherwise PW Clicks on 'View' cookies
    this.viewLink = this.page.getByRole('link', {name: ' View ', exact:true});
    this.caseInformation = this.page.getByRole('heading', {name: 'Case information'});
    this.courtName = this.page.locator('#case-viewer-field-read--caseSummaryCourtName');
    this.summaryTab = this.page.getByRole('tab', { name: 'Summary' });
    this.changeSearchLink = this.page.getByRole('paragraph');
    this.summaryHeading = this.page.getByText('Summary');
    this.caseFileViewTab = this.page.getByRole('tab', { name: 'Case File View' });
    this.caseReference = this.page.getByRole('heading', { name: 'Case reference' });
  }
}
