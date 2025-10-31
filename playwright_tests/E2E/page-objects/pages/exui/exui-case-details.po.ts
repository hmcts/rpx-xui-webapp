import { Page } from "@playwright/test";
import { Base } from "../../base";

export class ExuiCaseDetailsPage extends Base {
  readonly container = this.page.locator("exui-case-details-home");

  constructor(page: Page) {
    super(page);
  }
}
