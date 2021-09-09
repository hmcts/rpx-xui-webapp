"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var definition_1 = require("../domain/definition");
var CaseFieldBuilder = /** @class */ (function () {
    function CaseFieldBuilder() {
        this.caseField = new definition_1.CaseField();
    }
    CaseFieldBuilder.create = function () {
        return new CaseFieldBuilder();
    };
    CaseFieldBuilder.prototype.withACLs = function (acls) {
        this.caseField.acls = acls;
        return this;
    };
    CaseFieldBuilder.prototype.withId = function (id) {
        this.caseField.id = id;
        return this;
    };
    CaseFieldBuilder.prototype.withFieldType = function (field_type) {
        this.caseField.field_type = field_type;
        return this;
    };
    CaseFieldBuilder.prototype.withDisplayContext = function (display_context) {
        this.caseField.display_context = display_context;
        return this;
    };
    CaseFieldBuilder.prototype.withDisplayContextParameter = function (display_context_parameter) {
        this.caseField.display_context_parameter = display_context_parameter;
        return this;
    };
    CaseFieldBuilder.prototype.withHidden = function (hidden) {
        this.caseField.hidden = hidden;
        return this;
    };
    CaseFieldBuilder.prototype.withHintText = function (hint_text) {
        this.caseField.hint_text = hint_text;
        return this;
    };
    CaseFieldBuilder.prototype.withLabel = function (label) {
        this.caseField.label = label;
        return this;
    };
    CaseFieldBuilder.prototype.withOrder = function (order) {
        this.caseField.order = order;
        return this;
    };
    CaseFieldBuilder.prototype.withSecurityLabel = function (security_label) {
        this.caseField.security_label = security_label;
        return this;
    };
    CaseFieldBuilder.prototype.withShowCondition = function (show_condition) {
        this.caseField.show_condition = show_condition;
        return this;
    };
    CaseFieldBuilder.prototype.withShowSummaryContentOption = function (option) {
        this.caseField.show_summary_content_option = option;
        return this;
    };
    CaseFieldBuilder.prototype.withValue = function (value) {
        this.caseField.value = value;
        return this;
    };
    CaseFieldBuilder.prototype.withListValue = function (value) {
        this.caseField.list_items = value;
        return this;
    };
    CaseFieldBuilder.prototype.build = function () {
        return this.caseField;
    };
    return CaseFieldBuilder;
}());
exports.CaseFieldBuilder = CaseFieldBuilder;
//# sourceMappingURL=case-field-builder.js.map