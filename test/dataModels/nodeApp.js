const { v4 } = require('uuid');

class NodeApp{

    getUserDetails_oidc(){

        return {
            "canShareCases": false,
            "locationInfo": [
                this.getUserDetailsLocationInfo()
            ],
            "sessionTimeout": {
                "idleModalDisplayTime": 10,
                "pattern": ".",
                "totalIdleTime": 480
            },
            "userInfo": {
                "uid": v4(),
                "given_name": "XUI test",
                "family_name": "Judge",
                "name": "test name",
                "sub": "juser8@mailinator.com",
                "roles": [
                    "caseworker",
                    "caseworker-ia",
                    "caseworker-ia-iacjudge"
                ],
                "token": "Bearer eyJ0eXAiOiJKV1Q"
            }
        }
    }

    getUserDetails_oauth(){
        return {
            "canShareCases": false,
            "locationInfo": [
                this.getUserDetailsLocationInfo()
            ],
            "sessionTimeout": {
                "idleModalDisplayTime": 10,
                "pattern": ".",
                "totalIdleTime": 480
            },
            "userInfo": {
                "id": v4(),
                "forename": "XUI test",
                "surname": "Judge",
                "email": "juser8@mailinator.com",
                "active": true,
                "roles": [
                    "caseworker",
                    "caseworker-ia",
                    "caseworker-ia-iacjudge"
                ],
                "token": "Bearer eyJ0eXAiOiJKV1Q"
            }
        }
    }


    getUserDetailsLocationInfo(){
        const location = Math.floor((Math.random() * 100009) + 10001);
        const isCaseAllocator = Math.floor((Math.random() * 1) + 0) === 0 ? false : true;
        return {
            "primaryLocation": location,
            "jurisdiction": "IA",
            "isCaseAllocator": isCaseAllocator
        }
    }

}

module.exports = new NodeApp();
