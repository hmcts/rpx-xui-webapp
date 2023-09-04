import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { CREATE_ACCESS } from '../../domain/case-view/access-types.model';
import { DefinitionsService } from '../../services/definitions/definitions.service';
import { OrderService } from '../../services/order/order.service';
import { SessionStorageService } from '../../services/session/session-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/order/order.service";
import * as i2 from "../../services/definitions/definitions.service";
import * as i3 from "../../services/session/session-storage.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "rpx-xui-translation";
function CreateCaseFiltersComponent_option_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const j_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", j_r3.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, j_r3.name));
} }
function CreateCaseFiltersComponent_option_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ct_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", ct_r4.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, ct_r4.name));
} }
function CreateCaseFiltersComponent_option_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", e_r5.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, e_r5.name));
} }
export class CreateCaseFiltersComponent {
    constructor(orderService, definitionsService, sessionStorageService) {
        this.orderService = orderService;
        this.definitionsService = definitionsService;
        this.sessionStorageService = sessionStorageService;
        this.selectionSubmitted = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        this.formGroup = new UntypedFormGroup({});
    }
    ngOnInit() {
        this.selected = {};
        this.initControls();
        this.definitionsService.getJurisdictions(CREATE_ACCESS)
            .subscribe(jurisdictions => {
            this.jurisdictions = jurisdictions;
            this.selectJurisdiction(this.jurisdictions, this.filterJurisdictionControl);
        });
        if (document.getElementById('cc-jurisdiction')) {
            document.getElementById('cc-jurisdiction').focus();
        }
    }
    onJurisdictionIdChange() {
        this.resetCaseType();
        this.resetEvent();
        if (this.filterJurisdictionControl.value !== '') {
            this.formGroup.controls['caseType'].enable();
            this.selected.jurisdiction = this.findJurisdiction(this.jurisdictions, this.filterJurisdictionControl.value);
            this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
            this.selectCaseType(this.selectedJurisdictionCaseTypes, this.filterCaseTypeControl);
        }
    }
    onCaseTypeIdChange() {
        this.resetEvent();
        if (this.filterCaseTypeControl.value !== '') {
            this.selected.caseType = this.findCaseType(this.selectedJurisdictionCaseTypes, this.filterCaseTypeControl.value);
            this.formGroup.controls['event'].enable();
            this.selectedCaseTypeEvents = this.sortEvents(this.selected.caseType.events);
            this.selectEvent(this.selectedCaseTypeEvents, this.filterEventControl);
        }
    }
    onEventIdChange() {
        this.emitChange();
        if (this.filterEventControl.value !== '') {
            this.selected.event = this.findEvent(this.selectedCaseTypeEvents, this.filterEventControl.value);
        }
        else {
            this.selected.event = null;
        }
    }
    isCreatable() {
        return !this.isEmpty(this.selected) &&
            !this.isEmpty(this.selected.jurisdiction) &&
            !this.isEmpty(this.selected.caseType) &&
            !this.isEmpty(this.selected.event) &&
            !this.isDisabled;
    }
    apply() {
        this.selectionSubmitted.emit({
            jurisdictionId: this.selected.jurisdiction.id,
            caseTypeId: this.selected.caseType.id,
            eventId: this.selected.event.id
        });
    }
    initControls() {
        this.filterJurisdictionControl = new FormControl('');
        this.formGroup.addControl('jurisdiction', this.filterJurisdictionControl);
        this.filterCaseTypeControl = new FormControl({ value: '', disabled: true });
        this.formGroup.addControl('caseType', this.filterCaseTypeControl);
        this.filterEventControl = new FormControl({ value: '', disabled: true });
        this.formGroup.addControl('event', this.filterEventControl);
    }
    emitChange() {
        setTimeout(() => {
            if (this.selectionChanged) {
                this.selectionChanged.emit();
            }
        }, 0);
    }
    sortEvents(events) {
        return this.orderService.sort(this.retainEventsWithCreateRights(this.retainEventsWithNoPreStates(events)));
    }
    retainEventsWithNoPreStates(events) {
        return events.filter(event => event.pre_states.length === 0);
    }
    retainEventsWithCreateRights(events) {
        const userProfile = JSON.parse(this.sessionStorageService.getItem('userDetails'));
        return events.filter(event => userProfile && userProfile.roles &&
            !!userProfile.roles.find(role => this.hasCreateAccess(event, role)));
    }
    hasCreateAccess(caseEvent, role) {
        return !!caseEvent.acls.find(acl => acl.role === role && acl.create === true);
    }
    selectJurisdiction(jurisdictions, filterJurisdictionControl) {
        if (jurisdictions.length === 1) {
            filterJurisdictionControl.setValue(jurisdictions[0].id);
            this.onJurisdictionIdChange();
        }
    }
    selectCaseType(caseTypes, filterCaseTypeControl) {
        if (caseTypes.length === 1) {
            filterCaseTypeControl.setValue(caseTypes[0].id);
            this.onCaseTypeIdChange();
        }
    }
    selectEvent(events, filterEventControl) {
        if (events.length === 1) {
            filterEventControl.setValue(events[0].id);
            this.onEventIdChange();
        }
    }
    findJurisdiction(jurisdictions, id) {
        return jurisdictions.find(j => j.id === id);
    }
    findCaseType(caseTypes, id) {
        return caseTypes.find(caseType => caseType.id === id);
    }
    findEvent(events, id) {
        return events.find(event => event.id === id);
    }
    resetCaseType() {
        this.emitChange();
        this.filterCaseTypeControl.setValue('');
        this.selected.caseType = null;
        this.selectedJurisdictionCaseTypes = [];
        this.formGroup.controls['caseType'].disable();
    }
    resetEvent() {
        this.emitChange();
        this.filterEventControl.setValue('');
        this.selected.event = null;
        this.selectedCaseTypeEvents = [];
        this.formGroup.controls['event'].disable();
    }
    isEmpty(value) {
        return value === null || value === undefined;
    }
}
CreateCaseFiltersComponent.ɵfac = function CreateCaseFiltersComponent_Factory(t) { return new (t || CreateCaseFiltersComponent)(i0.ɵɵdirectiveInject(i1.OrderService), i0.ɵɵdirectiveInject(i2.DefinitionsService), i0.ɵɵdirectiveInject(i3.SessionStorageService)); };
CreateCaseFiltersComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateCaseFiltersComponent, selectors: [["ccd-create-case-filters"]], inputs: { isDisabled: "isDisabled", startButtonText: "startButtonText" }, outputs: { selectionSubmitted: "selectionSubmitted", selectionChanged: "selectionChanged" }, decls: 31, vars: 28, consts: [[3, "ngSubmit"], [1, "form-group"], ["for", "cc-jurisdiction", 1, "form-label"], ["id", "cc-jurisdiction", "name", "jurisdiction", 1, "form-control", "ccd-dropdown", 3, "formControl", "change"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["for", "cc-case-type", 1, "form-label"], ["id", "cc-case-type", "name", "case-type", 1, "form-control", "ccd-dropdown", 3, "formControl", "change"], ["for", "cc-event", 1, "form-label"], ["id", "cc-event", "name", "event", 1, "form-control", "ccd-dropdown", 3, "formControl", "change"], ["type", "submit", 1, "button", 3, "disabled"], [3, "value"]], template: function CreateCaseFiltersComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵlistener("ngSubmit", function CreateCaseFiltersComponent_Template_form_ngSubmit_0_listener() { return ctx.apply(); });
        i0.ɵɵelementStart(1, "div", 1)(2, "label", 2);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "select", 3);
        i0.ɵɵlistener("change", function CreateCaseFiltersComponent_Template_select_change_5_listener() { return ctx.onJurisdictionIdChange(); });
        i0.ɵɵelementStart(6, "option", 4);
        i0.ɵɵtext(7);
        i0.ɵɵpipe(8, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, CreateCaseFiltersComponent_option_9_Template, 3, 4, "option", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(10, "div", 1)(11, "label", 6);
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "select", 7);
        i0.ɵɵlistener("change", function CreateCaseFiltersComponent_Template_select_change_14_listener() { return ctx.onCaseTypeIdChange(); });
        i0.ɵɵelementStart(15, "option", 4);
        i0.ɵɵtext(16);
        i0.ɵɵpipe(17, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(18, CreateCaseFiltersComponent_option_18_Template, 3, 4, "option", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(19, "div", 1)(20, "label", 8);
        i0.ɵɵtext(21);
        i0.ɵɵpipe(22, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "select", 9);
        i0.ɵɵlistener("change", function CreateCaseFiltersComponent_Template_select_change_23_listener() { return ctx.onEventIdChange(); });
        i0.ɵɵelementStart(24, "option", 4);
        i0.ɵɵtext(25);
        i0.ɵɵpipe(26, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(27, CreateCaseFiltersComponent_option_27_Template, 3, 4, "option", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(28, "button", 10);
        i0.ɵɵtext(29);
        i0.ɵɵpipe(30, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 14, "Jurisdiction"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("formControl", ctx.filterJurisdictionControl);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("--", i0.ɵɵpipeBind1(8, 16, "Select a value"), "--");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.jurisdictions);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 18, "Case type"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("formControl", ctx.filterCaseTypeControl);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("--", i0.ɵɵpipeBind1(17, 20, "Select a value"), "--");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.selectedJurisdictionCaseTypes);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 22, "Event"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("formControl", ctx.filterEventControl);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("--", i0.ɵɵpipeBind1(26, 24, "Select a value"), "--");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.selectedCaseTypeEvents);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.isCreatable());
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 26, ctx.startButtonText));
    } }, dependencies: [i4.NgForOf, i5.ɵNgNoValidate, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.NgForm, i5.FormControlDirective, i6.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateCaseFiltersComponent, [{
        type: Component,
        args: [{ selector: 'ccd-create-case-filters', template: "<form  (ngSubmit)=\"apply()\">\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"cc-jurisdiction\">{{'Jurisdiction' | rpxTranslate}}</label>\n    <select class=\"form-control ccd-dropdown\" id=\"cc-jurisdiction\" name=\"jurisdiction\" [formControl]=\"filterJurisdictionControl\" (change)=\"onJurisdictionIdChange()\">\n      <option value=\"\">--{{'Select a value' | rpxTranslate}}--</option>\n      <option *ngFor=\"let j of jurisdictions\" [value]=\"j.id\">{{j.name | rpxTranslate}}</option>\n    </select>\n  </div>\n\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"cc-case-type\">{{'Case type' | rpxTranslate}}</label>\n    <select class=\"form-control ccd-dropdown\" id=\"cc-case-type\" name=\"case-type\" [formControl]=\"filterCaseTypeControl\" (change)=\"onCaseTypeIdChange()\">\n      <option value=\"\">--{{'Select a value' | rpxTranslate}}--</option>\n      <option *ngFor=\"let ct of selectedJurisdictionCaseTypes\" [value]=\"ct.id\">{{ct.name | rpxTranslate}}</option>\n    </select>\n  </div>\n\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"cc-event\">{{'Event' | rpxTranslate}}</label>\n    <select class=\"form-control ccd-dropdown\" id=\"cc-event\" name=\"event\" [formControl]=\"filterEventControl\" (change)=\"onEventIdChange()\">\n      <option value=\"\">--{{'Select a value' | rpxTranslate}}--</option>\n      <option *ngFor=\"let e of selectedCaseTypeEvents\" [value]=\"e.id\">{{e.name | rpxTranslate}}</option>\n    </select>\n  </div>\n\n  <button type=\"submit\" class=\"button\" [disabled]=\"!isCreatable()\">{{startButtonText | rpxTranslate}}</button>\n</form>\n" }]
    }], function () { return [{ type: i1.OrderService }, { type: i2.DefinitionsService }, { type: i3.SessionStorageService }]; }, { isDisabled: [{
            type: Input
        }], startButtonText: [{
            type: Input
        }], selectionSubmitted: [{
            type: Output
        }], selectionChanged: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNhc2UtZmlsdGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY3JlYXRlLWNhc2UtZmlsdGVycy9jcmVhdGUtY2FzZS1maWx0ZXJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jcmVhdGUtY2FzZS1maWx0ZXJzL2NyZWF0ZS1jYXNlLWZpbHRlcnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBSTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7Ozs7Ozs7O0lDSGpGLGtDQUF1RDtJQUFBLFlBQXlCOztJQUFBLGlCQUFTOzs7SUFBakQsK0JBQWM7SUFBQyxlQUF5QjtJQUF6QixxREFBeUI7OztJQVFoRixrQ0FBeUU7SUFBQSxZQUEwQjs7SUFBQSxpQkFBUzs7O0lBQW5ELGdDQUFlO0lBQUMsZUFBMEI7SUFBMUIsc0RBQTBCOzs7SUFRbkcsa0NBQWdFO0lBQUEsWUFBeUI7O0lBQUEsaUJBQVM7OztJQUFqRCwrQkFBYztJQUFDLGVBQXlCO0lBQXpCLHFE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Qzs7dUZEVnhGLDBCQUEwQjtjQUp0QyxTQUFTOzJCQUNFLHlCQUF5QjtvSUFNNUIsVUFBVTtrQkFEaEIsS0FBSztZQUdDLGVBQWU7a0JBRHJCLEtBQUs7WUFHQyxrQkFBa0I7a0JBRHhCLE1BQU07WUFHQSxnQkFBZ0I7a0JBRHRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENSRUFURV9BQ0NFU1MgfSBmcm9tICcuLi8uLi9kb21haW4vY2FzZS12aWV3L2FjY2Vzcy10eXBlcy5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlRXZlbnQgfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWV2ZW50Lm1vZGVsJztcbmltcG9ydCB7IENhc2VUeXBlTGl0ZSB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtdHlwZS1saXRlLm1vZGVsJztcbmltcG9ydCB7IEp1cmlzZGljdGlvbiB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2p1cmlzZGljdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBEZWZpbml0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kZWZpbml0aW9ucy9kZWZpbml0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyL29yZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2Vzc2lvbi9zZXNzaW9uLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVDYXNlRmlsdGVyc1NlbGVjdGlvbiB9IGZyb20gJy4vY3JlYXRlLWNhc2UtZmlsdGVycy1zZWxlY3Rpb24ubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY3JlYXRlLWNhc2UtZmlsdGVycycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcmVhdGUtY2FzZS1maWx0ZXJzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVDYXNlRmlsdGVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzdGFydEJ1dHRvblRleHQ6IHN0cmluZztcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBzZWxlY3Rpb25TdWJtaXR0ZWQ6IEV2ZW50RW1pdHRlcjxDcmVhdGVDYXNlRmlsdGVyc1NlbGVjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgc2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcblxuICBwdWJsaWMgc2VsZWN0ZWQ6IHtcbiAgICBqdXJpc2RpY3Rpb24/OiBKdXJpc2RpY3Rpb24sXG4gICAgY2FzZVR5cGU/OiBDYXNlVHlwZUxpdGUsXG4gICAgZXZlbnQ/OiBDYXNlRXZlbnQsXG4gICAgZm9ybUdyb3VwPzogVW50eXBlZEZvcm1Hcm91cFxuICB9O1xuXG4gIHB1YmxpYyBqdXJpc2RpY3Rpb25zOiBKdXJpc2RpY3Rpb25bXTtcbiAgcHVibGljIHNlbGVjdGVkSnVyaXNkaWN0aW9uQ2FzZVR5cGVzPzogQ2FzZVR5cGVMaXRlW107XG4gIHB1YmxpYyBzZWxlY3RlZENhc2VUeXBlRXZlbnRzPzogQ2FzZUV2ZW50W107XG5cbiAgcHVibGljIGZpbHRlckp1cmlzZGljdGlvbkNvbnRyb2w6IEZvcm1Db250cm9sO1xuICBwdWJsaWMgZmlsdGVyQ2FzZVR5cGVDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgcHVibGljIGZpbHRlckV2ZW50Q29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlZmluaXRpb25zU2VydmljZTogRGVmaW5pdGlvbnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlOiBTZXNzaW9uU3RvcmFnZVNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHt9O1xuICAgIHRoaXMuaW5pdENvbnRyb2xzKCk7XG4gICAgdGhpcy5kZWZpbml0aW9uc1NlcnZpY2UuZ2V0SnVyaXNkaWN0aW9ucyhDUkVBVEVfQUNDRVNTKVxuICAgICAgLnN1YnNjcmliZShqdXJpc2RpY3Rpb25zID0+IHtcbiAgICAgICAgdGhpcy5qdXJpc2RpY3Rpb25zID0ganVyaXNkaWN0aW9ucztcbiAgICAgICAgdGhpcy5zZWxlY3RKdXJpc2RpY3Rpb24odGhpcy5qdXJpc2RpY3Rpb25zLCB0aGlzLmZpbHRlckp1cmlzZGljdGlvbkNvbnRyb2wpO1xuICAgICAgfSk7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYy1qdXJpc2RpY3Rpb24nKSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NjLWp1cmlzZGljdGlvbicpLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uSnVyaXNkaWN0aW9uSWRDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldENhc2VUeXBlKCk7XG4gICAgdGhpcy5yZXNldEV2ZW50KCk7XG4gICAgaWYgKHRoaXMuZmlsdGVySnVyaXNkaWN0aW9uQ29udHJvbC52YWx1ZSAhPT0gJycpIHtcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzWydjYXNlVHlwZSddLmVuYWJsZSgpO1xuICAgICAgdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24gPSB0aGlzLmZpbmRKdXJpc2RpY3Rpb24odGhpcy5qdXJpc2RpY3Rpb25zLCB0aGlzLmZpbHRlckp1cmlzZGljdGlvbkNvbnRyb2wudmFsdWUpO1xuICAgICAgdGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlcyA9IHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uLmNhc2VUeXBlcztcbiAgICAgIHRoaXMuc2VsZWN0Q2FzZVR5cGUodGhpcy5zZWxlY3RlZEp1cmlzZGljdGlvbkNhc2VUeXBlcywgdGhpcy5maWx0ZXJDYXNlVHlwZUNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNhc2VUeXBlSWRDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldEV2ZW50KCk7XG4gICAgaWYgKHRoaXMuZmlsdGVyQ2FzZVR5cGVDb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSA9IHRoaXMuZmluZENhc2VUeXBlKHRoaXMuc2VsZWN0ZWRKdXJpc2RpY3Rpb25DYXNlVHlwZXMsIHRoaXMuZmlsdGVyQ2FzZVR5cGVDb250cm9sLnZhbHVlKTtcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzWydldmVudCddLmVuYWJsZSgpO1xuICAgICAgdGhpcy5zZWxlY3RlZENhc2VUeXBlRXZlbnRzID0gdGhpcy5zb3J0RXZlbnRzKHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUuZXZlbnRzKTtcbiAgICAgIHRoaXMuc2VsZWN0RXZlbnQodGhpcy5zZWxlY3RlZENhc2VUeXBlRXZlbnRzLCB0aGlzLmZpbHRlckV2ZW50Q29udHJvbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uRXZlbnRJZENoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICBpZiAodGhpcy5maWx0ZXJFdmVudENvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkLmV2ZW50ID0gdGhpcy5maW5kRXZlbnQodGhpcy5zZWxlY3RlZENhc2VUeXBlRXZlbnRzLCB0aGlzLmZpbHRlckV2ZW50Q29udHJvbC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuZXZlbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0NyZWF0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNFbXB0eSh0aGlzLnNlbGVjdGVkKSAmJlxuICAgICAgIXRoaXMuaXNFbXB0eSh0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbikgJiZcbiAgICAgICF0aGlzLmlzRW1wdHkodGhpcy5zZWxlY3RlZC5jYXNlVHlwZSkgJiZcbiAgICAgICF0aGlzLmlzRW1wdHkodGhpcy5zZWxlY3RlZC5ldmVudCkgJiZcbiAgICAgICF0aGlzLmlzRGlzYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgYXBwbHkoKSB7XG4gICAgdGhpcy5zZWxlY3Rpb25TdWJtaXR0ZWQuZW1pdCh7XG4gICAgICBqdXJpc2RpY3Rpb25JZDogdGhpcy5zZWxlY3RlZC5qdXJpc2RpY3Rpb24uaWQsXG4gICAgICBjYXNlVHlwZUlkOiB0aGlzLnNlbGVjdGVkLmNhc2VUeXBlLmlkLFxuICAgICAgZXZlbnRJZDogdGhpcy5zZWxlY3RlZC5ldmVudC5pZFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGluaXRDb250cm9scygpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlckp1cmlzZGljdGlvbkNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ2p1cmlzZGljdGlvbicsIHRoaXMuZmlsdGVySnVyaXNkaWN0aW9uQ29udHJvbCk7XG4gICAgdGhpcy5maWx0ZXJDYXNlVHlwZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woeyB2YWx1ZTogJycsIGRpc2FibGVkOiB0cnVlIH0pO1xuICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ2Nhc2VUeXBlJywgdGhpcy5maWx0ZXJDYXNlVHlwZUNvbnRyb2wpO1xuICAgIHRoaXMuZmlsdGVyRXZlbnRDb250cm9sID0gbmV3IEZvcm1Db250cm9sKHsgdmFsdWU6ICcnLCBkaXNhYmxlZDogdHJ1ZSB9KTtcbiAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdldmVudCcsIHRoaXMuZmlsdGVyRXZlbnRDb250cm9sKTtcbiAgfVxuXG4gIHB1YmxpYyBlbWl0Q2hhbmdlKCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB3b3JrYXJvdW5kIHRvIHByZXZlbnQgJ0V4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3InXG4gICAgICBpZiAodGhpcy5zZWxlY3Rpb25DaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZC5lbWl0KCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIHNvcnRFdmVudHMoZXZlbnRzOiBDYXNlRXZlbnRbXSk6IENhc2VFdmVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5vcmRlclNlcnZpY2Uuc29ydCh0aGlzLnJldGFpbkV2ZW50c1dpdGhDcmVhdGVSaWdodHModGhpcy5yZXRhaW5FdmVudHNXaXRoTm9QcmVTdGF0ZXMoZXZlbnRzKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXRhaW5FdmVudHNXaXRoTm9QcmVTdGF0ZXMoZXZlbnRzOiBDYXNlRXZlbnRbXSk6IENhc2VFdmVudFtdIHtcbiAgICByZXR1cm4gZXZlbnRzLmZpbHRlcihldmVudCA9PiBldmVudC5wcmVfc3RhdGVzLmxlbmd0aCA9PT0gMCk7XG4gIH1cblxuICBwcml2YXRlIHJldGFpbkV2ZW50c1dpdGhDcmVhdGVSaWdodHMoZXZlbnRzOiBDYXNlRXZlbnRbXSk6IENhc2VFdmVudFtdIHtcbiAgICBjb25zdCB1c2VyUHJvZmlsZSA9IEpTT04ucGFyc2UodGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbSgndXNlckRldGFpbHMnKSk7XG4gICAgcmV0dXJuIGV2ZW50cy5maWx0ZXIoZXZlbnQgPT4gdXNlclByb2ZpbGUgJiYgdXNlclByb2ZpbGUucm9sZXMgJiZcbiAgICAgICEhdXNlclByb2ZpbGUucm9sZXMuZmluZChyb2xlID0+IHRoaXMuaGFzQ3JlYXRlQWNjZXNzKGV2ZW50LCByb2xlKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNDcmVhdGVBY2Nlc3MoY2FzZUV2ZW50OiBDYXNlRXZlbnQsIHJvbGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWNhc2VFdmVudC5hY2xzLmZpbmQoYWNsID0+IGFjbC5yb2xlID09PSByb2xlICYmIGFjbC5jcmVhdGUgPT09IHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RKdXJpc2RpY3Rpb24oanVyaXNkaWN0aW9uczogSnVyaXNkaWN0aW9uW10sIGZpbHRlckp1cmlzZGljdGlvbkNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgaWYgKGp1cmlzZGljdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICBmaWx0ZXJKdXJpc2RpY3Rpb25Db250cm9sLnNldFZhbHVlKGp1cmlzZGljdGlvbnNbMF0uaWQpO1xuICAgICAgdGhpcy5vbkp1cmlzZGljdGlvbklkQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RDYXNlVHlwZShjYXNlVHlwZXM6IENhc2VUeXBlTGl0ZVtdLCBmaWx0ZXJDYXNlVHlwZUNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgaWYgKGNhc2VUeXBlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGZpbHRlckNhc2VUeXBlQ29udHJvbC5zZXRWYWx1ZShjYXNlVHlwZXNbMF0uaWQpO1xuICAgICAgdGhpcy5vbkNhc2VUeXBlSWRDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdEV2ZW50KGV2ZW50czogQ2FzZUV2ZW50W10sIGZpbHRlckV2ZW50Q29udHJvbDogRm9ybUNvbnRyb2wpIHtcbiAgICBpZiAoZXZlbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZmlsdGVyRXZlbnRDb250cm9sLnNldFZhbHVlKGV2ZW50c1swXS5pZCk7XG4gICAgICB0aGlzLm9uRXZlbnRJZENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEp1cmlzZGljdGlvbihqdXJpc2RpY3Rpb25zOiBKdXJpc2RpY3Rpb25bXSwgaWQ6IHN0cmluZyk6IEp1cmlzZGljdGlvbiB7XG4gICAgcmV0dXJuIGp1cmlzZGljdGlvbnMuZmluZChqID0+IGouaWQgPT09IGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZENhc2VUeXBlKGNhc2VUeXBlczogQ2FzZVR5cGVMaXRlW10sIGlkOiBzdHJpbmcpOiBDYXNlVHlwZUxpdGUge1xuICAgIHJldHVybiBjYXNlVHlwZXMuZmluZChjYXNlVHlwZSA9PiBjYXNlVHlwZS5pZCA9PT0gaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kRXZlbnQoZXZlbnRzOiBDYXNlRXZlbnRbXSwgaWQ6IHN0cmluZyk6IENhc2VFdmVudCB7XG4gICAgcmV0dXJuIGV2ZW50cy5maW5kKGV2ZW50ID0+IGV2ZW50LmlkID09PSBpZCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q2FzZVR5cGUoKTogdm9pZCB7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgdGhpcy5maWx0ZXJDYXNlVHlwZUNvbnRyb2wuc2V0VmFsdWUoJycpO1xuICAgIHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRKdXJpc2RpY3Rpb25DYXNlVHlwZXMgPSBbXTtcbiAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1snY2FzZVR5cGUnXS5kaXNhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RXZlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgdGhpcy5maWx0ZXJFdmVudENvbnRyb2wuc2V0VmFsdWUoJycpO1xuICAgIHRoaXMuc2VsZWN0ZWQuZXZlbnQgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRDYXNlVHlwZUV2ZW50cyA9IFtdO1xuICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzWydldmVudCddLmRpc2FibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNFbXB0eSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIjxmb3JtICAobmdTdWJtaXQpPVwiYXBwbHkoKVwiPlxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiBmb3I9XCJjYy1qdXJpc2RpY3Rpb25cIj57eydKdXJpc2RpY3Rpb24nIHwgcnB4VHJhbnNsYXRlfX08L2xhYmVsPlxuICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY2NkLWRyb3Bkb3duXCIgaWQ9XCJjYy1qdXJpc2RpY3Rpb25cIiBuYW1lPVwianVyaXNkaWN0aW9uXCIgW2Zvcm1Db250cm9sXT1cImZpbHRlckp1cmlzZGljdGlvbkNvbnRyb2xcIiAoY2hhbmdlKT1cIm9uSnVyaXNkaWN0aW9uSWRDaGFuZ2UoKVwiPlxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPi0te3snU2VsZWN0IGEgdmFsdWUnIHwgcnB4VHJhbnNsYXRlfX0tLTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgaiBvZiBqdXJpc2RpY3Rpb25zXCIgW3ZhbHVlXT1cImouaWRcIj57e2oubmFtZSB8IHJweFRyYW5zbGF0ZX19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGZvcj1cImNjLWNhc2UtdHlwZVwiPnt7J0Nhc2UgdHlwZScgfCBycHhUcmFuc2xhdGV9fTwvbGFiZWw+XG4gICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBjY2QtZHJvcGRvd25cIiBpZD1cImNjLWNhc2UtdHlwZVwiIG5hbWU9XCJjYXNlLXR5cGVcIiBbZm9ybUNvbnRyb2xdPVwiZmlsdGVyQ2FzZVR5cGVDb250cm9sXCIgKGNoYW5nZSk9XCJvbkNhc2VUeXBlSWRDaGFuZ2UoKVwiPlxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPi0te3snU2VsZWN0IGEgdmFsdWUnIHwgcnB4VHJhbnNsYXRlfX0tLTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgY3Qgb2Ygc2VsZWN0ZWRKdXJpc2RpY3Rpb25DYXNlVHlwZXNcIiBbdmFsdWVdPVwiY3QuaWRcIj57e2N0Lm5hbWUgfCBycHhUcmFuc2xhdGV9fTwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiBmb3I9XCJjYy1ldmVudFwiPnt7J0V2ZW50JyB8IHJweFRyYW5zbGF0ZX19PC9sYWJlbD5cbiAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNjZC1kcm9wZG93blwiIGlkPVwiY2MtZXZlbnRcIiBuYW1lPVwiZXZlbnRcIiBbZm9ybUNvbnRyb2xdPVwiZmlsdGVyRXZlbnRDb250cm9sXCIgKGNoYW5nZSk9XCJvbkV2ZW50SWRDaGFuZ2UoKVwiPlxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPi0te3snU2VsZWN0IGEgdmFsdWUnIHwgcnB4VHJhbnNsYXRlfX0tLTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgZSBvZiBzZWxlY3RlZENhc2VUeXBlRXZlbnRzXCIgW3ZhbHVlXT1cImUuaWRcIj57e2UubmFtZSB8IHJweFRyYW5zbGF0ZX19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuXG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiFpc0NyZWF0YWJsZSgpXCI+e3tzdGFydEJ1dHRvblRleHQgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9mb3JtPlxuIl19