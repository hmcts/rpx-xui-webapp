"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var domain_1 = require("../../../directives/conditional-show/domain");
var i0 = require("@angular/core");
var WizardPageFieldToCaseFieldMapper = /** @class */ (function () {
    function WizardPageFieldToCaseFieldMapper() {
    }
    WizardPageFieldToCaseFieldMapper.prototype.mapAll = function (wizardPageFields, caseFields) {
        var _this = this;
        return wizardPageFields.map(function (wizardField) {
            return _this.map(wizardField, caseFields);
        });
    };
    WizardPageFieldToCaseFieldMapper.prototype.map = function (wizardPageField, caseFields) {
        var _this = this;
        var caseField = caseFields.find(function (e) { return e.id === wizardPageField.case_field_id; });
        caseField.wizardProps = wizardPageField;
        caseField.order = wizardPageField.order;
        this.fixShowConditionPath(caseField, '');
        if (wizardPageField.complex_field_overrides && wizardPageField.complex_field_overrides.length > 0) {
            wizardPageField.complex_field_overrides.forEach(function (override) {
                _this.processComplexFieldOverride(override, caseField, caseFields);
            });
        }
        // this will fix the CaseLink type as we exclude it in ccdFieldsFilter directive
        this.hideParentIfAllChildrenHidden(caseField);
        return caseField;
    };
    WizardPageFieldToCaseFieldMapper.prototype.processComplexFieldOverride = function (override, caseField, caseFields) {
        var caseFieldIds = override.complex_field_element_id.split('.');
        var case_field_leaf;
        var children = this.getCaseFieldChildren(caseField);
        if (children.length > 0) {
            var _ = caseFieldIds[0], tail = caseFieldIds.slice(1);
            case_field_leaf = this.getCaseFieldLeaf(tail, children);
        }
        else {
            case_field_leaf = this.getCaseFieldLeaf(caseFieldIds, caseFields);
        }
        if (override.display_context !== 'HIDDEN') {
            case_field_leaf.hidden = false;
            case_field_leaf.display_context = override.display_context;
            if (override.label && override.label.length > 0) {
                case_field_leaf.label = override.label;
            }
            if (override.hint_text && override.hint_text.length > 0) {
                case_field_leaf.hint_text = override.hint_text;
            }
            if (override.show_condition && override.show_condition.length > 0) {
                case_field_leaf.show_condition = override.show_condition;
            }
        }
        else {
            case_field_leaf.hidden = true;
            case_field_leaf.display_context = override.display_context;
        }
    };
    WizardPageFieldToCaseFieldMapper.prototype.fixShowConditionPath = function (caseField, pathPrefix) {
        var _this = this;
        if (caseField.show_condition) {
            caseField.show_condition = domain_1.ShowCondition.addPathPrefixToCondition(caseField.show_condition, pathPrefix);
        }
        var childrenCaseFields = this.getCaseFieldChildren(caseField);
        childrenCaseFields.forEach(function (collectionCaseField) {
            _this.fixShowConditionPath(collectionCaseField, _this.preparePathPrefix(pathPrefix, caseField.id));
        });
    };
    WizardPageFieldToCaseFieldMapper.prototype.preparePathPrefix = function (pathPrefix, caseField) {
        return pathPrefix.length === 0 ? caseField : pathPrefix + '.' + caseField;
    };
    WizardPageFieldToCaseFieldMapper.prototype.getCaseFieldLeaf = function (caseFieldId, caseFields) {
        var head = caseFieldId[0], tail = caseFieldId.slice(1);
        if (caseFieldId.length === 1) {
            var caseLeaf = caseFields.find(function (e) { return e.id === head; });
            if (!caseLeaf) {
                throw new Error("Cannot find leaf for caseFieldId " + caseFieldId.join('.'));
            }
            return caseLeaf;
        }
        else if (caseFieldId.length > 1) {
            var caseField = caseFields.find(function (e) { return e.id === head; });
            var children = this.getCaseFieldChildren(caseField);
            if (children.length === 0) {
                throw new Error("field_type or complex_fields missing for " + caseFieldId.join('.'));
            }
            return this.getCaseFieldLeaf(tail, children);
        }
        else {
            throw new Error("Cannot find leaf for caseFieldId " + caseFieldId.join('.'));
        }
    };
    WizardPageFieldToCaseFieldMapper.prototype.hideParentIfAllChildrenHidden = function (caseField) {
        var _this = this;
        var childrenCaseFields = this.getCaseFieldChildren(caseField);
        childrenCaseFields.forEach(function (e) { return _this.hideParentIfAllChildrenHidden(e); });
        if (childrenCaseFields.length > 0 && this.allCaseFieldsHidden(childrenCaseFields)) {
            caseField.hidden = true;
        }
    };
    WizardPageFieldToCaseFieldMapper.prototype.getCaseFieldChildren = function (caseField) {
        var childrenCaseFields = [];
        if (caseField.isCollection()) {
            childrenCaseFields = caseField.field_type.collection_field_type.complex_fields || [];
        }
        else if (caseField.isComplex()) {
            childrenCaseFields = caseField.field_type.complex_fields || [];
        }
        return childrenCaseFields;
    };
    WizardPageFieldToCaseFieldMapper.prototype.allCaseFieldsHidden = function (children) {
        return !children.some(function (e) { return e.hidden !== true; });
    };
    WizardPageFieldToCaseFieldMapper.ngInjectableDef = i0.defineInjectable({ factory: function WizardPageFieldToCaseFieldMapper_Factory() { return new WizardPageFieldToCaseFieldMapper(); }, token: WizardPageFieldToCaseFieldMapper, providedIn: "root" });
    WizardPageFieldToCaseFieldMapper = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], WizardPageFieldToCaseFieldMapper);
    return WizardPageFieldToCaseFieldMapper;
}());
exports.WizardPageFieldToCaseFieldMapper = WizardPageFieldToCaseFieldMapper;
//# sourceMappingURL=wizard-page-field-to-case-field.mapper.js.map