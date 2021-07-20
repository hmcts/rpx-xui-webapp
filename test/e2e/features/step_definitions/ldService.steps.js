
var CaseListPage = require("../pageObjects/CaseListPage");
const CucumberReportLogger = require('../../support/reportLogger');


var { defineSupportCode } = require('cucumber');
const { browser } = require("protractor");
const BrowserWaits = require("../../support/customWaits");
const SoftAssert = require('../../../ngIntegration/util/softAssert');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I validate launch darkly feature toggles response received', async function(){ 
        expect(global.scenarioData['featureToggles']).to.not.be.a('null');
    });

    Then('I validate launch darkly feature toggle values', async function(featureToggleValuesDataTable){
        const softAssert = new SoftAssert();
        const featureToggleHashes = featureToggleValuesDataTable.hashes();
        const ldfeatureToggles = global.scenarioData['featureToggles'];
        for (let i = 0; i < featureToggleHashes.length; i++){
            const toggleName = featureToggleHashes[i].name;
          
            softAssert.setScenario('Toggle with name exists');
            await softAssert.assert(() => expect(ldfeatureToggles.hasOwnProperty(toggleName), toggleName+" does not exist").to.be.true);

            let toggleValue = null;
            if (featureToggleHashes[i].valueType.includes('bool')){
                toggleValue = featureToggleHashes[i].value === 'true' || featureToggleHashes[i].value === 'on' ? true : false;
            } else if (featureToggleHashes[i].valueType.includes('string')) {
                toggleValue = featureToggleHashes[i].value;
            }else{
                throw new Error("Expected feature toggle value type nt recognized");
            }
             
            softAssert.setScenario('Toggle value match');
            await softAssert.assert(() => expect(ldfeatureToggles[toggleName].value, toggleName+" value not matching").to.equal(toggleValue));

        } 

        softAssert.finally();
    });

   



});