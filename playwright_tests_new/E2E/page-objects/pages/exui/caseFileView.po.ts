import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';

export class CaseFileViewPage extends Base {
  readonly container = this.page.locator('#case-file-view');
  readonly treeContainer = this.container.locator('.document-tree-container').first();
  readonly treeRoot = this.treeContainer.locator('cdk-tree[role="tree"]').first();
  readonly mediaViewerContainer = this.container.locator('.media-viewer-container');
  readonly mediaViewerToolbar = this.mediaViewerContainer.locator('#mvToolbarMain');
  readonly indexButton = this.mediaViewerToolbar.locator('#mvIndexBtn');
  readonly bookmarksButton = this.mediaViewerToolbar.locator('#mvBookmarksBtn');
  readonly highlightButton = this.mediaViewerToolbar.locator('#mvHighlightBtn');
  readonly pageButtonGroup = this.mediaViewerToolbar.locator('#mvPageBtn');
  readonly pageUpButton = this.pageButtonGroup.locator('#mvUpBtn');
  readonly pageDownButton = this.pageButtonGroup.locator('#mvDownBtn');
  readonly moreOptionsButton = this.mediaViewerToolbar.locator('#mvMoreOptionsBtn');
  readonly downloadButton = this.mediaViewerToolbar.locator('#mvDownloadBtn');
  readonly printButton = this.mediaViewerToolbar.locator('#mvPrintBtn');
  readonly mediaViewPanel = this.mediaViewerContainer.locator('#viewerContainer');

  readonly documentHeader = this.container.locator('.document-folders-header .document-folders-header__title');
  readonly sortButton = this.container.locator('ccd-case-file-view-folder-sort button').first();
  readonly sortMenu = this.page.locator('.cdk-overlay-pane').first();
  readonly sortAscendingOption = this.sortMenu.getByText('A to Z ascending', { exact: true });
  readonly sortDescendingOption = this.sortMenu.getByText('Z to A descending', { exact: true });
  readonly sortRecentFirstOption = this.sortMenu.getByText('Recent first', { exact: true });
  readonly sortOldestFirstOption = this.sortMenu.getByText('Oldest first', { exact: true });
  readonly documentActionsMenu = this.page.locator('.overlay-menu').last();
  readonly moveDocumentDialog = this.page.locator('xui-case-file-view-folder-selector');
  readonly moveDocumentSaveButton = this.moveDocumentDialog.getByRole('button', { name: 'Save', exact: true });

  constructor(page: Page) {
    super(page);
  }

  public async waitForReady(): Promise<void> {
    const timeoutMs = this.getRecommendedTimeoutMs({
      min: 10_000,
      max: 30_000,
      multiplier: 3,
      fallback: 15_000,
    });

    await this.container.waitFor({ state: 'visible' });
    await this.treeContainer.waitFor({ state: 'visible' });
    await this.mediaViewerContainer.waitFor({ state: 'visible' });
    await this.documentHeader.waitFor({ state: 'visible', timeout: timeoutMs });
    await this.exuiSpinnerComponent.wait().catch(() => {
      // Some Case File View loads complete without a visible spinner.
    });
    await this.page.waitForFunction(
      ({ containerSelector, emptyStateText }) => {
        const container = document.querySelector(containerSelector);
        if (!container) {
          return false;
        }

        const hasFolderNodes = container.querySelectorAll(
          'cdk-tree[role="tree"] > cdk-nested-tree-node.document-tree-container__folder'
        ).length > 0;
        const hasEmptyState = (container.textContent || '').includes(emptyStateText);

        return hasFolderNodes || hasEmptyState;
      },
      {
        containerSelector: '#case-file-view .document-tree-container',
        emptyStateText: 'No results found',
      },
      { timeout: timeoutMs }
    );
  }

  public async getFolderNode(folderPath: string): Promise<Locator> {
    const segments = folderPath.split('.');
    let currentScope = this.treeRoot;
    let folderNode: Locator | undefined;
    const timeoutMs = this.getRecommendedTimeoutMs({
      min: 10_000,
      max: 30_000,
      multiplier: 2,
      fallback: 15_000,
    });

    for (const segment of segments) {
      folderNode = await this.findDirectChildFolderNode(currentScope, segment, timeoutMs);

      const folderButton = folderNode.locator(':scope > button.node[role="treeitem"]').first();
      const icon = folderButton.locator('.node__iconImg').first();
      const isExpanded = await folderButton.getAttribute('aria-expanded');

      await folderButton.waitFor({ state: 'visible' });
      if (isExpanded !== 'true') {
        await icon.click();
      }

      currentScope = folderNode.locator(':scope > div[role="group"]').first();
      await currentScope.waitFor({ state: 'attached', timeout: timeoutMs }).catch(() => {
        // Leaf folders do not render a child group until expanded or populated.
      });
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

  public getDocumentNode(folderNode: Locator, fileName: string): Locator {
    return this.getFile(folderNode, fileName).locator(
      'xpath=ancestor::cdk-nested-tree-node[contains(@class,"document-tree-container__node--document")][1]'
    );
  }

  public getDocumentActionsTrigger(folderNode: Locator, fileName: string): Locator {
    return this.getDocumentNode(folderNode, fileName).locator('.node__document-options button').first();
  }

  public async clickFile(folderPath: string, fileName: string): Promise<void> {
    const folderNode = await this.getFolderNode(folderPath);
    await this.getFile(folderNode, fileName).click();
  }

  public async openDocumentActions(folderPath: string, fileName: string): Promise<void> {
    const folderNode = await this.getFolderNode(folderPath);
    await this.getDocumentActionsTrigger(folderNode, fileName).click();
    await this.documentActionsMenu.waitFor({ state: 'visible' });
  }

  public getDocumentAction(actionText: string): Locator {
    return this.documentActionsMenu.locator('.overlay-menu__item').filter({ hasText: actionText }).first();
  }

  public async clickDocumentAction(actionText: string): Promise<void> {
    await this.getDocumentAction(actionText).click();
  }

  public async moveDocumentToFolderPath(folderNames: string[]): Promise<void> {
    await this.moveDocumentDialog.waitFor({ state: 'visible' });

    for (const folderName of folderNames) {
      await this.moveDocumentDialog.getByLabel(folderName, { exact: true }).click();
    }

    await this.moveDocumentSaveButton.click();
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

  private async findDirectChildFolderNode(scope: Locator, folderName: string, timeoutMs: number): Promise<Locator> {
    const deadline = Date.now() + timeoutMs;
    let observedFolderNames: string[] = [];

    while (Date.now() < deadline) {
      const folderNodes = scope.locator(':scope > cdk-nested-tree-node.document-tree-container__folder');
      const folderCount = await folderNodes.count();
      observedFolderNames = [];

      for (let i = 0; i < folderCount; i++) {
        const candidate = folderNodes.nth(i);
        const label = candidate.locator(':scope > button .node__name--folder:not(.document-tree-invisible)').first();
        const text = (await label.textContent())?.trim();

        if (!text) {
          continue;
        }

        observedFolderNames.push(text);
        if (text === folderName) {
          await label.waitFor({ state: 'visible', timeout: Math.max(1_000, timeoutMs / 2) });
          return candidate;
        }
      }

      await this.page.waitForTimeout(250);
    }

    const observed = observedFolderNames.length > 0 ? observedFolderNames.join(', ') : 'none';
    throw new Error(`Could not resolve direct child folder "${folderName}". Observed direct children: ${observed}`);
  }
}
