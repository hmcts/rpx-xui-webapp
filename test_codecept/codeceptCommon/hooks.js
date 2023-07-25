const event = require('codeceptjs').event;
const output = require('codeceptjs').output;

const fs = require('fs');

const browser = require('./browser')

const codeceptMochawesomeLog = require('./reportLogger')

const e2eTestDataManager = require('../e2e/utils/testDataManager/index');
const mockClient = require('../backendMock/client/index')
const idamLogin = require('../ngIntegration/util/idamLogin');

const isIntegrationTestType = process.env.TEST_TYPE && process.env.TEST_TYPE === 'ngIntegration'

const testType = process.env.TEST_TYPE

function getFeatureFileName(test){
    const filePathSplit = test.file.split('/')
    return filePathSplit[filePathSplit.length - 1]
}

function featureLogsMessage(test, message){
    const fileName = getFeatureFileName(test)
    fs.appendFileSync(`${__dirname}/../../functional-output/tests/codecept-${testType}/featureLogs/${fileName}.txt`, message)
}


module.exports = async function () {

    event.dispatcher.on(event.test.before, async function (test) {
      global.scenarioData = {}
      output.print(`Test started : ${test.title}`)
        codeceptMochawesomeLog.AddMessage(`************ Test started : ${test.title}`)
        await mockClient.logMessage(`************ Test started : ${test.title}`)
        featureLogsMessage(test, `\n ************ Test started : ${test.title}`);

    });




    event.dispatcher.on(event.test.after, async function (test) {
        output.print(`Test ${test.state} : ${test.title}`)
        codeceptMochawesomeLog.AddMessage(`************ Test status:  ${test.state} : ${test.title}`)
        featureLogsMessage(test, `\n************ Test status:  ${test.state} : ${test.title}`);

        actor().flushLogsToReport();
        if (test.state === 'failed' && isIntegrationTestType){
            const authCookies = idamLogin.xuiCallbackResponse.details?.setCookies?.find(cookie => cookie.name === '__auth__')
            const mockSessiondataResponse = await mockClient.getUserSesionData(authCookies ? authCookies.value : null);
            codeceptMochawesomeLog.AddMessage('---------------------- Session mock data and requests ----------------------');
            codeceptMochawesomeLog.AddJson(mockSessiondataResponse.data)
            codeceptMochawesomeLog.AddMessage('---------------------- Session mock data and requests ----------------------');
        }

        await e2eTestDataManager.cleanupForTags(test.tags);
    });


    event.dispatcher.on(event.test.passed, function (test) {
        // output.print(`Test passed : ${test.title}`)
        codeceptMochawesomeLog.AddMessage("************ Test passed")

    });

    event.dispatcher.on(event.test.failed, async function (test) {
        output.print(`Test failed event : ${test.title}`)
        codeceptMochawesomeLog.AddMessage(`************ Test failed : `)
        featureLogsMessage(test, `\n************ Test failed:  ${test.state} : ${test.title}`);

    });


    event.dispatcher.on(event.bddStep.before, function (bddStep) {
        // output.print(`STEP: ${bddStep.keyword} ${bddStep.text} `)
        codeceptMochawesomeLog.AddMessage(`*************** BDD) ${bddStep.keyword} ${bddStep.text}`)

    });


    // event.dispatcher.on(event.step.failed, function (step,err) {
    //     const msg = `***** STEP FAILED ***** : ${step.actor} ${step.name}}`
    //     // output.print(msg)
    //     codeceptMochawesomeLog.AddMessage(msg)
    //     for (const arg of step.args){
    //         codeceptMochawesomeLog.AddMessage(arg)

    //     }
    // });


    // event.dispatcher.on(event.bddStep.after, function (bddStep) {
    //     output.print(`STEP: ${bddStep.keyword} ${bddStep.text} => ${bddStep.status.toUpperCase()}`)
    //     codeceptMochawesomeLog.AddMessage(`STEP: ${bddStep.keyword} ${bddStep.text} => ${bddStep.status.toUpperCase()}`)

    //     if(!bddStep.status.includes('passed')){
    //         return attachBrowserLogs();
    //     }
    // });
}

async function attachBrowserLogs(){
    const logs = await browser.getBrowserLogs();
    for(const log of logs){
        if (log._type !== 'error'){
            continue;
        }
        codeceptMochawesomeLog.AddMessage(`Error: ${log._text}`);
        for(const stacktraceLocation of log._stackTraceLocations){
            if (stacktraceLocation.url.includes('.js')){
                continue;
            }
            codeceptMochawesomeLog.AddMessage(`       ${stacktraceLocation.url}:${stacktraceLocation.lineNumber}`);
        }
    }

}

