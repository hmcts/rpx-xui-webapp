import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpError } from '../../../domain/http/http-error.model';
import { AlertService } from '../../../services/alert/alert.service';
import { CaseNotifier } from '../../case-editor/services/case.notifier';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
import * as i1 from "../../case-editor/services/case.notifier";
import * as i2 from "../../case-editor/services/cases.service";
import * as i3 from "../../../services/alert/alert.service";
function CasePrinterComponent_div_0_tr_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 4)(2, "a", 5);
    i0.ɵɵpipe(3, "ccdPrintUrl");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 6);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const document_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", i0.ɵɵpipeBind1(3, 3, document_r2.url), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 5, document_r2.name), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 7, document_r2.type));
} }
function CasePrinterComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-case-header", 1);
    i0.ɵɵelementStart(2, "h2", 2);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "table");
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementStart(7, "thead")(8, "tr")(9, "th");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "rpxTranslate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, CasePrinterComponent_div_0_tr_16_Template, 9, 9, "tr", 3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseDetails", ctx_r0.caseDetails);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 6, "Print"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(6, 8, "case print table"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 10, "Name"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 12, "Type"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.documents);
} }
export class CasePrinterComponent {
    constructor(caseNotifier, casesService, alertService) {
        this.caseNotifier = caseNotifier;
        this.casesService = casesService;
        this.alertService = alertService;
        this.ERROR_MESSAGE = 'No documents to print';
    }
    ngOnInit() {
        this.caseSubscription = this.caseNotifier.caseView.subscribe(caseDetails => {
            this.caseDetails = caseDetails;
            this.casesService
                .getPrintDocuments(this.caseDetails.case_id)
                .pipe(map(documents => {
                if (!documents || !documents.length) {
                    const error = new HttpError();
                    error.message = this.ERROR_MESSAGE;
                    throw error;
                }
                this.documents = documents;
            }), catchError(error => {
                this.alertService.error(error.message);
                return throwError(error);
            })).toPromise();
        });
    }
    ngOnDestroy() {
        if (this.caseSubscription) {
            this.caseSubscription.unsubscribe();
        }
    }
    isDataLoaded() {
        return this.caseDetails && this.documents ? true : false;
    }
}
CasePrinterComponent.ɵfac = function CasePrinterComponent_Factory(t) { return new (t || CasePrinterComponent)(i0.ɵɵdirectiveInject(i1.CaseNotifier), i0.ɵɵdirectiveInject(i2.CasesService), i0.ɵɵdirectiveInject(i3.AlertService)); };
CasePrinterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CasePrinterComponent, selectors: [["ng-component"]], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "caseDetails"], [1, "heading-h2"], [4, "ngFor", "ngForOf"], [1, "document-name"], ["target", "_blank", "rel", "external", 3, "href"], [1, "document-type"]], template: function CasePrinterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CasePrinterComponent_div_0_Template, 17, 14, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CasePrinterComponent, [{
        type: Component,
        args: [{ template: "<div *ngIf=\"isDataLoaded()\">\n  <ccd-case-header [caseDetails]=\"caseDetails\"></ccd-case-header>\n  <h2 class=\"heading-h2\">{{'Print' | rpxTranslate}}</h2>\n  <table [attr.aria-describedby]=\"'case print table' | rpxTranslate\">\n    <thead>\n      <tr>\n        <th>{{'Name' | rpxTranslate}}</th>\n        <th>{{'Type' | rpxTranslate}}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let document of documents\">\n        <td class=\"document-name\"><a [href]=\"document.url | ccdPrintUrl\" target=\"_blank\" rel=\"external\">\n          {{document.name | rpxTranslate}}\n        </a></td>\n        <td class=\"document-type\">{{document.type | rpxTranslate}}</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n" }]
    }], function () { return [{ type: i1.CaseNotifier }, { type: i2.CasesService }, { type: i3.AlertService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1wcmludGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9wcmludGVyL2Nhc2UtcHJpbnRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS12aWV3ZXIvcHJpbnRlci9jYXNlLXByaW50ZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQWdCLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7O0lDR2xFLDBCQUF1QyxZQUFBLFdBQUE7O0lBRW5DLFlBQ0Y7O0lBQUEsaUJBQUksRUFBQTtJQUNKLDZCQUEwQjtJQUFBLFlBQWdDOztJQUFBLGlCQUFLLEVBQUE7OztJQUhsQyxlQUFtQztJQUFuQyw4RUFBbUM7SUFDOUQsZUFDRjtJQURFLHVFQUNGO0lBQzBCLGVBQWdDO0lBQWhDLDREQUFnQzs7O0lBZmxFLDJCQUE0QjtJQUMxQixxQ0FBK0Q7SUFDL0QsNkJBQXVCO0lBQUEsWUFBMEI7O0lBQUEsaUJBQUs7SUFDdEQsNkJBQW1FOztJQUNqRSw2QkFBTyxTQUFBLFNBQUE7SUFFQyxhQUF5Qjs7SUFBQSxpQkFBSztJQUNsQywyQkFBSTtJQUFBLGFBQXlCOztJQUFBLGlCQUFLLEVBQUEsRUFBQTtJQUd0Qyw4QkFBTztJQUNMLDJFQUtLO0lBQ1AsaUJBQVEsRUFBQSxFQUFBOzs7SUFoQk8sZUFBMkI7SUFBM0IsZ0RBQTJCO0lBQ3JCLGVBQTBCO0lBQTFCLG1EQUEwQjtJQUMxQyxlQUEyRDtJQUEzRCw0RUFBMkQ7SUFHeEQsZUFBeUI7SUFBekIsb0RBQXlCO0lBQ3pCLGVBQXlCO0lBQXpCLG9EQUF5QjtJQUlOLGVBQVk7SUFBWiwwQ0FBWTs7QURFM0MsTUFBTSxPQUFPLG9CQUFvQjtJQVEvQixZQUNtQixZQUEwQixFQUMxQixZQUEwQixFQUMxQixZQUEwQjtRQUYxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVQ1QixrQkFBYSxHQUFHLHVCQUF1QixDQUFDO0lBVXRELENBQUM7SUFFRyxRQUFRO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWTtpQkFDZCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztpQkFDM0MsSUFBSSxDQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFFZCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztvQkFDOUIsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUNuQyxNQUFNLEtBQUssQ0FBQztpQkFDYjtnQkFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM3QixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFTSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMzRCxDQUFDOzt3RkE5Q1Usb0JBQW9CO3VFQUFwQixvQkFBb0I7UUNiakMsdUVBbUJNOztRQW5CQSx5Q0FBb0I7O3VGRGFiLG9CQUFvQjtjQUhoQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXNlUHJpbnREb2N1bWVudCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS1wcmludC1kb2N1bWVudC5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlVmlldyB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS12aWV3Lm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvciB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9odHRwL2h0dHAtZXJyb3IubW9kZWwnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYWxlcnQvYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDYXNlTm90aWZpZXIgfSBmcm9tICcuLi8uLi9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlLm5vdGlmaWVyJztcbmltcG9ydCB7IENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2Nhc2VzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtcHJpbnRlci5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlUHJpbnRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIHJlYWRvbmx5IEVSUk9SX01FU1NBR0UgPSAnTm8gZG9jdW1lbnRzIHRvIHByaW50JztcblxuICBwdWJsaWMgY2FzZURldGFpbHM6IENhc2VWaWV3O1xuICBwdWJsaWMgZG9jdW1lbnRzOiBDYXNlUHJpbnREb2N1bWVudFtdO1xuICBwdWJsaWMgY2FzZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZU5vdGlmaWVyOiBDYXNlTm90aWZpZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlc1NlcnZpY2U6IENhc2VzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlU3Vic2NyaXB0aW9uID0gdGhpcy5jYXNlTm90aWZpZXIuY2FzZVZpZXcuc3Vic2NyaWJlKGNhc2VEZXRhaWxzID0+IHtcbiAgICAgIHRoaXMuY2FzZURldGFpbHMgPSBjYXNlRGV0YWlscztcbiAgICAgIHRoaXMuY2FzZXNTZXJ2aWNlXG4gICAgICAgIC5nZXRQcmludERvY3VtZW50cyh0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChkb2N1bWVudHMgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50cyB8fCAhZG9jdW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBIdHRwRXJyb3IoKTtcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuRVJST1JfTUVTU0FHRTtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRzID0gZG9jdW1lbnRzO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgfSlcbiAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYXNlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEYXRhTG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNhc2VEZXRhaWxzICYmIHRoaXMuZG9jdW1lbnRzID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc0RhdGFMb2FkZWQoKVwiPlxuICA8Y2NkLWNhc2UtaGVhZGVyIFtjYXNlRGV0YWlsc109XCJjYXNlRGV0YWlsc1wiPjwvY2NkLWNhc2UtaGVhZGVyPlxuICA8aDIgY2xhc3M9XCJoZWFkaW5nLWgyXCI+e3snUHJpbnQnIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuICA8dGFibGUgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY2FzZSBwcmludCB0YWJsZScgfCBycHhUcmFuc2xhdGVcIj5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD57eydOYW1lJyB8IHJweFRyYW5zbGF0ZX19PC90aD5cbiAgICAgICAgPHRoPnt7J1R5cGUnIHwgcnB4VHJhbnNsYXRlfX08L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZG9jdW1lbnQgb2YgZG9jdW1lbnRzXCI+XG4gICAgICAgIDx0ZCBjbGFzcz1cImRvY3VtZW50LW5hbWVcIj48YSBbaHJlZl09XCJkb2N1bWVudC51cmwgfCBjY2RQcmludFVybFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cImV4dGVybmFsXCI+XG4gICAgICAgICAge3tkb2N1bWVudC5uYW1lIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPC9hPjwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cImRvY3VtZW50LXR5cGVcIj57e2RvY3VtZW50LnR5cGUgfCBycHhUcmFuc2xhdGV9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG48L2Rpdj5cbiJdfQ==