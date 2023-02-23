
const helper = require('codeceptjs').helper;


function getActor(){
    return actor()
}

class DriverManager{
    deleteAllCookies(){

    }

    async getCookies(){
        return await getActor().getCookies();
    }
}

const driverManager = new DriverManager();

class Browser{
    constructor(){
        this.driver = {
            manage: () =>  new DriverManager()
        }
    }

    manage(){
        return driverManager;
    }

    get_I(){
        return getActor()
    }

    async sleep(seconds){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(true)
            }, seconds*1000)
        })
    }

    get(url){
        getActor().amOnPage(url);
    }

    async getCurrentUrl(){
        return await browser.executeScript(function(){
            return window.document.location.href 
        }); 
    }
   
    refresh(){

    }

    async handlePopups(){
        try{
            return getActor().cancelPopup();
        }catch(err){

        }
        
    }

    async executeScript(fn){
        return getActor().executeScript(fn);  
    }

    async getBrowserLogs(){
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
