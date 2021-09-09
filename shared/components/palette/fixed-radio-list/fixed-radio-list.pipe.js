"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FixedRadioListPipe = /** @class */ (function () {
    function FixedRadioListPipe() {
    }
    FixedRadioListPipe_1 = FixedRadioListPipe;
    FixedRadioListPipe.prototype.transform = function (value, items) {
        var item = items.find(function (i) { return i.code === value; });
        return item ? item.label : FixedRadioListPipe_1.EMPTY;
    };
    var FixedRadioListPipe_1;
    FixedRadioListPipe.EMPTY = '';
    FixedRadioListPipe = FixedRadioListPipe_1 = __decorate([
        core_1.Pipe({
            name: 'ccdFixedRadioList'
        })
    ], FixedRadioListPipe);
    return FixedRadioListPipe;
}());
exports.FixedRadioListPipe = FixedRadioListPipe;
//# sourceMappingURL=fixed-radio-list.pipe.js.map