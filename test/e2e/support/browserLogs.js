const cucumberReporter = require('./reportLogger');

class BrowserLogs {


    constructor() {
        this.networklogs = []
        this.browserlogs = [];
        this.javascriptErrors = []

        this.ignoreItemsList = [
            "activity/cases",
            "/api/monitoring-tools",
            "dc.services.visualstudio.com"
            
        ];

        this.ignoreItemsList = [
            "activity/cases",
            "/api/monitoring-tools"
        ];

    }

    clearLogs() {
        this.networklogs = [];
        this.browserlogs = [];
        this.javascriptErrors = []

    }

    async getBrowserLogs() {
        let browserLog = []
        let browserErrorLogs = []
        for (let browserLogCounter = 0; browserLogCounter < browserLog.length; browserLogCounter++) {
            if (browserLog[browserLogCounter].level.value > 900) {
                try {
                    browserLog[browserLogCounter]['time'] = (new Date(browserLog[browserLogCounter]['timestamp'])).toISOString()
                } catch (err) {
                    browserLog[browserLogCounter]['time'] = browserLog[browserLogCounter]['timestamp'] + "" + err;
                }

                let ignore = false;
                for (const ignoreItem of this.ignoreItemsList) {
                    if (browserLog[browserLogCounter]['message'].includes(ignoreItem)) {
                        ignore = true;
                        break; 
                    } 
                }
                
                if (browserLog[browserLogCounter]['message'].includes("ERROR [") || browserLog[browserLogCounter]['message'].includes(".js")) {
                    this.javascriptErrors.push(`${browserLog[browserLogCounter]['time']} : [${browserLog[browserLogCounter]['level']}] ${browserLog[browserLogCounter]['message']} ${JSON.stringify(browserLog[browserLogCounter])}`);
                }else if (!ignore) {
                    browserErrorLogs.push(`${browserLog[browserLogCounter]['time']} : [${browserLog[browserLogCounter]['level']}] ${browserLog[browserLogCounter]['message']} `);
                }
            }
        }
        return browserErrorLogs;
    }

    async printBrowserLogs() {
        const browserErrorLogs = await this.getBrowserLogs();
        this.browserlogs.push(...browserErrorLogs)
        cucumberReporter.AddMessage("--------------------- Network logs Start---------------------");
        for (const log of browserErrorLogs) {
            cucumberReporter.AddMessage(log);
        }
        cucumberReporter.AddMessage("--------------------- Network logs End -----------------------");

        return this.browserlogs;
    }

    async printAllBrowserLogs() {
        try{
            const browserErrorLogs = await this.getBrowserLogs();
            this.browserlogs.push(...browserErrorLogs)

            cucumberReporter.AddMessage("************* Netwrok errors *****************");
            for (const log of this.browserlogs) {
                cucumberReporter.AddMessage(log);
            }

            cucumberReporter.AddMessage("************* Javascript errors *****************");
            for (const log of this.javascriptErrors) {
                cucumberReporter.AddMessage(log);
            }
            return this.browserlogs;
        }catch(err){
            cucumberReporter.AddMessage('error occures in collecting browser logs')
            cucumberReporter.AddMessage(err)  
        }
        
    }



    async getNetworkLogs() {
        let browserLog = await browser.manage().logs().get('performance');
        const browserErrorLogs = [];

        const methods = [];
        for (let browserLogCounter = 0; browserLogCounter < browserLog.length; browserLogCounter++) {
            const networkMessage = JSON.parse(browserLog[browserLogCounter].message);

            browserLog[browserLogCounter]['time'] = (new Date(browserLog[browserLogCounter]['timestamp'])).toISOString()

            if (!methods.includes(networkMessage.message.method)) {
                methods.push(networkMessage.message.method);
            }

            if (networkMessage.message.method === 'Network.responseReceived' ||
                networkMessage.message.method === 'Network.requestWillBeSent') {
                try {
                    browserLog[browserLogCounter].requestDetails = {
                        method: networkMessage.message.params.request.method,
                        url: networkMessage.message.params.request.url
                    };

                    if (networkMessage.message.method === 'Network.responseReceived') {
                        browserLog[browserLogCounter].responseDetails = {
                            status: networkMessage.message.params.response.status + ' ' + networkMessage.message.params.response.statusText,
                            url: networkMessage.message.params.response.url
                        };
                    }
                    let perfItem = { ...browserLog[browserLogCounter], time: (new Date(browserLog[browserLogCounter]['timestamp'])).toISOString() }
                    delete perfItem.message;

                    browserErrorLogs.push(perfItem);
                } catch (err) {
                    console.log(err);
                    // cucumberReporter.AddMessage('');
                    // cucumberReporter.AddJson(networkMessage);
                }


            }

            this.networklogs.push(...browserErrorLogs);

        }
        return this.networklogs;
    }

}


module.exports = new BrowserLogs();