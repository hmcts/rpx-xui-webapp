import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/order/order.service";
import * as i3 from "@angular/common";
import * as i4 from "rpx-xui-translation";
function EventTriggerComponent_form_0_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Select action"));
} }
function EventTriggerComponent_form_0_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const trigger_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", trigger_r3)("title", trigger_r3.description);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 3, trigger_r3.name));
} }
const _c0 = function (a0) { return { "EventTrigger-empty": a0 }; };
function EventTriggerComponent_form_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 1);
    i0.ɵɵlistener("ngSubmit", function EventTriggerComponent_form_0_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.triggerSubmit()); });
    i0.ɵɵelementStart(1, "div", 2)(2, "label", 3);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "select", 4);
    i0.ɵɵlistener("change", function EventTriggerComponent_form_0_Template_select_change_5_listener() { i0.ɵɵrestoreView(_r5); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.triggerChange()); });
    i0.ɵɵtemplate(6, EventTriggerComponent_form_0_option_6_Template, 3, 3, "option", 5);
    i0.ɵɵtemplate(7, EventTriggerComponent_form_0_option_7_Template, 3, 5, "option", 6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 7);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.triggerForm);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, "Next step"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(11, _c0, !ctx_r0.triggerForm.value["trigger"]));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", 1 !== ctx_r0.triggers.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.triggers);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r0.isButtonDisabled());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 9, ctx_r0.triggerText));
} }
export class EventTriggerComponent {
    constructor(fb, orderService) {
        this.fb = fb;
        this.orderService = orderService;
        this.onTriggerSubmit = new EventEmitter();
        this.onTriggerChange = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.triggers && changes.triggers.currentValue) {
            this.triggers = this.orderService.sort(this.triggers);
            this.triggerForm = this.fb.group({
                trigger: [this.getDefault(), Validators.required]
            });
        }
    }
    isButtonDisabled() {
        return !this.triggerForm.valid || this.isDisabled;
    }
    triggerSubmit() {
        this.onTriggerSubmit.emit(this.triggerForm.value['trigger']);
    }
    triggerChange() {
        this.onTriggerChange.emit(null);
    }
    getDefault() {
        return this.triggers.length === 1 ? this.triggers[0] : '';
    }
}
EventTriggerComponent.ɵfac = function EventTriggerComponent_Factory(t) { return new (t || EventTriggerComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.OrderService)); };
EventTriggerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventTriggerComponent, selectors: [["ccd-event-trigger"]], inputs: { triggers: "triggers", triggerText: "triggerText", isDisabled: "isDisabled" }, outputs: { onTriggerSubmit: "onTriggerSubmit", onTriggerChange: "onTriggerChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "event-trigger", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "event-trigger", 3, "formGroup", "ngSubmit"], [1, "form-group"], ["for", "next-step", 1, "form-label"], ["id", "next-step", "formControlName", "trigger", 1, "form-control", "ccd-dropdown", 3, "ngClass", "change"], ["value", "", "data-default", "", 4, "ngIf"], [3, "ngValue", "title", 4, "ngFor", "ngForOf"], ["type", "submit", 1, "button", 3, "disabled"], ["value", "", "data-default", ""], [3, "ngValue", "title"]], template: function EventTriggerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, EventTriggerComponent_form_0_Template, 11, 13, "form", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.triggers && ctx.triggers.length);
    } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i4.RpxTranslatePipe], styles: [".event-trigger[_ngcontent-%COMP%]{width:auto;margin-top:40px;margin-bottom:20px}.event-trigger[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-top:3px;margin-right:10px;margin-bottom:0;float:left;text-align:right;width:325px}.event-trigger[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%]{float:left;margin-top:5px}.event-trigger[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:250px}.event-trigger[_ngcontent-%COMP%]   select.EventTrigger-empty[_ngcontent-%COMP%], .event-trigger[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]   [data-default][_ngcontent-%COMP%]{color:#6f777b}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventTriggerComponent, [{
        type: Component,
        args: [{ selector: 'ccd-event-trigger', template: "<form *ngIf=\"triggers && triggers.length\" class=\"event-trigger\" (ngSubmit)=\"triggerSubmit()\" [formGroup]=\"triggerForm\">\n  <div class=\"form-group\">\n    <label class=\"form-label\" for=\"next-step\">{{'Next step' | rpxTranslate}}</label>\n    <select class=\"form-control ccd-dropdown\" id=\"next-step\" (change)=\"triggerChange()\" formControlName=\"trigger\" [ngClass]=\"{\n          'EventTrigger-empty': !triggerForm.value['trigger']\n        }\">\n      <option *ngIf=\"1 !== triggers.length\" value=\"\" data-default>{{'Select action' | rpxTranslate}}</option>\n      <option *ngFor=\"let trigger of triggers\" [ngValue]=\"trigger\" [title]=\"trigger.description\">{{trigger.name | rpxTranslate}}</option>\n    </select>\n  </div>\n  <button [disabled]=\"isButtonDisabled()\" type=\"submit\" class=\"button\">{{triggerText | rpxTranslate}}</button>\n</form>\n", styles: [".event-trigger{width:auto;margin-top:40px;margin-bottom:20px}.event-trigger .form-group{margin-top:3px;margin-right:10px;margin-bottom:0;float:left;text-align:right;width:325px}.event-trigger .form-group .form-label{float:left;margin-top:5px}.event-trigger select{width:250px}.event-trigger select.EventTrigger-empty,.event-trigger select [data-default]{color:#6f777b}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.OrderService }]; }, { triggers: [{
            type: Input
        }], triggerText: [{
            type: Input
        }], isDisabled: [{
            type: Input
        }], onTriggerSubmit: [{
            type: Output
        }], onTriggerChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdHJpZ2dlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZXZlbnQtdHJpZ2dlci9ldmVudC10cmlnZ2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9ldmVudC10cmlnZ2VyL2V2ZW50LXRyaWdnZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLFdBQVcsRUFBb0IsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7O0lDRzVELGlDQUE0RDtJQUFBLFlBQWtDOztJQUFBLGlCQUFTOztJQUEzQyxlQUFrQztJQUFsQywyREFBa0M7OztJQUM5RixpQ0FBMkY7SUFBQSxZQUErQjs7SUFBQSxpQkFBUzs7O0lBQTFGLG9DQUFtQixpQ0FBQTtJQUErQixlQUErQjtJQUEvQiwyREFBK0I7Ozs7O0lBUGhJLCtCQUF1SDtJQUF2RCx1S0FBWSxlQUFBLHNCQUFlLENBQUEsSUFBQztJQUMxRiw4QkFBd0IsZUFBQTtJQUNvQixZQUE4Qjs7SUFBQSxpQkFBUTtJQUNoRixpQ0FFTztJQUZrRCxxS0FBVSxlQUFBLHNCQUFlLENBQUEsSUFBQztJQUdqRixtRkFBdUc7SUFDdkcsbUZBQW1JO0lBQ3JJLGlCQUFTLEVBQUE7SUFFWCxpQ0FBcUU7SUFBQSxZQUE4Qjs7SUFBQSxpQkFBUyxFQUFBOzs7SUFWakIsOENBQXlCO0lBRXhFLGVBQThCO0lBQTlCLHVEQUE4QjtJQUNzQyxlQUV4RztJQUZ3RywyRkFFeEc7SUFDSyxlQUEyQjtJQUEzQixtREFBMkI7SUFDUixlQUFXO0lBQVgseUNBQVc7SUFHbkMsZUFBK0I7SUFBL0Isb0RBQStCO0lBQThCLGVBQThCO0lBQTlCLCtEQUE4Qjs7QURBckcsTUFBTSxPQUFPLHFCQUFxQjtJQW1CaEMsWUFBNkIsRUFBZSxFQUFtQixZQUEwQjtRQUE1RCxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQW1CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBUGxGLG9CQUFlLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFHcEUsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUk4QixDQUFDO0lBRXZGLFdBQVcsQ0FBQyxPQUF1QjtRQUN4QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDL0IsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7YUFDbEQsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3BELENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLGFBQWE7UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVPLFVBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM1RCxDQUFDOzswRkE3Q1UscUJBQXFCO3dFQUFyQixxQkFBcUI7UUNWbEMsMEVBV087O1FBWEEsMERBQWlDOzt1RkRVM0IscUJBQXFCO2NBTGpDLFNBQVM7MkJBQ0UsbUJBQW1CO3lGQU90QixRQUFRO2tCQURkLEtBQUs7WUFJQyxXQUFXO2tCQURqQixLQUFLO1lBSUMsVUFBVTtrQkFEaEIsS0FBSztZQUlDLGVBQWU7a0JBRHJCLE1BQU07WUFJQSxlQUFlO2tCQURyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIFVudHlwZWRGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDYXNlVmlld1RyaWdnZXIgfSBmcm9tICcuLi8uLi9kb21haW4vY2FzZS12aWV3L2Nhc2Utdmlldy10cmlnZ2VyLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyL29yZGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtZXZlbnQtdHJpZ2dlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9ldmVudC10cmlnZ2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZXZlbnQtdHJpZ2dlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50VHJpZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRyaWdnZXJzOiBDYXNlVmlld1RyaWdnZXJbXTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdHJpZ2dlclRleHQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaXNEaXNhYmxlZDogYm9vbGVhbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlclN1Ym1pdDogRXZlbnRFbWl0dGVyPENhc2VWaWV3VHJpZ2dlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRyaWdnZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyB0cmlnZ2VyRm9ybTogVW50eXBlZEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSByZWFkb25seSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZSkgeyB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudHJpZ2dlcnMgJiYgY2hhbmdlcy50cmlnZ2Vycy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMudHJpZ2dlcnMgPSB0aGlzLm9yZGVyU2VydmljZS5zb3J0KHRoaXMudHJpZ2dlcnMpO1xuXG4gICAgICB0aGlzLnRyaWdnZXJGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgIHRyaWdnZXI6IFt0aGlzLmdldERlZmF1bHQoKSwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0J1dHRvbkRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy50cmlnZ2VyRm9ybS52YWxpZCB8fCB0aGlzLmlzRGlzYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgdHJpZ2dlclN1Ym1pdCgpIHtcbiAgICB0aGlzLm9uVHJpZ2dlclN1Ym1pdC5lbWl0KHRoaXMudHJpZ2dlckZvcm0udmFsdWVbJ3RyaWdnZXInXSk7XG4gIH1cblxuICBwdWJsaWMgdHJpZ2dlckNoYW5nZSgpIHtcbiAgICB0aGlzLm9uVHJpZ2dlckNoYW5nZS5lbWl0KG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlcnMubGVuZ3RoID09PSAxID8gdGhpcy50cmlnZ2Vyc1swXSA6ICcnO1xuICB9XG59XG4iLCI8Zm9ybSAqbmdJZj1cInRyaWdnZXJzICYmIHRyaWdnZXJzLmxlbmd0aFwiIGNsYXNzPVwiZXZlbnQtdHJpZ2dlclwiIChuZ1N1Ym1pdCk9XCJ0cmlnZ2VyU3VibWl0KClcIiBbZm9ybUdyb3VwXT1cInRyaWdnZXJGb3JtXCI+XG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGZvcj1cIm5leHQtc3RlcFwiPnt7J05leHQgc3RlcCcgfCBycHhUcmFuc2xhdGV9fTwvbGFiZWw+XG4gICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBjY2QtZHJvcGRvd25cIiBpZD1cIm5leHQtc3RlcFwiIChjaGFuZ2UpPVwidHJpZ2dlckNoYW5nZSgpXCIgZm9ybUNvbnRyb2xOYW1lPVwidHJpZ2dlclwiIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAnRXZlbnRUcmlnZ2VyLWVtcHR5JzogIXRyaWdnZXJGb3JtLnZhbHVlWyd0cmlnZ2VyJ11cbiAgICAgICAgfVwiPlxuICAgICAgPG9wdGlvbiAqbmdJZj1cIjEgIT09IHRyaWdnZXJzLmxlbmd0aFwiIHZhbHVlPVwiXCIgZGF0YS1kZWZhdWx0Pnt7J1NlbGVjdCBhY3Rpb24nIHwgcnB4VHJhbnNsYXRlfX08L29wdGlvbj5cbiAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHRyaWdnZXIgb2YgdHJpZ2dlcnNcIiBbbmdWYWx1ZV09XCJ0cmlnZ2VyXCIgW3RpdGxlXT1cInRyaWdnZXIuZGVzY3JpcHRpb25cIj57e3RyaWdnZXIubmFtZSB8IHJweFRyYW5zbGF0ZX19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuICA8YnV0dG9uIFtkaXNhYmxlZF09XCJpc0J1dHRvbkRpc2FibGVkKClcIiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b25cIj57e3RyaWdnZXJUZXh0IHwgcnB4VHJhbnNsYXRlfX08L2J1dHRvbj5cbjwvZm9ybT5cbiJdfQ==