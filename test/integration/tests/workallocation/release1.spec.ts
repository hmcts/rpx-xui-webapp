import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getUserId, getXSRFToken } from '../utils/authUtil';
import Request from '../utils/request';
import { setTestContext } from '../utils/helper';

import TaskRequestBody from '../utils/wa/taskRequestBody';

import { testWithRetry } from '../utils/helper'

describe('Work allocations MVP', () => {
    const userName = config.users[config.testEnv].solicitor.e;
    const password = config.users[config.testEnv].solicitor.sec;

    const caseOfficer = config.users[config.testEnv].caseOfficer_r1.e;
    const caseofficerPass = config.users[config.testEnv].caseOfficer_r1.sec;

    beforeEach(function () {
        this.timeout(120000);

        setTestContext(this);
        Request.clearSession();
    });



    // tslint:disable-next-line: only-arrow-functions


    it('case officer,get locations', async function () {

        await testWithRetry(async () => {
            await Request.withSession(caseOfficer, caseofficerPass);
            const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

            const headers = {
                'X-XSRF-TOKEN': xsrfToken,
            };

            const response = await Request.get(`workallocation/location`, headers, 200);
            expect(response.status).to.equal(200);
        });
 
    });

    it('case officer,get caseworkers', async function () {
        await testWithRetry(async () => {
            await Request.withSession(caseOfficer, caseofficerPass);
            const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

            const headers = {
                'X-XSRF-TOKEN': xsrfToken,
            };

            const response = await Request.get(`workallocation/caseworker`, headers, 200);
            expect(response.status).to.equal(200);

        });
 
    });

    it('case officer, My tasks', async function () {
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = getSearchTaskReqBody("MyTasks", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"], null).getRequestBody();
        
        delete reqBody.searchRequest.search_by;
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length,
            'content-type': 'application/json' 
        };

        const response = await Request.post(`workallocation/taskWithPagination`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('case officer, Available tasks', async function () {
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = getSearchTaskReqBody("AvailableTasks", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"], null).getRequestBody();
        delete reqBody.searchRequest.search_by;

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length,
            'content-type': 'application/json' 
        };

        const response = await Request.post(`workallocation/taskWithPagination`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
    });


    it('case officer, `Task manager tasks`', async function () {
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = getSearchTaskReqBody("TaskManager", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"], null).getRequestBody();
        delete reqBody.searchRequest.search_by;

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length,
            'content-type':'application/json' 
        };

        const response = await Request.post(`workallocation/taskWithPagination`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
    });


    // it('case officer,Assign to me task', async function () {
    //     await Request.withSession(caseOfficer, caseofficerPass);
    //     const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
    //     const headers = {
    //         'X-XSRF-TOKEN': xsrfToken,
    //     };

    //     const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
    //     const loggedInUserId = userDetailsRes.data.userInfo.id ? userDetailsRes.data.userInfo.id : userDetailsRes.data.userInfo.uid;
    //     const reqBody = getSearchTaskReqBody("AvailableTasks", [loggedInUserId], null).getRequestBody();
    //     const headersForGetTasks = {
    //         'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
    //         'content-length': JSON.stringify(reqBody).length
    //     };

    //     const tasksRes = await Request.post(`workallocation/task`, reqBody, headersForGetTasks, 200);
    //     const caseworkerRes = await Request.get(`workallocation/caseworker`, headers, 200);


    //     const idamId = caseworkerRes.data[0].idamId;

    //     const assignTaskReqBody = {}
    //     let assignTasksHeader = {
    //         'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
    //         'content-length': JSON.stringify(assignTaskReqBody).length
    //     };

    //     let i = 1;
    //     while (tasksRes.data.tasks.length > i && i < 5){
           
    //         const assignTaskRes = await Request.post(`workallocation/task/${tasksRes.data.tasks[i - 1].id}/claim`, assignTaskReqBody, assignTasksHeader, 204);
    //         expect(assignTaskRes.status).to.equal(204);
    //         i++;
    //     }


        
    // });


    it('case officer reassign task', async function () {
        await testWithRetry(async () => {
            await Request.withSession(caseOfficer, caseofficerPass);
            const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
            const headers = {
                'X-XSRF-TOKEN': xsrfToken,
            };

        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
        const sessionUserIdamId = userDetailsRes.data.userInfo.id ? userDetailsRes.data.userInfo.id : userDetailsRes.data.userInfo.uid;
        const reqBody = getSearchTaskReqBody("MyTasks", [sessionUserIdamId], null).getRequestBody();
        delete reqBody.searchRequest.search_by;

        const headersForGetTasks = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(reqBody).length,
            'content-type': 'application/json' 
        };

            const tasksRes = await Request.post(`workallocation/taskWithPagination`, reqBody, headersForGetTasks, 200);
            const caseworkerRes = await Request.get(`workallocation/caseworker`, headers, 200);


        const idamId = caseworkerRes.data[0].idamId;

        const assignTaskReqBody = { userId: idamId }
        const assignTasksHeader = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(assignTaskReqBody).length,
            'content-type': 'application/json' 
        };
        if (tasksRes.data.tasks.length > 0) {
            const assignTaskRes = await Request.post(`workallocation/task/${tasksRes.data.tasks[0].id}/assign`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes.status).to.equal(204);
        }

    });

    it('case officer Unassign task', async function () {
        await testWithRetry(async () => {
            await Request.withSession(caseOfficer, caseofficerPass);
            const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
            const headers = {
                'X-XSRF-TOKEN': xsrfToken,
            };

            const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
            const sessionUserIdamId = userDetailsRes.data.userInfo.id ? userDetailsRes.data.userInfo.id : userDetailsRes.data.userInfo.uid;

        const reqBody = getSearchTaskReqBody("MyTasks", [sessionUserIdamId], null).getRequestBody();
        delete reqBody.searchRequest.search_by;

        const headersForGetTasks = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(reqBody).length,
            'content-type': 'application/json' 
        };

            const tasksRes = await Request.post(`workallocation/taskWithPagination`, reqBody, headersForGetTasks, 200);


        const assignTaskReqBody = {}
        const assignTasksHeader = {
            'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
            'content-length': JSON.stringify(assignTaskReqBody).length,
            'content-type': 'application/json' 
        };
        if (tasksRes.data.tasks.length > 0) {
            const assignTaskRes = await Request.post(`workallocation/task/${tasksRes.data.tasks[0].id}/unclaim`, assignTaskReqBody, assignTasksHeader, 204);
            expect(assignTaskRes.status).to.equal(204);
        }

        }); 
    });


    it('case officer Mark as done/complete task', async function () {
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };


        const locationsResponse = await Request.get(`workallocation/location`, headers, 200);

        const locations = [];
        for (const loc of locationsResponse.data) {
            locations.push(loc.id);
        }
        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
        const sessionUserIdamId = userDetailsRes.data.userInfo.id ? userDetailsRes.data.userInfo.id : userDetailsRes.data.userInfo.uid;
        const reqBody = getSearchTaskReqBody("TaskManager", [sessionUserIdamId],[]).getRequestBody();
        delete reqBody.searchRequest.search_by;

        const headersForGetTasks = {
                'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
                'content-length': JSON.stringify(reqBody).length,
                'content-type': 'application/json' 
            };

        const tasksRes = await Request.post(`workallocation/taskWithPagination`, reqBody, headersForGetTasks, 200);

            const assignTaskReqBody = {}
            const assignTasksHeader = {
                'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
                'content-length': JSON.stringify(assignTaskReqBody).length,
                'content-type': 'application/json' 

            };
            if (tasksRes.data.tasks.length > 0) {
                const taskIdToTest = tasksRes.data.tasks[0].id;
                const testassignTaskReqBody = { userId: "dfd4c2d1-67b1-40f9-8680-c9551632f5d9" }
                const testassignTasksHeader = {
                    'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
                    'content-length': JSON.stringify(testassignTaskReqBody).length,
                    'content-type': 'application/json' 
                };

                const assignTaskRes = await Request.post(`workallocation/task/${taskIdToTest}/assign`, testassignTaskReqBody, testassignTasksHeader, 204);
                expect(assignTaskRes.status).to.equal(204);

                const completaskRes = await Request.post(`workallocation/task/${taskIdToTest}/complete`, assignTaskReqBody, assignTasksHeader, 204);
                expect(completaskRes.status).to.equal(204);
            }

        });

    });


    it('case officer Cancel task/cancel', async function () {
        await testWithRetry(async () => {
            await Request.withSession(caseOfficer, caseofficerPass);
            const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
            const headers = {
                'X-XSRF-TOKEN': xsrfToken,
            };
            const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);
            const sessionUserIdamId = userDetailsRes.data.userInfo.id ? userDetailsRes.data.userInfo.id : userDetailsRes.data.userInfo.uid;

            const reqBody = getSearchTaskReqBody("TaskManager", [sessionUserIdamId],[]).getRequestBody();
            delete reqBody.searchRequest.search_by;

            const headersForGetTasks = {
                'X-XSRF-TOKEN': await getXSRFToken(caseOfficer, caseofficerPass),
                'content-length': JSON.stringify(reqBody).length
            };

            const tasksRes = await Request.post(`workallocation/taskWithPagination`, reqBody, headersForGetTasks, 200);
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
    });

    it('case officer, `Task manager tasks pagination`', async function () {
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const taskRequestObj = getSearchTaskReqBody("TaskManager", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"], null);
        taskRequestObj.withPageNumber(1);

        const reqBody = taskRequestObj.getRequestBody()
        delete reqBody.searchRequest.search_by;

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/taskWithPagination`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.all.keys('tasks', 'total_records');

        console.log(response.data.tasks.length + " " + response.data.total_records);
        //expect(response.data.tasks.length).to.equal(response.data.total_records > 10 ? 10 : response.data.total_records );

        const totalRecords = response.data.total_records;
        if (totalRecords > 10) {
            taskRequestObj.withPageNumber(2);
            const response = await Request.post(`workallocation/taskWithPagination`, reqBody, headers, 200);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.all.keys('tasks', 'total_records');

            console.log(response.data.tasks.length + " " + response.data.total_records);
            //expect(response.data.tasks.length).to.equal(response.data.total_records > 10 ? 10 : response.data.total_records );

            const totalRecords = response.data.total_records;
            if (totalRecords > 10) {
                taskRequestObj.withPageNumber(2);
                const response = await Request.post(`workallocation/taskWithPagination`, reqBody, headers, 200);
                expect(response.status).to.equal(200);
                expect(response.data).to.have.all.keys('tasks', 'total_records');
                //expect(response.data.tasks.length).to.equal(response.data.total_records > 20 ? 10 : response.data.total_records - 10);

            }

        } 
    });

    function getSearchTaskReqBody(view, users, locations) {
        // const response = await Request.get('api/user/details', null, 200); 

        const taskRequestBody = new TaskRequestBody();
        taskRequestBody.inView(view);

        if (users) {
            users.forEach(user => {
                taskRequestBody.searchWithUser(user);
            });
        } else {
            taskRequestBody.searchWithAllUsers();
        }

        if (locations) {
            locations.forEach(loc => {
                taskRequestBody.searchWithlocation(loc);
            });
        } else {
            taskRequestBody.searchWithAllLocations();
        }
        delete taskRequestBody.requestBody.searchRequest.search_by; 
        return taskRequestBody;
    }

});
