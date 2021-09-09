"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var case_viewer_component_1 = require("./case-viewer.component");
var printer_1 = require("./printer");
var services_1 = require("./services");
var case_event_trigger_component_1 = require("./case-event-trigger/case-event-trigger.component");
var case_editor_1 = require("../case-editor");
var case_history_1 = require("../case-history");
var file_upload_progress_guard_1 = require("../palette/document/file-upload-progress.guard");
exports.viewerRouting = [
    {
        path: '',
        component: case_viewer_component_1.CaseViewerComponent,
    },
    {
        path: 'print',
        component: printer_1.CasePrinterComponent,
    },
    {
        path: 'trigger/:eid',
        resolve: {
            eventTrigger: services_1.EventTriggerResolver
        },
        component: case_event_trigger_component_1.CaseEventTriggerComponent,
        children: case_editor_1.editorRouting,
        canDeactivate: [file_upload_progress_guard_1.FileUploadProgressGuard]
    },
    {
        path: 'event/:eid/history',
        component: case_history_1.CaseHistoryComponent,
    }
];
//# sourceMappingURL=viewer.routing.js.map