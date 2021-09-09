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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var domain_1 = require("../../../domain");
var case_editor_1 = require("../../case-editor");
var services_1 = require("../../../services");
var class_transformer_1 = require("class-transformer");
var navigation_notifier_service_1 = require("../../../services/navigation/navigation-notifier.service");
var CaseResolver = /** @class */ (function () {
    function CaseResolver(caseNotifier, casesService, draftService, navigationNotifierService, router) {
        var _this = this;
        this.caseNotifier = caseNotifier;
        this.casesService = casesService;
        this.draftService = draftService;
        this.navigationNotifierService = navigationNotifierService;
        this.router = router;
        router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            _this.previousUrl = event.url;
        });
    }
    CaseResolver_1 = CaseResolver;
    CaseResolver.prototype.resolve = function (route) {
        var cid = route.paramMap.get(CaseResolver_1.PARAM_CASE_ID);
        if (!cid) {
            // when redirected to case view after a case created, and the user has no READ access,
            // the post returns no id
            this.navigateToCaseList();
        }
        else {
            return this.isRootCaseViewRoute(route) ? this.getAndCacheCaseView(cid)
                : this.cachedCaseView ? Promise.resolve(this.cachedCaseView)
                    : this.getAndCacheCaseView(cid);
        }
    };
    CaseResolver.prototype.navigateToCaseList = function () {
        this.navigationNotifierService.announceNavigation({ action: services_1.NavigationOrigin.NO_READ_ACCESS_REDIRECTION });
    };
    CaseResolver.prototype.isRootCaseViewRoute = function (route) {
        // is route case/:jid/:ctid/:cid
        return ((!route.firstChild || !route.firstChild.url.length) && !this.isTabViewRoute(route));
    };
    CaseResolver.prototype.isTabViewRoute = function (route) {
        // is route case/:jid/:ctid/:cid#fragment
        return route.firstChild && route.firstChild.fragment;
    };
    CaseResolver.prototype.getAndCacheCaseView = function (cid) {
        var _this = this;
        if (domain_1.Draft.isDraft(cid)) {
            return this.getAndCacheDraft(cid);
        }
        else {
            return this.casesService
                .getCaseViewV2(cid)
                .pipe(operators_1.map(function (caseView) {
                _this.cachedCaseView = class_transformer_1.plainToClassFromExist(new domain_1.CaseView(), caseView);
                _this.caseNotifier.announceCase(_this.cachedCaseView);
                return _this.cachedCaseView;
            }), operators_1.catchError(function (error) { return _this.checkAuthorizationError(error); })).toPromise();
        }
    };
    CaseResolver.prototype.getAndCacheDraft = function (cid) {
        var _this = this;
        return this.draftService
            .getDraft(cid)
            .pipe(operators_1.map(function (caseView) {
            _this.cachedCaseView = class_transformer_1.plainToClassFromExist(new domain_1.CaseView(), caseView);
            _this.caseNotifier.announceCase(_this.cachedCaseView);
            return _this.cachedCaseView;
        }), operators_1.catchError(function (error) { return _this.checkAuthorizationError(error); })).toPromise();
    };
    CaseResolver.prototype.checkAuthorizationError = function (error) {
        // TODO Should be logged to remote logging infrastructure
        console.error(error);
        if (CaseResolver_1.EVENT_REGEX.test(this.previousUrl) && error.status === 404) {
            this.router.navigate(['/list/case']);
            return rxjs_1.Observable.of(null);
        }
        if (error.status !== 401 && error.status !== 403) {
            this.router.navigate(['/error']);
        }
        return rxjs_1.Observable.throw(error);
    };
    var CaseResolver_1;
    CaseResolver.EVENT_REGEX = new RegExp('\/trigger\/.*?\/submit$');
    CaseResolver.PARAM_CASE_ID = 'cid';
    CaseResolver.CASE_CREATED_MSG = 'The case has been created successfully';
    CaseResolver = CaseResolver_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [case_editor_1.CaseNotifier,
            case_editor_1.CasesService,
            services_1.DraftService,
            navigation_notifier_service_1.NavigationNotifierService,
            router_1.Router])
    ], CaseResolver);
    return CaseResolver;
}());
exports.CaseResolver = CaseResolver;
//# sourceMappingURL=case.resolver.js.map