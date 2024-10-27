import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';
import fileConfig from '../settings/test-docs/file-config';

export class ManageDocuments extends BasePage {

  readonly manageDocumentsTest: Locator;
  readonly uploadNewDocuments: Locator;
  readonly documentType: Locator;
  readonly isThisDocumentConfidential: Locator;
  readonly inputFiles: Locator;
  readonly uploadedDocumentsTest: Locator;
  readonly addNew: Locator;
  readonly no: Locator;

  constructor(page: Page) {
    super(page);
    this.manageDocumentsTest = page.getByRole('heading', { name: 'Manage documents', exact: true });
    this.uploadNewDocuments = page.getByLabel('Upload new documents');
    this.documentType = page.getByLabel('Document type');
    this.isThisDocumentConfidential = page.getByRole('group', { name: 'Is this document  confidential?' });
    this.uploadedDocumentsTest = page.getByRole('group', { name: '1: hearingDocuments.posStmtList###3ad0ca08-1c4c-48' });
    this.addNew = page.getByRole('button', { name: 'Add new' });
    this.no = page.getByRole('radio', { name: 'No' });
  }

  async uploadDocuments(type: string,isConfidential: string= 'No') {
    await this.page.getByLabel('Upload new documents').check();
    await this.clickContinue();

    await this.page.getByRole('textbox', { name: 'Upload a document' })
      .setInputFiles(fileConfig.testPdfFile);

    await this.page.getByLabel('Document type').selectOption(type);

    await this.page.getByRole('checkbox', { name: 'Yes'}).check();
    await this.waitForAllUploadsToBeCompleted();
    await this.clickContinue();
  }
}
