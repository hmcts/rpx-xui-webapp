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
var FocusElementDirective = /** @class */ (function () {
    function FocusElementDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    FocusElementDirective.prototype.ngAfterContentInit = function () {
        this.focus();
    };
    FocusElementDirective.prototype.focus = function () {
        if (this.el.nativeElement) {
            var focusElement = this.renderer.selectRootElement(this.el.nativeElement, true);
            if (focusElement) {
                focusElement.focus();
            }
        }
    };
    FocusElementDirective = __decorate([
        core_1.Directive({
            selector: '[focusElement]'
        })
        /**
         * Focuses the host element after the content of the view has been initialised. Works on writable fields. If the
         * directive is used on more than one element, the last element to be initialised will be in focus.
         * NOTE:
         * The directive focuses on the element only for the very first time when the content into the component's view, the
         * view that the directive is in is initialised. Refocusing the element will require explicit focusing for e.g. by
         * calling this directives focus() method from the host component.
         */
        ,
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], FocusElementDirective);
    return FocusElementDirective;
}());
exports.FocusElementDirective = FocusElementDirective;
//# sourceMappingURL=focus-element.directive.js.map