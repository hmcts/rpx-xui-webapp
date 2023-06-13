const fs = require('fs')
const path = require('path')

const axios = require('axios')

const session = require('./sampleSession.json')

class MockSessionService{
    constructor(){
        this.http = axios.create({
            baseURL: "http://localhost:3000",
            timeout: 60000,
        })
        this.sessionsPath = path.resolve(__dirname, '../../../../.sessions')
        this.defaultSession = '';
    }


    setDefaultSession(session){
        this.defaultSession = session.split(".")[0]
            .replace('s:', '');
    }

    async getCopyOfDefaultSession(){
        const sessionFile = `${this.sessionsPath}/${this.defaultSession}.json`;
        let sessionJson = await fs.readFileSync(sessionFile);
        return JSON.parse(sessionJson)
    }

    getSessionFiles(){
        
        console.log(this.sessionsPath)
        return fs.readdirSync(this.sessionsPath)
    }

    async updateSessionFile(filename){
       
    }

    async getSessionCookies(){
        const res = await this.http.get('/external/configuration-ui/')
        return res.headers['set-cookie'];
    }

    async setUserSession( session,userDetails){
        // const sessionCookies = await this.getSessionCookies();
        // const webAppSession = sessionCookies.find(cookie => cookie.includes('xui-webapp'));
        const sessionId = session.split(".")[0]
            .replace('s:','')
        const sessionFile = `${this.sessionsPath}/${sessionId}.json`
        let sessionJson = await fs.readFileSync(sessionFile);
        sessionJson =  JSON.parse(sessionJson)
        sessionJson.passport.user.userinfo.roles = ['caseworker','caseworker-iac-judge']

        fs.writeFileSync(sessionFile, JSON.stringify(sessionJson, null, 2), 'utf8');
        return "";

    }


    async getSessionFileAuth(auth){
        const files = await this.getSessionFiles();
        let authSessionFile = null;
        for(const file of files){
            const sessionFile = `${this.sessionsPath}/${file}`
            let sessionJson = await fs.readFileSync(sessionFile);
            sessionJson = JSON.parse(sessionJson)
            // console.log(sessionJson.passport?.user?.tokenset?.accessToken);
            // console.log(auth);
            if (sessionJson.passport?.user?.tokenset?.accessToken === auth){
                authSessionFile = sessionFile;
                break;
            }
        }
        return authSessionFile;
    }

    async waitForSessionWithRoleAssignments(auth){


        return new Promise((resolve,reject) => {
            const interval = setInterval(async () => {
                const sessionFile = await this.getSessionFileAuth(auth);
                let sessionJson = await fs.readFileSync(sessionFile);
                sessionJson = JSON.parse(sessionJson);

                if(sessionJson.roleAssignmentResponse){
                    clearInterval(interval);
                    resolve(true)
                }
            }, 2000)

            setTimeout(() => {
                clearInterval(interval)
                reject('Session not updated with actual role assignments')
            },40000)
            
        })

    }

    async updateAuthSessionWithRoles(auth, roles){
        await this.waitForSessionWithRoleAssignments(auth)
        const sessionFile = await this.getSessionFileAuth(auth);
        let sessionJson = await fs.readFileSync(sessionFile);

        sessionJson = JSON.parse(sessionJson)

        sessionJson.passport.user.userinfo.roles = roles;
        await fs.writeFileSync(sessionFile, JSON.stringify(sessionJson, null, 2), 'utf8');
    }

    async updateAuthSessionWithRoleAssignments(auth, roleAssignments) {
        await this.waitForSessionWithRoleAssignments(auth)

        const sessionFile = await this.getSessionFileAuth(auth);
        let sessionJson = await fs.readFileSync(sessionFile);
        sessionJson = JSON.parse(sessionJson)
        if (sessionJson.roleAssignmentResponse){
            sessionJson.roleAssignmentResponse.push(...roleAssignments)
        }else{
            sessionJson.roleAssignmentResponse = roleAssignments;
        }
        
        await fs.writeFileSync(sessionFile, JSON.stringify(sessionJson, null, 2), 'utf8');

        sessionJson = await fs.readFileSync(sessionFile);
        sessionJson = JSON.parse(sessionJson)
        return sessionJson.roleAssignmentResponse;
    }

    async getSessionRolesAndRoleAssignments(auth){
        const sessionFile = await this.getSessionFileAuth(auth);
        let sessionJson = await fs.readFileSync(sessionFile);
        sessionJson = JSON.parse(sessionJson)
        return {
            roles: sessionJson.passport.user.userinfo.roles,
            roleAssignments: sessionJson.roleAssignmentResponse
        }
    }
}


module.exports = new MockSessionService();

