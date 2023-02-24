

const express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const minimist = require('minimist');
const fs = require('fs');
const axios = require('axios');
const http = axios.create({})
axios.defaults.headers.common['Content-Type'] = 'application/json'

const taskApi = require('./services/task-management-api/routes')


class MockApp {

    constructor() {
        this.logMessageCallback = null;
        this.logJSONCallback = null;
        this.routesLogFile = `${__dirname}/RUNTIME_ROUTES.txt`;
        this.uniqueRoutesCalled = new Set();
    }


    init(clientPortStart) {
      
    }


    logRequestDetails(req) {
        this.logMessage(`${req.method} : ${req.originalUrl}`);
        if (req.method === 'POST' || req.method === 'PUT') {
            this.logJSON(req.body);
        }
    }

    getCookieFromRequest(req, cookieName) {
        const cookie = req.cookies[cookieName];
        this.scenarios[cookie] = this.scenarios[cookie] ? this.scenarios[cookie] : "";
        return cookie;
    }

    async startServer() {

        const app = express();
        app.disable('etag');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(express.json());


        app.use('/task', taskApi)


        // await this.stopServer();
        this.server = await app.listen(8080);

        console.log("mock server started on port : " + this.serverPort);
        // return "Mock started successfully"

    }

    async stopServer() {
        if (this.server) {
            await this.server.close();
            this.server = null;
            console.log("Mock server stopped");

        } else {
            console.log("Mock server is null or undefined");
        }
    }


}


const mockInstance = new MockApp();

const args = minimist(process.argv)
if (args.standalone) {
    // mockInstance.setServerPort(8080);
    mockInstance.init();
    // nodeAppMock.userDetails = nodeAppMock.getMockLoginUserWithidentifierAndRoles("IAC_CaseOfficer_R2", "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator");
    // bookingsMockData.bookingResponse = [];
    // setUpcaseConfig();
    // getDLCaseConfig();
    // collectionDynamicListeventConfig()
    // createCustomCaseDetails();
    mockInstance.startServer()
}
