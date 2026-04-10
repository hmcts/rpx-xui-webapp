const path = require('path');
const fs = require('fs');

const roleAssignmentsService = require('./roleAssignments/index');

class UserApiData {
  constructor() {
    this.sessionUsers = [];

    this.debugUserDataFile = path.resolve(__dirname, '../../../functional-output/mockUserData.json');
  }

  normaliseToken(token) {
    return typeof token === 'string' ? token.replace('Bearer ', '') : '';
  }

  sendResponse(req, res, apiMethod, defaultResponseCallback) {
    const auth = req.headers.authorization ? req.headers.authorization : req.headers.serviceauthorization;
    const response = this.getUserData(auth, apiMethod);
    if (response) {
      res.status(response.status).send(response.data);
    } else {
      res.send(defaultResponseCallback());
    }
  }

  setUserData(token, apiMethod, response) {
    // apiMethod = apiMethod.toUpperCase();
    if (apiMethod === 'AddMockRoleAssignments' || apiMethod === 'OnUserRoleAssignments') {
      roleAssignmentsService.addRoleAssigmemntsToSession(token, response.data);
      return;
    }
    let userSession = this.sessionUsers.find((sess) => sess.token === token);
    if (!userSession) {
      userSession = {
        requests: [],
        token: token,
        apiData: [],
      };
      this.sessionUsers.push(userSession);
    }
    const apiResponse = userSession.apiData.find((methodData) => methodData.method === apiMethod);
    if (!apiResponse) {
      userSession.apiData.push({
        method: apiMethod,
        response: response,
        request: null,
      });
    } else {
      apiResponse.response = response;
    }

    // fs.writeFileSync(this.debugUserDataFile, JSON.stringify(userSession.apiData, null, 2))
  }

  getUserData(token, apiMethod) {
    const normalisedToken = this.normaliseToken(token);
    if (!normalisedToken) {
      return null;
    }
    const userSession = this.sessionUsers.find((sess) => sess.token === normalisedToken);
    if (!userSession) {
      return null;
    }
    const apiResponse = userSession.apiData.find((methodData) => methodData.method === apiMethod);
    return apiResponse ? apiResponse.response : null;
  }

  captureRequestDetails(apiMethod, requestObj) {
    // apiMethod = apiMethod.toUpperCase();
    const token = this.normaliseToken(requestObj?.headers?.authorization);
    if (!token) {
      return;
    }
    let userSession = this.sessionUsers.find((sess) => sess.token === token);
    if (!userSession) {
      userSession = {
        requests: [],
        token: token,
        apiData: [],
      };
      this.sessionUsers.push(userSession);
    }
    const apiResponse = userSession.apiData.find((methodData) => methodData.method === apiMethod);
    if (!apiResponse) {
      userSession.apiData.push({
        method: apiMethod,
        response: null,
        request: {
          body: requestObj.body,
        },
      });
    } else {
      apiResponse.request = {
        body: requestObj.body,
      };
    }
  }

  getCapturedRequestData(token, apiMethod) {
    if (token === '') {
      const allSessionsRequests = this.sessionUsers.map((userSession) => {
        return userSession.apiData.find((methodData) => methodData.method === apiMethod);
      });
      return allSessionsRequests;
    }
    const normalisedToken = this.normaliseToken(token);
    if (!normalisedToken) {
      return null;
    }
    const userSession = this.sessionUsers.find((sess) => sess.token === normalisedToken);
    if (!userSession) {
      return null;
    }
    const apiResponse = userSession.apiData.find((methodData) => methodData.method === apiMethod);
    return apiResponse ? apiResponse.request : null;
  }

  getUserSessionData(token) {
    const normalisedToken = this.normaliseToken(token);
    if (!normalisedToken) {
      return null;
    }
    const userSession = this.sessionUsers.find((sess) => sess.token === normalisedToken);
    return userSession;
  }

  logSessionRequest(token, req) {
    let userSession = this.sessionUsers.find((sess) => sess.token === token);
    if (!userSession) {
      userSession = {
        requests: [],
        token: token,
        apiData: [],
      };
      this.sessionUsers.push(userSession);
    }
    userSession.requests.push({
      method: req.method,
      url: req.url,
      body: req.body ? req.body : null,
      time: new Date(),
    });
  }

  clearUserData(token) {
    console.log('clear user data started');
    let userSession = this.sessionUsers.find((sess) => sess.token === token);
    if (userSession) {
      userSession = {
        requests: [],
        token: token,
        apiData: [],
      };
    }

    // console.log('Cleared user session data : ' + JSON.stringify(userSession))

    return userSession;
  }
}

module.exports = new UserApiData();
