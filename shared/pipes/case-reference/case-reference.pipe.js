"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var draft_model_1 = require("../../domain/draft.model");
var CaseReferencePipe = /** @class */ (function () {
    function CaseReferencePipe() {
    }
    CaseReferencePipe.prototype.transform = function (caseReference) {
        if (!caseReference) {
            return '';
        }
        if (draft_model_1.Draft.isDraft(caseReference)) {
            return draft_model_1.DRAFT_PREFIX;
        }
        else {
            return String(caseReference).replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
        }
    };
    CaseReferencePipe = __decorate([
        core_1.Pipe({
            name: 'ccdCaseReference'
        })
    ], CaseReferencePipe);
    return CaseReferencePipe;
}());
exports.CaseReferencePipe = CaseReferencePipe;
//# sourceMappingURL=case-reference.pipe.js.map