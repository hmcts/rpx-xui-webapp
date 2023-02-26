const browser = require('./browser')

class CodeceptMochawesomeLog{
    getDate(){
        const d = new Date();
        const hh = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
        const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
        const ss = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();

        return `[${hh}:${mm }:${ss}]`
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
            try {
                browser.get_I().addMochawesomeContext(`${key.padEnd(startPadding)} : ${jsonObj[key]}`);
            }
            catch (err) {
                console.log("Error occured adding message to report. " + err.stack);
            }
            console.log(`${key.padEnd(startPadding)} : ${jsonObj[key]}`)
        }

    }

    LogTestDataInput(message){
        browser.get_I().addMochawesomeContext(`>>>>>>> [ Test data input ]: ${message}`);
    }

    AddMessage(message, logLevel){
        // if (!this._isLevelEnabled(logLevel)) return;

        try{
            browser.get_I().addMochawesomeContext(this.getDate() + message);
        }
        catch(err){
            console.log("Error occured adding message to report. "+err.stack);
        }
        console.log( message)
    }

    AddMessageToReportOnly(message, logLevel) {
        // if (!this._isLevelEnabled(logLevel)) return;

        browser.get_I().addMochawesomeContext(this.getDate() + message);
    }

    AddJson(json, logLevel){
        // if (!this._isLevelEnabled(logLevel)) return;

        try {
            browser.get_I().addMochawesomeContext(JSON.stringify(json, null, 2));
        }
        catch(err) {
             console.log("Error occured adding message to report. " + err.stack);
        }
        console.log(JSON.stringify(json, null, 2));
    }

    AddJsonToReportOnly(json, logLevel) {
        // if (!this._isLevelEnabled(logLevel)) return;
        I.addMochawesomeContext(JSON.stringify(json, null, 2));
    }

    async AddScreenshot(onbrowser, logLevel){
        // if (!this._isLevelEnabled(logLevel)) return;

        // const decodedImage = await this.getScreenshot(onbrowser);
        // await browser.get_I().addMochawesomeContext(decodedImage, 'image/png');
        this.AddMessage(`!!! Add screenshot not implemented !!!`)
    }

    async getScreenshot(onbrowser){
        const scrrenshotBrowser = onbrowser ? onbrowser : browser;
        const stream = await scrrenshotBrowser.takeScreenshot();
        const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        return decodedImage; 
    }

    // _isLevelEnabled(msgLoglevel){
    //     msgLoglevel = msgLoglevel !== undefined ? msgLoglevel : LOG_LEVELS.Info;  
    //     return msgLoglevel >= this.logLevel; 
    // }

}

module.exports = new CodeceptMochawesomeLog();