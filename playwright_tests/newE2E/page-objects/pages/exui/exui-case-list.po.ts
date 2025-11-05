import { Page } from "@playwright/test";
import { config } from "../../../utils";
import { Base } from "../../base";

export class ExuiCaseListPage extends Base {
  readonly container = this.page.locator("exui-case-home");

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(config.urls.manageCaseBaseUrl);
    await this.exuiHeader.checkIsVisible();
  }
}
