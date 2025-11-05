import { Page } from "@playwright/test";
import { Base } from "../../base";
import config from "../../../../config";

export class CaseDetailsPage extends Base {
  readonly container = this.page.locator("exui-case-details-home");

  constructor(page: Page) {
    super(page);
  }
  
  async routeToCasePage(page, caseId: string) {
      const casePageUrl = config.CaseBaseURL + '/case-details/' + caseId;
      console.log("Going to case details page:" + casePageUrl);
      await page.goto(casePageUrl);
  }
}
