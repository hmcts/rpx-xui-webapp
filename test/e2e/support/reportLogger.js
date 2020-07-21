

class CucumberReportLog{

    setScenarioWorld(world){
        this.scenarioWorld = world; 
    }

    AddMessage(message){
        this.scenarioWorld.attach(message);
    }

    AddJson(json){
        this.scenarioWorld.attach(JSON.stringify(json, null, 2));
    }

    AddScreenshot(decodedImage){
        this.scenarioWorld.world.attach(decodedImage, 'image/png');
    }

}

module.exports = new CucumberReportLog();