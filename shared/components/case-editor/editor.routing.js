"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var case_edit_submit_component_1 = require("./case-edit-submit/case-edit-submit.component");
var case_edit_page_component_1 = require("./case-edit-page/case-edit-page.component");
var case_edit_confirm_component_1 = require("./case-edit-confirm/case-edit-confirm.component");
var case_edit_wizard_guard_1 = require("./services/case-edit-wizard.guard");
var file_upload_progress_guard_1 = require("../palette/document/file-upload-progress.guard");
exports.editorRouting = [
    {
        path: '',
        resolve: {
            caseEditWizardGuard: case_edit_wizard_guard_1.CaseEditWizardGuard,
        },
        component: case_edit_page_component_1.CaseEditPageComponent,
    },
    {
        path: 'submit',
        component: case_edit_submit_component_1.CaseEditSubmitComponent,
    },
    {
        path: 'confirm',
        component: case_edit_confirm_component_1.CaseEditConfirmComponent,
    },
    {
        path: ':page',
        resolve: {
            caseEditWizardGuard: case_edit_wizard_guard_1.CaseEditWizardGuard,
        },
        canDeactivate: [file_upload_progress_guard_1.FileUploadProgressGuard],
        component: case_edit_page_component_1.CaseEditPageComponent,
    }
];
//# sourceMappingURL=editor.routing.js.map