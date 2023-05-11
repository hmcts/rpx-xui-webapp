const MockApp = require('../../nodeMock/app');

class MockUtil{

    async setMockResponse(method, endpoint, callback) {
        await MockApp.stopServer();
        if (method === 'GET') {
            await MockApp.onGet(endpoint, callback);
        }

        if (method === 'POST') {
            await MockApp.onPost(endpoint, callback);
        }
        if (method === 'PUT') {
            await MockApp.onPut(endpoint, callback);
        }
        await MockApp.startServer();

    }

    getMockApp(){
        return MockApp; 
    }

    async resetMock() {
        //const scenarioId = await MockApp.browserScenarioCookieCallback();
        //MockApp.initScenarioSession(scenarioId);
        await MockApp.stopServer();
        MockApp.init();
        await MockApp.startServer();

    }

    async start() {
        await MockApp.startServer();
    }

    async stop() {
        await MockApp.stopServer();
    }
}

module.exports = new MockUtil();
