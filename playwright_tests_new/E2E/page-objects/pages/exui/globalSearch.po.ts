import { Page } from "@playwright/test";
import { Base } from "../../base";

export class GlobalSearchPage extends Base {
  // locators
  readonly searchCaseIdBox = this.page.getByRole('textbox', { name: '-digit case reference:' });
  readonly searchCaseFindButton = this.page.getByRole('button', { name: 'Find' });
  readonly searchResultsPageHeading = this.page.getByRole('heading', { name: 'Current progress of the case' });
  readonly caseResultsForHeading = this.page.getByRole('heading', { name: 'Case record for HU/53862/' });
  readonly caseHearingCentre = this.page.getByText('Hatton Cross Tribunal Hearing');
  readonly appealReference = this.page.getByText('Appeal reference');


  public async search(caseId: string , page:Page) : Promise<void> {
    await this.searchCaseIdBox.click();
    await this.searchCaseIdBox.fill(caseId);
    await this.searchCaseFindButton.click();

    let validCase = await this.searchResultsPageHeading.isVisible();
    await this.verifyCaseDisplay(validCase,page);

}

  private async verifyCaseDisplay(validCase: boolean, page:Page) {
    if (validCase) {
      await this.caseResultsForHeading.isVisible();
      await this.caseHearingCentre.isVisible();
      await this.appealReference.isVisible();
      expect(this.page.url()).toContain(`cases/case-details/IA/Asylum/${validCase}/#Overview`)

    }
  }

  constructor(page: Page) {
    super(page);
  }

}
