import { expect } from 'chai';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getXSRFToken } from '../utils/authUtil';
import { reporterJson, reporterMsg, setTestContext } from '../utils/helper';
import Request from '../utils/request';
import TaskRequestBody from '../utils/wa/taskRequestBody';


const workAllocationDataModels = require( '../../../dataModels/workAllocation');

describe('Work allocations Release 2: Tasks', () => {
    const userName = config.users[config.testEnv].solicitor.e;
    const password = config.users[config.testEnv].solicitor.sec;

    const caseOfficer = config.users[config.testEnv].caseOfficer_r2.e;
    const caseofficerPass = config.users[config.testEnv].caseOfficer_r2.sec;

    beforeEach(function() {
        setTestContext(this);
        Request.clearSession();
    });

    // tslint:disable-next-line: only-arrow-functions

    it('case officer, My tasks', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = getSearchTaskReqBody("MyTasks", ["3db21928-cbbc-4364-bd91-137c7031fe17"], [config.workallocation[config.testEnv].locationId],'caseworker').getRequestBody();
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
        const actual = response.data;
        const expected = workAllocationDataModels.getRelease2Tasks();
        expect(actual).to.have.all.keys(Object.keys(expected));
        if (actual.tasks.length > 0){
            expect(actual.tasks[0]).to.have.all.keys(Object.keys(expected.tasks[0]));

        }

    });

    it('case officer, Available tasks', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = getSearchTaskReqBody("AvailableTasks", [], [config.workallocation[config.testEnv].locationId], 'caseworker').getRequestBody();
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
        const actual = response.data;
        const expected = workAllocationDataModels.getRelease2Tasks();
        let expectedKeys = Object.keys(expected.tasks[0]);
        expectedKeys = expectedKeys.filter(key => !['assignee', 'work_type_id'].includes(key));

        expect(actual).to.have.all.keys(Object.keys(expected));
        if (actual.tasks.length > 0 ) {
            expect(Object.keys(actual.tasks[0])).to.include.members(expectedKeys);

        }
    });


    it('case officer, `All work tasks`', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = getSearchTaskReqBody("AllWork", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"], [config.workallocation[config.testEnv].locationId], 'caseworker').getRequestBody();
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
        const actual = response.data;
        const expected = workAllocationDataModels.getRelease2Tasks();
        let expectedKeys = Object.keys(expected.tasks[0]);
        expectedKeys = expectedKeys.filter(key => !['assignee', 'work_type_id'].includes(key));

        expect(actual).to.have.all.keys(Object.keys(expected));
        if (actual.tasks.length > 0 ) {
            expect(expectedKeys).to.include.members(Object.keys(actual.tasks[0]));

        }
    });


    it('case officer,Assign to me task', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
        const tasksRes = await getTasks('AvailableTasks', [userDetailsRes.data.userInfo.id], 1);
        const caseworkerRes = await Request.get(`workallocation/caseworker`, headers, 200);


        const idamId = caseworkerRes.data[0].idamId;

        const assignTaskReqBody = {}
        let assignTasksHeader = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(assignTaskReqBody).length
        };
        if (tasksRes.data.tasks.length > 1) {
            const assignTaskRes = await Request.post(`workallocation/task/${tasksRes.data.tasks[0].id}/claim`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes.status).to.equal(204);

            assignTasksHeader = {
                'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
                'content-length': JSON.stringify(assignTaskReqBody).length
            };
            const assignTaskRes2 = await Request.post(`workallocation/task/${tasksRes.data.tasks[1].id}/claim`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes2.status).to.equal(204);

        }

    });


    it('case officer reassign task', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
        const sessionUserIdamId = userDetailsRes.data.userInfo.id ? userDetailsRes.data.userInfo.id : userDetailsRes.data.userInfo.uid;

        const tasksRes = await getTasks('MyTasks', [userDetailsRes.data.userInfo.id], 1);
        const caseworkerRes = await Request.get(`workallocation/caseworker`, headers, 200);


        const idamId = caseworkerRes.data[0].idamId;

        const assignTaskReqBody = { userId: idamId }
        const assignTasksHeader = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(assignTaskReqBody).length
        };
        if (tasksRes.data.tasks.length > 0) {
            const assignTaskRes = await Request.post(`workallocation/task/${tasksRes.data.tasks[0].id}/assign`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes.status).to.equal(204);
        }

    });

    it('case officer Unassign task', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
        const sessionUserIdamId = userDetailsRes.data.userInfo.id ? userDetailsRes.data.userInfo.id : userDetailsRes.data.userInfo.uid;

        const tasksRes = await getTasks('MyTasks', [userDetailsRes.data.userInfo.id], 1);


        const assignTaskReqBody = {}
        const assignTasksHeader = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(assignTaskReqBody).length
        };
        if (tasksRes.data.tasks.length > 0) {
            const assignTaskRes = await Request.post(`workallocation/task/${tasksRes.data.tasks[0].id}/unclaim`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes.status).to.equal(204);
        }

    });


    it('case officer Mark as done/complete task', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const tasksRes = await getTasks('AllWork', [],1);


        const assignTaskReqBody = {}
        const assignTasksHeader = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(assignTaskReqBody).length
        };

        let taskWithAssignee = null;
        for (const task of tasksRes.data.tasks){
            if (task.assignee){
                taskWithAssignee = task.id;
            }
        }
        if (taskWithAssignee) {
            const assignTaskRes = await Request.post(`workallocation/task/${taskWithAssignee}/complete`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes.status).to.equal(204);
        } else {
            reporterMsg('No tasks retuened with assignee, complete task can be performed only on already assigned tasks. skipping complete task step in tests due to data unavailability');
        }


    });


    it('case officer Cancel task/cancel', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const tasksRes = await getTasks('AllWork', [], 1);


        const assignTaskReqBody = {}
        const assignTasksHeader = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(assignTaskReqBody).length
        };
        if (tasksRes.data.tasks.length > 0) {
            const assignTaskRes = await Request.post(`workallocation/task/${tasksRes.data.tasks[0].id}/cancel`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes.status).to.equal(204);
        }

    });

    it('case officer, `Task manager tasks pagination`', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const response = await getTasks('AllWork', [], 1);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.all.keys('tasks', 'total_records');

        console.log(response.data.tasks.length + ' ' + response.data.total_records);
        //expect(response.data.tasks.length).to.equal(response.data.total_records > 10 ? 10 : response.data.total_records );

        const totalRecords = response.data.total_records;
        if (totalRecords > 10) {
            const response2 = await getTasks('AllWork', [], 2);
            expect(response2.status).to.equal(200);
            expect(response2.data).to.have.all.keys('tasks', 'total_records');
            //expect(response.data.tasks.length).to.equal(response.data.total_records > 20 ? 10 : response.data.total_records - 10);

        }

    });

    async function getTasks(view, users,pageNum){
        const reqBodyObj = getSearchTaskReqBody(view, users, [config.workallocation[config.testEnv].locationId], 'caseworker');
        if (pageNum) {
            reqBodyObj.withPageNumber(pageNum);
        }
        const reqBody = reqBodyObj.getRequestBody();
        const headersForGetTasks = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(reqBody).length
        };

        const tasksRes = await Request.post(`workallocation/task`, reqBody, headersForGetTasks, 200);
        const taskIds = [];
        for (const task of tasksRes.data.tasks) {
            taskIds.push(task.id);
        }
        reporterMsg(`"${view}" tasks returned for page "${pageNum}" : ${taskIds.length}`);
        reporterJson(taskIds);
        return tasksRes;
    }

    function getSearchTaskReqBody(view, users, locations ,userType) {
        // const response = await Request.get('api/user/details', null, 200);

        const taskRequestBody = new TaskRequestBody();
        taskRequestBody.inView(view);

        if (locations) {
            locations.forEach(loc => {
                taskRequestBody.searchWithlocation(loc);
            });
        }

        switch (view) {
            case 'MyTasks':
                if (users) {
                    users.forEach(user => {
                        taskRequestBody.searchWithUser(user);
                    });
                } else {
                    taskRequestBody.searchWithUser(null);
                }
                taskRequestBody.searchWithState('assigned');
                taskRequestBody.searchBy(userType ? userType : 'caseworker');
                break;
            case 'AvailableTasks':
                taskRequestBody.searchWithlocation(null);
                taskRequestBody.searchWithState('unassigned');
                taskRequestBody.searchBy(userType ? userType : 'caseworker');

                break;

            case 'AllWork':
                taskRequestBody.searchWithlocation(null);
                taskRequestBody.searchWithUser(null);

                taskRequestBody.searchWithState('assigned');
                taskRequestBody.searchWithState('unassigned');

                taskRequestBody.searchWithJurisdiction('IA');
                taskRequestBody.searchWithTaskType('Legal Ops');

                break;
            default:
                throw new Error(`${view} is not recognized or not implemented in test`);
        }

        return taskRequestBody;
    }

});


