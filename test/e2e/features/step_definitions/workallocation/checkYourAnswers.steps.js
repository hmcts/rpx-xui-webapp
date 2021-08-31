var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');

const exclusionWorkFlow = require("../../pageObjects/workAllocation/exclusionRolesWorkFlow");
const allocateRoleWorkFlow = require("../../pageObjects/workAllocation/allocateRoleWorkFlow");
const checkYourAnswersPage = require("../../pageObjects/workAllocation/common/checkYourAnswersPage");

defineSupportCode(function ({ And, But, Given, Then, When }) {


    Then('I see Check your answers page has total {int} questions', async function (expectedQuestionsCount) {
        expect(await checkYourAnswersPage.getTotalQuestionsCount()).to.equal(expectedQuestionsCount);
    });

    Then('I see Check your answers page has questions and answers with change link', async function (datatable) {
        const questionAnswersTable = datatable.hashes();
        for (let i = 0; i < questionAnswersTable.length; i++) {
            const question = questionAnswersTable[i]['Question'];
            const expectedAnswer = questionAnswersTable[i]['Answer'];
            expect(await checkYourAnswersPage.isQuestionRowPresent(question), `${question} is not displayed`).to.be.true;

            const actualAnswer = await checkYourAnswersPage.getAnswerForQuestion(question);
            expect(actualAnswer, `expected answer for question ${question} does not match`).to.include(expectedAnswer);
            expect(await checkYourAnswersPage.isChangeLinkPresentForQuestion(question), `change link for ${question} is not present`).to.be.true;
        }
    });

    When('I click change link for question {string} in check your answers page', async function (question) {
        await checkYourAnswersPage.clickChangeForQuestion(question)
    });

    When('I click button with label {string} in add exclusion work Check your answers page', async function (submitBtnLabel) {
        const continuebuttonText = await exclusionWorkFlow.workFlowContainer.getContinueButtonLabel();
        expect(continuebuttonText).to.include(submitBtnLabel);
        await exclusionWorkFlow.workFlowContainer.clickContinue();
    });

    When('I click button with label {string} in Allocate role work flow  Check your answers page', async function (submitBtnLabel) {
        const continuebuttonText = await allocateRoleWorkFlow.workFlowContainer.getContinueButtonLabel();
        expect(continuebuttonText).to.include(submitBtnLabel);
        await allocateRoleWorkFlow.workFlowContainer.clickContinue();
    });


});

