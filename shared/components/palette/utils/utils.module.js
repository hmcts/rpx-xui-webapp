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
var date_pipe_1 = require("./date.pipe");
var first_error_pipe_1 = require("./first-error.pipe");
var field_label_pipe_1 = require("./field-label.pipe");
var is_compound_pipe_1 = require("./is-compound.pipe");
var is_read_only_pipe_1 = require("./is-read-only.pipe");
var is_mandatory_pipe_1 = require("./is-mandatory.pipe");
var dash_pipe_1 = require("./dash.pipe");
var is_read_only_and_not_collection_pipe_1 = require("./is-read-only-and-not-collection.pipe");
var PaletteUtilsModule = /** @class */ (function () {
    function PaletteUtilsModule() {
    }
    PaletteUtilsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                date_pipe_1.DatePipe,
                field_label_pipe_1.FieldLabelPipe,
                first_error_pipe_1.FirstErrorPipe,
                is_compound_pipe_1.IsCompoundPipe,
                is_mandatory_pipe_1.IsMandatoryPipe,
                is_read_only_pipe_1.IsReadOnlyPipe,
                is_read_only_and_not_collection_pipe_1.IsReadOnlyAndNotCollectionPipe,
                dash_pipe_1.DashPipe,
            ],
            exports: [
                date_pipe_1.DatePipe,
                field_label_pipe_1.FieldLabelPipe,
                first_error_pipe_1.FirstErrorPipe,
                is_compound_pipe_1.IsCompoundPipe,
                is_mandatory_pipe_1.IsMandatoryPipe,
                is_read_only_pipe_1.IsReadOnlyPipe,
                is_read_only_and_not_collection_pipe_1.IsReadOnlyAndNotCollectionPipe,
                dash_pipe_1.DashPipe,
            ]
        })
    ], PaletteUtilsModule);
    return PaletteUtilsModule;
}());
exports.PaletteUtilsModule = PaletteUtilsModule;
//# sourceMappingURL=utils.module.js.map