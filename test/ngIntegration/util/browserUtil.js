const jwt = require('jsonwebtoken');
const reportLogger = require('../../e2e/support/reportLogger');
// const addContext = require('mochawesome/addContext');
const MockApp = require('../../nodeMock/app');
const config = require('../config/protractor-cucumber.conf');
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
                    "id": "41a90c39-d756-4eba-8e85-5b5bf56b31f5",
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
            perf.forEach((perfitem) => {
                if (perfitem.name.includes(url)) {
                    ldDone = true;
                    // await browser.sleep(2000);
                    reportLogger.AddMessage("LD response received");
                    return true;
                }
            });
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

}

module.exports = new BrowserUtil();