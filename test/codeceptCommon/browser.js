
function getActor(){
    return actor()
}

class DriverManager{
    deleteAllCookies(){

    }
}

class Browser{
    constructor(){
        this.driver = {
            manage: () =>  new DriverManager()
        }
    }

    async sleep(seconds){
        return new Promise(() => {
            setTimeout(() => {
                resolve(true)
            }, seconds*1000)
        })
    }

    get(url){
        getActor().amOnPage(url);
    }

    async getCurrentUrl(){
        return await getActor().executeScript(() => {
            return window.document.location.href 
        }); 
    }
   
    refresh(){

    }

    async executeScript(fn){
        return getActor().executeScript(fn);  
    }

    async browserLogs(){
        return await getActor().grabBrowserLogs();  
    }

    async scrollToElement(elementObj){
        const actor = getActor();
        return await actor.scrollTo(elementObj.selector)
    }

    async getSessionStorage(key) {
        return await getActor().executeScript(() => {
            return window.sessionStorage[key]
        }); 
    }

    async getLocalStorage(key) {
        return await getActor().executeScript(() => {
            return window.localStorage[key]
        });
    }

    async getCurrentWindowHandle(){
        return await getActor().grabCurrentWindowHandle();
    }

    async getAllWindowHandles() {
        return await getActor().grabAllWindowHandles();
    }
}


module.exports = new Browser()
