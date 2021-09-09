"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_1 = require("class-transformer");
var domain_1 = require("../../../domain");
var ɵ0 = function () { return domain_1.Jurisdiction; };
exports.ɵ0 = ɵ0;
// @dynamic
var CaseHistoryCaseType = /** @class */ (function () {
    function CaseHistoryCaseType() {
    }
    __decorate([
        class_transformer_1.Type(ɵ0),
        __metadata("design:type", domain_1.Jurisdiction)
    ], CaseHistoryCaseType.prototype, "jurisdiction", void 0);
    return CaseHistoryCaseType;
}());
exports.CaseHistoryCaseType = CaseHistoryCaseType;
var ɵ1 = function () { return CaseHistoryCaseType; }, ɵ2 = function () { return domain_1.CaseTab; }, ɵ3 = function () { return domain_1.CaseViewEvent; };
exports.ɵ1 = ɵ1;
exports.ɵ2 = ɵ2;
exports.ɵ3 = ɵ3;
// @dynamic
var CaseHistory = /** @class */ (function () {
    function CaseHistory() {
    }
    __decorate([
        class_transformer_1.Type(ɵ1),
        __metadata("design:type", CaseHistoryCaseType)
    ], CaseHistory.prototype, "caseType", void 0);
    __decorate([
        class_transformer_1.Type(ɵ2),
        __metadata("design:type", Array)
    ], CaseHistory.prototype, "tabs", void 0);
    __decorate([
        class_transformer_1.Type(ɵ3),
        __metadata("design:type", domain_1.CaseViewEvent)
    ], CaseHistory.prototype, "event", void 0);
    return CaseHistory;
}());
exports.CaseHistory = CaseHistory;
//# sourceMappingURL=case-history.model.js.map