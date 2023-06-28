
const reassignTaskWorkFlow = require('../workAllocation/reassignTaskWorkflow');
const reallocateWorkflowPage = require('../workAllocation/workFlow');
const BrowserWaits = require('../../../support/customWaits');
const reportLogger = require('../../../../codeceptCommon/reportLogger');


class workFlowUtil{

    getWorlflowPageObject(workFlowPage){
        let workflow = workFlowPage.toLowerCase();
        workflow = workflow.split(' ').join('');

        let workflowPageObject = null;
        switch (workflow) {
            case 'reassigntask':
            case 'assigntask':
                workflowPageObject = reassignTaskWorkFlow;
                break;
            case 'reallocate':
                workflowPageObject = reallocateWorkflowPage;
                break;
            case 'remove':
                workflowPageObject = reallocateWorkflowPage;
                break;
            default:
                throw new Error(`${workFlowPage} / ${workflow} is not recognised or implemented in test step definition`);
        }
        return workflowPageObject;

    }

    async waitForWorkflowPage(workflow){
        const workFlowPageObject = this.getWorlflowPageObject(workflow);
        try{
            await workFlowPageObject.workFlowContainer.waitForPage();
        }catch(e){
            reportLogger.AddMessage(e);
        }
        expect(await workFlowPageObject.workFlowContainer.isDisplayed(), `${workflow} workflow container not displayed`).to.be.true;

    }

}

module.exports = new workFlowUtil();
