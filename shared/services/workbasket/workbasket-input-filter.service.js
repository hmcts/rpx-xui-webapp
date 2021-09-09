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
require("rxjs/add/operator/map");
var http_service_1 = require("../http/http.service");
var app_config_1 = require("../../../app.config");
var http_1 = require("@angular/common/http");
var WorkbasketInputFilterService = /** @class */ (function () {
    function WorkbasketInputFilterService(httpService, appConfig) {
        this.httpService = httpService;
        this.appConfig = appConfig;
    }
    WorkbasketInputFilterService_1 = WorkbasketInputFilterService;
    WorkbasketInputFilterService.prototype.getWorkbasketInputUrl = function (caseTypeId) {
        return this.appConfig.getCaseDataUrl() + "/internal/case-types/" + caseTypeId + "/work-basket-inputs";
    };
    WorkbasketInputFilterService.prototype.getWorkbasketInputs = function (jurisdictionId, caseTypeId) {
        var _this = this;
        var url = this.getWorkbasketInputUrl(caseTypeId);
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', WorkbasketInputFilterService_1.V2_MEDIATYPE_WORKBASKET_INPUT_DETAILS)
            .set('Content-Type', 'application/json');
        this.currentJurisdiction = jurisdictionId;
        this.currentCaseType = caseTypeId;
        return this.httpService
            .get(url, { headers: headers, observe: 'body' })
            .map(function (body) {
            var workbasketInputs = body.workbasketInputs;
            if (_this.isDataValid(jurisdictionId, caseTypeId)) {
                workbasketInputs.forEach(function (item) {
                    item.field.label = item.label;
                    if (item.display_context_parameter) {
                        item.field.display_context_parameter = item.display_context_parameter;
                    }
                });
            }
            else {
                throw new Error('Response expired');
            }
            return workbasketInputs;
        });
    };
    WorkbasketInputFilterService.prototype.isDataValid = function (jurisdictionId, caseTypeId) {
        return this.currentJurisdiction === jurisdictionId && this.currentCaseType === caseTypeId;
    };
    var WorkbasketInputFilterService_1;
    WorkbasketInputFilterService.V2_MEDIATYPE_WORKBASKET_INPUT_DETAILS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-workbasket-input-details.v2+json;charset=UTF-8';
    WorkbasketInputFilterService = WorkbasketInputFilterService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService, app_config_1.AbstractAppConfig])
    ], WorkbasketInputFilterService);
    return WorkbasketInputFilterService;
}());
exports.WorkbasketInputFilterService = WorkbasketInputFilterService;
//# sourceMappingURL=workbasket-input-filter.service.js.map