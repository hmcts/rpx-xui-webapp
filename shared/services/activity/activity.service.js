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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var app_config_1 = require("../../../app.config");
var http_2 = require("../http");
var session_1 = require("../session");
// @dynamic
var ActivityService = /** @class */ (function () {
    function ActivityService(http, appConfig, sessionStorageService) {
        this.http = http;
        this.appConfig = appConfig;
        this.sessionStorageService = sessionStorageService;
        this.userAuthorised = undefined;
    }
    ActivityService_1 = ActivityService;
    Object.defineProperty(ActivityService, "ACTIVITY_VIEW", {
        get: function () { return 'view'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityService, "ACTIVITY_EDIT", {
        get: function () { return 'edit'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityService.prototype, "isEnabled", {
        get: function () {
            return this.activityUrl() && this.userAuthorised;
        },
        enumerable: true,
        configurable: true
    });
    ActivityService.handleHttpError = function (response) {
        var error = http_2.HttpErrorService.convertToHttpError(response);
        if (response.status && response.status !== error.status) {
            error.status = response.status;
        }
        return error;
    };
    ActivityService.prototype.getOptions = function () {
        var userDetails = JSON.parse(this.sessionStorageService.getItem('userDetails'));
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Authorization', userDetails.token);
        var options = {
            headers: headers,
            withCredentials: true,
            observe: 'body',
        };
        return options;
    };
    ActivityService.prototype.getActivities = function () {
        var caseId = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            caseId[_i] = arguments[_i];
        }
        var options = this.getOptions();
        var url = this.activityUrl() + ("/cases/" + caseId.join(',') + "/activity");
        return this.http
            .get(url, options, false, ActivityService_1.handleHttpError)
            .map(function (response) { return response; });
    };
    ActivityService.prototype.postActivity = function (caseId, activity) {
        var options = this.getOptions();
        var url = this.activityUrl() + ("/cases/" + caseId + "/activity");
        var body = { activity: activity };
        return this.http
            .post(url, body, options, false)
            .map(function (response) { return response; });
    };
    ActivityService.prototype.verifyUserIsAuthorized = function () {
        var _this = this;
        if (this.activityUrl() && this.userAuthorised === undefined) {
            this.getActivities(ActivityService_1.DUMMY_CASE_REFERENCE).subscribe(function () { return _this.userAuthorised = true; }, function (error) {
                if ([401, 403].indexOf(error.status) > -1) {
                    _this.userAuthorised = false;
                }
                else {
                    _this.userAuthorised = true;
                }
            });
        }
    };
    ActivityService.prototype.activityUrl = function () {
        return this.appConfig.getActivityUrl();
    };
    var ActivityService_1;
    ActivityService.DUMMY_CASE_REFERENCE = '0';
    ActivityService = ActivityService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_2.HttpService,
            app_config_1.AbstractAppConfig,
            session_1.SessionStorageService])
    ], ActivityService);
    return ActivityService;
}());
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map