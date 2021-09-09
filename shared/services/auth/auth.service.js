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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var app_config_1 = require("../../../app.config");
/**
 * `Oauth2Service` and `AuthService` cannot be merged as it creates a cyclic dependency on `AuthService` through `HttpErrorService`.
 */
var AuthService = /** @class */ (function () {
    function AuthService(appConfig, document) {
        this.appConfig = appConfig;
        this.document = document;
    }
    AuthService_1 = AuthService;
    AuthService.prototype.signIn = function () {
        var loginUrl = this.appConfig.getLoginUrl();
        var clientId = this.appConfig.getOAuth2ClientId();
        var redirectUri = encodeURIComponent(this.redirectUri());
        this.document.location.href = loginUrl + "?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri;
    };
    AuthService.prototype.redirectUri = function () {
        return this.document.location.origin + AuthService_1.PATH_OAUTH2_REDIRECT;
    };
    var AuthService_1;
    AuthService.PATH_OAUTH2_REDIRECT = '/oauth2redirect';
    AuthService = AuthService_1 = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [app_config_1.AbstractAppConfig, Object])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map