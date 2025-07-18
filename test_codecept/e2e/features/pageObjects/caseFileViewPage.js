const { $, elementByXpath } = require('../../../helpers/globals');

class CaseFileViewPage {
  get container() { return $('#case-file-view'); }
  get header() { return elementByXpath("//div[contains(@id,'case-file-view')]/../h2"); }

  get docTreeContainer() { return $('.document-tree-container').first(); }
  get mediaViewContainer() { return $('.media-viewer-container'); }

  get documentFolderHeader() { return $('.document-folders-header .document-folders-header__title'); }
  get folderViewSortBtn() { return $('ccd-case-file-view-folder-sort button'); }
  get sortDocumentsIcon() { return $('ccd-case-file-view-folder-sort button'); }
  get sortDocumentsMenuContainer() {
    return elementByXpath("//div[contains(@class,'cdk-overlay-pane')]//div[contains(text(),'Sort documents by name')]");
  }

  async getFolderContainer(folderPath) {
    const nodes = folderPath.split('.');
    let folderContainer = null;
    for (const node of nodes) {
      if (!folderContainer) {
        folderContainer = new DocumentTreeContainer(node);
      } else {
        expect(await folderContainer.isDisplayed(), `parent of folder ${node} not displayed`).to.be.true;
        folderContainer = await folderContainer.getChildFolderContainer(node);
      }
    }
    return folderContainer;
  }

  async isSortMenuOptionDisplayed(option) {
    const ele = elementByXpath(`//div[contains(@class,'cdk-overlay-pane')]//span[contains(@class,'overlay-menu__actionText')][contains(text(),'${option}')]`);
    return await ele.isVisible();
  }

  async getFileDisplayedInMediaViewer() {
    const ele = elementByXpath('//title');
    return await ele.textContent();
  }
}

class DocumentTreeContainer {
  constructor(folderName, parentPath) {
    this.folderXpath = `//cdk-nested-tree-node[contains(@class,'document-tree-container__node')]//span[contains(@class,'node__name--folder')][contains(text(),'${folderName}')]`;
    this.folderXpath = `${parentPath ? parentPath : ''}${this.folderXpath}`;
    this.treeContainerNode = `${this.folderXpath}/../..`;

    this.folderElement = elementByXpath(`${this.folderXpath}`).first();
    this.nodeCountElement = elementByXpath(`${this.folderXpath}/..//span[contains(@class,'node__count')]`).first();
    this.nodeIconImg = elementByXpath(`${this.folderXpath}/..//img[contains(@class,'node__iconImg')]`).first();
  }

  async isDisplayed() {
    return await this.folderElement.isVisible();
  }

  async openFolder() {
    const iconImgSrc = await this.nodeIconImg.getAttribute('src');
    if (!iconImgSrc.includes('open')) {
      await this.nodeIconImg.click();
    }
  }

  async closeFolder() {
    if (iconImgSrc.includes('open')) {
      await this.nodeIconImg.click();
    }
  }

  async getChildFolderCountDisplayed() {
    return await this.nodeCountElement.textContent();
  }

  async getChildFolderContainer(childFolderName) {
    await this.openFolder();
    return new DocumentTreeContainer(childFolderName, this.treeContainerNode);
  }

  async getChildFileContainer(childFileName) {
    await this.openFolder();
    return new DocumentContainer(childFileName, this.treeContainerNode);
  }
}

class DocumentContainer {
  constructor(fileName, parentPath) {
    let fileXpath = `//cdk-nested-tree-node[contains(@class,'document-tree-container__node--document')]//span[contains(@class,'node__name node-name-document')][contains(text(),'${fileName}')]`;
    fileXpath = `${parentPath ? parentPath : ''}${fileXpath}`;
    this.treeContainerNode = `${fileXpath}/../..`;

    this.fileElement = elementByXpath(`${fileXpath}`).first();
    this.fileUploadTimestamp = elementByXpath(`${this.treeContainerNode}//span[contains(@class,'node__document-upload-timestamp')]`).first();
  }
}

module.exports = new CaseFileViewPage();