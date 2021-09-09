"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var activity_service_1 = require("./activity.service");
var rxjs_1 = require("rxjs");
var core_2 = require("@angular/core");
var rx_polling_1 = require("rx-polling");
var app_config_1 = require("../../../app.config");
// @dynamic
var ActivityPollingService = /** @class */ (function () {
    function ActivityPollingService(activityService, ngZone, config) {
        this.activityService = activityService;
        this.ngZone = ngZone;
        this.config = config;
        this.pendingRequests = new Map();
        this.pollConfig = {
            interval: config.getActivityNexPollRequestMs(),
            attempts: config.getActivityRetry(),
            backgroundPolling: true
        };
        this.batchCollectionDelayMs = config.getActivityBatchCollectionDelayMs();
        this.maxRequestsPerBatch = config.getActivityMaxRequestPerBatch();
    }
    ActivityPollingService.prototype.subscribeToActivity = function (caseId, done) {
        var _this = this;
        if (!this.isEnabled) {
            return new rxjs_1.Subject();
        }
        var subject = this.pendingRequests.get(caseId);
        if (subject) {
            subject.subscribe(done);
        }
        else {
            subject = new rxjs_1.Subject();
            subject.subscribe(done);
            this.pendingRequests.set(caseId, subject);
        }
        if (this.pendingRequests.size === 1) {
            this.ngZone.runOutsideAngular(function () {
                _this.currentTimeoutHandle = setTimeout(function () { return _this.ngZone.run(function () {
                    // console.log('timeout: flushing requests')
                    _this.flushRequests();
                }); }, _this.batchCollectionDelayMs);
            });
        }
        if (this.pendingRequests.size >= this.maxRequestsPerBatch) {
            // console.log('max pending hit: flushing requests');
            this.flushRequests();
        }
        return subject;
    };
    ActivityPollingService.prototype.stopPolling = function () {
        if (this.pollActivitiesSubscription) {
            this.pollActivitiesSubscription.unsubscribe();
        }
    };
    ActivityPollingService.prototype.flushRequests = function () {
        if (this.currentTimeoutHandle) {
            clearTimeout(this.currentTimeoutHandle);
            this.currentTimeoutHandle = undefined;
        }
        var requests = new Map(this.pendingRequests);
        this.pendingRequests.clear();
        this.performBatchRequest(requests);
    };
    ActivityPollingService.prototype.pollActivities = function () {
        var caseIds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            caseIds[_i] = arguments[_i];
        }
        var _a;
        if (!this.isEnabled) {
            return rxjs_1.empty();
        }
        return rx_polling_1.default((_a = this.activityService).getActivities.apply(_a, caseIds), this.pollConfig);
    };
    ActivityPollingService.prototype.performBatchRequest = function (requests) {
        var _this = this;
        var caseIds = Array.from(requests.keys()).join();
        // console.log('issuing batch request for cases: ' + caseIds);
        this.ngZone.runOutsideAngular(function () {
            // run polling outside angular zone so it does not trigger change detection
            _this.pollActivitiesSubscription = _this.pollActivities(caseIds).subscribe(
            // process activity inside zone so it triggers change detection for activity.component.ts
            function (activities) { return _this.ngZone.run(function () {
                activities.forEach(function (activity) {
                    // console.log('pushing activity: ' + activity.caseId);
                    requests.get(activity.caseId).next(activity);
                });
            }, function (err) {
                console.log('error: ' + err);
                Array.from(requests.values()).forEach(function (subject) { return subject.error(err); });
            }); });
        });
    };
    ActivityPollingService.prototype.postViewActivity = function (caseId) {
        return this.postActivity(caseId, activity_service_1.ActivityService.ACTIVITY_VIEW);
    };
    ActivityPollingService.prototype.postEditActivity = function (caseId) {
        return this.postActivity(caseId, activity_service_1.ActivityService.ACTIVITY_EDIT);
    };
    ActivityPollingService.prototype.postActivity = function (caseId, activityType) {
        if (!this.isEnabled) {
            return rxjs_1.Observable.empty();
        }
        var pollingConfig = __assign({}, this.pollConfig, { interval: 5000 // inline with CCD Backend
         });
        return rx_polling_1.default(this.activityService.postActivity(caseId, activityType), pollingConfig);
    };
    Object.defineProperty(ActivityPollingService.prototype, "isEnabled", {
        get: function () {
            return this.activityService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    ActivityPollingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [activity_service_1.ActivityService, core_2.NgZone, app_config_1.AbstractAppConfig])
    ], ActivityPollingService);
    return ActivityPollingService;
}());
exports.ActivityPollingService = ActivityPollingService;
//# sourceMappingURL=activity.polling.service.js.map