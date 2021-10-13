class TaskRequestBody{

    requestBody:any;

    constructor(){
        this.requestBody = {
            searchRequest:{
                sorting_parameters:[],
                search_parameters:[],
                pagination_parameters: { page_number: 1, page_size:10},
                view:''
            }
        }
    }

    inView(view:string){
        this.requestBody.searchRequest.view = view;
        return this;
    }

    searchWithUser(idamId:string){
        const usersConfig = this.requestBody.searchRequest.search_parameters.filter(searchField => searchField.key === "user");
        if (usersConfig.length === 0) {
            this.requestBody.searchRequest.search_parameters.push({
                key: 'user',
                operator: 'IN',
                values: idamId ? [idamId] : []
            })
        }else{
            idamId ? usersConfig[0].values.push(idamId) : '';
        }
        return this;
    }

    searchWithlocation(locationId: string) {
        const usersConfig = this.requestBody.searchRequest.search_parameters.filter(searchField => searchField.key === "location");
        if (usersConfig.length === 0) {
            this.requestBody.searchRequest.search_parameters.push({
                key: 'location',
                operator: 'IN',
                values: locationId ? [locationId]: []
            })
        } else {
            locationId ? usersConfig[0].values.push(locationId):'';
        }
        return this;
    }

    searchWithState(state: string) {
        const usersConfig = this.requestBody.searchRequest.search_parameters.filter(searchField => searchField.key === "state");
        if (usersConfig.length === 0) {
            this.requestBody.searchRequest.search_parameters.push({
                key: 'state',
                operator: 'IN',
                values: state ? [state] : []
            })
        } else {
            state ? usersConfig[0].values.push(state) : '';
        }
        return this;
    }

    sortWith(sortBy:string, sortOrder:string){
        this.requestBody.searchRequest.sorting_parameters.push({ sort_by:sortBy, sort_order:sortOrder});
        return this;
    }

    withPageSize(size:number){
        this.requestBody.searchRequest.pagination_parameters.page_size = size;
        return this;

    }

    withPageNumber(pageNum:number){
        this.requestBody.searchRequest.pagination_parameters.page_number = pageNum;
        return this;
    }

    getRequestBody(){
        return this.requestBody;
    }

}

export default TaskRequestBody;