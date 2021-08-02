


class FeatureToggleUtil{

    getFeatureToggleValue(featureToggleName){
        const featurToggles = global.scenarioData['featureToggles'];
        if (!featurToggles){
            throw new Error('Feature toggle is not yet set to global scenario data. please check if wait for LD from browser util is called.');
        }

        return featurToggles[featureToggleName].value;

    }

}

module.exports = new FeatureToggleUtil();