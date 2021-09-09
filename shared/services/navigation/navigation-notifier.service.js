"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var NavigationNotifierService = /** @class */ (function () {
    function NavigationNotifierService() {
        this.navigationSource = new rxjs_1.BehaviorSubject({});
        this.navigation = this.navigationSource.asObservable();
    }
    NavigationNotifierService.prototype.announceNavigation = function (origin) {
        this.navigationSource.next(origin);
    };
    NavigationNotifierService = __decorate([
        core_1.Injectable()
    ], NavigationNotifierService);
    return NavigationNotifierService;
}());
exports.NavigationNotifierService = NavigationNotifierService;
//# sourceMappingURL=navigation-notifier.service.js.map