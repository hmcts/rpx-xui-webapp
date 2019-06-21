'use strict';
const Cucumber = require('cucumber');
const { defineSupportCode } = require('cucumber');
const fs = require('fs');
const mkdirp = require('mkdirp');
const conf = require('../config/conf').config;
// const conf = require('../config/saucelabs.conf').config;
const reporter = require('cucumber-html-reporter');
const report = require('cucumber-html-report');

const jsonReports = `${process.cwd()}/reports/json`;
const htmlReports = `${process.cwd()}/reports/html`;
// var xmlReports = process.cwd() + "/reports/xml";
const targetJson = `${jsonReports}/cucumber_report.json`;
// var targetXML = xmlReports + "/cucumber_report.xml";
const { Given, When, Then } = require('cucumber');


// defineSupportCode(function({After }) {
//     registerHandler("BeforeFeature", { timeout: 500 * 1000 }, function() {
//         var origFn = browser.driver.controlFlow().execute;
//
//         browser.driver.controlFlow().execute = function () {
//             var args = arguments;
//
//             origFn.call(browser.driver.controlFlow(), function () {
//                 //increase or reduce time value, its in millisecond
//                 return protractor.promise.delayed(300);
//             });
//
//             return origFn.apply(browser.driver.controlFlow(), args);
//         };
//         return browser.get(conf.baseUrl);
//     });
//
//     After(function(scenario) {
//         if (scenario.isFailed()) {
//             var attach = this.attach; // cucumber's world object has attach function which should be used
//             return browser.takeScreenshot().then(function(png) {
//                 var decodedImage = new Buffer(png, "base64");
//                 return attach(decodedImage, "image/png");
//             });
//         }
//     });
// x
//     var cucumberReportOptions = {
//         source: targetJson,
//         dest: htmlReports,
//         name: "cucumber_report.html",
//         title: "Cucumber Report"
//     };
//
//     var cucumberReporteroptions = {
//         theme: "bootstrap",
//         jsonFile: targetJson,
//         output: htmlReports + "/cucumber_reporter.html",
//         reportSuiteAsScenarios: true
//     };
//
//     var logFn = string => {
//     if (!fs.existsSync(jsonReports)) {
//         mkdirp.sync(jsonReports);
//     }
//     try {
//         fs.writeFileSync(targetJson, string);
//         reporter.generate(cucumberReporteroptions); //invoke cucumber-html-reporter
//         report
//             .create(cucumberReportOptions)
//             .then(function() {
//                 //invoke cucumber-html-report
//                 // creating two reports(optional) here, cucumber-html-report gives directory already exists as cucumber-html-reporter already creates the html dir!
//                 // suggestion- use either one of the reports based on your needs
//                 console.log("cucumber_report.html created successfully!");
//             })
//             .catch(function(err) {
//                 if (err) {
//                     console.error(err);
//                 }
//             });
//     } catch (err) {
//         if (err) {
//             console.log("Failed to save cucumber test results to json file.");
//             console.log(err);
//         }
//     }
// };
// var jsonformatter = new Cucumber.JsonFormatter({
//     log: logFn
// });
// registerListener(jsonformatter);

// });


defineSupportCode(({ After }) => {
    After(function(scenario, done) {
        const world = this;
        if (scenario.result.status === 'failed') {
            browser.takeScreenshot().then(stream => {
                const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                world.attach(decodedImage, 'image/png');
            })
                .then(() => {
                    done();
                });
        } else {
            done();
        }
    });
});
