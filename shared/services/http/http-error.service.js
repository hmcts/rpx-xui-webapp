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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_2 = require("../../domain/http");
var auth_1 = require("../auth");
var HttpErrorService = /** @class */ (function () {
    function HttpErrorService(authService) {
        this.authService = authService;
    }
    HttpErrorService_1 = HttpErrorService;
    HttpErrorService.convertToHttpError = function (error) {
        if (error instanceof http_2.HttpError) {
            return error;
        }
        var httpError = new http_2.HttpError();
        if (error instanceof http_1.HttpErrorResponse) {
            if (error.headers
                && error.headers.get(HttpErrorService_1.CONTENT_TYPE)
                && error.headers.get(HttpErrorService_1.CONTENT_TYPE).indexOf(HttpErrorService_1.JSON) !== -1) {
                try {
                    httpError = http_2.HttpError.from(error);
                }
                catch (e) {
                    console.error(e, e.message);
                }
            }
            if (!httpError.status) {
                httpError.status = error.status;
            }
        }
        else if (error) {
            if (error.message) {
                httpError.message = error.message;
            }
            if (error.status) {
                httpError.status = error.status;
            }
        }
        return httpError;
    };
    HttpErrorService.prototype.setError = function (error) {
        this.error = error;
    };
    HttpErrorService.prototype.removeError = function () {
        var error = this.error;
        this.error = null;
        return error;
    };
    HttpErrorService.prototype.handle = function (error, redirectIfNotAuthorised) {
        if (redirectIfNotAuthorised === void 0) { redirectIfNotAuthorised = true; }
        var httpError = HttpErrorService_1.convertToHttpError(error);
        if (redirectIfNotAuthorised && (httpError.status === 401 || httpError.status === 403)) {
            this.authService.signIn();
        }
        return rxjs_1.throwError(httpError);
    };
    var HttpErrorService_1;
    HttpErrorService.CONTENT_TYPE = 'Content-Type';
    HttpErrorService.JSON = 'json';
    HttpErrorService = HttpErrorService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_1.AuthService])
    ], HttpErrorService);
    return HttpErrorService;
}());
exports.HttpErrorService = HttpErrorService;
//# sourceMappingURL=http-error.service.js.map