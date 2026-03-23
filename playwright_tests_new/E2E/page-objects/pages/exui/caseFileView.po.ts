import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';

export class CaseFileViewPage extends Base {
  readonly container = this.page.locator('#case-file-view');
  readonly treeContainer = this.container.locator('.document-tree-container').first();
  readonly treeRoot = this.treeContainer.locator('cdk-tree[role="tree"]').first();
  readonly mediaViewerContainer = this.container.locator('.media-viewer-container');
  readonly documentHeader = this.container.locator('.document-folders-header .document-folders-header__title');
  readonly sortButton = this.container.locator('ccd-case-file-view-folder-sort button').first();
  readonly sortMenu = this.page.locator('.cdk-overlay-pane').first();
  readonly sortAscendingOption = this.sortMenu.getByText('A to Z ascending', { exact: true });
  readonly sortDescendingOption = this.sortMenu.getByText('Z to A descending', { exact: true });
  readonly sortRecentFirstOption = this.sortMenu.getByText('Recent first', { exact: true });
  readonly sortOldestFirstOption = this.sortMenu.getByText('Oldest first', { exact: true });

  constructor(page: Page) {
    super(page);
  }

  public async waitForReady(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
    await this.treeContainer.waitFor({ state: 'visible' });
    await this.mediaViewerContainer.waitFor({ state: 'visible' });
  }

  public async getFolderNode(folderPath: string): Promise<Locator> {
    const segments = folderPath.split('.');
    let currentScope = this.treeRoot;
    let folderNode: Locator | undefined;

    for (const segment of segments) {
      folderNode = await this.findDirectChildFolderNode(currentScope, segment);

      const folderButton = folderNode.locator(':scope > button.node[role="treeitem"]').first();
      const icon = folderButton.locator('.node__iconImg').first();
      const isExpanded = await folderButton.getAttribute('aria-expanded');

      await folderButton.waitFor({ state: 'visible' });
      if (isExpanded !== 'true') {
        await icon.click();
      }

      currentScope = folderNode.locator(':scope > div[role="group"]').first();
    }

    if (!folderNode) {
      throw new Error(`Could not resolve folder node for path "${folderPath}"`);
    }

    return folderNode;
  }

  public getFolderName(folderNode: Locator): Locator {
    return folderNode.locator('.node__name--folder:not(.document-tree-invisible)').first();
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

  public async clickFile(folderPath: string, fileName: string): Promise<void> {
    const folderNode = await this.getFolderNode(folderPath);
    await this.getFile(folderNode, fileName).click();
  }

  public getFileUploadStamp(folderNode: Locator, fileName: string): Locator {
    return this.getFile(folderNode, fileName).locator('..').locator('..').locator('.node__document-upload-timestamp').first();
  }

  public async getVisibleFileNamesUnderFolder(folderPath: string): Promise<string[]> {
    const folderNode = await this.getFolderNode(folderPath);
    return folderNode.locator('.document-tree-container__node--document > button .node-name-document').evaluateAll((nodes) =>
      nodes
        .map((node) => {
          const firstTextNode = Array.from(node.childNodes).find((child) => child.nodeType === Node.TEXT_NODE);
          return (firstTextNode?.textContent || '').trim();
        })
        .filter(Boolean)
    );
  }

  public async openSortMenu(): Promise<void> {
    if (await this.sortMenu.isVisible()) {
      return;
    } else {
      await this.sortButton.click();
      await this.sortMenu.waitFor({ state: 'visible' });
    }
  }

  public async sortByAscending(): Promise<void> {
    await this.openSortMenu();
    await this.sortAscendingOption.click();
  }

  public async sortByDescending(): Promise<void> {
    await this.openSortMenu();
    await this.sortDescendingOption.click();
  }

  public async sortByRecentFirst(): Promise<void> {
    await this.openSortMenu();
    await this.sortRecentFirstOption.click();
  }

  public async sortByOldestFirst(): Promise<void> {
    await this.openSortMenu();
    await this.sortOldestFirstOption.click();
  }

  private async findDirectChildFolderNode(scope: Locator, folderName: string): Promise<Locator> {
    const folderNodes = scope.locator(':scope > cdk-nested-tree-node.document-tree-container__folder');
    const folderCount = await folderNodes.count();

    for (let i = 0; i < folderCount; i++) {
      const candidate = folderNodes.nth(i);
      const label = candidate.locator(':scope > button .node__name--folder').first();
      const text = (await label.textContent())?.trim();

      if (text === folderName) {
        await label.waitFor({ state: 'visible' });
        return candidate;
      }
    }

    throw new Error(`Could not resolve direct child folder "${folderName}"`);
  }
}
