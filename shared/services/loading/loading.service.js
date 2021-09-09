"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var LoadingService = /** @class */ (function () {
    function LoadingService() {
        this.registered = new Map();
        this.loading = new rxjs_1.BehaviorSubject(false);
    }
    Object.defineProperty(LoadingService.prototype, "isLoading", {
        get: function () {
            return this.loading.asObservable().pipe(operators_1.distinctUntilChanged());
        },
        enumerable: true,
        configurable: true
    });
    LoadingService.prototype.register = function () {
        var token = this.generateToken();
        this.registered.set(token, token);
        this.loading.next(true);
        return token;
    };
    LoadingService.prototype.unregister = function (token) {
        this.registered.delete(token);
        this.loading.next(this.registered.size > 0);
    };
    LoadingService.prototype.generateToken = function () {
        var timestamp = window.performance.now();
        return 'toolkit-loading-' + timestamp; // format: [source-library]-[unique incrementing number]
    };
    LoadingService = __decorate([
        core_1.Injectable()
    ], LoadingService);
    return LoadingService;
}());
exports.LoadingService = LoadingService;
var HasLoadingState = /** @class */ (function () {
    function HasLoadingState() {
    }
    Object.defineProperty(HasLoadingState.prototype, "isLoading", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    ;
    return HasLoadingState;
}());
exports.HasLoadingState = HasLoadingState;
//# sourceMappingURL=loading.service.js.map