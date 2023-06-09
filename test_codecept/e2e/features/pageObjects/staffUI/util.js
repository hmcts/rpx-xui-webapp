
const axios = require('axios')

class StaffUIDataUtil{
   

    async createAndGetIdamUser(){
        const res = await axios.post('https://idam-api.aat.platform.hmcts.net/testing-support/accounts',{
            "email": `xui_auto_test_user_${Date.now()}@test.com`,
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
}
module.exports = new StaffUIDataUtil();

