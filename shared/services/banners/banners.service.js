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
var BannersService = /** @class */ (function () {
    function BannersService(httpService, appConfig) {
        this.httpService = httpService;
        this.appConfig = appConfig;
    }
    BannersService_1 = BannersService;
    BannersService.prototype.getBanners = function (jurisdictionReferences) {
        var url = this.appConfig.getBannersUrl();
        var headers = new http_1.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', BannersService_1.V2_MEDIATYPE_BANNERS)
            .set('Content-Type', 'application/json');
        var params = new http_1.HttpParams();
        jurisdictionReferences.forEach(function (reference) { return params = params.append('ids', reference); });
        return this.httpService
            .get(url, { params: params, headers: headers, observe: 'body' })
            .map(function (body) { return body.banners; });
    };
    var BannersService_1;
    BannersService.V2_MEDIATYPE_BANNERS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-banners.v2+json;charset=UTF-8';
    BannersService = BannersService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService, app_config_1.AbstractAppConfig])
    ], BannersService);
    return BannersService;
}());
exports.BannersService = BannersService;
//# sourceMappingURL=banners.service.js.map