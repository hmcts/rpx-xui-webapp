import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
export class CaseReviewSpecificAccessRejectComponent {
    constructor(route) {
        this.route = route;
        this.retunToTask = 'Return to the Tasks tab for this case';
        this.returnToMyTask = 'Return to My tasks';
    }
    ngOnInit() {
        this.caseId = this.route.snapshot.data.case.case_id;
    }
}
CaseReviewSpecificAccessRejectComponent.ɵfac = function CaseReviewSpecificAccessRejectComponent_Factory(t) { return new (t || CaseReviewSpecificAccessRejectComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
CaseReviewSpecificAccessRejectComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseReviewSpecificAccessRejectComponent, selectors: [["case-review-specific-access-reject"]], decls: 24, vars: 16, consts: [[1, "govuk-width-container"], [1, "govuk-grid-row"], [1, "govuk-grid-column-two-thirds"], [1, "govuk-panel", "govuk-panel--confirmation"], [1, "govuk-panel__title"], [1, "govuk-heading-m"], [1, "govuk-body"], [1, "form-group", "form-group-related"], ["button", "", "href", "tasks/list", 1, "govuk-button", "govuk-!-margin-right-3"], [1, "cancel"], [3, "href"]], template: function CaseReviewSpecificAccessRejectComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "p");
        i0.ɵɵelementStart(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "h1", 4);
        i0.ɵɵtext(6);
        i0.ɵɵpipe(7, "rpxTranslate");
        i0.ɵɵelement(8, "br");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(9, "h2", 5);
        i0.ɵɵtext(10);
        i0.ɵɵpipe(11, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "p", 6);
        i0.ɵɵtext(13);
        i0.ɵɵpipe(14, "rpxTranslate");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(15, "div", 7)(16, "p")(17, "a", 8);
        i0.ɵɵtext(18);
        i0.ɵɵpipe(19, "rpxTranslate");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(20, "p", 9)(21, "a", 10);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 6, "Request for access denied"), "");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 8, "What happens next"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(14, 10, "The requester has been denied access to this case."), " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 12, ctx.returnToMyTask));
        i0.ɵɵadvance(3);
        i0.ɵɵpropertyInterpolate1("href", "cases/case-details/", ctx.caseId, "", i0.ɵɵsanitizeUrl);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 14, ctx.retunToTask));
    } }, dependencies: [i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseReviewSpecificAccessRejectComponent, [{
        type: Component,
        args: [{ selector: 'case-review-specific-access-reject', template: "<p></p>\n<div class=\"govuk-width-container\">\n  <div class=\"govuk-grid-row\">\n    <div class=\"govuk-grid-column-two-thirds\">\n      <div class=\"govuk-panel govuk-panel--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          {{'Request for access denied' | rpxTranslate}}<br>\n        </h1>\n      </div>\n      <h2 class=\"govuk-heading-m\">{{'What happens next' | rpxTranslate}}</h2>\n      <p class=\"govuk-body\">\n        {{'The requester has been denied access to this case.' | rpxTranslate}}\n      </p>\n    </div>\n  </div>\n  <div class=\"form-group form-group-related\">\n    <p>\n      <a button class=\"govuk-button govuk-!-margin-right-3\" href=\"tasks/list\" >{{returnToMyTask | rpxTranslate}}</a>\n    </p>\n  </div>\n  <p class=\"cancel\"><a href=\"cases/case-details/{{caseId}}\" >{{retunToTask | rpxTranslate}}</a></p>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlamVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS12aWV3ZXIvY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlamVjdC9jYXNlLXJldmlldy1zcGVjaWZpYy1hY2Nlc3MtcmVqZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLXJldmlldy1zcGVjaWZpYy1hY2Nlc3MtcmVqZWN0L2Nhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZWplY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFNakQsTUFBTSxPQUFPLHVDQUF1QztJQU1sRCxZQUE2QixLQUFxQjtRQUFyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUhsQyxnQkFBVyxHQUFHLHVDQUF1QyxDQUFDO1FBQ3RELG1CQUFjLEdBQUcsb0JBQW9CLENBQUM7SUFFQSxDQUFDO0lBRWhELFFBQVE7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RELENBQUM7OzhIQVZVLHVDQUF1QzswRkFBdkMsdUNBQXVDO1FDUHBELG9CQUFPO1FBQ1AsOEJBQW1DLGFBQUEsYUFBQSxhQUFBLFlBQUE7UUFLekIsWUFBOEM7O1FBQUEscUJBQUk7UUFDcEQsaUJBQUssRUFBQTtRQUVQLDZCQUE0QjtRQUFBLGFBQXNDOztRQUFBLGlCQUFLO1FBQ3ZFLDZCQUFzQjtRQUNwQixhQUNGOztRQUFBLGlCQUFJLEVBQUEsRUFBQTtRQUdSLCtCQUEyQyxTQUFBLFlBQUE7UUFFa0MsYUFBaUM7O1FBQUEsaUJBQUksRUFBQSxFQUFBO1FBR2xILDZCQUFrQixhQUFBO1FBQXlDLGFBQThCOztRQUFBLGlCQUFJLEVBQUEsRUFBQTs7UUFkckYsZUFBOEM7UUFBOUMsaUZBQThDO1FBR3RCLGVBQXNDO1FBQXRDLGdFQUFzQztRQUVoRSxlQUNGO1FBREUsNkdBQ0Y7UUFLeUUsZUFBaUM7UUFBakMsZ0VBQWlDO1FBR3pGLGVBQW9DO1FBQXBDLDBGQUFvQztRQUFFLGVBQThCO1FBQTlCLDZEQUE4Qjs7dUZEYjlFLHVDQUF1QztjQUpuRCxTQUFTOzJCQUNFLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZWplY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlamVjdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZVJldmlld1NwZWNpZmljQWNjZXNzUmVqZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgY2FzZUlkOiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSByZXR1blRvVGFzayA9ICdSZXR1cm4gdG8gdGhlIFRhc2tzIHRhYiBmb3IgdGhpcyBjYXNlJztcbiAgcHVibGljIHJlYWRvbmx5IHJldHVyblRvTXlUYXNrID0gJ1JldHVybiB0byBNeSB0YXNrcyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VJZCA9IHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlLmNhc2VfaWQ7XG4gIH1cbn1cbiIsIjxwPjwvcD5cbjxkaXYgY2xhc3M9XCJnb3Z1ay13aWR0aC1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLXR3by10aGlyZHNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1wYW5lbCBnb3Z1ay1wYW5lbC0tY29uZmlybWF0aW9uXCI+XG4gICAgICAgIDxoMSBjbGFzcz1cImdvdnVrLXBhbmVsX190aXRsZVwiPlxuICAgICAgICAgIHt7J1JlcXVlc3QgZm9yIGFjY2VzcyBkZW5pZWQnIHwgcnB4VHJhbnNsYXRlfX08YnI+XG4gICAgICAgIDwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbVwiPnt7J1doYXQgaGFwcGVucyBuZXh0JyB8IHJweFRyYW5zbGF0ZX19PC9oMj5cbiAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPlxuICAgICAgICB7eydUaGUgcmVxdWVzdGVyIGhhcyBiZWVuIGRlbmllZCBhY2Nlc3MgdG8gdGhpcyBjYXNlLicgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1yZWxhdGVkXCI+XG4gICAgPHA+XG4gICAgICA8YSBidXR0b24gY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtM1wiIGhyZWY9XCJ0YXNrcy9saXN0XCIgPnt7cmV0dXJuVG9NeVRhc2sgfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgICA8L3A+XG4gIDwvZGl2PlxuICA8cCBjbGFzcz1cImNhbmNlbFwiPjxhIGhyZWY9XCJjYXNlcy9jYXNlLWRldGFpbHMve3tjYXNlSWR9fVwiID57e3JldHVuVG9UYXNrIHwgcnB4VHJhbnNsYXRlfX08L2E+PC9wPlxuPC9kaXY+XG4iXX0=