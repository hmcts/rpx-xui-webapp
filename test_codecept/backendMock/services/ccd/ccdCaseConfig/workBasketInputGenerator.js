const CCDCaseField = require('./CCDCaseField');

const fieldTemplate = {
    "label": "Case Reference Number",
    "order": 1,
    "field": {
        "id": "[CASE_REFERENCE]",
        "elementPath": null,
        "metadata": true,
        "field_type": null,
        "show_condition": null
    },
    "display_context_parameter": null
}

class WorkBasketInputs extends CCDCaseField{
    
    constructor(){
        super();

        this.config = {
            workbasketInputs: []
        }   
     }

     addField(fieldConfig){
         const fieldTemplateCopy = JSON.parse(JSON.stringify(fieldTemplate));
         fieldTemplateCopy.order = this.config.workbasketInputs.length + 1; 
         fieldTemplateCopy.label = fieldConfig.label;
         fieldTemplateCopy.field.id = fieldConfig.id;
         fieldTemplateCopy.field.show_condition = fieldConfig.show_condition ? fieldConfig : null; 
         fieldTemplateCopy.display_context_parameter = fieldConfig.display_context_parameter ? fieldConfig.displaycontextParameter : null; 
         
         fieldTemplateCopy.field.field_type = this.getCCDFieldTemplateCopy(fieldConfig).field_type;
         this.config.workbasketInputs.push(fieldTemplateCopy);
         return this;
     }

     getConfig(){
         return this.config;
     }

}

module.exports = WorkBasketInputs;
