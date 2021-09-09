"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var case_history_viewer_field_component_1 = require("./case-history-viewer-field.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var utils_module_1 = require("../utils/utils.module");
var event_log_1 = require("./event-log");
var utils_1 = require("../utils");
var format_translator_service_1 = require("../../../services/case-fields/format-translator.service");
var CaseHistoryViewerModule = /** @class */ (function () {
    function CaseHistoryViewerModule() {
    }
    CaseHistoryViewerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                utils_module_1.PaletteUtilsModule,
                event_log_1.EventLogModule,
            ],
            declarations: [
                case_history_viewer_field_component_1.CaseHistoryViewerFieldComponent
            ],
            entryComponents: [
                case_history_viewer_field_component_1.CaseHistoryViewerFieldComponent,
            ],
            providers: [
                utils_1.DatePipe,
                format_translator_service_1.FormatTranslatorService
            ]
        })
    ], CaseHistoryViewerModule);
    return CaseHistoryViewerModule;
}());
exports.CaseHistoryViewerModule = CaseHistoryViewerModule;
//# sourceMappingURL=case-history-viewer.module.js.map