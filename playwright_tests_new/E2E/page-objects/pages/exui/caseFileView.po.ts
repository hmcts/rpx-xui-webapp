import { expect, Locator, Page } from '@playwright/test';
import { Base } from '../../base';

export class CaseFileViewPage extends Base {
  readonly container = this.page.locator('#case-file-view');
  readonly treeContainer = this.container.locator('.document-tree-container').first();
  readonly mediaViewerContainer = this.container.locator('.media-viewer-container');
  readonly documentHeader = this.container.locator('.document-folders-header .document-folders-header__title');
  readonly sortButton = this.container.locator('ccd-case-file-view-folder-sort button').first();
  readonly sortMenu = this.page.locator('.cdk-overlay-pane').first();

  constructor(page: Page) {
    super(page);
  }

  public async waitForReady(): Promise<void> {
    await expect(this.container).toBeVisible();
    await expect(this.treeContainer).toBeVisible();
    await expect(this.mediaViewerContainer).toBeVisible();
  }

  public async getFolderNode(folderPath: string): Promise<Locator> {
    const segments = folderPath.split('.');
    let currentScope = this.treeContainer;
    let folderNode: Locator | undefined;

    for (const segment of segments) {
      folderNode = currentScope
        .locator(':scope > cdk-nested-tree-node.document-tree-container__node')
        .filter({ hasText: segment })
        .first();
      await expect(folderNode.locator('.node__name--folder', { hasText: segment }).first()).toBeVisible();
      const icon = folderNode.locator('.node__iconImg').first();
      const src = await icon.getAttribute('src');
      if (!src?.includes('open')) {
        await icon.click();
      }
      currentScope = folderNode.locator(':scope > div > div[role="group"], :scope > div[role="group"]').first();
    }

    if (!folderNode) {
      throw new Error(`Could not resolve folder node for path "${folderPath}"`);
    }

    return folderNode;
  }

  public getFolderName(folderNode: Locator): Locator {
    return folderNode.locator('.node__name--folder').first();
  }

  public getFolderCount(folderNode: Locator): Locator {
    return folderNode.locator('.node__count').first();
  }

  public getFile(folderNode: Locator, fileName: string): Locator {
    return folderNode
      .locator('.document-tree-container__node--document .node-name-document')
      .filter({ hasText: fileName })
      .first();
  }

  public getFileUploadStamp(folderNode: Locator, fileName: string): Locator {
    return this.getFile(folderNode, fileName).locator('..').locator('..').locator('.node__document-upload-timestamp').first();
  }

  public async getVisibleFileNamesUnderFolder(folderPath: string): Promise<string[]> {
    const folderNode = await this.getFolderNode(folderPath);
    return folderNode
      .locator('.document-tree-container__node--document .node-name-document')
      .evaluateAll((nodes) => nodes.map((node) => (node.textContent || '').trim()).filter(Boolean));
  }
}
