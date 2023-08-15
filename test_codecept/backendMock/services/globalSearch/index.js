
const { v4 } = require('uuid');


class GlobalSearch{
  

    getDefaultResponse(){
        return this.getGlobalSearchResponseTemplate()
    }

    getGlobalSearchResponseTemplate(){
        return {
            resultInfo:{
                casesReturned:0,
                caseStartRecord:1,
                moreResulsToGo:false
            },
            results:[]
        }
    }

}

module.exports = new GlobalSearch();
