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
var event_log_component_1 = require("./event-log.component");
var event_log_table_component_1 = require("./event-log-table.component");
var event_log_details_component_1 = require("./event-log-details.component");
var router_1 = require("@angular/router");
var utils_1 = require("../../utils");
var EventLogModule = /** @class */ (function () {
    function EventLogModule() {
    }
    EventLogModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                utils_1.PaletteUtilsModule,
                router_1.RouterModule
            ],
            declarations: [
                event_log_component_1.EventLogComponent,
                event_log_table_component_1.EventLogTableComponent,
                event_log_details_component_1.EventLogDetailsComponent
            ],
            exports: [
                event_log_component_1.EventLogComponent
            ]
        })
    ], EventLogModule);
    return EventLogModule;
}());
exports.EventLogModule = EventLogModule;
//# sourceMappingURL=event-log.module.js.map