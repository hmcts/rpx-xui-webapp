import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from './config/config';
import { getUserId, getXSRFToken } from './utils/authUtil';
import Request from './utils/request';
import { setTestContext } from './utils/helper';



describe('Work allocations ', () => {
    const userName = 'lukesuperuserxui@mailnesia.com';
    const password = 'Monday01';

    const admOfficer = 'xui_admofficer@justice.gov.uk';
    const admofficerPass = 'Welcome01';

    const caseOfficer = 'xui_caseofficer@justice.gov.uk';
    const caseofficerPass = 'Welcome01';

    beforeEach(function ()  {
        setTestContext(this);
        Request.clearSession();
    });



    // tslint:disable-next-line: only-arrow-functions


    it('case officer,get locations', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`workallocation/location`, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('case officer,get caseworkers', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`workallocation/caseworker`, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('adm officer, get locations', async function () {
        this.timeout(60000);
        await Request.withSession(admOfficer, admofficerPass);
        const xsrfToken = await getXSRFToken(admOfficer, admofficerPass);

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`workallocation/location`, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('adm officer,get caseworkers', async function () {
        this.timeout(60000);
        await Request.withSession(admOfficer, admofficerPass);
        const xsrfToken = await getXSRFToken(admOfficer, admofficerPass);

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`workallocation/caseworker`, headers, 200);
        expect(response.status).to.equal(200);
    });






    it('adm officer, My tasks', async function () {
        this.timeout(60000);
        await Request.withSession(admOfficer, admofficerPass);
        const xsrfToken = await getXSRFToken(admOfficer, admofficerPass);
       
        const reqBody = await getSearchTaskReqBody("MyTasks", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"]);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody,headers, 200);
        expect(response.status).to.equal(200);
    });

    it('adm officer, Available tasks', async function () {
        this.timeout(60000);
        await Request.withSession(admOfficer, admofficerPass);
        const xsrfToken = await getXSRFToken(admOfficer, admofficerPass);

        const reqBody = await getSearchTaskReqBody("AvailableTasks", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"]);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
    });


    it('case officer, My tasks', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = await getSearchTaskReqBody("MyTasks", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"]);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
    });

    it('case officer, Available tasks', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = await getSearchTaskReqBody("AvailableTasks", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"]);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
    });


    it('case officer, `Task manager tasks`', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = await getSearchTaskReqBody("TaskManager", ["77f9a4a4-1bf1-4903-aa6c-cab334875d91"]);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/task`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
    });

    async function getSearchTaskReqBody(view,users){
        // const response = await Request.get('api/user/details', null, 200); 
        
        const search_parameters = [];
        switch(view){
            case "MyTasks":
                search_parameters.push({
                    "key": "user",
                    "operator": "IN",
                    "values": users
                });
                break;
            case "AvailableTasks":
                search_parameters.push({
                    "key": "location",
                    "operator": "IN",
                    "values": []
                });
                search_parameters.push({
                    "key": "state",
                    "operator": "IN",
                    "values": [
                        "unassigned"
                    ]
                });
                break;

            case "TaskManager":
                search_parameters.push({
                    "key": "location",
                    "operator": "IN",
                    "values": []
                });
                search_parameters.push({
                    "key": "user",
                    "operator": "IN",
                    "values": []
                });

                break;
        }


        return {
            "searchRequest": {
                "search_parameters": search_parameters
            },
            "view": view
        };
    }

});


