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
var material_1 = require("@angular/material");
var datetime_picker_1 = require("@angular-material-components/datetime-picker");
var read_text_field_component_1 = require("./text/read-text-field.component");
var palette_service_1 = require("./palette.service");
var read_number_field_component_1 = require("./number/read-number-field.component");
var read_email_field_component_1 = require("./email/read-email-field.component");
var read_phone_uk_field_component_1 = require("./phone-uk/read-phone-uk-field.component");
var read_date_field_component_1 = require("./date/read-date-field.component");
var date_1 = require("./date");
var fixed_list_module_1 = require("./fixed-list/fixed-list.module");
var dynamic_list_module_1 = require("./dynamic-list/dynamic-list.module");
var dynamic_radio_list_module_1 = require("./dynamic-radio-list/dynamic-radio-list.module");
var yes_no_module_1 = require("./yes-no/yes-no.module");
var complex_module_1 = require("./complex/complex.module");
var address_module_1 = require("./address/address.module");
var base_field_module_1 = require("./base-field/base-field.module");
var write_text_field_component_1 = require("./text/write-text-field.component");
var forms_1 = require("@angular/forms");
var unsupported_field_component_1 = require("./unsupported-field.component");
var read_collection_field_component_1 = require("./collection/read-collection-field.component");
var utils_module_1 = require("./utils/utils.module");
var write_phone_uk_field_component_1 = require("./phone-uk/write-phone-uk-field.component");
var write_email_field_component_1 = require("./email/write-email-field.component");
var write_collection_field_component_1 = require("./collection/write-collection-field.component");
var write_number_field_component_1 = require("./number/write-number-field.component");
var money_gbp_module_1 = require("./money-gbp/money-gbp.module");
var read_text_area_field_component_1 = require("./text-area/read-text-area-field.component");
var write_text_area_field_component_1 = require("./text-area/write-text-area-field.component");
var multi_select_list_module_1 = require("./multi-select-list/multi-select-list.module");
var write_date_field_component_1 = require("./date/write-date-field.component");
var datetime_picker_component_1 = require("./datetime-picker/datetime-picker.component");
var document_module_1 = require("./document/document.module");
var markdown_module_1 = require("../markdown/markdown.module");
var form_validators_service_1 = require("../../services/form/form-validators.service");
var order_summary_module_1 = require("./order-summary/order-summary.module");
var case_payment_history_viewer_module_1 = require("./payment/case-payment-history-viewer.module");
var pipes_module_1 = require("../../pipes/pipes.module");
var banners_module_1 = require("../../../components/banners/banners.module");
var headers_module_1 = require("../../../components/header/headers.module");
var footers_module_1 = require("../../../components/footer/footers.module");
var body_module_1 = require("../../../components/body/body.module");
var form_module_1 = require("../../../components/form/form.module");
var tabs_module_1 = require("../../../components/tabs/tabs.module");
var label_1 = require("./label");
var substitutor_1 = require("../../directives/substitutor");
var read_case_link_field_component_1 = require("./case-link/read-case-link-field.component");
var write_case_link_field_component_1 = require("./case-link/write-case-link-field.component");
var fixed_radio_list_1 = require("./fixed-radio-list");
var history_1 = require("./history");
var collection_create_checker_service_1 = require("./collection/collection-create-checker.service");
var case_link_module_1 = require("./case-link/case-link.module");
var file_upload_progress_guard_1 = require("./document/file-upload-progress.guard");
var file_upload_state_service_1 = require("./document/file-upload-state.service");
var organisation_module_1 = require("./organisation/organisation.module");
var organisation_1 = require("./organisation");
var PaletteModule = /** @class */ (function () {
    function PaletteModule() {
    }
    PaletteModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                base_field_module_1.BaseFieldModule,
                fixed_list_module_1.FixedListModule,
                dynamic_list_module_1.DynamicListModule,
                dynamic_radio_list_module_1.DynamicRadioListModule,
                fixed_radio_list_1.FixedRadioListModule,
                yes_no_module_1.YesNoModule,
                complex_module_1.ComplexModule,
                multi_select_list_module_1.MultiSelectListModule,
                money_gbp_module_1.MoneyGbpModule,
                forms_1.ReactiveFormsModule,
                utils_module_1.PaletteUtilsModule,
                document_module_1.DocumentModule,
                address_module_1.AddressModule,
                markdown_module_1.MarkdownModule,
                order_summary_module_1.OrderSummaryModule,
                case_payment_history_viewer_module_1.CasePaymentHistoryViewerModule,
                history_1.CaseHistoryViewerModule,
                pipes_module_1.PipesModule,
                banners_module_1.BannersModule,
                headers_module_1.HeadersModule,
                footers_module_1.FootersModule,
                body_module_1.BodyModule,
                form_module_1.FormModule,
                tabs_module_1.TabsModule,
                substitutor_1.LabelSubstitutorModule,
                case_link_module_1.CaseLinkModule,
                organisation_module_1.OrganisationModule,
                datetime_picker_1.NgxMatDatetimePickerModule,
                datetime_picker_1.NgxMatTimepickerModule,
                datetime_picker_1.NgxMatNativeDateModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatDatepickerModule
            ],
            declarations: [
                unsupported_field_component_1.UnsupportedFieldComponent,
                label_1.LabelFieldComponent,
                datetime_picker_component_1.DatetimePickerComponent,
                // Read
                read_text_field_component_1.ReadTextFieldComponent,
                read_text_area_field_component_1.ReadTextAreaFieldComponent,
                read_number_field_component_1.ReadNumberFieldComponent,
                read_email_field_component_1.ReadEmailFieldComponent,
                read_phone_uk_field_component_1.ReadPhoneUKFieldComponent,
                read_date_field_component_1.ReadDateFieldComponent,
                read_collection_field_component_1.ReadCollectionFieldComponent,
                // Write
                write_collection_field_component_1.WriteCollectionFieldComponent,
                write_text_field_component_1.WriteTextFieldComponent,
                date_1.WriteDateContainerFieldComponent,
                write_text_area_field_component_1.WriteTextAreaFieldComponent,
                write_phone_uk_field_component_1.WritePhoneUKFieldComponent,
                write_number_field_component_1.WriteNumberFieldComponent,
                write_email_field_component_1.WriteEmailFieldComponent,
                write_date_field_component_1.WriteDateFieldComponent,
            ],
            entryComponents: [
                unsupported_field_component_1.UnsupportedFieldComponent,
                label_1.LabelFieldComponent,
                // Read
                read_text_field_component_1.ReadTextFieldComponent,
                read_text_area_field_component_1.ReadTextAreaFieldComponent,
                read_number_field_component_1.ReadNumberFieldComponent,
                read_email_field_component_1.ReadEmailFieldComponent,
                read_phone_uk_field_component_1.ReadPhoneUKFieldComponent,
                read_date_field_component_1.ReadDateFieldComponent,
                read_collection_field_component_1.ReadCollectionFieldComponent,
                read_case_link_field_component_1.ReadCaseLinkFieldComponent,
                organisation_1.ReadOrganisationFieldComponent,
                // Write
                write_collection_field_component_1.WriteCollectionFieldComponent,
                write_text_field_component_1.WriteTextFieldComponent,
                write_text_area_field_component_1.WriteTextAreaFieldComponent,
                write_phone_uk_field_component_1.WritePhoneUKFieldComponent,
                write_number_field_component_1.WriteNumberFieldComponent,
                write_email_field_component_1.WriteEmailFieldComponent,
                write_date_field_component_1.WriteDateFieldComponent,
                datetime_picker_component_1.DatetimePickerComponent,
                write_case_link_field_component_1.WriteCaseLinkFieldComponent,
                date_1.WriteDateContainerFieldComponent,
                organisation_1.WriteOrganisationFieldComponent
            ],
            exports: [
                base_field_module_1.BaseFieldModule,
                utils_module_1.PaletteUtilsModule,
                unsupported_field_component_1.UnsupportedFieldComponent,
                label_1.LabelFieldComponent,
                datetime_picker_component_1.DatetimePickerComponent,
                // Read
                read_text_field_component_1.ReadTextFieldComponent,
                read_text_area_field_component_1.ReadTextAreaFieldComponent,
                read_number_field_component_1.ReadNumberFieldComponent,
                read_email_field_component_1.ReadEmailFieldComponent,
                read_phone_uk_field_component_1.ReadPhoneUKFieldComponent,
                read_date_field_component_1.ReadDateFieldComponent,
                read_collection_field_component_1.ReadCollectionFieldComponent,
                // Write
                write_collection_field_component_1.WriteCollectionFieldComponent,
                write_text_field_component_1.WriteTextFieldComponent,
                write_text_area_field_component_1.WriteTextAreaFieldComponent,
                write_phone_uk_field_component_1.WritePhoneUKFieldComponent,
                write_number_field_component_1.WriteNumberFieldComponent,
                write_email_field_component_1.WriteEmailFieldComponent,
                write_date_field_component_1.WriteDateFieldComponent,
                date_1.WriteDateContainerFieldComponent,
            ],
            providers: [
                collection_create_checker_service_1.CollectionCreateCheckerService,
                palette_service_1.PaletteService,
                form_validators_service_1.FormValidatorsService,
                file_upload_state_service_1.FileUploadStateService,
                file_upload_progress_guard_1.FileUploadProgressGuard,
                { provide: material_1.MAT_DATE_LOCALE, useValue: 'en-GB' }
            ]
        })
    ], PaletteModule);
    return PaletteModule;
}());
exports.PaletteModule = PaletteModule;
//# sourceMappingURL=palette.module.js.map