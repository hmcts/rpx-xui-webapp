import { Page } from '@playwright/test';

export class ExuiBodyComponent {
  readonly serviceDownError = this.page.locator('exui-service-down');

  constructor(private readonly page: Page) {}
}
