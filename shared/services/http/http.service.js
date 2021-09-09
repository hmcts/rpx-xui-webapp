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
var operators_1 = require("rxjs/operators");
var http_error_service_1 = require("./http-error.service");
var HttpService = /** @class */ (function () {
    function HttpService(httpclient, httpErrorService) {
        this.httpclient = httpclient;
        this.httpErrorService = httpErrorService;
    }
    HttpService_1 = HttpService;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    HttpService.prototype.get = function (url, options, redirectIfNotAuthorised, errorHandler) {
        var _this = this;
        if (redirectIfNotAuthorised === void 0) { redirectIfNotAuthorised = true; }
        return this.httpclient
            .get(url, this.setDefaultValue(options))
            .pipe(operators_1.catchError(function (res) {
            var error = res;
            if (typeof errorHandler === 'function') {
                error = errorHandler(res);
            }
            return _this.httpErrorService.handle(error, redirectIfNotAuthorised);
        }));
    };
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    HttpService.prototype.post = function (url, body, options, redirectIfNotAuthorised) {
        var _this = this;
        if (redirectIfNotAuthorised === void 0) { redirectIfNotAuthorised = true; }
        return this.httpclient
            .post(url, body, this.setDefaultValue(options))
            .pipe(operators_1.catchError(function (res) {
            return _this.httpErrorService.handle(res, redirectIfNotAuthorised);
        }));
    };
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    HttpService.prototype.put = function (url, body, options) {
        var _this = this;
        return this.httpclient
            .put(url, body, this.setDefaultValue(options))
            .pipe(operators_1.catchError(function (res) {
            return _this.httpErrorService.handle(res);
        }));
    };
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    HttpService.prototype.delete = function (url, options) {
        var _this = this;
        return this.httpclient
            .delete(url, this.setDefaultValue(options))
            .pipe(operators_1.catchError(function (res) {
            return _this.httpErrorService.handle(res);
        }));
    };
    HttpService.prototype.setDefaultValue = function (options) {
        options = options || { observe: 'body' };
        options.withCredentials = true;
        if (!options.headers) {
            options.headers = new http_1.HttpHeaders()
                .set(HttpService_1.HEADER_ACCEPT, 'application/json')
                .set(HttpService_1.HEADER_CONTENT_TYPE, 'application/json');
        }
        return options;
    };
    var HttpService_1;
    HttpService.HEADER_ACCEPT = 'Accept';
    HttpService.HEADER_CONTENT_TYPE = 'Content-Type';
    HttpService = HttpService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            http_error_service_1.HttpErrorService])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map