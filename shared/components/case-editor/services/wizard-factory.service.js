"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var domain_1 = require("../domain");
var WizardFactoryService = /** @class */ (function () {
    function WizardFactoryService() {
    }
    WizardFactoryService.prototype.create = function (eventTrigger) {
        return new domain_1.Wizard(eventTrigger.wizard_pages);
    };
    return WizardFactoryService;
}());
exports.WizardFactoryService = WizardFactoryService;
//# sourceMappingURL=wizard-factory.service.js.map