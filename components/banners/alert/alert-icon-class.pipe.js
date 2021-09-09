"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var alert_component_1 = require("./alert.component");
var AlertIconClassPipe = /** @class */ (function () {
    function AlertIconClassPipe() {
    }
    AlertIconClassPipe_1 = AlertIconClassPipe;
    AlertIconClassPipe.prototype.transform = function (type) {
        switch (type) {
            case alert_component_1.AlertComponent.TYPE_SUCCESS:
                return AlertIconClassPipe_1.CLASS_SUCCESS;
            case alert_component_1.AlertComponent.TYPE_WARNING:
            default:
                return AlertIconClassPipe_1.CLASS_WARNING;
        }
    };
    var AlertIconClassPipe_1;
    AlertIconClassPipe.CLASS_WARNING = 'icon-alert';
    AlertIconClassPipe.CLASS_SUCCESS = 'icon-tick';
    AlertIconClassPipe = AlertIconClassPipe_1 = __decorate([
        core_1.Pipe({
            name: 'cutAlertIconClass'
        })
    ], AlertIconClassPipe);
    return AlertIconClassPipe;
}());
exports.AlertIconClassPipe = AlertIconClassPipe;
//# sourceMappingURL=alert-icon-class.pipe.js.map