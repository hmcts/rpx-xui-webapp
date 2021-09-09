"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IsCompoundPipe = /** @class */ (function () {
    function IsCompoundPipe() {
    }
    IsCompoundPipe_1 = IsCompoundPipe;
    IsCompoundPipe.prototype.transform = function (field) {
        if (!field || !field.field_type || !field.field_type.type) {
            return false;
        }
        if (IsCompoundPipe_1.COMPOUND_TYPES.indexOf(field.field_type.type) !== -1) {
            if (IsCompoundPipe_1.EXCLUDE.indexOf(field.field_type.id) !== -1) {
                return false;
            }
            return true;
        }
        return false;
    };
    var IsCompoundPipe_1;
    IsCompoundPipe.COMPOUND_TYPES = [
        'Complex', 'Label', 'AddressGlobal', 'AddressUK', 'AddressGlobalUK', 'CasePaymentHistoryViewer', 'CaseHistoryViewer', 'Organisation'
    ];
    IsCompoundPipe.EXCLUDE = [
        'CaseLink'
    ];
    IsCompoundPipe = IsCompoundPipe_1 = __decorate([
        core_1.Pipe({
            name: 'ccdIsCompound'
        })
    ], IsCompoundPipe);
    return IsCompoundPipe;
}());
exports.IsCompoundPipe = IsCompoundPipe;
//# sourceMappingURL=is-compound.pipe.js.map