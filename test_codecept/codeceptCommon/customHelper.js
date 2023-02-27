const Helper = require('@codeceptjs/helper');

const codeceptMochawesomeLog = require('./reportLogger')


const browserErrorLogsExclusions = [
    'Unable to find Target Element'
]

class CustomHelper extends Helper {

    // before/after hooks
    _before() {
       this.browserErrorLogs = [];
        
       this.pageOnListener = false;
       
    }

    _beforeStep(){
        const page = this.getPuppeteerPage();

        if (!this.pageOnListener && page){
           
            page.on('console', (msg) => {
                const type = msg.type();
                if (type === 'error') {
                    // console.log(msg);
                    codeceptMochawesomeLog.AddMessage('---------------------- BROWSER CONSOLE ERROR ----------------------');
                    this.attachBrowserLog(msg)
                    this.browserErrorLogs.push(msg)
                    codeceptMochawesomeLog.AddMessage('------------------------------------------------------------------');
                }
            });
            this.pageOnListener = true;
        }
    }


    async _failed(){
       for(const log of this.browserErrorLogs){
           this.attachBrowserLog(log)
       }
    }

    async  attachBrowserLog(log) {
        if (log._type !== 'error') {
            return;
        }
        if(browserErrorLogsExclusions.includes(log._text)){
            return;
        }
        codeceptMochawesomeLog.AddMessage(`Error: ${log._text}`);
        for (const stacktraceLocation of log._stackTraceLocations) {
            codeceptMochawesomeLog.AddMessage(`       ${stacktraceLocation.url}:${stacktraceLocation.lineNumber}`);
        }
    }
    
    async getCookies(){
        const puppeteerPage = this._getHelper().page;
        const cookiesString = await puppeteerPage.evaluate(() => {
            return document.cookie
        })

        const cookies = cookiesString.split(';').map(cookie => {
            const nameValue = cookie.split("=")
            return { name: nameValue[0].trim(), value: nameValue[1].trim() }
        })
        return cookies;
    }
    
    _getHelper(){
        const { WebDriver, Puppeteer } = this.helpers;
        return Puppeteer;
    }

    getPuppeteerPage(){
        return this._getHelper().page;
    }





    executeScript(...args){

        const puppeteerPage = this._getHelper().page;
        return puppeteerPage.evaluate(...args);
    }

}

module.exports = CustomHelper;