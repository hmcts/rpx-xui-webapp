

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
        // apiMethod = apiMethod.toUpperCase();
        let userSession = this.sessionUsers.find(sess => sess.token === token)
        if (!userSession) {
            userSession = {
                requests:[],
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
        let userSession = this.sessionUsers.find(sess => sess.token === token.replace('Bearer ',''))
        if (!userSession) {
            return null;
        }
        const apiResponse = userSession.apiData.find(methodData => methodData.method === apiMethod)
        return apiResponse ? apiResponse.response : null
    }

    getUserSessionData(token){
        let userSession = this.sessionUsers.find(sess => sess.token === token.replace('Bearer ', ''))
        return userSession
    }

    logSessionRequest(token, req){
        let userSession = this.sessionUsers.find(sess => sess.token === token)
        if (!userSession) {
            userSession = {
                requests: [],
                token: token,
                apiData: []
            };
            this.sessionUsers.push(userSession)
        }
        userSession.requests.push({
            method: req.method,
            url: req.url,
            body:req.body ? req.body : null,
            time:new Date()
        })

    }

    clearUserData(token){
        this.sessionUsers = this.sessionUsers.filter(sess => sess.token !== token)
    }
}

module.exports = new UserApiData();
