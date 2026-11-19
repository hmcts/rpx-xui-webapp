import type { Page } from '@playwright/test';

export class ShowConditionsComponent {
  readonly controller = this.page.locator('#Controller');
  readonly conditionalSource = this.page.getByLabel('Conditional source');
  readonly dependentDetail = this.page.getByLabel('Dependent detail');
  readonly showSourcePage = this.page.getByLabel('Show source page');
  readonly skippedPageSource = this.page.getByLabel('Skipped page source');
  readonly destinationNote = this.page.getByLabel('Destination note');
  readonly firstPageNote = this.page.getByLabel('First page note');
  readonly laterPageSource = this.page.getByLabel('Later page source');
  readonly metadataPageNote = this.page.getByLabel('Metadata page note');
  readonly metadataDependentDetail = this.page.getByLabel('Metadata-dependent detail');
  readonly previousButton = this.page.getByRole('button', { name: 'Previous', exact: true });

  constructor(private readonly page: Page) {}
}
