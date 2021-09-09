"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CcdCYAPageLabelFilterPipe = /** @class */ (function () {
    function CcdCYAPageLabelFilterPipe() {
        this.getNonLabelComplexFieldType = function (complexFields) {
            return complexFields.filter(function (caseField) { return caseField.field_type.type !== 'Label'; });
        };
    }
    CcdCYAPageLabelFilterPipe.prototype.transform = function (caseFields) {
        var _this = this;
        return caseFields.map(function (caseField) {
            if (caseField.field_type.collection_field_type &&
                caseField.field_type.collection_field_type.complex_fields &&
                caseField.field_type.collection_field_type.complex_fields.length) {
                caseField.field_type.collection_field_type.complex_fields = _this.transform(caseField.field_type.collection_field_type.complex_fields);
            }
            if (caseField.field_type.complex_fields && caseField.field_type.complex_fields.length) {
                caseField.field_type.complex_fields = _this.getNonLabelComplexFieldType(caseField.field_type.complex_fields);
            }
            return caseField;
        });
    };
    CcdCYAPageLabelFilterPipe = __decorate([
        core_1.Pipe({
            name: 'ccdCYAPageLabelFilter'
        })
    ], CcdCYAPageLabelFilterPipe);
    return CcdCYAPageLabelFilterPipe;
}());
exports.CcdCYAPageLabelFilterPipe = CcdCYAPageLabelFilterPipe;
//# sourceMappingURL=ccd-cyapage-label-filter.pipe.js.map