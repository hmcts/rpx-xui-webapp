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
var alert_service_1 = require("../../../services/alert/alert.service");
var router_helper_service_1 = require("../../../services/router/router-helper.service");
var wizard_factory_service_1 = require("./wizard-factory.service");
var conditional_show_model_1 = require("../../../directives/conditional-show/domain/conditional-show.model");
var event_trigger_service_1 = require("./event-trigger.service");
var CaseEditWizardGuard = /** @class */ (function () {
    function CaseEditWizardGuard(router, routerHelper, wizardFactory, alertService, eventTriggerService) {
        this.router = router;
        this.routerHelper = routerHelper;
        this.wizardFactory = wizardFactory;
        this.alertService = alertService;
        this.eventTriggerService = eventTriggerService;
    }
    CaseEditWizardGuard.prototype.resolve = function (route) {
        var _this = this;
        this.eventTriggerService.eventTriggerSource.asObservable().first().subscribe(function (eventTrigger) {
            _this.processEventTrigger(route, eventTrigger);
        });
        if (route.parent.data.eventTrigger) {
            this.eventTriggerService.announceEventTrigger(route.parent.data.eventTrigger);
        }
        return Promise.resolve(true);
    };
    CaseEditWizardGuard.prototype.processEventTrigger = function (route, eventTrigger) {
        var _this = this;
        if (!eventTrigger.hasFields() || !eventTrigger.hasPages()) {
            this.goToSubmit(route);
            return Promise.resolve(false);
        }
        var wizard = this.wizardFactory.create(eventTrigger);
        var currentState = this.buildState(eventTrigger.case_fields);
        // TODO Extract predicate and state creation in a factory
        var canShowPredicate = function (page) {
            return conditional_show_model_1.ShowCondition.getInstance(page.show_condition).match(currentState);
        };
        if (!route.params['page']) {
            this.goToFirst(wizard, canShowPredicate, route);
            return Promise.resolve(false);
        }
        var pageId = route.params['page'];
        if (!wizard.hasPage(pageId)) {
            this.goToFirst(wizard, canShowPredicate, route)
                .then(function () {
                _this.alertService.error("No page could be found for '" + pageId + "'");
            });
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    };
    CaseEditWizardGuard.prototype.goToFirst = function (wizard, canShowPredicate, route) {
        var firstPage = wizard.firstPage(canShowPredicate);
        // If there’s no specific wizard page called, it makes another navigation to either the first page available or to the submit page
        // TODO should find a way to navigate to target page without going through the whole loop (and make a second call to BE) again
        return this.router.navigate(this.parentUrlSegments(route).concat([firstPage ? firstPage.id : 'submit']), { queryParams: route.queryParams });
    };
    CaseEditWizardGuard.prototype.goToSubmit = function (route) {
        return this.router.navigate(this.parentUrlSegments(route).concat(['submit']));
    };
    CaseEditWizardGuard.prototype.buildState = function (caseFields) {
        var state = {};
        caseFields.forEach(function (field) {
            state[field.id] = field.value;
        });
        return state;
    };
    CaseEditWizardGuard.prototype.parentUrlSegments = function (route) {
        return this.routerHelper.getUrlSegmentsFromRoot(route.parent);
    };
    CaseEditWizardGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            router_helper_service_1.RouterHelperService,
            wizard_factory_service_1.WizardFactoryService,
            alert_service_1.AlertService,
            event_trigger_service_1.EventTriggerService])
    ], CaseEditWizardGuard);
    return CaseEditWizardGuard;
}());
exports.CaseEditWizardGuard = CaseEditWizardGuard;
//# sourceMappingURL=case-edit-wizard.guard.js.map