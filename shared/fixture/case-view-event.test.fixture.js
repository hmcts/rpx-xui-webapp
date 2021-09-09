"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var domain_1 = require("../domain");
exports.createCaseViewEvent = function () {
    var caseViewEvent = new domain_1.CaseViewEvent();
    caseViewEvent.id = 5;
    caseViewEvent.timestamp = '2017-05-10T10:00:00Z';
    caseViewEvent.summary = 'Case updated again!';
    caseViewEvent.comment = 'Latest update';
    caseViewEvent.event_id = 'updateCase';
    caseViewEvent.event_name = 'Update a case';
    caseViewEvent.state_id = 'CaseUpdated';
    caseViewEvent.state_name = 'Case Updated';
    caseViewEvent.user_id = 0;
    caseViewEvent.user_last_name = 'smith';
    caseViewEvent.user_first_name = 'justin';
    return caseViewEvent;
};
//# sourceMappingURL=case-view-event.test.fixture.js.map