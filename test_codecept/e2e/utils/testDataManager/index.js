
const axios = require('axios')

const appTestConfig = require('../../config/appTestConfig')
const reportLogger = require('../../../codeceptCommon/reportLogger')

class TestDataManager{

    async getS2SToken(){
        const res = await axios.post(`http://rpe-service-auth-provider-${appTestConfig.testEnv}.service.core-compute-${appTestConfig.testEnv}.internal/testing-support/lease`,
            {
                "microservice": "xui_webapp"
            },
            {
                headers:{
                    accept:'*/*',
                    'Content-Type':'application/json'
                }
            }
        )
        return res.data;
    }

    async cleanupForTags(tags){

        if(tags.includes('@staffUI')){
            reportLogger.AddMessage('post test clean up start:  cleanupForTags')
            // await this.cleanupAutoStaffUsers();
        }
    }

    async createAndGetIdamUser(){
        const res = await axios.post(`https://idam-api.${appTestConfig.testEnv}.platform.hmcts.net/testing-support/accounts`, {
                "email": `xui_auto_test_user_${Date.now()}@justice.gov.uk`,
                "forename": "xui_auto",
                "surname": "test user",
                "password": "Welcome01",

                "roles": [
                    {
                        "code": "caseworker"
                    }
                ],
                "userGroup": {
                    "code": "test"
                }
            })

            return res.data;
        
    }

    async cleanupAutoStaffUsers(){
        try{
            const authToken = await browser.driver.manage().getCookie('__auth__')
            const s2s = await this.getS2SToken();
            await axios.delete(`https://idam-api.${appTestConfig.testEnv}.platform.hmcts.net/testing-support/test-data?testDataPrefix=xui_auto&async=true`)

            await axios.delete(`http://rd-caseworker-ref-api-${appTestConfig.testEnv}.service.core-compute-${appTestConfig.testEnv}.internal/refdata/case-worker/users?emailPattern=xui_auto`,
                {
                    headers: {
                        accept: 'application/json',
                        ServiceAuthorization: s2s,
                        Authorization: `Bearer ${authToken}`
                    }
                })
        }catch(err){
            reportLogger.AddMessage(`ERROR: cleanupAutoStaffUsers, ${err}`)
        }
       
    }
}

module.exports = new TestDataManager();
