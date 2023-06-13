class WAUtils{


     getTaskListReqSearchParam(reqBody, key, operator) {
        console.log();
        const searhParam = reqBody.searchRequest.search_parameters.filter(searchParam => searchParam.key === key && searchParam.operator === operator);
        if (searhParam.length === 0) {
            return null;
        }
        return searhParam[0].values;
    }

     getTaskListReqSortParam(reqBody) {
        const searhParam = reqBody.searchRequest.search_parameters.filter(searchParam => searchParam.operator === "sort");
        if (searhParam.length === 0) {
            return null;
        }
        return searhParam[0].key;
    }

}

module.exports = new WAUtils();
