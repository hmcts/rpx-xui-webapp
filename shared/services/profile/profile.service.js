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
var class_transformer_1 = require("class-transformer");
var app_config_1 = require("../../../app.config");
var http_1 = require("../http");
var domain_1 = require("../../domain");
var http_2 = require("@angular/common/http");
var ProfileService = /** @class */ (function () {
    function ProfileService(httpService, appConfig) {
        this.httpService = httpService;
        this.appConfig = appConfig;
    }
    ProfileService_1 = ProfileService;
    ProfileService.prototype.get = function () {
        var url = this.appConfig.getCaseDataUrl() + ProfileService_1.URL;
        var headers = new http_2.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', ProfileService_1.V2_MEDIATYPE_USER_PROFILE)
            .set('Content-Type', 'application/json');
        return this.httpService
            .get(url, { headers: headers, observe: 'body' })
            .pipe(operators_1.map(function (p) { return class_transformer_1.plainToClass(domain_1.Profile, p); }));
    };
    var ProfileService_1;
    ProfileService.V2_MEDIATYPE_USER_PROFILE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-user-profile.v2+json;charset=UTF-8';
    ProfileService.URL = '/internal/profile';
    ProfileService = ProfileService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpService, app_config_1.AbstractAppConfig])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map