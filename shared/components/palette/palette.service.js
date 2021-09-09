"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var read_text_field_component_1 = require("./text/read-text-field.component");
var read_text_area_field_component_1 = require("./text-area/read-text-area-field.component");
var read_complex_field_component_1 = require("./complex/read-complex-field.component");
var read_number_field_component_1 = require("./number/read-number-field.component");
var read_yes_no_field_component_1 = require("./yes-no/read-yes-no-field.component");
var read_email_field_component_1 = require("./email/read-email-field.component");
var read_phone_uk_field_component_1 = require("./phone-uk/read-phone-uk-field.component");
var read_date_field_component_1 = require("./date/read-date-field.component");
var read_fixed_list_field_component_1 = require("./fixed-list/read-fixed-list-field.component");
var read_dynamic_list_field_component_1 = require("./dynamic-list/read-dynamic-list-field.component");
var read_money_gbp_field_component_1 = require("./money-gbp/read-money-gbp-field.component");
var write_text_field_component_1 = require("./text/write-text-field.component");
var unsupported_field_component_1 = require("./unsupported-field.component");
var read_collection_field_component_1 = require("./collection/read-collection-field.component");
var write_complex_field_component_1 = require("./complex/write-complex-field.component");
var write_date_container_field_component_1 = require("./date/write-date-container-field.component");
var write_phone_uk_field_component_1 = require("./phone-uk/write-phone-uk-field.component");
var write_number_field_component_1 = require("./number/write-number-field.component");
var write_yes_no_field_component_1 = require("./yes-no/write-yes-no-field.component");
var write_email_field_component_1 = require("./email/write-email-field.component");
var write_collection_field_component_1 = require("./collection/write-collection-field.component");
var write_fixed_list_field_component_1 = require("./fixed-list/write-fixed-list-field.component");
var write_money_gbp_field_component_1 = require("./money-gbp/write-money-gbp-field.component");
var write_dynamic_list_field_component_1 = require("./dynamic-list/write-dynamic-list-field.component");
var write_text_area_field_component_1 = require("./text-area/write-text-area-field.component");
var read_multi_select_list_field_component_1 = require("./multi-select-list/read-multi-select-list-field.component");
var write_multi_select_list_field_component_1 = require("./multi-select-list/write-multi-select-list-field.component");
var read_document_field_component_1 = require("./document/read-document-field.component");
var write_document_field_component_1 = require("./document/write-document-field.component");
var label_field_component_1 = require("./label/label-field.component");
var write_address_field_component_1 = require("./address/write-address-field.component");
var write_order_summary_field_component_1 = require("./order-summary/write-order-summary-field.component");
var read_order_summary_field_component_1 = require("./order-summary/read-order-summary-field.component");
var case_payment_history_viewer_field_component_1 = require("./payment/case-payment-history-viewer-field.component");
var read_case_link_field_component_1 = require("./case-link/read-case-link-field.component");
var write_case_link_field_component_1 = require("./case-link/write-case-link-field.component");
var fixed_radio_list_1 = require("./fixed-radio-list");
var history_1 = require("./history");
var write_organisation_field_component_1 = require("./organisation/write-organisation-field.component");
var read_organisation_field_component_1 = require("./organisation/read-organisation-field.component");
var dynamic_radio_list_1 = require("./dynamic-radio-list");
var PaletteService = /** @class */ (function () {
    function PaletteService() {
    }
    PaletteService.prototype.getFieldComponentClass = function (caseField, write) {
        switch (caseField.field_type.type) {
            case 'Text':
            case 'Postcode':
                return write ? write_text_field_component_1.WriteTextFieldComponent : read_text_field_component_1.ReadTextFieldComponent;
            case 'TextArea':
                return write ? write_text_area_field_component_1.WriteTextAreaFieldComponent : read_text_area_field_component_1.ReadTextAreaFieldComponent;
            case 'Number':
                return write ? write_number_field_component_1.WriteNumberFieldComponent : read_number_field_component_1.ReadNumberFieldComponent;
            case 'YesOrNo':
                return write ? write_yes_no_field_component_1.WriteYesNoFieldComponent : read_yes_no_field_component_1.ReadYesNoFieldComponent;
            case 'Email':
                return write ? write_email_field_component_1.WriteEmailFieldComponent : read_email_field_component_1.ReadEmailFieldComponent;
            case 'PhoneUK':
                return write ? write_phone_uk_field_component_1.WritePhoneUKFieldComponent : read_phone_uk_field_component_1.ReadPhoneUKFieldComponent;
            case 'Date':
            case 'DateTime':
                return write ? write_date_container_field_component_1.WriteDateContainerFieldComponent : read_date_field_component_1.ReadDateFieldComponent;
            case 'MoneyGBP':
                return write ? write_money_gbp_field_component_1.WriteMoneyGbpFieldComponent : read_money_gbp_field_component_1.ReadMoneyGbpFieldComponent;
            case 'DynamicList':
                return write ? write_dynamic_list_field_component_1.WriteDynamicListFieldComponent : read_dynamic_list_field_component_1.ReadDynamicListFieldComponent;
            case 'FixedList':
                return write ? write_fixed_list_field_component_1.WriteFixedListFieldComponent : read_fixed_list_field_component_1.ReadFixedListFieldComponent;
            case 'DynamicRadioList':
                return write ? dynamic_radio_list_1.WriteDynamicRadioListFieldComponent : dynamic_radio_list_1.ReadDynamicRadioListFieldComponent;
            case 'FixedRadioList':
                return write ? fixed_radio_list_1.WriteFixedRadioListFieldComponent : fixed_radio_list_1.ReadFixedRadioListFieldComponent;
            case 'Complex':
                switch (caseField.field_type.id) {
                    case 'AddressGlobalUK':
                    case 'AddressUK':
                        return write ? write_address_field_component_1.WriteAddressFieldComponent : read_complex_field_component_1.ReadComplexFieldComponent;
                    case 'OrderSummary':
                        return write ? write_order_summary_field_component_1.WriteOrderSummaryFieldComponent : read_order_summary_field_component_1.ReadOrderSummaryFieldComponent;
                    case 'CaseLink':
                        return write ? write_case_link_field_component_1.WriteCaseLinkFieldComponent : read_case_link_field_component_1.ReadCaseLinkFieldComponent;
                    case 'Organisation':
                        return write ? write_organisation_field_component_1.WriteOrganisationFieldComponent : read_organisation_field_component_1.ReadOrganisationFieldComponent;
                    default:
                        return write ? write_complex_field_component_1.WriteComplexFieldComponent : read_complex_field_component_1.ReadComplexFieldComponent;
                }
            case 'Collection':
                return write ? write_collection_field_component_1.WriteCollectionFieldComponent : read_collection_field_component_1.ReadCollectionFieldComponent;
            case 'MultiSelectList':
                return write ? write_multi_select_list_field_component_1.WriteMultiSelectListFieldComponent : read_multi_select_list_field_component_1.ReadMultiSelectListFieldComponent;
            case 'Document':
                return write ? write_document_field_component_1.WriteDocumentFieldComponent : read_document_field_component_1.ReadDocumentFieldComponent;
            case 'Label':
                return label_field_component_1.LabelFieldComponent;
            case 'CasePaymentHistoryViewer':
                return case_payment_history_viewer_field_component_1.CasePaymentHistoryViewerFieldComponent;
            case 'CaseHistoryViewer':
                return history_1.CaseHistoryViewerFieldComponent;
            default:
                return unsupported_field_component_1.UnsupportedFieldComponent;
        }
    };
    PaletteService = __decorate([
        core_1.Injectable()
    ], PaletteService);
    return PaletteService;
}());
exports.PaletteService = PaletteService;
//# sourceMappingURL=palette.service.js.map