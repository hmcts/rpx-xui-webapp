
const { v4 } = require('uuid');
const userApiData = require('../userApiData')


class PRDApi{
    

    constructor(){

        this.method = {
            searchTasks: "ON_SEARCH_TASKS"
        }

        this.caseFlags = { 
            flags:{
                FlagDetails: []
            },
            
        }
        

    }

}

module.exports = new PRDApi();


