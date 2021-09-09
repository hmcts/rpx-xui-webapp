"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var error_1 = require("../../components/error");
var markdown_module_1 = require("../../components/markdown/markdown.module");
var conditional_show_1 = require("../../directives/conditional-show");
var conditional_show_registrar_service_1 = require("../../directives/conditional-show/services/conditional-show-registrar.service");
var substitutor_1 = require("../../directives/substitutor");
var pipes_module_1 = require("../../pipes/pipes.module");
var services_1 = require("../../services");
var addresses_1 = require("../../services/addresses");
var case_field_service_1 = require("../../services/case-fields/case-field.service");
var document_management_1 = require("../../services/document-management");
var fields_purger_1 = require("../../services/fields/fields.purger");
var fields_utils_1 = require("../../services/fields/fields.utils");
var form_1 = require("../../services/form");
var form_error_service_1 = require("../../services/form/form-error.service");
var form_value_service_1 = require("../../services/form/form-value.service");
var order_service_1 = require("../../services/order/order.service");
var profile_1 = require("../../services/profile");
var profile_service_1 = require("../../services/profile/profile.service");
var router_2 = require("../../services/router");
var errors_module_1 = require("../error/errors.module");
var palette_1 = require("../palette");
var case_create_component_1 = require("./case-create/case-create.component");
var case_edit_confirm_component_1 = require("./case-edit-confirm/case-edit-confirm.component");
var case_edit_form_component_1 = require("./case-edit-form/case-edit-form.component");
var case_edit_page_component_1 = require("./case-edit-page/case-edit-page.component");
var case_edit_submit_component_1 = require("./case-edit-submit/case-edit-submit.component");
var case_edit_component_1 = require("./case-edit/case-edit.component");
var case_progress_component_1 = require("./case-progress/case-progress.component");
var case_edit_wizard_guard_1 = require("./services/case-edit-wizard.guard");
var event_trigger_service_1 = require("./services/event-trigger.service");
var page_validation_service_1 = require("./services/page-validation.service");
var wizard_factory_service_1 = require("./services/wizard-factory.service");
var work_allocation_service_1 = require("./services/work-allocation.service");
var CaseEditorModule = /** @class */ (function () {
    function CaseEditorModule() {
    }
    CaseEditorModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                pipes_module_1.PipesModule,
                markdown_module_1.MarkdownModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                palette_1.PaletteModule,
                conditional_show_1.ConditionalShowModule,
                substitutor_1.LabelSubstitutorModule,
                errors_module_1.ErrorsModule,
                palette_1.ComplexModule,
            ],
            declarations: [
                case_edit_confirm_component_1.CaseEditConfirmComponent,
                case_edit_component_1.CaseEditComponent,
                case_edit_page_component_1.CaseEditPageComponent,
                case_edit_form_component_1.CaseEditFormComponent,
                case_edit_submit_component_1.CaseEditSubmitComponent,
                case_create_component_1.CaseCreateComponent,
                case_progress_component_1.CaseProgressComponent
            ],
            exports: [
                case_edit_confirm_component_1.CaseEditConfirmComponent,
                case_edit_component_1.CaseEditComponent,
                case_edit_page_component_1.CaseEditPageComponent,
                case_edit_form_component_1.CaseEditFormComponent,
                case_edit_submit_component_1.CaseEditSubmitComponent,
                case_create_component_1.CaseCreateComponent,
                case_progress_component_1.CaseProgressComponent,
                error_1.CallbackErrorsComponent,
            ],
            providers: [
                fields_utils_1.FieldsUtils,
                fields_purger_1.FieldsPurger,
                conditional_show_registrar_service_1.ConditionalShowRegistrarService,
                wizard_factory_service_1.WizardFactoryService,
                form_1.FieldTypeSanitiser,
                form_value_service_1.FormValueService,
                form_error_service_1.FormErrorService,
                page_validation_service_1.PageValidationService,
                case_field_service_1.CaseFieldService,
                order_service_1.OrderService,
                event_trigger_service_1.EventTriggerService,
                profile_service_1.ProfileService,
                profile_1.ProfileNotifier,
                addresses_1.AddressesService,
                document_management_1.DocumentManagementService,
                router_2.RouterHelperService,
                profile_service_1.ProfileService,
                case_edit_wizard_guard_1.CaseEditWizardGuard,
                work_allocation_service_1.WorkAllocationService,
                services_1.SessionStorageService
            ]
        })
    ], CaseEditorModule);
    return CaseEditorModule;
}());
exports.CaseEditorModule = CaseEditorModule;
//# sourceMappingURL=case-editor.module.js.map