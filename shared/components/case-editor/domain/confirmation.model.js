"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Confirmation = /** @class */ (function () {
    function Confirmation(caseId, status, header, body) {
        this.caseId = caseId;
        this.status = status;
        this.header = header;
        this.body = body;
    }
    Confirmation.prototype.getCaseId = function () {
        return this.caseId;
    };
    Confirmation.prototype.getStatus = function () {
        return this.status;
    };
    Confirmation.prototype.getHeader = function () {
        return this.header;
    };
    Confirmation.prototype.getBody = function () {
        return this.body;
    };
    return Confirmation;
}());
exports.Confirmation = Confirmation;
//# sourceMappingURL=confirmation.model.js.map