
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
}


module.exports = new Browser()
