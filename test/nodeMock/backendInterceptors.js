
const rolesAssignmentsMock = require('./backEndMock/roleAssignment')
const refDataCaseWorkers = require('./backEndMock/rdCaseworkerRefApi')
const http = require('axios/lib/adapters/http')
 function mockTestDataRequestInterceptor(request) {
    const logger = log4jui.getLogger('outgoing')

    const url = shorten(request.url, getConfigValue(MAX_LOG_LINE))
    logger.info(`${request.method.toUpperCase()} to ${url}`)
    //add timings to requests
    request.metadata = { startTime: new Date() }

    return request
}

 function mockTestDataResponseInterceptor(response) {
    try{
        if (response.config.url.includes("am-role-assignment-service")) {
            rolesAssignmentsMock.processResponse(response)
        }
        if (response.config.url.includes('rd-caseworker-ref-api')) {
            refDataCaseWorkers.processResponse(response)
        }
    }catch(err){
        console.log(err)
        throw err
    }
       

    
    return response
}

module.exports = { mockTestDataRequestInterceptor, mockTestDataResponseInterceptor }


// Add following lines in /api/lib/http

// const { mockTestDataRequestInterceptor, mockTestDataResponseInterceptor } = require('../../../test/nodeMock/backendInterceptors')
// http.interceptors.response.use(mockTestDataResponseInterceptor, mockTestDataResponseInterceptor)

