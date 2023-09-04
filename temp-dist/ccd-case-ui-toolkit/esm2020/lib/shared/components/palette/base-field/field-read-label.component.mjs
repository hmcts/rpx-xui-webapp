import { Component, Input } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../../domain/definition/case-field.model';
import { AbstractFieldReadComponent } from './abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
function FieldReadLabelComponent_dl_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function FieldReadLabelComponent_dl_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "dl", 3)(1, "dt", 4);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd", 5);
    i0.ɵɵtemplate(5, FieldReadLabelComponent_dl_1_ng_container_5_Template, 1, 0, "ng-container", 6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, ctx_r0.caseField.label));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", _r1);
} }
function FieldReadLabelComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0);
} }
const _c0 = ["*"];
export class FieldReadLabelComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        // EUI-3267. Flag for whether or not this can have a grey bar.
        this.canHaveGreyBar = false;
    }
    isLabel() {
        return this.caseField.field_type && this.caseField.field_type.type === 'Label';
    }
    isComplex() {
        return this.caseField.isComplex();
    }
    isCaseLink() {
        return this.caseField.isCaseLink();
    }
    ngOnChanges(changes) {
        const change = changes['caseField'];
        if (change) {
            const cfNew = change.currentValue;
            if (!(cfNew instanceof CaseField)) {
                this.fixCaseField();
            }
            // EUI-3267.
            // Set up the flag for whether this can have a grey bar.
            this.canHaveGreyBar = !!this.caseField.show_condition;
        }
    }
    fixCaseField() {
        if (this.caseField && !(this.caseField instanceof CaseField)) {
            this.caseField = plainToClassFromExist(new CaseField(), this.caseField);
        }
    }
}
FieldReadLabelComponent.ɵfac = /*@__PURE__*/ function () { let ɵFieldReadLabelComponent_BaseFactory; return function FieldReadLabelComponent_Factory(t) { return (ɵFieldReadLabelComponent_BaseFactory || (ɵFieldReadLabelComponent_BaseFactory = i0.ɵɵgetInheritedFactory(FieldReadLabelComponent)))(t || FieldReadLabelComponent); }; }();
FieldReadLabelComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FieldReadLabelComponent, selectors: [["ccd-field-read-label"]], inputs: { withLabel: "withLabel", markdownUseHrefAsRouterLink: "markdownUseHrefAsRouterLink" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0, decls: 4, vars: 5, consts: [[3, "hidden"], ["class", "case-field", 4, "ngIf", "ngIfElse"], ["caseFieldValue", ""], [1, "case-field"], [1, "case-field__label"], [1, "case-field__value"], [4, "ngTemplateOutlet"]], template: function FieldReadLabelComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, FieldReadLabelComponent_dl_1_Template, 6, 4, "dl", 1);
        i0.ɵɵtemplate(2, FieldReadLabelComponent_ng_template_2_Template, 1, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(3);
        i0.ɵɵclassProp("grey-bar", ctx.canHaveGreyBar && !ctx.caseField.hiddenCannotChange);
        i0.ɵɵproperty("hidden", ctx.caseField.hidden);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.withLabel && !ctx.isLabel() && (!ctx.isComplex() || ctx.isCaseLink()))("ngIfElse", _r1);
    } }, dependencies: [i1.NgIf, i1.NgTemplateOutlet, i2.RpxTranslatePipe], styles: [".case-field[_ngcontent-%COMP%]:after{content:\"\";display:block;clear:both}.case-field[_ngcontent-%COMP%]{box-sizing:border-box;margin-bottom:15px}@media (min-width: 641px){.case-field[_ngcontent-%COMP%]{margin-bottom:30px}}.case-field[_ngcontent-%COMP%]   .case-field__label[_ngcontent-%COMP%]{display:block;color:#0b0c0c;padding-bottom:2px;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.case-field[_ngcontent-%COMP%]   .case-field__label[_ngcontent-%COMP%]{font-size:19px;line-height:1.3157894737}}.case-field[_ngcontent-%COMP%]   .case-field__value[_ngcontent-%COMP%]{font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.case-field[_ngcontent-%COMP%]   .case-field__value[_ngcontent-%COMP%]{font-size:19px;line-height:1.3157894737}}.form   [_nghost-%COMP%]  .grey-bar>*>.form-group, .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group, .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field{margin-left:15px;padding-left:15px}.form   [_nghost-%COMP%]  .grey-bar>*>.form-group:not(.form-group-error), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group:not(.form-group-error), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field:not(.form-group-error){border-left:solid 5px #b1b4b6}.form   [_nghost-%COMP%]  .grey-bar>*>.form-group input:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>.form-group select:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>.form-group textarea:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group input:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group select:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group textarea:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field input:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field select:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field textarea:not(.inline-block){display:block}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldReadLabelComponent, [{
        type: Component,
        args: [{ selector: 'ccd-field-read-label', template: "<div [hidden]=\"caseField.hidden\" [class.grey-bar]=\"canHaveGreyBar && !caseField.hiddenCannotChange\">\n  <dl class=\"case-field\" *ngIf=\"withLabel && !isLabel() && (!isComplex() || isCaseLink()); else caseFieldValue\">\n    <dt class=\"case-field__label\">{{caseField.label | rpxTranslate}}</dt>\n    <dd class=\"case-field__value\">\n      <ng-container *ngTemplateOutlet=\"caseFieldValue\"></ng-container>\n    </dd>\n  </dl>\n  <ng-template #caseFieldValue>\n    <ng-content></ng-content>\n  </ng-template>\n</div>\n", styles: [".case-field:after{content:\"\";display:block;clear:both}.case-field{box-sizing:border-box;margin-bottom:15px}@media (min-width: 641px){.case-field{margin-bottom:30px}}.case-field .case-field__label{display:block;color:#0b0c0c;padding-bottom:2px;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.case-field .case-field__label{font-size:19px;line-height:1.3157894737}}.case-field .case-field__value{font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.case-field .case-field__value{font-size:19px;line-height:1.3157894737}}.form :host::ng-deep .grey-bar>*>.form-group,.form :host::ng-deep .grey-bar>*>*>.form-group,.form :host::ng-deep .grey-bar>*>dl.case-field{margin-left:15px;padding-left:15px}.form :host::ng-deep .grey-bar>*>.form-group:not(.form-group-error),.form :host::ng-deep .grey-bar>*>*>.form-group:not(.form-group-error),.form :host::ng-deep .grey-bar>*>dl.case-field:not(.form-group-error){border-left:solid 5px #b1b4b6}.form :host::ng-deep .grey-bar>*>.form-group input:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group select:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group textarea:not(.inline-block),.form :host::ng-deep .grey-bar>*>*>.form-group input:not(.inline-block),.form :host::ng-deep .grey-bar>*>*>.form-group select:not(.inline-block),.form :host::ng-deep .grey-bar>*>*>.form-group textarea:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field input:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field select:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field textarea:not(.inline-block){display:block}\n"] }]
    }], null, { withLabel: [{
            type: Input
        }], markdownUseHrefAsRouterLink: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcmVhZC1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9iYXNlLWZpZWxkL2ZpZWxkLXJlYWQtbGFiZWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvYmFzZS1maWVsZC9maWVsZC1yZWFkLWxhYmVsLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7SUNBdkUsd0JBQWdFOzs7SUFIcEUsNkJBQThHLFlBQUE7SUFDOUUsWUFBa0M7O0lBQUEsaUJBQUs7SUFDckUsNkJBQThCO0lBQzVCLCtGQUFnRTtJQUNsRSxpQkFBSyxFQUFBOzs7O0lBSHlCLGVBQWtDO0lBQWxDLGtFQUFrQztJQUUvQyxlQUFnQztJQUFoQyxzQ0FBZ0M7OztJQUlqRCxrQkFBeUI7OztBREs3QixNQUFNLE9BQU8sdUJBQXdCLFNBQVEsMEJBQTBCO0lBUHZFOztRQVNFLDhEQUE4RDtRQUN2RCxtQkFBYyxHQUFHLEtBQUssQ0FBQztLQXVDL0I7SUEvQlEsT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztJQUNqRixDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDbEMsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLFNBQVMsQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7WUFFRCxZQUFZO1lBQ1osd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztJQUVPLFlBQVk7UUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxZQUFZLFNBQVMsQ0FBQyxFQUFFO1lBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekU7SUFDSCxDQUFDOzsyUUF6Q1UsdUJBQXVCLFNBQXZCLHVCQUF1QjswRUFBdkIsdUJBQXVCOztRQ2JwQyw4QkFBb0c7UUFDbEcsc0VBS0s7UUFDTCx5SEFFYztRQUNoQixpQkFBTTs7O1FBVjJCLG1GQUFrRTtRQUE5Riw2Q0FBMkI7UUFDTixlQUFpRTtRQUFqRSxnR0FBaUUsaUJBQUE7O3VGRFk5RSx1QkFBdUI7Y0FQbkMsU0FBUzsyQkFDRSxzQkFBc0I7Z0JBWXpCLFNBQVM7a0JBRGYsS0FBSztZQUlDLDJCQUEyQjtrQkFEakMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0IH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuXG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1maWVsZC1yZWFkLWxhYmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkLXJlYWQtbGFiZWwuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL2ZpZWxkLXJlYWQtbGFiZWwuc2NzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZFJlYWRMYWJlbENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAvLyBFVUktMzI2Ny4gRmxhZyBmb3Igd2hldGhlciBvciBub3QgdGhpcyBjYW4gaGF2ZSBhIGdyZXkgYmFyLlxuICBwdWJsaWMgY2FuSGF2ZUdyZXlCYXIgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgd2l0aExhYmVsOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBtYXJrZG93blVzZUhyZWZBc1JvdXRlckxpbms/OiBib29sZWFuO1xuXG4gIHB1YmxpYyBpc0xhYmVsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlICYmIHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUudHlwZSA9PT0gJ0xhYmVsJztcbiAgfVxuXG4gIHB1YmxpYyBpc0NvbXBsZXgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUZpZWxkLmlzQ29tcGxleCgpO1xuICB9XG5cbiAgcHVibGljIGlzQ2FzZUxpbmsoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUZpZWxkLmlzQ2FzZUxpbmsoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1snY2FzZUZpZWxkJ107XG4gICAgaWYgKGNoYW5nZSkge1xuICAgICAgY29uc3QgY2ZOZXcgPSBjaGFuZ2UuY3VycmVudFZhbHVlO1xuICAgICAgaWYgKCEoY2ZOZXcgaW5zdGFuY2VvZiBDYXNlRmllbGQpKSB7XG4gICAgICAgIHRoaXMuZml4Q2FzZUZpZWxkKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVVSS0zMjY3LlxuICAgICAgLy8gU2V0IHVwIHRoZSBmbGFnIGZvciB3aGV0aGVyIHRoaXMgY2FuIGhhdmUgYSBncmV5IGJhci5cbiAgICAgIHRoaXMuY2FuSGF2ZUdyZXlCYXIgPSAhIXRoaXMuY2FzZUZpZWxkLnNob3dfY29uZGl0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZml4Q2FzZUZpZWxkKCkge1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZCAmJiAhKHRoaXMuY2FzZUZpZWxkIGluc3RhbmNlb2YgQ2FzZUZpZWxkKSkge1xuICAgICAgdGhpcy5jYXNlRmllbGQgPSBwbGFpblRvQ2xhc3NGcm9tRXhpc3QobmV3IENhc2VGaWVsZCgpLCB0aGlzLmNhc2VGaWVsZCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IFtoaWRkZW5dPVwiY2FzZUZpZWxkLmhpZGRlblwiIFtjbGFzcy5ncmV5LWJhcl09XCJjYW5IYXZlR3JleUJhciAmJiAhY2FzZUZpZWxkLmhpZGRlbkNhbm5vdENoYW5nZVwiPlxuICA8ZGwgY2xhc3M9XCJjYXNlLWZpZWxkXCIgKm5nSWY9XCJ3aXRoTGFiZWwgJiYgIWlzTGFiZWwoKSAmJiAoIWlzQ29tcGxleCgpIHx8IGlzQ2FzZUxpbmsoKSk7IGVsc2UgY2FzZUZpZWxkVmFsdWVcIj5cbiAgICA8ZHQgY2xhc3M9XCJjYXNlLWZpZWxkX19sYWJlbFwiPnt7Y2FzZUZpZWxkLmxhYmVsIHwgcnB4VHJhbnNsYXRlfX08L2R0PlxuICAgIDxkZCBjbGFzcz1cImNhc2UtZmllbGRfX3ZhbHVlXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FzZUZpZWxkVmFsdWVcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2RkPlxuICA8L2RsPlxuICA8bmctdGVtcGxhdGUgI2Nhc2VGaWVsZFZhbHVlPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuIl19