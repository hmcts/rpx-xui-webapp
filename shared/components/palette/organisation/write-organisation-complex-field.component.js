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
var abstract_form_field_component_1 = require("../base-field/abstract-form-field.component");
var rxjs_1 = require("rxjs");
var WriteOrganisationComplexFieldComponent = /** @class */ (function (_super) {
    __extends(WriteOrganisationComplexFieldComponent, _super);
    function WriteOrganisationComplexFieldComponent() {
        return _super.call(this) || this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", rxjs_1.Observable)
    ], WriteOrganisationComplexFieldComponent.prototype, "selectedOrg$", void 0);
    WriteOrganisationComplexFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-organisation-complex-field',
            template: "\n    <div>\n      <input type=\"hidden\" name=\"organisationID\" [value]=\"(selectedOrg$ | async)?.organisationIdentifier\">\n      <input type=\"hidden\" name=\"organisationName\" [value]=\"(selectedOrg$ | async)?.name\">\n    </div>\n  ",
            styles: ["\n    .hmcts-banner{border:0 solid;margin-bottom:10px;color:#000000}.hmcts-banner .warning-message{font-weight:bold}.govuk-hint{font-size:1.1rem}.name-header{font-weight:bold;margin-top:10px;font-size:18px}.td-address{width:90%;padding-top:2px}.td-select{width:10%}.warning-panel{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel .warning-message{padding-left:15px}.complex-field-table>tbody>tr>th{border:none}.complex-field-table>tbody>tr:last-child>th,.complex-field-table>tbody>tr:last-child>td{border-bottom:none}.complex-field-title{width:300px}.label-width-small{width:100px}.label-width-medium{width:150px}.scroll-container{height:600px;overflow-y:scroll}.no-result-message{margin-top:15px}\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], WriteOrganisationComplexFieldComponent);
    return WriteOrganisationComplexFieldComponent;
}(abstract_form_field_component_1.AbstractFormFieldComponent));
exports.WriteOrganisationComplexFieldComponent = WriteOrganisationComplexFieldComponent;
//# sourceMappingURL=write-organisation-complex-field.component.js.map