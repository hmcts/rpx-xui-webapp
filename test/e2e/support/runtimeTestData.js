

class RuntimeTestData{

    constructor(){
      this.init(); 
    }

   init(){
       this.workbasketInputs = { jurisdiction: "", casetype: "", state: "", casetypes: [] }
       this.searchCasesInputs = { jurisdiction: "", casetype: "", casetypes: [] }

   } 

}

module.exports = new RuntimeTestData();
