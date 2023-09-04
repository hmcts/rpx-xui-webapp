import { Component, Input } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteContext } from '../base-field/palette-context.enum';
import * as i0 from "@angular/core";
function ReadOrganisationFieldComponent_ccd_read_organisation_field_raw_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-read-organisation-field-raw", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r0.caseField)("context", ctx_r0.context);
} }
function ReadOrganisationFieldComponent_ccd_read_organisation_field_table_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-read-organisation-field-table", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r1.caseField)("caseFields", ctx_r1.caseFields)("context", ctx_r1.context);
} }
function ReadOrganisationFieldComponent_ccd_read_organisation_field_table_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-read-organisation-field-table", 5);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r2.caseField)("caseFields", ctx_r2.caseFields)("context", ctx_r2.context);
} }
export class ReadOrganisationFieldComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        this.caseFields = [];
        this.paletteContext = PaletteContext;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.caseField.display_context_parameter) {
            this.context = PaletteContext.TABLE_VIEW;
        }
    }
}
ReadOrganisationFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadOrganisationFieldComponent_BaseFactory; return function ReadOrganisationFieldComponent_Factory(t) { return (ɵReadOrganisationFieldComponent_BaseFactory || (ɵReadOrganisationFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadOrganisationFieldComponent)))(t || ReadOrganisationFieldComponent); }; }();
ReadOrganisationFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadOrganisationFieldComponent, selectors: [["ccd-read-organisation-field"]], inputs: { caseFields: "caseFields" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 3, consts: [[3, "ngSwitch"], [3, "caseField", "context", 4, "ngSwitchCase"], [3, "caseField", "caseFields", "context", 4, "ngSwitchCase"], [3, "caseField", "caseFields", "context", 4, "ngSwitchDefault"], [3, "caseField", "context"], [3, "caseField", "caseFields", "context"]], template: function ReadOrganisationFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainerStart(0, 0);
        i0.ɵɵtemplate(1, ReadOrganisationFieldComponent_ccd_read_organisation_field_raw_1_Template, 1, 2, "ccd-read-organisation-field-raw", 1);
        i0.ɵɵtemplate(2, ReadOrganisationFieldComponent_ccd_read_organisation_field_table_2_Template, 1, 3, "ccd-read-organisation-field-table", 2);
        i0.ɵɵtemplate(3, ReadOrganisationFieldComponent_ccd_read_organisation_field_table_3_Template, 1, 3, "ccd-read-organisation-field-table", 3);
        i0.ɵɵelementContainerEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngSwitch", ctx.context);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.paletteContext.CHECK_YOUR_ANSWER);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.paletteContext.TABLE_VIEW);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadOrganisationFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-organisation-field', template: "<ng-container [ngSwitch]=\"context\">\n  <ccd-read-organisation-field-raw\n    *ngSwitchCase=\"paletteContext.CHECK_YOUR_ANSWER\"\n    [caseField]=\"caseField\"\n    [context]=\"context\"\n  ></ccd-read-organisation-field-raw>\n  <ccd-read-organisation-field-table\n    *ngSwitchCase=\"paletteContext.TABLE_VIEW\"\n    [caseField]=\"caseField\"\n    [caseFields]=\"caseFields\"\n    [context]=\"context\"\n  ></ccd-read-organisation-field-table>\n  <ccd-read-organisation-field-table\n    *ngSwitchDefault\n    [caseField]=\"caseField\"\n    [caseFields]=\"caseFields\"\n    [context]=\"context\"\n  ></ccd-read-organisation-field-table>\n</ng-container>\n" }]
    }], null, { caseFields: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vcmdhbmlzYXRpb24tZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvb3JnYW5pc2F0aW9uL3JlYWQtb3JnYW5pc2F0aW9uLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL29yZ2FuaXNhdGlvbi9yZWFkLW9yZ2FuaXNhdGlvbi1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7O0lDRmxFLHFEQUltQzs7O0lBRmpDLDRDQUF1QiwyQkFBQTs7O0lBR3pCLHVEQUtxQzs7O0lBSG5DLDRDQUF1QixpQ0FBQSwyQkFBQTs7O0lBSXpCLHVEQUtxQzs7O0lBSG5DLDRDQUF1QixpQ0FBQSwyQkFBQTs7QURMM0IsTUFBTSxPQUFPLDhCQUErQixTQUFRLDBCQUEwQjtJQUo5RTs7UUFNUyxlQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUU3QixtQkFBYyxHQUFHLGNBQWMsQ0FBQztLQVN4QztJQVBRLFFBQVE7UUFDYixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixFQUFFO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztTQUMxQztJQUNILENBQUM7OzhTQVhVLDhCQUE4QixTQUE5Qiw4QkFBOEI7aUZBQTlCLDhCQUE4QjtRQ1QzQyxnQ0FBbUM7UUFDakMsdUlBSW1DO1FBQ25DLDJJQUtxQztRQUNyQywySUFLcUM7UUFDdkMsMEJBQWU7O1FBbEJELHNDQUFvQjtRQUU3QixlQUE4QztRQUE5QyxtRUFBOEM7UUFLOUMsZUFBdUM7UUFBdkMsNERBQXVDOzt1RkRFL0IsOEJBQThCO2NBSjFDLFNBQVM7MkJBQ0UsNkJBQTZCO2dCQUtoQyxVQUFVO2tCQURoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFsZXR0ZUNvbnRleHQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL3BhbGV0dGUtY29udGV4dC5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXJlYWQtb3JnYW5pc2F0aW9uLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtb3JnYW5pc2F0aW9uLWZpZWxkLmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWFkT3JnYW5pc2F0aW9uRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSA9IFtdO1xuXG4gIHB1YmxpYyBwYWxldHRlQ29udGV4dCA9IFBhbGV0dGVDb250ZXh0O1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBQYWxldHRlQ29udGV4dC5UQUJMRV9WSUVXO1xuICAgIH1cbiAgfVxuXG59XG4iLCI8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJjb250ZXh0XCI+XG4gIDxjY2QtcmVhZC1vcmdhbmlzYXRpb24tZmllbGQtcmF3XG4gICAgKm5nU3dpdGNoQ2FzZT1cInBhbGV0dGVDb250ZXh0LkNIRUNLX1lPVVJfQU5TV0VSXCJcbiAgICBbY2FzZUZpZWxkXT1cImNhc2VGaWVsZFwiXG4gICAgW2NvbnRleHRdPVwiY29udGV4dFwiXG4gID48L2NjZC1yZWFkLW9yZ2FuaXNhdGlvbi1maWVsZC1yYXc+XG4gIDxjY2QtcmVhZC1vcmdhbmlzYXRpb24tZmllbGQtdGFibGVcbiAgICAqbmdTd2l0Y2hDYXNlPVwicGFsZXR0ZUNvbnRleHQuVEFCTEVfVklFV1wiXG4gICAgW2Nhc2VGaWVsZF09XCJjYXNlRmllbGRcIlxuICAgIFtjYXNlRmllbGRzXT1cImNhc2VGaWVsZHNcIlxuICAgIFtjb250ZXh0XT1cImNvbnRleHRcIlxuICA+PC9jY2QtcmVhZC1vcmdhbmlzYXRpb24tZmllbGQtdGFibGU+XG4gIDxjY2QtcmVhZC1vcmdhbmlzYXRpb24tZmllbGQtdGFibGVcbiAgICAqbmdTd2l0Y2hEZWZhdWx0XG4gICAgW2Nhc2VGaWVsZF09XCJjYXNlRmllbGRcIlxuICAgIFtjYXNlRmllbGRzXT1cImNhc2VGaWVsZHNcIlxuICAgIFtjb250ZXh0XT1cImNvbnRleHRcIlxuICA+PC9jY2QtcmVhZC1vcmdhbmlzYXRpb24tZmllbGQtdGFibGU+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==