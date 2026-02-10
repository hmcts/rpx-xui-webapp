import { Page } from '@playwright/test';
import { Base } from '../../base';

export class CaseListPage extends Base {
  readonly container = this.page.locator('exui-case-home');
  readonly caseListHeading = this.page.locator('main h1');
  readonly filtersContainer = this.page.locator('.search-block .hmcts-filter-layout__filter');
  readonly applyFilterButton = this.page.locator('.search-block button[type="submit"]');
  readonly resetFilterButton = this.page.locator('.search-block button[type="reset"]');
  readonly jurisdictionSelect = this.page.locator('#wb-jurisdiction');
  readonly caseTypeSelect = this.page.locator('#wb-case-type');
  readonly textField0Input = this.page.locator('#TextField0');
  readonly quickSearchCaseReferenceInput = this.page.locator('#exuiCaseReferenceSearch');
  readonly quickSearchFindButton = this.page.locator('button.govuk-button--secondary');
  readonly caseListResultsAmount = this.page.locator('#search-result .pagination-top');
  readonly caseSearchResultsMessage = this.page.locator('#search-result');
  readonly caseResultsTable = this.page.locator('#search-result table');
  readonly caseResultLinks = this.page.locator('#search-result a.govuk-link');
  readonly pagination = this.page.locator('.ngx-pagination');

  constructor(page: Page) {
    super(page);
  }

  public async searchByJurisdiction(jurisdiction: string): Promise<void> {
    await this.jurisdictionSelect.selectOption(jurisdiction);
  }

  public async searchByCaseType(caseType: string): Promise<void> {
    await this.caseTypeSelect.selectOption(caseType);
  }

  public async searchByTextField0(textField0: string): Promise<void> {
    await this.textField0Input.fill(textField0);
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  async goto() {
    await this.exuiHeader.selectHeaderMenuItem('Case list');
  }

  async navigateTo() {
    await this.page.goto(`/cases`);
  }

  async getPaginationFinalItem(): Promise<string | undefined> {
    const items = (await this.pagination.locator('li').allTextContents()).map((i) => i.trim());
    return items.length > 0 ? items[items.length - 1] : undefined;
  }

  async openCaseByReference(cleanedCaseNumber: string) {
    const caseLink = this.page.locator(`a:has-text("${cleanedCaseNumber}")`);
    await caseLink.first().waitFor({ state: 'visible' });
    await caseLink.first().click();
  }

  async getRandomCaseReferenceFromResults(): Promise<string> {
    await this.exuiSpinnerComponent.wait();
    const count = await this.caseResultLinks.count();

    if (count === 0) {
      throw new Error('No case links found in case list results');
    }

    const caseReferences = new Set<string>();
    for (let i = 0; i < count; i++) {
      const href = await this.caseResultLinks.nth(i).getAttribute('href');
      const text = (await this.caseResultLinks.nth(i).textContent()) ?? '';

      if (href) {
        const hrefMatch = href.match(/(\d{16})/);
        if (hrefMatch?.[1]) {
          caseReferences.add(hrefMatch[1]);
        }
      }

      const textDigits = text.replace(/\D/g, '');
      if (textDigits.length === 16) {
        caseReferences.add(textDigits);
      }
    }

    if (caseReferences.size === 0) {
      throw new Error('No 16-digit case references found in case list links');
    }

    const refs = Array.from(caseReferences);
    const randomIndex = Math.floor(Math.random() * refs.length);
    return refs[randomIndex];
  }
}
