

class CucumberReportLog{

    setScenarioWorld(world){
        this.scenarioWorld = world; 
    }

    FormatPrintJson(jsonObj,basePad){
        basePad = basePad ? basePad : 0;
        const keys = Object.keys(jsonObj);

        let maxSize = 0;
        for(let key of keys){
            maxSize = key.length > maxSize ? key.length : maxSize;
        }

        let startPadding = basePad + maxSize + 1;
        for (let key of keys) {
            if (!this.scenarioWorld) {
                return;
            }
            try {
                this.scenarioWorld.attach(`${key.padEnd(startPadding)} : ${jsonObj[key]}`);
            }
            catch (err) {
                console.log("Error occured adding message to report. " + err.stack);
            }
            console.log(`${key.padEnd(startPadding)} : ${jsonObj[key]}`)
        }

    }

    AddMessage(message){
        if (!this.scenarioWorld){
            return;
        }
        try{
            this.scenarioWorld.attach(new Date().toTimeString() + " : " + message);
        }
        catch(err){
            console.log("Error occured adding message to report. "+err.stack);
        }
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
        try {
            this.scenarioWorld.attach(JSON.stringify(json, null, 2));
        }
        catch(err) {
             console.log("Error occured adding message to report. " + err.stack);
        }
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