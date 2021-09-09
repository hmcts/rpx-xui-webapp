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
var class_transformer_1 = require("class-transformer");
var services_1 = require("../../../services");
var app_config_1 = require("../../../../app.config");
var domain_1 = require("../domain");
var http_1 = require("@angular/common/http");
var CaseHistoryService = /** @class */ (function () {
    function CaseHistoryService(httpService, httpErrorService, appConfig) {
        this.httpService = httpService;
        this.httpErrorService = httpErrorService;
        this.appConfig = appConfig;
    }
    CaseHistoryService_1 = CaseHistoryService;
    CaseHistoryService.prototype.get = function (caseId, eventId) {
        var _this = this;
        var url = this.appConfig.getCaseHistoryUrl(caseId, eventId);
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CaseHistoryService_1.V2_MEDIATYPE_CASE_EVENT_VIEW)
            .set('Content-Type', 'application/json');
        return this.httpService
            .get(url, { headers: headers, observe: 'body' })
            .catch(function (error) {
            _this.httpErrorService.setError(error);
            return rxjs_1.Observable.throw(error);
        })
            .map(function (caseHistory) { return class_transformer_1.plainToClass(domain_1.CaseHistory, caseHistory); });
    };
    var CaseHistoryService_1;
    CaseHistoryService.V2_MEDIATYPE_CASE_EVENT_VIEW = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-event-view.v2+json;charset=UTF-8';
    CaseHistoryService = CaseHistoryService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [services_1.HttpService,
            services_1.HttpErrorService,
            app_config_1.AbstractAppConfig])
    ], CaseHistoryService);
    return CaseHistoryService;
}());
exports.CaseHistoryService = CaseHistoryService;
//# sourceMappingURL=case-history.service.js.map