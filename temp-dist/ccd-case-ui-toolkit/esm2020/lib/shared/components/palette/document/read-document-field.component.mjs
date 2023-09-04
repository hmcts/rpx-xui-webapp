import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentManagementService } from '../../../services/document-management';
import { WindowService } from '../../../services/window';
import { CasesService } from '../../case-editor/services/cases.service';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/window";
import * as i2 from "../../../services/document-management";
import * as i3 from "@angular/router";
import * as i4 from "../../case-editor/services/cases.service";
import * as i5 from "@angular/common";
function ReadDocumentFieldComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 1);
    i0.ɵɵlistener("click", function ReadDocumentFieldComponent_a_0_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showMediaViewer()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.caseField.value.document_filename, "\n");
} }
const MEDIA_VIEWER_INFO = 'media-viewer-info';
export class ReadDocumentFieldComponent extends AbstractFieldReadComponent {
    constructor(windowService, documentManagement, router, route, casesService) {
        super();
        this.windowService = windowService;
        this.documentManagement = documentManagement;
        this.router = router;
        this.route = route;
        this.casesService = casesService;
    }
    showMediaViewer() {
        const caseId = this.route.snapshot.params['cid'];
        this.windowService.removeLocalStorage(MEDIA_VIEWER_INFO);
        if (caseId) {
            this.caseViewSubscription = this.casesService.getCaseViewV2(caseId).subscribe(caseView => {
                if (this.caseField && this.caseField.value) {
                    const mergedInfo = {
                        ...this.caseField.value,
                        id: caseView.case_id,
                        jurisdiction: caseView.case_type.jurisdiction.id
                    };
                    this.openMediaViewer(mergedInfo);
                }
            });
        }
        else {
            if (this.caseField && this.caseField.value) {
                this.openMediaViewer(this.caseField.value);
            }
        }
    }
    openMediaViewer(documentFieldValue) {
        this.windowService.setLocalStorage(MEDIA_VIEWER_INFO, this.documentManagement.getMediaViewerInfo(documentFieldValue));
        this.windowService.openOnNewTab(this.getMediaViewerUrl());
    }
    getMediaViewerUrl() {
        const routerMediaViewer = this.router.createUrlTree(['/media-viewer']);
        if (routerMediaViewer) {
            return routerMediaViewer.toString();
        }
    }
    ngOnDestroy() {
        if (this.caseViewSubscription) {
            this.caseViewSubscription.unsubscribe();
        }
    }
}
ReadDocumentFieldComponent.ɵfac = function ReadDocumentFieldComponent_Factory(t) { return new (t || ReadDocumentFieldComponent)(i0.ɵɵdirectiveInject(i1.WindowService), i0.ɵɵdirectiveInject(i2.DocumentManagementService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i4.CasesService)); };
ReadDocumentFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadDocumentFieldComponent, selectors: [["ccd-read-document-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["href", "javascript:void(0)", 3, "click"]], template: function ReadDocumentFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadDocumentFieldComponent_a_0_Template, 2, 1, "a", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.caseField.value);
    } }, dependencies: [i5.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadDocumentFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-document-field', template: "<a *ngIf=\"caseField.value\" href=\"javascript:void(0)\"\n   (click)=\"showMediaViewer()\">\n  {{ caseField.value.document_filename }}\n</a>\n" }]
    }], function () { return [{ type: i1.WindowService }, { type: i2.DocumentManagementService }, { type: i3.Router }, { type: i3.ActivatedRoute }, { type: i4.CasesService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1kb2N1bWVudC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9kb2N1bWVudC9yZWFkLWRvY3VtZW50LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2RvY3VtZW50L3JlYWQtZG9jdW1lbnQtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7Ozs7O0lDTnpGLDRCQUMrQjtJQUE1QixnS0FBUyxlQUFBLHdCQUFpQixDQUFBLElBQUM7SUFDNUIsWUFDRjtJQUFBLGlCQUFJOzs7SUFERixlQUNGO0lBREUsMEVBQ0Y7O0FES0EsTUFBTSxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztBQU05QyxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsMEJBQTBCO0lBSXhFLFlBQ21CLGFBQTRCLEVBQzVCLGtCQUE2QyxFQUM3QyxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsWUFBMEI7UUFFM0MsS0FBSyxFQUFFLENBQUM7UUFOUyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTJCO1FBQzdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUc3QyxDQUFDO0lBRU0sZUFBZTtRQUNwQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdkYsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO29CQUMxQyxNQUFNLFVBQVUsR0FBRzt3QkFDakIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7d0JBQ3ZCLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTzt3QkFDcEIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUU7cUJBQ2pELENBQUM7b0JBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDbEM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUVNLGVBQWUsQ0FBQyxrQkFBa0I7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN0SCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxpQkFBaUI7UUFDdEIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixPQUFPLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7b0dBbkRVLDBCQUEwQjs2RUFBMUIsMEJBQTBCO1FDZHZDLHVFQUdJOztRQUhBLDBDQUFxQjs7dUZEY1osMEJBQTBCO2NBSnRDLFNBQVM7MkJBQ0UseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEb2N1bWVudE1hbmFnZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZG9jdW1lbnQtbWFuYWdlbWVudCc7XG5pbXBvcnQgeyBXaW5kb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvd2luZG93JztcbmltcG9ydCB7IENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2Nhc2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50JztcblxuY29uc3QgTUVESUFfVklFV0VSX0lORk8gPSAnbWVkaWEtdmlld2VyLWluZm8nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC1kb2N1bWVudC1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWFkLWRvY3VtZW50LWZpZWxkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFJlYWREb2N1bWVudEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHB1YmxpYyBjYXNlVmlld1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgd2luZG93U2VydmljZTogV2luZG93U2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50TWFuYWdlbWVudDogRG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZXNTZXJ2aWNlOiBDYXNlc1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TWVkaWFWaWV3ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgY2FzZUlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2NpZCddO1xuICAgIHRoaXMud2luZG93U2VydmljZS5yZW1vdmVMb2NhbFN0b3JhZ2UoTUVESUFfVklFV0VSX0lORk8pO1xuICAgIGlmIChjYXNlSWQpIHtcbiAgICAgIHRoaXMuY2FzZVZpZXdTdWJzY3JpcHRpb24gPSB0aGlzLmNhc2VzU2VydmljZS5nZXRDYXNlVmlld1YyKGNhc2VJZCkuc3Vic2NyaWJlKGNhc2VWaWV3ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2FzZUZpZWxkICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkSW5mbyA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuY2FzZUZpZWxkLnZhbHVlLFxuICAgICAgICAgICAgaWQ6IGNhc2VWaWV3LmNhc2VfaWQsXG4gICAgICAgICAgICBqdXJpc2RpY3Rpb246IGNhc2VWaWV3LmNhc2VfdHlwZS5qdXJpc2RpY3Rpb24uaWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMub3Blbk1lZGlhVmlld2VyKG1lcmdlZEluZm8pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2FzZUZpZWxkICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICAgIHRoaXMub3Blbk1lZGlhVmlld2VyKHRoaXMuY2FzZUZpZWxkLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3Blbk1lZGlhVmlld2VyKGRvY3VtZW50RmllbGRWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMud2luZG93U2VydmljZS5zZXRMb2NhbFN0b3JhZ2UoTUVESUFfVklFV0VSX0lORk8sIHRoaXMuZG9jdW1lbnRNYW5hZ2VtZW50LmdldE1lZGlhVmlld2VySW5mbyhkb2N1bWVudEZpZWxkVmFsdWUpKTtcbiAgICB0aGlzLndpbmRvd1NlcnZpY2Uub3Blbk9uTmV3VGFiKHRoaXMuZ2V0TWVkaWFWaWV3ZXJVcmwoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVkaWFWaWV3ZXJVcmwoKTogc3RyaW5nIHtcbiAgICBjb25zdCByb3V0ZXJNZWRpYVZpZXdlciA9IHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUoWycvbWVkaWEtdmlld2VyJ10pO1xuICAgIGlmIChyb3V0ZXJNZWRpYVZpZXdlcikge1xuICAgICAgcmV0dXJuIHJvdXRlck1lZGlhVmlld2VyLnRvU3RyaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhc2VWaWV3U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhc2VWaWV3U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iLCI8YSAqbmdJZj1cImNhc2VGaWVsZC52YWx1ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgKGNsaWNrKT1cInNob3dNZWRpYVZpZXdlcigpXCI+XG4gIHt7IGNhc2VGaWVsZC52YWx1ZS5kb2N1bWVudF9maWxlbmFtZSB9fVxuPC9hPlxuIl19