


const { v4 } = require('uuid');

class PrdOrganisations{


    getUsers(){

        const responseData = {
            "organisationIdentifier": 'test_org_1',
            users:[]
        }
        
        for (let i = 0; i < 100; i++) {
            responseData.users.push(

                    {
                        "userIdentifier": v4(),
                        "firstName": `fn test user ${i}`,
                        "lastName": `ln test user ${i}`,
                        "email": `est_user_${i}@test.com`,
                        "idamStatus": "Active",
                        "roles": [
                            "caseworker-divorce"
                        ],
                        "idamStatusCode": "string",
                        "idamMessage": "mock user"
                    }
                
            )
        }
        return responseData;
    }
}

module.exports = new PrdOrganisations();
