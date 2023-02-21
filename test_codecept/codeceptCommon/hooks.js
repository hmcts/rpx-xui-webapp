const event = require('codeceptjs').event;
const output = require('codeceptjs').output;

const browser = require('./browser')

const codeceptMochawesomeLog = require('./reportLogger')

module.exports = function () {

    event.dispatcher.on(event.test.before, function (test) {
        output.print(`Test started : ${test.title}`)
        // codeceptMochawesomeLog.AddMessage("************ Test started")
    });

    // event.dispatcher.on(event.test.after, function (test) {
    //     output.print(`Test completed : ${test.title}`)
    // });


    event.dispatcher.on(event.test.passed, function (test) {
        // output.print(`Test passed : ${test.title}`)
        codeceptMochawesomeLog.AddMessage("************ Test passed")

    });

    event.dispatcher.on(event.test.failed, function (test) {
        // output.print(`Test failed : ${test.title}`)
        codeceptMochawesomeLog.AddMessage("************ Test failed")


    });

    
    event.dispatcher.on(event.bddStep.before, function (bddStep) {
        // output.print(`STEP: ${bddStep.keyword} ${bddStep.text} `)
        codeceptMochawesomeLog.AddMessage(`BDD: ${bddStep.keyword}${bddStep.keyword !== 'Given' ? ' ':''} ${bddStep.text}`)

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


    // });
}

function attachBrowserLogs(){
    codeceptMochawesomeLog.AddJson(browser.getBrowserLogs())
}

