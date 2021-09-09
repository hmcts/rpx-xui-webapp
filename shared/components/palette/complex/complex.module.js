"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var conditional_show_1 = require("../../../directives/conditional-show");
var markdown_1 = require("../../markdown");
var base_field_1 = require("../base-field");
var case_link_module_1 = require("../case-link/case-link.module");
var utils_1 = require("../utils");
var ccd_read_fields_filter_pipe_1 = require("./ccd-read-fields-filter.pipe");
var ccd_tab_fields_pipe_1 = require("./ccd-tab-fields.pipe");
var cdd_page_fields_pipe_1 = require("./cdd-page-fields.pipe");
var fields_filter_pipe_1 = require("./fields-filter.pipe");
var read_complex_field_collection_table_component_1 = require("./read-complex-field-collection-table.component");
var read_complex_field_raw_component_1 = require("./read-complex-field-raw.component");
var read_complex_field_table_component_1 = require("./read-complex-field-table.component");
var read_complex_field_component_1 = require("./read-complex-field.component");
var write_complex_field_component_1 = require("./write-complex-field.component");
var ccd_cyapage_label_filter_pipe_1 = require("./ccd-cyapage-label-filter.pipe");
var ComplexModule = /** @class */ (function () {
    function ComplexModule() {
    }
    ComplexModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                markdown_1.MarkdownModule,
                case_link_module_1.CaseLinkModule,
                base_field_1.BaseFieldModule,
                utils_1.PaletteUtilsModule,
                conditional_show_1.ConditionalShowModule
            ],
            providers: [
                utils_1.IsCompoundPipe,
            ],
            declarations: [
                fields_filter_pipe_1.FieldsFilterPipe,
                ccd_tab_fields_pipe_1.CcdTabFieldsPipe,
                cdd_page_fields_pipe_1.CcdPageFieldsPipe,
                ccd_read_fields_filter_pipe_1.ReadFieldsFilterPipe,
                read_complex_field_component_1.ReadComplexFieldComponent,
                write_complex_field_component_1.WriteComplexFieldComponent,
                read_complex_field_raw_component_1.ReadComplexFieldRawComponent,
                read_complex_field_table_component_1.ReadComplexFieldTableComponent,
                read_complex_field_collection_table_component_1.ReadComplexFieldCollectionTableComponent,
                ccd_cyapage_label_filter_pipe_1.CcdCYAPageLabelFilterPipe,
            ],
            entryComponents: [
                read_complex_field_component_1.ReadComplexFieldComponent,
                write_complex_field_component_1.WriteComplexFieldComponent,
            ],
            exports: [
                cdd_page_fields_pipe_1.CcdPageFieldsPipe,
                fields_filter_pipe_1.FieldsFilterPipe,
                ccd_tab_fields_pipe_1.CcdTabFieldsPipe,
                ccd_read_fields_filter_pipe_1.ReadFieldsFilterPipe,
                write_complex_field_component_1.WriteComplexFieldComponent,
                ccd_cyapage_label_filter_pipe_1.CcdCYAPageLabelFilterPipe
            ]
        })
    ], ComplexModule);
    return ComplexModule;
}());
exports.ComplexModule = ComplexModule;
//# sourceMappingURL=complex.module.js.map