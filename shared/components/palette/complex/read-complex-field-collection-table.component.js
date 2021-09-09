"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var sort_order_1 = require("./sort-order");
var ReadComplexFieldCollectionTableComponent = /** @class */ (function (_super) {
    __extends(ReadComplexFieldCollectionTableComponent, _super);
    function ReadComplexFieldCollectionTableComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rows = [];
        _this.isHidden = [];
        _this.keepOriginalOrder = function (a, b) { return a.key; };
        return _this;
    }
    ReadComplexFieldCollectionTableComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.caseField.display_context_parameter
            && this.caseField.display_context_parameter.trim().startsWith('#TABLE(')) {
            var displayContextParameter = this.caseField.display_context_parameter.trim();
            var result = displayContextParameter.replace('#TABLE(', '');
            this.columns = result.replace(')', '').split(',');
            var labelsVertical = {};
            var labelsHorizontal = {};
            var allLabels = {};
            this.populateCaseFieldValuesIntoRows();
            this.populateLabels(labelsVertical, allLabels);
            this.populateHorizontalLabels(labelsHorizontal, allLabels, labelsVertical);
            this.columnsVerticalLabel = labelsVertical;
            this.columnsHorizontalLabel = labelsHorizontal;
            this.columnsAllLabels = allLabels;
        }
    };
    ReadComplexFieldCollectionTableComponent.prototype.populateHorizontalLabels = function (labelsHorizontal, allLabels, labelsVertical) {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var id = _a[_i];
            labelsHorizontal[id.trim()] = allLabels[id.trim()];
            labelsHorizontal[id.trim()].sortOrder = sort_order_1.SortOrder.UNSORTED;
            delete labelsVertical[id.trim()];
        }
    };
    ReadComplexFieldCollectionTableComponent.prototype.populateLabels = function (labelsVertical, allLabels) {
        for (var _i = 0, _a = this.caseField.field_type.complex_fields; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.field_type.type === 'FixedList' ||
                obj.field_type.type === 'MultiSelectList' ||
                obj.field_type.type === 'FixedRadioList') {
                labelsVertical[obj.id] = { label: obj.label, type: obj.field_type, caseField: obj };
                allLabels[obj.id] = { label: obj.label, type: obj.field_type };
            }
            else if (obj.isComplex()) {
                labelsVertical[obj.id] = { label: obj.label, type: obj.field_type.type, caseField: obj };
                allLabels[obj.id] = { label: obj.label, type: obj.field_type.type, caseField: obj };
            }
            else {
                labelsVertical[obj.id] = { label: obj.label, type: { type: obj.field_type.type }, caseField: obj };
                allLabels[obj.id] = { label: obj.label, type: { type: obj.field_type.type }, caseField: obj };
            }
        }
    };
    ReadComplexFieldCollectionTableComponent.prototype.populateCaseFieldValuesIntoRows = function () {
        for (var _i = 0, _a = this.caseField.value; _i < _a.length; _i++) {
            var obj = _a[_i];
            this.rows.push(obj.value);
            this.isHidden.push(true);
        }
    };
    ReadComplexFieldCollectionTableComponent.prototype.getImage = function (row) {
        if (this.isHidden[row]) {
            return 'img/accordion-plus.png';
        }
        else {
            if (this.isVerticleDataNotEmpty(row)) {
                return 'img/accordion-minus.png';
            }
            else {
                this.isHidden[row] = true;
                return 'img/accordion-plus.png';
            }
        }
    };
    /**
     * Needs to be called before 'ccdFieldsFilter' pipe is used, as it needs a caseField value.
     */
    ReadComplexFieldCollectionTableComponent.prototype.addCaseFieldValue = function (field, value) {
        field.value = value;
        return true;
    };
    ReadComplexFieldCollectionTableComponent.prototype.isNotBlank = function (value) {
        return value !== null && value !== '';
    };
    ReadComplexFieldCollectionTableComponent.prototype.addCaseReferenceValue = function (field, value) {
        field.value = { CaseReference: value };
        return field;
    };
    ReadComplexFieldCollectionTableComponent.prototype.isVerticleDataNotEmpty = function (row) {
        var result = false;
        for (var key in this.columnsVerticalLabel) {
            if (this.rows[row][key]) {
                result = true;
            }
        }
        return result;
    };
    ReadComplexFieldCollectionTableComponent.prototype.sortRowsByColumns = function (column) {
        var shouldSortInAscendingOrder = this.columnsHorizontalLabel[column].sortOrder === sort_order_1.SortOrder.UNSORTED
            || this.columnsHorizontalLabel[column].sortOrder === sort_order_1.SortOrder.DESCENDING;
        switch (this.columnsHorizontalLabel[column].type.type) {
            case 'Number':
            case 'MoneyGBP': {
                if (shouldSortInAscendingOrder) {
                    this.rows.sort(function (a, b) { return a[column] - b[column]; });
                    this.columnsHorizontalLabel[column].sortOrder = sort_order_1.SortOrder.ASCENDING;
                }
                else {
                    this.rows.sort(function (a, b) { return b[column] - a[column]; });
                    this.columnsHorizontalLabel[column].sortOrder = sort_order_1.SortOrder.DESCENDING;
                }
                break;
            }
            case 'Text':
            case 'TextArea':
            case 'Email':
            case 'Date':
            case 'DateTime':
            case 'Label':
            case 'Postcode':
            case 'YesOrNo':
            case 'PhoneUK':
            case 'FixedList':
                {
                    if (shouldSortInAscendingOrder) {
                        this.rows.sort(function (a, b) { return a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0; });
                        this.columnsHorizontalLabel[column].sortOrder = sort_order_1.SortOrder.ASCENDING;
                    }
                    else {
                        this.rows.sort(function (a, b) { return a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0; });
                        this.columnsHorizontalLabel[column].sortOrder = sort_order_1.SortOrder.DESCENDING;
                    }
                }
                break;
        }
    };
    ReadComplexFieldCollectionTableComponent.prototype.isSortAscending = function (column) {
        return !(column.sortOrder === sort_order_1.SortOrder.UNSORTED || column.sortOrder === sort_order_1.SortOrder.DESCENDING);
    };
    ReadComplexFieldCollectionTableComponent.prototype.sortWidget = function (column) {
        return this.isSortAscending(column) ? '&#9660;' : '&#9650;';
    };
    ReadComplexFieldCollectionTableComponent.prototype.trackByIndex = function (index, obj) {
        return index;
    };
    ReadComplexFieldCollectionTableComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-complex-field-collection-table',
            template: "\n     <div class=\"complex-panel\" [hidden]=\"caseField.hidden\">\n          <dl class=\"complex-panel-title\"><dt><span class=\"text-16\">{{caseField.label}}</span></dt><dd></dd></dl>\n          <table class=\"complex-panel-table\">\n            <tbody>\n            <!-- <COMPLEX table field header>-->\n            <tr>\n              <ng-container *ngFor=\"let heading of columns\">\n                <ng-container *ngFor=\"let name of columnsAllLabels | keyvalue:keepOriginalOrder\">\n                  <th *ngIf=\"heading.trim() == name.key\">\n                    <span class=\"text-16\">{{name.value.label}}</span>\n                    <a href=\"javascript:void(0)\" (click)=\"sortRowsByColumns(name.key)\"  class=\"sort-widget\" [innerHTML]=\"sortWidget(name.value)\"></a>\n                  </th>\n                </ng-container>\n              </ng-container>\n              <th></th>\n            </tr>\n            <!-- </COMPLEX table field header>-->\n            <ng-container *ngFor=\"let item of rows; let i = index; trackBy:trackByIndex;\" >\n              <!-- <COMPLEX table collapsed view>-->\n              <tr class=\"new-table-row accordion-heading\" (click)=\"isHidden[i] = !isHidden[i]\">\n                <ng-container *ngFor=\"let heading of columns\">\n                  <ng-container  *ngFor=\"let name of item | keyvalue\">\n                    <td *ngIf=\"heading.trim() == name.key\" class=\"text-16\">\n                      <div *ngIf=\"name.value;else showEmptyTd\">\n                        <ccd-field-read [caseField]=\"{\n                          id: name.key,\n                          label: name.value.label,\n                          field_type: this.columnsHorizontalLabel[name.key].type,\n                          value: name.value\n                        }\" [context]=\"context\"></ccd-field-read>\n                      </div>\n                      <ng-template #showEmptyTd><div>&nbsp;</div></ng-template>\n                    </td>\n\n                  </ng-container>\n                </ng-container>\n                  <td>\n                    <div style=\"float: right;\">\n                      <a href=\"javascript:void(0)\"> <img src=\"{{ getImage(i) }}\" class=\"accordion-image\"/></a>\n                    </div>\n                   </td>\n              </tr>\n              <!-- </COMPLEX table collapsed view>-->\n              <!-- <COMPLEX table expanded view>-->\n              <tr [hidden]=\"isHidden[i]\">\n                <td [colSpan]=\"columns.length +1\">\n                  <table class=\"complex-panel-table\">\n                    <tbody>\n                  \n                    <ng-container *ngFor=\"let vLabel of columnsVerticalLabel | keyvalue:keepOriginalOrder\">\n                      <ng-container  *ngFor=\"let name of item | keyvalue\">\n                        <ng-container *ngIf=\"vLabel.key == name.key && isNotBlank(name.value)\" >\n                        <!-- <COMPLEX table expandable body simple field>-->\n\n                        <tr class=\"complex-panel-simple-field accordion-body\"\n                            ccdConditionalShow [caseField]=\"vLabel.value.caseField\" [contextFields]=\"caseField | ccdFieldsFilter :true :i\">\n                          <th><span class=\"text-16\">{{vLabel.value.label}}</span></th>\n                          <td *ngIf=\"vLabel.value.type !== 'Complex'\" class=\"text-16\">\n                            <ccd-field-read [caseField]=\"{\n                              id: name.key,\n                              label: vLabel.label,\n                              field_type: vLabel.value.caseField.field_type,\n                              value: name.value\n                            }\" [context]=\"context\"></ccd-field-read>\n                          </td>\n                        </tr>\n                      \n                        <!-- </COMPLEX table expandable body simple field>-->\n                        <!-- <COMPLEX table expandable body complex field>-->\n\n                        <tr *ngIf=\"vLabel.value.type === 'Complex' && addCaseFieldValue(vLabel.value.caseField, name.value)\">\n                          <td colspan=\"2\">\n                            <ng-container *ngFor=\"let field of vLabel.value.caseField | ccdFieldsFilter\">\n                              <ng-container *ngIf=\"(field | ccdIsCompound); else SimpleRow\">\n                                <tr class=\"complex-panel-compound-field\" ccdConditionalShow ccdLabelSubstitutor [caseField]=\"field\"\n                                    [contextFields]=\"vLabel.value.caseField | ccdFieldsFilter\">\n                                  <td colspan=\"2\">\n                                    <span class=\"text-16\"><ccd-field-read [caseField]=\"field\" [context]=\"context\"></ccd-field-read></span>\n                                  </td>\n                                </tr>\n                              </ng-container>\n                              <ng-template #SimpleRow>\n                                <tr class=\"complex-panel-nested-field\" ccdConditionalShow ccdLabelSubstitutor [caseField]=\"field\"\n                                    [contextFields]=\"vLabel.value.caseField  | ccdFieldsFilter\">\n                                  <th><span class=\"text-16\">{{field.label}}</span></th>\n                                  <td *ngIf=\"!name.value.hasOwnProperty('CaseReference')\">\n                                    <span class=\"text-16\"><ccd-field-read [caseField]=\"field\" [context]=\"context\"></ccd-field-read></span>\n                                  </td>\n                                  <td *ngIf=\"name.value.hasOwnProperty('CaseReference')\">\n                                    <ccd-read-case-link-field [caseField]=\"addCaseReferenceValue(field, name.value.CaseReference)\" [context]=\"context\"></ccd-read-case-link-field>\n                                  </td>\n                                </tr>\n                              </ng-template>\n                            </ng-container>\n                          </td>\n                        </tr>\n                        <!-- <COMPLEX table expandable body complex field>-->\n                      </ng-container>\n                      </ng-container>\n                    </ng-container>\n                    </tbody>\n                  </table>\n                </td>\n              </tr>\n              <!-- </COMPLEX table expanded view>-->\n            </ng-container>\n            </tbody>\n          </table>\n        </div>\n  ",
            styles: ["\n    .complex-panel{margin:13px 0px;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px;border-bottom:1px solid #bfc1c3;font-weight:bold;display:block;color:#0b0c0c;padding-bottom:2px;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.31579}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th{border-bottom:none}.complex-panel .complex-panel-table th{padding-left:5px;font-weight:bold;border-bottom:none}.complex-panel .complex-panel-table td{padding-left:5px;padding-top:0;padding-bottom:0;border-bottom:none}.complex-panel .new-table-row{border-top:1px solid #bfc1c3}.complex-panel .complex-panel-simple-field th{padding-left:5px;padding-top:0px;padding-bottom:0px;width:295px}.complex-panel .complex-panel-nested-field th{padding-left:33px;padding-top:0px;padding-bottom:0px;width:200px}.complex-panel .complex-panel-compound-field td{padding:5px;border-bottom:none}.sort-widget{cursor:pointer;text-decoration:none;color:#0b0c0c}.accordion-wrapper{margin-bottom:20px}.accordion-wrapper .heading-medium{margin:0px}.accordion-wrapper .accordion-heading{border-top:1px solid #bfc1c3;padding-top:20px;padding-bottom:10px;height:20px;cursor:pointer}.accordion-wrapper .accordion-heading .accordion-image{width:25px;margin-right:20px}.accordion-wrapper .accordion-body{margin-top:20px;margin-right:20px}.accordion-wrapper .last-accordion{border-bottom:1px solid #bfc1c3;padding-bottom:30px}\n  "]
        })
    ], ReadComplexFieldCollectionTableComponent);
    return ReadComplexFieldCollectionTableComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadComplexFieldCollectionTableComponent = ReadComplexFieldCollectionTableComponent;
//# sourceMappingURL=read-complex-field-collection-table.component.js.map