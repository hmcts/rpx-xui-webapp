import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { FocusElementDirective } from '../../../directives/focus-element';
import { AddressModel } from '../../../domain/addresses/address.model';
import { AddressesService } from '../../../services/addresses/addresses.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { WriteComplexFieldComponent } from '../complex/write-complex-field.component';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import { AddressOption } from './address-option.model';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/addresses/addresses.service";
import * as i2 from "../utils/is-compound.pipe";
const _c0 = ["writeComplexFieldComponent"];
function WriteAddressFieldComponent_div_1_div_5_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Enter the Postcode"));
} }
const _c1 = function (a0) { return { "form-group-error": a0 }; };
const _c2 = function (a0) { return { "govuk-input--error": a0 }; };
function WriteAddressFieldComponent_div_1_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "label", 9)(2, "span", 10);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, WriteAddressFieldComponent_div_1_div_5_span_5_Template, 3, 3, "span", 11);
    i0.ɵɵelement(6, "input", 12);
    i0.ɵɵelementStart(7, "button", 13);
    i0.ɵɵlistener("click", function WriteAddressFieldComponent_div_1_div_5_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.findAddress()); });
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", ctx_r2.createElementId("postcodeLookup"))("ngClass", i0.ɵɵpureFunction1(13, _c1, ctx_r2.missingPostcode));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r2.createElementId("postcodeInput"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 9, "Enter a UK postcode"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.missingPostcode);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(15, _c2, ctx_r2.missingPostcode))("id", ctx_r2.createElementId("postcodeInput"))("formControl", ctx_r2.postcode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 11, "Find address"));
} }
function WriteAddressFieldComponent_div_1_div_6_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const addressOption_r9 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", addressOption_r9.value);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, addressOption_r9.description), " ");
} }
function WriteAddressFieldComponent_div_1_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "label", 9)(2, "span", 10);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "select", 16);
    i0.ɵɵlistener("change", function WriteAddressFieldComponent_div_1_div_6_Template_select_change_5_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.addressSelected()); });
    i0.ɵɵtemplate(6, WriteAddressFieldComponent_div_1_div_6_option_6_Template, 3, 4, "option", 17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r3.createElementId("addressList"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 5, "Select an address"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", ctx_r3.createElementId("addressList"))("formControl", ctx_r3.addressList);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.addressOptions);
} }
function WriteAddressFieldComponent_div_1_a_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵlistener("click", function WriteAddressFieldComponent_div_1_a_7_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r12.blankAddress()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "I can't enter a UK postcode"), " ");
} }
function WriteAddressFieldComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "h2", 4);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵpipe(4, "ccdFieldLabel");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, WriteAddressFieldComponent_div_1_div_5_Template, 10, 17, "div", 5);
    i0.ɵɵtemplate(6, WriteAddressFieldComponent_div_1_div_6_Template, 7, 7, "div", 6);
    i0.ɵɵtemplate(7, WriteAddressFieldComponent_div_1_a_7_Template, 3, 3, "a", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, i0.ɵɵpipeBind1(4, 6, ctx_r0.caseField)));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r0.isExpanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.addressOptions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.shouldShowDetailFields());
} }
export class WriteAddressFieldComponent extends AbstractFieldWriteComponent {
    constructor(addressesService, isCompoundPipe) {
        super();
        this.isCompoundPipe = isCompoundPipe;
        this.addressFormGroup = new UntypedFormGroup({});
        this.missingPostcode = false;
        this.addressesService = addressesService;
    }
    ngOnInit() {
        if (!this.isComplexWithHiddenFields()) {
            this.postcode = new FormControl('');
            this.addressFormGroup.addControl('postcode', this.postcode);
            this.addressList = new FormControl('');
            this.addressFormGroup.addControl('address', this.addressList);
        }
    }
    findAddress() {
        if (!this.postcode.value) {
            this.missingPostcode = true;
        }
        else {
            this.missingPostcode = false;
            const postcode = this.postcode.value;
            this.caseField.value = null;
            this.addressOptions = [];
            this.addressesService.getAddressesForPostcode(postcode.replace(' ', '').toUpperCase()).subscribe(result => {
                result.forEach(address => {
                    this.addressOptions.push(new AddressOption(address, null));
                });
                this.addressOptions.unshift(new AddressOption(undefined, this.defaultLabel(this.addressOptions.length)));
            }, (error) => {
                console.log(`An error occurred retrieving addresses for postcode ${postcode}. ${error}`);
                this.addressOptions.unshift(new AddressOption(undefined, this.defaultLabel(this.addressOptions.length)));
            });
            this.addressList.setValue(undefined);
            this.refocusElement();
        }
    }
    refocusElement() {
        if (this.focusElementDirectives && this.focusElementDirectives.length > 0) {
            this.focusElementDirectives.first.focus();
        }
    }
    blankAddress() {
        this.caseField.value = new AddressModel();
        this.setFormValue();
    }
    isComplexWithHiddenFields() {
        if (this.caseField.isComplex() && this.caseField.field_type.complex_fields
            && this.caseField.field_type.complex_fields.some(cf => cf.hidden === true)) {
            return true;
        }
    }
    shouldShowDetailFields() {
        if (this.isComplexWithHiddenFields()) {
            return true;
        }
        if (this.isExpanded) {
            return true;
        }
        if (!this.writeComplexFieldComponent || !this.writeComplexFieldComponent.complexGroup) {
            return false;
        }
        const address = this.writeComplexFieldComponent.complexGroup.value;
        let hasAddress = false;
        if (address) {
            Object.keys(address).forEach((key) => {
                if (address[key] !== null) {
                    hasAddress = true;
                }
            });
        }
        return hasAddress;
    }
    addressSelected() {
        this.caseField.value = this.addressList.value;
        this.setFormValue();
    }
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        const change = changes['caseField'];
        if (change) {
            this.setFormValue();
        }
    }
    buildIdPrefix(elementId) {
        return `${this.idPrefix}_${elementId}`;
    }
    defaultLabel(numberOfAddresses) {
        return numberOfAddresses === 0 ? 'No address found'
            : `${numberOfAddresses}${numberOfAddresses === 1 ? ' address ' : ' addresses '}found`;
    }
    setFormValue() {
        if (this.writeComplexFieldComponent.complexGroup) {
            this.writeComplexFieldComponent.complexGroup.setValue(this.caseField.value);
        }
    }
}
WriteAddressFieldComponent.ɵfac = function WriteAddressFieldComponent_Factory(t) { return new (t || WriteAddressFieldComponent)(i0.ɵɵdirectiveInject(i1.AddressesService), i0.ɵɵdirectiveInject(i2.IsCompoundPipe)); };
WriteAddressFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteAddressFieldComponent, selectors: [["ccd-write-address-field"]], viewQuery: function WriteAddressFieldComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(FocusElementDirective, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.writeComplexFieldComponent = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.focusElementDirectives = _t);
    } }, inputs: { formGroup: "formGroup" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 4, vars: 9, consts: [[1, "form-group", 3, "id"], [4, "ngIf"], [3, "hidden", "caseField", "renderLabel", "parent", "formGroup", "ignoreMandatory", "idPrefix"], ["writeComplexFieldComponent", ""], [1, "heading-h2"], ["class", "form-group bottom-30 postcodeLookup", 3, "id", "ngClass", 4, "ngIf"], ["class", "form-group", "id", "selectAddress", 4, "ngIf"], ["class", "manual-link bottom-30", "href", "javascript:void(0)", 3, "click", 4, "ngIf"], [1, "form-group", "bottom-30", "postcodeLookup", 3, "id", "ngClass"], [3, "for"], [1, "form-label"], ["class", "error-message", 4, "ngIf"], ["type", "text", "name", "postcode", 1, "form-control", "postcodeinput", "inline-block", 3, "ngClass", "id", "formControl"], ["type", "button", 1, "button", "button-30", 3, "click"], [1, "error-message"], ["id", "selectAddress", 1, "form-group"], ["name", "address", "focusElement", "", 1, "form-control", "ccd-dropdown", "addressList", 3, "id", "formControl", "change"], [3, "ngValue", 4, "ngFor", "ngForOf"], [3, "ngValue"], ["href", "javascript:void(0)", 1, "manual-link", "bottom-30", 3, "click"]], template: function WriteAddressFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, WriteAddressFieldComponent_div_1_Template, 8, 8, "div", 1);
        i0.ɵɵelement(2, "ccd-write-complex-type-field", 2, 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isComplexWithHiddenFields());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx.shouldShowDetailFields())("caseField", ctx.caseField)("renderLabel", false)("parent", ctx.parent)("formGroup", ctx.formGroup)("ignoreMandatory", true)("idPrefix", ctx.buildIdPrefix("detail"));
    } }, styles: [".manual-link[_ngcontent-%COMP%]{cursor:pointer;display:block;text-decoration:underline}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteAddressFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-address-field', template: "<div class=\"form-group\" [id]=\"id()\">\n  <div *ngIf=\"!isComplexWithHiddenFields()\">\n    <h2 class=\"heading-h2\">{{caseField | ccdFieldLabel | rpxTranslate}}</h2>\n\n    <div class=\"form-group bottom-30 postcodeLookup\" [id]=\"createElementId('postcodeLookup')\" [ngClass]=\"{'form-group-error': missingPostcode}\" *ngIf=\"!isExpanded\">\n      <label [for]=\"createElementId('postcodeInput')\">\n        <span class=\"form-label\">{{'Enter a UK postcode' | rpxTranslate}}</span>\n      </label>\n      <span class=\"error-message\" *ngIf=\"missingPostcode\">{{'Enter the Postcode' | rpxTranslate}}</span>\n      <input type=\"text\" [ngClass]=\"{'govuk-input--error': missingPostcode}\"\n      [id]=\"createElementId('postcodeInput')\" name=\"postcode\" class=\"form-control postcodeinput inline-block\" [formControl]=\"postcode\">\n      <button type=\"button\" class=\"button button-30\" (click)=\"findAddress()\">{{'Find address' | rpxTranslate}}</button>\n    </div>\n\n    <div class=\"form-group\" *ngIf=\"addressOptions\" id=\"selectAddress\">\n      <label [for]=\"createElementId('addressList')\">\n        <span class=\"form-label\">{{'Select an address' | rpxTranslate}}</span>\n      </label>\n\n      <select class=\"form-control ccd-dropdown addressList\" [id]=\"createElementId('addressList')\" name=\"address\" [formControl]=\"addressList\" (change)=\"addressSelected()\" focusElement>\n        <option *ngFor=\"let addressOption of addressOptions\" [ngValue]=\"addressOption.value\">\n          {{addressOption.description | rpxTranslate}}\n        </option>\n      </select>\n    </div>\n\n    <a class=\"manual-link bottom-30\" *ngIf=\"!shouldShowDetailFields()\" (click)=\"blankAddress()\" href=\"javascript:void(0)\">\n      {{\"I can't enter a UK postcode\" | rpxTranslate}}\n    </a>\n  </div>\n\n  <ccd-write-complex-type-field\n    [hidden]=\"!shouldShowDetailFields()\"\n    [caseField]=\"caseField\"\n    [renderLabel]=\"false\"\n    [parent]=\"parent\"\n    [formGroup]=\"formGroup\"\n    [ignoreMandatory]=\"true\"\n    [idPrefix]=\"buildIdPrefix('detail')\"\n    #writeComplexFieldComponent>\n  </ccd-write-complex-type-field>\n</div>\n", styles: [".manual-link{cursor:pointer;display:block;text-decoration:underline}\n"] }]
    }], function () { return [{ type: i1.AddressesService }, { type: i2.IsCompoundPipe }]; }, { writeComplexFieldComponent: [{
            type: ViewChild,
            args: ['writeComplexFieldComponent', { static: false }]
        }], focusElementDirectives: [{
            type: ViewChildren,
            args: [FocusElementDirective]
        }], formGroup: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtYWRkcmVzcy1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9hZGRyZXNzL3dyaXRlLWFkZHJlc3MtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvYWRkcmVzcy93cml0ZS1hZGRyZXNzLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztJQ0FqRCxnQ0FBb0Q7SUFBQSxZQUF1Qzs7SUFBQSxpQkFBTzs7SUFBOUMsZUFBdUM7SUFBdkMsZ0VBQXVDOzs7Ozs7SUFKN0YsOEJBQWdLLGVBQUEsZUFBQTtJ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QVM7bUJBQUMsNEJBQTRCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1lBSW5ELHNCQUFzQjtrQkFENUIsWUFBWTttQkFBQyxxQkFBcUI7WUFNNUIsU0FBUztrQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9jdXNFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9mb2N1cy1lbGVtZW50JztcbmltcG9ydCB7IEFkZHJlc3NNb2RlbCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9hZGRyZXNzZXMvYWRkcmVzcy5tb2RlbCc7XG5pbXBvcnQgeyBBZGRyZXNzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYWRkcmVzc2VzL2FkZHJlc3Nlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50JztcbmltcG9ydCB7IFdyaXRlQ29tcGxleEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcGxleC93cml0ZS1jb21wbGV4LWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJc0NvbXBvdW5kUGlwZSB9IGZyb20gJy4uL3V0aWxzL2lzLWNvbXBvdW5kLnBpcGUnO1xuaW1wb3J0IHsgQWRkcmVzc09wdGlvbiB9IGZyb20gJy4vYWRkcmVzcy1vcHRpb24ubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtYWRkcmVzcy1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnd3JpdGUtYWRkcmVzcy1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dyaXRlLWFkZHJlc3MtZmllbGQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlQWRkcmVzc0ZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCd3cml0ZUNvbXBsZXhGaWVsZENvbXBvbmVudCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgd3JpdGVDb21wbGV4RmllbGRDb21wb25lbnQ6IFdyaXRlQ29tcGxleEZpZWxkQ29tcG9uZW50O1xuXG4gIEBWaWV3Q2hpbGRyZW4oRm9jdXNFbGVtZW50RGlyZWN0aXZlKVxuICBwdWJsaWMgZm9jdXNFbGVtZW50RGlyZWN0aXZlczogUXVlcnlMaXN0PEZvY3VzRWxlbWVudERpcmVjdGl2ZT47XG5cbiAgcHVibGljIGFkZHJlc3Nlc1NlcnZpY2U6IEFkZHJlc3Nlc1NlcnZpY2U7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cDtcblxuICBwdWJsaWMgYWRkcmVzc0Zvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgcHVibGljIHBvc3Rjb2RlOiBGb3JtQ29udHJvbDtcbiAgcHVibGljIGFkZHJlc3NMaXN0OiBGb3JtQ29udHJvbDtcblxuICBwdWJsaWMgYWRkcmVzc09wdGlvbnM6IEFkZHJlc3NPcHRpb25bXTtcblxuICBwdWJsaWMgbWlzc2luZ1Bvc3Rjb2RlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoYWRkcmVzc2VzU2VydmljZTogQWRkcmVzc2VzU2VydmljZSwgcHJpdmF0ZSByZWFkb25seSBpc0NvbXBvdW5kUGlwZTogSXNDb21wb3VuZFBpcGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWRkcmVzc2VzU2VydmljZSA9IGFkZHJlc3Nlc1NlcnZpY2U7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQ29tcGxleFdpdGhIaWRkZW5GaWVsZHMoKSkge1xuICAgICAgdGhpcy5wb3N0Y29kZSA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgICB0aGlzLmFkZHJlc3NGb3JtR3JvdXAuYWRkQ29udHJvbCgncG9zdGNvZGUnLCB0aGlzLnBvc3Rjb2RlKTtcbiAgICAgIHRoaXMuYWRkcmVzc0xpc3QgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgICAgdGhpcy5hZGRyZXNzRm9ybUdyb3VwLmFkZENvbnRyb2woJ2FkZHJlc3MnLCB0aGlzLmFkZHJlc3NMaXN0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZmluZEFkZHJlc3MoKSB7XG4gICAgaWYgKCF0aGlzLnBvc3Rjb2RlLnZhbHVlKSB7XG4gICAgICB0aGlzLm1pc3NpbmdQb3N0Y29kZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWlzc2luZ1Bvc3Rjb2RlID0gZmFsc2U7XG4gICAgICBjb25zdCBwb3N0Y29kZSA9IHRoaXMucG9zdGNvZGUudmFsdWU7XG4gICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLmFkZHJlc3NPcHRpb25zID0gW107XG4gICAgICB0aGlzLmFkZHJlc3Nlc1NlcnZpY2UuZ2V0QWRkcmVzc2VzRm9yUG9zdGNvZGUocG9zdGNvZGUucmVwbGFjZSgnICcsICcnKS50b1VwcGVyQ2FzZSgpKS5zdWJzY3JpYmUoXG4gICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmVzdWx0LmZvckVhY2goXG4gICAgICAgICAgICBhZGRyZXNzID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzT3B0aW9ucy5wdXNoKG5ldyBBZGRyZXNzT3B0aW9uKGFkZHJlc3MsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuYWRkcmVzc09wdGlvbnMudW5zaGlmdChcbiAgICAgICAgICAgIG5ldyBBZGRyZXNzT3B0aW9uKHVuZGVmaW5lZCwgdGhpcy5kZWZhdWx0TGFiZWwodGhpcy5hZGRyZXNzT3B0aW9ucy5sZW5ndGgpKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBBbiBlcnJvciBvY2N1cnJlZCByZXRyaWV2aW5nIGFkZHJlc3NlcyBmb3IgcG9zdGNvZGUgJHtwb3N0Y29kZX0uICR7ZXJyb3J9YCk7XG4gICAgICAgICAgdGhpcy5hZGRyZXNzT3B0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgICAgbmV3IEFkZHJlc3NPcHRpb24odW5kZWZpbmVkLCB0aGlzLmRlZmF1bHRMYWJlbCh0aGlzLmFkZHJlc3NPcHRpb25zLmxlbmd0aCkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLmFkZHJlc3NMaXN0LnNldFZhbHVlKHVuZGVmaW5lZCk7XG4gICAgICB0aGlzLnJlZm9jdXNFbGVtZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZm9jdXNFbGVtZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvY3VzRWxlbWVudERpcmVjdGl2ZXMgJiYgdGhpcy5mb2N1c0VsZW1lbnREaXJlY3RpdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZm9jdXNFbGVtZW50RGlyZWN0aXZlcy5maXJzdC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBibGFua0FkZHJlc3MoKSB7XG4gICAgdGhpcy5jYXNlRmllbGQudmFsdWUgPSBuZXcgQWRkcmVzc01vZGVsKCk7XG4gICAgdGhpcy5zZXRGb3JtVmFsdWUoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0NvbXBsZXhXaXRoSGlkZGVuRmllbGRzKCkge1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC5pc0NvbXBsZXgoKSAmJiB0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzXG4gICAgICAmJiB0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzLnNvbWUoY2YgPT4gY2YuaGlkZGVuID09PSB0cnVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dEZXRhaWxGaWVsZHMoKSB7XG4gICAgaWYgKHRoaXMuaXNDb21wbGV4V2l0aEhpZGRlbkZpZWxkcygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNFeHBhbmRlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy53cml0ZUNvbXBsZXhGaWVsZENvbXBvbmVudCB8fCAhdGhpcy53cml0ZUNvbXBsZXhGaWVsZENvbXBvbmVudC5jb21wbGV4R3JvdXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgYWRkcmVzcyA9IHRoaXMud3JpdGVDb21wbGV4RmllbGRDb21wb25lbnQuY29tcGxleEdyb3VwLnZhbHVlO1xuICAgIGxldCBoYXNBZGRyZXNzID0gZmFsc2U7XG4gICAgaWYgKGFkZHJlc3MpIHtcbiAgICAgIE9iamVjdC5rZXlzKGFkZHJlc3MpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoYWRkcmVzc1trZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgaGFzQWRkcmVzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaGFzQWRkcmVzcztcbiAgfVxuXG4gIHB1YmxpYyBhZGRyZXNzU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5jYXNlRmllbGQudmFsdWUgPSB0aGlzLmFkZHJlc3NMaXN0LnZhbHVlO1xuICAgIHRoaXMuc2V0Rm9ybVZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXNbJ2Nhc2VGaWVsZCddO1xuICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGJ1aWxkSWRQcmVmaXgoZWxlbWVudElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLmlkUHJlZml4fV8ke2VsZW1lbnRJZH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0TGFiZWwobnVtYmVyT2ZBZGRyZXNzZXMpIHtcbiAgICByZXR1cm4gbnVtYmVyT2ZBZGRyZXNzZXMgPT09IDAgPyAnTm8gYWRkcmVzcyBmb3VuZCdcbiAgICAgIDogYCR7bnVtYmVyT2ZBZGRyZXNzZXN9JHtudW1iZXJPZkFkZHJlc3NlcyA9PT0gMSA/ICcgYWRkcmVzcyAnIDogJyBhZGRyZXNzZXMgJ31mb3VuZGA7XG4gIH1cblxuICBwcml2YXRlIHNldEZvcm1WYWx1ZSgpIHtcbiAgICBpZiAodGhpcy53cml0ZUNvbXBsZXhGaWVsZENvbXBvbmVudC5jb21wbGV4R3JvdXApIHtcbiAgICAgIHRoaXMud3JpdGVDb21wbGV4RmllbGRDb21wb25lbnQuY29tcGxleEdyb3VwLnNldFZhbHVlKFxuICAgICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2lkXT1cImlkKClcIj5cbiAgPGRpdiAqbmdJZj1cIiFpc0NvbXBsZXhXaXRoSGlkZGVuRmllbGRzKClcIj5cbiAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLWgyXCI+e3tjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgYm90dG9tLTMwIHBvc3Rjb2RlTG9va3VwXCIgW2lkXT1cImNyZWF0ZUVsZW1lbnRJZCgncG9zdGNvZGVMb29rdXAnKVwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6IG1pc3NpbmdQb3N0Y29kZX1cIiAqbmdJZj1cIiFpc0V4cGFuZGVkXCI+XG4gICAgICA8bGFiZWwgW2Zvcl09XCJjcmVhdGVFbGVtZW50SWQoJ3Bvc3Rjb2RlSW5wdXQnKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIj57eydFbnRlciBhIFVLIHBvc3Rjb2RlJyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwibWlzc2luZ1Bvc3Rjb2RlXCI+e3snRW50ZXIgdGhlIFBvc3Rjb2RlJyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW25nQ2xhc3NdPVwieydnb3Z1ay1pbnB1dC0tZXJyb3InOiBtaXNzaW5nUG9zdGNvZGV9XCJcbiAgICAgIFtpZF09XCJjcmVhdGVFbGVtZW50SWQoJ3Bvc3Rjb2RlSW5wdXQnKVwiIG5hbWU9XCJwb3N0Y29kZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHBvc3Rjb2RlaW5wdXQgaW5saW5lLWJsb2NrXCIgW2Zvcm1Db250cm9sXT1cInBvc3Rjb2RlXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tMzBcIiAoY2xpY2spPVwiZmluZEFkZHJlc3MoKVwiPnt7J0ZpbmQgYWRkcmVzcycgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiAqbmdJZj1cImFkZHJlc3NPcHRpb25zXCIgaWQ9XCJzZWxlY3RBZGRyZXNzXCI+XG4gICAgICA8bGFiZWwgW2Zvcl09XCJjcmVhdGVFbGVtZW50SWQoJ2FkZHJlc3NMaXN0JylcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCI+e3snU2VsZWN0IGFuIGFkZHJlc3MnIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICA8L2xhYmVsPlxuXG4gICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNjZC1kcm9wZG93biBhZGRyZXNzTGlzdFwiIFtpZF09XCJjcmVhdGVFbGVtZW50SWQoJ2FkZHJlc3NMaXN0JylcIiBuYW1lPVwiYWRkcmVzc1wiIFtmb3JtQ29udHJvbF09XCJhZGRyZXNzTGlzdFwiIChjaGFuZ2UpPVwiYWRkcmVzc1NlbGVjdGVkKClcIiBmb2N1c0VsZW1lbnQ+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGFkZHJlc3NPcHRpb24gb2YgYWRkcmVzc09wdGlvbnNcIiBbbmdWYWx1ZV09XCJhZGRyZXNzT3B0aW9uLnZhbHVlXCI+XG4gICAgICAgICAge3thZGRyZXNzT3B0aW9uLmRlc2NyaXB0aW9uIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cblxuICAgIDxhIGNsYXNzPVwibWFudWFsLWxpbmsgYm90dG9tLTMwXCIgKm5nSWY9XCIhc2hvdWxkU2hvd0RldGFpbEZpZWxkcygpXCIgKGNsaWNrKT1cImJsYW5rQWRkcmVzcygpXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAge3tcIkkgY2FuJ3QgZW50ZXIgYSBVSyBwb3N0Y29kZVwiIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2E+XG4gIDwvZGl2PlxuXG4gIDxjY2Qtd3JpdGUtY29tcGxleC10eXBlLWZpZWxkXG4gICAgW2hpZGRlbl09XCIhc2hvdWxkU2hvd0RldGFpbEZpZWxkcygpXCJcbiAgICBbY2FzZUZpZWxkXT1cImNhc2VGaWVsZFwiXG4gICAgW3JlbmRlckxhYmVsXT1cImZhbHNlXCJcbiAgICBbcGFyZW50XT1cInBhcmVudFwiXG4gICAgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxuICAgIFtpZ25vcmVNYW5kYXRvcnldPVwidHJ1ZVwiXG4gICAgW2lkUHJlZml4XT1cImJ1aWxkSWRQcmVmaXgoJ2RldGFpbCcpXCJcbiAgICAjd3JpdGVDb21wbGV4RmllbGRDb21wb25lbnQ+XG4gIDwvY2NkLXdyaXRlLWNvbXBsZXgtdHlwZS1maWVsZD5cbjwvZGl2PlxuIl19