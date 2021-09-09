"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WindowService = /** @class */ (function () {
    function WindowService() {
    }
    WindowService.prototype.locationAssign = function (url) {
        window.location.assign(url);
    };
    WindowService.prototype.setLocalStorage = function (key, value) {
        window.localStorage.setItem(key, value);
    };
    WindowService.prototype.getLocalStorage = function (key) {
        return window.localStorage.getItem(key);
    };
    WindowService.prototype.clearLocalStorage = function () {
        window.localStorage.clear();
    };
    WindowService.prototype.removeLocalStorage = function (key) {
        window.localStorage.removeItem(key);
    };
    WindowService.prototype.setSessionStorage = function (key, value) {
        window.sessionStorage.setItem(key, value);
    };
    WindowService.prototype.getSessionStorage = function (key) {
        return window.sessionStorage.getItem(key);
    };
    WindowService.prototype.openOnNewTab = function (url) {
        window.open(url, '_blank');
    };
    WindowService.prototype.confirm = function (message) {
        return window.confirm(message);
    };
    WindowService = __decorate([
        core_1.Injectable()
    ], WindowService);
    return WindowService;
}());
exports.WindowService = WindowService;
//# sourceMappingURL=window.service.js.map