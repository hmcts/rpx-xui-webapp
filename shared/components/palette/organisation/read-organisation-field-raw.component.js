"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var organisation_1 = require("../../../services/organisation");
var organisation_2 = require("../../../domain/organisation");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ReadOrganisationFieldRawComponent = /** @class */ (function (_super) {
    __extends(ReadOrganisationFieldRawComponent, _super);
    function ReadOrganisationFieldRawComponent(organisationService, organisationConverter) {
        var _this = _super.call(this) || this;
        _this.organisationService = organisationService;
        _this.organisationConverter = organisationConverter;
        _this.caseFields = [];
        return _this;
    }
    ReadOrganisationFieldRawComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        if (this.caseField.value && this.caseField.value.OrganisationID) {
            this.organisations$ = this.organisationService.getActiveOrganisations();
            this.selectedOrg$ = this.organisations$.pipe(operators_1.switchMap(function (organisations) { return rxjs_1.of(_this.organisationConverter.toSimpleOrganisationModel(organisations.find(function (findOrg) { return findOrg.organisationIdentifier === _this.caseField.value.OrganisationID; }))); }));
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ReadOrganisationFieldRawComponent.prototype, "caseFields", void 0);
    ReadOrganisationFieldRawComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-organisation-field-raw',
            template: "\n    <div class=\"complex-panel\">\n      <table class=\"complex-field-table\">\n        <tbody>\n          <tr>\n            <td>\n              <table class=\"complex-field-table\" *ngIf=\"(selectedOrg$ | async) as selectedOrg\">\n                <tr class=\"complex-panel-compound-field\">\n                  <td class=\"label-width-small\"><span class=\"text-16\">Name:</span></td>\n                  <td><span class=\"text-16\">{{selectedOrg.name}}</span></td>\n                </tr>\n                <tr class=\"complex-panel-compound-field\">\n                  <td class=\"label-width-small\"><span class=\"text-16\">Address:</span></td>\n                  <td>\n                    <ccd-markdown [content]=\"selectedOrg.address\"></ccd-markdown>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  ",
            styles: ["\n    .hmcts-banner{border:0 solid;margin-bottom:10px;color:#000000}.hmcts-banner .warning-message{font-weight:bold}.govuk-hint{font-size:1.1rem}.name-header{font-weight:bold;margin-top:10px;font-size:18px}.td-address{width:90%;padding-top:2px}.td-select{width:10%}.warning-panel{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel .warning-message{padding-left:15px}.complex-field-table>tbody>tr>th{border:none}.complex-field-table>tbody>tr:last-child>th,.complex-field-table>tbody>tr:last-child>td{border-bottom:none}.complex-field-title{width:300px}.label-width-small{width:100px}.label-width-medium{width:150px}.scroll-container{height:600px;overflow-y:scroll}.no-result-message{margin-top:15px}\n  "]
        }),
        __metadata("design:paramtypes", [organisation_1.OrganisationService, organisation_2.OrganisationConverter])
    ], ReadOrganisationFieldRawComponent);
    return ReadOrganisationFieldRawComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadOrganisationFieldRawComponent = ReadOrganisationFieldRawComponent;
//# sourceMappingURL=read-organisation-field-raw.component.js.map