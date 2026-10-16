import { Page } from '@playwright/test';

export class ExuiBodyComponent {
  readonly serviceDownError = this.page.locator('exui-service-down');
  readonly message = this.page.locator('.hmcts-banner');
  readonly warningMessage = this.page.locator('.hmcts-banner--warning');
  readonly successMessage = this.message.filter({ hasText: 'success' });
  readonly infoMessage = this.message.filter({ hasText: 'information' });

  readonly mainHeading = this.page.locator('h1.govuk-heading-l');

  readonly table = this.page.locator('table.govuk-table');
  readonly tableHeaders = this.table.locator('thead th');

  readonly paginationControls = this.page.locator('.govuk-pagination');
  readonly paginationNextButton = this.paginationControls.locator('.govuk-pagination__next');
  readonly paginationEllipsisButton = this.paginationControls.locator('.govuk-pagination__item--ellipsis');
  readonly paginationPreviousButton = this.paginationControls.locator('.govuk-pagination__prev');
  readonly paginationCurrentPage = this.paginationControls.locator('.govuk-pagination__item--current');

  constructor(private readonly page: Page) {}
}
