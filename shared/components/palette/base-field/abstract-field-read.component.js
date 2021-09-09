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
var abstract_form_field_component_1 = require("./abstract-form-field.component");
var palette_context_enum_1 = require("./palette-context.enum");
var AbstractFieldReadComponent = /** @class */ (function (_super) {
    __extends(AbstractFieldReadComponent, _super);
    function AbstractFieldReadComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Optional. Enable context-aware rendering of fields.
         */
        _this.context = palette_context_enum_1.PaletteContext.DEFAULT;
        return _this;
    }
    AbstractFieldReadComponent.prototype.ngOnInit = function () {
        if (!this.caseField.metadata) {
            this.registerControl(new forms_1.FormControl(this.caseField.value));
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AbstractFieldReadComponent.prototype, "caseReference", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], AbstractFieldReadComponent.prototype, "topLevelFormGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AbstractFieldReadComponent.prototype, "context", void 0);
    return AbstractFieldReadComponent;
}(abstract_form_field_component_1.AbstractFormFieldComponent));
exports.AbstractFieldReadComponent = AbstractFieldReadComponent;
//# sourceMappingURL=abstract-field-read.component.js.map