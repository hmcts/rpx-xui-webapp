

const ccdFieldTemplate = {
    "id": "testTextField",
    "label": "Organisation ID",
    "hidden": null,
    "order": null,
    "metadata": false,
    "case_type_id": null,
    "hint_text": null,
    "field_type": {
        "id": "Text",
        "type": "Text",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
    },
    "security_classification": "PUBLIC",
    "live_from": null,
    "live_until": null,
    "show_condition": null,
    "acls": [

    ],
    "complexACLs": [],
    "display_context": "OPTIONAL",
    "display_context_parameter": null,
    "formatted_value": null,
    "default_value": null,
    "retain_hidden_value": null,
    "show_summary_change_option": true,
    "show_summary_content_option": null,
    "retain_hidden_value": null
};


class CCDcaseField{

    currentCaseField = null;

    getCCDFieldTemplateCopy(fieldConfig) {
        const template = JSON.parse(JSON.stringify(ccdFieldTemplate));

        switch (fieldConfig.type) {
            case "AddressGlobalUK":
            case "AddressUK":
                template.field_type.id = fieldConfig.type;
                template.field_type.type = "Complex";
                const add1 = this.getCCDFieldTemplateCopy({type: "Text", id: "AddressLine1", label: "Building and Street"});
                const add2 = this.getCCDFieldTemplateCopy({ type: "Text", id: "AddressLine2", label:"Address Line 2"});
                const add3 = this.getCCDFieldTemplateCopy({ type: "Text", id: "AddressLine3", label:"Address Line 3"});
                const postTown = this.getCCDFieldTemplateCopy({ type: "Text", id: "PostTown", label:"Town or City"});
                const county = this.getCCDFieldTemplateCopy({ type: "Text", id: "County", label:"County"});
                const postCode = this.getCCDFieldTemplateCopy({ type: "Text", id: "PostCode", label:"Postcode/Zipcode"});
                const country = this.getCCDFieldTemplateCopy({ type: "Text", id: "Country", label:"Country"});

                template.field_type.complex_fields = [add1, add2, add3, postTown, county, postCode, country];
                break;
            case "AddressLine1":
                template.field_type.id = "TextMax150";
                template.field_type.type = "Text"
                template.field_type.max = 150;
                break;
            case "AddressLine2":
            case "AddressLine3":
            case "PostTown":
            case "county":
            case "Country":
                template.field_type.id = "TextMax50";
                template.field_type.type = "Text"
                template.field_type.max = 50;
                break;
            case "PostCode":
                template.field_type.id = "TextMax14";
                template.field_type.type = "Text"
                template.field_type.max = 14;
                break
            case "OrderSummary":
            case "CaseLink":
            case "Organisation":
                template.field_type.id = fieldConfig.type;
                template.field_type.type = "Complex";
                break;
            case "Organisation":
                template.field_type.id = "OrganisationPolicy";
                template.field_type.type = "Complex";

                const OrgPolicyCaseAssignedRole = this.getCCDFieldTemplateCopy({type:"Text", id: "OrgPolicyCaseAssignedRole", label:"Case Assigned Role"});

                const organisation = this.getCCDFieldTemplateCopy({type: "Complex", id: "Organisation", label: "Organisation"});
                organisation.field_type.id = "Organisation;";
                const orgId = this.getCCDFieldTemplateCopy({type: "Text", id: "OrganisationID", label: "Organisation ID"});
                const orgNaMe = this.getCCDFieldTemplateCopy({type: "Text", id: "OrganisationName", label: "Name"});
                organisation.field_type.omplex_fields = [orgId, orgNaMe];

                template.field_type.complex_fields = [OrgPolicyCaseAssignedRole, organisation];

            default:
                template.field_type.id = fieldConfig.type;
                template.field_type.type = fieldConfig.type;
        }

        if(fieldConfig.list){
            template.field_type.fixed_list_items = fieldConfig.list; 
        }


        template.id = fieldConfig.id ? fieldConfig.id : fieldConfig.label ?  this.toCamelCase(fieldConfig.label) : "No id or label provided";
        template.label = fieldConfig.label ? fieldConfig.label : fieldConfig.id ? this.toDeCamelize(fieldConfig.id) : "Nameless field";
        this.ConfigureCCDField(template, fieldConfig);
        if (fieldConfig.value) {
            template.value = fieldConfig.value
        }

        if (fieldConfig.props){
            this.setObjectProps(template, fieldConfig.props);
        }
        return template;
    }

    ConfigureCCDField(parentField, fieldConfig) {

        if (fieldConfig.type === "Complex") {
            fieldConfig.complex_fields.forEach((complexFieldConfig) => {
                // console.log(" complex field config " + JSON.stringify(complexFieldConfig));

                const complexCCDField = this.getCCDFieldTemplateCopy(complexFieldConfig)
                parentField.field_type.complex_fields.push(complexCCDField);
                // this.ConfigureCCDField(complexCCDField, complexFieldConfig);
            });
        } else if (fieldConfig.type === "Collection") {
            const collectionCCDField = this.getCCDFieldTemplateCopy(fieldConfig.collection_field_type)
            parentField.field_type.collection_field_type = collectionCCDField.field_type;
            // this.ConfigureCCDField(collectionCCDField, fieldConfig.collectionField);

        }
    }
 
    setObjectProps(fieldObj, props) {
        Object.keys(props).forEach(key => {
            fieldObj[key] = props[key];
        });
    }

    toCamelCase(str) {
        return str.split(' ').map(function (word, index) {
            // If it is the first word make sure to lowercase all the chars.
            if (index == 0) {
                return word.toLowerCase();
            }
            // If it is not the first word only upper case the first char and lowercase the rest.
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    }

    toDeCamelize(str){
        console.log("str of toDeCamelize : "+str);
        return str
            .replace(/([a-z\d])([A-Z])/g, '$1 $2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
            .toLowerCase(); 
    }


}

module.exports = CCDcaseField;