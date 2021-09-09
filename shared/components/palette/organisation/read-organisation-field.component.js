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
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var palette_context_enum_1 = require("../base-field/palette-context.enum");
var ReadOrganisationFieldComponent = /** @class */ (function (_super) {
    __extends(ReadOrganisationFieldComponent, _super);
    function ReadOrganisationFieldComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.caseFields = [];
        _this.paletteContext = palette_context_enum_1.PaletteContext;
        return _this;
    }
    ReadOrganisationFieldComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.caseField.display_context_parameter) {
            this.context = palette_context_enum_1.PaletteContext.TABLE_VIEW;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ReadOrganisationFieldComponent.prototype, "caseFields", void 0);
    ReadOrganisationFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-organisation-field',
            template: "\n    <ng-container [ngSwitch]=\"context\">\n      <ccd-read-organisation-field-raw\n        *ngSwitchCase=\"paletteContext.CHECK_YOUR_ANSWER\"\n        [caseField]=\"caseField\"\n        [context]=\"context\"\n      ></ccd-read-organisation-field-raw>\n      <ccd-read-organisation-field-table\n        *ngSwitchCase=\"paletteContext.TABLE_VIEW\"\n        [caseField]=\"caseField\"\n        [caseFields]=\"caseFields\"\n        [context]=\"context\"\n      ></ccd-read-organisation-field-table>\n      <ccd-read-organisation-field-table\n        *ngSwitchDefault\n        [caseField]=\"caseField\"\n        [caseFields]=\"caseFields\"\n        [context]=\"context\"\n      ></ccd-read-organisation-field-table>\n    </ng-container>\n  ",
        })
    ], ReadOrganisationFieldComponent);
    return ReadOrganisationFieldComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadOrganisationFieldComponent = ReadOrganisationFieldComponent;
//# sourceMappingURL=read-organisation-field.component.js.map