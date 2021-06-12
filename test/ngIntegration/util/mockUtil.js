const MockApp = require('../../nodeMock/app');

class MockUtil{

    async setMockResponse(method, endpoint, callback) {
        //await MockApp.stopServer();
        if (method === 'GET') {
            MockApp.onGet(endpoint, callback);
        }

        if (method === 'POST') {
            MockApp.onPost(endpoint, callback);
        }
        if (method === 'PUT') {
            MockApp.onPut(endpoint, callback);
        }
        //await MockApp.startServer();

    }

    getMockApp(){
        return MockApp; 
    }

    async resetMock() {
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
