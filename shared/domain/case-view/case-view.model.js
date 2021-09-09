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
var case_tab_model_1 = require("./case-tab.model");
var definition_1 = require("../definition");
var class_transformer_1 = require("class-transformer");
var ɵ0 = function () { return case_tab_model_1.CaseTab; }, ɵ1 = function () { return definition_1.CaseField; };
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
// @dynamic
var CaseView = /** @class */ (function () {
    function CaseView() {
    }
    __decorate([
        class_transformer_1.Type(ɵ0),
        __metadata("design:type", Array)
    ], CaseView.prototype, "tabs", void 0);
    __decorate([
        class_transformer_1.Type(ɵ1),
        __metadata("design:type", Array)
    ], CaseView.prototype, "metadataFields", void 0);
    return CaseView;
}());
exports.CaseView = CaseView;
//# sourceMappingURL=case-view.model.js.map