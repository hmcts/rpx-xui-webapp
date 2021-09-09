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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var ngx_scroll_to_1 = require("@nicky-lenaers/ngx-scroll-to");
var class_transformer_1 = require("class-transformer");
var operators_1 = require("rxjs/operators");
var case_field_model_1 = require("../../../domain/definition/case-field.model");
var services_1 = require("../../../services");
var form_validators_service_1 = require("../../../services/form/form-validators.service");
var remove_dialog_component_1 = require("../../dialogs/remove-dialog/remove-dialog.component");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var WriteCollectionFieldComponent = /** @class */ (function (_super) {
    __extends(WriteCollectionFieldComponent, _super);
    function WriteCollectionFieldComponent(dialog, scrollToService, profileNotifier) {
        var _this = _super.call(this) || this;
        _this.dialog = dialog;
        _this.scrollToService = scrollToService;
        _this.profileNotifier = profileNotifier;
        _this.caseFields = [];
        _this.collItems = [];
        return _this;
    }
    WriteCollectionFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.isExpanded) { // meaning I am not rendered on the search/workbasket input filter
            this.profileSubscription = this.profileNotifier.profile.subscribe(function (_) { return _this.profile = _; });
        }
        this.caseField.value = this.caseField.value || [];
        this.formArray = this.registerControl(new forms_1.FormArray([]), true);
        this.formArray['caseField'] = this.caseField;
        this.caseField.value.forEach(function (item, index) {
            var prefix = _this.buildIdPrefix(index);
            var caseField = _this.buildCaseField(item, index);
            var container = _this.getContainer(index);
            if (_this.collItems.length <= index) {
                _this.collItems.length = index + 1;
            }
            _this.collItems[index] = { caseField: caseField, item: item, prefix: prefix, index: index, container: container };
        });
    };
    WriteCollectionFieldComponent.prototype.ngOnDestroy = function () {
        if (typeof this.profileSubscription !== 'undefined') {
            this.profileSubscription.unsubscribe();
        }
    };
    WriteCollectionFieldComponent.prototype.buildCaseField = function (item, index, isNew) {
        if (isNew === void 0) { isNew = false; }
        /**
         * What follow is code that makes me want to go jump in the shower!
         * Basically, we land in here repeatedly because of the binding, and
         * this is what appears to be happening:
         *   1. this.formArray contains no controls at all.
         *      this.formArray.value = [];
         *   2. this.formArray contains a FormGroup, which contains a single
         *      FormControl with the id 'code'.
         *      this.formArray.value = [{ code: null }]
         *   3. this.formArray contains what is being set up below.
         *      this.formArray.value = [{ code: null, id: null, value: { code: null } }]
         *   4, 5, 6, etc - the same as 3.
         */
        var group;
        if (this.formArray && (index < this.formArray.length)) {
            group = this.formArray.at(index);
        }
        else {
            group = new forms_1.FormGroup({});
        }
        var value;
        if (this.isCollectionOfSimpleType(this.caseField)) {
            value = group.get('value');
            if (!value) {
                value = new forms_1.FormControl(item.value);
                // Now add the value FormControl to the outer group.
                group.addControl('value', value);
            }
        }
        else {
            value = group.get('value');
            if (!value) {
                value = new forms_1.FormGroup({});
                for (var _i = 0, _a = Object.keys(group.controls); _i < _a.length; _i++) {
                    var key = _a[_i];
                    value.addControl(key, group.get(key));
                    // DON'T remove the control for this key from the outer group or it
                    // goes awry. So DON'T uncomment the below line!
                    // group.removeControl(key);
                }
                // Now add the value FormGroup to the outer group.
                group.addControl('value', value);
            }
        }
        var id = group.get('id');
        // If we're not in scenario 3, above, we need to do some jiggery pokery
        // and set up the id and value controls.
        // Also set up an id control if it doesn't yet exist.
        if (!id) {
            id = new forms_1.FormControl(item.id);
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
        var cfid;
        if (value instanceof forms_1.FormControl) {
            cfid = 'value';
        }
        else {
            cfid = index.toString();
        }
        // isNew:
        var cf = this.newCaseField(cfid, item, index, isNew);
        form_validators_service_1.FormValidatorsService.addValidators(cf, value);
        services_1.FieldsUtils.addCaseFieldAndComponentReferences(value, cf, this);
        return cf;
    };
    WriteCollectionFieldComponent.prototype.newCaseField = function (id, item, index, isNew) {
        if (isNew === void 0) { isNew = false; }
        var isNotAuthorisedToUpdate = !isNew && this.isNotAuthorisedToUpdate(index);
        var fieldType = class_transformer_1.plainToClassFromExist(new case_field_model_1.FieldType(), this.caseField.field_type.collection_field_type);
        if (fieldType.complex_fields) {
            fieldType.complex_fields
                .filter(function (cf) { return !!cf.show_condition; })
                .map(function (cf) { return cf.hidden = true; });
        }
        // Remove the bit setting the hidden flag here as it's an item in the array and
        // its hidden state isn't independently re-evaluated when the form is changed.
        return class_transformer_1.plainToClassFromExist(new case_field_model_1.CaseField(), {
            id: id,
            field_type: fieldType,
            display_context: isNotAuthorisedToUpdate ? 'READONLY' : this.caseField.display_context,
            value: item.value,
            label: null,
            acls: this.caseField.acls
        });
    };
    WriteCollectionFieldComponent.prototype.buildIdPrefix = function (index) {
        var prefix = "" + this.idPrefix + this.caseField.id + "_";
        if (this.caseField.field_type.collection_field_type.type === 'Complex') {
            return "" + prefix + index + "_";
        }
        return prefix;
    };
    WriteCollectionFieldComponent.prototype.getContainer = function (index) {
        var value = this.formArray.at(index).get('value');
        if (value instanceof forms_1.FormGroup) {
            return value;
        }
        else {
            return this.formArray.at(index);
        }
    };
    WriteCollectionFieldComponent.prototype.isSearchFilter = function () {
        return this.isInSearchBlock && this.collItems.length > 0;
    };
    WriteCollectionFieldComponent.prototype.addItem = function (doScroll) {
        var _this = this;
        // Manually resetting errors is required to prevent `ExpressionChangedAfterItHasBeenCheckedError`
        this.formArray.setErrors(null);
        var item = { value: null };
        this.caseField.value.push(item);
        var index = this.caseField.value.length - 1;
        var caseField = this.buildCaseField(item, index, true);
        var prefix = this.buildIdPrefix(index);
        var container = this.getContainer(index);
        this.collItems.push({ caseField: caseField, item: item, index: index, prefix: prefix, container: container });
        // Timeout is required for the collection item to be rendered before it can be scrolled to or focused.
        if (doScroll) {
            setTimeout(function () {
                _this.scrollToService.scrollTo({
                    target: "" + _this.buildIdPrefix(index) + index,
                    duration: 1000,
                    offset: -150,
                })
                    .pipe(operators_1.finalize(function () { return _this.focusLastItem(); }))
                    .subscribe(null, console.error);
            });
        }
        else {
            setTimeout(function () { return _this.focusLastItem(); });
        }
    };
    WriteCollectionFieldComponent.prototype.focusLastItem = function () {
        var item = this.items.last.nativeElement.querySelector('.form-control');
        if (item) {
            item.focus();
        }
    };
    WriteCollectionFieldComponent.prototype.removeItem = function (index) {
        this.collItems.splice(index, 1);
        this.caseField.value.splice(index, 1);
        this.formArray.removeAt(index);
    };
    WriteCollectionFieldComponent.prototype.itemLabel = function (index) {
        if (index) {
            return this.caseField.label + " " + (index + 1);
        }
        return this.caseField.label;
    };
    WriteCollectionFieldComponent.prototype.isNotAuthorisedToCreate = function () {
        if (this.isExpanded) {
            return false;
        }
        return !this.getCollectionPermission(this.caseField, 'allowInsert');
    };
    WriteCollectionFieldComponent.prototype.getCollectionPermission = function (field, type) {
        return field.display_context_parameter &&
            field.display_context_parameter.split('#')
                .filter(function (item) { return item.startsWith('COLLECTION('); })[0]
                .includes(type);
    };
    WriteCollectionFieldComponent.prototype.isNotAuthorisedToUpdate = function (index) {
        var _this = this;
        if (this.isExpanded) {
            return false;
        }
        // Was reassesed as part of EUI-3505. There is still a caveat around CRD, but that was deemed an unlikely scenario
        var id = this.getControlIdAt(index);
        if (id) {
            if (!!this.profile.user && !!this.profile.user.idam) {
                var updateRole = this.profile.user.idam.roles.find(function (role) { return _this.hasUpdateAccess(role); });
                return !updateRole;
            }
        }
        return false;
    };
    WriteCollectionFieldComponent.prototype.hasUpdateAccess = function (role) {
        return !!this.caseField.acls.find(function (acl) { return acl.role === role && acl.update === true; });
    };
    WriteCollectionFieldComponent.prototype.isNotAuthorisedToDelete = function (index) {
        if (this.isExpanded) {
            return false;
        }
        // Should be able to delete if creating a case even if "D" is absent, hence:
        var id = this.getControlIdAt(index);
        return !!id && !this.getCollectionPermission(this.caseField, 'allowDelete');
    };
    WriteCollectionFieldComponent.prototype.openModal = function (i) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.ariaLabel = 'Label';
        dialogConfig.height = '220px';
        dialogConfig.width = '550px';
        dialogConfig.panelClass = 'dialog';
        dialogConfig.closeOnNavigation = false;
        dialogConfig.position = {
            top: window.innerHeight / 2 - 110 + 'px', left: window.innerWidth / 2 - 275 + 'px'
        };
        var dialogRef = this.dialog.open(remove_dialog_component_1.RemoveDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'Remove') {
                _this.removeItem(i);
            }
        });
    };
    /**
     * Applied full solution as part of EUI-3505
     */
    WriteCollectionFieldComponent.prototype.getControlIdAt = function (index) {
        // this.formArray contains [ FormGroup( id: FormControl, value: FormGroup ), ... ].
        // Here, we need to get the value of the id FormControl.
        var group = this.formArray.at(index);
        var control = group.get('id');
        return control ? control.value : undefined;
    };
    WriteCollectionFieldComponent.prototype.isCollectionOfSimpleType = function (caseField) {
        var notSimple = ['Collection', 'Complex'];
        return notSimple.indexOf(caseField.field_type.collection_field_type.type) < 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WriteCollectionFieldComponent.prototype, "caseFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], WriteCollectionFieldComponent.prototype, "formGroup", void 0);
    __decorate([
        core_1.ViewChildren('collectionItem'),
        __metadata("design:type", core_1.QueryList)
    ], WriteCollectionFieldComponent.prototype, "items", void 0);
    WriteCollectionFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-collection-field',
            template: "\n    <div class=\"form-group\" [id]=\"id()\">\n\n      <div class=\"panel collection-indicator\">\n\n        <h2 class=\"heading-h2 error-spacing\">\n          {{caseField | ccdFieldLabel}}\n        </h2>\n        <button class=\"button\" type=\"button\" (click)=\"addItem(true)\" [disabled]=\"isNotAuthorisedToCreate() || isSearchFilter()\">Add new</button>\n        <h2 class=\"heading-h2 error-spacing\" *ngIf=\"caseField.hint_text || formArray.errors\">\n          <span *ngIf=\"caseField.hint_text\" class=\"form-hint\">{{caseField.hint_text}}</span>\n          <span *ngIf=\"formArray.errors\" class=\"error-message\">{{formArray.errors | ccdFirstError:caseField.label}}</span>\n        </h2>\n\n        <div class=\"form-group\" [hidden]=\"caseField.hidden\" *ngIf=\"caseField.value && caseField.value.length\">\n\n          <div class=\"form-group\" *ngFor=\"let item of collItems; let i = index\" #collectionItem>\n            <div class=\"collection-title\">\n              <div class=\"float-left\">\n                <label [for]=\"item.prefix + i\"><h3 class=\"heading-h3\">{{itemLabel(i)}}</h3></label>\n              </div>\n              <div class=\"float-right\">\n                <button class=\"button button-secondary\" type=\"button\" (click)=\"openModal(i)\"\n                        [disabled]=\"isNotAuthorisedToDelete(i)\"\n                        attr.aria-label=\"Remove {{ itemLabel(i) }}\">Remove</button>\n              </div>\n            </div>\n            <ccd-field-write [caseField]=\"item.caseField\"\n                             [caseFields]=\"caseFields\"\n                             [formGroup]=\"formGroup\"\n                             [parent]=\"item.container\"\n                             [idPrefix]=\"item.prefix\"\n                             [hidden]=\"item.caseField.hidden\"\n                             [isExpanded]=\"isExpanded\"\n                             [isInSearchBlock]=\"isInSearchBlock\">\n            </ccd-field-write>\n          </div>\n\n        </div>\n\n        <button class=\"button\" type=\"button\" (click)=\"addItem(false)\" [disabled]=\"isNotAuthorisedToCreate() || isSearchFilter()\" *ngIf=\"caseField.value && caseField.value.length\">Add new</button>\n\n      </div>\n\n    </div>\n  ",
            styles: ["\n    .collection-field-table tr:first-child>td{padding-top:0}.collection-field-table tr:last-child>td{border-bottom:none}.collection-field-table td.collection-actions{width:1px;white-space:nowrap}.error-spacing{margin-top:10px}.collection-title{height:51px}.float-left{float:left;padding-top:8px}.float-right{float:right}.complex-panel{margin:13px 0px;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px;border-bottom:1px solid #bfc1c3;font-weight:bold;display:block;color:#0b0c0c;padding-bottom:2px;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.31579}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}.collection-indicator{border-left:solid 5px #b1b4b6}\n  "]
        }),
        __metadata("design:paramtypes", [material_1.MatDialog,
            ngx_scroll_to_1.ScrollToService,
            services_1.ProfileNotifier])
    ], WriteCollectionFieldComponent);
    return WriteCollectionFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteCollectionFieldComponent = WriteCollectionFieldComponent;
//# sourceMappingURL=write-collection-field.component.js.map