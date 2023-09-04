import { Component } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../../domain/definition';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { SortOrder } from './sort-order';
import * as i0 from "@angular/core";
function ReadComplexFieldCollectionTableComponent_th_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 6)(1, "span", 2);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 7);
    i0.ɵɵlistener("click", function ReadComplexFieldCollectionTableComponent_th_10_Template_a_click_4_listener() { const restoredCtx = i0.ɵɵrestoreView(_r4); const heading_r2 = restoredCtx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.sortRowsByColumns(heading_r2)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const heading_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, ctx_r0.columnsAllLabels[heading_r2].label));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("innerHTML", ctx_r0.sortWidget(ctx_r0.columnsAllLabels[heading_r2]), i0.ɵɵsanitizeHtml);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-field-read", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const heading_r9 = i0.ɵɵnextContext().$implicit;
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", ctx_r10.toCaseField(heading_r9, item_r5[heading_r9].label, ctx_r10.columnsHorizontalLabel[heading_r9].type, item_r5[heading_r9]))("context", ctx_r10.context);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_2_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "\u00A0");
    i0.ɵɵelementEnd();
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "td", 2);
    i0.ɵɵtemplate(2, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_2_div_2_Template, 2, 2, "div", 15);
    i0.ɵɵtemplate(3, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_2_ng_template_3_Template, 2, 0, "ng-template", null, 16, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const heading_r9 = ctx.$implicit;
    const _r11 = i0.ɵɵreference(4);
    const item_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", item_r5[heading_r9])("ngIfElse", _r11);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_1_td_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 2);
    i0.ɵɵelement(1, "ccd-field-read", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const vLabel_r16 = i0.ɵɵnextContext(2).$implicit;
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r19 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", ctx_r19.toCaseField("", vLabel_r16.label, vLabel_r16.field_type, item_r5[vLabel_r16.id]))("context", ctx_r19.context);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 20)(1, "th", 6)(2, "span", 2);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_1_td_5_Template, 2, 2, "td", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const vLabel_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("hidden", vLabel_r16.hidden);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 3, vLabel_r16.label));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", vLabel_r16["type"] !== "Complex");
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 25)(1, "td", 22)(2, "span", 2);
    i0.ɵɵelement(3, "ccd-field-read", 17);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const caseField_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r25 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("hidden", caseField_r24);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("caseField", caseField_r24)("context", ctx_r25.context);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_ng_template_3_td_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "span", 2);
    i0.ɵɵelement(2, "ccd-field-read", 17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const caseField_r24 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r29 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("caseField", caseField_r24)("context", ctx_r29.context);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_ng_template_3_td_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵelement(1, "ccd-read-case-link-field", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const caseField_r24 = i0.ɵɵnextContext(2).$implicit;
    const vLabel_r16 = i0.ɵɵnextContext(2).$implicit;
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r30 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", ctx_r30.addCaseReferenceValue(caseField_r24, item_r5[vLabel_r16.id].CaseReference))("context", ctx_r30.context);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 26)(1, "th", 6)(2, "span", 2);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_ng_template_3_td_5_Template, 3, 2, "td", 27);
    i0.ɵɵtemplate(6, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_ng_template_3_td_6_Template, 2, 2, "td", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const caseField_r24 = i0.ɵɵnextContext().$implicit;
    const vLabel_r16 = i0.ɵɵnextContext(2).$implicit;
    const item_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("hidden", caseField_r24.hidden);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 4, caseField_r24.label));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !(item_r5[vLabel_r16.id] == null ? null : item_r5[vLabel_r16.id].hasOwnProperty("CaseReference")));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r5[vLabel_r16.id] == null ? null : item_r5[vLabel_r16.id].hasOwnProperty("CaseReference"));
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_tr_1_Template, 4, 3, "tr", 23);
    i0.ɵɵpipe(2, "ccdIsCompound");
    i0.ɵɵtemplate(3, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_ng_template_3_Template, 7, 6, "ng-template", null, 24, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const caseField_r24 = ctx.$implicit;
    const _r26 = i0.ɵɵreference(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 2, caseField_r24))("ngIfElse", _r26);
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 12)(1, "td", 22);
    i0.ɵɵtemplate(2, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_ng_container_2_Template, 5, 4, "ng-container", 5);
    i0.ɵɵpipe(3, "ccdReadFieldsFilter");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const vLabel_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("hidden", vLabel_r16.hidden);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind4(3, 2, vLabel_r16, true, undefined, true));
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_1_Template, 6, 5, "tr", 18);
    i0.ɵɵtemplate(2, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_tr_2_Template, 4, 7, "tr", 19);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const vLabel_r16 = ctx.$implicit;
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r5[vLabel_r16.id]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", vLabel_r16["type"] === "Complex" && ctx_r8.addCaseFieldValue(vLabel_r16, item_r5[vLabel_r16.id]));
} }
function ReadComplexFieldCollectionTableComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 8);
    i0.ɵɵlistener("click", function ReadComplexFieldCollectionTableComponent_ng_container_12_Template_tr_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r41); const i_r6 = restoredCtx.index; const ctx_r40 = i0.ɵɵnextContext(); return i0.ɵɵresetView((ctx_r40.isHidden[i_r6] = !ctx_r40.isHidden[i_r6])); });
    i0.ɵɵtemplate(2, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_2_Template, 5, 2, "ng-container", 5);
    i0.ɵɵelementStart(3, "td")(4, "div", 9)(5, "a", 10);
    i0.ɵɵelement(6, "img", 11);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(7, "tr", 12)(8, "td", 13)(9, "table", 14)(10, "tbody");
    i0.ɵɵtemplate(11, ReadComplexFieldCollectionTableComponent_ng_container_12_ng_container_11_Template, 3, 2, "ng-container", 5);
    i0.ɵɵpipe(12, "ccdReadFieldsFilter");
    i0.ɵɵpipe(13, "ccdCollectionTableCaseFieldsFilter");
    i0.ɵɵpipe(14, "keyvalue");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const i_r6 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("last-accordion", ctx_r1.isHidden[i_r6]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.columns);
    i0.ɵɵadvance(4);
    i0.ɵɵpropertyInterpolate("src", ctx_r1.getImage(i_r6), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("hidden", ctx_r1.isHidden[i_r6]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("colSpan", ctx_r1.columns.length + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind4(12, 7, i0.ɵɵpipeBind3(13, 12, i0.ɵɵpipeBind2(14, 16, ctx_r1.columnsVerticalLabel, ctx_r1.keepOriginalOrder), ctx_r1.caseField, ctx_r1.rows[i_r6]), true, undefined, true));
} }
export class ReadComplexFieldCollectionTableComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        this.rows = [];
        this.isHidden = [];
        this.keepOriginalOrder = (a, b) => a.key;
    }
    static isSortAscending(column) {
        return !(column.sortOrder === SortOrder.UNSORTED || column.sortOrder === SortOrder.DESCENDING);
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.caseField.display_context_parameter
            && this.caseField.display_context_parameter.trim().startsWith('#TABLE(')) {
            const displayContextParameter = this.caseField.display_context_parameter.trim();
            const result = displayContextParameter.replace('#TABLE(', '');
            this.columns = result.replace(')', '').split(',').map((c) => c.trim());
            const labelsVertical = {};
            const labelsHorizontal = {};
            const allLabels = {};
            this.populateCaseFieldValuesIntoRows();
            this.populateLabels(labelsVertical, allLabels);
            this.populateHorizontalLabels(labelsHorizontal, allLabels, labelsVertical);
            this.columnsVerticalLabel = labelsVertical;
            this.columnsHorizontalLabel = labelsHorizontal;
            this.columnsAllLabels = allLabels;
        }
    }
    getImage(row) {
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
    }
    /**
     * Needs to be called before 'ccdFieldsFilter' pipe is used, as it needs a caseField value.
     */
    addCaseFieldValue(field, value) {
        field.value = value;
        return true;
    }
    isNotBlank(value) {
        return value !== null && value !== '';
    }
    addCaseReferenceValue(field, value) {
        field.value = { CaseReference: value };
        return field;
    }
    toCaseField(id, label, fieldType, value) {
        return plainToClassFromExist(new CaseField(), {
            id,
            label,
            display_context: 'READONLY',
            value,
            field_type: fieldType
        });
    }
    sortRowsByColumns(column) {
        const shouldSortInAscendingOrder = this.columnsHorizontalLabel[column].sortOrder === SortOrder.UNSORTED
            || this.columnsHorizontalLabel[column].sortOrder === SortOrder.DESCENDING;
        // tslint:disable-next-line:switch-default
        switch (this.columnsHorizontalLabel[column].type.type) {
            case 'Number':
            case 'MoneyGBP': {
                if (shouldSortInAscendingOrder) {
                    this.rows.sort((a, b) => a[column] - b[column]);
                    this.columnsHorizontalLabel[column].sortOrder = SortOrder.ASCENDING;
                }
                else {
                    this.rows.sort((a, b) => b[column] - a[column]);
                    this.columnsHorizontalLabel[column].sortOrder = SortOrder.DESCENDING;
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
                        this.rows.sort((a, b) => a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0);
                        this.columnsHorizontalLabel[column].sortOrder = SortOrder.ASCENDING;
                    }
                    else {
                        this.rows.sort((a, b) => a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0);
                        this.columnsHorizontalLabel[column].sortOrder = SortOrder.DESCENDING;
                    }
                }
                break;
        }
    }
    sortWidget(column) {
        return ReadComplexFieldCollectionTableComponent.isSortAscending(column) ? '&#9660;' : '&#9650;';
    }
    populateHorizontalLabels(labelsHorizontal, allLabels, labelsVertical) {
        for (const id of this.columns) {
            const trimmedId = id.trim();
            labelsHorizontal[trimmedId] = allLabels[trimmedId];
            labelsHorizontal[trimmedId].sortOrder = SortOrder.UNSORTED;
            delete labelsVertical[trimmedId];
        }
    }
    populateLabels(labelsVertical, allLabels) {
        for (const obj of this.caseField.field_type.complex_fields) {
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
    }
    populateCaseFieldValuesIntoRows() {
        for (const obj of this.caseField.value) {
            this.rows.push(obj.value);
            this.isHidden.push(true);
        }
    }
    isVerticleDataNotEmpty(row) {
        let result = false;
        for (const key in this.columnsVerticalLabel) {
            if (this.rows[row][key]) {
                result = true;
            }
        }
        return result;
    }
}
ReadComplexFieldCollectionTableComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadComplexFieldCollectionTableComponent_BaseFactory; return function ReadComplexFieldCollectionTableComponent_Factory(t) { return (ɵReadComplexFieldCollectionTableComponent_BaseFactory || (ɵReadComplexFieldCollectionTableComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadComplexFieldCollectionTableComponent)))(t || ReadComplexFieldCollectionTableComponent); }; }();
ReadComplexFieldCollectionTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadComplexFieldCollectionTableComponent, selectors: [["ccd-read-complex-field-collection-table"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 13, vars: 6, consts: [[1, "complex-panel", 3, "hidden"], [1, "complex-panel-title"], [1, "text-16"], ["aria-describedby", "complex panel table", 1, "complex-panel-table"], ["scope", "col", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["scope", "col"], ["href", "javascript:void(0)", 1, "sort-widget", 3, "innerHTML", "click"], [1, "new-table-row", "accordion-heading", 3, "click"], [2, "float", "right"], ["href", "javascript:void(0)"], ["alt", "image", 1, "accordion-image", 3, "src"], [3, "hidden"], [3, "colSpan"], ["aria-describedby", "complex panel table expanded", 1, "complex-panel-table"], [4, "ngIf", "ngIfElse"], ["showEmptyTd", ""], [3, "caseField", "context"], ["class", "complex-panel-simple-field accordion-body", 3, "hidden", 4, "ngIf"], [3, "hidden", 4, "ngIf"], [1, "complex-panel-simple-field", "accordion-body", 3, "hidden"], ["class", "text-16", 4, "ngIf"], ["colspan", "2"], ["class", "complex-panel-compound-field", 3, "hidden", 4, "ngIf", "ngIfElse"], ["SimpleRow", ""], [1, "complex-panel-compound-field", 3, "hidden"], [1, "complex-panel-nested-field", 3, "hidden"], [4, "ngIf"]], template: function ReadComplexFieldCollectionTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "dl", 1)(2, "dt")(3, "span", 2);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelement(6, "dd");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "table", 3)(8, "tbody")(9, "tr");
        i0.ɵɵtemplate(10, ReadComplexFieldCollectionTableComponent_th_10_Template, 5, 4, "th", 4);
        i0.ɵɵelement(11, "th");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(12, ReadComplexFieldCollectionTableComponent_ng_container_12_Template, 15, 19, "ng-container", 5);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵproperty("hidden", ctx.caseField.hidden);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, ctx.caseField.label));
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngForOf", ctx.columns);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.rows);
    } }, styles: [".complex-panel[_ngcontent-%COMP%]{margin:13px 0;border:1px solid #bfc1c3}.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{font-size:19px;line-height:1.3157894737}}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{vertical-align:top}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%]{border-bottom:none}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:5px;font-weight:700;border-bottom:none}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding-left:5px;padding-top:0;padding-bottom:0;border-bottom:none}.complex-panel[_ngcontent-%COMP%]   .new-table-row[_ngcontent-%COMP%]{border-top:1px solid #bfc1c3}.complex-panel[_ngcontent-%COMP%]   .complex-panel-simple-field[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:5px;padding-top:0;padding-bottom:0;width:295px}.complex-panel[_ngcontent-%COMP%]   .complex-panel-nested-field[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:33px;padding-top:0;padding-bottom:0;width:200px}.complex-panel[_ngcontent-%COMP%]   .complex-panel-compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:5px;border-bottom:none}.sort-widget[_ngcontent-%COMP%]{cursor:pointer;text-decoration:none;color:#0b0c0c}.accordion-wrapper[_ngcontent-%COMP%]{margin-bottom:20px}.accordion-wrapper[_ngcontent-%COMP%]   .heading-medium[_ngcontent-%COMP%]{margin:0}.accordion-wrapper[_ngcontent-%COMP%]   .accordion-heading[_ngcontent-%COMP%]{border-top:1px solid #bfc1c3;padding-top:20px;padding-bottom:10px;height:20px;cursor:pointer}.accordion-wrapper[_ngcontent-%COMP%]   .accordion-heading[_ngcontent-%COMP%]   .accordion-image[_ngcontent-%COMP%]{width:25px;margin-right:20px}.accordion-wrapper[_ngcontent-%COMP%]   .accordion-body[_ngcontent-%COMP%]{margin-top:20px;margin-right:20px}.accordion-wrapper[_ngcontent-%COMP%]   .last-accordion[_ngcontent-%COMP%]{border-bottom:1px solid #bfc1c3;padding-bottom:30px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadComplexFieldCollectionTableComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-complex-field-collection-table', template: "<div class=\"complex-panel\" [hidden]=\"caseField.hidden\">\n  <dl class=\"complex-panel-title\">\n    <dt><span class=\"text-16\">{{caseField.label | rpxTranslate}}</span></dt>\n    <dd></dd>\n  </dl>\n  <table class=\"complex-panel-table\" aria-describedby=\"complex panel table\">\n    <tbody>\n    <!-- <COMPLEX table field header>-->\n    <tr>\n      <th *ngFor=\"let heading of columns\" scope=\"col\">\n        <span class=\"text-16\">{{columnsAllLabels[heading].label | rpxTranslate}}</span>\n        <a href=\"javascript:void(0)\"\n           (click)=\"sortRowsByColumns(heading)\"\n           class=\"sort-widget\"\n           [innerHTML]=\"sortWidget(columnsAllLabels[heading])\"></a>\n      </th>\n      <th></th>\n    </tr>\n    <!-- </COMPLEX table field header>-->\n    <ng-container *ngFor=\"let item of rows; let i = index;\">\n      <!-- <COMPLEX table collapsed view>-->\n      <tr class=\"new-table-row accordion-heading\" (click)=\"isHidden[i] = !isHidden[i]\"\n          [class.last-accordion]=\"isHidden[i]\">\n        <ng-container *ngFor=\"let heading of columns\">\n          <td class=\"text-16\">\n            <div *ngIf=\"item[heading]; else showEmptyTd\">\n              <ccd-field-read\n                [caseField]=\"toCaseField(heading, item[heading].label, columnsHorizontalLabel[heading].type, item[heading])\"\n                [context]=\"context\"></ccd-field-read>\n            </div>\n            <ng-template #showEmptyTd>\n              <div>&nbsp;</div>\n            </ng-template>\n          </td>\n        </ng-container>\n        <td>\n          <div style=\"float: right;\">\n            <a href=\"javascript:void(0)\"> <img src=\"{{ getImage(i) }}\" alt=\"image\" class=\"accordion-image\"/></a>\n          </div>\n        </td>\n      </tr>\n      <!-- </COMPLEX table collapsed view>-->\n      <!-- <COMPLEX table expanded view>-->\n      <tr [hidden]=\"isHidden[i]\">\n        <td [colSpan]=\"columns.length + 1\">\n          <table class=\"complex-panel-table\" aria-describedby=\"complex panel table expanded\">\n            <tbody>\n            <ng-container\n              *ngFor=\"let vLabel of columnsVerticalLabel | keyvalue: keepOriginalOrder | ccdCollectionTableCaseFieldsFilter: caseField: rows[i] | ccdReadFieldsFilter:true :undefined :true\">\n              <!-- <COMPLEX table expandable body simple field>-->\n              <tr class=\"complex-panel-simple-field accordion-body\" *ngIf=\"item[vLabel.id]\" [hidden]=\"vLabel.hidden\">\n                <th scope=\"col\"><span class=\"text-16\">{{vLabel.label | rpxTranslate}}</span></th>\n                <td *ngIf=\"vLabel['type'] !== 'Complex'\" class=\"text-16\">\n                  <ccd-field-read [caseField]=\"toCaseField('', vLabel.label, vLabel.field_type, item[vLabel.id])\"\n                                  [context]=\"context\"></ccd-field-read>\n                </td>\n              </tr>\n              <!-- </COMPLEX table expandable body simple field>-->\n\n              <!-- <COMPLEX table expandable body complex field>-->\n              <tr *ngIf=\"vLabel['type'] === 'Complex' && addCaseFieldValue(vLabel, item[vLabel.id])\" [hidden]=\"vLabel.hidden\">\n                <td colspan=\"2\">\n                  <ng-container *ngFor=\"let caseField of vLabel | ccdReadFieldsFilter:true :undefined :true\">\n                      <tr class=\"complex-panel-compound-field\" *ngIf=\"(caseField | ccdIsCompound); else SimpleRow\" [hidden]=\"caseField\">\n                        <td colspan=\"2\">\n                          <span class=\"text-16\"><ccd-field-read [caseField]=\"caseField\" [context]=\"context\"></ccd-field-read></span>\n                        </td>\n                      </tr>\n                      <ng-template #SimpleRow>\n                        <tr class=\"complex-panel-nested-field\" [hidden]=\"caseField.hidden\">\n                          <th scope=\"col\"><span class=\"text-16\">{{caseField.label | rpxTranslate}}</span></th>\n                          <td *ngIf=\"!item[vLabel.id]?.hasOwnProperty('CaseReference')\">\n                            <span class=\"text-16\"><ccd-field-read [caseField]=\"caseField\" [context]=\"context\"></ccd-field-read></span>\n                          </td>\n                          <td *ngIf=\"item[vLabel.id]?.hasOwnProperty('CaseReference')\">\n                            <ccd-read-case-link-field [caseField]=\"addCaseReferenceValue(caseField, item[vLabel.id].CaseReference)\" [context]=\"context\"></ccd-read-case-link-field>\n                          </td>\n                        </tr>\n                      </ng-template>\n                  </ng-container>\n                </td>\n              </tr>\n              <!-- <COMPLEX table expandable body complex field>-->\n            </ng-container>\n            </tbody>\n          </table>\n        </td>\n      </tr>\n      <!-- </COMPLEX table expanded view>-->\n    </ng-container>\n    </tbody>\n  </table>\n</div>\n", styles: [".complex-panel{margin:13px 0;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.3157894737}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th{border-bottom:none}.complex-panel .complex-panel-table th{padding-left:5px;font-weight:700;border-bottom:none}.complex-panel .complex-panel-table td{padding-left:5px;padding-top:0;padding-bottom:0;border-bottom:none}.complex-panel .new-table-row{border-top:1px solid #bfc1c3}.complex-panel .complex-panel-simple-field th{padding-left:5px;padding-top:0;padding-bottom:0;width:295px}.complex-panel .complex-panel-nested-field th{padding-left:33px;padding-top:0;padding-bottom:0;width:200px}.complex-panel .complex-panel-compound-field td{padding:5px;border-bottom:none}.sort-widget{cursor:pointer;text-decoration:none;color:#0b0c0c}.accordion-wrapper{margin-bottom:20px}.accordion-wrapper .heading-medium{margin:0}.accordion-wrapper .accordion-heading{border-top:1px solid #bfc1c3;padding-top:20px;padding-bottom:10px;height:20px;cursor:pointer}.accordion-wrapper .accordion-heading .accordion-image{width:25px;margin-right:20px}.accordion-wrapper .accordion-body{margin-top:20px;margin-right:20px}.accordion-wrapper .last-accordion{border-bottom:1px solid #bfc1c3;padding-bottom:30px}\n"] }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1jb21wbGV4LWZpZWxkLWNvbGxlY3Rpb24tdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY29tcGxleC9yZWFkLWNvbXBsZXgtZmllbGQtY29sbGVjdGlvbi10YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jb21wbGV4L3JlYWQtY29tcGxleC1maWVsZC1jb2xsZWN0aW9uLXRhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztJQ0tuQyw2QkFBZ0QsY0FBQTtJQUN4QixZQUFrRDs7SUFBQSxpQkFBTztJQUMvRSw0QkFHdUQ7SUFGcEQsOE9BQVMsZUFBQSxvQ0FBMEIsQ0FBQSxJQUFDO0lBRWdCLGlCQUFJLEVBQUE7Ozs7SUFKckMsZUFBa0Q7SUFBbEQscUZBQWtEO0lBSXJFLGVBQW1EO0lBQW5ELHFHQUFtRDs7O0lBV2xELDJCQUE2QztJQUMzQyxxQ0FFdUM7SUFDekMsaUJBQU07Ozs7O0lBRkYsZUFBNEc7SUFBNUcsNEpBQTRHLDRCQUFBOzs7SUFJOUcsMkJBQUs7SUFBQSxzQkFBTTtJQUFBLGlCQUFNOzs7SUFSdkIs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TUs7UUFDTCxzQkFBUztRQUNYLGlCQUFLO1FBRUwsK0dBc0VlO1FBQ2YsaUJBQVEsRUFBQSxFQUFBOztRQTFGZSw2Q0FBMkI7UUFFeEIsZUFBa0M7UUFBbEMsK0RBQWtDO1FBT2xDLGVBQVU7UUFBVixxQ0FBVTtRQVVMLGVBQVM7UUFBVCxrQ0FBUzs7dUZEUi9CLHdDQUF3QztjQUxwRCxTQUFTOzJCQUNFLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3NGcm9tRXhpc3QgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU29ydE9yZGVyIH0gZnJvbSAnLi9zb3J0LW9yZGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXJlYWQtY29tcGxleC1maWVsZC1jb2xsZWN0aW9uLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtY29tcGxleC1maWVsZC1jb2xsZWN0aW9uLXRhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZWFkLWNvbXBsZXgtZmllbGQtY29sbGVjdGlvbi10YWJsZS5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVhZENvbXBsZXhGaWVsZENvbGxlY3Rpb25UYWJsZUNvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGNvbHVtbnM6IHN0cmluZ1tdO1xuICBwdWJsaWMgY29sdW1uc1ZlcnRpY2FsTGFiZWw6IGFueTtcbiAgcHVibGljIGNvbHVtbnNIb3Jpem9udGFsTGFiZWw6IGFueTtcbiAgcHVibGljIGNvbHVtbnNBbGxMYWJlbHM6IGFueTtcbiAgcHVibGljIHJvd3M6IGFueVtdID0gW107XG4gIHB1YmxpYyBpc0hpZGRlbjogYm9vbGVhbltdID0gW107XG4gIHByaXZhdGUgc3RhdGljIGlzU29ydEFzY2VuZGluZyhjb2x1bW46IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKGNvbHVtbi5zb3J0T3JkZXIgPT09IFNvcnRPcmRlci5VTlNPUlRFRCB8fCBjb2x1bW4uc29ydE9yZGVyID09PSBTb3J0T3JkZXIuREVTQ0VORElORyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICBpZiAodGhpcy5jYXNlRmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlclxuICAgICAgJiYgdGhpcy5jYXNlRmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlci50cmltKCkuc3RhcnRzV2l0aCgnI1RBQkxFKCcpKSB7XG5cbiAgICAgIGNvbnN0IGRpc3BsYXlDb250ZXh0UGFyYW1ldGVyID0gdGhpcy5jYXNlRmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlci50cmltKCk7XG4gICAgICBjb25zdCByZXN1bHQ6IHN0cmluZyA9IGRpc3BsYXlDb250ZXh0UGFyYW1ldGVyLnJlcGxhY2UoJyNUQUJMRSgnLCAnJyk7XG4gICAgICB0aGlzLmNvbHVtbnMgPSByZXN1bHQucmVwbGFjZSgnKScsICcnKS5zcGxpdCgnLCcpLm1hcCgoYzogc3RyaW5nKSA9PiBjLnRyaW0oKSk7XG5cbiAgICAgIGNvbnN0IGxhYmVsc1ZlcnRpY2FsOiB7IFtrOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgY29uc3QgbGFiZWxzSG9yaXpvbnRhbDogeyBbazogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAgIGNvbnN0IGFsbExhYmVsczogeyBbazogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAgIHRoaXMucG9wdWxhdGVDYXNlRmllbGRWYWx1ZXNJbnRvUm93cygpO1xuICAgICAgdGhpcy5wb3B1bGF0ZUxhYmVscyhsYWJlbHNWZXJ0aWNhbCwgYWxsTGFiZWxzKTtcbiAgICAgIHRoaXMucG9wdWxhdGVIb3Jpem9udGFsTGFiZWxzKGxhYmVsc0hvcml6b250YWwsIGFsbExhYmVscywgbGFiZWxzVmVydGljYWwpO1xuXG4gICAgICB0aGlzLmNvbHVtbnNWZXJ0aWNhbExhYmVsID0gbGFiZWxzVmVydGljYWw7XG4gICAgICB0aGlzLmNvbHVtbnNIb3Jpem9udGFsTGFiZWwgPSBsYWJlbHNIb3Jpem9udGFsO1xuICAgICAgdGhpcy5jb2x1bW5zQWxsTGFiZWxzID0gYWxsTGFiZWxzO1xuXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEltYWdlKHJvdyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNIaWRkZW5bcm93XSkge1xuICAgICAgcmV0dXJuICdpbWcvYWNjb3JkaW9uLXBsdXMucG5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNsZURhdGFOb3RFbXB0eShyb3cpKSB7XG4gICAgICAgIHJldHVybiAnaW1nL2FjY29yZGlvbi1taW51cy5wbmcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0hpZGRlbltyb3ddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICdpbWcvYWNjb3JkaW9uLXBsdXMucG5nJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTmVlZHMgdG8gYmUgY2FsbGVkIGJlZm9yZSAnY2NkRmllbGRzRmlsdGVyJyBwaXBlIGlzIHVzZWQsIGFzIGl0IG5lZWRzIGEgY2FzZUZpZWxkIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGFkZENhc2VGaWVsZFZhbHVlKGZpZWxkLCB2YWx1ZSk6IGJvb2xlYW4ge1xuICAgIGZpZWxkLnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgaXNOb3RCbGFuayh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSAnJztcbiAgfVxuXG4gIHB1YmxpYyBhZGRDYXNlUmVmZXJlbmNlVmFsdWUoZmllbGQsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGZpZWxkLnZhbHVlID0geyBDYXNlUmVmZXJlbmNlOiB2YWx1ZX07XG4gICAgcmV0dXJuIGZpZWxkO1xuICB9XG5cbiAgcHVibGljIHRvQ2FzZUZpZWxkKGlkOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGZpZWxkVHlwZTogYW55LCB2YWx1ZTogYW55KTogQ2FzZUZpZWxkIHtcbiAgICByZXR1cm4gcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KG5ldyBDYXNlRmllbGQoKSwge1xuICAgICAgaWQsXG4gICAgICBsYWJlbCxcbiAgICAgIGRpc3BsYXlfY29udGV4dDogJ1JFQURPTkxZJyxcbiAgICAgIHZhbHVlLFxuICAgICAgZmllbGRfdHlwZTogZmllbGRUeXBlXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMga2VlcE9yaWdpbmFsT3JkZXIgPSAoYSwgYikgPT4gYS5rZXk7XG5cbiAgcHVibGljIHNvcnRSb3dzQnlDb2x1bW5zKGNvbHVtbik6IHZvaWQge1xuICAgIGNvbnN0IHNob3VsZFNvcnRJbkFzY2VuZGluZ09yZGVyID0gdGhpcy5jb2x1bW5zSG9yaXpvbnRhbExhYmVsW2NvbHVtbl0uc29ydE9yZGVyID09PSBTb3J0T3JkZXIuVU5TT1JURURcbiAgICAgIHx8IHRoaXMuY29sdW1uc0hvcml6b250YWxMYWJlbFtjb2x1bW5dLnNvcnRPcmRlciA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkc7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c3dpdGNoLWRlZmF1bHRcbiAgICBzd2l0Y2ggKHRoaXMuY29sdW1uc0hvcml6b250YWxMYWJlbFtjb2x1bW5dLnR5cGUudHlwZSkge1xuICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgIGNhc2UgJ01vbmV5R0JQJzoge1xuICAgICAgICBpZiAoc2hvdWxkU29ydEluQXNjZW5kaW5nT3JkZXIpIHtcbiAgICAgICAgICB0aGlzLnJvd3Muc29ydCgoYSwgYikgPT4gYVtjb2x1bW5dIC0gYltjb2x1bW5dKTtcbiAgICAgICAgICB0aGlzLmNvbHVtbnNIb3Jpem9udGFsTGFiZWxbY29sdW1uXS5zb3J0T3JkZXIgPSBTb3J0T3JkZXIuQVNDRU5ESU5HO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucm93cy5zb3J0KChhLCBiKSA9PiBiW2NvbHVtbl0gLSBhW2NvbHVtbl0pO1xuICAgICAgICAgIHRoaXMuY29sdW1uc0hvcml6b250YWxMYWJlbFtjb2x1bW5dLnNvcnRPcmRlciA9IFNvcnRPcmRlci5ERVNDRU5ESU5HO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnVGV4dCc6XG4gICAgICBjYXNlICdUZXh0QXJlYSc6XG4gICAgICBjYXNlICdFbWFpbCc6XG4gICAgICBjYXNlICdEYXRlJzpcbiAgICAgIGNhc2UgJ0RhdGVUaW1lJzpcbiAgICAgIGNhc2UgJ0xhYmVsJzpcbiAgICAgIGNhc2UgJ1Bvc3Rjb2RlJzpcbiAgICAgIGNhc2UgJ1llc09yTm8nOlxuICAgICAgY2FzZSAnUGhvbmVVSyc6XG4gICAgICBjYXNlICdGaXhlZExpc3QnOiB7XG4gICAgICAgIGlmIChzaG91bGRTb3J0SW5Bc2NlbmRpbmdPcmRlcikge1xuICAgICAgICAgIHRoaXMucm93cy5zb3J0KChhLCBiKSA9PiBhW2NvbHVtbl0gPCBiW2NvbHVtbl0gPyAtMSA6IGFbY29sdW1uXSA+IGJbY29sdW1uXSA/IDEgOiAwKTtcbiAgICAgICAgICB0aGlzLmNvbHVtbnNIb3Jpem9udGFsTGFiZWxbY29sdW1uXS5zb3J0T3JkZXIgPSBTb3J0T3JkZXIuQVNDRU5ESU5HO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucm93cy5zb3J0KChhLCBiKSA9PiBhW2NvbHVtbl0gPCBiW2NvbHVtbl0gPyAxIDogYVtjb2x1bW5dID4gYltjb2x1bW5dID8gLTEgOiAwKTtcbiAgICAgICAgICB0aGlzLmNvbHVtbnNIb3Jpem9udGFsTGFiZWxbY29sdW1uXS5zb3J0T3JkZXIgPSBTb3J0T3JkZXIuREVTQ0VORElORztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc29ydFdpZGdldChjb2x1bW46IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJlYWRDb21wbGV4RmllbGRDb2xsZWN0aW9uVGFibGVDb21wb25lbnQuaXNTb3J0QXNjZW5kaW5nKGNvbHVtbikgPyAnJiM5NjYwOycgOiAnJiM5NjUwOyc7XG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlSG9yaXpvbnRhbExhYmVscyhsYWJlbHNIb3Jpem9udGFsOiB7IFtwOiBzdHJpbmddOiBhbnkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsTGFiZWxzOiB7IFtwOiBzdHJpbmddOiBhbnkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzVmVydGljYWw6IHsgW3A6IHN0cmluZ106IGFueSB9KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpZCBvZiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgIGNvbnN0IHRyaW1tZWRJZCA9IGlkLnRyaW0oKTtcbiAgICAgIGxhYmVsc0hvcml6b250YWxbdHJpbW1lZElkXSA9IGFsbExhYmVsc1t0cmltbWVkSWRdO1xuICAgICAgbGFiZWxzSG9yaXpvbnRhbFt0cmltbWVkSWRdLnNvcnRPcmRlciA9IFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgICAgIGRlbGV0ZSBsYWJlbHNWZXJ0aWNhbFt0cmltbWVkSWRdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcG9wdWxhdGVMYWJlbHMobGFiZWxzVmVydGljYWw6IHsgW3A6IHN0cmluZ106IGFueSB9LCBhbGxMYWJlbHM6IHsgW3A6IHN0cmluZ106IGFueSB9KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgaWYgKG9iai5maWVsZF90eXBlLnR5cGUgPT09ICdGaXhlZExpc3QnIHx8XG4gICAgICAgIG9iai5maWVsZF90eXBlLnR5cGUgPT09ICdNdWx0aVNlbGVjdExpc3QnIHx8XG4gICAgICAgIG9iai5maWVsZF90eXBlLnR5cGUgPT09ICdGaXhlZFJhZGlvTGlzdCcpIHtcbiAgICAgICAgbGFiZWxzVmVydGljYWxbb2JqLmlkXSA9IHtsYWJlbDogb2JqLmxhYmVsLCB0eXBlOiBvYmouZmllbGRfdHlwZSwgY2FzZUZpZWxkOiBvYmp9O1xuICAgICAgICBhbGxMYWJlbHNbb2JqLmlkXSA9IHtsYWJlbDogb2JqLmxhYmVsLCB0eXBlOiBvYmouZmllbGRfdHlwZX07XG4gICAgICB9IGVsc2UgaWYgKG9iai5pc0NvbXBsZXgoKSkge1xuICAgICAgICBsYWJlbHNWZXJ0aWNhbFtvYmouaWRdID0ge2xhYmVsOiBvYmoubGFiZWwsIHR5cGU6IG9iai5maWVsZF90eXBlLnR5cGUsIGNhc2VGaWVsZDogb2JqfTtcbiAgICAgICAgYWxsTGFiZWxzW29iai5pZF0gPSB7bGFiZWw6IG9iai5sYWJlbCwgdHlwZTogb2JqLmZpZWxkX3R5cGUudHlwZSwgY2FzZUZpZWxkOiBvYmp9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFiZWxzVmVydGljYWxbb2JqLmlkXSA9IHtsYWJlbDogb2JqLmxhYmVsLCB0eXBlOiB7dHlwZTogb2JqLmZpZWxkX3R5cGUudHlwZX0sIGNhc2VGaWVsZDogb2JqfTtcbiAgICAgICAgYWxsTGFiZWxzW29iai5pZF0gPSB7bGFiZWw6IG9iai5sYWJlbCwgdHlwZToge3R5cGU6IG9iai5maWVsZF90eXBlLnR5cGV9LCBjYXNlRmllbGQ6IG9ian07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZUNhc2VGaWVsZFZhbHVlc0ludG9Sb3dzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMuY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICB0aGlzLnJvd3MucHVzaChvYmoudmFsdWUpO1xuICAgICAgdGhpcy5pc0hpZGRlbi5wdXNoKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNWZXJ0aWNsZURhdGFOb3RFbXB0eShyb3cpOiBib29sZWFuIHtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb2x1bW5zVmVydGljYWxMYWJlbCkge1xuICAgICAgaWYgKHRoaXMucm93c1tyb3ddW2tleV0pIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbXBsZXgtcGFuZWxcIiBbaGlkZGVuXT1cImNhc2VGaWVsZC5oaWRkZW5cIj5cbiAgPGRsIGNsYXNzPVwiY29tcGxleC1wYW5lbC10aXRsZVwiPlxuICAgIDxkdD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2Nhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvZHQ+XG4gICAgPGRkPjwvZGQ+XG4gIDwvZGw+XG4gIDx0YWJsZSBjbGFzcz1cImNvbXBsZXgtcGFuZWwtdGFibGVcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY29tcGxleCBwYW5lbCB0YWJsZVwiPlxuICAgIDx0Ym9keT5cbiAgICA8IS0tIDxDT01QTEVYIHRhYmxlIGZpZWxkIGhlYWRlcj4tLT5cbiAgICA8dHI+XG4gICAgICA8dGggKm5nRm9yPVwibGV0IGhlYWRpbmcgb2YgY29sdW1uc1wiIHNjb3BlPVwiY29sXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7Y29sdW1uc0FsbExhYmVsc1toZWFkaW5nXS5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICAgICAgKGNsaWNrKT1cInNvcnRSb3dzQnlDb2x1bW5zKGhlYWRpbmcpXCJcbiAgICAgICAgICAgY2xhc3M9XCJzb3J0LXdpZGdldFwiXG4gICAgICAgICAgIFtpbm5lckhUTUxdPVwic29ydFdpZGdldChjb2x1bW5zQWxsTGFiZWxzW2hlYWRpbmddKVwiPjwvYT5cbiAgICAgIDwvdGg+XG4gICAgICA8dGg+PC90aD5cbiAgICA8L3RyPlxuICAgIDwhLS0gPC9DT01QTEVYIHRhYmxlIGZpZWxkIGhlYWRlcj4tLT5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvd3M7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICA8IS0tIDxDT01QTEVYIHRhYmxlIGNvbGxhcHNlZCB2aWV3Pi0tPlxuICAgICAgPHRyIGNsYXNzPVwibmV3LXRhYmxlLXJvdyBhY2NvcmRpb24taGVhZGluZ1wiIChjbGljayk9XCJpc0hpZGRlbltpXSA9ICFpc0hpZGRlbltpXVwiXG4gICAgICAgICAgW2NsYXNzLmxhc3QtYWNjb3JkaW9uXT1cImlzSGlkZGVuW2ldXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGhlYWRpbmcgb2YgY29sdW1uc1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQtMTZcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtW2hlYWRpbmddOyBlbHNlIHNob3dFbXB0eVRkXCI+XG4gICAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZFxuICAgICAgICAgICAgICAgIFtjYXNlRmllbGRdPVwidG9DYXNlRmllbGQoaGVhZGluZywgaXRlbVtoZWFkaW5nXS5sYWJlbCwgY29sdW1uc0hvcml6b250YWxMYWJlbFtoZWFkaW5nXS50eXBlLCBpdGVtW2hlYWRpbmddKVwiXG4gICAgICAgICAgICAgICAgW2NvbnRleHRdPVwiY29udGV4dFwiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjc2hvd0VtcHR5VGQ+XG4gICAgICAgICAgICAgIDxkaXY+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodDtcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj4gPGltZyBzcmM9XCJ7eyBnZXRJbWFnZShpKSB9fVwiIGFsdD1cImltYWdlXCIgY2xhc3M9XCJhY2NvcmRpb24taW1hZ2VcIi8+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDwhLS0gPC9DT01QTEVYIHRhYmxlIGNvbGxhcHNlZCB2aWV3Pi0tPlxuICAgICAgPCEtLSA8Q09NUExFWCB0YWJsZSBleHBhbmRlZCB2aWV3Pi0tPlxuICAgICAgPHRyIFtoaWRkZW5dPVwiaXNIaWRkZW5baV1cIj5cbiAgICAgICAgPHRkIFtjb2xTcGFuXT1cImNvbHVtbnMubGVuZ3RoICsgMVwiPlxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImNvbXBsZXgtcGFuZWwtdGFibGVcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY29tcGxleCBwYW5lbCB0YWJsZSBleHBhbmRlZFwiPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgdkxhYmVsIG9mIGNvbHVtbnNWZXJ0aWNhbExhYmVsIHwga2V5dmFsdWU6IGtlZXBPcmlnaW5hbE9yZGVyIHwgY2NkQ29sbGVjdGlvblRhYmxlQ2FzZUZpZWxkc0ZpbHRlcjogY2FzZUZpZWxkOiByb3dzW2ldIHwgY2NkUmVhZEZpZWxkc0ZpbHRlcjp0cnVlIDp1bmRlZmluZWQgOnRydWVcIj5cbiAgICAgICAgICAgICAgPCEtLSA8Q09NUExFWCB0YWJsZSBleHBhbmRhYmxlIGJvZHkgc2ltcGxlIGZpZWxkPi0tPlxuICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJjb21wbGV4LXBhbmVsLXNpbXBsZS1maWVsZCBhY2NvcmRpb24tYm9keVwiICpuZ0lmPVwiaXRlbVt2TGFiZWwuaWRdXCIgW2hpZGRlbl09XCJ2TGFiZWwuaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3t2TGFiZWwubGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj48L3RoPlxuICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cInZMYWJlbFsndHlwZSddICE9PSAnQ29tcGxleCdcIiBjbGFzcz1cInRleHQtMTZcIj5cbiAgICAgICAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZCBbY2FzZUZpZWxkXT1cInRvQ2FzZUZpZWxkKCcnLCB2TGFiZWwubGFiZWwsIHZMYWJlbC5maWVsZF90eXBlLCBpdGVtW3ZMYWJlbC5pZF0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY29udGV4dF09XCJjb250ZXh0XCI+PC9jY2QtZmllbGQtcmVhZD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8IS0tIDwvQ09NUExFWCB0YWJsZSBleHBhbmRhYmxlIGJvZHkgc2ltcGxlIGZpZWxkPi0tPlxuXG4gICAgICAgICAgICAgIDwhLS0gPENPTVBMRVggdGFibGUgZXhwYW5kYWJsZSBib2R5IGNvbXBsZXggZmllbGQ+LS0+XG4gICAgICAgICAgICAgIDx0ciAqbmdJZj1cInZMYWJlbFsndHlwZSddID09PSAnQ29tcGxleCcgJiYgYWRkQ2FzZUZpZWxkVmFsdWUodkxhYmVsLCBpdGVtW3ZMYWJlbC5pZF0pXCIgW2hpZGRlbl09XCJ2TGFiZWwuaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjYXNlRmllbGQgb2YgdkxhYmVsIHwgY2NkUmVhZEZpZWxkc0ZpbHRlcjp0cnVlIDp1bmRlZmluZWQgOnRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJjb21wbGV4LXBhbmVsLWNvbXBvdW5kLWZpZWxkXCIgKm5nSWY9XCIoY2FzZUZpZWxkIHwgY2NkSXNDb21wb3VuZCk7IGVsc2UgU2ltcGxlUm93XCIgW2hpZGRlbl09XCJjYXNlRmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtMTZcIj48Y2NkLWZpZWxkLXJlYWQgW2Nhc2VGaWVsZF09XCJjYXNlRmllbGRcIiBbY29udGV4dF09XCJjb250ZXh0XCI+PC9jY2QtZmllbGQtcmVhZD48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNTaW1wbGVSb3c+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJjb21wbGV4LXBhbmVsLW5lc3RlZC1maWVsZFwiIFtoaWRkZW5dPVwiY2FzZUZpZWxkLmhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2Nhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cIiFpdGVtW3ZMYWJlbC5pZF0/Lmhhc093blByb3BlcnR5KCdDYXNlUmVmZXJlbmNlJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtMTZcIj48Y2NkLWZpZWxkLXJlYWQgW2Nhc2VGaWVsZF09XCJjYXNlRmllbGRcIiBbY29udGV4dF09XCJjb250ZXh0XCI+PC9jY2QtZmllbGQtcmVhZD48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cIml0ZW1bdkxhYmVsLmlkXT8uaGFzT3duUHJvcGVydHkoJ0Nhc2VSZWZlcmVuY2UnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjY2QtcmVhZC1jYXNlLWxpbmstZmllbGQgW2Nhc2VGaWVsZF09XCJhZGRDYXNlUmVmZXJlbmNlVmFsdWUoY2FzZUZpZWxkLCBpdGVtW3ZMYWJlbC5pZF0uQ2FzZVJlZmVyZW5jZSlcIiBbY29udGV4dF09XCJjb250ZXh0XCI+PC9jY2QtcmVhZC1jYXNlLWxpbmstZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8IS0tIDxDT01QTEVYIHRhYmxlIGV4cGFuZGFibGUgYm9keSBjb21wbGV4IGZpZWxkPi0tPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPCEtLSA8L0NPTVBMRVggdGFibGUgZXhwYW5kZWQgdmlldz4tLT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuPC9kaXY+XG4iXX0=