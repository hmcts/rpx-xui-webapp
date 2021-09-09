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
var forms_1 = require("@angular/forms");
var case_edit_component_1 = require("../case-edit/case-edit.component");
var router_1 = require("@angular/router");
var fields_utils_1 = require("../../../services/fields/fields.utils");
var CaseEditConfirmComponent = /** @class */ (function () {
    function CaseEditConfirmComponent(caseEdit, router) {
        this.caseEdit = caseEdit;
        this.router = router;
        this.triggerText = 'Close and Return to case details';
        this.formGroup = new forms_1.FormControl();
        this.eventTrigger = this.caseEdit.eventTrigger;
        this.editForm = this.caseEdit.form;
        this.caseFields = this.getCaseFields();
        if (this.caseEdit.confirmation) {
            this.confirmation = this.caseEdit.confirmation;
            this.caseId = this.caseEdit.confirmation.getCaseId();
        }
        else {
            this.router.navigate(['/']);
        }
    }
    CaseEditConfirmComponent.prototype.submit = function () {
        this.caseEdit.submitted.emit({ caseId: this.confirmation.getCaseId(), status: this.confirmation.getStatus() });
    };
    CaseEditConfirmComponent.prototype.getCaseId = function () {
        return (this.caseEdit.caseDetails ? this.caseEdit.caseDetails.case_id : '');
    };
    CaseEditConfirmComponent.prototype.getCaseTitle = function () {
        return (this.caseEdit.caseDetails && this.caseEdit.caseDetails.state &&
            this.caseEdit.caseDetails.state.title_display ? this.caseEdit.caseDetails.state.title_display : '');
    };
    CaseEditConfirmComponent.prototype.getCaseFields = function () {
        if (this.caseEdit.caseDetails) {
            return fields_utils_1.FieldsUtils.getCaseFields(this.caseEdit.caseDetails);
        }
        return this.eventTrigger.case_fields;
    };
    CaseEditConfirmComponent = __decorate([
        core_1.Component({
            template: "\n    <!-- Current Page && Event trigger name -->\n    <h1 class=\"heading-h1\">{{ eventTrigger.name}}</h1>\n\n    <!--Case ID or Title -->\n    <div *ngIf=\"getCaseTitle(); then titleBlock; else idBlock\"></div>\n    <ng-template #titleBlock>\n      <h2 class=\"heading-h2\" [innerHTML]=\"getCaseTitle() | ccdCaseTitle: caseFields : editForm.controls['data']\"></h2>\n    </ng-template>\n    <ng-template #idBlock>\n      <h2 *ngIf=\"getCaseId()\" class=\"heading-h2\">#{{ getCaseId() | ccdCaseReference }}</h2>\n    </ng-template>\n\n    <form [formGroup]=\"formGroup\" (submit)=\"submit()\">\n      <div id=\"confirmation-header\" *ngIf=\"confirmation.getHeader()\">\n        <ccd-markdown [content]=\"confirmation.getHeader()\"></ccd-markdown>\n      </div>\n      <div id=\"confirmation-body\" *ngIf=\"confirmation.getBody()\">\n        <ccd-markdown [content]=\"confirmation.getBody()\"></ccd-markdown>\n      </div>\n      <button type=\"submit\" class=\"button\" data-ng-click=\"submit()\">{{this.triggerText}}</button>\n    </form>\n  ",
            styles: ["\n    #fieldset-case-data{margin-bottom:30px}#fieldset-case-data th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}#confirmation-header{width:630px;background-color:#17958b;border:solid 1px #979797;color:#ffffff;text-align:center}#confirmation-body{width:630px;background-color:#ffffff}.valign-top{vertical-align:top}.summary-fields{margin-bottom:30px}.summary-fields tbody tr th,.summary-fields tbody tr td{border-bottom:0px}a.disabled{pointer-events:none;cursor:default}.case-field-label{width:45%}.case-field-content{width:50%}.case-field-change{width:5%}\n  "]
        }),
        __metadata("design:paramtypes", [case_edit_component_1.CaseEditComponent, router_1.Router])
    ], CaseEditConfirmComponent);
    return CaseEditConfirmComponent;
}());
exports.CaseEditConfirmComponent = CaseEditConfirmComponent;
//# sourceMappingURL=case-edit-confirm.component.js.map