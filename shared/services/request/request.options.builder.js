"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var RequestOptionsBuilder = /** @class */ (function () {
    function RequestOptionsBuilder() {
    }
    RequestOptionsBuilder_1 = RequestOptionsBuilder;
    /**
     * Assess the value to see if it should be included in the request options.
     * If it's null or an "empty" string, it shouldn't be.
     *
     * @param value The value to be assessed.
     */
    RequestOptionsBuilder.includeParam = function (value) {
        if (value) {
            if (typeof (value) === 'string') {
                return value.trim().length > 0;
            }
            return true;
        }
        return false;
    };
    RequestOptionsBuilder.prototype.buildOptions = function (metaCriteria, caseCriteria, view) {
        // TODO: This should probably be the now built-in URLSearchParams but it
        // requires a bigger refactor and there are bigger fish to fry right now.
        var params = new http_1.HttpParams();
        if (view) {
            params = params.set('view', view);
        }
        if (metaCriteria) {
            for (var _i = 0, _a = Object.keys(metaCriteria); _i < _a.length; _i++) {
                var criterion = _a[_i];
                // EUI-3490. Make sure the parameter should be included for adding it.
                // This was already handled by the old URLSearchParams mechanism.
                if (RequestOptionsBuilder_1.includeParam(metaCriteria[criterion])) {
                    params = params.set(criterion, metaCriteria[criterion].replace('’', ''));
                }
            }
        }
        if (caseCriteria) {
            for (var _b = 0, _c = Object.keys(caseCriteria); _b < _c.length; _b++) {
                var criterion = _c[_b];
                if (RequestOptionsBuilder_1.includeParam(caseCriteria[criterion])) {
                    var key = RequestOptionsBuilder_1.FIELD_PREFIX + criterion;
                    var value = caseCriteria[criterion].trim ? caseCriteria[criterion].trim() : caseCriteria[criterion];
                    params = params.set(key, value.replace('’', ''));
                }
            }
        }
        var options = { params: params, observe: 'body' };
        return options;
    };
    var RequestOptionsBuilder_1;
    RequestOptionsBuilder.FIELD_PREFIX = 'case.';
    RequestOptionsBuilder = RequestOptionsBuilder_1 = __decorate([
        core_1.Injectable()
    ], RequestOptionsBuilder);
    return RequestOptionsBuilder;
}());
exports.RequestOptionsBuilder = RequestOptionsBuilder;
//# sourceMappingURL=request.options.builder.js.map