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
var operators_1 = require("rxjs/operators");
var app_config_1 = require("../../../app.config");
var http_1 = require("../http");
var request_1 = require("../request");
var loading_1 = require("../loading");
var http_2 = require("@angular/common/http");
var SearchService = /** @class */ (function () {
    function SearchService(appConfig, httpService, requestOptionsBuilder, loadingService) {
        this.appConfig = appConfig;
        this.httpService = httpService;
        this.requestOptionsBuilder = requestOptionsBuilder;
        this.loadingService = loadingService;
    }
    SearchService_1 = SearchService;
    SearchService.prototype.search = function (jurisdictionId, caseTypeId, metaCriteria, caseCriteria, view) {
        var _this = this;
        var url = this.appConfig.getApiUrl() + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types/" + caseTypeId)
            + "/cases";
        var options = this.requestOptionsBuilder.buildOptions(metaCriteria, caseCriteria, view);
        var loadingToken = this.loadingService.register();
        return this.httpService
            .get(url, options)
            .pipe(operators_1.map(function (response) { return response; }), operators_1.finalize(function () { return _this.loadingService.unregister(loadingToken); }));
    };
    SearchService.prototype.searchCases = function (caseTypeId, metaCriteria, caseCriteria, view, sort) {
        var _this = this;
        var url = this.appConfig.getCaseDataUrl() + ("/internal/searchCases?ctid=" + caseTypeId + "&use_case=" + view);
        var options = this.requestOptionsBuilder.buildOptions(metaCriteria, caseCriteria, view);
        var body = {
            sort: sort,
            size: this.appConfig.getPaginationPageSize()
        };
        var loadingToken = this.loadingService.register();
        return this.httpService
            .post(url, body, options)
            .pipe(operators_1.map(function (response) { return response; }), operators_1.finalize(function () { return _this.loadingService.unregister(loadingToken); }));
    };
    SearchService.prototype.getSearchInputUrl = function (caseTypeId) {
        return this.appConfig.getCaseDataUrl() + "/internal/case-types/" + caseTypeId + "/search-inputs";
    };
    SearchService.prototype.getSearchInputs = function (jurisdictionId, caseTypeId) {
        var _this = this;
        var url = this.getSearchInputUrl(caseTypeId);
        var headers = new http_2.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', SearchService_1.V2_MEDIATYPE_SEARCH_INPUTS)
            .set('Content-Type', 'application/json');
        this.currentJurisdiction = jurisdictionId;
        this.currentCaseType = caseTypeId;
        return this.httpService
            .get(url, { headers: headers, observe: 'body' })
            .pipe(operators_1.map(function (body) {
            var searchInputs = body.searchInputs;
            if (_this.isDataValid(jurisdictionId, caseTypeId)) {
                searchInputs.forEach(function (item) {
                    item.field.label = item.label;
                    item.field.display_context_parameter = item.display_context_parameter;
                });
            }
            else {
                throw new Error('Response expired');
            }
            return searchInputs;
        }));
    };
    SearchService.prototype.isDataValid = function (jurisdictionId, caseTypeId) {
        return this.currentJurisdiction === jurisdictionId && this.currentCaseType === caseTypeId;
    };
    var SearchService_1;
    SearchService.V2_MEDIATYPE_SEARCH_INPUTS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-search-input-details.v2+json;charset=UTF-8';
    SearchService.VIEW_SEARCH = 'SEARCH';
    SearchService.VIEW_WORKBASKET = 'WORKBASKET';
    SearchService.FIELD_PREFIX = 'case.';
    SearchService = SearchService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_config_1.AbstractAppConfig,
            http_1.HttpService,
            request_1.RequestOptionsBuilder,
            loading_1.LoadingService])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map