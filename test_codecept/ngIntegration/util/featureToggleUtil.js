

const CucumberReporter = require("../../codeceptCommon/reportLogger");
class FeatureToggleUtil{

    getFeatureToggleValue(featureToggleName){
        const featurToggles = global.scenarioData['featureToggles'];
        if (!featurToggles){
            throw new Error('Feature toggle is not yet set to global scenario data. please check if wait for LD from browser util is called.');
        }

        return featurToggles[featureToggleName].value;

    }

    printFeatureToggleValue(featureToggleName){
        CucumberReporter.AddMessage(`Feature toggle value for ${featureToggleName}`);
        CucumberReporter.AddJson(this.getFeatureToggleValue(featureToggleName));
    }

}

module.exports = new FeatureToggleUtil();