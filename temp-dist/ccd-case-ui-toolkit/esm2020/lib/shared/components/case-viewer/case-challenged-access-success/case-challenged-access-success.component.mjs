import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
export class CaseChallengedAccessSuccessComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.caseId = this.route.snapshot.params.cid;
    }
}
CaseChallengedAccessSuccessComponent.ɵfac = function CaseChallengedAccessSuccessComponent_Factory(t) { return new (t || CaseChallengedAccessSuccessComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
CaseChallengedAccessSuccessComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseChallengedAccessSuccessComponent, selectors: [["ccd-case-challenged-access-success"]], decls: 31, vars: 23, consts: [[1, "govuk-width-container"], [1, "govuk-grid-row"], [1, "govuk-grid-column-two-thirds"], [1, "govuk-panel", "govuk-panel--confirmation"], [1, "govuk-panel__title"], [1, "govuk-panel__body"], [1, "govuk-heading-m"], [1, "govuk-body"], [3, "routerLink"]], template: function CaseChallengedAccessSuccessComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "rpxTranslate");
        i0.ɵɵelement(7, "br")(8, "br");
        i0.ɵɵelementStart(9, "div", 5);
        i0.ɵɵtext(10);
        i0.ɵɵpipe(11, "rpxTranslate");
        i0.ɵɵelement(12, "br");
        i0.ɵɵtext(13);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(14, "h2", 6);
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "p", 7);
        i0.ɵɵtext(18);
        i0.ɵɵpipe(19, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "p", 7);
        i0.ɵɵtext(21);
        i0.ɵɵpipe(22, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "p", 7);
        i0.ɵɵtext(24);
        i0.ɵɵpipe(25, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "p", 7)(27, "a", 8);
        i0.ɵɵtext(28);
        i0.ɵɵpipe(29, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtext(30, ".");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 9, "Access successful"), "");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(11, 11, "Case reference:"), "");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", ctx.caseId, " ");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 13, "What happens next"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(19, 15, "You can access this case file until midnight tonight."), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(22, 17, "You'll need to request access again once this expires."), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(25, 19, "Your request will be logged for auditing purposes."), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("routerLink", "/cases/case-details/" + ctx.caseId);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 21, "View case file"));
    } }, dependencies: [i1.RouterLink, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseChallengedAccessSuccessComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-challenged-access-success', template: "<div class=\"govuk-width-container\">\n  <div class=\"govuk-grid-row\">\n    <div class=\"govuk-grid-column-two-thirds\">\n      <div class=\"govuk-panel govuk-panel--confirmation\">\n        <h1 class=\"govuk-panel__title\">\n          {{'Access successful' | rpxTranslate}}<br><br>\n          <div class=\"govuk-panel__body\">\n            {{'Case reference:' | rpxTranslate}}<br>\n            {{caseId}}\n          </div>\n        </h1>\n      </div>\n      <h2 class=\"govuk-heading-m\">{{'What happens next' | rpxTranslate}}</h2>\n      <p class=\"govuk-body\">\n        {{'You can access this case file until midnight tonight.' | rpxTranslate}}\n      </p>\n      <p class=\"govuk-body\">\n        {{\"You'll need to request access again once this expires.\" | rpxTranslate}}\n      </p>\n      <p class=\"govuk-body\">\n        {{\"Your request will be logged for auditing purposes.\" | rpxTranslate}}\n      </p>\n      <p class=\"govuk-body\"><a [routerLink]=\"'/cases/case-details/' + caseId\">{{\"View case file\" | rpxTranslate}}</a>.</p>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1zdWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWNoYWxsZW5nZWQtYWNjZXNzLXN1Y2Nlc3MvY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1zdWNjZXNzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWNoYWxsZW5nZWQtYWNjZXNzLXN1Y2Nlc3MvY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1zdWNjZXNzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBTWpELE1BQU0sT0FBTyxvQ0FBb0M7SUFHL0MsWUFBNkIsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFBSSxDQUFDO0lBRWhELFFBQVE7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDL0MsQ0FBQzs7d0hBUFUsb0NBQW9DO3VGQUFwQyxvQ0FBb0M7UUNQakQsOEJBQW1DLGFBQUEsYUFBQSxhQUFBLFlBQUE7UUFLekIsWUFBc0M7O1FBQUEscUJBQUksU0FBQTtRQUMxQyw4QkFBK0I7UUFDN0IsYUFBb0M7O1FBQUEsc0JBQUk7UUFDeEMsYUFDRjtRQUFBLGlCQUFNLEVBQUEsRUFBQTtRQUdWLDhCQUE0QjtRQUFBLGFBQXNDOztRQUFBLGlCQUFLO1FBQ3ZFLDZCQUFzQjtRQUNwQixhQUNGOztRQUFBLGlCQUFJO1FBQ0osNkJBQXNCO1FBQ3BCLGFBQ0Y7O1FBQUEsaUJBQUk7UUFDSiw2QkFBc0I7UUFDcEIsYUFDRjs7UUFBQSxpQkFBSTtRQUNKLDZCQUFzQixZQUFBO1FBQWtELGFBQW1DOztRQUFBLGlCQUFJO1FBQUEsa0JBQUM7UUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQTs7UUFqQmhILGVBQXNDO1FBQXRDLHlFQUFzQztRQUVwQyxlQUFvQztRQUFwQyx5RUFBb0M7UUFDcEMsZUFDRjtRQURFLDJDQUNGO1FBR3dCLGVBQXNDO1FBQXRDLGlFQUFzQztRQUVoRSxlQUNGO1FBREUsZ0hBQ0Y7UUFFRSxlQUNGO1FBREUsaUhBQ0Y7UUFFRSxlQUNGO1FBREUsNkdBQ0Y7UUFDeUIsZUFBOEM7UUFBOUMsZ0VBQThDO1FBQUMsZUFBbUM7UUFBbkMsOERBQW1DOzt1RkRmcEcsb0NBQW9DO2NBSmhELFNBQVM7MkJBQ0Usb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtY2hhbGxlbmdlZC1hY2Nlc3Mtc3VjY2VzcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWNoYWxsZW5nZWQtYWNjZXNzLXN1Y2Nlc3MuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VDaGFsbGVuZ2VkQWNjZXNzU3VjY2Vzc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2FzZUlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXMuY2lkO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZ292dWstd2lkdGgtY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi10d28tdGhpcmRzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcGFuZWwgZ292dWstcGFuZWwtLWNvbmZpcm1hdGlvblwiPlxuICAgICAgICA8aDEgY2xhc3M9XCJnb3Z1ay1wYW5lbF9fdGl0bGVcIj5cbiAgICAgICAgICB7eydBY2Nlc3Mgc3VjY2Vzc2Z1bCcgfCBycHhUcmFuc2xhdGV9fTxicj48YnI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXBhbmVsX19ib2R5XCI+XG4gICAgICAgICAgICB7eydDYXNlIHJlZmVyZW5jZTonIHwgcnB4VHJhbnNsYXRlfX08YnI+XG4gICAgICAgICAgICB7e2Nhc2VJZH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbVwiPnt7J1doYXQgaGFwcGVucyBuZXh0JyB8IHJweFRyYW5zbGF0ZX19PC9oMj5cbiAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPlxuICAgICAgICB7eydZb3UgY2FuIGFjY2VzcyB0aGlzIGNhc2UgZmlsZSB1bnRpbCBtaWRuaWdodCB0b25pZ2h0LicgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9wPlxuICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+XG4gICAgICAgIHt7XCJZb3UnbGwgbmVlZCB0byByZXF1ZXN0IGFjY2VzcyBhZ2FpbiBvbmNlIHRoaXMgZXhwaXJlcy5cIiB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L3A+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgICAge3tcIllvdXIgcmVxdWVzdCB3aWxsIGJlIGxvZ2dlZCBmb3IgYXVkaXRpbmcgcHVycG9zZXMuXCIgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9wPlxuICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+PGEgW3JvdXRlckxpbmtdPVwiJy9jYXNlcy9jYXNlLWRldGFpbHMvJyArIGNhc2VJZFwiPnt7XCJWaWV3IGNhc2UgZmlsZVwiIHwgcnB4VHJhbnNsYXRlfX08L2E+LjwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==