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
var core_1 = require("@angular/core");
var domain_1 = require("../../domain");
var CaseHeaderComponent = /** @class */ (function () {
    function CaseHeaderComponent() {
    }
    CaseHeaderComponent.prototype.ngOnInit = function () {
        this.caseTitle = new domain_1.CaseField();
        if (!this.isDraft() && this.caseDetails.state.title_display) {
            this.caseTitle.label = this.caseDetails.state.title_display;
            this.caseFields = this.getCaseFields();
        }
    };
    CaseHeaderComponent.prototype.isDraft = function () {
        return domain_1.Draft.isDraft(this.caseDetails.case_id);
    };
    CaseHeaderComponent.prototype.getCaseFields = function () {
        var caseDataFields = this.caseDetails.tabs.reduce(function (acc, tab) {
            return acc.concat(tab.fields);
        }, []);
        return caseDataFields.concat(this.caseDetails.metadataFields);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.CaseView)
    ], CaseHeaderComponent.prototype, "caseDetails", void 0);
    CaseHeaderComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-header',
            template: "\n    <h1 *ngIf=\"!caseTitle.label\" class=\"heading-h1\">#{{ caseDetails.case_id | ccdCaseReference}}</h1>\n\n    <div *ngIf=\"caseTitle.label\" class=\"case-title\">\n      <ccd-label-field [caseField]=\"caseTitle\" [caseFields]=\"caseFields\"></ccd-label-field>\n    </div>\n  ",
            styles: ["\n    .case-title{margin-top:47px;margin-bottom:10px}.heading-h1{margin-top:40px}\n  "]
        })
    ], CaseHeaderComponent);
    return CaseHeaderComponent;
}());
exports.CaseHeaderComponent = CaseHeaderComponent;
//# sourceMappingURL=case-header.component.js.map