import { Page } from '@playwright/test';

export class ExuiBodyComponent {
  readonly serviceDownError = this.page.locator('exui-service-down');
  readonly message = this.page.locator('.hmcts-banner');
  readonly warningMessage = this.message.locator('.hmcts-banner--warning');
  readonly successMessage = this.message.filter({ hasText: 'success' });
  readonly infoMessage = this.message.filter({ hasText: 'information' });

  readonly mainHeading = this.page.locator('h1.govuk-heading-l');

  readonly table = this.page.locator('table.govuk-table');
  readonly tableHeaders = this.table.locator('thead th');

  readonly paginationControls = this.page.locator('.ngx-pagination');
  readonly paginationNextButton = this.paginationControls.locator('.pagination-next');
  readonly paginationEllipsisButton = this.paginationControls.locator('.ellipsis');
  readonly paginationPreviousButton = this.paginationControls.locator('.pagination-previous');
  readonly paginationCurrentPage = this.paginationControls.locator('.current');

  constructor(private readonly page: Page) {}
}
