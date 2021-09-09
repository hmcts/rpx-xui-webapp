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
/** Keeps track of initially hidden fields that toggle to show on the page (parent page).
 *  Used to decide whether to redisplay the grey bar when returning to the page during
 *  navigation between pages.
 */
var GreyBarService = /** @class */ (function () {
    function GreyBarService(rendererFactory) {
        this.fieldsToggledToShow = [];
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    GreyBarService.prototype.showGreyBar = function (field, el) {
        if (!field.isCollection()) {
            this.addGreyBar(el);
        }
    };
    GreyBarService.prototype.removeGreyBar = function (el) {
        var divSelector = el.nativeElement.querySelector('div');
        if (divSelector) {
            this.renderer.removeClass(divSelector, 'show-condition-grey-bar');
        }
    };
    GreyBarService.prototype.addToggledToShow = function (fieldId) {
        this.fieldsToggledToShow.push(fieldId);
    };
    GreyBarService.prototype.removeToggledToShow = function (fieldId) {
        this.fieldsToggledToShow = this.fieldsToggledToShow.filter(function (id) { return id !== fieldId; });
    };
    GreyBarService.prototype.wasToggledToShow = function (fieldId) {
        return this.fieldsToggledToShow.find(function (id) { return id === fieldId; }) !== undefined;
    };
    GreyBarService.prototype.reset = function () {
        this.fieldsToggledToShow = [];
    };
    GreyBarService.prototype.addGreyBar = function (el) {
        var divSelector = el.nativeElement.querySelector('div');
        if (divSelector) {
            this.renderer.addClass(divSelector, 'show-condition-grey-bar');
        }
    };
    GreyBarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.RendererFactory2])
    ], GreyBarService);
    return GreyBarService;
}());
exports.GreyBarService = GreyBarService;
//# sourceMappingURL=grey-bar.service.js.map