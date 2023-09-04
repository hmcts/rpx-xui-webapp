import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class CaseSpecificAccessSuccessComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.caseId = this.route.snapshot.params.cid;
    }
}
CaseSpecificAccessSuccessComponent.ɵfac = function CaseSpecificAccessSuccessComponent_Factory(t) { return new (t || CaseSpecificAccessSuccessComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
CaseSpecificAccessSuccessComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseSpecificAccessSuccessComponent, selectors: [["ccd-case-specific-access-success"]], decls: 23, vars: 1, consts: [[1, "govuk-width-container"], [1, "govuk-grid-row"], [1, "govuk-grid-column-two-thirds"], [1, "govuk-panel", "govuk-panel--confirmation"], [1, "govuk-panel__title"], [1, "govuk-panel__body"], [1, "govuk-heading-m"], [1, "govuk-body"], ["href", "work/my-work/my-access"]], template: function CaseSpecificAccessSuccessComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
        i0.ɵɵtext(5, " Request sent");
        i0.ɵɵelement(6, "br")(7, "br");
        i0.ɵɵelementStart(8, "div", 5);
        i0.ɵɵtext(9, " Case reference:");
        i0.ɵɵelement(10, "br");
        i0.ɵɵtext(11);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(12, "h2", 6);
        i0.ɵɵtext(13, "What happens next");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "p", 7);
        i0.ɵɵtext(15, " Your request to access this case file has been sent. ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "p", 7);
        i0.ɵɵtext(17, " Once your request has been authorised, you\u2019ll be able to access the case through ");
        i0.ɵɵelementStart(18, "a", 8);
        i0.ɵɵtext(19, "My access");
        i0.ɵɵelementEnd();
        i0.ɵɵtext(20, ". ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "p", 7);
        i0.ɵɵtext(22, " Your request will be logged for auditing purposes. ");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(11);
        i0.ɵɵtextInterpolate1(" ", ctx.caseId, " ");
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseSpecificAccessSuccessComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-specific-access-success', template: "<div class=\"govuk-width-container\">\n  <div class=\"govuk-grid-row\">\n    <div class=\"govuk-grid-column-two-thirds\">\n      <div class=\"govuk-panel govuk-panel--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          Request sent<br><br>\n          <div class=\"govuk-panel__body\">\n            Case reference:<br>\n            {{caseId}}\n          </div>\n        </h1>\n      </div>\n      <h2 class=\"govuk-heading-m \">What happens next</h2>\n      <p class=\"govuk-body\">\n        Your request to access this case file has been sent.\n      </p>\n      <p class=\"govuk-body\">\n        Once your request has been authorised, you\u2019ll be able to access the case through\n        <a href=\"work/my-work/my-access\">My access</a>.\n      </p>\n      <p class=\"govuk-body\">\n        Your request will be logged for auditing purposes.\n      </p>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1zcGVjaWZpYy1hY2Nlc3Mtc3VjY2Vzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS12aWV3ZXIvY2FzZS1zcGVjaWZpYy1hY2Nlc3Mtc3VjY2Vzcy9jYXNlLXNwZWNpZmljLWFjY2Vzcy1zdWNjZXNzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLXNwZWNpZmljLWFjY2Vzcy1zdWNjZXNzL2Nhc2Utc3BlY2lmaWMtYWNjZXNzLXN1Y2Nlc3MuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQU1qRCxNQUFNLE9BQU8sa0NBQWtDO0lBSTdDLFlBQTZCLEtBQXFCO1FBQXJCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQUksQ0FBQztJQUVoRCxRQUFRO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQy9DLENBQUM7O29IQVJVLGtDQUFrQztxRkFBbEMsa0NBQWtDO1FDUC9DLDhCQUFtQyxhQUFBLGFBQUEsYUFBQSxZQUFBO1FBS3pCLDZCQUFZO1FBQUEscUJBQUksU0FBQTtRQUNoQiw4QkFBK0I7UUFDN0IsZ0NBQWU7UUFBQSxzQkFBSTtRQUNuQixhQUNGO1FBQUEsaUJBQU0sRUFBQSxFQUFBO1FBR1YsOEJBQTZCO1FBQUEsa0NBQWlCO1FBQUEsaUJBQUs7UUFDbkQsNkJBQXNCO1FBQ3BCLHVFQUNGO1FBQUEsaUJBQUk7UUFDSiw2QkFBc0I7UUFDcEIsd0dBQ0E7UUFBQSw2QkFBaUM7UUFBQSwwQkFBUztRQUFBLGlCQUFJO1FBQUEsbUJBQ2hEO1FBQUEsaUJBQUk7UUFDSiw2QkFBc0I7UUFDcEIscUVBQ0Y7UUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQTs7UUFkRSxnQkFDRjtRQURFLDJDQUNGOzt1RkRGRyxrQ0FBa0M7Y0FKOUMsU0FBUzsyQkFDRSxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1zcGVjaWZpYy1hY2Nlc3Mtc3VjY2VzcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLXNwZWNpZmljLWFjY2Vzcy1zdWNjZXNzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlU3BlY2lmaWNBY2Nlc3NTdWNjZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgY2FzZUlkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zLmNpZDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImdvdnVrLXdpZHRoLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tdHdvLXRoaXJkc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsIGdvdnVrLXBhbmVsLS1jb25maXJtYXRpb25cIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstcGFuZWxfX3RpdGxlXCI+XG4gICAgICAgICAgUmVxdWVzdCBzZW50PGJyPjxicj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcGFuZWxfX2JvZHlcIj5cbiAgICAgICAgICAgIENhc2UgcmVmZXJlbmNlOjxicj5cbiAgICAgICAgICAgIHt7Y2FzZUlkfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tIFwiPldoYXQgaGFwcGVucyBuZXh0PC9oMj5cbiAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPlxuICAgICAgICBZb3VyIHJlcXVlc3QgdG8gYWNjZXNzIHRoaXMgY2FzZSBmaWxlIGhhcyBiZWVuIHNlbnQuXG4gICAgICA8L3A+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgICAgT25jZSB5b3VyIHJlcXVlc3QgaGFzIGJlZW4gYXV0aG9yaXNlZCwgeW914oCZbGwgYmUgYWJsZSB0byBhY2Nlc3MgdGhlIGNhc2UgdGhyb3VnaFxuICAgICAgICA8YSBocmVmPVwid29yay9teS13b3JrL215LWFjY2Vzc1wiPk15IGFjY2VzczwvYT4uXG4gICAgICA8L3A+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgICAgWW91ciByZXF1ZXN0IHdpbGwgYmUgbG9nZ2VkIGZvciBhdWRpdGluZyBwdXJwb3Nlcy5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==