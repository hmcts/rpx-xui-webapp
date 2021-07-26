
const CucumberReportLogger = require('../../support/reportLogger');

var { defineSupportCode } = require('cucumber');
const ArrayUtil = require("../../utils/ArrayUtil");
const BrowserWaits = require("../../support/customWaits");
const SoftAssert = require('../../../ngIntegration/util/softAssert');
const errorPageObject = require("../pageObjects/common/errorPage");
const MessageBanner = require("../pageObjects/messageBanner");
const headerPage = require("../pageObjects/headerPage");


defineSupportCode(function ({ And, But, Given, Then, When }) {
    const messageBanner = new MessageBanner($('exui-root'));
    Then('I see error message of type {string} displayed with message {string}', async function(errorType, errorMessage){
        const errorTypePage = errorType.toLowercase();
        
        await BrowserWaits.retryWithActionCallback(async () => {
            if (errorTypePage.includes('page')) {
                expect(await errorPageObject.isContainerDisplayed()).to.be.true;
                expect(await errorPageObject.getErrorMessage()).to.include(errorMessage);
            } else if (errorTypePage.includes('banner')) {
                expect(await messageBanner.isBannerMessageDisplayed()).to.be.true
                const bannerMessages = await messageBanner.getBannerMessagesDisplayed();
                const matchingMessages = await ArrayUtil.filter(bannerMessages, async (msg) => { return msg.includes(errorMessage); });
                expect(matchingMessages.length > 1, `${errorMessage} is not displayed, Actual message(s) ${bannerMessages}`).to.be.true;

            } else {
                throw new Error(`${errorType} is not recognised or not implemented in step definition of tests`);
            }
        });
    });


    Then('I validate for error messge type {string}, if it is banner message I see page {string} displayed', async function (errorType, page){
        await BrowserWaits.retryWithActionCallback(async () => {
            if (errorTypePage.includes('page')) {
               return;
            } else if (errorTypePage.includes('banner')) {
                expect(await messageBanner.isBannerMessageDisplayed()).to.be.true
                expect(await headerPage.isPrimaryTabPageDisplayed(page)).to.be.true;

            } else {
                throw new Error(`${errorType} is not recognised or not implemented in step definition of tests`);
            }
        });
    });


});

