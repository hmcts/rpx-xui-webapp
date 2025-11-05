import { Page } from "@playwright/test";
import { Base } from "../../base";

export class CaseListPage extends Base {
  readonly container = this.page.locator("exui-case-home");

  constructor(page: Page) {
    super(page);
  }

}
