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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var case_editor_1 = require("../../case-editor");
var services_1 = require("../../../services");
var EventTriggerResolver = /** @class */ (function () {
    function EventTriggerResolver(casesService, alertService, profileService, profileNotifier) {
        this.casesService = casesService;
        this.alertService = alertService;
        this.profileService = profileService;
        this.profileNotifier = profileNotifier;
    }
    EventTriggerResolver_1 = EventTriggerResolver;
    EventTriggerResolver.prototype.resolve = function (route) {
        return this.isRootTriggerEventRoute(route) ? this.getAndCacheEventTrigger(route)
            : this.cachedEventTrigger ? Promise.resolve(this.cachedEventTrigger)
                : this.getAndCacheEventTrigger(route);
    };
    EventTriggerResolver.prototype.isRootTriggerEventRoute = function (route) {
        // if route is 'trigger/:eid'
        return !route.firstChild || !route.firstChild.url.length;
    };
    EventTriggerResolver.prototype.getAndCacheEventTrigger = function (route) {
        var _this = this;
        var cid = route.parent.paramMap.get(EventTriggerResolver_1.PARAM_CASE_ID);
        var caseTypeId = undefined;
        var eventTriggerId = route.paramMap.get(EventTriggerResolver_1.PARAM_EVENT_ID);
        var ignoreWarning = route.queryParamMap.get(EventTriggerResolver_1.IGNORE_WARNING);
        if (-1 === EventTriggerResolver_1.IGNORE_WARNING_VALUES.indexOf(ignoreWarning)) {
            ignoreWarning = 'false';
        }
        this.profileService.get().subscribe(function (_) { return _this.profileNotifier.announceProfile(_); });
        return this.casesService
            .getEventTrigger(caseTypeId, eventTriggerId, cid, ignoreWarning)
            .pipe(operators_1.map(function (eventTrigger) { return _this.cachedEventTrigger = eventTrigger; }), operators_1.catchError(function (error) {
            _this.alertService.error(error.message);
            return rxjs_1.throwError(error);
        })).toPromise();
    };
    var EventTriggerResolver_1;
    EventTriggerResolver.PARAM_CASE_ID = 'cid';
    EventTriggerResolver.PARAM_EVENT_ID = 'eid';
    EventTriggerResolver.IGNORE_WARNING = 'ignoreWarning';
    EventTriggerResolver.IGNORE_WARNING_VALUES = ['true', 'false'];
    EventTriggerResolver = EventTriggerResolver_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [case_editor_1.CasesService,
            services_1.AlertService,
            services_1.ProfileService,
            services_1.ProfileNotifier])
    ], EventTriggerResolver);
    return EventTriggerResolver;
}());
exports.EventTriggerResolver = EventTriggerResolver;
//# sourceMappingURL=event-trigger.resolver.js.map