
const { LOG_LEVELS } = require("../../support/constants");
const BrowserWaits = require("../../support/customWaits");
const CucumberReporter = require("../../../codeceptCommon/reportLogger");

class MediaViewerPage{

    constructor(){
        this.mediaViewerContainer = $("exui-media-viewer");

    }

    async isDisplayed(){
        return this.mediaViewerContainer.isPresent();
    }

    async amOnPage(){
        try{
            await BrowserWaits.waitForElement(this.mediaViewerContainer);
            return true;
        }catch(err){
            CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
            return false;
        }
    }

    async clickRedactButton() {
        let redactButton = $(".mv-button.mv-toolbar__menu-button--redact");
        await BrowserWaits.waitForElement(redactButton);
        await redactButton.click();
    }
    
    async clickDrawBoxButton() {
        let drawBoxButton = $(".mv-button.redaction-button--draw");
        await BrowserWaits.waitForElement(drawBoxButton);
        await drawBoxButton.click();
    }
    
    async clickOnDocument() {
        let documentElement = $('.canvasWrapper canvas');
        await documentElement.click();
      }        
    
    async verifyRedactionCreated() {
        let redactionBox = $("div.rectangle");
        await BrowserWaits.waitForElement(redactionBox);
        return await redactionBox.isPresent();
    }

    async verifyRedactionWorking() {
        await this.clickRedactButton();
        await this.clickDrawBoxButton();
        await this.clickOnDocument();
        let redactionBoxCreated = await this.verifyRedactionCreated();
        return redactionBoxCreated;
    }

    async verifyBookmarkWorking() {
        let indexButton = $("#mvIndexBtn");
        let newBookmark = $("#addBookmark");
        let bookmarkRibbon = $(".pageContainer__page-item .bookmark__here");
        await BrowserWaits.waitForElement(indexButton);
        await indexButton.click();
        await BrowserWaits.waitForElement(newBookmark);
        await newBookmark.click();
        await BrowserWaits.waitForElement(bookmarkRibbon);
        return await bookmarkRibbon.isPresent();
    }

    async verifyCommentWorking(page) {
        let commentButton = $('button.aui__toolbar-button-comment[title="Comment"]');
        let saveButton = $("div.aui-comment__footer.commentBtns.ng-star-inserted > button.govuk-button");
        let savedComment = $("div.aui-comment");
        let drawBox = $('button#mvDrawBtn');
        let commentField = $('.aui-comment__content.form-control');
      
        await BrowserWaits.waitForElement(drawBox);
        await drawBox.click();
        await this.clickOnDocument();
        
        await BrowserWaits.waitForElement(commentButton);
        await commentButton.click();
        
        await BrowserWaits.waitForElement(commentField);
        await page.type('.aui-comment__content.form-control', 'test');
        
        await BrowserWaits.waitForElement(saveButton);
        await saveButton.click();
        
        await BrowserWaits.waitForElement(savedComment);
        const isCommentVisible = await savedComment.isPresent();
      
        return isCommentVisible;
      }      

}

module.exports = new MediaViewerPage();