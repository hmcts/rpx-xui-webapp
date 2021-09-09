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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var directives_1 = require("../../../directives");
var domain_1 = require("../../../domain");
var services_1 = require("../../../services");
var services_2 = require("../services");
var CaseEditComponent = /** @class */ (function () {
    function CaseEditComponent(fb, router, route, fieldsUtils, fieldsPurger, registrarService, wizardFactory, profileService, profileNotifier) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.fieldsUtils = fieldsUtils;
        this.fieldsPurger = fieldsPurger;
        this.registrarService = registrarService;
        this.wizardFactory = wizardFactory;
        this.profileService = profileService;
        this.profileNotifier = profileNotifier;
        this.cancelled = new core_1.EventEmitter();
        this.submitted = new core_1.EventEmitter();
    }
    CaseEditComponent_1 = CaseEditComponent;
    CaseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.wizard = this.wizardFactory.create(this.eventTrigger);
        this.form = this.fb.group({
            'data': new forms_1.FormGroup({}),
            'event': this.fb.group({
                'id': [this.eventTrigger.id, forms_1.Validators.required],
                'summary': [''],
                'description': ['']
            })
        });
        this.route.queryParams.subscribe(function (params) {
            _this.navigationOrigin = params[CaseEditComponent_1.ORIGIN_QUERY_PARAM];
        });
    };
    CaseEditComponent.prototype.getPage = function (pageId) {
        return this.wizard.getPage(pageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    };
    CaseEditComponent.prototype.first = function () {
        var firstPage = this.wizard.firstPage(this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        return this.router.navigate([firstPage ? firstPage.id : 'submit'], { relativeTo: this.route });
    };
    CaseEditComponent.prototype.navigateToPage = function (pageId) {
        var page = this.getPage(pageId);
        return this.router.navigate([page ? page.id : 'submit'], { relativeTo: this.route });
    };
    CaseEditComponent.prototype.next = function (currentPageId) {
        this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
        this.registrarService.reset();
        var theQueryParams = {};
        theQueryParams[CaseEditComponent_1.ORIGIN_QUERY_PARAM] = this.navigationOrigin;
        var nextPage = this.wizard.nextPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        return this.router.navigate([nextPage ? nextPage.id : 'submit'], { queryParams: theQueryParams, relativeTo: this.route });
    };
    CaseEditComponent.prototype.previous = function (currentPageId) {
        this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
        this.registrarService.reset();
        var previousPage = this.wizard.previousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        if (!previousPage) {
            return Promise.resolve(false);
        }
        var theQueryParams = {};
        theQueryParams[CaseEditComponent_1.ORIGIN_QUERY_PARAM] = this.navigationOrigin;
        return this.router.navigate([previousPage.id], { queryParams: theQueryParams, relativeTo: this.route });
    };
    CaseEditComponent.prototype.hasPrevious = function (currentPageId) {
        return this.wizard.hasPreviousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    };
    CaseEditComponent.prototype.cancel = function () {
        this.cancelled.emit();
    };
    CaseEditComponent.prototype.confirm = function (confirmation) {
        this.confirmation = confirmation;
        return this.router.navigate(['confirm'], { relativeTo: this.route });
    };
    var CaseEditComponent_1;
    CaseEditComponent.ORIGIN_QUERY_PARAM = 'origin';
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.CaseEventTrigger)
    ], CaseEditComponent.prototype, "eventTrigger", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], CaseEditComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], CaseEditComponent.prototype, "validate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], CaseEditComponent.prototype, "saveDraft", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.CaseView)
    ], CaseEditComponent.prototype, "caseDetails", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseEditComponent.prototype, "cancelled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseEditComponent.prototype, "submitted", void 0);
    CaseEditComponent = CaseEditComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-case-edit',
            template: "\n    <router-outlet></router-outlet>\n  ",
            styles: ["\n    #fieldset-case-data{margin-bottom:30px}#fieldset-case-data th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}#confirmation-header{width:630px;background-color:#17958b;border:solid 1px #979797;color:#ffffff;text-align:center}#confirmation-body{width:630px;background-color:#ffffff}.valign-top{vertical-align:top}.summary-fields{margin-bottom:30px}.summary-fields tbody tr th,.summary-fields tbody tr td{border-bottom:0px}a.disabled{pointer-events:none;cursor:default}.case-field-label{width:45%}.case-field-content{width:50%}.case-field-change{width:5%}\n  "],
            providers: [directives_1.GreyBarService]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            router_1.ActivatedRoute,
            services_1.FieldsUtils,
            services_1.FieldsPurger,
            directives_1.ConditionalShowRegistrarService,
            services_2.WizardFactoryService,
            services_1.ProfileService,
            services_1.ProfileNotifier])
    ], CaseEditComponent);
    return CaseEditComponent;
}());
exports.CaseEditComponent = CaseEditComponent;
//# sourceMappingURL=case-edit.component.js.map