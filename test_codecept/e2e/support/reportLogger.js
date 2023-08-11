

const {LOG_LEVELS} = require("../support/constants")
class CucumberReportLog{

    setScenarioWorld(world){
        this.scenarioWorld = world;
        this.logLevel = process.env.LOG_LEVEL !== undefined ? process.env.LOG_LEVEL : LOG_LEVELS.Debug; 
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

    LogTestDataInput(message){
        this.AddMessage(`>>>>>>> [ Test data input ]: ${message}`);
    }

    AddMessage(message, logLevel){
        if (!this._isLevelEnabled(logLevel)) return;

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

    AddMessageToReportOnly(message, logLevel) {
        if (!this._isLevelEnabled(logLevel)) return;

        if (!this.scenarioWorld) {
            return;
        }
        this.scenarioWorld.attach(new Date().toTimeString() + " : " + message);
    }

    AddJson(json, logLevel){
        if (!this._isLevelEnabled(logLevel)) return;

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

    AddJsonToReportOnly(json, logLevel) {
        if (!this._isLevelEnabled(logLevel)) return;

        if (!this.scenarioWorld) {
            return;
        }
        this.scenarioWorld.attach(JSON.stringify(json, null, 2));
    }

    async AddScreenshot(onbrowser, logLevel){
        if (!this._isLevelEnabled(logLevel)) return;

        onbrowser = onbrowser ? onbrowser : browser; 
        if (!this.scenarioWorld) {
            return;
        }
        const decodedImage = await this.getScreenshot(onbrowser);
        await this.scenarioWorld.attach(decodedImage, 'image/png');
       
    }

    async getScreenshot(onbrowser){
        const scrrenshotBrowser = onbrowser ? onbrowser : browser;
        const stream = await scrrenshotBrowser.takeScreenshot();
        const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        return decodedImage; 
    }

    _isLevelEnabled(msgLoglevel){
        msgLoglevel = msgLoglevel !== undefined ? msgLoglevel : LOG_LEVELS.Info;  
        return msgLoglevel >= this.logLevel; 
    }

}

module.exports = new CucumberReportLog();