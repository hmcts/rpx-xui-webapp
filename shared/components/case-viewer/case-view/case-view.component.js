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
var alert_1 = require("../../../services/alert");
var domain_1 = require("../../../domain");
var case_editor_1 = require("../../case-editor");
var services_1 = require("../../../services");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var navigation_notifier_service_1 = require("../../../services/navigation/navigation-notifier.service");
var class_transformer_1 = require("class-transformer");
var CaseViewComponent = /** @class */ (function () {
    function CaseViewComponent(navigationNotifierService, caseNofitier, casesService, draftService, alertService) {
        this.navigationNotifierService = navigationNotifierService;
        this.caseNofitier = caseNofitier;
        this.casesService = casesService;
        this.draftService = draftService;
        this.alertService = alertService;
        this.hasPrint = true;
        this.hasEventSelector = true;
        this.navigationTriggered = new core_1.EventEmitter();
    }
    CaseViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCaseView(this.case)
            .pipe(operators_1.map(function (caseView) {
            _this.caseDetails = class_transformer_1.plainToClassFromExist(new domain_1.CaseView(), caseView);
            _this.caseNofitier.announceCase(_this.caseDetails);
        }))
            .toPromise()
            .catch(function (error) { return _this.checkAuthorizationError(error); });
        this.navigationSubscription = this.navigationNotifierService.navigation.subscribe(function (navigation) {
            _this.navigationTriggered.emit(navigation);
        });
    };
    CaseViewComponent.prototype.ngOnDestroy = function () {
        this.navigationSubscription.unsubscribe();
    };
    CaseViewComponent.prototype.isDataLoaded = function () {
        return this.caseDetails ? true : false;
    };
    CaseViewComponent.prototype.getCaseView = function (cid) {
        if (domain_1.Draft.isDraft(cid)) {
            return this.getDraft(cid);
        }
        else {
            return this.casesService
                .getCaseViewV2(cid);
        }
    };
    CaseViewComponent.prototype.getDraft = function (cid) {
        return this.draftService
            .getDraft(cid);
    };
    CaseViewComponent.prototype.checkAuthorizationError = function (error) {
        // TODO Should be logged to remote logging infrastructure
        console.error(error);
        if (error.status !== 401 && error.status !== 403) {
            this.alertService.error(error.message);
        }
        return rxjs_1.throwError(error);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseViewComponent.prototype, "case", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CaseViewComponent.prototype, "hasPrint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CaseViewComponent.prototype, "hasEventSelector", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseViewComponent.prototype, "navigationTriggered", void 0);
    CaseViewComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-view',
            template: "\n    <div *ngIf=\"isDataLoaded()\">\n        <ccd-case-viewer [hasPrint]=\"hasPrint\"\n                         [hasEventSelector]=\"hasEventSelector\"></ccd-case-viewer>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [navigation_notifier_service_1.NavigationNotifierService,
            case_editor_1.CaseNotifier,
            case_editor_1.CasesService,
            services_1.DraftService,
            alert_1.AlertService])
    ], CaseViewComponent);
    return CaseViewComponent;
}());
exports.CaseViewComponent = CaseViewComponent;
//# sourceMappingURL=case-view.component.js.map