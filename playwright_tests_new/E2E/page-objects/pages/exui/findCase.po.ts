import { Locator, Page } from '@playwright/test';
import { Base } from "../../base";
import {expect } from "../../../fixtures";

export class FindCasePage extends Base {
  readonly CHANGE_SEARCH = 'Change search';
  readonly VIEW = 'View';
  // Locators
  readonly findCaseLink : Locator;
  readonly showFilterButton : Locator;
  readonly hideFilterButton : Locator;
  readonly applyFilterButton : Locator;
  readonly resetFilterButton : Locator;
  readonly backToTopButton : Locator;
  readonly caseTypeDropDown : Locator;
  readonly jurisdictionSelect : Locator;

  // Find Case methods
  async startFindCaseJourney() : Promise<void> {
    await this.hideFilterButton.click();
    await this.showFilterButton.click();
    // 'Show' button will toggle to 'Hide' - have this as a separate test
    //  must see the WB Filter panel now .
    await this.applyFilterButton.isVisible();
    await this.resetFilterButton.isVisible();
    await this.backToTopButton.isVisible();
    await this.jurisdictionSelect.selectOption('Public Law');
    await this.caseTypeDropDown.selectOption('Public Law Applications');
    await this.applyFilterButton.click();
  }

  constructor(page: Page) {
    super(page);
    this.findCaseLink  = this.page.getByRole('button',{ name: 'Find Case'});
    this.showFilterButton = this.page.getByRole('button',{ name: ' Show Filter '});
    this.hideFilterButton = this.page.getByRole('button',{ name: ' Hide Filter '});
    this.applyFilterButton = this.page.getByRole('button',{ name: ' Apply filter '});
    this.resetFilterButton = this.page.getByRole('button',{ name: ' Reset filter '});
    this.backToTopButton = this.page.getByRole('button',{ name: 'Back to top'});
    this.jurisdictionSelect = this.page.locator('#wb-jurisdiction');
    this.caseTypeDropDown = this.page.locator('#wb-case-type')//.selectOption('Public Law Applications');

    // delete ones below
    // this.searchButton = this.page.getByRole('button',{ name: 'Search'});
    // this.courtLocation = this.page.getByRole('heading', { name: 'Royal Courts of Justice'});
    // this.servicesOption = this.page.getByRole('combobox', { name: 'servicesList' });
    // this.serviceLabel = this.page.getByLabel('Services');
    // // Note for viewLink - 'exact' MUST be true otherwise playwright Clicks on 'View' cookies.
    // this.viewLink = this.page.getByRole('link', {name: ' View ', exact:true});
    // this.caseInformation = this.page.getByRole('heading', {name: 'Case information'});
    // this.courtName = this.page.locator('#case-viewer-field-read--caseSummaryCourtName');
    // this.summaryTab = this.page.getByRole('tab', { name: 'Summary' });
    // this.changeSearchLink = this.page.getByRole('paragraph');
    // this.summaryHeading = this.page.getByText('Summary');
    // this.caseFileViewTab = this.page.getByRole('tab', { name: 'Case File View' });
    // this.caseReference = this.page.getByRole('heading', { name: 'Case reference' });
    // this.applicantOrPartyName = this.page.getByRole('textbox', { name: 'Name' });
    // this.previousSearchLink = this.page.getByRole('link', { name: 'Previous page' });
    // this.nextSearchLink = this.page.getByRole('link', { name: 'Next page' });
    // this.searchResultsHeader = this.page.getByRole('heading', { name: 'Search results' });
    // //TODO - Assert presence of table object etc.
    // this.searchResultsTable = this.page.locator('//*[@id="content"]/div/table');
  }
}
