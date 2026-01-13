import { Page } from "@playwright/test";
import { Base } from "../../base";
//import { expect, test } from "../../../fixtures";


export class SearchCasePage extends Base {
  // Locators
  readonly caseIdTextBox = this.page.getByRole('textbox', { name: '-digit case reference:' });
  readonly searchCaseFindButton = this.page.getByRole('button', { name: 'Find' });
  readonly searchResultsPageHeading = this.page.getByRole('heading', { name: 'Current progress of the case' });
  readonly caseResultsForHeading = this.page.getByRole('heading', { name: 'Case record for HU/53862/' });
  readonly caseHearingCentre = this.page.getByText('Hatton Cross Tribunal Hearing');
  readonly appealReference = this.page.getByRole('caption',{name: 'Appeal reference'});

  public async searchWith16DigitCaseId(caseId: string) : Promise<void> {
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    await this.searchCaseFindButton.click();
}

  constructor(page: Page) {
      super(page);
  }
}
