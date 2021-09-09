"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var services_1 = require("../../services");
var activity_component_1 = require("./activity.component");
var activity_banner_1 = require("./activity-banner");
var activity_icon_1 = require("./activity-icon");
var session_storage_service_1 = require("../../services/session/session-storage.service");
var ActivityModule = /** @class */ (function () {
    function ActivityModule() {
    }
    ActivityModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
            ],
            declarations: [
                activity_component_1.ActivityComponent,
                activity_banner_1.ActivityBannerComponent,
                activity_icon_1.ActivityIconComponent,
            ],
            exports: [
                activity_component_1.ActivityComponent,
                activity_banner_1.ActivityBannerComponent,
                activity_icon_1.ActivityIconComponent,
            ],
            providers: [
                services_1.ActivityService,
                services_1.ActivityPollingService,
                session_storage_service_1.SessionStorageService
            ]
        })
    ], ActivityModule);
    return ActivityModule;
}());
exports.ActivityModule = ActivityModule;
//# sourceMappingURL=activity.module.js.map