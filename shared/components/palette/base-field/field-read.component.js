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
var class_transformer_1 = require("class-transformer");
var case_field_model_1 = require("../../../domain/definition/case-field.model");
var palette_service_1 = require("../palette.service");
var abstract_field_read_component_1 = require("./abstract-field-read.component");
var FIX_CASEFIELD_FOR = ['FixedList', 'DynamicList'];
var FieldReadComponent = /** @class */ (function (_super) {
    __extends(FieldReadComponent, _super);
    function FieldReadComponent(resolver, paletteService) {
        var _this = _super.call(this) || this;
        _this.resolver = resolver;
        _this.paletteService = paletteService;
        _this.withLabel = false;
        _this.formGroup = new forms_1.FormGroup({});
        _this.caseFields = [];
        return _this;
    }
    FieldReadComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Ensure all field values are resolved by label interpolation before the component is fully initialised.
        Promise.resolve(null).then(function () {
            var componentClass = _this.paletteService.getFieldComponentClass(_this.caseField, false);
            var injector = core_1.Injector.create([], _this.fieldContainer.parentInjector);
            var component = _this.resolver.resolveComponentFactory(componentClass).create(injector);
            // Provide component @Inputs
            // Only Fixed list use plainToClassFromExist
            // Better performance
            // TODO AW 30/12/20 figure out why FixedLists need plainToClassFromExist
            // Added a check to make sure it's NOT already a CaseField and then
            // assigning it back to this.caseField so we don't create separation.
            if (FIX_CASEFIELD_FOR.indexOf(_this.caseField.field_type.type) > -1 && !(_this.caseField instanceof case_field_model_1.CaseField)) {
                _this.caseField = class_transformer_1.plainToClassFromExist(new case_field_model_1.CaseField(), _this.caseField);
            }
            component.instance['caseField'] = _this.caseField;
            component.instance['caseFields'] = _this.caseFields;
            component.instance['formGroup'] = _this.formGroup;
            component.instance['topLevelFormGroup'] = _this.topLevelFormGroup;
            component.instance['idPrefix'] = _this.idPrefix;
            component.instance['parent'] = _this.parent;
            component.instance['caseReference'] = _this.caseReference;
            component.instance['context'] = _this.context;
            _this.fieldContainer.insert(component.hostView);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FieldReadComponent.prototype, "withLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], FieldReadComponent.prototype, "formGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FieldReadComponent.prototype, "caseFields", void 0);
    __decorate([
        core_1.ViewChild('fieldContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], FieldReadComponent.prototype, "fieldContainer", void 0);
    FieldReadComponent = __decorate([
        core_1.Component({
            selector: 'ccd-field-read',
            template: "\n    <div [hidden]=\"caseField.hidden\">\n      <ccd-field-read-label [formGroup]=\"formGroup\" [topLevelFormGroup]=\"topLevelFormGroup\" [caseField]=\"caseField\" [withLabel]=\"withLabel\">\n        <ng-container #fieldContainer></ng-container>\n      </ccd-field-read-label>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, palette_service_1.PaletteService])
    ], FieldReadComponent);
    return FieldReadComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.FieldReadComponent = FieldReadComponent;
//# sourceMappingURL=field-read.component.js.map