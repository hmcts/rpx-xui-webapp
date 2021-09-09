"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var domain_1 = require("../domain");
var class_transformer_1 = require("class-transformer");
exports.createCaseTabArray = function () {
    var tab1 = new domain_1.CaseTab();
    tab1.id = 'AddressTab';
    tab1.label = 'Address';
    tab1.order = 2;
    tab1.fields = [];
    tab1.show_condition = 'PersonFirstName="Janet"';
    var tab2 = new domain_1.CaseTab();
    tab2.id = 'NameTab';
    tab2.label = 'Name';
    tab2.order = 1;
    tab2.fields = [
        class_transformer_1.plainToClass(domain_1.CaseField, {
            id: 'PersonFirstName',
            label: 'First name',
            display_context: 'OPTIONAL',
            field_type: {
                id: 'Text',
                type: 'Text'
            },
            order: 2,
            value: 'Janet',
            show_condition: ''
        }),
        class_transformer_1.plainToClass(domain_1.CaseField, {
            id: 'PersonLastName',
            label: 'Last name',
            display_context: 'OPTIONAL',
            field_type: {
                id: 'Text',
                type: 'Text'
            },
            order: 1,
            value: 'Parker',
            show_condition: ''
        }),
        class_transformer_1.plainToClass(domain_1.CaseField, {
            id: 'PersonComplex',
            label: 'Complex field',
            display_context: 'OPTIONAL',
            field_type: {
                id: 'Complex',
                type: 'Complex',
                complex_fields: []
            },
            order: 3,
            show_condition: 'PersonLastName="Parker"'
        })
    ];
    tab2.show_condition = 'PersonFirstName="Janet"';
    var tab3 = new domain_1.CaseTab();
    tab3.id = 'SomeTab';
    tab3.label = 'Some Tab';
    tab3.order = 3;
    tab3.fields = [];
    tab3.show_condition = '';
    return [tab1, tab2, tab3];
};
//# sourceMappingURL=case-tab.test.fixture.js.map