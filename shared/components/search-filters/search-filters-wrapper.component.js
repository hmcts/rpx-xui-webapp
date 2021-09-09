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
var services_1 = require("../../services");
var access_types_model_1 = require("../../domain/case-view/access-types.model");
var SearchFiltersWrapperComponent = /** @class */ (function () {
    function SearchFiltersWrapperComponent(definitionsService) {
        this.definitionsService = definitionsService;
        this.onApply = new core_1.EventEmitter();
        this.onReset = new core_1.EventEmitter();
        this.onJurisdiction = new core_1.EventEmitter();
    }
    SearchFiltersWrapperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isVisible = false;
        this.definitionsService.getJurisdictions(access_types_model_1.READ_ACCESS)
            .subscribe(function (jurisdictions) {
            _this.isVisible = true;
            _this.jurisdictions = jurisdictions;
        });
    };
    SearchFiltersWrapperComponent.prototype.onWrapperApply = function (value) {
        this.onApply.emit(value);
    };
    SearchFiltersWrapperComponent.prototype.onWrapperReset = function (value) {
        this.onReset.emit(value);
    };
    SearchFiltersWrapperComponent.prototype.onWrapperJurisdiction = function (value) {
        this.onJurisdiction.emit(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SearchFiltersWrapperComponent.prototype, "autoApply", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchFiltersWrapperComponent.prototype, "onApply", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchFiltersWrapperComponent.prototype, "onReset", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchFiltersWrapperComponent.prototype, "onJurisdiction", void 0);
    SearchFiltersWrapperComponent = __decorate([
        core_1.Component({
            selector: 'ccd-search-filters-wrapper',
            template: "\n      <ccd-search-filters\n          *ngIf=\"isVisible\"\n          [jurisdictions]=\"jurisdictions\"\n          [autoApply]=\"autoApply\"\n          (onApply)=\"onWrapperApply($event)\"\n          (onReset)=\"onWrapperReset($event)\"\n          (onJuridiction)=\"onWrapperJurisdiction($event)\"\n      ></ccd-search-filters>\n    ",
        }),
        __metadata("design:paramtypes", [services_1.DefinitionsService])
    ], SearchFiltersWrapperComponent);
    return SearchFiltersWrapperComponent;
}());
exports.SearchFiltersWrapperComponent = SearchFiltersWrapperComponent;
//# sourceMappingURL=search-filters-wrapper.component.js.map