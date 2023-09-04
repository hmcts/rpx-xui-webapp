import { Component, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../../domain/definition';
import { FormValidatorsService } from '../../../services/form';
import { PaletteService } from '../palette.service';
import { AbstractFieldWriteComponent } from './abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "../palette.service";
const _c0 = ["fieldContainer"];
const FIX_CASEFIELD_FOR = ['FixedList', 'DynamicList', 'DynamicMultiSelectList'];
export class FieldWriteComponent extends AbstractFieldWriteComponent {
    constructor(resolver, paletteService) {
        super();
        this.resolver = resolver;
        this.paletteService = paletteService;
        // EUI-3267. Flag for whether or not this can have a grey bar.
        this.canHaveGreyBar = false;
        this.caseFields = [];
    }
    addValidators(caseField, control) {
        FormValidatorsService.addValidators(caseField, control);
    }
    ngOnInit() {
        const componentClass = this.paletteService.getFieldComponentClass(this.caseField, true);
        const injector = Injector.create([], this.fieldContainer.parentInjector);
        const component = this.resolver.resolveComponentFactory(componentClass).create(injector);
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
        component.instance['parent'] = this.parent;
        component.instance['idPrefix'] = this.idPrefix;
        if (this.caseField.field_type.id === 'AddressGlobal') {
            component.instance['ignoreMandatory'] = true;
        }
        component.instance['isExpanded'] = this.isExpanded;
        component.instance['isInSearchBlock'] = this.isInSearchBlock;
        this.fieldContainer.insert(component.hostView);
        // EUI-3267.
        // Set up the flag for whether this can have a grey bar.
        this.canHaveGreyBar = this.caseField.show_condition && this.caseField.field_type.type !== 'Collection';
    }
}
FieldWriteComponent.ɵfac = function FieldWriteComponent_Factory(t) { return new (t || FieldWriteComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PaletteService)); };
FieldWriteComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FieldWriteComponent, selectors: [["ccd-field-write"]], viewQuery: function FieldWriteComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fieldContainer = _t.first);
    } }, inputs: { caseFields: "caseFields" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [[3, "hidden"], ["fieldContainer", ""]], template: function FieldWriteComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementContainer(1, null, 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassProp("grey-bar", ctx.canHaveGreyBar && !ctx.caseField.hiddenCannotChange);
        i0.ɵɵproperty("hidden", ctx.caseField.hidden);
    } }, styles: [".form   [_nghost-%COMP%]  .grey-bar>*>.form-group, .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group, .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field{margin-left:15px;padding-left:15px}.form   [_nghost-%COMP%]  .grey-bar>*>.form-group:not(.form-group-error), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group:not(.form-group-error), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field:not(.form-group-error){border-left:solid 5px #b1b4b6}.form   [_nghost-%COMP%]  .grey-bar>*>.form-group input:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>.form-group select:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>.form-group textarea:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group input:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group select:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>*>.form-group textarea:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field input:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field select:not(.inline-block), .form   [_nghost-%COMP%]  .grey-bar>*>dl.case-field textarea:not(.inline-block){display:block}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldWriteComponent, [{
        type: Component,
        args: [{ selector: 'ccd-field-write', template: "<div [hidden]=\"caseField.hidden\" [class.grey-bar]=\"canHaveGreyBar && !caseField.hiddenCannotChange\">\n  <ng-container #fieldContainer></ng-container>\n</div>\n", styles: [".form :host::ng-deep .grey-bar>*>.form-group,.form :host::ng-deep .grey-bar>*>*>.form-group,.form :host::ng-deep .grey-bar>*>dl.case-field{margin-left:15px;padding-left:15px}.form :host::ng-deep .grey-bar>*>.form-group:not(.form-group-error),.form :host::ng-deep .grey-bar>*>*>.form-group:not(.form-group-error),.form :host::ng-deep .grey-bar>*>dl.case-field:not(.form-group-error){border-left:solid 5px #b1b4b6}.form :host::ng-deep .grey-bar>*>.form-group input:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group select:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group textarea:not(.inline-block),.form :host::ng-deep .grey-bar>*>*>.form-group input:not(.inline-block),.form :host::ng-deep .grey-bar>*>*>.form-group select:not(.inline-block),.form :host::ng-deep .grey-bar>*>*>.form-group textarea:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field input:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field select:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field textarea:not(.inline-block){display:block}\n"] }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.PaletteService }]; }, { caseFields: [{
            type: Input
        }], fieldContainer: [{
            type: ViewChild,
            args: ['fieldContainer', { static: true, read: ViewContainerRef }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtd3JpdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvYmFzZS1maWVsZC9maWVsZC13cml0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9iYXNlLWZpZWxkL2ZpZWxkLXdyaXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUgsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUUvRSxNQUFNLGlCQUFpQixHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBT2pGLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSwyQkFBMkI7SUFXbEUsWUFBNkIsUUFBa0MsRUFDNUMsY0FBOEI7UUFDL0MsS0FBSyxFQUFFLENBQUM7UUFGbUIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDNUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBVmpELDhEQUE4RDtRQUN2RCxtQkFBYyxH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dG9yLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uJztcbmltcG9ydCB7IEZvcm1WYWxpZGF0b3JzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2Zvcm0nO1xuaW1wb3J0IHsgUGFsZXR0ZVNlcnZpY2UgfSBmcm9tICcuLi9wYWxldHRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG5jb25zdCBGSVhfQ0FTRUZJRUxEX0ZPUiA9IFsnRml4ZWRMaXN0JywgJ0R5bmFtaWNMaXN0JywgJ0R5bmFtaWNNdWx0aVNlbGVjdExpc3QnXTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWZpZWxkLXdyaXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkLXdyaXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmllbGQtd3JpdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZFdyaXRlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBFVUktMzI2Ny4gRmxhZyBmb3Igd2hldGhlciBvciBub3QgdGhpcyBjYW4gaGF2ZSBhIGdyZXkgYmFyLlxuICBwdWJsaWMgY2FuSGF2ZUdyZXlCYXIgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZUZpZWxkczogQ2FzZUZpZWxkW10gPSBbXTtcblxuICBAVmlld0NoaWxkKCdmaWVsZENvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIHB1YmxpYyBmaWVsZENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwYWxldHRlU2VydmljZTogUGFsZXR0ZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZFZhbGlkYXRvcnMoY2FzZUZpZWxkOiBDYXNlRmllbGQsIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIEZvcm1WYWxpZGF0b3JzU2VydmljZS5hZGRWYWxpZGF0b3JzKGNhc2VGaWVsZCwgY29udHJvbCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50Q2xhc3MgPSB0aGlzLnBhbGV0dGVTZXJ2aWNlLmdldEZpZWxkQ29tcG9uZW50Q2xhc3ModGhpcy5jYXNlRmllbGQsIHRydWUpO1xuXG4gICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoW10sIHRoaXMuZmllbGRDb250YWluZXIucGFyZW50SW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50Q2xhc3MpLmNyZWF0ZShpbmplY3Rvcik7XG5cbiAgICAvLyBPbmx5IEZpeGVkIGxpc3QgdXNlIHBsYWluVG9DbGFzc0Zyb21FeGlzdFxuICAgIC8vIEJldHRlciBwZXJmb3JtYW5jZVxuICAgIC8vIFRPRE8gQVcgMzAvMTIvMjAgZmlndXJlIG91dCB3aHkgRml4ZWRMaXN0cyBuZWVkIHBsYWluVG9DbGFzc0Zyb21FeGlzdFxuICAgIC8vIEFkZGVkIGEgY2hlY2sgdG8gbWFrZSBzdXJlIGl0J3MgTk9UIGFscmVhZHkgYSBDYXNlRmllbGQgYW5kIHRoZW5cbiAgICAvLyBhc3NpZ25pbmcgaXQgYmFjayB0byB0aGlzLmNhc2VGaWVsZCBzbyB3ZSBkb24ndCBjcmVhdGUgc2VwYXJhdGlvbi5cbiAgICBpZiAoRklYX0NBU0VGSUVMRF9GT1IuaW5kZXhPZih0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLnR5cGUpID4gLTEgJiYgISh0aGlzLmNhc2VGaWVsZCBpbnN0YW5jZW9mIENhc2VGaWVsZCkpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkID0gcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KG5ldyBDYXNlRmllbGQoKSwgdGhpcy5jYXNlRmllbGQpO1xuICAgIH1cbiAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2Nhc2VGaWVsZCddID0gdGhpcy5jYXNlRmllbGQ7XG5cbiAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2Nhc2VGaWVsZHMnXSA9IHRoaXMuY2FzZUZpZWxkcztcbiAgICBjb21wb25lbnQuaW5zdGFuY2VbJ1VudHlwZWRGb3JtR3JvdXAnXSA9IHRoaXMuZm9ybUdyb3VwO1xuICAgIGNvbXBvbmVudC5pbnN0YW5jZVsncGFyZW50J10gPSB0aGlzLnBhcmVudDtcbiAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2lkUHJlZml4J10gPSB0aGlzLmlkUHJlZml4O1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLmlkID09PSAnQWRkcmVzc0dsb2JhbCcpIHtcbiAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVsnaWdub3JlTWFuZGF0b3J5J10gPSB0cnVlO1xuICAgIH1cbiAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2lzRXhwYW5kZWQnXSA9IHRoaXMuaXNFeHBhbmRlZDtcbiAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2lzSW5TZWFyY2hCbG9jayddID0gdGhpcy5pc0luU2VhcmNoQmxvY2s7XG4gICAgdGhpcy5maWVsZENvbnRhaW5lci5pbnNlcnQoY29tcG9uZW50Lmhvc3RWaWV3KTtcblxuICAgIC8vIEVVSS0zMjY3LlxuICAgIC8vIFNldCB1cCB0aGUgZmxhZyBmb3Igd2hldGhlciB0aGlzIGNhbiBoYXZlIGEgZ3JleSBiYXIuXG4gICAgdGhpcy5jYW5IYXZlR3JleUJhciA9IHRoaXMuY2FzZUZpZWxkLnNob3dfY29uZGl0aW9uICYmIHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUudHlwZSAhPT0gJ0NvbGxlY3Rpb24nO1xuICB9XG59XG4iLCI8ZGl2IFtoaWRkZW5dPVwiY2FzZUZpZWxkLmhpZGRlblwiIFtjbGFzcy5ncmV5LWJhcl09XCJjYW5IYXZlR3JleUJhciAmJiAhY2FzZUZpZWxkLmhpZGRlbkNhbm5vdENoYW5nZVwiPlxuICA8bmctY29udGFpbmVyICNmaWVsZENvbnRhaW5lcj48L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuIl19