import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormValueService } from '../../../services/form/form-value.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/form/form-value.service";
function CaseEditFormComponent_ng_container_0_ccd_field_read_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-field-read", 6);
} if (rf & 2) {
    const field_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", field_r1)("caseFields", ctx_r2.caseFields)("withLabel", true)("formGroup", ctx_r2.formGroup);
    i0.ɵɵattribute("field_id", field_r1.id)("field_type", field_r1.field_type.type);
} }
function CaseEditFormComponent_ng_container_0_ng_container_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ccd-field-write", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", field_r1)("caseFields", ctx_r5.caseFields)("formGroup", ctx_r5.formGroup)("hidden", field_r1.hidden);
    i0.ɵɵattribute("field_id", field_r1.id)("field_type", field_r1.field_type.type);
} }
function CaseEditFormComponent_ng_container_0_ng_container_5_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-field-write", 9);
} if (rf & 2) {
    const field_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", field_r1)("caseFields", ctx_r7.caseFields)("formGroup", ctx_r7.formGroup)("idPrefix", field_r1.id + "_")("hidden", field_r1.hidden);
    i0.ɵɵattribute("field_id", field_r1.id)("field_type", field_r1.field_type.type);
} }
function CaseEditFormComponent_ng_container_0_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseEditFormComponent_ng_container_0_ng_container_5_ng_container_1_Template, 2, 6, "ng-container", 7);
    i0.ɵɵpipe(2, "ccdIsCompound");
    i0.ɵɵtemplate(3, CaseEditFormComponent_ng_container_0_ng_container_5_ng_template_3_Template, 1, 7, "ng-template", null, 8, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r6 = i0.ɵɵreference(4);
    const field_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !i0.ɵɵpipeBind1(2, 2, field_r1))("ngIfElse", _r6);
} }
function CaseEditFormComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelementContainerStart(2, 3);
    i0.ɵɵpipe(3, "ccdIsReadOnlyAndNotCollection");
    i0.ɵɵtemplate(4, CaseEditFormComponent_ng_container_0_ccd_field_read_4_Template, 1, 6, "ccd-field-read", 4);
    i0.ɵɵtemplate(5, CaseEditFormComponent_ng_container_0_ng_container_5_Template, 5, 4, "ng-container", 5);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.formGroup)("caseFields", ctx_r0.fields)("contextFields", ctx_r0.caseFields);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", field_r1)("formGroup", ctx_r0.formGroup)("contextFields", ctx_r0.caseFields);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", i0.ɵɵpipeBind1(3, 9, field_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitchCase", true);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", false);
} }
export class CaseEditFormComponent {
    constructor(formValueService) {
        this.formValueService = formValueService;
        this.fields = [];
        this.caseFields = [];
        this.pageChangeSubject = new Subject();
        this.valuesChanged = new EventEmitter();
    }
    ngOnDestroy() {
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
        if (this.formGroupChangeSubscription) {
            this.formGroupChangeSubscription.unsubscribe();
        }
    }
    // We need the below un/subscribe complexity as we do not have proper page component per page with its AfterViewInit hook
    // being called on each page load. This is done for "Cancel and return" modal from RDM-2302.
    ngAfterViewInit() {
        this.retrieveInitialFormValues();
        this.pageChangeSubscription = this.pageChangeSubject.subscribe(() => {
            if (this.formGroupChangeSubscription) {
                this.formGroupChangeSubscription.unsubscribe();
            }
            // Timeout is required for the form to be rendered before subscription to form changes and initial form values retrieval.
            setTimeout(() => {
                this.subscribeToFormChanges();
                this.retrieveInitialFormValues();
            });
        });
        this.subscribeToFormChanges();
    }
    subscribeToFormChanges() {
        this.formGroupChangeSubscription = this.formGroup.valueChanges
            .pipe(debounceTime(200))
            .subscribe(_ => this.detectChangesAndEmit(_));
    }
    retrieveInitialFormValues() {
        this.initial = JSON.stringify(this.formValueService.sanitise(this.formGroup.value));
    }
    detectChangesAndEmit(changes) {
        const current = JSON.stringify(this.formValueService.sanitise(changes));
        this.initial !== current ? this.valuesChanged.emit(true) : this.valuesChanged.emit(false);
    }
}
CaseEditFormComponent.ɵfac = function CaseEditFormComponent_Factory(t) { return new (t || CaseEditFormComponent)(i0.ɵɵdirectiveInject(i1.FormValueService)); };
CaseEditFormComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEditFormComponent, selectors: [["ccd-case-edit-form"]], inputs: { fields: "fields", formGroup: "formGroup", caseFields: "caseFields", pageChangeSubject: "pageChangeSubject" }, outputs: { valuesChanged: "valuesChanged" }, decls: 1, vars: 1, consts: [["ccdConditionalShowForm", "", 3, "formGroup", "caseFields", "contextFields", 4, "ngFor", "ngForOf"], ["ccdConditionalShowForm", "", 3, "formGroup", "caseFields", "contextFields"], ["ccdLabelSubstitutor", "", 3, "caseField", "formGroup", "contextFields"], [3, "ngSwitch"], [3, "caseField", "caseFields", "withLabel", "formGroup", 4, "ngSwitchCase"], [4, "ngSwitchCase"], [3, "caseField", "caseFields", "withLabel", "formGroup"], [4, "ngIf", "ngIfElse"], ["CompoundRow", ""], [3, "caseField", "caseFields", "formGroup", "idPrefix", "hidden"]], template: function CaseEditFormComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseEditFormComponent_ng_container_0_Template, 6, 11, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.fields);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEditFormComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-edit-form', template: "<ng-container ccdConditionalShowForm [formGroup]=\"formGroup\" [caseFields]=\"fields\" [contextFields]=\"caseFields\"\n              *ngFor=\"let field of fields\">\n\n  <div ccdLabelSubstitutor [caseField]=\"field\" [formGroup]=\"formGroup\" [contextFields]=\"caseFields\">\n    <ng-container [ngSwitch]=\"field | ccdIsReadOnlyAndNotCollection\">\n\n      <ccd-field-read *ngSwitchCase=\"true\" [caseField]=\"field\" [caseFields]=\"caseFields\" [withLabel]=\"true\"\n                      [formGroup]=\"formGroup\" [attr.field_id]=\"field.id\"\n                      [attr.field_type]=\"field.field_type.type\"></ccd-field-read>\n      <ng-container *ngSwitchCase=\"false\">\n\n        <ng-container *ngIf=\"!(field | ccdIsCompound); else CompoundRow\">\n          <ccd-field-write [caseField]=\"field\"\n                           [caseFields]=\"caseFields\"\n                           [formGroup]=\"formGroup\"\n                           [idPrefix]=\"\"\n                           [hidden]=\"field.hidden\"\n                           [attr.field_id]=\"field.id\"\n                           [attr.field_type]=\"field.field_type.type\">\n          </ccd-field-write>\n        </ng-container>\n\n        <ng-template #CompoundRow>\n          <ccd-field-write [caseField]=\"field\"\n                           [caseFields]=\"caseFields\"\n                           [formGroup]=\"formGroup\"\n                           [idPrefix]=\"field.id + '_'\"\n                           [hidden]=\"field.hidden\"\n                           [attr.field_id]=\"field.id\"\n                           [attr.field_type]=\"field.field_type.type\"></ccd-field-write>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n" }]
    }], function () { return [{ type: i1.FormValueService }]; }, { fields: [{
            type: Input
        }], formGroup: [{
            type: Input
        }], caseFields: [{
            type: Input
        }], pageChangeSubject: [{
            type: Input
        }], valuesChanged: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1lZGl0LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL2Nhc2UtZWRpdC1mb3JtL2Nhc2UtZWRpdC1mb3JtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQtZm9ybS9jYXNlLWVkaXQtZm9ybS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7OztJQ0N2RSxvQ0FFMkU7Ozs7SUFGdEMsb0NBQW1CLGlDQUFBLG1CQUFBLCtCQUFBO0lBQ2hCLHVDQUEwQix3Q0FBQTs7O0lBSWhFLDZCQUFpRTtJQUMvRCxxQ0FPa0I7SUFDcEIsMEJBQWU7Ozs7SUFSSSxlQUFtQjtJQUFuQixvQ0FBbUIsaUNBQUEsK0JBQUEsMkJBQUE7SUFLbkIsdUNBQTBCLHdDQUFBOzs7SUFNM0MscUNBTTZFOzs7O0lBTjVELG9DQUFtQixpQ0FBQSwrQkFBQSwrQkFBQSwyQkFBQTtJQUtuQix1Q0FBMEIsd0NBQUE7OztJQW5CL0MsNkJBQW9DO0lBRWxDLHNIQVNlOztJQUVmLHFKQVFjO0lB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b0I7bUVBTXZCLE1BQU07a0JBRFosS0FBSztZQUdDLFNBQVM7a0JBRGYsS0FBSztZQUdDLFVBQVU7a0JBRGhCLEtBQUs7WUFHQyxpQkFBaUI7a0JBRHZCLEtBQUs7WUFHQyxhQUFhO2tCQURuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBGb3JtVmFsdWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZm9ybS9mb3JtLXZhbHVlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1lZGl0LWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJ2Nhc2UtZWRpdC1mb3JtLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VFZGl0Rm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGZpZWxkczogQ2FzZUZpZWxkW10gPSBbXTtcbiAgQElucHV0KClcbiAgcHVibGljIGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cDtcbiAgQElucHV0KClcbiAgcHVibGljIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdID0gW107XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwYWdlQ2hhbmdlU3ViamVjdDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0KCk7XG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgdmFsdWVzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGluaXRpYWw6IGFueTtcbiAgcHVibGljIHBhZ2VDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGZvcm1Hcm91cENoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZm9ybVZhbHVlU2VydmljZTogRm9ybVZhbHVlU2VydmljZSkgeyB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucGFnZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5mb3JtR3JvdXBDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZm9ybUdyb3VwQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gV2UgbmVlZCB0aGUgYmVsb3cgdW4vc3Vic2NyaWJlIGNvbXBsZXhpdHkgYXMgd2UgZG8gbm90IGhhdmUgcHJvcGVyIHBhZ2UgY29tcG9uZW50IHBlciBwYWdlIHdpdGggaXRzIEFmdGVyVmlld0luaXQgaG9va1xuICAvLyBiZWluZyBjYWxsZWQgb24gZWFjaCBwYWdlIGxvYWQuIFRoaXMgaXMgZG9uZSBmb3IgXCJDYW5jZWwgYW5kIHJldHVyblwiIG1vZGFsIGZyb20gUkRNLTIzMDIuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXRyaWV2ZUluaXRpYWxGb3JtVmFsdWVzKCk7XG4gICAgdGhpcy5wYWdlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5wYWdlQ2hhbmdlU3ViamVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZm9ybUdyb3VwQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZm9ybUdyb3VwQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICAvLyBUaW1lb3V0IGlzIHJlcXVpcmVkIGZvciB0aGUgZm9ybSB0byBiZSByZW5kZXJlZCBiZWZvcmUgc3Vic2NyaXB0aW9uIHRvIGZvcm0gY2hhbmdlcyBhbmQgaW5pdGlhbCBmb3JtIHZhbHVlcyByZXRyaWV2YWwuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0Zvcm1DaGFuZ2VzKCk7XG4gICAgICAgIHRoaXMucmV0cmlldmVJbml0aWFsRm9ybVZhbHVlcygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0Zvcm1DaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlVG9Gb3JtQ2hhbmdlcygpIHtcbiAgICB0aGlzLmZvcm1Hcm91cENoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybUdyb3VwLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgyMDApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKF8gPT4gdGhpcy5kZXRlY3RDaGFuZ2VzQW5kRW1pdChfKSk7XG4gIH1cblxuICBwdWJsaWMgcmV0cmlldmVJbml0aWFsRm9ybVZhbHVlcygpIHtcbiAgICB0aGlzLmluaXRpYWwgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmZvcm1WYWx1ZVNlcnZpY2Uuc2FuaXRpc2UodGhpcy5mb3JtR3JvdXAudmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRlY3RDaGFuZ2VzQW5kRW1pdChjaGFuZ2VzKSB7XG4gICAgY29uc3QgY3VycmVudCA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZm9ybVZhbHVlU2VydmljZS5zYW5pdGlzZShjaGFuZ2VzKSk7XG4gICAgdGhpcy5pbml0aWFsICE9PSBjdXJyZW50ID8gdGhpcy52YWx1ZXNDaGFuZ2VkLmVtaXQodHJ1ZSkgOiB0aGlzLnZhbHVlc0NoYW5nZWQuZW1pdChmYWxzZSk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgY2NkQ29uZGl0aW9uYWxTaG93Rm9ybSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIFtjYXNlRmllbGRzXT1cImZpZWxkc1wiIFtjb250ZXh0RmllbGRzXT1cImNhc2VGaWVsZHNcIlxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCI+XG5cbiAgPGRpdiBjY2RMYWJlbFN1YnN0aXR1dG9yIFtjYXNlRmllbGRdPVwiZmllbGRcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIFtjb250ZXh0RmllbGRzXT1cImNhc2VGaWVsZHNcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJmaWVsZCB8IGNjZElzUmVhZE9ubHlBbmROb3RDb2xsZWN0aW9uXCI+XG5cbiAgICAgIDxjY2QtZmllbGQtcmVhZCAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIFtjYXNlRmllbGRdPVwiZmllbGRcIiBbY2FzZUZpZWxkc109XCJjYXNlRmllbGRzXCIgW3dpdGhMYWJlbF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIFthdHRyLmZpZWxkX2lkXT1cImZpZWxkLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5maWVsZF90eXBlXT1cImZpZWxkLmZpZWxkX3R5cGUudHlwZVwiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhKGZpZWxkIHwgY2NkSXNDb21wb3VuZCk7IGVsc2UgQ29tcG91bmRSb3dcIj5cbiAgICAgICAgICA8Y2NkLWZpZWxkLXdyaXRlIFtjYXNlRmllbGRdPVwiZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Nhc2VGaWVsZHNdPVwiY2FzZUZpZWxkc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRQcmVmaXhdPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiZmllbGQuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZpZWxkX2lkXT1cImZpZWxkLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZpZWxkX3R5cGVdPVwiZmllbGQuZmllbGRfdHlwZS50eXBlXCI+XG4gICAgICAgICAgPC9jY2QtZmllbGQtd3JpdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjQ29tcG91bmRSb3c+XG4gICAgICAgICAgPGNjZC1maWVsZC13cml0ZSBbY2FzZUZpZWxkXT1cImZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjYXNlRmllbGRzXT1cImNhc2VGaWVsZHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkUHJlZml4XT1cImZpZWxkLmlkICsgJ18nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiZmllbGQuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZpZWxkX2lkXT1cImZpZWxkLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZpZWxkX3R5cGVdPVwiZmllbGQuZmllbGRfdHlwZS50eXBlXCI+PC9jY2QtZmllbGQtd3JpdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==