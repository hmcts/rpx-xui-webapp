const event = require('codeceptjs').event;
const output = require('codeceptjs').output;

const browser = require('./browser')

const codeceptMochawesomeLog = require('./reportLogger')

const e2eTestDataManager = require('../e2e/utils/testDataManager/index');

module.exports = async function () {

    event.dispatcher.on(event.test.before, function (test) {
        output.print(`Test started : ${test.title}`)
    });

    event.dispatcher.on(event.test.after, async function (test) {
        output.print(`Test ${test.state} : ${test.title}`)
        actor().flushLogsToReport();
        await e2eTestDataManager.cleanupForTags(test.tags);
    });


    event.dispatcher.on(event.test.passed, function (test) {
        // output.print(`Test passed : ${test.title}`)
        codeceptMochawesomeLog.AddMessage("************ Test passed")

    });

    event.dispatcher.on(event.test.failed, async function (test) {
        output.print(`Test failed event : ${test.title}`)
        codeceptMochawesomeLog.AddMessage(`************ Test failed : `)
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

