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
/**
 * Display a complex type fields as a list of values without labels.
 * This is intended for rendering of Check Your Answer page.
 */
var ReadComplexFieldRawComponent = /** @class */ (function (_super) {
    __extends(ReadComplexFieldRawComponent, _super);
    function ReadComplexFieldRawComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.caseFields = [];
        return _this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ReadComplexFieldRawComponent.prototype, "caseFields", void 0);
    ReadComplexFieldRawComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-complex-field-raw',
            template: "\n    <dl class=\"complex-raw\">\n      <ng-container *ngFor=\"let field of caseField | ccdReadFieldsFilter:false :undefined :true :topLevelFormGroup :id()\">\n        <dt [hidden]=\"field.hidden || field.field_type.type === 'Label'\"><span class=\"text-16\">{{field.label}}</span></dt>\n        <dd [hidden]=\"field.hidden\">\n          <ccd-field-read [caseField]=\"field\" [context]=\"context\" [caseFields]=\"caseFields\" [topLevelFormGroup]=\"topLevelFormGroup\" [idPrefix]=\"idPrefix\"></ccd-field-read>\n        </dd>\n      </ng-container>\n    </dl>\n  ",
            styles: ["\n    dl.complex-raw{list-style-type:none;margin:5px 0 10px 0}dl.complex-raw dl.complex-raw{padding-left:2ch}dl.complex-raw dt{font-weight:bold}\n  "],
        })
    ], ReadComplexFieldRawComponent);
    return ReadComplexFieldRawComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadComplexFieldRawComponent = ReadComplexFieldRawComponent;
//# sourceMappingURL=read-complex-field-raw.component.js.map