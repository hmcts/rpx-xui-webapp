

class CucumberReportLog{

    setScenarioWorld(world){
        this.scenarioWorld = world; 
    }

    AddMessage(message){
        if (!this.scenarioWorld){
            return;
        }
        this.scenarioWorld.attach(new Date().toTimeString() + " : " + message);
        console.log(new Date().toTimeString() + " : " + message)
    }

    AddJson(json){
        if (!this.scenarioWorld) {
            return;
        }
        this.scenarioWorld.attach(JSON.stringify(json, null, 2));
    }

    async AddScreenshot(onbrowser){
        if (!this.scenarioWorld) {
            return;
        }
        const stream = await onbrowser.takeScreenshot(); 
        const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        if(this.scenarioWorld){
            this.scenarioWorld.attach(decodedImage, 'image/png');
        }
       
    }

}

module.exports = new CucumberReportLog();