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
var errors_module_1 = require("../error/errors.module");
var forms_1 = require("@angular/forms");
var case_timeline_component_1 = require("./case-timeline.component");
var palette_1 = require("../palette");
var case_history_1 = require("../case-history");
var CaseTimelineModule = /** @class */ (function () {
    function CaseTimelineModule() {
    }
    CaseTimelineModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                errors_module_1.ErrorsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                palette_1.EventLogModule,
                case_history_1.CaseHistoryModule,
            ],
            declarations: [
                case_timeline_component_1.CaseTimelineComponent
            ],
            exports: [
                case_timeline_component_1.CaseTimelineComponent
            ]
        })
    ], CaseTimelineModule);
    return CaseTimelineModule;
}());
exports.CaseTimelineModule = CaseTimelineModule;
//# sourceMappingURL=case-timeline.module.js.map