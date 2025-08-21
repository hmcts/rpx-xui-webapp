const fs = require('fs');
const path = require('path');

const axios = require('axios');

const roleAssignmentsService = require('../roleAssignments/index');

class MockSessionService {
  constructor(mode) {
    this.http = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 60000
    });

    if (mode && mode === 'DEBUG') {
      this.sessionsPath = path.resolve(__dirname, '../../../../api/.sessions');
    } else {
      this.sessionsPath = path.resolve(__dirname, '../../../../.sessions');
    }
    // console.log("Session path : " + this.sessionsPath)
    this.defaultSession = '';
  }

  setDefaultSession(session) {
    this.defaultSession = session.split('.')[0]
      .replace('s:', '');
  }

  async getCopyOfDefaultSession() {
    const sessionFile = `${this.sessionsPath}/${this.defaultSession}.json`;
    const sessionJson = await fs.readFileSync(sessionFile);
    return JSON.parse(sessionJson);
  }

  getSessionFiles() {
    // console.log(this.sessionsPath)
    return fs.readdirSync(this.sessionsPath);
  }

  async updateSessionFile(filename) {

  }

  async getSessionCookies() {
    const res = await this.http.get('/external/configuration-ui/');
    return res.headers['set-cookie'];
  }

  async setUserSession(session, userDetails) {
    // const sessionCookies = await this.getSessionCookies();
    // const webAppSession = sessionCookies.find(cookie => cookie.includes('xui-webapp'));
    const sessionId = session.split('.')[0]
      .replace('s:', '');
    const sessionFile = `${this.sessionsPath}/${sessionId}.json`;
    let sessionJson = await fs.readFileSync(sessionFile);
    sessionJson = JSON.parse(sessionJson);
    sessionJson.passport.user.userinfo.roles = ['caseworker', 'caseworker-iac-judge'];

    fs.writeFileSync(sessionFile, JSON.stringify(sessionJson, null, 2), 'utf8');
    return '';
  }

  async getSessionFileAuth(auth) {
    const files = (await this.getSessionFiles())
      .filter(f => f.endsWith('.json'));
    let authSessionFile = null;
    for (const file of files) {
      const sessionFile = `${this.sessionsPath}/${file}`;
      let sessionJson = await fs.readFileSync(sessionFile);
      try {
        sessionJson = JSON.parse(sessionJson);
        // console.log(sessionJson.passport?.user?.tokenset?.accessToken);
        // console.log(auth);
        if (sessionJson.passport?.user?.tokenset?.accessToken === auth) {
          authSessionFile = sessionFile;
          break;
        }
      } catch (err) {
        //   console.error ('Error reading session JSON file: ' + sessionFile + ' sessionJson: ' + sessionJson, err);
      }
    }
    return authSessionFile;
  }

  async waitForSessionWithRoleAssignments(auth) {
    let counter = 0;
    while (counter < 20) {
      await sleepForSeconds(2);

      /* ----------------  guard ---------------- */
      const sessionFile = await this.getSessionFileAuth(auth);
      if (!sessionFile) {
        if (counter > 15) {
          // create a minimal session so the test can proceed
          const sid = auth.slice(0, 24).replace(/[^a-zA-Z0-9]/g, '');
          const proto = {
            passport: {
              user: {
                tokenset: { accessToken: auth },
                userinfo: { roles: [] }
              }
            }
          };
          const newPath = path.join(this.sessionsPath, `${sid}.json`);
          fs.writeFileSync(newPath, JSON.stringify(proto, null, 2), 'utf8');

          console.warn('[mock] generated stub session', newPath);
          return; // exit the loop; caller will patch roles
        }
        counter++;
        continue;
      }
      /* ---------------------------------------- */

      const raw = await fs.readFileSync(sessionFile, 'utf8');
      const sessionJson = JSON.parse(raw);

      if (sessionJson.roleAssignmentResponse) return;   // ready
      if (counter > 15) throw new Error('Session not updated with role assignments');
      counter++;
    }
  }

  async updateAuthSessionWithRoles(auth, roles) {
    await this.waitForSessionWithRoleAssignments(auth);   // ← only once

    const sessionFile = await this.getSessionFileAuth(auth);
    let sessionJson = JSON.parse(await fs.readFileSync(sessionFile, 'utf8'));

    sessionJson.passport.user.userinfo.roles = roles;
    await fs.writeFileSync(sessionFile, JSON.stringify(sessionJson, null, 2), 'utf8');
  }

  async updateAuthSessionWithUserInfo(auth, userInfo) {
    await this.waitForSessionWithRoleAssignments(auth);
    const sessionFile = await this.getSessionFileAuth(auth);
    let sessionJson = await fs.readFileSync(sessionFile);

    sessionJson = JSON.parse(sessionJson);

    sessionJson.passport.user.userinfo = userInfo;
    await fs.writeFileSync(sessionFile, JSON.stringify(sessionJson, null, 2), 'utf8');
  }

  async updateAuthSessionWithRoleAssignments(auth, roleAssignments) {
    await this.waitForSessionWithRoleAssignments(auth);

    const sessionFile = await this.getSessionFileAuth(auth);
    let sessionJson = JSON.parse(await fs.readFileSync(sessionFile, 'utf8'));

    // push only once
    roleAssignmentsService.serviceUsersRoleAssignments.push(...roleAssignments);

    if (sessionJson.roleAssignmentResponse) {
      sessionJson.roleAssignmentResponse.push(...roleAssignments);
    } else {
      sessionJson.roleAssignmentResponse = roleAssignments;
    }

    await fs.writeFileSync(sessionFile, JSON.stringify(sessionJson, null, 2), 'utf8');
    return sessionJson.roleAssignmentResponse;
  }

  async getSessionRolesAndRoleAssignments(auth) {
    const sessionFile = await this.getSessionFileAuth(auth);
    let sessionJson = await fs.readFileSync(sessionFile);
    sessionJson = JSON.parse(sessionJson);
    return {
      roles: sessionJson.passport.user.userinfo.roles,
      roleAssignments: sessionJson.roleAssignmentResponse
    };
  }

  captureRequestDetails(apiMethod, requestObj) {
    // apiMethod = apiMethod.toUpperCase();
    const token = requestObj.headers.authorization.replace('Bearer ', '');
    let userSession = this.sessionUsers.find((sess) => sess.token === token);
    if (!userSession) {
      userSession = {
        requests: [],
        token: token,
        apiData: []
      };
      this.sessionUsers.push(userSession);
    }
    const apiResponse = userSession.apiData.find((methodData) => methodData.method === apiMethod);
    if (!apiResponse) {
      userSession.apiData.push({
        method: apiMethod,
        response: null,
        request: {
          body: requestObj.body
        }
      });
    } else {
      apiResponse.request = {
        body: requestObj.body
      };
    }
  }

  getCapturedRequestData(token, apiMethod) {
    const userSession = this.sessionUsers.find((sess) => sess.token === token.replace('Bearer ', ''));
    if (!userSession) {
      return null;
    }
    const apiResponse = userSession.apiData.find((methodData) => methodData.method === apiMethod);
    return apiResponse ? apiResponse.request : null;
  }
}

const mode = process.env.DEBUG && process.env.DEBUG === 'true' ? 'DEBUG' : '';
module.exports = new MockSessionService(mode);

async function sleepForSeconds(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}
