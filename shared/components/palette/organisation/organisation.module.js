"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var utils_1 = require("../utils");
var read_organisation_field_table_component_1 = require("./read-organisation-field-table.component");
var write_organisation_field_component_1 = require("./write-organisation-field.component");
var complex_1 = require("../complex");
var markdown_1 = require("../../markdown");
var conditional_show_1 = require("../../../directives/conditional-show");
var focus_element_1 = require("../../../directives/focus-element");
var write_organisation_complex_field_component_1 = require("./write-organisation-complex-field.component");
var base_field_module_1 = require("../base-field/base-field.module");
var read_organisation_field_component_1 = require("./read-organisation-field.component");
var read_organisation_field_raw_component_1 = require("./read-organisation-field-raw.component");
var organisation_1 = require("../../../domain/organisation");
var organisation_2 = require("../../../services/organisation");
var window_1 = require("../../../services/window");
var OrganisationModule = /** @class */ (function () {
    function OrganisationModule() {
    }
    OrganisationModule = __decorate([
        core_1.NgModule({
            imports: [
                conditional_show_1.ConditionalShowModule,
                common_1.CommonModule,
                complex_1.ComplexModule,
                forms_1.ReactiveFormsModule,
                markdown_1.MarkdownModule,
                utils_1.PaletteUtilsModule,
                focus_element_1.FocusElementModule,
                base_field_module_1.BaseFieldModule
            ],
            declarations: [
                read_organisation_field_component_1.ReadOrganisationFieldComponent,
                read_organisation_field_table_component_1.ReadOrganisationFieldTableComponent,
                read_organisation_field_raw_component_1.ReadOrganisationFieldRawComponent,
                write_organisation_field_component_1.WriteOrganisationFieldComponent,
                write_organisation_complex_field_component_1.WriteOrganisationComplexFieldComponent
            ],
            exports: [
                read_organisation_field_component_1.ReadOrganisationFieldComponent,
                read_organisation_field_table_component_1.ReadOrganisationFieldTableComponent,
                read_organisation_field_raw_component_1.ReadOrganisationFieldRawComponent,
                write_organisation_field_component_1.WriteOrganisationFieldComponent,
                write_organisation_complex_field_component_1.WriteOrganisationComplexFieldComponent
            ],
            providers: [
                organisation_2.OrganisationService,
                organisation_1.OrganisationConverter,
                window_1.WindowService
            ]
        })
    ], OrganisationModule);
    return OrganisationModule;
}());
exports.OrganisationModule = OrganisationModule;
//# sourceMappingURL=organisation.module.js.map