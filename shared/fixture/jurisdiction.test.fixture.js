"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var domain_1 = require("../domain");
exports.createJurisdiction = function () {
    var jurisdiction = new domain_1.Jurisdiction();
    jurisdiction.id = 'TEST';
    jurisdiction.name = 'test';
    jurisdiction.description = 'test';
    return jurisdiction;
};
//# sourceMappingURL=jurisdiction.test.fixture.js.map