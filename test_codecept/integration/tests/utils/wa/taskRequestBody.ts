import { reporterJson, reporterMsg, setTestContext } from '../../utils/helper';

class TaskRequestBody {

    requestBody:any;

    constructor(){
        this.requestBody = {
            searchRequest:{
                search_by:'',
                sorting_parameters: [{ sort_by: "dueDate", sort_order: "asc"}],
                search_parameters:[],
                pagination_parameters: { page_number: 1, page_size:25},
            },
            view: ''
        };
    }

    inView(view:string){
        this.requestBody.view = view;
        return this;
    }

    searchBy(userType){
        this.requestBody.searchRequest.search_by = userType;
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

    searchWithAllUsers() {       
        const searchParamsWithAllUsers = [];
        for (const searchParam of this.requestBody.searchRequest.search_parameters){
            if (searchParam.key !== 'user'){
                searchParamsWithAllUsers.push(searchParam);
            }
        }
        this.requestBody.searchRequest.search_parameters = searchParamsWithAllUsers;
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
        } else  {
            if (locationId){
                usersConfig[0].values.push(locationId);
            }
        }
        return this;
    }

    searchWithJurisdiction(jurisdiction: string) {
        const jurisdictionConfig = this.requestBody.searchRequest.search_parameters.filter(searchField => searchField.key === "jurisdiction");
        if (jurisdictionConfig.length === 0) {
            this.requestBody.searchRequest.search_parameters.push({
                key: 'jurisdiction',
                operator: 'IN',
                values: jurisdiction ? [jurisdiction] : []
            })
        } else {
            if (jurisdiction) {
                jurisdictionConfig[0].values.push(jurisdiction);
            }
        }
        return this;
    }


    searchWithTaskType(taskType: string) {
        const taskTypeConfig = this.requestBody.searchRequest.search_parameters.filter(searchField => searchField.key === "taskType");
        if (taskTypeConfig.length === 0) {
            this.requestBody.searchRequest.search_parameters.push({
                key: 'taskType',
                operator: 'IN',
                values: taskType ? [taskType] : []
            })
        } else {
            if (taskType) {
                taskTypeConfig[0].values.push(taskType);
            }
        }
        return this;
    }
    searchWithAllLocations() {
        const searchParamsWithAllLocations = [];
        for (const searchParam of this.requestBody.searchRequest.search_parameters) {
            if (searchParam.key !== 'location') {
                searchParamsWithAllLocations.push(searchParam);
            }
        }
        this.requestBody.searchRequest.search_parameters = searchParamsWithAllLocations;
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
        // reporterJson(this.requestBody);
        return this.requestBody;
    }

}

export default TaskRequestBody;