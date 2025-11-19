import { Page } from "@playwright/test";
import { Base } from "../../base.ts";


export class CaseDetailsPage extends Base {
  readonly container = this.page.locator("exui-case-details-home");

  constructor(page: Page) {
    super(page);
  }
  
}
