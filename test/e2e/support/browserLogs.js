
class BrowserLogs{
    constructor(){
        this.logs = [];
    }

    clearBrowserLogs(){
        this.logs = [];
    }

    async getBrowserLogs(){
        let browserLog = await browser.manage().logs().get('browser');
        

        this.logs.push(...browserLog);
        return this.logs;
    }

    async getNetworkCalllogs(endPointText){
        const browserLog = await this.getBrowserLogs();
        let counter = 0;
        const endPointLogs  = [];
        for (let browserLogCounter = 0; browserLogCounter < browserLog.length; browserLogCounter++) {
            if (browserLog[browserLogCounter].message.includes(endPointText)) {
                endPointLogs.push(browserLog[browserLogCounter]);
            }
        }
        return endPointLogs;
    }

}

module.exports = new BrowserLogs();