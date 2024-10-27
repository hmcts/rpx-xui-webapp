import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';
import * as path from "path";

export class ManageDocuments extends BasePage {

  pdfFileName='testPdf.pdf';
  constructor(page: Page) {
    super(page);
  }

  async uploadDocuments(type: string,isConfidential: string= 'No') {
    await this.page.getByRole('button',{name:'Add new'}).click();

    const filePath = path.resolve(__dirname, '../documents/test-docs/testPdf.pdf');
    await this.page.setInputFiles('input[type="file"]',filePath);
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('cell',{name:this.pdfFileName}).isVisible();
    await this.page.waitForTimeout(3000);

  }
}
