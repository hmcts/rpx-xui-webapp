

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

    AddMessageToReportOnly(message) {
        if (!this.scenarioWorld) {
            return;
        }
        this.scenarioWorld.attach(new Date().toTimeString() + " : " + message);
    }

    AddJson(json){
        if (!this.scenarioWorld) {
            return;
        }
        this.scenarioWorld.attach(JSON.stringify(json, null, 2));
        console.log(JSON.stringify(json, null, 2));
    }

    AddJsonToReportOnly(json) {
        if (!this.scenarioWorld) {
            return;
        }
        this.scenarioWorld.attach(JSON.stringify(json, null, 2));
    }

    async AddScreenshot(onbrowser){
        onbrowser = onbrowser ? onbrowser : browser; 
        if (!this.scenarioWorld) {
            return;
        }
        const decodedImage = await this.getScreenshot(onbrowser);
        this.scenarioWorld.attach(decodedImage, 'image/png');
       
    }

    async getScreenshot(onbrowser){
        const scrrenshotBrowser = onbrowser ? onbrowser : browser;
        const stream = await scrrenshotBrowser.takeScreenshot();
        const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        return decodedImage; 
    }

}

module.exports = new CucumberReportLog();