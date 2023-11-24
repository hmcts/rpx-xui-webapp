const serviceHearingValuesMock = require('./hearings/serviceHearingValuesMock')

class MockAPIData{


    setApiData(apiMethod, responseData){
        let status = "success"
        switch (apiMethod) {
            case "OnServiceHearingValues":
                serviceHearingValuesMock.serviceHearingValues = responseData
                break;
            default:
                status = `${req.params.apiMethod} is not setup`
        }
        return status;
    }

}

module.exports = new MockAPIData()

