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
var ReadComplexFieldTableComponent = /** @class */ (function (_super) {
    __extends(ReadComplexFieldTableComponent, _super);
    function ReadComplexFieldTableComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.caseFields = [];
        return _this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ReadComplexFieldTableComponent.prototype, "caseFields", void 0);
    ReadComplexFieldTableComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-complex-field-table',
            template: "\n    <div class=\"complex-panel\">\n      <dl class=\"complex-panel-title\"><dt><span class=\"text-16\">{{caseField.label}}</span></dt><dd></dd></dl>\n      <table class=\"complex-panel-table\">\n        <tbody>\n          <ng-container *ngFor=\"let field of caseField | ccdReadFieldsFilter:false :undefined :true\">\n            <ng-container *ngIf=\"(field | ccdIsCompound); else SimpleRow\">\n              <tr class=\"complex-panel-compound-field\" [hidden]=\"field.hidden\">\n                <td colspan=\"2\">\n                  <span class=\"text-16\">\n                    <ccd-field-read [topLevelFormGroup]=\"topLevelFormGroup\"\n                      [caseField]=\"field\" [context]=\"context\"></ccd-field-read>\n                  </span>\n                </td>\n              </tr>\n            </ng-container>\n            <ng-template #SimpleRow>\n              <tr class=\"complex-panel-simple-field\" [hidden]=\"field.hidden\">\n                <th><span class=\"text-16\">{{field.label}}</span></th>\n                <td>\n                    <span class=\"text-16\">\n                      <ccd-field-read [topLevelFormGroup]=\"topLevelFormGroup\"\n                        [caseField]=\"field\" [context]=\"context\"></ccd-field-read>\n                    </span>\n                </td>\n              </tr>\n            </ng-template>\n          </ng-container>\n        </tbody>\n      </table>\n    </div>\n  ",
            styles: ["\n    .complex-panel{margin:13px 0px;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px;border-bottom:1px solid #bfc1c3;font-weight:bold;display:block;color:#0b0c0c;padding-bottom:2px;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.31579}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}\n  "]
        })
    ], ReadComplexFieldTableComponent);
    return ReadComplexFieldTableComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadComplexFieldTableComponent = ReadComplexFieldTableComponent;
//# sourceMappingURL=read-complex-field-table.component.js.map