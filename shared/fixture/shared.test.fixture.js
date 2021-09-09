"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var case_event_trigger_model_1 = require("../domain/case-view/case-event-trigger.model");
var wizard_page_field_complex_override_model_1 = require("../components/case-editor/domain/wizard-page-field-complex-override.model");
var domain_1 = require("../components/case-editor/domain");
var case_field_builder_1 = require("./case-field-builder");
exports.createCaseEventTrigger = function (id, name, case_id, show_summary, case_fields, wizard_pages, can_save_draft) {
    if (wizard_pages === void 0) { wizard_pages = []; }
    if (can_save_draft === void 0) { can_save_draft = false; }
    var eventTrigger = new case_event_trigger_model_1.CaseEventTrigger();
    eventTrigger.id = id;
    eventTrigger.name = name;
    eventTrigger.case_id = case_id;
    eventTrigger.show_summary = show_summary;
    eventTrigger.wizard_pages = wizard_pages;
    eventTrigger.event_token = 'test-token';
    eventTrigger.case_fields = case_fields;
    eventTrigger.can_save_draft = can_save_draft;
    return eventTrigger;
};
exports.aCaseField = function (id, label, type, display_context, show_summary_content_option, typeComplexFields, retain_hidden_value, hidden) {
    if (typeComplexFields === void 0) { typeComplexFields = []; }
    return ({
        id: id || 'personFirstName',
        field_type: {
            id: type.toString() || 'Text',
            type: type || 'Text',
            complex_fields: typeComplexFields || []
        },
        display_context: display_context || 'OPTIONAL',
        label: label || 'First name',
        show_summary_content_option: show_summary_content_option,
        retain_hidden_value: retain_hidden_value || false,
        hidden: hidden || false
    });
};
exports.createWizardPage = function (id, label, order, wizardPageFields, caseFields, showCondition, parsedShowCondition) {
    if (wizardPageFields === void 0) { wizardPageFields = []; }
    if (caseFields === void 0) { caseFields = []; }
    if (parsedShowCondition === void 0) { parsedShowCondition = null; }
    var wizardPage = new domain_1.WizardPage();
    wizardPage.id = id;
    wizardPage.label = label;
    wizardPage.order = order;
    wizardPage.wizard_page_fields = wizardPageFields;
    wizardPage.case_fields = caseFields;
    wizardPage.show_condition = showCondition;
    wizardPage.parsedShowCondition = parsedShowCondition;
    return wizardPage;
};
exports.createWizardPageField = function (id, order, pageColumnNumber, complexFieldOverrides) {
    if (complexFieldOverrides === void 0) { complexFieldOverrides = []; }
    var wizardPageField = new domain_1.WizardPageField();
    wizardPageField.case_field_id = id;
    wizardPageField.order = order;
    wizardPageField.page_column_no = pageColumnNumber;
    wizardPageField.complex_field_overrides = complexFieldOverrides;
    return wizardPageField;
};
exports.createComplexFieldOverride = function (id, order, displayContext, label, hint, showCondition) {
    var complexFieldOverride = new wizard_page_field_complex_override_model_1.ComplexFieldOverride();
    complexFieldOverride.complex_field_element_id = id;
    complexFieldOverride.display_context = displayContext;
    complexFieldOverride.label = label;
    complexFieldOverride.hint_text = hint;
    complexFieldOverride.show_condition = showCondition;
    return complexFieldOverride;
};
exports.createHiddenComplexFieldOverride = function (id) {
    var complexFieldOverride = new wizard_page_field_complex_override_model_1.ComplexFieldOverride();
    complexFieldOverride.complex_field_element_id = id;
    complexFieldOverride.display_context = 'HIDDEN';
    return complexFieldOverride;
};
exports.createCaseField = function (id, label, hint, fieldType, display_context, order, show_condition, ACLs, hidden) {
    if (order === void 0) { order = undefined; }
    if (show_condition === void 0) { show_condition = undefined; }
    if (ACLs === void 0) { ACLs = undefined; }
    return case_field_builder_1.CaseFieldBuilder.create()
        .withId(id || 'personFirstName')
        .withFieldType(fieldType || exports.textFieldType())
        .withDisplayContext(display_context || 'OPTIONAL')
        .withLabel(label || 'First name')
        .withHintText(hint || 'First name hint text')
        .withShowSummaryContentOption(0)
        .withOrder(order)
        .withShowCondition(show_condition || undefined)
        .withACLs(ACLs)
        .withHidden(hidden || false)
        .build();
};
exports.newCaseField = function (id, label, hint, fieldType, display_context, order) {
    if (order === void 0) { order = undefined; }
    return case_field_builder_1.CaseFieldBuilder.create()
        .withId(id || 'personFirstName')
        .withFieldType(fieldType || exports.textFieldType())
        .withDisplayContext(display_context || 'OPTIONAL')
        .withHintText(hint || 'First name hint text')
        .withLabel(label || 'First name')
        .withOrder(order)
        .withShowSummaryContentOption(0);
};
exports.createFieldType = function (typeId, type, complex_fields, collection_field_type) {
    if (complex_fields === void 0) { complex_fields = []; }
    if (collection_field_type === void 0) { collection_field_type = undefined; }
    return {
        id: typeId || 'Text',
        type: type || 'Text',
        complex_fields: complex_fields || [],
        collection_field_type: collection_field_type || undefined
    };
};
exports.createFixedListFieldType = function (typeId, fixedListItems) {
    if (fixedListItems === void 0) { fixedListItems = []; }
    return {
        id: 'FixedList-' + typeId,
        type: 'FixedList',
        fixed_list_items: fixedListItems || []
    };
};
exports.createMultiSelectListFieldType = function (typeId, fixedListItems) {
    if (fixedListItems === void 0) { fixedListItems = []; }
    return {
        id: 'MultiSelectList-' + typeId,
        type: 'MultiSelectList',
        fixed_list_items: fixedListItems || []
    };
};
exports.textFieldType = function () {
    return {
        id: 'Text',
        type: 'Text',
        complex_fields: []
    };
};
exports.createACL = function (role, create, read, update, _delete) {
    return ({
        role: role || 'roleX',
        create: create,
        read: read,
        update: update,
        delete: _delete
    });
};
//# sourceMappingURL=shared.test.fixture.js.map