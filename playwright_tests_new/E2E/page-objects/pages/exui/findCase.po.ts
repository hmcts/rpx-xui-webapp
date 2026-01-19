import { Locator, Page } from '@playwright/test';
import { Base } from "../../base";
import {expect } from "../../../fixtures";

export class FindCasePage extends Base {
  // Locators
  readonly findCaseLinkOnMenu : Locator =   this.page.getByRole('link', { name: ' Find case ' });
  readonly showFilterButton : Locator = this.page.getByRole('button',{ name: ' Show Filter '});
  readonly hideFilterButton : Locator = this.page.getByRole('button',{ name: ' Hide Filter '});
  readonly resetFilterButton : Locator = this.page.getByRole('button',{ name: ' Reset filter '});
  readonly backToTopButton : Locator = this.page.getByRole('button',{ name: 'Back to top'});
  readonly caseTypeDropDown : Locator = this.page.getByRole('option', { name: 'case-type' });
  readonly jurisdictionSelect : Locator = this.page.getByRole('option', { name: 'jurisdiction' });
  readonly searchResults_caseLink : Locator = this.page.getByRole('link', { name: 'go to case with Case' });
  readonly caseReference : Locator = this.page.getByRole('textbox', { name: 'Case reference', exact: true });
  readonly yourCasesHeading : Locator = this.page.getByRole('heading', { name: 'Your cases' });

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
  }
}
