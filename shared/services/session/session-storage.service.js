"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SessionStorageService = /** @class */ (function () {
    function SessionStorageService() {
    }
    /**
     * Get an item from the session storage.
     */
    SessionStorageService.prototype.getItem = function (key) {
        return sessionStorage.getItem(key);
    };
    /**
     * Set an item in the session storage.
     */
    SessionStorageService.prototype.setItem = function (key, value) {
        sessionStorage.setItem(key, value);
    };
    /**
     * Clear all the items held in session storage.
     */
    SessionStorageService.prototype.clear = function () {
        sessionStorage.clear();
    };
    SessionStorageService = __decorate([
        core_1.Injectable()
    ], SessionStorageService);
    return SessionStorageService;
}());
exports.SessionStorageService = SessionStorageService;
//# sourceMappingURL=session-storage.service.js.map