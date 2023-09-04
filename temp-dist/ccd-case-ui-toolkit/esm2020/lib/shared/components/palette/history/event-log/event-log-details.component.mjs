import { Component, Input } from '@angular/core';
import { CaseViewEvent } from '../../../../domain';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../utils/date.pipe";
import * as i3 from "../../utils/dash.pipe";
import * as i4 from "rpx-xui-translation";
export class EventLogDetailsComponent {
}
EventLogDetailsComponent.ɵfac = function EventLogDetailsComponent_Factory(t) { return new (t || EventLogDetailsComponent)(); };
EventLogDetailsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventLogDetailsComponent, selectors: [["ccd-event-log-details"]], inputs: { event: "event" }, decls: 59, vars: 39, consts: [["tabindex", "0", 1, "EventLogDetails"], [1, "heading-h2"], ["tabindex", "0", "aria-live", "polite"], [1, "text-16"], [1, "tooltip", "text-16"]], template: function EventLogDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "table", 0)(1, "caption")(2, "h2", 1);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(5, "tbody", 2)(6, "tr")(7, "th")(8, "span", 3);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(11, "td")(12, "div", 4);
        i0.ɵɵtext(13);
        i0.ɵɵpipe(14, "ccdDate");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(15, "tr")(16, "th")(17, "span", 3);
        i0.ɵɵtext(18);
        i0.ɵɵpipe(19, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(20, "td")(21, "span", 3);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "titlecase");
        i0.ɵɵpipe(24, "uppercase");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(25, "tr")(26, "th")(27, "span", 3);
        i0.ɵɵtext(28);
        i0.ɵɵpipe(29, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(30, "td")(31, "span", 3);
        i0.ɵɵtext(32);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(33, "tr")(34, "th")(35, "span", 3);
        i0.ɵɵtext(36);
        i0.ɵɵpipe(37, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(38, "td")(39, "span", 3);
        i0.ɵɵtext(40);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(41, "tr")(42, "th")(43, "span", 3);
        i0.ɵɵtext(44);
        i0.ɵɵpipe(45, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(46, "td")(47, "span", 3);
        i0.ɵɵtext(48);
        i0.ɵɵpipe(49, "ccdDash");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(50, "tr")(51, "th")(52, "span", 3);
        i0.ɵɵtext(53);
        i0.ɵɵpipe(54, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(55, "td")(56, "span", 3);
        i0.ɵɵtext(57);
        i0.ɵɵpipe(58, "ccdDash");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 14, "Details"));
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 16, "Date"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(14, 18, ctx.event.timestamp, "local"), " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 21, "Author"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(23, 23, ctx.event.user_first_name), " ", i0.ɵɵpipeBind1(24, 25, ctx.event.user_last_name), "");
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 27, "End state"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.event.state_name);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(37, 29, "Event"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.event.event_name);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(45, 31, "Summary"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(49, 33, ctx.event.summary));
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(54, 35, "Comment"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 37, ctx.event.comment));
    } }, dependencies: [i1.UpperCasePipe, i1.TitleCasePipe, i2.DatePipe, i3.DashPipe, i4.RpxTranslatePipe], styles: [".EventLogDetails[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .EventLogDetails[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom:none}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventLogDetailsComponent, [{
        type: Component,
        args: [{ selector: 'ccd-event-log-details', template: "<table tabindex=\"0\" class=\"EventLogDetails\">\n  <caption><h2 class=\"heading-h2\">{{'Details' | rpxTranslate}}</h2></caption>\n  <tbody tabindex=\"0\" aria-live=\"polite\">\n    <tr>\n      <th><span class=\"text-16\">{{'Date' | rpxTranslate}}</span></th>\n      <td>\n        <div class=\"tooltip text-16\">{{event.timestamp | ccdDate : 'local'}}\n        </div>\n      </td>\n    </tr>\n    <tr>\n      <th><span class=\"text-16\">{{'Author' | rpxTranslate}}</span></th>\n      <td><span class=\"text-16\">{{event.user_first_name | titlecase}} {{event.user_last_name | uppercase}}</span></td>\n    </tr>\n    <tr>\n      <th><span class=\"text-16\">{{'End state' | rpxTranslate}}</span></th>\n      <td><span class=\"text-16\">{{event.state_name}}</span></td>\n    </tr>\n    <tr>\n      <th><span class=\"text-16\">{{'Event' | rpxTranslate}}</span></th>\n      <td><span class=\"text-16\">{{event.event_name}}</span></td>\n    </tr>\n    <tr>\n      <th><span class=\"text-16\">{{'Summary' | rpxTranslate}}</span></th>\n      <td><span class=\"text-16\">{{event.summary | ccdDash}}</span></td>\n    </tr>\n    <tr>\n      <th><span class=\"text-16\">{{'Comment' | rpxTranslate}}</span></th>\n      <td><span class=\"text-16\">{{event.comment | ccdDash}}</span></td>\n    </tr>\n  </tbody>\n</table>\n", styles: [".EventLogDetails th,.EventLogDetails td{border-bottom:none}\n"] }]
    }], null, { event: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtbG9nLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvaGlzdG9yeS9ldmVudC1sb2cvZXZlbnQtbG9nLWRldGFpbHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvaGlzdG9yeS9ldmVudC1sb2cvZXZlbnQtbG9nLWRldGFpbHMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7QUFPbkQsTUFBTSxPQUFPLHdCQUF3Qjs7Z0dBQXhCLHdCQUF3QjsyRUFBeEIsd0JBQXdCO1FDUnJDLGdDQUE0QyxjQUFBLFlBQUE7UUFDVixZQUE0Qjs7UUFBQSxpQkFBSyxFQUFBO1FBQ2pFLGdDQUF1QyxTQUFBLFNBQUEsY0FBQTtRQUVULFlBQXlCOztRQUFBLGlCQUFPLEVBQUE7UUFDMUQsMkJBQUksY0FBQTtRQUMyQixhQUM3Qjs7UUFBQSxpQkFBTSxFQUFBLEVBQUE7UUFHViwyQkFBSSxVQUFBLGVBQUE7UUFDd0IsYUFBMkI7O1FBQUEsaUJBQU8sRUFBQTtRQUM1RCwyQkFBSSxlQUFBO1FBQXNCLGFBQTBFOzs7UUFBQSxpQkFBTyxFQUFBLEVBQUE7UUFFN0csMkJBQUksVUFBQSxlQUFBO1FBQ3dCLGFBQThCOztRQUFBLGlCQUFPLEVBQUE7UUFDL0QsMkJBQUksZUFBQTtRQUFzQixhQUFvQjtRQUFBLGlCQUFPLEVBQUEsRUFBQTtRQUV2RCwyQkFBSSxVQUFBLGVBQUE7UUFDd0IsYUFBMEI7O1FBQUEsaUJBQU8sRUFBQTtRQUMzRCwyQkFBSSxlQUFBO1FBQXNCLGFBQW9CO1FBQUEsaUJBQU8sRUFBQSxFQUFBO1FBRXZELDJCQUFJLFVBQUEsZUFBQTtRQUN3QixhQUE0Qjs7UUFBQSxpQkFBTyxFQUFBO1FBQzdELDJCQUFJLGVBQUE7UUFBc0IsYUFBMkI7O1FBQUEsaUJBQU8sRUFBQSxFQUFBO1FBRTlELDJCQUFJLFVBQUEsZUFBQTtRQUN3QixhQUE0Qjs7UUFBQSxpQkFBTyxFQUFBO1FBQzdELDJCQUFJLGVBQUE7UUFBc0IsYUFBMkI7O1FBQUEsaUJBQU8sRUFBQSxFQUFBLEVBQUEsRUFBQTs7UUEzQmhDLGVBQTRCO1FBQTVCLHNEQUE0QjtRQUc5QixlQUF5QjtRQUF6QixvREFBeUI7UUFFcEIsZUFDN0I7UUFENkIsb0ZBQzdCO1FBSXdCLGVBQTJCO1FBQTNCLHNEQUEyQjtRQUMzQixlQUEwRTtRQUExRSx1SUFBMEU7UUFHMUUsZUFBOEI7UUFBOUIseURBQThCO1FBQzlCLGVBQW9CO1FBQXBCLDBDQUFvQjtRQUdwQixlQUEwQjtRQUExQixxREFBMEI7UUFDMUIsZUFBb0I7UUFBcEIsMENBQW9CO1FBR3BCLGVBQTRCO1FBQTVCLHVEQUE0QjtRQUM1QixlQUEyQjtRQUEzQiwrREFBMkI7UUFHM0IsZUFBNEI7UUFBNUIsdURBQTRCO1FBQzVCLGVBQTJCO1FBQTNCLCtEQUEyQjs7dUZEcEI5Qyx3QkFBd0I7Y0FMcEMsU0FBUzsyQkFDRSx1QkFBdUI7Z0JBTTFCLEtBQUs7a0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VWaWV3RXZlbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9kb21haW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtZXZlbnQtbG9nLWRldGFpbHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZXZlbnQtbG9nLWRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ldmVudC1sb2ctZGV0YWlscy5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRMb2dEZXRhaWxzQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgcHVibGljIGV2ZW50OiBDYXNlVmlld0V2ZW50O1xufVxuIiwiPHRhYmxlIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwiRXZlbnRMb2dEZXRhaWxzXCI+XG4gIDxjYXB0aW9uPjxoMiBjbGFzcz1cImhlYWRpbmctaDJcIj57eydEZXRhaWxzJyB8IHJweFRyYW5zbGF0ZX19PC9oMj48L2NhcHRpb24+XG4gIDx0Ym9keSB0YWJpbmRleD1cIjBcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICA8dHI+XG4gICAgICA8dGg+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3snRGF0ZScgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj48L3RoPlxuICAgICAgPHRkPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcCB0ZXh0LTE2XCI+e3tldmVudC50aW1lc3RhbXAgfCBjY2REYXRlIDogJ2xvY2FsJ319XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIDx0cj5cbiAgICAgIDx0aD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57eydBdXRob3InIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+PC90aD5cbiAgICAgIDx0ZD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2V2ZW50LnVzZXJfZmlyc3RfbmFtZSB8IHRpdGxlY2FzZX19IHt7ZXZlbnQudXNlcl9sYXN0X25hbWUgfCB1cHBlcmNhc2V9fTwvc3Bhbj48L3RkPlxuICAgIDwvdHI+XG4gICAgPHRyPlxuICAgICAgPHRoPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7J0VuZCBzdGF0ZScgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj48L3RoPlxuICAgICAgPHRkPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7ZXZlbnQuc3RhdGVfbmFtZX19PC9zcGFuPjwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHI+XG4gICAgICA8dGg+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3snRXZlbnQnIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+PC90aD5cbiAgICAgIDx0ZD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2V2ZW50LmV2ZW50X25hbWV9fTwvc3Bhbj48L3RkPlxuICAgIDwvdHI+XG4gICAgPHRyPlxuICAgICAgPHRoPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7J1N1bW1hcnknIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+PC90aD5cbiAgICAgIDx0ZD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2V2ZW50LnN1bW1hcnkgfCBjY2REYXNofX08L3NwYW4+PC90ZD5cbiAgICA8L3RyPlxuICAgIDx0cj5cbiAgICAgIDx0aD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57eydDb21tZW50JyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvdGg+XG4gICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3tldmVudC5jb21tZW50IHwgY2NkRGFzaH19PC9zcGFuPjwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG4iXX0=