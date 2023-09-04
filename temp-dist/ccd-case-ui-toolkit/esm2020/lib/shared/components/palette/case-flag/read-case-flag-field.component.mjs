import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldsUtils } from '../../../services/fields';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteContext } from '../base-field/palette-context.enum';
import { CaseFlagSummaryListDisplayMode } from './enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
function ReadCaseFlagFieldComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ccd-case-flag-summary-list", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("flagForSummaryDisplay", ctx_r0.flagForSummaryDisplay)("summaryListDisplayMode", ctx_r0.summaryListDisplayMode);
} }
function ReadCaseFlagFieldComponent_ng_container_2_div_3_ccd_case_flag_table_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-case-flag-table", 8);
} if (rf & 2) {
    const flagData_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("tableCaption", flagData_r4.flags.partyName)("flagData", flagData_r4)("firstColumnHeader", "Party level flags");
} }
function ReadCaseFlagFieldComponent_ng_container_2_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, ReadCaseFlagFieldComponent_ng_container_2_div_3_ccd_case_flag_table_1_Template, 1, 3, "ccd-case-flag-table", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const flagData_r4 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", flagData_r4.flags.partyName);
} }
function ReadCaseFlagFieldComponent_ng_container_2_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-case-flag-table", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("tableCaption", "Case level flags")("flagData", ctx_r3.caseLevelCaseFlagData)("firstColumnHeader", "Case flags");
} }
function ReadCaseFlagFieldComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "h2", 4);
    i0.ɵɵtext(2, "Case flags");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, ReadCaseFlagFieldComponent_ng_container_2_div_3_Template, 2, 1, "div", 5);
    i0.ɵɵtemplate(4, ReadCaseFlagFieldComponent_ng_container_2_div_4_Template, 2, 3, "div", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.partyLevelCaseFlagData);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.caseLevelCaseFlagData);
} }
export class ReadCaseFlagFieldComponent extends AbstractFieldReadComponent {
    constructor(route) {
        super();
        this.route = route;
        this.paletteContext = PaletteContext;
        this.caseLevelCaseFlagsFieldId = 'caseFlags';
        this.caseNameMissing = 'Case name missing';
        this.createMode = '#ARGUMENT(CREATE)';
        this.updateMode = '#ARGUMENT(UPDATE)';
    }
    ngOnInit() {
        // If the context is PaletteContext.DEFAULT, the Flags fields need to be located by CaseTab (they won't be present
        // in the UntypedFormGroup - only the FlagLauncher field is present)
        if (this.context === PaletteContext.DEFAULT) {
            // Determine the tab this CaseField belongs to (should be only one), from the CaseView object in the snapshot
            // data, and extract all flags-related data from its Flags fields
            if (this.route.snapshot.data.case && this.route.snapshot.data.case.tabs) {
                this.flagsData = this.route.snapshot.data.case.tabs
                    .filter(tab => tab.fields && tab.fields
                    .some(caseField => caseField.field_type.type === 'FlagLauncher'))[0].fields.reduce((flags, caseField) => {
                    return FieldsUtils.extractFlagsDataFromCaseField(flags, caseField, caseField.id, caseField);
                }, []);
            }
            // Separate the party-level and case-level flags
            this.partyLevelCaseFlagData = this.flagsData.filter(instance => instance.pathToFlagsFormGroup !== this.caseLevelCaseFlagsFieldId);
            // There will be only one case-level flags instance containing all case-level flag details
            this.caseLevelCaseFlagData = this.flagsData.find(instance => instance.pathToFlagsFormGroup === this.caseLevelCaseFlagsFieldId);
        }
        else if (this.context === PaletteContext.CHECK_YOUR_ANSWER) {
            // If the context is PaletteContext.CHECK_YOUR_ANSWER, the Flags data is already present within the formGroup.
            // The FlagLauncher component, WriteCaseFlagFieldComponent, holds a reference to:
            // i) the parent UntypedFormGroup for the Flags instance where changes have been made;
            // ii) the currently selected flag (selectedFlag) if one exists
            const flagLauncherControlName = Object.keys(this.formGroup.controls).find(controlName => FieldsUtils.isFlagLauncherCaseField(this.formGroup.get(controlName)['caseField']));
            if (flagLauncherControlName && this.formGroup.get(flagLauncherControlName)['component']) {
                const flagLauncherComponent = this.formGroup.get(flagLauncherControlName)['component'];
                // The FlagLauncher component holds a reference (selectedFlagsLocation) containing the CaseField instance to
                // which the new flag has been added
                if (flagLauncherComponent.caseField.display_context_parameter === this.createMode &&
                    flagLauncherComponent.selectedFlagsLocation) {
                    this.flagForSummaryDisplay = this.extractNewFlagToFlagDetailDisplayObject(flagLauncherComponent.selectedFlagsLocation);
                    // Set the display mode for the "Review flag details" summary page
                    this.summaryListDisplayMode = CaseFlagSummaryListDisplayMode.CREATE;
                    // The FlagLauncher component holds a reference (selectedFlag), which gets set after the selection step of the
                    // Manage Case Flags journey
                }
                else if (flagLauncherComponent.caseField.display_context_parameter === this.updateMode &&
                    flagLauncherComponent.selectedFlag) {
                    this.flagForSummaryDisplay =
                        this.formGroup.get(flagLauncherControlName)['component'].selectedFlag.flagDetailDisplay;
                    // Set the display mode for the "Review flag details" summary page
                    this.summaryListDisplayMode = CaseFlagSummaryListDisplayMode.MANAGE;
                }
            }
        }
    }
    extractNewFlagToFlagDetailDisplayObject(selectedFlagsLocation) {
        // Use the pathToFlagsFormGroup property from the selected flag location to drill down to the correct part of the
        // CaseField value containing the new flag
        let flagsCaseFieldValue = selectedFlagsLocation.caseField.value;
        const path = selectedFlagsLocation.pathToFlagsFormGroup;
        // Root-level Flags CaseFields don't have a dot-delimited path - just the CaseField ID itself - so don't drill down
        if (path.indexOf('.') > -1) {
            path.slice(path.indexOf('.') + 1).split('.').forEach(part => flagsCaseFieldValue = flagsCaseFieldValue[part]);
        }
        if (flagsCaseFieldValue) {
            return {
                partyName: flagsCaseFieldValue.partyName,
                // Look in the details array for the object that does *not* have an id - this indicates it is the new flag
                flagDetail: flagsCaseFieldValue.details.find(element => !element.hasOwnProperty('id')).value
            };
        }
        return null;
    }
}
ReadCaseFlagFieldComponent.ɵfac = function ReadCaseFlagFieldComponent_Factory(t) { return new (t || ReadCaseFlagFieldComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
ReadCaseFlagFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadCaseFlagFieldComponent, selectors: [["ccd-read-case-flag-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 2, consts: [[3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "flagForSummaryDisplay", "summaryListDisplayMode"], [1, "govuk-heading-l"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "tableCaption", "flagData", "firstColumnHeader", 4, "ngIf"], [3, "tableCaption", "flagData", "firstColumnHeader"]], template: function ReadCaseFlagFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainerStart(0, 0);
        i0.ɵɵtemplate(1, ReadCaseFlagFieldComponent_ng_container_1_Template, 2, 2, "ng-container", 1);
        i0.ɵɵtemplate(2, ReadCaseFlagFieldComponent_ng_container_2_Template, 5, 2, "ng-container", 2);
        i0.ɵɵelementContainerEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngSwitch", ctx.context);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.paletteContext.CHECK_YOUR_ANSWER);
    } }, styles: [".govuk-heading-l[_ngcontent-%COMP%]{margin-top:30px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadCaseFlagFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-case-flag-field', template: "<ng-container [ngSwitch]=\"context\">\n  <ng-container *ngSwitchCase=\"paletteContext.CHECK_YOUR_ANSWER\">\n    <ccd-case-flag-summary-list [flagForSummaryDisplay]=\"flagForSummaryDisplay\"\n      [summaryListDisplayMode]=\"summaryListDisplayMode\"></ccd-case-flag-summary-list>\n  </ng-container>\n  <ng-container *ngSwitchDefault>\n    <h2 class=\"govuk-heading-l\">Case flags</h2>\n    <div *ngFor=\"let flagData of partyLevelCaseFlagData\">\n      <ccd-case-flag-table *ngIf=\"flagData.flags.partyName\"\n        [tableCaption]=\"flagData.flags.partyName\"\n        [flagData]=\"flagData\"\n        [firstColumnHeader]=\"'Party level flags'\"\n      ></ccd-case-flag-table>\n    </div>\n    <div *ngIf=\"caseLevelCaseFlagData\">\n      <ccd-case-flag-table\n        [tableCaption]=\"'Case level flags'\"\n        [flagData]=\"caseLevelCaseFlagData\"\n        [firstColumnHeader]=\"'Case flags'\"\n      ></ccd-case-flag-table>\n    </div>\n  </ng-container>\n</ng-container>\n", styles: [".govuk-heading-l{margin-top:30px}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1jYXNlLWZsYWctZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL3JlYWQtY2FzZS1mbGFnLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmxhZy9yZWFkLWNhc2UtZmxhZy1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztJQ052RCw2QkFBK0Q7SUFDN0QsZ0RBQ2lGO0lBQ25GLDBCQUFlOzs7SUFGZSxlQUErQztJQUEvQyxvRUFBK0MseURBQUE7OztJQU16RSx5Q0FJdUI7OztJQUhyQiwwREFBeUMseUJBQUEsMENBQUE7OztJQUY3QywyQkFBcUQ7SUFDbkQsZ0lBSXVCO0lBQ3pCLGlCQUFNOzs7SUFMa0IsZUFBOEI7SUFBOUIsa0RBQThCOzs7SUFNdEQsMkJBQW1DO0lBQ2pDLHlDQUl1QjtJQUN6QixpQkFBTTs7O0lBSkYsZUFBbUM7SUFBbkMsaURBQW1DLDBDQUFBLG1DQUFBOzs7SUFYekMs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LENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDL0c7UUFDRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLE9BQU87Z0JBQ0wsU0FBUyxFQUFFLG1CQUFtQixDQUFDLFNBQVM7Z0JBQ3hDLDBHQUEwRztnQkFDMUcsVUFBVSxFQUFFLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO2FBQ3hFLENBQUM7U0FDeEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O29HQXhGVSwwQkFBMEI7NkVBQTFCLDBCQUEwQjtRQ2R2QyxnQ0FBbUM7UUFDakMsNkZBR2U7UUFDZiw2RkFnQmU7UUFDakIsMEJBQWU7O1FBdEJELHNDQUFvQjtRQUNqQixlQUE4QztRQUE5QyxtRUFBOEM7O3VGRGFsRCwwQkFBMEI7Y0FMdEMsU0FBUzsyQkFDRSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2FzZVRhYiB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBGaWVsZHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ZpZWxkcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFsZXR0ZUNvbnRleHQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL3BhbGV0dGUtY29udGV4dC5lbnVtJztcbmltcG9ydCB7IEZsYWdEZXRhaWxEaXNwbGF5LCBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoIH0gZnJvbSAnLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZUZsYWdTdW1tYXJ5TGlzdERpc3BsYXlNb2RlIH0gZnJvbSAnLi9lbnVtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWNhc2UtZmxhZy1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWFkLWNhc2UtZmxhZy1maWVsZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlYWQtY2FzZS1mbGFnLWZpZWxkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVhZENhc2VGbGFnRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGZsYWdzRGF0YTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aFtdO1xuICBwdWJsaWMgcGFydHlMZXZlbENhc2VGbGFnRGF0YTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aFtdO1xuICBwdWJsaWMgY2FzZUxldmVsQ2FzZUZsYWdEYXRhOiBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoO1xuICBwdWJsaWMgcGFsZXR0ZUNvbnRleHQgPSBQYWxldHRlQ29udGV4dDtcbiAgcHVibGljIGZsYWdGb3JTdW1tYXJ5RGlzcGxheTogRmxhZ0RldGFpbERpc3BsYXk7XG4gIHB1YmxpYyBzdW1tYXJ5TGlzdERpc3BsYXlNb2RlOiBDYXNlRmxhZ1N1bW1hcnlMaXN0RGlzcGxheU1vZGU7XG4gIHB1YmxpYyByZWFkb25seSBjYXNlTGV2ZWxDYXNlRmxhZ3NGaWVsZElkID0gJ2Nhc2VGbGFncyc7XG4gIHB1YmxpYyByZWFkb25seSBjYXNlTmFtZU1pc3NpbmcgPSAnQ2FzZSBuYW1lIG1pc3NpbmcnO1xuICBwcml2YXRlIHJlYWRvbmx5IGNyZWF0ZU1vZGUgPSAnI0FSR1VNRU5UKENSRUFURSknO1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZU1vZGUgPSAnI0FSR1VNRU5UKFVQREFURSknO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gSWYgdGhlIGNvbnRleHQgaXMgUGFsZXR0ZUNvbnRleHQuREVGQVVMVCwgdGhlIEZsYWdzIGZpZWxkcyBuZWVkIHRvIGJlIGxvY2F0ZWQgYnkgQ2FzZVRhYiAodGhleSB3b24ndCBiZSBwcmVzZW50XG4gICAgLy8gaW4gdGhlIFVudHlwZWRGb3JtR3JvdXAgLSBvbmx5IHRoZSBGbGFnTGF1bmNoZXIgZmllbGQgaXMgcHJlc2VudClcbiAgICBpZiAodGhpcy5jb250ZXh0ID09PSBQYWxldHRlQ29udGV4dC5ERUZBVUxUKSB7XG4gICAgICAvLyBEZXRlcm1pbmUgdGhlIHRhYiB0aGlzIENhc2VGaWVsZCBiZWxvbmdzIHRvIChzaG91bGQgYmUgb25seSBvbmUpLCBmcm9tIHRoZSBDYXNlVmlldyBvYmplY3QgaW4gdGhlIHNuYXBzaG90XG4gICAgICAvLyBkYXRhLCBhbmQgZXh0cmFjdCBhbGwgZmxhZ3MtcmVsYXRlZCBkYXRhIGZyb20gaXRzIEZsYWdzIGZpZWxkc1xuICAgICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlICYmIHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlLnRhYnMpIHtcbiAgICAgICAgdGhpcy5mbGFnc0RhdGEgPSAodGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmNhc2UudGFicyBhcyBDYXNlVGFiW10pXG4gICAgICAgICAgLmZpbHRlcih0YWIgPT4gdGFiLmZpZWxkcyAmJiB0YWIuZmllbGRzXG4gICAgICAgICAgICAuc29tZShjYXNlRmllbGQgPT4gY2FzZUZpZWxkLmZpZWxkX3R5cGUudHlwZSA9PT0gJ0ZsYWdMYXVuY2hlcicpKVxuICAgICAgICBbMF0uZmllbGRzLnJlZHVjZSgoZmxhZ3MsIGNhc2VGaWVsZCkgPT4ge1xuICAgICAgICAgIHJldHVybiBGaWVsZHNVdGlscy5leHRyYWN0RmxhZ3NEYXRhRnJvbUNhc2VGaWVsZChmbGFncywgY2FzZUZpZWxkLCBjYXNlRmllbGQuaWQsIGNhc2VGaWVsZCk7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VwYXJhdGUgdGhlIHBhcnR5LWxldmVsIGFuZCBjYXNlLWxldmVsIGZsYWdzXG4gICAgICB0aGlzLnBhcnR5TGV2ZWxDYXNlRmxhZ0RhdGEgPSB0aGlzLmZsYWdzRGF0YS5maWx0ZXIoXG4gICAgICAgIGluc3RhbmNlID0+IGluc3RhbmNlLnBhdGhUb0ZsYWdzRm9ybUdyb3VwICE9PSB0aGlzLmNhc2VMZXZlbENhc2VGbGFnc0ZpZWxkSWQpO1xuICAgICAgLy8gVGhlcmUgd2lsbCBiZSBvbmx5IG9uZSBjYXNlLWxldmVsIGZsYWdzIGluc3RhbmNlIGNvbnRhaW5pbmcgYWxsIGNhc2UtbGV2ZWwgZmxhZyBkZXRhaWxzXG4gICAgICB0aGlzLmNhc2VMZXZlbENhc2VGbGFnRGF0YSA9IHRoaXMuZmxhZ3NEYXRhLmZpbmQoXG4gICAgICAgIGluc3RhbmNlID0+IGluc3RhbmNlLnBhdGhUb0ZsYWdzRm9ybUdyb3VwID09PSB0aGlzLmNhc2VMZXZlbENhc2VGbGFnc0ZpZWxkSWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb250ZXh0ID09PSBQYWxldHRlQ29udGV4dC5DSEVDS19ZT1VSX0FOU1dFUikge1xuICAgICAgLy8gSWYgdGhlIGNvbnRleHQgaXMgUGFsZXR0ZUNvbnRleHQuQ0hFQ0tfWU9VUl9BTlNXRVIsIHRoZSBGbGFncyBkYXRhIGlzIGFscmVhZHkgcHJlc2VudCB3aXRoaW4gdGhlIGZvcm1Hcm91cC5cbiAgICAgIC8vIFRoZSBGbGFnTGF1bmNoZXIgY29tcG9uZW50LCBXcml0ZUNhc2VGbGFnRmllbGRDb21wb25lbnQsIGhvbGRzIGEgcmVmZXJlbmNlIHRvOlxuICAgICAgLy8gaSkgdGhlIHBhcmVudCBVbnR5cGVkRm9ybUdyb3VwIGZvciB0aGUgRmxhZ3MgaW5zdGFuY2Ugd2hlcmUgY2hhbmdlcyBoYXZlIGJlZW4gbWFkZTtcbiAgICAgIC8vIGlpKSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGZsYWcgKHNlbGVjdGVkRmxhZykgaWYgb25lIGV4aXN0c1xuICAgICAgY29uc3QgZmxhZ0xhdW5jaGVyQ29udHJvbE5hbWUgPSBPYmplY3Qua2V5cyh0aGlzLmZvcm1Hcm91cC5jb250cm9scykuZmluZChcbiAgICAgICAgY29udHJvbE5hbWUgPT4gRmllbGRzVXRpbHMuaXNGbGFnTGF1bmNoZXJDYXNlRmllbGQodGhpcy5mb3JtR3JvdXAuZ2V0KGNvbnRyb2xOYW1lKVsnY2FzZUZpZWxkJ10pKTtcbiAgICAgIGlmIChmbGFnTGF1bmNoZXJDb250cm9sTmFtZSAmJiB0aGlzLmZvcm1Hcm91cC5nZXQoZmxhZ0xhdW5jaGVyQ29udHJvbE5hbWUpWydjb21wb25lbnQnXSkge1xuICAgICAgICBjb25zdCBmbGFnTGF1bmNoZXJDb21wb25lbnQgPSB0aGlzLmZvcm1Hcm91cC5nZXQoZmxhZ0xhdW5jaGVyQ29udHJvbE5hbWUpWydjb21wb25lbnQnXTtcbiAgICAgICAgLy8gVGhlIEZsYWdMYXVuY2hlciBjb21wb25lbnQgaG9sZHMgYSByZWZlcmVuY2UgKHNlbGVjdGVkRmxhZ3NMb2NhdGlvbikgY29udGFpbmluZyB0aGUgQ2FzZUZpZWxkIGluc3RhbmNlIHRvXG4gICAgICAgIC8vIHdoaWNoIHRoZSBuZXcgZmxhZyBoYXMgYmVlbiBhZGRlZFxuICAgICAgICBpZiAoZmxhZ0xhdW5jaGVyQ29tcG9uZW50LmNhc2VGaWVsZC5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyID09PSB0aGlzLmNyZWF0ZU1vZGUgJiZcbiAgICAgICAgICBmbGFnTGF1bmNoZXJDb21wb25lbnQuc2VsZWN0ZWRGbGFnc0xvY2F0aW9uKSB7XG4gICAgICAgICAgdGhpcy5mbGFnRm9yU3VtbWFyeURpc3BsYXkgPSB0aGlzLmV4dHJhY3ROZXdGbGFnVG9GbGFnRGV0YWlsRGlzcGxheU9iamVjdChcbiAgICAgICAgICAgIGZsYWdMYXVuY2hlckNvbXBvbmVudC5zZWxlY3RlZEZsYWdzTG9jYXRpb24pO1xuICAgICAgICAgIC8vIFNldCB0aGUgZGlzcGxheSBtb2RlIGZvciB0aGUgXCJSZXZpZXcgZmxhZyBkZXRhaWxzXCIgc3VtbWFyeSBwYWdlXG4gICAgICAgICAgdGhpcy5zdW1tYXJ5TGlzdERpc3BsYXlNb2RlID0gQ2FzZUZsYWdTdW1tYXJ5TGlzdERpc3BsYXlNb2RlLkNSRUFURTtcbiAgICAgICAgICAvLyBUaGUgRmxhZ0xhdW5jaGVyIGNvbXBvbmVudCBob2xkcyBhIHJlZmVyZW5jZSAoc2VsZWN0ZWRGbGFnKSwgd2hpY2ggZ2V0cyBzZXQgYWZ0ZXIgdGhlIHNlbGVjdGlvbiBzdGVwIG9mIHRoZVxuICAgICAgICAgIC8vIE1hbmFnZSBDYXNlIEZsYWdzIGpvdXJuZXlcbiAgICAgICAgfSBlbHNlIGlmIChmbGFnTGF1bmNoZXJDb21wb25lbnQuY2FzZUZpZWxkLmRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXIgPT09IHRoaXMudXBkYXRlTW9kZSAmJlxuICAgICAgICAgIGZsYWdMYXVuY2hlckNvbXBvbmVudC5zZWxlY3RlZEZsYWcpIHtcbiAgICAgICAgICB0aGlzLmZsYWdGb3JTdW1tYXJ5RGlzcGxheSA9XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5nZXQoZmxhZ0xhdW5jaGVyQ29udHJvbE5hbWUpWydjb21wb25lbnQnXS5zZWxlY3RlZEZsYWcuZmxhZ0RldGFpbERpc3BsYXk7XG4gICAgICAgICAgLy8gU2V0IHRoZSBkaXNwbGF5IG1vZGUgZm9yIHRoZSBcIlJldmlldyBmbGFnIGRldGFpbHNcIiBzdW1tYXJ5IHBhZ2VcbiAgICAgICAgICB0aGlzLnN1bW1hcnlMaXN0RGlzcGxheU1vZGUgPSBDYXNlRmxhZ1N1bW1hcnlMaXN0RGlzcGxheU1vZGUuTUFOQUdFO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0TmV3RmxhZ1RvRmxhZ0RldGFpbERpc3BsYXlPYmplY3Qoc2VsZWN0ZWRGbGFnc0xvY2F0aW9uOiBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoKTogRmxhZ0RldGFpbERpc3BsYXkge1xuICAgIC8vIFVzZSB0aGUgcGF0aFRvRmxhZ3NGb3JtR3JvdXAgcHJvcGVydHkgZnJvbSB0aGUgc2VsZWN0ZWQgZmxhZyBsb2NhdGlvbiB0byBkcmlsbCBkb3duIHRvIHRoZSBjb3JyZWN0IHBhcnQgb2YgdGhlXG4gICAgLy8gQ2FzZUZpZWxkIHZhbHVlIGNvbnRhaW5pbmcgdGhlIG5ldyBmbGFnXG4gICAgbGV0IGZsYWdzQ2FzZUZpZWxkVmFsdWUgPSBzZWxlY3RlZEZsYWdzTG9jYXRpb24uY2FzZUZpZWxkLnZhbHVlO1xuICAgIGNvbnN0IHBhdGggPSBzZWxlY3RlZEZsYWdzTG9jYXRpb24ucGF0aFRvRmxhZ3NGb3JtR3JvdXA7XG4gICAgLy8gUm9vdC1sZXZlbCBGbGFncyBDYXNlRmllbGRzIGRvbid0IGhhdmUgYSBkb3QtZGVsaW1pdGVkIHBhdGggLSBqdXN0IHRoZSBDYXNlRmllbGQgSUQgaXRzZWxmIC0gc28gZG9uJ3QgZHJpbGwgZG93blxuICAgIGlmIChwYXRoLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICBwYXRoLnNsaWNlKHBhdGguaW5kZXhPZignLicpICsgMSkuc3BsaXQoJy4nKS5mb3JFYWNoKHBhcnQgPT4gZmxhZ3NDYXNlRmllbGRWYWx1ZSA9IGZsYWdzQ2FzZUZpZWxkVmFsdWVbcGFydF0pO1xuICAgIH1cbiAgICBpZiAoZmxhZ3NDYXNlRmllbGRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFydHlOYW1lOiBmbGFnc0Nhc2VGaWVsZFZhbHVlLnBhcnR5TmFtZSxcbiAgICAgICAgLy8gTG9vayBpbiB0aGUgZGV0YWlscyBhcnJheSBmb3IgdGhlIG9iamVjdCB0aGF0IGRvZXMgKm5vdCogaGF2ZSBhbiBpZCAtIHRoaXMgaW5kaWNhdGVzIGl0IGlzIHRoZSBuZXcgZmxhZ1xuICAgICAgICBmbGFnRGV0YWlsOiBmbGFnc0Nhc2VGaWVsZFZhbHVlLmRldGFpbHMuZmluZChlbGVtZW50ID0+ICFlbGVtZW50Lmhhc093blByb3BlcnR5KCdpZCcpKS52YWx1ZVxuICAgICAgfSBhcyBGbGFnRGV0YWlsRGlzcGxheTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiY29udGV4dFwiPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJwYWxldHRlQ29udGV4dC5DSEVDS19ZT1VSX0FOU1dFUlwiPlxuICAgIDxjY2QtY2FzZS1mbGFnLXN1bW1hcnktbGlzdCBbZmxhZ0ZvclN1bW1hcnlEaXNwbGF5XT1cImZsYWdGb3JTdW1tYXJ5RGlzcGxheVwiXG4gICAgICBbc3VtbWFyeUxpc3REaXNwbGF5TW9kZV09XCJzdW1tYXJ5TGlzdERpc3BsYXlNb2RlXCI+PC9jY2QtY2FzZS1mbGFnLXN1bW1hcnktbGlzdD5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj5DYXNlIGZsYWdzPC9oMj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBmbGFnRGF0YSBvZiBwYXJ0eUxldmVsQ2FzZUZsYWdEYXRhXCI+XG4gICAgICA8Y2NkLWNhc2UtZmxhZy10YWJsZSAqbmdJZj1cImZsYWdEYXRhLmZsYWdzLnBhcnR5TmFtZVwiXG4gICAgICAgIFt0YWJsZUNhcHRpb25dPVwiZmxhZ0RhdGEuZmxhZ3MucGFydHlOYW1lXCJcbiAgICAgICAgW2ZsYWdEYXRhXT1cImZsYWdEYXRhXCJcbiAgICAgICAgW2ZpcnN0Q29sdW1uSGVhZGVyXT1cIidQYXJ0eSBsZXZlbCBmbGFncydcIlxuICAgICAgPjwvY2NkLWNhc2UtZmxhZy10YWJsZT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwiY2FzZUxldmVsQ2FzZUZsYWdEYXRhXCI+XG4gICAgICA8Y2NkLWNhc2UtZmxhZy10YWJsZVxuICAgICAgICBbdGFibGVDYXB0aW9uXT1cIidDYXNlIGxldmVsIGZsYWdzJ1wiXG4gICAgICAgIFtmbGFnRGF0YV09XCJjYXNlTGV2ZWxDYXNlRmxhZ0RhdGFcIlxuICAgICAgICBbZmlyc3RDb2x1bW5IZWFkZXJdPVwiJ0Nhc2UgZmxhZ3MnXCJcbiAgICAgID48L2NjZC1jYXNlLWZsYWctdGFibGU+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG4iXX0=