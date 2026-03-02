import { Page } from '@playwright/test';

export class ExuiBodyComponent {
  readonly serviceDownError = this.page.locator('exui-service-down');
  readonly message = this.page.locator('exui-info-message');
  readonly successMessage = this.message.filter({ hasText: 'success' });
  readonly infoMessage = this.message.filter({ hasText: 'information' });

  constructor(private readonly page: Page) {}
}
