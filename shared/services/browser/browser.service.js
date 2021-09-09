"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BrowserService = /** @class */ (function () {
    function BrowserService() {
    }
    BrowserService.prototype.isFirefox = function () {
        return window.navigator.userAgent.indexOf('Firefox') > -1;
    };
    BrowserService.prototype.isSafari = function () {
        var isSafariAgent = window.navigator.userAgent.indexOf('Safari') > -1;
        var isChromeAgent = window.navigator.userAgent.indexOf('Chrome') > -1;
        if ((isChromeAgent) && (isSafariAgent)) {
            return false;
        }
        return isSafariAgent;
    };
    BrowserService.prototype.isIEOrEdge = function () {
        return /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    };
    BrowserService = __decorate([
        core_1.Injectable()
    ], BrowserService);
    return BrowserService;
}());
exports.BrowserService = BrowserService;
//# sourceMappingURL=browser.service.js.map