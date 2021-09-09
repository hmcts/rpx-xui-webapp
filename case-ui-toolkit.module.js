"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_pagination_1 = require("ngx-pagination");
var headers_module_1 = require("./components/header/headers.module");
var footers_module_1 = require("./components/footer/footers.module");
var body_module_1 = require("./components/body/body.module");
var phase_component_1 = require("./components/header/phase/phase.component");
var header_bar_component_1 = require("./components/header/header-bar/header-bar.component");
var navigation_component_1 = require("./components/header/navigation/navigation.component");
var navigation_item_component_1 = require("./components/header/navigation/navigation-item.component");
var footer_component_1 = require("./components/footer/footer.component");
var body_component_1 = require("./components/body/body.component");
var form_module_1 = require("./components/form/form.module");
var date_input_component_1 = require("./components/form/date-input/date-input.component");
var tabs_module_1 = require("./components/tabs/tabs.module");
var tabs_component_1 = require("./components/tabs/tabs.component");
var tab_component_1 = require("./components/tabs/tab.component");
var alert_component_1 = require("./components/banners/alert/alert.component");
var banners_module_1 = require("./components/banners/banners.module");
var case_editor_module_1 = require("./shared/components/case-editor/case-editor.module");
var case_viewer_module_1 = require("./shared/components/case-viewer/case-viewer.module");
var case_edit_component_1 = require("./shared/components/case-editor/case-edit/case-edit.component");
var callback_errors_component_1 = require("./shared/components/error/callback-errors.component");
var case_create_component_1 = require("./shared/components/case-editor/case-create/case-create.component");
var case_progress_component_1 = require("./shared/components/case-editor/case-progress/case-progress.component");
var palette_module_1 = require("./shared/components/palette/palette.module");
var dialogs_module_1 = require("./shared/components/dialogs/dialogs.module");
var document_dialog_component_1 = require("./shared/components/dialogs/document-dialog/document-dialog.component");
var delete_or_cancel_dialog_component_1 = require("./shared/components/dialogs/delete-or-cancel-dialog/delete-or-cancel-dialog.component");
var save_or_discard_dialog_component_1 = require("./shared/components/dialogs/save-or-discard-dialog/save-or-discard-dialog.component");
var remove_dialog_component_1 = require("./shared/components/dialogs/remove-dialog/remove-dialog.component");
var shared_1 = require("./shared");
var case_history_1 = require("./shared/components/case-history");
var CaseUIToolkitModule = /** @class */ (function () {
    function CaseUIToolkitModule() {
    }
    CaseUIToolkitModule = __decorate([
        core_1.NgModule({
            imports: [
                banners_module_1.BannersModule,
                headers_module_1.HeadersModule,
                footers_module_1.FootersModule,
                body_module_1.BodyModule,
                form_module_1.FormModule,
                tabs_module_1.TabsModule,
                case_editor_module_1.CaseEditorModule,
                case_viewer_module_1.CaseViewerModule,
                case_history_1.CaseHistoryModule,
                palette_module_1.PaletteModule,
                dialogs_module_1.DialogsModule,
                shared_1.PipesModule,
                shared_1.MarkdownModule,
                shared_1.ConditionalShowModule,
                shared_1.LabelSubstitutorModule,
                shared_1.SearchFiltersModule,
                shared_1.FocusElementModule,
                shared_1.LoadingModule,
                shared_1.PaginationModule
            ],
            exports: [
                alert_component_1.AlertComponent,
                phase_component_1.PhaseComponent,
                header_bar_component_1.HeaderBarComponent,
                navigation_component_1.NavigationComponent,
                navigation_item_component_1.NavigationItemComponent,
                footer_component_1.FooterComponent,
                body_component_1.BodyComponent,
                date_input_component_1.DateInputComponent,
                tabs_component_1.TabsComponent,
                tab_component_1.TabComponent,
                case_edit_component_1.CaseEditComponent,
                case_create_component_1.CaseCreateComponent,
                case_progress_component_1.CaseProgressComponent,
                shared_1.CaseViewComponent,
                shared_1.CaseViewerComponent,
                callback_errors_component_1.CallbackErrorsComponent,
                document_dialog_component_1.DocumentDialogComponent,
                delete_or_cancel_dialog_component_1.DeleteOrCancelDialogComponent,
                save_or_discard_dialog_component_1.SaveOrDiscardDialogComponent,
                remove_dialog_component_1.RemoveDialogComponent,
                shared_1.CaseReferencePipe,
                shared_1.MarkdownComponent,
                shared_1.PaginationComponent,
                shared_1.BaseFieldModule,
                shared_1.PaletteUtilsModule,
                shared_1.UnsupportedFieldComponent,
                shared_1.LabelFieldComponent,
                // Read
                shared_1.ReadTextFieldComponent,
                shared_1.ReadTextAreaFieldComponent,
                shared_1.ReadNumberFieldComponent,
                shared_1.ReadEmailFieldComponent,
                shared_1.ReadPhoneUKFieldComponent,
                shared_1.ReadDateFieldComponent,
                shared_1.ReadCollectionFieldComponent,
                // Write
                shared_1.WriteCollectionFieldComponent,
                shared_1.WriteTextFieldComponent,
                shared_1.WriteTextAreaFieldComponent,
                shared_1.WritePhoneUKFieldComponent,
                shared_1.WriteNumberFieldComponent,
                shared_1.WriteEmailFieldComponent,
                shared_1.WriteDateFieldComponent,
                shared_1.ConditionalShowDirective,
                shared_1.LabelSubstitutorDirective,
                shared_1.FocusElementDirective,
                ngx_pagination_1.PaginatePipe
            ]
        })
    ], CaseUIToolkitModule);
    return CaseUIToolkitModule;
}());
exports.CaseUIToolkitModule = CaseUIToolkitModule;
//# sourceMappingURL=case-ui-toolkit.module.js.map