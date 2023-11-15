const moment = require('moment')
const browserUtil = require('../../util/browserUtil');
// const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../codeceptCommon/reportLogger');

const serviceMock = require('../../../backendMock/client/serviceMock')

const { DataTableArgument } = require('codeceptjs');

const hearingsMock = require('../../../backendMock/services/hearings/index')
const mockClient = require('../../../backendMock/client/serviceMock')

    function updateObjectValues(object, key, value){
        const dateField = ['hearingRequestDateTime', 'lastResponseReceivedDateTime', 'hearingDaySchedule.hearingStartDateTime', 'hearingDaySchedule.hearingEndDateTime']
    
        if (dateField.includes(key)){
            const byDays = parseInt(value)
            object[key] = moment().add(byDays, 'days').format('YYYY-MM-DDTHH:mm:ss.sssss')
        }else{
            object[key] = value;
        }
    }

    Given('I set mock case hearings', async function (hearingsDatatable) {

        const rows = hearingsDatatable.parse().hashes();

        for(const hearing of rows){
            for(const key of Object.keys(hearing)){
                updateObjectValues(hearing, key, hearing[key])
            }
            hearingsMock.addHearing(hearing)
        }
        const hearingsList = hearingsMock.getCaseHearings();
        mockClient.setCaseHearings(hearingsList, 200)


    });
