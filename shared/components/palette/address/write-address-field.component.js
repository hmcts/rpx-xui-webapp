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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var core_1 = require("@angular/core");
var write_complex_field_component_1 = require("../complex/write-complex-field.component");
var address_model_1 = require("../../../domain/addresses/address.model");
var address_option_model_1 = require("./address-option.model");
var addresses_service_1 = require("../../../services/addresses/addresses.service");
var forms_1 = require("@angular/forms");
var is_compound_pipe_1 = require("../utils/is-compound.pipe");
var focus_element_1 = require("../../../directives/focus-element");
var WriteAddressFieldComponent = /** @class */ (function (_super) {
    __extends(WriteAddressFieldComponent, _super);
    function WriteAddressFieldComponent(addressesService, isCompoundPipe) {
        var _this = _super.call(this) || this;
        _this.isCompoundPipe = isCompoundPipe;
        _this.addressFormGroup = new forms_1.FormGroup({});
        _this.missingPostcode = false;
        _this.addressesService = addressesService;
        return _this;
    }
    WriteAddressFieldComponent.prototype.ngOnInit = function () {
        if (!this.isComplexWithHiddenFields()) {
            this.postcode = new forms_1.FormControl('');
            this.addressFormGroup.addControl('postcode', this.postcode);
            this.addressList = new forms_1.FormControl('');
            this.addressFormGroup.addControl('address', this.addressList);
        }
    };
    WriteAddressFieldComponent.prototype.findAddress = function () {
        var _this = this;
        if (!this.postcode.value) {
            this.missingPostcode = true;
        }
        else {
            this.missingPostcode = false;
            var postcode_1 = this.postcode.value;
            this.caseField.value = null;
            this.addressOptions = new Array();
            this.addressesService.getAddressesForPostcode(postcode_1.replace(' ', '').toUpperCase()).subscribe(function (result) {
                result.forEach(function (address) {
                    _this.addressOptions.push(new address_option_model_1.AddressOption(address, null));
                });
                _this.addressOptions.unshift(new address_option_model_1.AddressOption(undefined, _this.defaultLabel(_this.addressOptions.length)));
            }, function (error) {
                console.log("An error occurred retrieving addresses for postcode " + postcode_1 + ". " + error);
                _this.addressOptions.unshift(new address_option_model_1.AddressOption(undefined, _this.defaultLabel(_this.addressOptions.length)));
            });
            this.addressList.setValue(undefined);
            this.refocusElement();
        }
    };
    WriteAddressFieldComponent.prototype.refocusElement = function () {
        if (this.focusElementDirectives && this.focusElementDirectives.length > 0) {
            this.focusElementDirectives.first.focus();
        }
    };
    WriteAddressFieldComponent.prototype.blankAddress = function () {
        this.caseField.value = new address_model_1.AddressModel();
        this.setFormValue();
    };
    WriteAddressFieldComponent.prototype.isComplexWithHiddenFields = function () {
        if (this.caseField.isComplex() && this.caseField.field_type.complex_fields
            && this.caseField.field_type.complex_fields.some(function (cf) { return cf.hidden === true; })) {
            return true;
        }
    };
    WriteAddressFieldComponent.prototype.shouldShowDetailFields = function () {
        if (this.isComplexWithHiddenFields()) {
            return true;
        }
        if (this.isExpanded) {
            return true;
        }
        if (!this.writeComplexFieldComponent || !this.writeComplexFieldComponent.complexGroup) {
            return false;
        }
        var address = this.writeComplexFieldComponent.complexGroup.value;
        var hasAddress = false;
        if (address) {
            Object.keys(address).forEach(function (key) {
                if (address[key] != null) {
                    hasAddress = true;
                }
            });
        }
        return hasAddress;
    };
    WriteAddressFieldComponent.prototype.addressSelected = function () {
        this.caseField.value = this.addressList.value;
        this.setFormValue();
    };
    WriteAddressFieldComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        var change = changes['caseField'];
        if (change) {
            this.setFormValue();
        }
    };
    WriteAddressFieldComponent.prototype.buildIdPrefix = function (elementId) {
        return this.idPrefix + "_" + elementId;
    };
    WriteAddressFieldComponent.prototype.defaultLabel = function (numberOfAddresses) {
        return numberOfAddresses === 0 ? 'No address found'
            : numberOfAddresses + (numberOfAddresses === 1 ? ' address ' : ' addresses ') + 'found';
    };
    WriteAddressFieldComponent.prototype.setFormValue = function () {
        if (this.writeComplexFieldComponent.complexGroup) {
            this.writeComplexFieldComponent.complexGroup.setValue(this.caseField.value);
        }
    };
    __decorate([
        core_1.ViewChild('writeComplexFieldComponent'),
        __metadata("design:type", write_complex_field_component_1.WriteComplexFieldComponent)
    ], WriteAddressFieldComponent.prototype, "writeComplexFieldComponent", void 0);
    __decorate([
        core_1.ViewChildren(focus_element_1.FocusElementDirective),
        __metadata("design:type", core_1.QueryList)
    ], WriteAddressFieldComponent.prototype, "focusElementDirectives", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], WriteAddressFieldComponent.prototype, "formGroup", void 0);
    WriteAddressFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-address-field',
            template: "\n    <div class=\"form-group\" [id]=\"id()\">\n\n      <div *ngIf=\"!isComplexWithHiddenFields()\">\n        <h2 class=\"heading-h2\">{{caseField | ccdFieldLabel }}</h2>\n\n        <div class=\"form-group bottom-30 postcodeLookup\" [id]=\"createElementId('postcodeLookup')\" [ngClass]=\"{'form-group-error': missingPostcode}\" *ngIf=\"!isExpanded\">\n          <label [for]=\"createElementId('postcodeInput')\">\n            <span class=\"form-label\">Enter a UK postcode</span>\n          </label>\n          <span class=\"error-message\" *ngIf=\"missingPostcode\">Enter the Postcode</span>\n          <input type=\"text\" [ngClass]=\"{'govuk-input--error': missingPostcode}\"\n          [id]=\"createElementId('postcodeInput')\" name=\"postcode\" class=\"form-control postcodeinput inline-block\" [formControl]=\"postcode\">\n          <button type=\"button\" class=\"button button-30\" (click)=\"findAddress()\">Find address</button>\n        </div>\n\n        <div class=\"form-group\" *ngIf=\"addressOptions\" id=\"selectAddress\">\n          <label [for]=\"createElementId('addressList')\">\n            <span class=\"form-label\">Select an address</span>\n          </label>\n\n          <select class=\"form-control ccd-dropdown addressList\" [id]=\"createElementId('addressList')\" name=\"address\" [formControl]=\"addressList\" (change)=\"addressSelected()\" focusElement>\n            <option *ngFor=\"let addressOption of addressOptions\" [ngValue]=\"addressOption.value\">\n              {{addressOption.description}}\n            </option>\n          </select>\n        </div>\n\n        <a class=\"manual-link bottom-30\" *ngIf=\"!shouldShowDetailFields()\" (click)=\"blankAddress()\" href=\"javascript:void(0)\">I can't enter a UK postcode</a>\n      </div>\n\n      <ccd-write-complex-type-field\n        [hidden]=\"!shouldShowDetailFields()\"\n        [caseField]=\"caseField\"\n        [renderLabel]=\"false\"\n        [parent]=\"parent\"\n        [formGroup]=\"formGroup\"\n        [ignoreMandatory]=\"true\"\n        [idPrefix]=\"buildIdPrefix('detail')\"\n        #writeComplexFieldComponent>\n      </ccd-write-complex-type-field>\n    </div>\n  ",
            styles: ["\n    .manual-link{cursor:pointer;display:block;text-decoration:underline}\n  "]
        }),
        __metadata("design:paramtypes", [addresses_service_1.AddressesService, is_compound_pipe_1.IsCompoundPipe])
    ], WriteAddressFieldComponent);
    return WriteAddressFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteAddressFieldComponent = WriteAddressFieldComponent;
//# sourceMappingURL=write-address-field.component.js.map