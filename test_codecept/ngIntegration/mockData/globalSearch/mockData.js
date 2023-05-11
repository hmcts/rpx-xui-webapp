
const globalSearchDataModel = require('../../../dataModels/globalSearch');
class GlobalSearchMockData{
    constructor(){
        this.mockName = "TEST_1";
        this.reset();
    }
    
    reset(){
        this.searchResponse = globalSearchDataModel.getResults();

       
        this.searchResponse.results[10].processForAccess = "CHALLENGED";
        this.searchResponse.results[11].processForAccess = "SPECIFIC";
        // this.searchResponse.results[11].baseLocationName = "Demo location";
        // const singleCase = [];
        // singleCase.push(this.searchResponse.results[10]);
        // this.searchResponse.results = singleCase;


    }

    getResults(){
        console.log(this.mockName+ " [ GlobalSearchMockData.getResults ] global search results response requested");
        return this.searchResponse;
    }

    getServices(){
        return [
            {
                "serviceId": "BEFTA_MASTER",
                "serviceName": "BEFTA Master"
            },
            {
                "serviceId": "IA",
                "serviceName": "Immigration & Asylum"
            }
        ]
    }

}


module.exports = new GlobalSearchMockData();

