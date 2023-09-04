import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
export class CaseHistoryViewerFieldComponent extends AbstractFieldReadComponent {
}
CaseHistoryViewerFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵCaseHistoryViewerFieldComponent_BaseFactory; return function CaseHistoryViewerFieldComponent_Factory(t) { return (ɵCaseHistoryViewerFieldComponent_BaseFactory || (ɵCaseHistoryViewerFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(CaseHistoryViewerFieldComponent)))(t || CaseHistoryViewerFieldComponent); }; }();
CaseHistoryViewerFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseHistoryViewerFieldComponent, selectors: [["ccd-case-history-viewer-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "events"]], template: function CaseHistoryViewerFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "ccd-event-log", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("events", ctx.caseField.value);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseHistoryViewerFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-history-viewer-field', template: "<ccd-event-log [events]=\"caseField.value\"></ccd-event-log>" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1oaXN0b3J5LXZpZXdlci1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9oaXN0b3J5L2Nhc2UtaGlzdG9yeS12aWV3ZXItZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvaGlzdG9yeS9jYXNlLWhpc3Rvcnktdmlld2VyLWZpZWxkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBTXpGLE1BQU0sT0FBTywrQkFBZ0MsU0FBUSwwQkFBMEI7O21UQUFsRSwrQkFBK0IsU0FBL0IsK0JBQStCO2tGQUEvQiwrQkFBK0I7UUNQNUMsbUNBQTBEOztRQUEzQyw0Q0FBMEI7O3VGRE81QiwrQkFBK0I7Y0FKM0MsU0FBUzsyQkFDRSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1jYXNlLWhpc3Rvcnktdmlld2VyLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXNlLWhpc3Rvcnktdmlld2VyLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUhpc3RvcnlWaWV3ZXJGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IHt9XG4iLCI8Y2NkLWV2ZW50LWxvZyBbZXZlbnRzXT1cImNhc2VGaWVsZC52YWx1ZVwiPjwvY2NkLWV2ZW50LWxvZz4iXX0=