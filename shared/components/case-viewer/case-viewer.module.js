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
var case_viewer_component_1 = require("./case-viewer.component");
var material_1 = require("@angular/material");
var services_1 = require("../../services");
var errors_module_1 = require("../error/errors.module");
var activity_module_1 = require("../activity/activity.module");
var case_header_1 = require("../case-header");
var case_history_1 = require("../case-history");
var event_trigger_module_1 = require("../event-trigger/event-trigger.module");
var tabs_1 = require("../../../components/tabs");
var palette_1 = require("../palette");
var directives_1 = require("../../directives");
var printer_1 = require("./printer");
var case_event_trigger_1 = require("./case-event-trigger");
var services_2 = require("./services");
var case_editor_1 = require("../case-editor");
var case_view_component_1 = require("./case-view/case-view.component");
var pipes_1 = require("../../pipes");
var CaseViewerModule = /** @class */ (function () {
    function CaseViewerModule() {
    }
    CaseViewerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                errors_module_1.ErrorsModule,
                activity_module_1.ActivityModule,
                case_header_1.CaseHeaderModule,
                event_trigger_module_1.EventTriggerModule,
                tabs_1.TabsModule,
                palette_1.PaletteModule,
                directives_1.LabelSubstitutorModule,
                case_editor_1.CaseEditorModule,
                pipes_1.PipesModule,
                directives_1.ConditionalShowModule,
                case_history_1.CaseHistoryModule,
                palette_1.EventLogModule,
                material_1.MatTabsModule,
                palette_1.ComplexModule
            ],
            declarations: [
                case_event_trigger_1.CaseEventTriggerComponent,
                printer_1.CasePrinterComponent,
                case_viewer_component_1.CaseViewerComponent,
                case_view_component_1.CaseViewComponent,
                printer_1.PrintUrlPipe,
            ],
            exports: [
                case_viewer_component_1.CaseViewerComponent,
                case_view_component_1.CaseViewComponent,
            ],
            providers: [
                case_editor_1.CaseNotifier,
                services_1.NavigationNotifierService,
                pipes_1.CaseReferencePipe,
                services_2.EventTriggerResolver,
                services_1.ActivityService,
                services_1.ActivityPollingService,
                services_1.OrderService,
                services_1.DraftService,
                services_1.HttpService,
                services_2.CaseResolver,
                services_1.ErrorNotifierService,
            ]
        })
    ], CaseViewerModule);
    return CaseViewerModule;
}());
exports.CaseViewerModule = CaseViewerModule;
//# sourceMappingURL=case-viewer.module.js.map