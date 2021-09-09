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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var class_transformer_1 = require("class-transformer");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var app_config_1 = require("../../../../app.config");
var directives_1 = require("../../../directives");
var domain_1 = require("../../../domain");
var services_1 = require("../../../services");
var wizard_page_field_to_case_field_mapper_1 = require("./wizard-page-field-to-case-field.mapper");
var work_allocation_service_1 = require("./work-allocation.service");
var CasesService = /** @class */ (function () {
    function CasesService(http, appConfig, orderService, errorService, wizardPageFieldToCaseFieldMapper, workAllocationService, loadingService, sessionStorageService) {
        this.http = http;
        this.appConfig = appConfig;
        this.orderService = orderService;
        this.errorService = errorService;
        this.wizardPageFieldToCaseFieldMapper = wizardPageFieldToCaseFieldMapper;
        this.workAllocationService = workAllocationService;
        this.loadingService = loadingService;
        this.sessionStorageService = sessionStorageService;
        /**
         *
         * @type {(caseId:string)=>"../../Observable".Observable<Case>}
         * @deprecated Use `CasesService::getCaseView` instead
         */
        this.get = this.getCaseView;
    }
    CasesService_1 = CasesService;
    CasesService.prototype.getCaseView = function (jurisdictionId, caseTypeId, caseId) {
        var _this = this;
        var url = this.appConfig.getApiUrl()
            + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types/" + caseTypeId)
            + ("/cases/" + caseId);
        var loadingToken = this.loadingService.register();
        return this.http
            .get(url)
            .pipe(operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        }), operators_1.finalize(function () { return _this.loadingService.unregister(loadingToken); }));
    };
    CasesService.prototype.getCaseViewV2 = function (caseId) {
        var _this = this;
        var url = this.appConfig.getCaseDataUrl() + "/internal/cases/" + caseId;
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService_1.V2_MEDIATYPE_CASE_VIEW)
            .set('Content-Type', 'application/json');
        var loadingToken = this.loadingService.register();
        return this.http
            .get(url, { headers: headers, observe: 'body' })
            .pipe(operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        }), operators_1.finalize(function () { return _this.loadingService.unregister(loadingToken); }));
    };
    /**
     * handleNestedDynamicLists()
     * Reassigns list_item and value data to DynamicList children
     * down the tree. Server response returns data only in
     * the `value` object of parent complex type
     *
     * EUI-2530 Dynamic Lists for Elements in a Complex Type
     *
     * @param jsonBody - { case_fields: [ CaseField, CaseField ] }
     */
    CasesService.prototype.handleNestedDynamicLists = function (jsonBody) {
        var _this = this;
        if (jsonBody.case_fields) {
            jsonBody.case_fields.forEach(function (caseField) {
                if (caseField.field_type) {
                    _this.setDynamicListDefinition(caseField, caseField.field_type, caseField);
                }
            });
        }
        return jsonBody;
    };
    CasesService.prototype.setDynamicListDefinition = function (caseField, caseFieldType, rootCaseField) {
        var _this = this;
        if (caseFieldType.type === CasesService_1.SERVER_RESPONSE_FIELD_TYPE_COMPLEX) {
            caseFieldType.complex_fields.forEach(function (field) {
                try {
                    var isDynamicField = CasesService_1.SERVER_RESPONSE_FIELD_TYPE_DYNAMIC_LIST_TYPE.indexOf(field.field_type.type) !== -1;
                    if (isDynamicField) {
                        var dynamicListValue = _this.getDynamicListValue(rootCaseField.value, field.id);
                        if (dynamicListValue) {
                            var list_items = dynamicListValue.list_items;
                            var value = dynamicListValue.value;
                            field.value = {
                                list_items: list_items,
                                value: value ? value : undefined
                            };
                            field.formatted_value = __assign({}, field.formatted_value, field.value);
                        }
                    }
                    else {
                        _this.setDynamicListDefinition(field, field.field_type, rootCaseField);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        else if (caseFieldType.type === CasesService_1.SERVER_RESPONSE_FIELD_TYPE_COLLECTION) {
            if (caseFieldType.collection_field_type) {
                this.setDynamicListDefinition(caseField, caseFieldType.collection_field_type, rootCaseField);
            }
        }
    };
    CasesService.prototype.getDynamicListValue = function (jsonBlock, key) {
        if (jsonBlock[key]) {
            return jsonBlock[key];
        }
        else {
            for (var elementKey in jsonBlock) {
                if (typeof jsonBlock === 'object' && jsonBlock.hasOwnProperty(elementKey)) {
                    return this.getDynamicListValue(jsonBlock[elementKey], key);
                }
            }
        }
        return null;
    };
    CasesService.prototype.getEventTrigger = function (caseTypeId, eventTriggerId, caseId, ignoreWarning) {
        var _this = this;
        ignoreWarning = undefined !== ignoreWarning ? ignoreWarning : 'false';
        var url = this.buildEventTriggerUrl(caseTypeId, eventTriggerId, caseId, ignoreWarning);
        var headers = new http_1.HttpHeaders();
        headers = headers.set('experimental', 'true');
        headers = headers.set('Content-Type', 'application/json');
        if (domain_1.Draft.isDraft(caseId)) {
            headers = headers.set('Accept', CasesService_1.V2_MEDIATYPE_START_DRAFT_TRIGGER);
        }
        else if (caseId !== undefined && caseId !== null) {
            headers = headers.set('Accept', CasesService_1.V2_MEDIATYPE_START_EVENT_TRIGGER);
        }
        else {
            headers = headers.set('Accept', CasesService_1.V2_MEDIATYPE_START_CASE_TRIGGER);
        }
        return this.http
            .get(url, { headers: headers, observe: 'body' })
            .pipe(operators_1.map(function (body) {
            return _this.handleNestedDynamicLists(body);
        }), operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        }), operators_1.map(function (p) { return class_transformer_1.plainToClass(domain_1.CaseEventTrigger, p); }), operators_1.tap(function (eventTrigger) { return _this.initialiseEventTrigger(eventTrigger); }));
    };
    CasesService.prototype.createEvent = function (caseDetails, eventData) {
        var _this = this;
        var caseId = caseDetails.case_id;
        var url = this.appConfig.getCaseDataUrl() + ("/cases/" + caseId + "/events");
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService_1.V2_MEDIATYPE_CREATE_EVENT)
            .set('Content-Type', 'application/json');
        return this.http
            .post(url, eventData, { headers: headers, observe: 'body' })
            .pipe(operators_1.map(function (body) { return _this.processResponseBody(body, eventData); }), operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        }));
    };
    CasesService.prototype.validateCase = function (ctid, eventData, pageId) {
        var _this = this;
        var pageIdString = pageId ? '?pageId=' + pageId : '';
        var url = this.appConfig.getCaseDataUrl()
            + ("/case-types/" + ctid + "/validate" + pageIdString);
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService_1.V2_MEDIATYPE_CASE_DATA_VALIDATE)
            .set('Content-Type', 'application/json');
        return this.http
            .post(url, eventData, { headers: headers, observe: 'body' })
            .pipe(operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        }));
    };
    CasesService.prototype.createCase = function (ctid, eventData) {
        var _this = this;
        var ignoreWarning = 'false';
        if (eventData.ignore_warning) {
            ignoreWarning = 'true';
        }
        var url = this.appConfig.getCaseDataUrl()
            + ("/case-types/" + ctid + "/cases?ignore-warning=" + ignoreWarning);
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService_1.V2_MEDIATYPE_CREATE_CASE)
            .set('Content-Type', 'application/json');
        return this.http
            .post(url, eventData, { headers: headers, observe: 'body' })
            .pipe(operators_1.map(function (body) { return _this.processResponseBody(body, eventData); }), operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        }));
    };
    CasesService.prototype.getPrintDocuments = function (caseId) {
        var _this = this;
        var url = this.appConfig.getCaseDataUrl()
            + ("/cases/" + caseId)
            + "/documents";
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService_1.V2_MEDIATYPE_CASE_DOCUMENTS)
            .set('Content-Type', 'application/json');
        return this.http
            .get(url, { headers: headers, observe: 'body' })
            .pipe(operators_1.map(function (body) { return body.documentResources; }), operators_1.catchError(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        }));
    };
    CasesService.prototype.buildEventTriggerUrl = function (caseTypeId, eventTriggerId, caseId, ignoreWarning) {
        var url = this.appConfig.getCaseDataUrl() + "/internal";
        if (domain_1.Draft.isDraft(caseId)) {
            url += "/drafts/" + caseId
                + "/event-trigger"
                + ("?ignore-warning=" + ignoreWarning);
        }
        else if (caseTypeId === undefined || caseTypeId === null) {
            url += "/cases/" + caseId
                + ("/event-triggers/" + eventTriggerId)
                + ("?ignore-warning=" + ignoreWarning);
        }
        else {
            url += "/case-types/" + caseTypeId
                + ("/event-triggers/" + eventTriggerId)
                + ("?ignore-warning=" + ignoreWarning);
        }
        return url;
    };
    CasesService.prototype.processResponseBody = function (body, eventData) {
        this.processTasksOnSuccess(body, eventData.event);
        return body;
    };
    CasesService.prototype.initialiseEventTrigger = function (eventTrigger) {
        var _this = this;
        if (!eventTrigger.wizard_pages) {
            eventTrigger.wizard_pages = [];
        }
        eventTrigger.wizard_pages.forEach(function (wizardPage) {
            wizardPage.parsedShowCondition = directives_1.ShowCondition.getInstance(wizardPage.show_condition);
            wizardPage.case_fields = _this.orderService.sort(_this.wizardPageFieldToCaseFieldMapper.mapAll(wizardPage.wizard_page_fields, eventTrigger.case_fields));
        });
    };
    CasesService.prototype.processTasksOnSuccess = function (caseData, eventData) {
        // This is used a feature toggle to
        // control the work allocation
        if (this.appConfig.getWorkAllocationApiUrl() && !this.isPuiCaseManager()) {
            this.workAllocationService.completeAppropriateTask(caseData.id, eventData.id, caseData.jurisdiction, caseData.case_type)
                .subscribe(function () {
                // Success. Do nothing.
            }, function (error) {
                // Show an appropriate warning about something that went wrong.
                console.warn('Could not process tasks for this case event', error);
            });
        }
    };
    /*
    Checks if the user has role of pui-case-manager and returns true or false
    */
    CasesService.prototype.isPuiCaseManager = function () {
        var userInfoStr = this.sessionStorageService.getItem('userDetails');
        if (userInfoStr) {
            var userInfo = JSON.parse(userInfoStr);
            return userInfo && userInfo.roles && (userInfo.roles.indexOf(CasesService_1.PUI_CASE_MANAGER) !== -1);
        }
        return false;
    };
    var CasesService_1;
    // Internal (UI) API
    CasesService.V2_MEDIATYPE_CASE_VIEW = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json';
    CasesService.V2_MEDIATYPE_START_CASE_TRIGGER = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8';
    CasesService.V2_MEDIATYPE_START_EVENT_TRIGGER = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8';
    CasesService.V2_MEDIATYPE_START_DRAFT_TRIGGER = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-draft-trigger.v2+json;charset=UTF-8';
    // External (Data Store) API
    CasesService.V2_MEDIATYPE_CASE_DOCUMENTS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.case-documents.v2+json;charset=UTF-8';
    CasesService.V2_MEDIATYPE_CASE_DATA_VALIDATE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.case-data-validate.v2+json;charset=UTF-8';
    CasesService.V2_MEDIATYPE_CREATE_EVENT = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8';
    CasesService.V2_MEDIATYPE_CREATE_CASE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8';
    // Handling of Dynamic Lists in Complex Types
    CasesService.SERVER_RESPONSE_FIELD_TYPE_COLLECTION = 'Collection';
    CasesService.SERVER_RESPONSE_FIELD_TYPE_COMPLEX = 'Complex';
    CasesService.SERVER_RESPONSE_FIELD_TYPE_DYNAMIC_LIST_TYPE = ['DynamicList', 'DynamicRadioList'];
    CasesService.PUI_CASE_MANAGER = 'pui-case-manager';
    CasesService = CasesService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [services_1.HttpService,
            app_config_1.AbstractAppConfig,
            services_1.OrderService,
            services_1.HttpErrorService,
            wizard_page_field_to_case_field_mapper_1.WizardPageFieldToCaseFieldMapper,
            work_allocation_service_1.WorkAllocationService,
            services_1.LoadingService,
            services_1.SessionStorageService])
    ], CasesService);
    return CasesService;
}());
exports.CasesService = CasesService;
//# sourceMappingURL=cases.service.js.map