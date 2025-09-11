
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const http = axios.create({});
axios.defaults.headers.common['Content-Type'] = 'application/json';

const taskApi = require('./services/task-management-api/routes');
const workTypeRoutes = require('./services/task-management-api/workTypeRoutes');

const locationRoutes = require('./services/rdLocation/routes');
const caseworkerRoutes = require('./services/rdCaseworker/routes');
const judicialRoutes = require('./services/rdJudicial/routes');

const roleAssignmentRoutes = require('./services/roleAssignments/routes');
const bookingRoutes = require('./services/roleAssignments/bookingRoutes');

const hearingRoutes = require('./services/hearings/routes');

const ccdRoutes = require('./services/ccd/routes');
const ccdApi = require('./services/ccd/index');

const caseAssignmentsRoutes = require('./services/caseAssignments/routes');
const prdOrganisationRoutes = require('./services/prdOrganisations/routes');

const prdCommondataroutes = require('./services/prd/routes');

const globalSearchRoutes = require('./services/globalSearch/routes');

const idamOpenId = require('./services/idam/routes');
const sessionRoutes = require('./services/session/routes');
const caseCategoriesndDOcumentsRoutes = require('./services/caseFileView/routes');
const evidenceManagementRoutes = require('./services/evidenceManagement/routes');
const workFlowRouter = require('./services/workFlow/routes');

const users = require('./services/users');
const userApiData = require('./services/userApiData');

const tolerantJson = express.json({
  type: ['application/json'],   // only when Content-Type is JSON
  strict: false,
  verify: (req, res, buf) => {
    if (!buf.length) req.body = {}; // {} instead of empty buffer
  }
});

if (process.env.MOCK_ALREADY_RUNNING === 'true') {
  module.exports = {         // dummy stub with the same API
    startServer: () => Promise.resolve(),
    stopServer: () => Promise.resolve()
  };
  return;                    // skip the real implementation
}

class MockApp {
  constructor() {
    this.logMessageCallback = null;
    this.logJSONCallback = null;
    this.routesLogFile = `${__dirname}/RUNTIME_ROUTES.txt`;
    this.uniqueRoutesCalled = new Set();

    this.server = null;   // the live Server object
    this.starting = null;   // Promise while first worker is binding
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
    this.scenarios[cookie] = this.scenarios[cookie] ? this.scenarios[cookie] : '';
    return cookie;
  }

  async startServer() {
    try {
      const probe = await new Promise((ok, fail) => {
        const s = require('net').createServer()
          .once('error', fail)      // EADDRINUSE if busy
          .once('listening', () => { s.close(); ok(); })
          .listen(8080, '::');
      });
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.log('[mock] 8080 already bound – assume primary running');
        return;
      }
      throw err;
    }

    if (this.server) return this.server;
    if (this.starting) return this.starting;
    const app = express();
    app.disable('etag');

    app.use(
      cors({
        origin: [/^http:\/\/localhost:(3000|8080)$/],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(tolerantJson);

    app.use((req, res, next) => {
      // console.log(`${req.method} : ${req.url}`);

      res.set('Cache-Control', 'no-store, s-maxage=0, max-age=0, must-revalidate, proxy-revalidate');
      const authToken = req.headers.authorization;
      if (authToken) {
        const token = authToken.replace('Bearer ', '');
        userApiData.logSessionRequest(token, req);
      }
      next();
    });

    app.use('/client', sessionRoutes);

    app.use('/', idamOpenId);
    app.use('/task', taskApi);
    app.use('/work-types', workTypeRoutes);
    app.use('/refdata/location', locationRoutes);
    app.use('/refdata/internal/staff', caseworkerRoutes);
    app.use('/refdata/judicial', judicialRoutes);

    app.use('/am/role-assignments', roleAssignmentRoutes);
    app.use('/am/bookings', bookingRoutes);

    app.use('/', hearingRoutes);

    app.use('/globalSearch', globalSearchRoutes);

    app.use('/case-assignments', caseAssignmentsRoutes);
    app.use('/refdata/external/v1/organisations', prdOrganisationRoutes);

    app.post('/searchCases', (req, res) => {
      const cases = ccdApi.getSearchCases(req, res);
      res.send(cases);
    });

    app.use('/', ccdRoutes);
    app.use('/refdata/commondata', prdCommondataroutes);
    app.use('/categoriesAndDocuments', caseCategoriesndDOcumentsRoutes);
    app.use('/cases/documents', evidenceManagementRoutes);
    app.use('/documentsv2', evidenceManagementRoutes);
    app.use('/workflow', workFlowRouter);

    app.get('/external/configuration-ui/', (req, res) => {
      res.json({
        launchDarklyClientId: 'local-test',
        appInsightsKey: '',
        buildVersion: 'test-run'
      });
    });

    app.get('/activity/cases/:caseId/activity', (req, res) => {
      res.send({});
    });

    app.post('/translation/cy', (req, res) => {
      const reqBody = req.body;
      const savePhrasesPath = path.resolve(__dirname, '../../functional-output/translations.txt');
      const resposne = { translations: {} };
      for (const phrase of reqBody.phrases) {
        fs.appendFileSync(savePhrasesPath, `\n${phrase}`);
        resposne.translations[phrase] = { translation: `WELSH[${phrase}]` };
      }

      res.send(resposne);
    });

    // ── serve the built UI from dist on :8080 ─────────────────────────────────
    const staticRoot = path.resolve(__dirname, '../../dist/rpx-exui');

    // 1) static files (no index auto-serve)
    app.use(express.static(staticRoot, { index: false, cacheControl: false }));

    // 2) SPA fallback: anything not matched by API routes returns index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(staticRoot, 'index.html'));
    });

    console.log('mock server starting on :8080');
    this.starting = new Promise((resolve, reject) => {
      const srv = app.listen(8080, '::', () => {
        console.log('[mock] server listening on 8080');
        this.server = srv;   // ready for next calls
        this.starting = null;  // clear “starting” flag
        resolve(srv);
      });
      srv.on('error', (err) => {
        this.starting = null;
        reject(err);
      });
    });
    return this.starting;
  }

  async stopServer() {
    if (this.server) {
      await this.server.close();
      this.server = null;
      console.log('Mock server stopped');
    } else {
      console.log('Mock server is null or undefined');
    }
  }
}

const mockInstance = new MockApp();
module.exports = mockInstance;

const args = minimist(process.argv);
if (args.standalone) {
  // mockInstance.setServerPort(8080);
  mockInstance.init();
  // nodeAppMock.userDetails = nodeAppMock.getMockLoginUserWithidentifierAndRoles("IAC_CaseOfficer_R2", "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator");
  // bookingsMockData.bookingResponse = [];
  // setUpcaseConfig();
  // getDLCaseConfig();
  // collectionDynamicListeventConfig()
  // createCustomCaseDetails();
  mockInstance.startServer();
}
