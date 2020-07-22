

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

    async AddScreenshot(browser){
        const stream = await browser.takeScreenshot(); 
        const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        this.scenarioWorld.attach(decodedImage, 'image/png');
    }

}

module.exports = new CucumberReportLog();