

class UserApiData{
    constructor() {
        this.sessionUsers = []
    }


    sendResponse(req,res, apiMethod, defaultResponseCallback){
        const response = this.getUserData(req.headers.authorization, apiMethod)
        if (response) {
            res.status(response.status).send(response.data)
        } else {
            res.send(defaultResponseCallback())
        }
    }


    setUserData(token, apiMethod, response) {
        let userSession = this.sessionUsers.find(sess => sess.token === token)
        if (!userSession) {
            userSession = {
                token: token,
                apiData: []
            };
            this.sessionUsers.push(userSession)
        }
        const apiResponse = userSession.apiData.find(methodData => methodData.method === apiMethod)
        if (!apiResponse){
            userSession.apiData.push({
                method: apiMethod,
                response: response
            })
        }else{
            apiResponse.response = response
        }
       
    }

    getUserData(token, apiMethod){
        let userSession = this.sessionUsers.find(sess => sess.token === token)
        if (!userSession) {
            return null;
        }
        const apiResponse = userSession.apiData.find(methodData => methodData.method === apiMethod)
        return apiResponse ? apiResponse.response : null
    }

    clearUserData(token){
        this.sessionUsers = this.sessionUsers.filter(sess => sess.token !== token)
    }
}

module.exports = new UserApiData();
