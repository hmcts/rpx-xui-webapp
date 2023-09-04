import { Component, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../../domain/definition/case-field.model';
import { PaletteService } from '../palette.service';
import { AbstractFieldReadComponent } from './abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "../palette.service";
const _c0 = ["fieldContainer"];
const FIX_CASEFIELD_FOR = ['FixedList', 'DynamicList', 'DynamicMultiSelectList'];
export class FieldReadComponent extends AbstractFieldReadComponent {
    constructor(resolver, paletteService) {
        super();
        this.resolver = resolver;
        this.paletteService = paletteService;
        this.withLabel = false;
        this.formGroup = new UntypedFormGroup({});
        this.caseFields = [];
    }
    ngOnInit() {
        // Ensure all field values are resolved by label interpolation before the component is fully initialised.
        Promise.resolve(null).then(() => {
            const componentClass = this.paletteService.getFieldComponentClass(this.caseField, false);
            const injector = Injector.create({
                providers: [],
                parent: this.fieldContainer.injector
            });
            const component = this.resolver.resolveComponentFactory(componentClass).create(injector);
            // Provide component @Inputs
            // Only Fixed list use plainToClassFromExist
            // Better performance
            // TODO AW 30/12/20 figure out why FixedLists need plainToClassFromExist
            // Added a check to make sure it's NOT already a CaseField and then
            // assigning it back to this.caseField so we don't create separation.
            if (FIX_CASEFIELD_FOR.indexOf(this.caseField.field_type.type) > -1 && !(this.caseField instanceof CaseField)) {
                this.caseField = plainToClassFromExist(new CaseField(), this.caseField);
            }
            component.instance['caseField'] = this.caseField;
            component.instance['caseFields'] = this.caseFields;
            component.instance['UntypedFormGroup'] = this.formGroup;
            component.instance['topLevelFormGroup'] = this.topLevelFormGroup;
            component.instance['idPrefix'] = this.idPrefix;
            component.instance['parent'] = this.parent;
            component.instance['caseReference'] = this.caseReference;
            component.instance['context'] = this.context;
            component.instance['markdownUseHrefAsRouterLink'] = this.markdownUseHrefAsRouterLink;
            component.instance['labelCanBeTranslated'] = this.labelCanBeTranslated(this.caseField);
            this.fieldContainer.insert(component.hostView);
        });
    }
    labelCanBeTranslated(caseField) {
        return !!(caseField.field_type.type === 'Label' && caseField.label);
    }
}
FieldReadComponent.ɵfac = function FieldReadComponent_Factory(t) { return new (t || FieldReadComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PaletteService)); };
FieldReadComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FieldReadComponent, selectors: [["ccd-field-read"]], viewQuery: function FieldReadComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fieldContainer = _t.first);
    } }, inputs: { withLabel: "withLabel", formGroup: "formGroup", caseFields: "caseFields", markdownUseHrefAsRouterLink: "markdownUseHrefAsRouterLink" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[3, "hidden"], [3, "formGroup", "topLevelFormGroup", "caseField", "withLabel", "markdownUseHrefAsRouterLink"], ["fieldContainer", ""]], template: function FieldReadComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "ccd-field-read-label", 1);
        i0.ɵɵelementContainer(2, null, 2);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("hidden", ctx.caseField.hidden);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("formGroup", ctx.formGroup)("topLevelFormGroup", ctx.topLevelFormGroup)("caseField", ctx.caseField)("withLabel", ctx.withLabel)("markdownUseHrefAsRouterLink", ctx.markdownUseHrefAsRouterLink);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldReadComponent, [{
        type: Component,
        args: [{ selector: 'ccd-field-read', template: "<div [hidden]=\"caseField.hidden\">\n  <ccd-field-read-label [formGroup]=\"formGroup\" [topLevelFormGroup]=\"topLevelFormGroup\" [caseField]=\"caseField\" [withLabel]=\"withLabel\" [markdownUseHrefAsRouterLink]=\"markdownUseHrefAsRouterLink\">\n    <ng-container #fieldContainer></ng-container>\n  </ccd-field-read-label>\n</div>\n" }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.PaletteService }]; }, { withLabel: [{
            type: Input
        }], formGroup: [{
            type: Input
        }], caseFields: [{
            type: Input
        }], markdownUseHrefAsRouterLink: [{
            type: Input
        }], fieldContainer: [{
            type: ViewChild,
            args: ['fieldContainer', { static: false, read: ViewContainerRef }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcmVhZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9iYXNlLWZpZWxkL2ZpZWxkLXJlYWQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvYmFzZS1maWVsZC9maWVsZC1yZWFkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7O0FBRTdFLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLHdCQUF3QixDQUFDLENBQUM7QUFNakYsTUFBTSxPQUFPLGtCQUFtQixTQUFRLDBCQUEwQjtJQWdCaEUsWUFBNkIsUUFBa0MsRUFBbUIsY0FBOEI7UUFDOUcsS0FBSyxFQUFFLENBQUM7UUFEbUIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFBbUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBZHpHLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHbEIsY0FBUyxH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QWtCO2NBSjlCLFNBQVM7MkJBQ0UsZ0JBQWdCO3dHQUtuQixTQUFTO2tCQURmLEtBQUs7WUFJQyxTQUFTO2tCQURmLEtBQUs7WUFJQyxVQUFVO2tCQURoQixLQUFLO1lBSUMsMkJBQTJCO2tCQURqQyxLQUFLO1lBSUMsY0FBYztrQkFEcEIsU0FBUzttQkFBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdG9yLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3NGcm9tRXhpc3QgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IFBhbGV0dGVTZXJ2aWNlIH0gZnJvbSAnLi4vcGFsZXR0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbmNvbnN0IEZJWF9DQVNFRklFTERfRk9SID0gWydGaXhlZExpc3QnLCAnRHluYW1pY0xpc3QnLCAnRHluYW1pY011bHRpU2VsZWN0TGlzdCddO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtZmllbGQtcmVhZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWVsZC1yZWFkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZpZWxkUmVhZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcHVibGljIHdpdGhMYWJlbCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdID0gW107XG5cbiAgQElucHV0KClcbiAgcHVibGljIG1hcmtkb3duVXNlSHJlZkFzUm91dGVyTGluaz86IGJvb2xlYW47XG5cbiAgQFZpZXdDaGlsZCgnZmllbGRDb250YWluZXInLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgcHVibGljIGZpZWxkQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSByZWFkb25seSBwYWxldHRlU2VydmljZTogUGFsZXR0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIEVuc3VyZSBhbGwgZmllbGQgdmFsdWVzIGFyZSByZXNvbHZlZCBieSBsYWJlbCBpbnRlcnBvbGF0aW9uIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGZ1bGx5IGluaXRpYWxpc2VkLlxuICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudENsYXNzID0gdGhpcy5wYWxldHRlU2VydmljZS5nZXRGaWVsZENvbXBvbmVudENsYXNzKHRoaXMuY2FzZUZpZWxkLCBmYWxzZSk7XG4gICAgICBjb25zdCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICAgIHByb3ZpZGVyczogW10sXG4gICAgICAgIHBhcmVudDogdGhpcy5maWVsZENvbnRhaW5lci5pbmplY3RvclxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50Q2xhc3MpLmNyZWF0ZShpbmplY3Rvcik7XG5cbiAgICAgIC8vIFByb3ZpZGUgY29tcG9uZW50IEBJbnB1dHNcbiAgICAgIC8vIE9ubHkgRml4ZWQgbGlzdCB1c2UgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0XG4gICAgICAvLyBCZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgIC8vIFRPRE8gQVcgMzAvMTIvMjAgZmlndXJlIG91dCB3aHkgRml4ZWRMaXN0cyBuZWVkIHBsYWluVG9DbGFzc0Zyb21FeGlzdFxuICAgICAgLy8gQWRkZWQgYSBjaGVjayB0byBtYWtlIHN1cmUgaXQncyBOT1QgYWxyZWFkeSBhIENhc2VGaWVsZCBhbmQgdGhlblxuICAgICAgLy8gYXNzaWduaW5nIGl0IGJhY2sgdG8gdGhpcy5jYXNlRmllbGQgc28gd2UgZG9uJ3QgY3JlYXRlIHNlcGFyYXRpb24uXG4gICAgICBpZiAoRklYX0NBU0VGSUVMRF9GT1IuaW5kZXhPZih0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLnR5cGUpID4gLTEgJiYgISh0aGlzLmNhc2VGaWVsZCBpbnN0YW5jZW9mIENhc2VGaWVsZCkpIHtcbiAgICAgICAgdGhpcy5jYXNlRmllbGQgPSBwbGFpblRvQ2xhc3NGcm9tRXhpc3QobmV3IENhc2VGaWVsZCgpLCB0aGlzLmNhc2VGaWVsZCk7XG4gICAgICB9XG4gICAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2Nhc2VGaWVsZCddID0gdGhpcy5jYXNlRmllbGQ7XG4gICAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2Nhc2VGaWVsZHMnXSA9IHRoaXMuY2FzZUZpZWxkcztcbiAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVsnVW50eXBlZEZvcm1Hcm91cCddID0gdGhpcy5mb3JtR3JvdXA7XG4gICAgICBjb21wb25lbnQuaW5zdGFuY2VbJ3RvcExldmVsRm9ybUdyb3VwJ10gPSB0aGlzLnRvcExldmVsRm9ybUdyb3VwO1xuICAgICAgY29tcG9uZW50Lmluc3RhbmNlWydpZFByZWZpeCddID0gdGhpcy5pZFByZWZpeDtcbiAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVsncGFyZW50J10gPSB0aGlzLnBhcmVudDtcbiAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVsnY2FzZVJlZmVyZW5jZSddID0gdGhpcy5jYXNlUmVmZXJlbmNlO1xuICAgICAgY29tcG9uZW50Lmluc3RhbmNlWydjb250ZXh0J10gPSB0aGlzLmNvbnRleHQ7XG4gICAgICBjb21wb25lbnQuaW5zdGFuY2VbJ21hcmtkb3duVXNlSHJlZkFzUm91dGVyTGluayddID0gdGhpcy5tYXJrZG93blVzZUhyZWZBc1JvdXRlckxpbms7XG4gICAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2xhYmVsQ2FuQmVUcmFuc2xhdGVkJ10gPSB0aGlzLmxhYmVsQ2FuQmVUcmFuc2xhdGVkKHRoaXMuY2FzZUZpZWxkKTtcblxuICAgICAgdGhpcy5maWVsZENvbnRhaW5lci5pbnNlcnQoY29tcG9uZW50Lmhvc3RWaWV3KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGFiZWxDYW5CZVRyYW5zbGF0ZWQoY2FzZUZpZWxkOiBDYXNlRmllbGQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoY2FzZUZpZWxkLmZpZWxkX3R5cGUudHlwZSA9PT0gJ0xhYmVsJyAmJiBjYXNlRmllbGQubGFiZWwpO1xuICB9XG59XG4iLCI8ZGl2IFtoaWRkZW5dPVwiY2FzZUZpZWxkLmhpZGRlblwiPlxuICA8Y2NkLWZpZWxkLXJlYWQtbGFiZWwgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiBbdG9wTGV2ZWxGb3JtR3JvdXBdPVwidG9wTGV2ZWxGb3JtR3JvdXBcIiBbY2FzZUZpZWxkXT1cImNhc2VGaWVsZFwiIFt3aXRoTGFiZWxdPVwid2l0aExhYmVsXCIgW21hcmtkb3duVXNlSHJlZkFzUm91dGVyTGlua109XCJtYXJrZG93blVzZUhyZWZBc1JvdXRlckxpbmtcIj5cbiAgICA8bmctY29udGFpbmVyICNmaWVsZENvbnRhaW5lcj48L25nLWNvbnRhaW5lcj5cbiAgPC9jY2QtZmllbGQtcmVhZC1sYWJlbD5cbjwvZGl2PlxuIl19