
const cucumberReporter = require('./reportLogger');

class BrowserLogs {


    constructor(){
        this.networklogs = []
        this.browserlogs = [];

    }

    clearLogs(){
        this.networklogs = [];
        this.browserlogs = [];

    }

    async getBrowserLogs(){
        let browserLog = await browser.manage().logs().get('browser');
        const browserErrorLogs = [];

        for (let browserLogCounter = 0; browserLogCounter < browserLog.length; browserLogCounter++) {
            if (browserLog[browserLogCounter].level.value > 900) {
                browserLog[browserLogCounter]['time'] = (new Date(browserLog[browserLogCounter]['timestamp'])).toISOString()
                let perfItem = { ...browserLog[browserLogCounter], time: (new Date(browserLog[browserLogCounter]['timestamp'])).toISOString() }
                browserErrorLogs.push(perfItem);
            }
        }
        this.browserlogs.push(...browserErrorLogs);
        return this.browserlogs;
    }

    async getNetworkLogs(){
        let browserLog = await browser.manage().logs().get('performance');
        const browserErrorLogs = [];

        const methods = [];
        for (let browserLogCounter = 0; browserLogCounter < browserLog.length; browserLogCounter++) {
            const networkMessage = JSON.parse(browserLog[browserLogCounter].message);
           
            browserLog[browserLogCounter]['time'] = (new Date(browserLog[browserLogCounter]['timestamp'])).toISOString()
           
            if (!methods.includes(networkMessage.message.method)){
                methods.push(networkMessage.message.method);
            }

            if (networkMessage.message.method === 'Network.responseReceived' ||
                networkMessage.message.method === 'Network.requestWillBeSent'){
                try{
                    browserLog[browserLogCounter].requestDetails = {
                        method: networkMessage.message.params.request.method,
                        url: networkMessage.message.params.request.url
                    };

                    if (networkMessage.message.method === 'Network.responseReceived'){
                        browserLog[browserLogCounter].responseDetails = {
                            status: networkMessage.message.params.response.status + ' ' + networkMessage.message.params.response.statusText,
                            url: networkMessage.message.params.response.url
                        };
                    }
                    let perfItem = { ...browserLog[browserLogCounter], time: (new Date(browserLog[browserLogCounter]['timestamp'])).toISOString() }
                    delete perfItem.message;

                    browserErrorLogs.push(perfItem);
                }catch(err){
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
