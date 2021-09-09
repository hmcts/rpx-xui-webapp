"use strict";
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
var case_field_model_1 = require("../../domain/definition/case-field.model");
var conditional_show_model_1 = require("./domain/conditional-show.model");
var fields_utils_1 = require("../../services/fields/fields.utils");
var conditional_show_registrar_service_1 = require("./services/conditional-show-registrar.service");
var grey_bar_service_1 = require("./services/grey-bar.service");
var operators_1 = require("rxjs/operators");
var ConditionalShowDirective = /** @class */ (function () {
    function ConditionalShowDirective(el, fieldsUtils, registry, renderer, greyBarService) {
        this.el = el;
        this.fieldsUtils = fieldsUtils;
        this.registry = registry;
        this.renderer = renderer;
        this.greyBarService = greyBarService;
        this.contextFields = [];
        this.greyBarEnabled = false;
    }
    ConditionalShowDirective.prototype.ngAfterViewInit = function () {
        // Ensure this.caseField is actually a CaseField instance even if instantiated with {}
        // this.caseField = FieldsUtils.convertToCaseField(this.caseField);
        if (this.caseField.show_condition) {
            this.condition = conditional_show_model_1.ShowCondition.getInstance(this.caseField.show_condition);
            this.formGroup = this.formGroup || new forms_1.FormGroup({});
            this.complexFormGroup = this.complexFormGroup || new forms_1.FormGroup({});
            this.formField = this.complexFormGroup.get(this.caseField.id) || this.formGroup.get(this.caseField.id);
            this.updateVisibility(this.getCurrentPagesReadOnlyAndFormFieldValues());
            if (this.greyBarEnabled && this.greyBarService.wasToggledToShow(this.caseField.id)) {
                this.greyBarService.showGreyBar(this.caseField, this.el);
            }
            this.subscribeToFormChanges();
            this.registry.register(this);
        }
    };
    ConditionalShowDirective.prototype.refreshVisibility = function () {
        this.updateVisibility(this.getCurrentPagesReadOnlyAndFormFieldValues(), true);
        this.subscribeToFormChanges();
    };
    ConditionalShowDirective.prototype.ngOnDestroy = function () {
        this.unsubscribeFromFormChanges();
    };
    ConditionalShowDirective.prototype.subscribeToFormChanges = function () {
        var _this = this;
        this.unsubscribeFromFormChanges();
        this.formChangesSubscription = this.formGroup
            .valueChanges
            .pipe(operators_1.debounceTime(200))
            .subscribe(function (_) {
            var shown = _this.updateVisibility(_this.getCurrentPagesReadOnlyAndFormFieldValues());
            if (_this.greyBarEnabled && shown !== undefined) {
                _this.updateGreyBar(shown);
            }
        });
    };
    /**
     * returns whether the field visibility has changed, or undefined if not
     */
    ConditionalShowDirective.prototype.updateVisibility = function (fields, forced) {
        if (forced === void 0) { forced = false; }
        if (this.shouldToggleToHide(fields, forced)) {
            this.onHide();
            return false;
        }
        else if (this.shouldToggleToShow(fields)) {
            this.onShow();
            return true;
        }
    };
    ConditionalShowDirective.prototype.onHide = function () {
        if (this.formField) {
            this.unsubscribeFromFormChanges();
            this.formField.disable({ emitEvent: false });
            this.subscribeToFormChanges();
        }
        this.hideField();
        this.greyBarService.removeGreyBar(this.el);
    };
    ConditionalShowDirective.prototype.onShow = function () {
        if (this.formField) {
            this.unsubscribeFromFormChanges();
            this.formField.enable({ emitEvent: false });
            this.subscribeToFormChanges();
        }
        this.showField();
        if (this.formField) {
            this.checkHideShowCondition(this.caseField.id, this.formField);
        }
    };
    ConditionalShowDirective.prototype.hideField = function () {
        this.el.nativeElement.hidden = true;
    };
    ConditionalShowDirective.prototype.showField = function () {
        this.el.nativeElement.hidden = false;
    };
    ConditionalShowDirective.prototype.shouldToggleToHide = function (fields, forced) {
        return (!this.isHidden() || forced) && !this.condition.match(fields, this.buildPath());
    };
    ConditionalShowDirective.prototype.shouldToggleToShow = function (fields) {
        return this.isHidden() && this.condition.match(fields, this.buildPath());
    };
    ConditionalShowDirective.prototype.buildPath = function () {
        if (this.idPrefix) {
            return this.idPrefix + this.caseField.id;
        }
        return this.caseField.id;
    };
    ConditionalShowDirective.prototype.getCurrentPagesReadOnlyAndFormFieldValues = function () {
        var formFields = this.getFormFieldsValuesIncludingDisabled();
        return this.fieldsUtils.mergeCaseFieldsAndFormFields(this.contextFields, formFields);
    };
    ConditionalShowDirective.prototype.getFormFieldsValuesIncludingDisabled = function () {
        if (this.formGroupRawValue) {
            return this.formGroupRawValue;
        }
        this.formGroupRawValue = this.formGroup.getRawValue();
        return this.formGroupRawValue;
    };
    ConditionalShowDirective.prototype.isHidden = function () {
        return this.el.nativeElement.hidden;
    };
    ConditionalShowDirective.prototype.unsubscribeFromFormChanges = function () {
        if (this.formChangesSubscription) {
            this.formChangesSubscription.unsubscribe();
        }
    };
    // TODO This must be extracted to a generic service for traversing see RDM-2233
    ConditionalShowDirective.prototype.checkHideShowCondition = function (key, aControl) {
        var _this = this;
        if (aControl instanceof forms_1.FormArray) { // We're in a collection
            aControl.controls.forEach(function (formControl, i) {
                _this.checkHideShowCondition('' + i, formControl);
            });
        }
        else if (aControl instanceof forms_1.FormGroup) {
            if (aControl.get('value')) { // Complex Field
                var complexControl_1 = aControl.get('value');
                Object.keys(complexControl_1.controls).forEach(function (controlKey) {
                    _this.checkHideShowCondition(controlKey, complexControl_1.get(controlKey));
                });
            }
            else if (aControl.controls) { // Special Field like AddressUK, AddressGlobal
                Object.keys(aControl.controls).forEach(function (controlKey) {
                    _this.checkHideShowCondition(controlKey, aControl.get(controlKey));
                });
            }
        }
        else if (aControl instanceof forms_1.FormControl) { // FormControl
            if (aControl.invalid) {
                this.registry.refresh();
            }
        }
    };
    ConditionalShowDirective.prototype.updateGreyBar = function (shown) {
        if (shown) {
            this.greyBarService.addToggledToShow(this.caseField.id);
            this.greyBarService.showGreyBar(this.caseField, this.el);
        }
        else {
            this.greyBarService.removeToggledToShow(this.caseField.id);
            this.greyBarService.removeGreyBar(this.el);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", case_field_model_1.CaseField)
    ], ConditionalShowDirective.prototype, "caseField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConditionalShowDirective.prototype, "idPrefix", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ConditionalShowDirective.prototype, "contextFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], ConditionalShowDirective.prototype, "formGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ConditionalShowDirective.prototype, "greyBarEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], ConditionalShowDirective.prototype, "complexFormGroup", void 0);
    ConditionalShowDirective = __decorate([
        core_1.Directive({ selector: '[ccdConditionalShow]' })
        /** Hides and shows the host element based on the show condition if the condition is not empty. Works on read only fields and form fields.
         *  The show condition is evaluated on all the fields of the page. i.e. read only and form fields. When a form field is hidden, if its
         *  initial value was changed then the field is cleared. Otherwise the original value is kept and will display next time the field is
         *  shown. Evaluation of the show condition includes disabled fields, which can be on their initial value or empty. Executes on the
         *  host field initialization and when any field of the form changes.
         *  Collaborates with the GreyBarService to show a vertical grey bar when a field initially hidden on the page is shown. When returning
         *  to the page after the page has been left, the grey bar has to be redisplayed. If instead on initial page load the field renders as
         *  initially shown, the grey bar is not displayed.
         */
        ,
        __metadata("design:paramtypes", [core_1.ElementRef,
            fields_utils_1.FieldsUtils,
            conditional_show_registrar_service_1.ConditionalShowRegistrarService,
            core_1.Renderer2,
            grey_bar_service_1.GreyBarService])
    ], ConditionalShowDirective);
    return ConditionalShowDirective;
}());
exports.ConditionalShowDirective = ConditionalShowDirective;
//# sourceMappingURL=conditional-show.directive.js.map