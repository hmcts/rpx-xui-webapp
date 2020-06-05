

const pa11y = require('pa11y');
const assert = require('assert');
const {conf} = require('../config/config');


const fs = require('fs');


async function pa11ytest(test,actions,timeoutVal) {
    console.log("pally test with actions : " + test.test.title);
    console.log(actions);

    let screenshotPath = process.env.PWD + "/" + conf.reportPath + 'assets/';
    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath, { recursive: true });
    }
    screenshotName = Date.now() + '.png'; 
    screenshotPath = screenshotPath + Date.now()+'.png';
    screenshotReportRef = 'assets/' + screenshotName;

    const startTime = Date.now();

    let result;
    try{
        result = await pa11y(conf.baseUrl, {
            "chromeLaunchConfig": { "ignoreHTTPSErrors": false , headless:false } ,
            timeout: 60000,
            screenCapture: screenshotPath,
            // log: {
            //     debug: console.log,
            //     error: console.error,
            //     info: console.info
            // },
            actions: actions
        })
    }catch(err){
        const elapsedTime = Date.now() - startTime;
        console.log("Test Execution time : " + elapsedTime);
        console.log(err);
        throw err;
    }
   
    const elapsedTime = Date.now() - startTime;
    result.executionTime = elapsedTime;
    result.screenshot = screenshotReportRef;
    test.a11yResult = result;
    console.log("Test Execution time : "+elapsedTime);
    assert(result.issues.length === 0, "accessibility issues reported") 
    return result;

}

module.exports = { pa11ytest}
