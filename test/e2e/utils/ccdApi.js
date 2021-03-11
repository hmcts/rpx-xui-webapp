var Request = require('../utils/request');
var BrowserWaits = require('../support/customWaits');
const CucumberReportLogger = require('../support/reportLogger');
Button = require('../features/pageObjects/webdriver-components/button.js');

class CcdApi {
    constructor() {
        this.userName = 'lukesuperuserxui@mailnesia.com';
        this.password = 'Monday01';
    }
    async getCaseCreationpagesApiRes() {
        await Request.withSession(this.userName, this.password);
        let reqPath = `data/internal/case-types/xuiTestCaseType/event-triggers/createCase?ignore-warning=false`;
        const response = await Request.get(reqPath, { experimental: true });
        expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
        return response.data;
    }
    async getWorkbasketAPIRes(reqPath) {
        await Request.withSession(this.userName, this.password);
        const response = await Request.get(reqPath, { experimental: true });
        expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
        return response.data;
    }

    async getSearchInputsAPIRes(reqPath) {
        await Request.withSession(this.userName, this.password);
        const response = await Request.get(reqPath, { experimental: true });
        expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
        return response.data;
    }

    async getCasesApiReq(reqURL) {
        await Request.withSession(this.userName, this.password);
        let reqData = { size: 25 }
        const response = await Request.post(reqURL, reqData, { experimental: true });
        expect(response.status, `${reqURL} ccd api faild status code: ${response.status}`).to.eql(200);
        return response.data;
    }

    async getCaseResultsResponse() {
        let caseId = await this._getCaseId();
        await Request.withSession(this.userName, this.password);
        let reqPath = `data/internal/cases/${caseId}`;
        console.log("search case URL ::"+reqPath);
        const response = await Request.get(reqPath, { experimental: true });
        expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
        return response.data;
    }


    async _getCaseId() {
        let publicUrl;
        const caseId = await browser.wait(() => {
            return browser.getCurrentUrl().then((url) => {
                publicUrl = url;
                this.caseId = publicUrl.split('/').slice(5, 6).join('/');
                return this.caseId;
            }).catch((error) => {
                return error;
            });
        });
        return caseId;
    }

}
module.exports = new CcdApi(); 
