

const client = require('./index')

class ServiceMock{

    async getAuthToken(){
        const authCookie = await browser.driver.manage().getCookie('__auth__');
        return authCookie.value
    }

    async updateMockServer(apiMethod, response){
        const authToken = await this.getAuthToken()
        return await client.setUserApiData(authToken, apiMethod, response)
    }

    async updateCaseData(data, status){
        await this.updateMockServer('OnCaseDetails', { status: status ? status:200, data: data });
    }

    async updateSearchForCompletableTasks(data, status){
        await this.updateMockServer('OnSearchForCompletableTasks', { status: status ? status : 200, data: data });
    }
    

}

module.exports =  new ServiceMock()
