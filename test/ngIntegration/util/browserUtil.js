const jwt = require('jsonwebtoken');
const reportLogger = require('../../e2e/support/reportLogger');
// const addContext = require('mochawesome/addContext');
const MockApp = require('../../nodeMock/app');
const config = require('../config/protractor-cucumber.conf');


const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosOptions = {

};
axios.defaults.withCredentials = true;

const http = axios.create(axiosOptions);

class BrowserUtil{

    async gotoHomePage(){
        await browser.get(config.config.baseUrl);
    }

    setAuthCookie(){
        let token = jwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: 60 * 60 });
        this.addCookie('__auth__', token);
        
    }

    addCookie(cookieName, cookieVal){
        const cookie = {
            name: cookieName,
            value: cookieVal,
            domain: 'localhost:4200',
            path: '/',
            httpOnly: false,
            secure: false,
            session: true,
        };
        browser.manage().addCookie(cookie);
    }
        
    async browserInitWithAuth(roles){
        await this.gotoHomePage();
        this.setAuthCookie();

        if(roles){
            console.log("j:" + JSON.stringify(roles));
            const encodedRoles = encodeURIComponent("j:" + JSON.stringify(roles))
            console.log(encodedRoles);
            this.addCookie('roles', encodedRoles);
        }

        // await this.gotoHomePage();
    }

    setUserDetailsWithRoles(rolesArray) {
        MockApp.onGet('/api/user/details', (req, res) => {
            res.send({
                "canShareCases": true, "sessionTimeout": {
                    "idleModalDisplayTime": 10, "pattern": "-solicitor", "totalIdleTime": 50
                },
                "userInfo": {
                    "id": "***REMOVED***",
                    "forename": "Luke",
                    "surname": "Wilson",
                    "email": "lukesuperuserxui@mailnesia.com",
                    "active": true,
                    "roles": rolesArray
                }
            });
        });
}


    async waitForLD(){
        return await this.waitForNetworkResponse('app.launchdarkly.com/sdk/evalx');
    }

    async waitForNetworkResponse(url){
        let startTime = new Date();
        let elapsedTime = 0;
        let ldDone = false;
        while (!ldDone && elapsedTime < 15) {
            let perf = await browser.executeScript("return window.performance.getEntriesByType('resource')");
            for (let i = 0; i < perf.length; i++) {
                if (perf[i].name.includes(url)) {
                    ldDone = true;
                    await this.stepWithRetry(async () => global.scenarioData['featureToggles'] = (await http.get(perf[i].name, {})).data, 3, 'Get LD feature toggles request')
                    // await browser.sleep(2000);
                    reportLogger.AddMessage("LD response received");
                    //reportLogger.AddJson(global.scenarioData['featureToggles']);
                    return true;
                }
            };
            elapsedTime = (new Date() - startTime) / 1000;
        }
        reportLogger.AddMessage("LD response not received in 15sec");

        return false;
    }

    async addScreenshot(thisTest, onBrowser){
        // addContext(thisTest, {
        //     title: "screenshot",
        //     // value: await reportLogger.getScreenshot(global.screenShotUtils),
        //     value: "test"

        // });
    }


    async stepWithRetry(action, retryCount, stepDesc) {
        retryCount = retryCount ? retryCount : 5;
        let retryCounter = 0;
        while (retryCounter <= retryCount) {
            try {
                return action();
            } catch (e) {
                retryCounter++;
                reportLogger.AddMessage(stepDesc ? stepDesc : '' + " : Error occured " + e);
                reportLogger.AddMessage("Retring attempt  " + retryCounter);
            }
        }
    }


    async getScenarioIdCookieValue(){
        const scenarioId = await browser.manage().getCookie('scenarioId')
        return scenarioId ? scenarioId.value : null;
    }

    async addTextToElementWithCssSelector(cssSelector, text,append){
        return await browser.executeScript( () => {
            let div = document.querySelector(arguments[0]);
            if(div === undefined || div == null){
                return `no element found with query selector ${arguments[0]}`
            }
            if (arguments[2]){
                div.innerHTML += arguments[1];
            }else{
                div.innerHTML = arguments[1];
            }
            return "success";
            
        }, cssSelector, text, append);
    }

    async scrollToElement(element){
        await browser.executeScript('arguments[0].scrollIntoView()',
            element);
    }

}

module.exports = new BrowserUtil();