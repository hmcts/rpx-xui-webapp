import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
function EventLogComponent_ccd_event_log_table_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-event-log-table", 7);
    i0.ɵɵlistener("onSelect", function EventLogComponent_ccd_event_log_table_3_Template_ccd_event_log_table_onSelect_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.select($event)); })("onCaseHistory", function EventLogComponent_ccd_event_log_table_3_Template_ccd_event_log_table_onCaseHistory_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.caseHistoryClicked($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("events", ctx_r0.events)("selected", ctx_r0.selected);
} }
function EventLogComponent_ccd_event_log_table_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-event-log-table", 8);
    i0.ɵɵlistener("onSelect", function EventLogComponent_ccd_event_log_table_4_Template_ccd_event_log_table_onSelect_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.select($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("events", ctx_r1.events)("selected", ctx_r1.selected);
} }
function EventLogComponent_ccd_event_log_details_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-event-log-details", 9);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("event", ctx_r2.selected);
} }
export class EventLogComponent {
    constructor() {
        this.onCaseHistory = new EventEmitter();
        this.isPartOfCaseTimeline = false;
    }
    ngOnInit() {
        this.selected = this.events[0];
        this.isPartOfCaseTimeline = this.onCaseHistory.observers.length > 0;
    }
    select(event) {
        this.selected = event;
    }
    caseHistoryClicked(eventId) {
        this.onCaseHistory.emit(eventId);
    }
}
EventLogComponent.ɵfac = function EventLogComponent_Factory(t) { return new (t || EventLogComponent)(); };
EventLogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventLogComponent, selectors: [["ccd-event-log"]], inputs: { events: "events" }, outputs: { onCaseHistory: "onCaseHistory" }, decls: 8, vars: 4, consts: [[1, "grid-row"], [1, "column-one-half"], [3, "ngSwitch"], [3, "events", "selected", "onSelect", "onCaseHistory", 4, "ngSwitchCase"], [3, "events", "selected", "onSelect", 4, "ngSwitchCase"], [1, "EventLog-DetailsPanel"], [3, "event", 4, "ngIf"], [3, "events", "selected", "onSelect", "onCaseHistory"], [3, "events", "selected", "onSelect"], [3, "event"]], template: function EventLogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵelementContainerStart(2, 2);
        i0.ɵɵtemplate(3, EventLogComponent_ccd_event_log_table_3_Template, 1, 2, "ccd-event-log-table", 3);
        i0.ɵɵtemplate(4, EventLogComponent_ccd_event_log_table_4_Template, 1, 2, "ccd-event-log-table", 4);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 1)(6, "div", 5);
        i0.ɵɵtemplate(7, EventLogComponent_ccd_event_log_details_7_Template, 1, 1, "ccd-event-log-details", 6);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngSwitch", ctx.isPartOfCaseTimeline);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", true);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", false);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.selected);
    } }, styles: ["@media (max-width: 991px){[class*=col-md][_ngcontent-%COMP%]{margin-bottom:30px}}.EventLog-DetailsPanel[_ngcontent-%COMP%]{border:1px solid #bfc1c3;padding:0 10px 10px;margin-top:20px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventLogComponent, [{
        type: Component,
        args: [{ selector: 'ccd-event-log', template: "<div class=\"grid-row\">\n  <div class=\"column-one-half\">\n    <ng-container [ngSwitch]=\"isPartOfCaseTimeline\">\n      <ccd-event-log-table *ngSwitchCase=\"true\" [events]=\"events\" [selected]=\"selected\" (onSelect)=\"select($event)\" (onCaseHistory)=\"caseHistoryClicked($event)\"></ccd-event-log-table>\n      <ccd-event-log-table *ngSwitchCase=\"false\" [events]=\"events\" [selected]=\"selected\" (onSelect)=\"select($event)\"></ccd-event-log-table>\n    </ng-container>\n  </div>\n  <div class=\"column-one-half\">\n    <div class=\"EventLog-DetailsPanel\">\n      <ccd-event-log-details *ngIf=\"selected\" [event]=\"selected\"></ccd-event-log-details>\n    </div>\n  </div>\n</div>\n", styles: ["@media (max-width: 991px){[class*=col-md]{margin-bottom:30px}}.EventLog-DetailsPanel{border:1px solid #bfc1c3;padding:0 10px 10px;margin-top:20px}\n"] }]
    }], null, { events: [{
            type: Input
        }], onCaseHistory: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2hpc3RvcnkvZXZlbnQtbG9nL2V2ZW50LWxvZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9oaXN0b3J5L2V2ZW50LWxvZy9ldmVudC1sb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztJQ0d6RSw4Q0FBMko7SUFBekUsdU1BQVksZUFBQSxxQkFBYyxDQUFBLElBQUMsb01BQWtCLGVBQUEsaUNBQTBCLENBQUEsSUFBNUM7SUFBOEMsaUJBQXNCOzs7SUFBdkksc0NBQWlCLDZCQUFBOzs7O0lBQzNELDhDQUErRztJQUE1Qix1TUFBWSxlQUFBLHFCQUFjLENBQUEsSUFBQztJQUFDLGlCQUFzQjs7O0lBQTFGLHNDQUFpQiw2QkFBQTs7O0lBSzVELDJDQUFtRjs7O0lBQTNDLHVDQUFrQjs7QUREaEUsTUFBTSxPQUFPLGlCQUFpQjtJQUw5QjtRQVdTLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUkzQyx5QkFBb0IsR0FBRyxLQUFLLENBQUM7S0FlckM7SUFiUSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBb0I7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVNLGtCQUFrQixDQUFDLE9BQWU7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7a0ZBdkJVLGlCQUFpQjtvRUFBakIsaUJBQWlCO1FDUjlCLDhCQUFzQixhQUFBO1FBRWxCLGdDQUFnRDtRQUM5QyxrR0FBaUw7UUFDakwsa0dBQXFJO1FBQ3ZJLDBCQUFlO1FBQ2pCLGlCQUFNO1FBQ04sOEJBQTZCLGFBQUE7UUFFekIsc0dBQW1GO1FBQ3JGLGlCQUFNLEVBQUEsRUFBQTs7UUFSUSxlQUFpQztRQUFqQyxtREFBaUM7UUFDdkIsZUFBa0I7UUFBbEIsbUNBQWtCO1FBQ2xCLGVBQW1CO1FBQW5CLG9DQUFtQjtRQUtqQixlQUFjO1FBQWQsbUNBQWM7O3VGREQvQixpQkFBaUI7Y0FMN0IsU0FBUzsyQkFDRSxlQUFlO2dCQU9sQixNQUFNO2tCQURaLEtBQUs7WUFJQyxhQUFhO2tCQURuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZVZpZXdFdmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL2RvbWFpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1ldmVudC1sb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZXZlbnQtbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZXZlbnQtbG9nLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFdmVudExvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGV2ZW50czogQ2FzZVZpZXdFdmVudFtdO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25DYXNlSGlzdG9yeSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHB1YmxpYyBzZWxlY3RlZDogQ2FzZVZpZXdFdmVudDtcblxuICBwdWJsaWMgaXNQYXJ0T2ZDYXNlVGltZWxpbmUgPSBmYWxzZTtcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZXZlbnRzWzBdO1xuICAgIHRoaXMuaXNQYXJ0T2ZDYXNlVGltZWxpbmUgPSB0aGlzLm9uQ2FzZUhpc3Rvcnkub2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0KGV2ZW50OiBDYXNlVmlld0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGV2ZW50O1xuICB9XG5cbiAgcHVibGljIGNhc2VIaXN0b3J5Q2xpY2tlZChldmVudElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLm9uQ2FzZUhpc3RvcnkuZW1pdChldmVudElkKTtcbiAgfVxuXG59XG4iLCI8ZGl2IGNsYXNzPVwiZ3JpZC1yb3dcIj5cbiAgPGRpdiBjbGFzcz1cImNvbHVtbi1vbmUtaGFsZlwiPlxuICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImlzUGFydE9mQ2FzZVRpbWVsaW5lXCI+XG4gICAgICA8Y2NkLWV2ZW50LWxvZy10YWJsZSAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIFtldmVudHNdPVwiZXZlbnRzXCIgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCIgKG9uU2VsZWN0KT1cInNlbGVjdCgkZXZlbnQpXCIgKG9uQ2FzZUhpc3RvcnkpPVwiY2FzZUhpc3RvcnlDbGlja2VkKCRldmVudClcIj48L2NjZC1ldmVudC1sb2ctdGFibGU+XG4gICAgICA8Y2NkLWV2ZW50LWxvZy10YWJsZSAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBbZXZlbnRzXT1cImV2ZW50c1wiIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiIChvblNlbGVjdCk9XCJzZWxlY3QoJGV2ZW50KVwiPjwvY2NkLWV2ZW50LWxvZy10YWJsZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW4tb25lLWhhbGZcIj5cbiAgICA8ZGl2IGNsYXNzPVwiRXZlbnRMb2ctRGV0YWlsc1BhbmVsXCI+XG4gICAgICA8Y2NkLWV2ZW50LWxvZy1kZXRhaWxzICpuZ0lmPVwic2VsZWN0ZWRcIiBbZXZlbnRdPVwic2VsZWN0ZWRcIj48L2NjZC1ldmVudC1sb2ctZGV0YWlscz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==