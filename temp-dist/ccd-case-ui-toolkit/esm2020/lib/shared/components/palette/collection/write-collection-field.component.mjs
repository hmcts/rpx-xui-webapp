import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { plainToClassFromExist } from 'class-transformer';
import { finalize } from 'rxjs/operators';
import { FieldType } from '../../../domain/definition/field-type.model';
import { CaseField } from '../../../domain/definition/case-field.model';
import { FieldsUtils } from '../../../services/fields/fields.utils';
import { FormValidatorsService } from '../../../services/form/form-validators.service';
import { ProfileNotifier } from '../../../services/profile/profile.notifier';
import { RemoveDialogComponent } from '../../dialogs/remove-dialog/remove-dialog.component';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@nicky-lenaers/ngx-scroll-to";
import * as i3 from "../../../services/profile/profile.notifier";
const _c0 = ["collectionItem"];
function WriteCollectionFieldComponent_h2_9_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r3.caseField.hint_text));
} }
function WriteCollectionFieldComponent_h2_9_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r4.formArray.errors, ctx_r4.caseField.label)), " ");
} }
function WriteCollectionFieldComponent_h2_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 2);
    i0.ɵɵtemplate(1, WriteCollectionFieldComponent_h2_9_span_1_Template, 3, 3, "span", 7);
    i0.ɵɵtemplate(2, WriteCollectionFieldComponent_h2_9_span_2_Template, 4, 6, "span", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.caseField.hint_text);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.formArray.errors);
} }
function WriteCollectionFieldComponent_div_10_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13, 14)(2, "div", 15)(3, "div", 16)(4, "label", 17)(5, "h3", 18);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "rpxTranslate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 19)(9, "button", 20);
    i0.ɵɵlistener("click", function WriteCollectionFieldComponent_div_10_div_1_Template_button_click_9_listener() { const restoredCtx = i0.ɵɵrestoreView(_r10); const i_r7 = restoredCtx.index; const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.openModal(i_r7)); });
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "rpxTranslate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(12, "ccd-field-write", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("for", item_r6.prefix + i_r7);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 13, ctx_r5.itemLabel(i_r7)));
    i0.ɵɵadvance(3);
    i0.ɵɵattributeInterpolate1("aria-label", "Remove ", ctx_r5.itemLabel(i_r7), "");
    i0.ɵɵproperty("disabled", ctx_r5.isNotAuthorisedToDelete(i_r7));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 15, "Remove"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("caseField", item_r6.caseField)("caseFields", ctx_r5.caseFields)("formGroup", ctx_r5.formGroup)("parent", item_r6.container)("idPrefix", item_r6.prefix)("hidden", item_r6.caseField.hidden)("isExpanded", ctx_r5.isExpanded)("isInSearchBlock", ctx_r5.isInSearchBlock);
} }
function WriteCollectionFieldComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtemplate(1, WriteCollectionFieldComponent_div_10_div_1_Template, 13, 17, "div", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("hidden", ctx_r1.caseField.hidden);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.collItems);
} }
function WriteCollectionFieldComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function WriteCollectionFieldComponent_button_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.addItem(false)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r2.isNotAuthorisedToCreate() || ctx_r2.isSearchFilter());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "Add new"));
} }
export class WriteCollectionFieldComponent extends AbstractFieldWriteComponent {
    constructor(dialog, scrollToService, profileNotifier) {
        super();
        this.dialog = dialog;
        this.scrollToService = scrollToService;
        this.profileNotifier = profileNotifier;
        this.caseFields = [];
        this.collItems = [];
    }
    ngOnInit() {
        if (!this.isExpanded) { // meaning I am not rendered on the search/workbasket input filter
            this.profileSubscription = this.profileNotifier.profile.subscribe(_ => this.profile = _);
        }
        this.caseField.value = this.caseField.value || [];
        this.formArray = this.registerControl(new FormArray([]), true);
        this.formArray['caseField'] = this.caseField;
        this.caseField.value.forEach((item, index) => {
            const prefix = this.buildIdPrefix(index);
            const caseField = this.buildCaseField(item, index);
            const container = this.getContainer(index);
            if (this.collItems.length <= index) {
                this.collItems.length = index + 1;
            }
            this.collItems[index] = { caseField, item, prefix, index, container };
        });
    }
    ngOnDestroy() {
        if (this.profileSubscription) {
            this.profileSubscription.unsubscribe();
        }
    }
    buildCaseField(item, index, isNew = false) {
        /**
         * What follow is code that makes me want to go jump in the shower!
         * Basically, we land in here repeatedly because of the binding, and
         * this is what appears to be happening:
         *   1. this.formArray contains no controls at all.
         *      this.formArray.value = [];
         *   2. this.formArray contains a UntypedFormGroup, which contains a single
         *      FormControl with the id 'code'.
         *      this.formArray.value = [{ code: null }]
         *   3. this.formArray contains what is being set up below.
         *      this.formArray.value = [{ code: null, id: null, value: { code: null } }]
         *   4, 5, 6, etc - the same as 3.
         */
        let group;
        if (this.formArray && (index < this.formArray.length)) {
            group = this.formArray.at(index);
        }
        else {
            group = new UntypedFormGroup({});
        }
        let value;
        if (this.isCollectionOfSimpleType(this.caseField)) {
            value = group.get('value');
            if (!value) {
                value = new FormControl(item.value);
                // Now add the value FormControl to the outer group.
                group.addControl('value', value);
            }
        }
        else {
            value = group.get('value');
            if (!value) {
                value = new UntypedFormGroup({});
                for (const key of Object.keys(group.controls)) {
                    value.addControl(key, group.get(key));
                    // DON'T remove the control for this key from the outer group or it
                    // goes awry. So DON'T uncomment the below line!
                    // group.removeControl(key);
                }
                // Now add the value UntypedFormGroup to the outer group.
                group.addControl('value', value);
            }
        }
        let id = group.get('id');
        // If we're not in scenario 3, above, we need to do some jiggery pokery
        // and set up the id and value controls.
        // Also set up an id control if it doesn't yet exist.
        if (!id) {
            id = new FormControl(item.id);
            group.addControl('id', id);
        }
        /**
         * Again, very sorry. I've not found a better way to produce the
         * output needed for what needs to be sent to the server yet.
         */
        // Now, add the outer group to the array (or replace it).
        if (index < this.formArray.length) {
            this.formArray.setControl(index, group);
        }
        else {
            this.formArray.push(group);
        }
        // Now set up the CaseField and validation.
        let cfid;
        if (value instanceof FormControl) {
            cfid = 'value';
        }
        else {
            cfid = index.toString();
        }
        // isNew:
        const cf = this.newCaseField(cfid, item, index, isNew);
        FormValidatorsService.addValidators(cf, value);
        FieldsUtils.addCaseFieldAndComponentReferences(value, cf, this);
        return cf;
    }
    buildIdPrefix(index) {
        const prefix = `${this.idPrefix}${this.caseField.id}_`;
        if (this.caseField.field_type.collection_field_type.type === 'Complex') {
            return `${prefix}${index}_`;
        }
        return prefix;
    }
    isSearchFilter() {
        return this.isInSearchBlock && this.collItems.length > 0;
    }
    addItem(doScroll) {
        // Manually resetting errors is required to prevent `ExpressionChangedAfterItHasBeenCheckedError`
        this.formArray.setErrors(null);
        let item = { value: null };
        if (this.isCollectionDynamic()) {
            item = { ...this.caseField.value[this.caseField.value.length - 1] };
            const key = Number(item['id'][item['id'].length - 1]) + 1;
            item.id = item['id'].replace(/.$/, key.toString());
        }
        this.caseField.value.push(item);
        const index = this.caseField.value.length - 1;
        const caseField = this.buildCaseField(item, index, true);
        const prefix = this.buildIdPrefix(index);
        const container = this.getContainer(index);
        this.collItems.push({ caseField, item, index, prefix, container });
        // Timeout is required for the collection item to be rendered before it can be scrolled to or focused.
        if (doScroll) {
            setTimeout(() => {
                this.scrollToService.scrollTo({
                    target: `${this.buildIdPrefix(index)}${index}`,
                    duration: 1000,
                    offset: -150,
                })
                    .pipe(finalize(() => this.focusLastItem()))
                    .subscribe(() => { }, console.error);
            });
        }
        else {
            setTimeout(() => this.focusLastItem());
        }
    }
    isCollectionDynamic() {
        if (!this.caseField.field_type || !this.caseField.field_type.collection_field_type) {
            return false;
        }
        return this.caseField.field_type.collection_field_type.id === 'DynamicRadioList';
    }
    newCaseField(id, item, index, isNew = false) {
        const isNotAuthorisedToUpdate = !isNew && this.isNotAuthorisedToUpdate(index);
        const fieldType = plainToClassFromExist(new FieldType(), this.caseField.field_type.collection_field_type);
        if (fieldType.complex_fields) {
            fieldType.complex_fields
                .filter((cf) => !!cf.show_condition)
                .map((cf) => cf.hidden = true);
        }
        // Remove the bit setting the hidden flag here as it's an item in the array and
        // its hidden state isn't independently re-evaluated when the form is changed.
        return plainToClassFromExist(new CaseField(), {
            id,
            field_type: fieldType,
            display_context: isNotAuthorisedToUpdate ? 'READONLY' : this.caseField.display_context,
            value: item.value,
            label: null,
            acls: this.caseField.acls
        });
    }
    getContainer(index) {
        const value = this.formArray.at(index).get('value');
        if (value instanceof UntypedFormGroup) {
            return value;
        }
        else {
            return this.formArray.at(index);
        }
    }
    focusLastItem() {
        const item = this.items.last.nativeElement.querySelector('.form-control');
        if (item) {
            item.focus();
        }
    }
    removeItem(index) {
        this.collItems.splice(index, 1);
        this.resetIds(index);
        this.caseField.value.splice(index, 1);
        this.formArray.removeAt(index);
    }
    resetIds(index) {
        for (let i = index; i < this.collItems.length; i++) {
            const counter = i + 1;
            if (this.collItems[i].index && this.collItems[i].index === counter) {
                this.collItems[i].index = i;
            }
            if (this.collItems[i].caseField && this.collItems[i].caseField.id
                && this.collItems[i].caseField.id === counter.toString()) {
                this.collItems[i].caseField.id = i.toString();
            }
            const idPrefix1 = this.collItems[i].prefix ? this.collItems[i].prefix.replace(`_${counter.toString()}`, `_${i.toString()}`) : '';
            const idPrefix1Current = idPrefix1.replace(`_${i.toString()}`, `_${counter.toString()}`);
            if (this.collItems[i].prefix && this.collItems[i].prefix === idPrefix1Current) {
                this.collItems[i].prefix = idPrefix1;
            }
            const idPrefixAvailable = !!this.collItems[i].container?.['component']?.idPrefix;
            const idPrefix2 = idPrefixAvailable ?
                this.collItems[i].container['component'].idPrefix.replace(`_${counter.toString()}`, `_${i.toString()}`) : '';
            const idPrefix2current = idPrefix2.replace(`_${i.toString()}`, `_${counter.toString()}`);
            if (idPrefixAvailable && this.collItems[i].container['component'].idPrefix === idPrefix2current) {
                this.collItems[i].container['component'].idPrefix = idPrefix2;
            }
        }
    }
    itemLabel(index) {
        if (index) {
            return `${this.caseField.label} ${index + 1}`;
        }
        return this.caseField.label;
    }
    isNotAuthorisedToCreate() {
        if (this.isExpanded) {
            return false;
        }
        return !this.getCollectionPermission(this.caseField, 'allowInsert');
    }
    getCollectionPermission(field, type) {
        return field.display_context_parameter &&
            field.display_context_parameter.split('#')
                .filter(item => item.startsWith('COLLECTION('))[0]
                .includes(type);
    }
    isNotAuthorisedToUpdate(index) {
        if (this.isExpanded) {
            return false;
        }
        // Was reassesed as part of EUI-3505. There is still a caveat around CRD, but that was deemed an unlikely scenario
        const id = this.getControlIdAt(index);
        if (id) {
            if (!!this.profile.user && !!this.profile.user.idam) {
                const updateRole = this.profile.user.idam.roles.find(role => this.hasUpdateAccess(role));
                return !updateRole;
            }
        }
        return false;
    }
    hasUpdateAccess(role) {
        return !!this.caseField.acls.find(acl => acl.role === role && acl.update === true);
    }
    isNotAuthorisedToDelete(index) {
        if (this.isExpanded) {
            return false;
        }
        // Should be able to delete if creating a case even if "D" is absent, hence:
        const id = this.getControlIdAt(index);
        return !!id && !this.getCollectionPermission(this.caseField, 'allowDelete');
    }
    openModal(i) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.ariaLabel = 'Label';
        dialogConfig.height = '220px';
        dialogConfig.width = '550px';
        dialogConfig.panelClass = 'dialog';
        dialogConfig.closeOnNavigation = false;
        dialogConfig.position = {
            top: `${window.innerHeight / 2 - 110}px`, left: `${window.innerWidth / 2 - 275}px`
        };
        const dialogRef = this.dialog.open(RemoveDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Remove') {
                this.removeItem(i);
            }
        });
    }
    /**
     * Applied full solution as part of EUI-3505
     */
    getControlIdAt(index) {
        // this.formArray contains [ UntypedFormGroup( id: FormControl, value: UntypedFormGroup ), ... ].
        // Here, we need to get the value of the id FormControl.
        const group = this.formArray.at(index);
        const control = group.get('id');
        return control ? control.value : undefined;
    }
    isCollectionOfSimpleType(caseField) {
        const notSimple = ['Collection', 'Complex'];
        return notSimple.indexOf(caseField.field_type.collection_field_type.type) < 0;
    }
}
WriteCollectionFieldComponent.ɵfac = function WriteCollectionFieldComponent_Factory(t) { return new (t || WriteCollectionFieldComponent)(i0.ɵɵdirectiveInject(i1.MatDialog), i0.ɵɵdirectiveInject(i2.ScrollToService), i0.ɵɵdirectiveInject(i3.ProfileNotifier)); };
WriteCollectionFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteCollectionFieldComponent, selectors: [["ccd-write-collection-field"]], viewQuery: function WriteCollectionFieldComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.items = _t);
    } }, inputs: { caseFields: "caseFields", formGroup: "formGroup" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 12, vars: 13, consts: [[1, "form-group", 3, "id"], [1, "panel", "collection-indicator"], [1, "heading-h2", "error-spacing"], ["type", "button", 1, "button", "write-collection-add-item__top", 3, "disabled", "click"], ["class", "heading-h2 error-spacing", 4, "ngIf"], ["class", "form-group", 3, "hidden", 4, "ngIf"], ["class", "button write-collection-add-item__bottom", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "form-hint"], [1, "error-message"], [1, "form-group", 3, "hidden"], ["class", "form-group", 4, "ngFor", "ngForOf"], [1, "form-group"], ["collectionItem", ""], [1, "collection-title"], [1, "float-left"], [3, "for"], [1, "heading-h3"], [1, "float-right"], ["type", "button", 1, "button", "button-secondary", 3, "disabled", "click"], [3, "caseField", "caseFields", "formGroup", "parent", "idPrefix", "hidden", "isExpanded", "isInSearchBlock"], ["type", "button", 1, "button", "write-collection-add-item__bottom", 3, "disabled", "click"]], template: function WriteCollectionFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵpipe(5, "ccdFieldLabel");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "button", 3);
        i0.ɵɵlistener("click", function WriteCollectionFieldComponent_Template_button_click_6_listener() { return ctx.addItem(true); });
        i0.ɵɵtext(7);
        i0.ɵɵpipe(8, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, WriteCollectionFieldComponent_h2_9_Template, 3, 2, "h2", 4);
        i0.ɵɵtemplate(10, WriteCollectionFieldComponent_div_10_Template, 2, 2, "div", 5);
        i0.ɵɵtemplate(11, WriteCollectionFieldComponent_button_11_Template, 3, 4, "button", 6);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id());
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 7, i0.ɵɵpipeBind1(5, 9, ctx.caseField)), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("disabled", ctx.isNotAuthorisedToCreate() || ctx.isSearchFilter());
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 11, "Add new"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text || ctx.formArray.errors);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.value && ctx.caseField.value.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.value && ctx.caseField.value.length);
    } }, styles: [".collection-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:first-child > td[_ngcontent-%COMP%]{padding-top:0}.collection-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.collection-field-table[_ngcontent-%COMP%]   td.collection-actions[_ngcontent-%COMP%]{width:1px;white-space:nowrap}.error-spacing[_ngcontent-%COMP%]{margin-top:10px}.collection-title[_ngcontent-%COMP%]{height:51px}.float-left[_ngcontent-%COMP%]{float:left;padding-top:8px}.float-right[_ngcontent-%COMP%]{float:right}.complex-panel[_ngcontent-%COMP%]{margin:13px 0;border:1px solid #bfc1c3}.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{font-size:19px;line-height:1.3157894737}}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{vertical-align:top}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%], .complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.complex-panel[_ngcontent-%COMP%]   .complex-panel-simple-field[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:5px;width:295px}.complex-panel[_ngcontent-%COMP%]   .complex-panel-compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:5px}.collection-indicator[_ngcontent-%COMP%]{border-left:solid 5px #b1b4b6}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteCollectionFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-collection-field', template: "<div class=\"form-group\" [id]=\"id()\">\n\n  <div class=\"panel collection-indicator\">\n\n    <h2 class=\"heading-h2 error-spacing\">\n      {{(caseField | ccdFieldLabel) | rpxTranslate }}\n    </h2>\n    <button class=\"button write-collection-add-item__top\" type=\"button\" (click)=\"addItem(true)\" [disabled]=\"isNotAuthorisedToCreate() || isSearchFilter()\">{{'Add new' | rpxTranslate}}</button>\n    <h2 class=\"heading-h2 error-spacing\" *ngIf=\"caseField.hint_text || formArray.errors\">\n      <span *ngIf=\"caseField.hint_text\" class=\"form-hint\">{{caseField.hint_text | rpxTranslate }}</span>\n      <span *ngIf=\"formArray.errors\" class=\"error-message\">\n        {{(formArray.errors | ccdFirstError:caseField.label ) | rpxTranslate}}\n      </span>\n    </h2>\n\n    <div class=\"form-group\" [hidden]=\"caseField.hidden\" *ngIf=\"caseField.value && caseField.value.length\">\n\n      <div class=\"form-group\" *ngFor=\"let item of collItems; let i = index\" #collectionItem>\n        <div class=\"collection-title\">\n          <div class=\"float-left\">\n            <label [for]=\"item.prefix + i\"><h3 class=\"heading-h3\">{{itemLabel(i) | rpxTranslate}}</h3></label>\n          </div>\n          <div class=\"float-right\">\n            <button class=\"button button-secondary\" type=\"button\" (click)=\"openModal(i)\"\n                    [disabled]=\"isNotAuthorisedToDelete(i)\"\n                    attr.aria-label=\"Remove {{ itemLabel(i) }}\">{{'Remove' | rpxTranslate}}</button>\n          </div>\n        </div>\n        <ccd-field-write [caseField]=\"item.caseField\"\n                         [caseFields]=\"caseFields\"\n                         [formGroup]=\"formGroup\"\n                         [parent]=\"item.container\"\n                         [idPrefix]=\"item.prefix\"\n                         [hidden]=\"item.caseField.hidden\"\n                         [isExpanded]=\"isExpanded\"\n                         [isInSearchBlock]=\"isInSearchBlock\">\n        </ccd-field-write>\n      </div>\n\n    </div>\n\n    <button class=\"button write-collection-add-item__bottom\" type=\"button\" (click)=\"addItem(false)\" [disabled]=\"isNotAuthorisedToCreate() || isSearchFilter()\" *ngIf=\"caseField.value && caseField.value.length\">{{'Add new' | rpxTranslate }}</button>\n\n  </div>\n\n</div>\n", styles: [".collection-field-table tr:first-child>td{padding-top:0}.collection-field-table tr:last-child>td{border-bottom:none}.collection-field-table td.collection-actions{width:1px;white-space:nowrap}.error-spacing{margin-top:10px}.collection-title{height:51px}.float-left{float:left;padding-top:8px}.float-right{float:right}.complex-panel{margin:13px 0;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.3157894737}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}.collection-indicator{border-left:solid 5px #b1b4b6}\n"] }]
    }], function () { return [{ type: i1.MatDialog }, { type: i2.ScrollToService }, { type: i3.ProfileNotifier }]; }, { caseFields: [{
            type: Input
        }], formGroup: [{
            type: Input
        }], items: [{
            type: ViewChildren,
            args: ['collectionItem']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtY29sbGVjdGlvbi1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jb2xsZWN0aW9uL3dyaXRlLWNvbGxlY3Rpb24tZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY29sbGVjdGlvbi93cml0ZS1jb2xsZWN0aW9uLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQXFCLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRD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QUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7MEdBclZVLDZCQUE2QjtnRkFBN0IsNkJBQTZCOzs7Ozs7UUM5QjFDLDhCQUFvQyxhQUFBLFlBQUE7UUFLOUIsWUFDRjs7O1FBQUEsaUJBQUs7UUFDTCxpQ0FBdUo7UUFBbkYsMEdBQVMsWUFBUSxJQUFJLENBQUMsSUFBQztRQUE0RCxZQUE0Qjs7UUFBQSxpQkFBUztRQUM1TCw0RUFLSztRQUVMLGdGQXdCTTtRQUVOLHNGQUFtUDtRQUVyUCxpQkFBTSxFQUFBOztRQTNDZ0IsNkJBQVc7UUFLN0IsZUFDRjtRQURFLDBGQUNGO1FBQzRGLGVBQTBEO1FBQTFELGdGQUEwRDtRQUFDLGVBQTRCO1FBQTVCLHNEQUE0QjtRQUM3SSxlQUE2QztRQUE3QyxzRUFBNkM7UUFPOUIsZUFBK0M7UUFBL0Msd0VBQStDO1FBMEJ3RCxlQUErQztRQUEvQyx3RUFBK0M7O3VGRFhsTSw2QkFBNkI7Y0FMekMsU0FBUzsyQkFDRSw0QkFBNEI7d0hBTS9CLFVBQVU7a0JBRGhCLEtBQUs7WUFJQyxTQUFTO2tCQURmLEtBQUs7WUFTVyxLQUFLO2tCQURyQixZQUFZO21CQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFNjcm9sbFRvU2VydmljZSB9IGZyb20gJ0BuaWNreS1sZW5hZXJzL25neC1zY3JvbGwtdG8nO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0IH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaW5hbGl6ZSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2ZpZWxkLXR5cGUubW9kZWwnO1xuXG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vcHJvZmlsZS9wcm9maWxlLm1vZGVsJztcbmltcG9ydCB7IEZpZWxkc1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZmllbGRzL2ZpZWxkcy51dGlscyc7XG5pbXBvcnQgeyBGb3JtVmFsaWRhdG9yc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9mb3JtL2Zvcm0tdmFsaWRhdG9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2ZpbGVOb3RpZmllciB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3Byb2ZpbGUvcHJvZmlsZS5ub3RpZmllcic7XG5pbXBvcnQgeyBSZW1vdmVEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi8uLi9kaWFsb2dzL3JlbW92ZS1kaWFsb2cvcmVtb3ZlLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG50eXBlIENvbGxlY3Rpb25JdGVtID0ge1xuICBjYXNlRmllbGQ6IENhc2VGaWVsZDtcbiAgaXRlbTogYW55O1xuICBwcmVmaXg6IHN0cmluZztcbiAgaW5kZXg6IG51bWJlcjtcbiAgY29udGFpbmVyOiBVbnR5cGVkRm9ybUdyb3VwO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLWNvbGxlY3Rpb24tZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd3JpdGUtY29sbGVjdGlvbi1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29sbGVjdGlvbi1maWVsZC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVDb2xsZWN0aW9uRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSA9IFtdO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXA7XG5cbiAgcHVibGljIGZvcm1BcnJheTogRm9ybUFycmF5O1xuXG4gIHB1YmxpYyBwcm9maWxlOiBQcm9maWxlO1xuICBwdWJsaWMgcHJvZmlsZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBWaWV3Q2hpbGRyZW4oJ2NvbGxlY3Rpb25JdGVtJylcbiAgcHJpdmF0ZSByZWFkb25seSBpdGVtczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbEl0ZW1zOiBDb2xsZWN0aW9uSXRlbVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNjcm9sbFRvU2VydmljZTogU2Nyb2xsVG9TZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcHJvZmlsZU5vdGlmaWVyOiBQcm9maWxlTm90aWZpZXJcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNFeHBhbmRlZCkgeyAvLyBtZWFuaW5nIEkgYW0gbm90IHJlbmRlcmVkIG9uIHRoZSBzZWFyY2gvd29ya2Jhc2tldCBpbnB1dCBmaWx0ZXJcbiAgICAgIHRoaXMucHJvZmlsZVN1YnNjcmlwdGlvbiA9IHRoaXMucHJvZmlsZU5vdGlmaWVyLnByb2ZpbGUuc3Vic2NyaWJlKF8gPT4gdGhpcy5wcm9maWxlID0gXyk7XG4gICAgfVxuICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlID0gdGhpcy5jYXNlRmllbGQudmFsdWUgfHwgW107XG4gICAgdGhpcy5mb3JtQXJyYXkgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgRm9ybUFycmF5KFtdKSwgdHJ1ZSkgYXMgRm9ybUFycmF5O1xuICAgIHRoaXMuZm9ybUFycmF5WydjYXNlRmllbGQnXSA9IHRoaXMuY2FzZUZpZWxkO1xuICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlLmZvckVhY2goKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgcHJlZml4OiBzdHJpbmcgPSB0aGlzLmJ1aWxkSWRQcmVmaXgoaW5kZXgpO1xuICAgICAgY29uc3QgY2FzZUZpZWxkID0gdGhpcy5idWlsZENhc2VGaWVsZChpdGVtLCBpbmRleCk7XG4gICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmdldENvbnRhaW5lcihpbmRleCk7XG4gICAgICBpZiAodGhpcy5jb2xsSXRlbXMubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHRoaXMuY29sbEl0ZW1zLmxlbmd0aCA9IGluZGV4ICsgMTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29sbEl0ZW1zW2luZGV4XSA9IHsgY2FzZUZpZWxkLCBpdGVtLCBwcmVmaXgsIGluZGV4LCBjb250YWluZXIgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wcm9maWxlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnByb2ZpbGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYnVpbGRDYXNlRmllbGQoaXRlbSwgaW5kZXg6IG51bWJlciwgaXNOZXcgPSBmYWxzZSk6IENhc2VGaWVsZCB7XG4gICAgLyoqXG4gICAgICogV2hhdCBmb2xsb3cgaXMgY29kZSB0aGF0IG1ha2VzIG1lIHdhbnQgdG8gZ28ganVtcCBpbiB0aGUgc2hvd2VyIVxuICAgICAqIEJhc2ljYWxseSwgd2UgbGFuZCBpbiBoZXJlIHJlcGVhdGVkbHkgYmVjYXVzZSBvZiB0aGUgYmluZGluZywgYW5kXG4gICAgICogdGhpcyBpcyB3aGF0IGFwcGVhcnMgdG8gYmUgaGFwcGVuaW5nOlxuICAgICAqICAgMS4gdGhpcy5mb3JtQXJyYXkgY29udGFpbnMgbm8gY29udHJvbHMgYXQgYWxsLlxuICAgICAqICAgICAgdGhpcy5mb3JtQXJyYXkudmFsdWUgPSBbXTtcbiAgICAgKiAgIDIuIHRoaXMuZm9ybUFycmF5IGNvbnRhaW5zIGEgVW50eXBlZEZvcm1Hcm91cCwgd2hpY2ggY29udGFpbnMgYSBzaW5nbGVcbiAgICAgKiAgICAgIEZvcm1Db250cm9sIHdpdGggdGhlIGlkICdjb2RlJy5cbiAgICAgKiAgICAgIHRoaXMuZm9ybUFycmF5LnZhbHVlID0gW3sgY29kZTogbnVsbCB9XVxuICAgICAqICAgMy4gdGhpcy5mb3JtQXJyYXkgY29udGFpbnMgd2hhdCBpcyBiZWluZyBzZXQgdXAgYmVsb3cuXG4gICAgICogICAgICB0aGlzLmZvcm1BcnJheS52YWx1ZSA9IFt7IGNvZGU6IG51bGwsIGlkOiBudWxsLCB2YWx1ZTogeyBjb2RlOiBudWxsIH0gfV1cbiAgICAgKiAgIDQsIDUsIDYsIGV0YyAtIHRoZSBzYW1lIGFzIDMuXG4gICAgICovXG4gICAgbGV0IGdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuICAgIGlmICh0aGlzLmZvcm1BcnJheSAmJiAoaW5kZXggPCB0aGlzLmZvcm1BcnJheS5sZW5ndGgpKSB7XG4gICAgICBncm91cCA9IHRoaXMuZm9ybUFycmF5LmF0KGluZGV4KSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICBncm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICB9XG5cbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKHRoaXMuaXNDb2xsZWN0aW9uT2ZTaW1wbGVUeXBlKHRoaXMuY2FzZUZpZWxkKSkge1xuICAgICAgdmFsdWUgPSBncm91cC5nZXQoJ3ZhbHVlJykgYXMgRm9ybUNvbnRyb2w7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHZhbHVlID0gbmV3IEZvcm1Db250cm9sKGl0ZW0udmFsdWUpO1xuICAgICAgICAvLyBOb3cgYWRkIHRoZSB2YWx1ZSBGb3JtQ29udHJvbCB0byB0aGUgb3V0ZXIgZ3JvdXAuXG4gICAgICAgIGdyb3VwLmFkZENvbnRyb2woJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IGdyb3VwLmdldCgndmFsdWUnKSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB2YWx1ZSA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZ3JvdXAuY29udHJvbHMpKSB7XG4gICAgICAgICAgdmFsdWUuYWRkQ29udHJvbChrZXksIGdyb3VwLmdldChrZXkpKTtcbiAgICAgICAgICAvLyBET04nVCByZW1vdmUgdGhlIGNvbnRyb2wgZm9yIHRoaXMga2V5IGZyb20gdGhlIG91dGVyIGdyb3VwIG9yIGl0XG4gICAgICAgICAgLy8gZ29lcyBhd3J5LiBTbyBET04nVCB1bmNvbW1lbnQgdGhlIGJlbG93IGxpbmUhXG4gICAgICAgICAgLy8gZ3JvdXAucmVtb3ZlQ29udHJvbChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdyBhZGQgdGhlIHZhbHVlIFVudHlwZWRGb3JtR3JvdXAgdG8gdGhlIG91dGVyIGdyb3VwLlxuICAgICAgICBncm91cC5hZGRDb250cm9sKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGlkID0gZ3JvdXAuZ2V0KCdpZCcpIGFzIEZvcm1Db250cm9sO1xuICAgIC8vIElmIHdlJ3JlIG5vdCBpbiBzY2VuYXJpbyAzLCBhYm92ZSwgd2UgbmVlZCB0byBkbyBzb21lIGppZ2dlcnkgcG9rZXJ5XG4gICAgLy8gYW5kIHNldCB1cCB0aGUgaWQgYW5kIHZhbHVlIGNvbnRyb2xzLlxuICAgIC8vIEFsc28gc2V0IHVwIGFuIGlkIGNvbnRyb2wgaWYgaXQgZG9lc24ndCB5ZXQgZXhpc3QuXG4gICAgaWYgKCFpZCkge1xuICAgICAgaWQgPSBuZXcgRm9ybUNvbnRyb2woaXRlbS5pZCk7XG4gICAgICBncm91cC5hZGRDb250cm9sKCdpZCcsIGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZ2FpbiwgdmVyeSBzb3JyeS4gSSd2ZSBub3QgZm91bmQgYSBiZXR0ZXIgd2F5IHRvIHByb2R1Y2UgdGhlXG4gICAgICogb3V0cHV0IG5lZWRlZCBmb3Igd2hhdCBuZWVkcyB0byBiZSBzZW50IHRvIHRoZSBzZXJ2ZXIgeWV0LlxuICAgICAqL1xuXG4gICAgLy8gTm93LCBhZGQgdGhlIG91dGVyIGdyb3VwIHRvIHRoZSBhcnJheSAob3IgcmVwbGFjZSBpdCkuXG4gICAgaWYgKGluZGV4IDwgdGhpcy5mb3JtQXJyYXkubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZvcm1BcnJheS5zZXRDb250cm9sKGluZGV4LCBncm91cCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybUFycmF5LnB1c2goZ3JvdXApO1xuICAgIH1cblxuICAgIC8vIE5vdyBzZXQgdXAgdGhlIENhc2VGaWVsZCBhbmQgdmFsaWRhdGlvbi5cbiAgICBsZXQgY2ZpZDogc3RyaW5nO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICBjZmlkID0gJ3ZhbHVlJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2ZpZCA9IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy8gaXNOZXc6XG4gICAgY29uc3QgY2Y6IENhc2VGaWVsZCA9IHRoaXMubmV3Q2FzZUZpZWxkKGNmaWQsIGl0ZW0sIGluZGV4LCBpc05ldyk7XG4gICAgRm9ybVZhbGlkYXRvcnNTZXJ2aWNlLmFkZFZhbGlkYXRvcnMoY2YsIHZhbHVlKTtcbiAgICBGaWVsZHNVdGlscy5hZGRDYXNlRmllbGRBbmRDb21wb25lbnRSZWZlcmVuY2VzKHZhbHVlLCBjZiwgdGhpcyk7XG4gICAgcmV0dXJuIGNmO1xuICB9XG5cbiAgcHVibGljIGJ1aWxkSWRQcmVmaXgoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgcHJlZml4ID0gYCR7dGhpcy5pZFByZWZpeH0ke3RoaXMuY2FzZUZpZWxkLmlkfV9gO1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCcpIHtcbiAgICAgIHJldHVybiBgJHtwcmVmaXh9JHtpbmRleH1fYDtcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeDtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlYXJjaEZpbHRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0luU2VhcmNoQmxvY2sgJiYgdGhpcy5jb2xsSXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRJdGVtKGRvU2Nyb2xsOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gTWFudWFsbHkgcmVzZXR0aW5nIGVycm9ycyBpcyByZXF1aXJlZCB0byBwcmV2ZW50IGBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yYFxuICAgIHRoaXMuZm9ybUFycmF5LnNldEVycm9ycyhudWxsKTtcbiAgICBsZXQgaXRlbSA9IHsgdmFsdWU6IG51bGwgfTtcblxuICAgIGlmICh0aGlzLmlzQ29sbGVjdGlvbkR5bmFtaWMoKSkge1xuICAgICAgaXRlbSA9IHsgLi4udGhpcy5jYXNlRmllbGQudmFsdWVbdGhpcy5jYXNlRmllbGQudmFsdWUubGVuZ3RoIC0gMV0gfTtcbiAgICAgIGNvbnN0IGtleTogbnVtYmVyID0gTnVtYmVyKGl0ZW1bJ2lkJ11baXRlbVsnaWQnXS5sZW5ndGggLSAxXSkgKyAxO1xuICAgICAgKGl0ZW0gYXMgYW55KS5pZCA9IGl0ZW1bJ2lkJ10ucmVwbGFjZSgvLiQvLCBrZXkudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlLnB1c2goaXRlbSk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNhc2VGaWVsZC52YWx1ZS5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGNhc2VGaWVsZDogQ2FzZUZpZWxkID0gdGhpcy5idWlsZENhc2VGaWVsZChpdGVtLCBpbmRleCwgdHJ1ZSk7XG4gICAgY29uc3QgcHJlZml4ID0gdGhpcy5idWlsZElkUHJlZml4KGluZGV4KTtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmdldENvbnRhaW5lcihpbmRleCk7XG4gICAgdGhpcy5jb2xsSXRlbXMucHVzaCh7IGNhc2VGaWVsZCwgaXRlbSwgaW5kZXgsIHByZWZpeCwgY29udGFpbmVyIH0pO1xuXG4gICAgLy8gVGltZW91dCBpcyByZXF1aXJlZCBmb3IgdGhlIGNvbGxlY3Rpb24gaXRlbSB0byBiZSByZW5kZXJlZCBiZWZvcmUgaXQgY2FuIGJlIHNjcm9sbGVkIHRvIG9yIGZvY3VzZWQuXG4gICAgaWYgKGRvU2Nyb2xsKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb1NlcnZpY2Uuc2Nyb2xsVG8oe1xuICAgICAgICAgIHRhcmdldDogYCR7dGhpcy5idWlsZElkUHJlZml4KGluZGV4KX0ke2luZGV4fWAsXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgb2Zmc2V0OiAtMTUwLFxuICAgICAgICB9KVxuICAgICAgICAgIC5waXBlKGZpbmFsaXplKCgpID0+IHRoaXMuZm9jdXNMYXN0SXRlbSgpKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHsgfSwgY29uc29sZS5lcnJvcik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZvY3VzTGFzdEl0ZW0oKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0NvbGxlY3Rpb25EeW5hbWljKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZSB8fCAhdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmlkID09PSAnRHluYW1pY1JhZGlvTGlzdCc7XG4gIH1cblxuICBwcml2YXRlIG5ld0Nhc2VGaWVsZChpZDogc3RyaW5nLCBpdGVtLCBpbmRleCwgaXNOZXcgPSBmYWxzZSkge1xuICAgIGNvbnN0IGlzTm90QXV0aG9yaXNlZFRvVXBkYXRlID0gIWlzTmV3ICYmIHRoaXMuaXNOb3RBdXRob3Jpc2VkVG9VcGRhdGUoaW5kZXgpO1xuXG4gICAgY29uc3QgZmllbGRUeXBlID0gcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KG5ldyBGaWVsZFR5cGUoKSwgdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUpO1xuICAgIGlmIChmaWVsZFR5cGUuY29tcGxleF9maWVsZHMpIHtcbiAgICAgIGZpZWxkVHlwZS5jb21wbGV4X2ZpZWxkc1xuICAgICAgICAuZmlsdGVyKChjZjogQ2FzZUZpZWxkKSA9PiAhIWNmLnNob3dfY29uZGl0aW9uKVxuICAgICAgICAubWFwKChjZjogQ2FzZUZpZWxkKSA9PiBjZi5oaWRkZW4gPSB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIGJpdCBzZXR0aW5nIHRoZSBoaWRkZW4gZmxhZyBoZXJlIGFzIGl0J3MgYW4gaXRlbSBpbiB0aGUgYXJyYXkgYW5kXG4gICAgLy8gaXRzIGhpZGRlbiBzdGF0ZSBpc24ndCBpbmRlcGVuZGVudGx5IHJlLWV2YWx1YXRlZCB3aGVuIHRoZSBmb3JtIGlzIGNoYW5nZWQuXG4gICAgcmV0dXJuIHBsYWluVG9DbGFzc0Zyb21FeGlzdChuZXcgQ2FzZUZpZWxkKCksIHtcbiAgICAgIGlkLFxuICAgICAgZmllbGRfdHlwZTogZmllbGRUeXBlLFxuICAgICAgZGlzcGxheV9jb250ZXh0OiBpc05vdEF1dGhvcmlzZWRUb1VwZGF0ZSA/ICdSRUFET05MWScgOiB0aGlzLmNhc2VGaWVsZC5kaXNwbGF5X2NvbnRleHQsXG4gICAgICB2YWx1ZTogaXRlbS52YWx1ZSxcbiAgICAgIGxhYmVsOiBudWxsLFxuICAgICAgYWNsczogdGhpcy5jYXNlRmllbGQuYWNsc1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb250YWluZXIoaW5kZXg6IG51bWJlcik6IFVudHlwZWRGb3JtR3JvdXAge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtQXJyYXkuYXQoaW5kZXgpLmdldCgndmFsdWUnKTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBVbnR5cGVkRm9ybUdyb3VwKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1BcnJheS5hdChpbmRleCkgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZvY3VzTGFzdEl0ZW0oKSB7XG4gICAgY29uc3QgaXRlbTogYW55ID0gdGhpcy5pdGVtcy5sYXN0Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29udHJvbCcpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBpdGVtLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucmVzZXRJZHMoaW5kZXgpO1xuICAgIHRoaXMuY2FzZUZpZWxkLnZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5mb3JtQXJyYXkucmVtb3ZlQXQoaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldElkcyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgdGhpcy5jb2xsSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvdW50ZXIgPSBpICsgMTtcbiAgICAgIGlmICh0aGlzLmNvbGxJdGVtc1tpXS5pbmRleCAmJiB0aGlzLmNvbGxJdGVtc1tpXS5pbmRleCA9PT0gY291bnRlcikge1xuICAgICAgICB0aGlzLmNvbGxJdGVtc1tpXS5pbmRleCA9IGk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbGxJdGVtc1tpXS5jYXNlRmllbGQgJiYgdGhpcy5jb2xsSXRlbXNbaV0uY2FzZUZpZWxkLmlkXG4gICAgICAgICYmIHRoaXMuY29sbEl0ZW1zW2ldLmNhc2VGaWVsZC5pZCA9PT0gY291bnRlci50b1N0cmluZygpKSB7XG4gICAgICAgIHRoaXMuY29sbEl0ZW1zW2ldLmNhc2VGaWVsZC5pZCA9IGkudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaWRQcmVmaXgxID0gdGhpcy5jb2xsSXRlbXNbaV0ucHJlZml4ID8gdGhpcy5jb2xsSXRlbXNbaV0ucHJlZml4LnJlcGxhY2UoYF8ke2NvdW50ZXIudG9TdHJpbmcoKX1gLCBgXyR7aS50b1N0cmluZygpfWApIDogJyc7XG4gICAgICBjb25zdCBpZFByZWZpeDFDdXJyZW50ID0gaWRQcmVmaXgxLnJlcGxhY2UoYF8ke2kudG9TdHJpbmcoKX1gLCBgXyR7Y291bnRlci50b1N0cmluZygpfWApO1xuXG4gICAgICBpZiAodGhpcy5jb2xsSXRlbXNbaV0ucHJlZml4ICYmIHRoaXMuY29sbEl0ZW1zW2ldLnByZWZpeCA9PT0gaWRQcmVmaXgxQ3VycmVudCkge1xuICAgICAgICB0aGlzLmNvbGxJdGVtc1tpXS5wcmVmaXggPSBpZFByZWZpeDE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlkUHJlZml4QXZhaWxhYmxlID0gISF0aGlzLmNvbGxJdGVtc1tpXS5jb250YWluZXI/LlsnY29tcG9uZW50J10/LmlkUHJlZml4O1xuXG4gICAgICBjb25zdCBpZFByZWZpeDIgPSBpZFByZWZpeEF2YWlsYWJsZSA/XG4gICAgICAgIHRoaXMuY29sbEl0ZW1zW2ldLmNvbnRhaW5lclsnY29tcG9uZW50J10uaWRQcmVmaXgucmVwbGFjZShgXyR7Y291bnRlci50b1N0cmluZygpfWAsIGBfJHtpLnRvU3RyaW5nKCl9YCkgOiAnJztcbiAgICAgIGNvbnN0IGlkUHJlZml4MmN1cnJlbnQgPSBpZFByZWZpeDIucmVwbGFjZShgXyR7aS50b1N0cmluZygpfWAsIGBfJHtjb3VudGVyLnRvU3RyaW5nKCl9YCk7XG5cbiAgICAgIGlmIChpZFByZWZpeEF2YWlsYWJsZSAmJiB0aGlzLmNvbGxJdGVtc1tpXS5jb250YWluZXJbJ2NvbXBvbmVudCddLmlkUHJlZml4ID09PSBpZFByZWZpeDJjdXJyZW50KSB7XG4gICAgICAgIHRoaXMuY29sbEl0ZW1zW2ldLmNvbnRhaW5lclsnY29tcG9uZW50J10uaWRQcmVmaXggPSBpZFByZWZpeDI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGl0ZW1MYWJlbChpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKGluZGV4KSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5jYXNlRmllbGQubGFiZWx9ICR7aW5kZXggKyAxfWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZC5sYWJlbDtcbiAgfVxuXG4gIHB1YmxpYyBpc05vdEF1dGhvcmlzZWRUb0NyZWF0ZSgpIHtcbiAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhdGhpcy5nZXRDb2xsZWN0aW9uUGVybWlzc2lvbih0aGlzLmNhc2VGaWVsZCwgJ2FsbG93SW5zZXJ0Jyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29sbGVjdGlvblBlcm1pc3Npb24oZmllbGQ6IENhc2VGaWVsZCwgdHlwZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZpZWxkLmRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXIgJiZcbiAgICAgIGZpZWxkLmRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXIuc3BsaXQoJyMnKVxuICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGFydHNXaXRoKCdDT0xMRUNUSU9OKCcpKVswXVxuICAgICAgICAuaW5jbHVkZXModHlwZSk7XG4gIH1cblxuICBwdWJsaWMgaXNOb3RBdXRob3Jpc2VkVG9VcGRhdGUoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFdhcyByZWFzc2VzZWQgYXMgcGFydCBvZiBFVUktMzUwNS4gVGhlcmUgaXMgc3RpbGwgYSBjYXZlYXQgYXJvdW5kIENSRCwgYnV0IHRoYXQgd2FzIGRlZW1lZCBhbiB1bmxpa2VseSBzY2VuYXJpb1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZXRDb250cm9sSWRBdChpbmRleCk7XG4gICAgaWYgKGlkKSB7XG4gICAgICBpZiAoISF0aGlzLnByb2ZpbGUudXNlciAmJiAhIXRoaXMucHJvZmlsZS51c2VyLmlkYW0pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlUm9sZSA9IHRoaXMucHJvZmlsZS51c2VyLmlkYW0ucm9sZXMuZmluZChyb2xlID0+IHRoaXMuaGFzVXBkYXRlQWNjZXNzKHJvbGUpKTtcbiAgICAgICAgcmV0dXJuICF1cGRhdGVSb2xlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgaGFzVXBkYXRlQWNjZXNzKHJvbGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuY2FzZUZpZWxkLmFjbHMuZmluZChhY2wgPT4gYWNsLnJvbGUgPT09IHJvbGUgJiYgYWNsLnVwZGF0ZSA9PT0gdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNOb3RBdXRob3Jpc2VkVG9EZWxldGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gU2hvdWxkIGJlIGFibGUgdG8gZGVsZXRlIGlmIGNyZWF0aW5nIGEgY2FzZSBldmVuIGlmIFwiRFwiIGlzIGFic2VudCwgaGVuY2U6XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldENvbnRyb2xJZEF0KGluZGV4KTtcbiAgICByZXR1cm4gISFpZCAmJiAhdGhpcy5nZXRDb2xsZWN0aW9uUGVybWlzc2lvbih0aGlzLmNhc2VGaWVsZCwgJ2FsbG93RGVsZXRlJyk7XG4gIH1cblxuICBwdWJsaWMgb3Blbk1vZGFsKGk6IG51bWJlcikge1xuICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcbiAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICBkaWFsb2dDb25maWcuYXJpYUxhYmVsID0gJ0xhYmVsJztcbiAgICBkaWFsb2dDb25maWcuaGVpZ2h0ID0gJzIyMHB4JztcbiAgICBkaWFsb2dDb25maWcud2lkdGggPSAnNTUwcHgnO1xuICAgIGRpYWxvZ0NvbmZpZy5wYW5lbENsYXNzID0gJ2RpYWxvZyc7XG5cbiAgICBkaWFsb2dDb25maWcuY2xvc2VPbk5hdmlnYXRpb24gPSBmYWxzZTtcbiAgICBkaWFsb2dDb25maWcucG9zaXRpb24gPSB7XG4gICAgICB0b3A6IGAke3dpbmRvdy5pbm5lckhlaWdodCAvIDIgLSAxMTB9cHhgLCBsZWZ0OiBgJHt3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSAyNzV9cHhgXG4gICAgfTtcblxuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUmVtb3ZlRGlhbG9nQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuXG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09PSAnUmVtb3ZlJykge1xuICAgICAgICB0aGlzLnJlbW92ZUl0ZW0oaSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllZCBmdWxsIHNvbHV0aW9uIGFzIHBhcnQgb2YgRVVJLTM1MDVcbiAgICovXG4gIHByaXZhdGUgZ2V0Q29udHJvbElkQXQoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG5cbiAgICAvLyB0aGlzLmZvcm1BcnJheSBjb250YWlucyBbIFVudHlwZWRGb3JtR3JvdXAoIGlkOiBGb3JtQ29udHJvbCwgdmFsdWU6IFVudHlwZWRGb3JtR3JvdXAgKSwgLi4uIF0uXG4gICAgLy8gSGVyZSwgd2UgbmVlZCB0byBnZXQgdGhlIHZhbHVlIG9mIHRoZSBpZCBGb3JtQ29udHJvbC5cbiAgICBjb25zdCBncm91cDogVW50eXBlZEZvcm1Hcm91cCA9IHRoaXMuZm9ybUFycmF5LmF0KGluZGV4KSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgIGNvbnN0IGNvbnRyb2w6IEZvcm1Db250cm9sID0gZ3JvdXAuZ2V0KCdpZCcpIGFzIEZvcm1Db250cm9sO1xuICAgIHJldHVybiBjb250cm9sID8gY29udHJvbC52YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgaXNDb2xsZWN0aW9uT2ZTaW1wbGVUeXBlKGNhc2VGaWVsZDogQ2FzZUZpZWxkKSB7XG4gICAgY29uc3Qgbm90U2ltcGxlID0gWydDb2xsZWN0aW9uJywgJ0NvbXBsZXgnXTtcbiAgICByZXR1cm4gbm90U2ltcGxlLmluZGV4T2YoY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLnR5cGUpIDwgMDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbaWRdPVwiaWQoKVwiPlxuXG4gIDxkaXYgY2xhc3M9XCJwYW5lbCBjb2xsZWN0aW9uLWluZGljYXRvclwiPlxuXG4gICAgPGgyIGNsYXNzPVwiaGVhZGluZy1oMiBlcnJvci1zcGFjaW5nXCI+XG4gICAgICB7eyhjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsKSB8IHJweFRyYW5zbGF0ZSB9fVxuICAgIDwvaDI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiB3cml0ZS1jb2xsZWN0aW9uLWFkZC1pdGVtX190b3BcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImFkZEl0ZW0odHJ1ZSlcIiBbZGlzYWJsZWRdPVwiaXNOb3RBdXRob3Jpc2VkVG9DcmVhdGUoKSB8fCBpc1NlYXJjaEZpbHRlcigpXCI+e3snQWRkIG5ldycgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgIDxoMiBjbGFzcz1cImhlYWRpbmctaDIgZXJyb3Itc3BhY2luZ1wiICpuZ0lmPVwiY2FzZUZpZWxkLmhpbnRfdGV4dCB8fCBmb3JtQXJyYXkuZXJyb3JzXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIiBjbGFzcz1cImZvcm0taGludFwiPnt7Y2FzZUZpZWxkLmhpbnRfdGV4dCB8IHJweFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwiZm9ybUFycmF5LmVycm9yc1wiIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPlxuICAgICAgICB7eyhmb3JtQXJyYXkuZXJyb3JzIHwgY2NkRmlyc3RFcnJvcjpjYXNlRmllbGQubGFiZWwgKSB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L3NwYW4+XG4gICAgPC9oMj5cblxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2hpZGRlbl09XCJjYXNlRmllbGQuaGlkZGVuXCIgKm5nSWY9XCJjYXNlRmllbGQudmFsdWUgJiYgY2FzZUZpZWxkLnZhbHVlLmxlbmd0aFwiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNvbGxJdGVtczsgbGV0IGkgPSBpbmRleFwiICNjb2xsZWN0aW9uSXRlbT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxvYXQtbGVmdFwiPlxuICAgICAgICAgICAgPGxhYmVsIFtmb3JdPVwiaXRlbS5wcmVmaXggKyBpXCI+PGgzIGNsYXNzPVwiaGVhZGluZy1oM1wiPnt7aXRlbUxhYmVsKGkpIHwgcnB4VHJhbnNsYXRlfX08L2gzPjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZsb2F0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW5Nb2RhbChpKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc05vdEF1dGhvcmlzZWRUb0RlbGV0ZShpKVwiXG4gICAgICAgICAgICAgICAgICAgIGF0dHIuYXJpYS1sYWJlbD1cIlJlbW92ZSB7eyBpdGVtTGFiZWwoaSkgfX1cIj57eydSZW1vdmUnIHwgcnB4VHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxjY2QtZmllbGQtd3JpdGUgW2Nhc2VGaWVsZF09XCJpdGVtLmNhc2VGaWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2Nhc2VGaWVsZHNdPVwiY2FzZUZpZWxkc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRdPVwiaXRlbS5jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtpZFByZWZpeF09XCJpdGVtLnByZWZpeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2hpZGRlbl09XCJpdGVtLmNhc2VGaWVsZC5oaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtpc0V4cGFuZGVkXT1cImlzRXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtpc0luU2VhcmNoQmxvY2tdPVwiaXNJblNlYXJjaEJsb2NrXCI+XG4gICAgICAgIDwvY2NkLWZpZWxkLXdyaXRlPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gd3JpdGUtY29sbGVjdGlvbi1hZGQtaXRlbV9fYm90dG9tXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJhZGRJdGVtKGZhbHNlKVwiIFtkaXNhYmxlZF09XCJpc05vdEF1dGhvcmlzZWRUb0NyZWF0ZSgpIHx8IGlzU2VhcmNoRmlsdGVyKClcIiAqbmdJZj1cImNhc2VGaWVsZC52YWx1ZSAmJiBjYXNlRmllbGQudmFsdWUubGVuZ3RoXCI+e3snQWRkIG5ldycgfCBycHhUcmFuc2xhdGUgfX08L2J1dHRvbj5cblxuICA8L2Rpdj5cblxuPC9kaXY+XG4iXX0=