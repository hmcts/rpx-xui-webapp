

class CaseListPage{

    constructor(){
        this.caselistComponent = $('.case-list-component');
    }

    async amOnPage(){
        return this.caselistComponent.isPresent(); 
    }


}

module.exports = CaseListPage;