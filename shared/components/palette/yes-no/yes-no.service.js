"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var YesNoService = /** @class */ (function () {
    function YesNoService() {
    }
    YesNoService_1 = YesNoService;
    YesNoService.prototype.format = function (value) {
        if (this.isYes(value)) {
            return YesNoService_1.YES;
        }
        else if (this.isNo(value)) {
            return YesNoService_1.NO;
        }
        return YesNoService_1.EMPTY;
    };
    YesNoService.prototype.isYes = function (value) {
        switch (typeof (value)) {
            case 'boolean':
                return value;
            case 'string':
                return YesNoService_1.YES_INPUTS.indexOf(value.toUpperCase()) !== -1;
        }
        return false;
    };
    YesNoService.prototype.isNo = function (value) {
        switch (typeof (value)) {
            case 'boolean':
                return !value;
            case 'string':
                return YesNoService_1.NO_INPUTS.indexOf(value.toUpperCase()) !== -1;
        }
        return false;
    };
    var YesNoService_1;
    YesNoService.YES_INPUTS = [
        'Y',
        'YES'
    ];
    YesNoService.NO_INPUTS = [
        'N',
        'NO'
    ];
    YesNoService.YES = 'Yes';
    YesNoService.NO = 'No';
    YesNoService.EMPTY = null;
    YesNoService = YesNoService_1 = __decorate([
        core_1.Injectable()
    ], YesNoService);
    return YesNoService;
}());
exports.YesNoService = YesNoService;
//# sourceMappingURL=yes-no.service.js.map