
const axios = require('axios');

const axiosInstance = axios.create({
  
});

class BackendMockClient{

    constructor(){
        this.baseUrl = 'http://localhost:8080/client/'
;    }

    async updateAuthSessionWithRoles(auth, roles){
        return await axiosInstance.post(`${this.baseUrl}session/user/roles`,{
            auth: auth,
            roles: roles
        })
    }


    async updateAuthSessionWithUserInfo(auth, userInfo) {
        return await axiosInstance.post(`${this.baseUrl}session/user/info`, {
            auth: auth,
            userInfo: userInfo
        })
    }

    async updateAuthSessionWithRoleAssignments(auth, roleAssignments) {
        await this.setUserApiData(auth, "OnUserRoleAssignments", roleAssignments )
        return await axiosInstance.post(`${this.baseUrl}session/user/roleAssignments`, {
            auth: auth,
            roleAssignments: roleAssignments
        })
    }

    async setUserApiData(auth, apiMethod, response) {
        return await axiosInstance.post(`${this.baseUrl}session/userApiData`, {
            auth: auth,
            apiMethod: apiMethod,
            apiResponse: response
        })
    }


    async getSessionRolesAndRoleAssignments(auth){
        return await axiosInstance.post(`${this.baseUrl}session/getUserRolesAndRoleAssignments`, {
            auth: auth
        })
    }

    async getUserSesionData(auth) {
        return await axiosInstance.post(`${this.baseUrl}session/user/sessionData`, {
            auth: auth
        })
    }


    async logMessage(mesage){
        if (process.env.TEST_TYPE !== 'e2e') {
            return await axiosInstance.post(`${this.baseUrl}session/logMessage`, {
                message: mesage
            })
        }
       
    }

}


module.exports = new BackendMockClient();

