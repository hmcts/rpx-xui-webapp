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
var class_transformer_1 = require("class-transformer");
var definition_1 = require("../../../domain/definition");
var form_1 = require("../../../services/form");
var palette_service_1 = require("../palette.service");
var abstract_field_write_component_1 = require("./abstract-field-write.component");
var FIX_CASEFIELD_FOR = ['FixedList', 'DynamicList'];
var FieldWriteComponent = /** @class */ (function (_super) {
    __extends(FieldWriteComponent, _super);
    function FieldWriteComponent(resolver, paletteService) {
        var _this = _super.call(this) || this;
        _this.resolver = resolver;
        _this.paletteService = paletteService;
        // EUI-3267. Flag for whether or not this can have a grey bar.
        _this.canHaveGreyBar = false;
        _this.caseFields = [];
        return _this;
    }
    FieldWriteComponent.prototype.addValidators = function (caseField, control) {
        form_1.FormValidatorsService.addValidators(caseField, control);
    };
    FieldWriteComponent.prototype.ngOnInit = function () {
        var componentClass = this.paletteService.getFieldComponentClass(this.caseField, true);
        var injector = core_1.Injector.create([], this.fieldContainer.parentInjector);
        var component = this.resolver.resolveComponentFactory(componentClass).create(injector);
        // Only Fixed list use plainToClassFromExist
        // Better performance
        // TODO AW 30/12/20 figure out why FixedLists need plainToClassFromExist
        // Added a check to make sure it's NOT already a CaseField and then
        // assigning it back to this.caseField so we don't create separation.
        if (FIX_CASEFIELD_FOR.indexOf(this.caseField.field_type.type) > -1 && !(this.caseField instanceof definition_1.CaseField)) {
            this.caseField = class_transformer_1.plainToClassFromExist(new definition_1.CaseField(), this.caseField);
        }
        component.instance['caseField'] = this.caseField;
        component.instance['caseFields'] = this.caseFields;
        component.instance['formGroup'] = this.formGroup;
        component.instance['parent'] = this.parent;
        component.instance['idPrefix'] = this.idPrefix;
        if (this.caseField.field_type.id === 'AddressGlobal') {
            component.instance['ignoreMandatory'] = true;
        }
        component.instance['isExpanded'] = this.isExpanded;
        component.instance['isInSearchBlock'] = this.isInSearchBlock;
        this.fieldContainer.insert(component.hostView);
        // EUI-3267.
        // Set up the flag for whether this can have a grey bar.
        this.canHaveGreyBar = this.caseField.show_condition && this.caseField.field_type.type !== 'Collection';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FieldWriteComponent.prototype, "caseFields", void 0);
    __decorate([
        core_1.ViewChild('fieldContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], FieldWriteComponent.prototype, "fieldContainer", void 0);
    FieldWriteComponent = __decorate([
        core_1.Component({
            selector: 'ccd-field-write',
            template: "\n    <div [hidden]=\"caseField.hidden\" [class.grey-bar]=\"canHaveGreyBar && !caseField.hiddenCannotChange\">\n      <ng-container #fieldContainer></ng-container>\n    </div>\n  ",
            styles: ["\n    .form :host::ng-deep .grey-bar>*>.form-group,.form :host::ng-deep .grey-bar>*>dl.case-field{margin-left:15px;padding-left:15px}.form :host::ng-deep .grey-bar>*>.form-group:not(.form-group-error),.form :host::ng-deep .grey-bar>*>dl.case-field:not(.form-group-error){border-left:solid 5px #b1b4b6}.form :host::ng-deep .grey-bar>*>.form-group input:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group select:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group textarea:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field input:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field select:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field textarea:not(.inline-block){display:block}\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            palette_service_1.PaletteService])
    ], FieldWriteComponent);
    return FieldWriteComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.FieldWriteComponent = FieldWriteComponent;
//# sourceMappingURL=field-write.component.js.map