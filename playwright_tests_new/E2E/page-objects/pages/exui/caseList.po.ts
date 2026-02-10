import { Locator, Page } from '@playwright/test';
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
  readonly caseDetailsLinks = this.page.locator('a[href*="/cases/case-details/"]');
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
    await this.page.goto('/cases');
    await this.exuiSpinnerComponent.wait();
  }

  async navigateTo() {
    await this.page.goto(`/cases`);
  }

  async getPaginationFinalItem(): Promise<string | undefined> {
    const items = (await this.pagination.locator('li').allTextContents()).map((i) => i.trim());
    return items.at(-1);
  }

  async openCaseByReference(cleanedCaseNumber: string) {
    const caseLink = this.page.locator(`a:has-text("${cleanedCaseNumber}")`);
    await caseLink.first().waitFor({ state: 'visible' });
    await caseLink.first().click();
  }

  async getRandomCaseReferenceFromResults(
    preferredStates: string[] = [],
    selection: 'first' | 'random' = 'first'
  ): Promise<string> {
    await this.exuiSpinnerComponent.wait();
    let candidates = await this.collectLinkCandidates(this.caseResultLinks);

    if (candidates.length === 0 && !this.page.url().includes('/cases')) {
      await this.page.goto('/cases');
      await this.exuiSpinnerComponent.wait();
      candidates = await this.collectLinkCandidates(this.caseResultLinks);
    }

    if (candidates.length === 0) {
      candidates = await this.collectLinkCandidates(this.caseDetailsLinks);
    }

    if (candidates.length === 0) {
      throw new Error(`No case links found in case list or page context: ${this.page.url()}`);
    }

    const caseEntries = candidates
      .map((candidate) => {
        const hrefPattern = /(\d{16})/;
        const hrefMatch = hrefPattern.exec(candidate.href);
        const textDigits = candidate.text.replaceAll(/\D/g, '');
        const caseReference = hrefMatch?.[1] || (textDigits.length === 16 ? textDigits : '');
        return {
          caseReference,
          rowText: candidate.rowText,
        };
      })
      .filter((entry) => entry.caseReference.length === 16);

    if (caseEntries.length === 0) {
      throw new Error('No 16-digit case references found in case list links');
    }

    const preferredEntries =
      preferredStates.length > 0
        ? caseEntries.filter((entry) => preferredStates.some((state) => entry.rowText.includes(state)))
        : caseEntries;

    const pickFrom = preferredEntries.length > 0 ? preferredEntries : caseEntries;
    const uniqueReferences = Array.from(new Set(pickFrom.map((entry) => entry.caseReference)));
    if (selection === 'random') {
      const randomIndex = Math.floor(Math.random() * uniqueReferences.length);
      return uniqueReferences[randomIndex];
    }
    return uniqueReferences[0];
  }

  private async collectLinkCandidates(linkLocator: Locator) {
    return linkLocator.evaluateAll((links) =>
      links.map((link) => {
        const href = link.getAttribute('href') || '';
        const text = (link.textContent || '').trim();
        const rowText = (link.closest('tr')?.textContent || '').trim();
        return { href, text, rowText };
      })
    );
  }
}
