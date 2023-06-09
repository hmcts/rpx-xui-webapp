
let { reportObj} = require('../helpers/accessibilityAuditor');
const { generateReport} = require('../reporter/customReporter');

module.exports = function report(){;
    generateReport(reportObj.pass, reportObj.fail, reportObj.tests);

}





