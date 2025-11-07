import { Page } from "@playwright/test";
import config from "../../../utils/config.utils.js";
import { Base } from "../../base.js";

export class CaseListPage extends Base {
  readonly container = this.page.locator("exui-case-home");

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(config.urls.manageCaseBaseUrl);
    await this.exuiHeader.checkIsVisible();
  }
}
