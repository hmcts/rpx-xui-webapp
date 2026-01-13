import { Locator, Page } from '@playwright/test';
import { Base } from "../../base";
import {expect } from "../../../fixtures";

export class FindCasePage extends Base {
  // Locators
  readonly findCaseLinkOnMenu : Locator;
  readonly showFilterButton : Locator;
  readonly hideFilterButton : Locator;
  readonly resetFilterButton : Locator;
  readonly backToTopButton : Locator;
  readonly caseTypeDropDown : Locator;
  readonly jurisdictionSelect : Locator;
  readonly searchResults_caseLink : Locator;
  readonly caseReference : Locator;
  readonly yourCasesHeading : Locator;

  async startFindCaseJourney(caseNumber:string) : Promise<void> {
    await this.findCaseLinkOnMenu.click();
    await this.showHideButtons();
    await this.checkButtonVisibility();
    await this.caseReference.fill(caseNumber);
    await this.applyFilters();
  }

  async displayCaseDetailsFor(caseNumber : string) : Promise<void> {
    const caseReferenceLink = this.page.locator(`#search-result a.govuk-link[href*="${caseNumber}"]`);
    await caseReferenceLink.click();
  }

  async verifyCaseNumber(caseNumber:string) : Promise<void> {
     let  caseNo = caseNumber.toString();
     let  formattedCaseNumber =  caseNo.replace(/(\d{4})(?=\d)/g, '$1-');
     await(this.searchResults_caseLink.isVisible());
   }

  private async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  private async checkButtonVisibility() {
    await this.exuiCaseListComponent.filters.applyFilterBtn.isVisible();
    await this.resetFilterButton.isVisible();
    await this.backToTopButton.isVisible();
  }

  private async showHideButtons() {
    await this.hideFilterButton.click();
    await this.showFilterButton.click();
  }

  constructor(page: Page) {
    super(page);
    this.findCaseLinkOnMenu = this.page.getByRole('link', { name: ' Find case ' });
    this.showFilterButton = this.page.getByRole('button',{ name: ' Show Filter '});
    this.hideFilterButton = this.page.getByRole('button',{ name: ' Hide Filter '});
    this.resetFilterButton = this.page.getByRole('button',{ name: ' Reset filter '});
    this.backToTopButton = this.page.getByRole('button',{ name: 'Back to top'});
    this.yourCasesHeading = this.page.getByRole('heading', { name: 'Your cases' });
    this.searchResults_caseLink = this.page.getByRole('link', { name: 'go to case with Case' });
    this.jurisdictionSelect = this.page.getByRole('option', { name: 'jurisdiction' });
    this.caseTypeDropDown = this.page.getByRole('option', { name: 'case-type' })
    this.caseReference = this.page.getByRole('textbox', { name: 'Case reference', exact: true });
  }
}
