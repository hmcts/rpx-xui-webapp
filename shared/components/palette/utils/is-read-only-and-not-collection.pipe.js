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
var case_fields_1 = require("../../../services/case-fields");
var IsReadOnlyAndNotCollectionPipe = /** @class */ (function () {
    function IsReadOnlyAndNotCollectionPipe(caseFieldService) {
        this.caseFieldService = caseFieldService;
    }
    ;
    IsReadOnlyAndNotCollectionPipe.prototype.transform = function (field) {
        if (!field || !field.field_type || !field.field_type.type) {
            return false;
        }
        if (this.isCollection(field)) {
            return false;
        }
        return this.caseFieldService.isReadOnly(field);
    };
    // CaseField @Expose() doesn't work with the pipe in here, so leaving the manual check
    IsReadOnlyAndNotCollectionPipe.prototype.isCollection = function (field) {
        return field.field_type && field.field_type.type === 'Collection';
    };
    IsReadOnlyAndNotCollectionPipe = __decorate([
        core_1.Pipe({
            name: 'ccdIsReadOnlyAndNotCollection'
        }),
        __metadata("design:paramtypes", [case_fields_1.CaseFieldService])
    ], IsReadOnlyAndNotCollectionPipe);
    return IsReadOnlyAndNotCollectionPipe;
}());
exports.IsReadOnlyAndNotCollectionPipe = IsReadOnlyAndNotCollectionPipe;
//# sourceMappingURL=is-read-only-and-not-collection.pipe.js.map