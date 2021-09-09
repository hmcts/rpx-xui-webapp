"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jurisdiction_test_fixture_1 = require("./jurisdiction.test.fixture");
var case_tab_test_fixture_1 = require("./case-tab.test.fixture");
var case_view_event_test_fixture_1 = require("./case-view-event.test.fixture");
var domain_1 = require("../components/case-history/domain");
exports.createCaseHistory = function () {
    var caseHistory = new domain_1.CaseHistory();
    var caseHistoryCaseType = new domain_1.CaseHistoryCaseType();
    caseHistory.case_id = '1';
    caseHistoryCaseType.id = 'TestAddressBookCase';
    caseHistoryCaseType.name = 'Test Address Book Case';
    caseHistoryCaseType.jurisdiction = jurisdiction_test_fixture_1.createJurisdiction();
    caseHistory.caseType = caseHistoryCaseType;
    caseHistory.tabs = case_tab_test_fixture_1.createCaseTabArray();
    caseHistory.event = case_view_event_test_fixture_1.createCaseViewEvent();
    return caseHistory;
};
//# sourceMappingURL=case-history.test.fixture.js.map