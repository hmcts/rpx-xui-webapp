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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var ReadCollectionFieldComponent = /** @class */ (function (_super) {
    __extends(ReadCollectionFieldComponent, _super);
    function ReadCollectionFieldComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDisplayContextParameterAvailable = false;
        return _this;
    }
    ReadCollectionFieldComponent.prototype.ngOnInit = function () {
        if (this.caseField.display_context_parameter && this.caseField.display_context_parameter.trim().startsWith('#TABLE(')) {
            this.isDisplayContextParameterAvailable = true;
        }
    };
    ReadCollectionFieldComponent.prototype.buildIdPrefix = function (index) {
        var prefix = "" + this.idPrefix + this.caseField.id + "_";
        if (this.caseField.field_type.collection_field_type.type === 'Complex') {
            return "" + prefix + index + "_";
        }
        return prefix;
    };
    ReadCollectionFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-collection-field',
            template: "\n    <table *ngIf=\"caseField.value && caseField.value.length \" class=\"collection-field-table\">\n      <ng-container [ngSwitch]=\"isDisplayContextParameterAvailable\">\n        <tbody *ngSwitchCase=\"true\">\n        <tr>\n          <td>\n            <ccd-field-read\n              [caseField]=\"{\n                id: caseField.label,\n                label: caseField.label,\n                field_type: caseField.field_type.collection_field_type,\n                display_context_parameter: caseField.display_context_parameter,\n                value: caseField.value,\n                hidden: caseField.hidden\n              }\"\n              [context]=\"context\"\n              [topLevelFormGroup]=\"topLevelFormGroup\">\n            </ccd-field-read>\n          </td>\n        </tr>\n        </tbody>\n        <tbody *ngSwitchCase=\"false\">\n        <tr *ngFor=\"let item of caseField.value; let i = index\">\n          <td>\n            <ccd-field-read\n              [caseField]=\"{\n                id: i,\n                label: caseField.label + ' ' + (i + 1),\n                field_type: caseField.field_type.collection_field_type,\n                value: item.value,\n                hidden: caseField.hidden\n              }\"\n              [context]=\"context\"\n              [topLevelFormGroup]=\"topLevelFormGroup\"\n              [idPrefix]=\"buildIdPrefix(i)\">\n            </ccd-field-read>\n          </td>\n        </tr>\n        </tbody>\n      </ng-container>\n    </table>\n  ",
            styles: ["\n    .collection-field-table tr:first-child>td{padding-top:0}.collection-field-table tr:last-child>td{border-bottom:none}.collection-field-table td.collection-actions{width:1px;white-space:nowrap}.error-spacing{margin-top:10px}.collection-title{height:51px}.float-left{float:left;padding-top:8px}.float-right{float:right}.complex-panel{margin:13px 0px;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px;border-bottom:1px solid #bfc1c3;font-weight:bold;display:block;color:#0b0c0c;padding-bottom:2px;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.31579}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}.collection-indicator{border-left:solid 5px #b1b4b6}\n  "]
        })
    ], ReadCollectionFieldComponent);
    return ReadCollectionFieldComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadCollectionFieldComponent = ReadCollectionFieldComponent;
//# sourceMappingURL=read-collection-field.component.js.map