import { Page } from "@playwright/test";
import { Base } from "../../base";


export class CaseDetailsPage extends Base {
  readonly container = this.page.locator("exui-case-details-home");
  readonly createCaseSuccessMessage = this.page.locator('.alert-message');
  readonly caseDetailsHeading = this.page.locator('.govuk-heading-xl');

  constructor(page: Page) {
    super(page);
  }

}
