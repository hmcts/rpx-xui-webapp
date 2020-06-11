var mocha = require('mocha');
const fs = require('fs');

const {conf} = require('../config/config');

module.exports = report;

function report(runner) {
    mocha.reporters.Base.call(this, runner);
    let tests = [];
    let passCounter = 0;
    let failCounter = 0;
    runner.on('pass', function (test) {
        console.log('[pass]%s', test.title);
        tests.push(getTestDetails(test))
        passCounter++;

    });

    runner.on('fail', function (test, err) {
        console.log('[fail]%s(%s)', test.title, err.message);
        // console.log(test);
        tests.push(getTestDetails(test))
        failCounter++;

    });

    runner.on('end', function () {
        // console.log(tests);
        generateReport(passCounter,failCounter,tests);
        process.exit(0);
    });
}

function generateReport(passCount,failCount, tests){
    let reportJson = {
        appName: conf.appName,
        passed: passCount,
        failed: failCount,
        tests:tests
    };

    let sourceReport = __dirname + '/Report.html';
    let destDir = process.env.PWD + "/" + conf.reportPath;
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    } 
    let destReport = destDir+"Report.html"
    let destJson = destDir + "report_output.js"

    fs.copyFileSync(sourceReport, destReport);

    let htmlData = fs.readFileSync(sourceReport, 'utf8');
    var result = 'var replacejsoncontent = ' +JSON.stringify(reportJson);
    fs.writeFileSync(destJson, result);
    copyResources();


}

function getTestDetails(test){
    return {
        name: test.title,
        status: test.state,
        error: test.err ? test.err.message : "",
        a11yResult: test.ctx.a11yResult
    };

}


function copyResources(){
    let resourceDir = process.env.PWD + "/" + conf.reportPath + 'resources/'; 
    let cssDir = resourceDir+ 'css/';
    if (!fs.existsSync(cssDir)) {
        fs.mkdirSync(cssDir, { recursive: true });
    } 
    
    let webfontsDir = resourceDir+'webfonts/';
    if (!fs.existsSync(webfontsDir)) {
        fs.mkdirSync(webfontsDir, { recursive: true });
    }  

    fs.copyFileSync(__dirname + '/resources/angular.min.js', resourceDir+'angular.min.js'); 
    fs.copyFileSync(__dirname + '/resources/css/all.css', cssDir + 'all.css');
    fs.copyFileSync(__dirname + '/resources/webfonts/fa-solid-900.woff2', webfontsDir + 'fa-solid-900.woff2'); 
 

}

module.exports = { generateReport}
