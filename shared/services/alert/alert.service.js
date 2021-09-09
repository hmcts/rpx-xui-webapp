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
var router_1 = require("@angular/router");
require("rxjs/operator/publish");
var Rx_1 = require("rxjs/Rx");
var AlertService = /** @class */ (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        // the preserved messages
        this.preservedError = '';
        this.preservedWarning = '';
        this.preservedSuccess = '';
        this.preserveAlerts = false;
        this.successes = Rx_1.Observable
            .create(function (observer) { return _this.successObserver = observer; })
            .publish();
        this.successes.connect();
        this.errors = Rx_1.Observable
            .create(function (observer) { return _this.errorObserver = observer; })
            .publish();
        this.errors.connect();
        this.warnings = Rx_1.Observable
            .create(function (observer) { return _this.warningObserver = observer; })
            .publish();
        this.warnings.connect();
        // TODO: Remove
        this.alerts = Rx_1.Observable
            .create(function (observer) { return _this.alertObserver = observer; })
            .publish();
        this.alerts.connect();
        this.router
            .events
            .subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                // if there is no longer a preserve alerts setting for the page then clear all observers and preserved messages
                if (!_this.preserveAlerts) {
                    _this.clear();
                }
                // if not, then set the preserving of alerts to false so rendering to a new page
                _this.preserveAlerts = false;
            }
        });
    }
    AlertService.prototype.clear = function () {
        this.successObserver.next(null);
        this.errorObserver.next(null);
        this.warningObserver.next(null);
        this.preservedError = '';
        this.preservedWarning = '';
        this.preservedSuccess = '';
        // EUI-3381.
        this.alertObserver.next(null);
        this.message = '';
    };
    AlertService.prototype.error = function (message) {
        this.preservedError = this.preserveMessages(message);
        var alert = { level: 'error', message: message };
        this.errorObserver.next(alert);
        // EUI-3381.
        this.push(alert);
    };
    AlertService.prototype.warning = function (message) {
        this.preservedWarning = this.preserveMessages(message);
        var alert = { level: 'warning', message: message };
        this.warningObserver.next(alert);
        // EUI-3381.
        this.push(alert);
    };
    AlertService.prototype.success = function (message) {
        this.preservedSuccess = this.preserveMessages(message);
        var alert = { level: 'success', message: message };
        this.successObserver.next(alert);
        // EUI-3381.
        this.push(alert);
    };
    AlertService.prototype.setPreserveAlerts = function (preserve, urlInfo) {
        // if there is no url setting then just preserve the messages
        if (!urlInfo) {
            this.preserveAlerts = preserve;
        }
        else {
            // check if the url includes the sting given
            this.preserveAlerts = this.currentUrlIncludesInfo(preserve, urlInfo);
        }
    };
    AlertService.prototype.currentUrlIncludesInfo = function (preserve, urlInfo) {
        // loop through the list of strings and check the router includes all of them
        for (var _i = 0, urlInfo_1 = urlInfo; _i < urlInfo_1.length; _i++) {
            var urlSnip = urlInfo_1[_i];
            if (!this.router.url.includes(urlSnip)) {
                // return the opposite boolean value if the router does not include one of the strings
                return !preserve;
            }
        }
        // return the boolean value if all strings are in the url
        return preserve;
    };
    AlertService.prototype.isPreserveAlerts = function () {
        return this.preserveAlerts;
    };
    AlertService.prototype.preserveMessages = function (message) {
        // preserve the messages if set to preserve them
        if (this.isPreserveAlerts()) {
            return message;
        }
        else {
            return '';
        }
    };
    // TODO: Remove
    AlertService.prototype.push = function (msgObject) {
        this.message = msgObject.message;
        this.level = msgObject.level;
        this.alertObserver.next({
            level: this.level,
            message: this.message
        });
    };
    AlertService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map