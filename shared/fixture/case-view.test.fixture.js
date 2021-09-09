"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var case_tab_test_fixture_1 = require("./case-tab.test.fixture");
var domain_1 = require("../domain");
exports.createCaseView = function () {
    var caseView = new domain_1.CaseView();
    caseView.case_id = '1234567890123456';
    caseView.case_type = {
        id: 'TestAddressBookCase',
        name: 'Test Address Book Case',
        jurisdiction: {
            id: 'TEST',
            name: 'Test',
        }
    };
    caseView.state = {
        id: 'CaseCreated',
        name: 'Case created'
    };
    caseView.tabs = case_tab_test_fixture_1.createCaseTabArray();
    caseView.metadataFields = [({
            id: '[STATE]',
            label: 'State',
            display_context: 'READONLY',
            field_type: {
                id: 'Text',
                type: 'Text'
            },
            order: 2,
            value: 'State1',
            show_condition: ''
        })];
    return caseView;
};
//# sourceMappingURL=case-view.test.fixture.js.map