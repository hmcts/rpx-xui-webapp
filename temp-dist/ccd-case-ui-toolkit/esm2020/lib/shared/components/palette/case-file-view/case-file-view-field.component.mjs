import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, of } from 'rxjs';
import { catchError, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { CaseFileViewService, DocumentManagementService, LoadingService, SessionStorageService } from '../../../services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../services";
function CaseFileViewFieldComponent_ng_container_0_li_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const errorMessage_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(errorMessage_r4);
} }
function CaseFileViewFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 2)(2, "div", 3)(3, "h2", 4);
    i0.ɵɵtext(4, " There is a problem ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 5)(6, "ul", 6);
    i0.ɵɵtemplate(7, CaseFileViewFieldComponent_ng_container_0_li_7_Template, 3, 1, "li", 7);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r0.errorMessages);
} }
function CaseFileViewFieldComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "h1", 10);
    i0.ɵɵtext(2, "Sorry, there is a problem with the service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 11);
    i0.ɵɵtext(4, "Try again later.");
    i0.ɵɵelementEnd()();
} }
function CaseFileViewFieldComponent_div_2_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "mv-media-viewer", 18);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("url", ctx_r5.currentDocument.document_binary_url)("downloadFileName", ctx_r5.currentDocument.document_filename)("showToolbar", true)("contentType", ctx_r5.currentDocument.content_type)("enableAnnotations", true)("enableRedactions", true)("height", "94.5vh");
} }
function CaseFileViewFieldComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "h2", 12);
    i0.ɵɵtext(2, "Case file");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 13)(4, "div", 14)(5, "ccd-case-file-view-folder", 15);
    i0.ɵɵlistener("clickedDocument", function CaseFileViewFieldComponent_div_2_Template_ccd_case_file_view_folder_clickedDocument_5_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); ctx_r6.setMediaViewerFile($event); return i0.ɵɵresetView(ctx_r6.resetErrorMessages()); })("moveDocument", function CaseFileViewFieldComponent_div_2_Template_ccd_case_file_view_folder_moveDocument_5_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.moveDocument($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "div", 16);
    i0.ɵɵelementStart(7, "div", 17);
    i0.ɵɵtemplate(8, CaseFileViewFieldComponent_div_2_ng_container_8_Template, 2, 7, "ng-container", 0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("categoriesAndDocuments", ctx_r2.categoriesAndDocuments$)("allowMoving", ctx_r2.allowMoving);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.currentDocument);
} }
export class CaseFileViewFieldComponent {
    constructor(elementRef, route, caseFileViewService, documentManagementService, loadingService, sessionStorageService) {
        this.elementRef = elementRef;
        this.route = route;
        this.caseFileViewService = caseFileViewService;
        this.documentManagementService = documentManagementService;
        this.loadingService = loadingService;
        this.sessionStorageService = sessionStorageService;
        this.allowMoving = true;
        this.getCategoriesAndDocumentsError = false;
        this.errorMessages = [];
    }
    ngOnInit() {
        const cid = this.route.snapshot.paramMap.get(CaseFileViewFieldComponent.PARAM_CASE_ID);
        this.categoriesAndDocuments$ = this.caseFileViewService.getCategoriesAndDocuments(cid);
        this.categoriesAndDocumentsSubscription = this.categoriesAndDocuments$.subscribe({
            next: data => {
                this.caseVersion = data.case_version;
            },
            error: _ => this.getCategoriesAndDocumentsError = true
        });
        // EXUI-8000
        const userInfo = JSON.parse(this.sessionStorageService.getItem('userDetails'));
        // Get acls that intersects from acl roles and user roles
        const acls = this.caseField.acls.filter(acl => userInfo.roles.includes(acl.role));
        // As there can be more than one intersecting role, if any acls are update: true
        this.allowMoving = acls.some(acl => acl.update);
    }
    ngAfterViewInit() {
        const slider = this.elementRef.nativeElement.querySelector('.slider');
        const documentTreeContainer = this.elementRef.nativeElement.querySelector('.document-tree-container');
        const mousedown$ = fromEvent(slider, 'mousedown');
        const mousemove$ = fromEvent(document, 'mousemove');
        const mouseup$ = fromEvent(document, 'mouseup');
        const drag$ = mousedown$.pipe(switchMap((start) => {
            const x = start.clientX;
            const documentTreeContainerWidth = documentTreeContainer.getBoundingClientRect().width;
            return mousemove$.pipe(map(move => {
                move.preventDefault();
                return {
                    dx: move.clientX - x,
                    documentTreeContainerWidth
                };
            }), takeUntil(mouseup$));
        }));
        drag$.subscribe(pos => {
            const calculatedWidth = ((pos.documentTreeContainerWidth + pos.dx) * 100) / slider.parentElement.getBoundingClientRect().width;
            documentTreeContainer.setAttribute('style', `width: ${calculatedWidth}%`);
        });
    }
    setMediaViewerFile(document) {
        const mediaViewerInfo = this.documentManagementService.getMediaViewerInfo({
            document_binary_url: document.document_binary_url,
            document_filename: document.document_filename
        });
        this.currentDocument = JSON.parse(mediaViewerInfo);
    }
    moveDocument(data) {
        const cid = this.route.snapshot.paramMap.get(CaseFileViewFieldComponent.PARAM_CASE_ID);
        const loadingToken = this.loadingService.register();
        this.caseFileViewService.updateDocumentCategory(cid, this.caseVersion, data.document.attribute_path, data.newCategory)
            .pipe(finalize(() => {
            this.loadingService.unregister(loadingToken);
        }), catchError(() => {
            this.errorMessages = ['You do not have permission to move this document to the selected folder.'];
            return of(null);
        }))
            .subscribe(res => {
            if (res) {
                this.resetErrorMessages();
                this.reloadPage();
            }
        });
    }
    reloadPage() {
        location.reload();
    }
    resetErrorMessages() {
        this.errorMessages = [];
    }
    ngOnDestroy() {
        if (this.categoriesAndDocumentsSubscription) {
            this.categoriesAndDocumentsSubscription.unsubscribe();
        }
    }
}
CaseFileViewFieldComponent.PARAM_CASE_ID = 'cid';
CaseFileViewFieldComponent.ɵfac = function CaseFileViewFieldComponent_Factory(t) { return new (t || CaseFileViewFieldComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CaseFileViewService), i0.ɵɵdirectiveInject(i2.DocumentManagementService), i0.ɵɵdirectiveInject(i2.LoadingService), i0.ɵɵdirectiveInject(i2.SessionStorageService)); };
CaseFileViewFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFileViewFieldComponent, selectors: [["ccd-case-file-view-field"]], decls: 3, vars: 3, consts: [[4, "ngIf"], ["class", "govuk-grid-column-two-thirds", 4, "ngIf"], ["id", "case-file-view-field-errors", "data-module", "govuk-error-summary", 1, "govuk-error-summary", "govuk-!-margin-bottom-4"], ["role", "alert"], [1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], [4, "ngFor", "ngForOf"], ["href", "javascript:void(0);"], [1, "govuk-grid-column-two-thirds"], [1, "govuk-heading-xl"], [1, "govuk-body"], [1, "govuk-heading-l"], ["id", "case-file-view", 1, "govuk-form-group"], [1, "document-tree-container"], [1, "document-tree-container__tree", 3, "categoriesAndDocuments", "allowMoving", "clickedDocument", "moveDocument"], [1, "slider"], [1, "media-viewer-container"], [3, "url", "downloadFileName", "showToolbar", "contentType", "enableAnnotations", "enableRedactions", "height"]], template: function CaseFileViewFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseFileViewFieldComponent_ng_container_0_Template, 8, 1, "ng-container", 0);
        i0.ɵɵtemplate(1, CaseFileViewFieldComponent_div_1_Template, 5, 0, "div", 1);
        i0.ɵɵtemplate(2, CaseFileViewFieldComponent_div_2_Template, 9, 3, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.errorMessages == null ? null : ctx.errorMessages.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.getCategoriesAndDocumentsError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.getCategoriesAndDocumentsError);
    } }, styles: ["#case-file-view[_ngcontent-%COMP%]{display:flex;border:2px solid #C9C9C9;height:100vh;position:relative}#case-file-view[_ngcontent-%COMP%]   .document-tree-container[_ngcontent-%COMP%]{background-color:#faf8f8;width:30%;min-height:400px;min-width:10%}#case-file-view[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%]{width:.2%;background-color:#6b6b6b}#case-file-view[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%]:hover, #case-file-view[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%]:focus{cursor:col-resize}#case-file-view[_ngcontent-%COMP%]   .media-viewer-container[_ngcontent-%COMP%]{background-color:#dee0e2;flex:1 1 0;overflow:hidden}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFileViewFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-file-view-field', template: "<ng-container *ngIf=\"errorMessages?.length\">\n  <div\n    id=\"case-file-view-field-errors\"\n    class=\"govuk-error-summary govuk-!-margin-bottom-4\" data-module=\"govuk-error-summary\">\n    <div role=\"alert\">\n      <h2 class=\"govuk-error-summary__title\">\n        There is a problem\n      </h2>\n      <div class=\"govuk-error-summary__body\">\n        <ul class=\"govuk-list govuk-error-summary__list\">\n          <li *ngFor=\"let errorMessage of errorMessages\">\n            <a href=\"javascript:void(0);\">{{ errorMessage }}</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<div *ngIf=\"getCategoriesAndDocumentsError\" class=\"govuk-grid-column-two-thirds\">\n  <h1 class=\"govuk-heading-xl\">Sorry, there is a problem with the service</h1>\n  <p class=\"govuk-body\">Try again later.</p>\n</div>\n<div *ngIf=\"!getCategoriesAndDocumentsError\">\n  <h2 class=\"govuk-heading-l\">Case file</h2>\n  <div class=\"govuk-form-group\" id=\"case-file-view\">\n    <!-- Document tree -->\n    <div class=\"document-tree-container\">\n      <ccd-case-file-view-folder\n        class=\"document-tree-container__tree\"\n        [categoriesAndDocuments]=\"categoriesAndDocuments$\"\n        (clickedDocument)=\"setMediaViewerFile($event); resetErrorMessages()\"\n        (moveDocument)=\"moveDocument($event)\"\n        [allowMoving]=\"allowMoving\"\n      ></ccd-case-file-view-folder>\n    </div>\n    <!-- Slider -->\n    <div class=\"slider\"></div>\n    <!-- Media viewer -->\n    <div class=\"media-viewer-container\">\n      <ng-container *ngIf=\"currentDocument\">\n        <mv-media-viewer [url]=\"currentDocument.document_binary_url\"\n                         [downloadFileName]=\"currentDocument.document_filename\"\n                         [showToolbar]=\"true\"\n                         [contentType]=\"currentDocument.content_type\"\n                         [enableAnnotations]=\"true\"\n                         [enableRedactions]=\"true\"\n                         [height]=\"'94.5vh'\">\n        </mv-media-viewer>\n      </ng-container>\n    </div>\n  </div>\n</div>\n", styles: ["#case-file-view{display:flex;border:2px solid #C9C9C9;height:100vh;position:relative}#case-file-view .document-tree-container{background-color:#faf8f8;width:30%;min-height:400px;min-width:10%}#case-file-view .slider{width:.2%;background-color:#6b6b6b}#case-file-view .slider:hover,#case-file-view .slider:focus{cursor:col-resize}#case-file-view .media-viewer-container{background-color:#dee0e2;flex:1 1 0;overflow:hidden}\n"] }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.ActivatedRoute }, { type: i2.CaseFileViewService }, { type: i2.DocumentManagementService }, { type: i2.LoadingService }, { type: i2.SessionStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWxlLXZpZXctZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1maWxlLXZpZXcvY2FzZS1maWxlLXZpZXctZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1maWxlLXZpZXcvY2FzZS1maWxlLXZpZXctZmllbGQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBYyxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHlCQUF5QixFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztJQ0doSCwwQkFBK0MsV0FBQTtJQUNmLFlBQWtCO0lBQUEsaUJBQUksRUFBQTs7O0lBQXRCLGVBQWtCO0lBQWxCLHFDQUFrQjs7O0lBWDVELDZCQUE0QztJQUMxQyw4QkFFd0YsYUFBQSxZQUFBO0lBR2xGLG9DQUNGO0lBQUEsaUJBQUs7SUFDTCw4QkFBdUMsWUFBQTtJQUVuQyx3RkFFSztJQUNQLGlCQUFLLEVBQUEsRUFBQSxFQUFBO0lBSWIsMEJBQWU7OztJ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ZixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLElBQUksQ0FBQyxrQ0FBa0MsRUFBRTtZQUMzQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkQ7SUFDSCxDQUFDOztBQTNHc0Isd0NBQWEsR0FBRyxLQUFLLENBQUM7b0dBRGxDLDBCQUEwQjs2RUFBMUIsMEJBQTBCO1FDZHZDLDZGQWlCZTtRQUVmLDJFQUdNO1FBQ04sMkVBNkJNOztRQXBEUyxrRkFBMkI7UUFtQnBDLGVBQW9DO1FBQXBDLHlEQUFvQztRQUlwQyxlQUFxQztRQUFyQywwREFBcUM7O3VGRFQ5QiwwQkFBMEI7Y0FMdEMsU0FBUzsyQkFDRSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZpbmFsaXplLCBtYXAsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IENhc2VGaWxlVmlld0RvY3VtZW50LCBDYXRlZ29yaWVzQW5kRG9jdW1lbnRzLCBEb2N1bWVudFRyZWVOb2RlIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2Nhc2UtZmlsZS12aWV3JztcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3VzZXIvdXNlci1pbmZvLm1vZGVsJztcbmltcG9ydCB7IENhc2VGaWxlVmlld1NlcnZpY2UsIERvY3VtZW50TWFuYWdlbWVudFNlcnZpY2UsIExvYWRpbmdTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1jYXNlLWZpbGUtdmlldy1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWZpbGUtdmlldy1maWVsZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhc2UtZmlsZS12aWV3LWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENhc2VGaWxlVmlld0ZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBBUkFNX0NBU0VfSUQgPSAnY2lkJztcbiAgcHVibGljIGFsbG93TW92aW5nID0gdHJ1ZTtcbiAgcHVibGljIGNhdGVnb3JpZXNBbmREb2N1bWVudHMkOiBPYnNlcnZhYmxlPENhdGVnb3JpZXNBbmREb2N1bWVudHM+O1xuICBwdWJsaWMgY2F0ZWdvcmllc0FuZERvY3VtZW50c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgZ2V0Q2F0ZWdvcmllc0FuZERvY3VtZW50c0Vycm9yID0gZmFsc2U7XG4gIHB1YmxpYyBjdXJyZW50RG9jdW1lbnQ6IENhc2VGaWxlVmlld0RvY3VtZW50IHwgdW5kZWZpbmVkO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlcyA9IFtdIGFzIHN0cmluZ1tdO1xuICBwcml2YXRlIGNhc2VWZXJzaW9uOiBudW1iZXI7XG4gIHB1YmxpYyBjYXNlRmllbGQ6IENhc2VGaWVsZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSBjYXNlRmlsZVZpZXdTZXJ2aWNlOiBDYXNlRmlsZVZpZXdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZTogRG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlc3Npb25TdG9yYWdlU2VydmljZTogU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNpZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KENhc2VGaWxlVmlld0ZpZWxkQ29tcG9uZW50LlBBUkFNX0NBU0VfSUQpO1xuICAgIHRoaXMuY2F0ZWdvcmllc0FuZERvY3VtZW50cyQgPSB0aGlzLmNhc2VGaWxlVmlld1NlcnZpY2UuZ2V0Q2F0ZWdvcmllc0FuZERvY3VtZW50cyhjaWQpO1xuICAgIHRoaXMuY2F0ZWdvcmllc0FuZERvY3VtZW50c1N1YnNjcmlwdGlvbiA9IHRoaXMuY2F0ZWdvcmllc0FuZERvY3VtZW50cyQuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IGRhdGEgPT4ge1xuICAgICAgICB0aGlzLmNhc2VWZXJzaW9uID0gZGF0YS5jYXNlX3ZlcnNpb247XG4gICAgICB9LFxuICAgICAgZXJyb3I6IF8gPT4gdGhpcy5nZXRDYXRlZ29yaWVzQW5kRG9jdW1lbnRzRXJyb3IgPSB0cnVlXG4gICAgfSk7XG5cbiAgICAvLyBFWFVJLTgwMDBcbiAgICBjb25zdCB1c2VySW5mbzogVXNlckluZm8gPSBKU09OLnBhcnNlKHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmdldEl0ZW0oJ3VzZXJEZXRhaWxzJykpO1xuICAgIC8vIEdldCBhY2xzIHRoYXQgaW50ZXJzZWN0cyBmcm9tIGFjbCByb2xlcyBhbmQgdXNlciByb2xlc1xuICAgIGNvbnN0IGFjbHMgPSB0aGlzLmNhc2VGaWVsZC5hY2xzLmZpbHRlcihhY2wgPT4gdXNlckluZm8ucm9sZXMuaW5jbHVkZXMoYWNsLnJvbGUpKTtcbiAgICAvLyBBcyB0aGVyZSBjYW4gYmUgbW9yZSB0aGFuIG9uZSBpbnRlcnNlY3Rpbmcgcm9sZSwgaWYgYW55IGFjbHMgYXJlIHVwZGF0ZTogdHJ1ZVxuICAgIHRoaXMuYWxsb3dNb3ZpbmcgPSBhY2xzLnNvbWUoYWNsID0+IGFjbC51cGRhdGUpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBzbGlkZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJyk7XG4gICAgY29uc3QgZG9jdW1lbnRUcmVlQ29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRvY3VtZW50LXRyZWUtY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBtb3VzZWRvd24kID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHNsaWRlciwgJ21vdXNlZG93bicpO1xuICAgIGNvbnN0IG1vdXNlbW92ZSQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICBjb25zdCBtb3VzZXVwJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgICBjb25zdCBkcmFnJCA9IG1vdXNlZG93biQucGlwZShcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKHN0YXJ0KSA9PiB7XG4gICAgICAgICAgY29uc3QgeCA9IHN0YXJ0LmNsaWVudFg7XG4gICAgICAgICAgY29uc3QgZG9jdW1lbnRUcmVlQ29udGFpbmVyV2lkdGggPSBkb2N1bWVudFRyZWVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgcmV0dXJuIG1vdXNlbW92ZSQucGlwZShtYXAobW92ZSA9PiB7XG4gICAgICAgICAgICBtb3ZlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBkeDogbW92ZS5jbGllbnRYIC0geCxcbiAgICAgICAgICAgICAgZG9jdW1lbnRUcmVlQ29udGFpbmVyV2lkdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFrZVVudGlsKG1vdXNldXAkKSk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgZHJhZyQuc3Vic2NyaWJlKHBvcyA9PiB7XG4gICAgICBjb25zdCBjYWxjdWxhdGVkV2lkdGggPSAoKHBvcy5kb2N1bWVudFRyZWVDb250YWluZXJXaWR0aCArIHBvcy5keCkgKiAxMDApIC8gc2xpZGVyLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICBkb2N1bWVudFRyZWVDb250YWluZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsIGB3aWR0aDogJHtjYWxjdWxhdGVkV2lkdGh9JWApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldE1lZGlhVmlld2VyRmlsZShkb2N1bWVudDogRG9jdW1lbnRUcmVlTm9kZSk6IHZvaWQge1xuICAgIGNvbnN0IG1lZGlhVmlld2VySW5mbyA9IHRoaXMuZG9jdW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRNZWRpYVZpZXdlckluZm8oe1xuICAgICAgZG9jdW1lbnRfYmluYXJ5X3VybDogZG9jdW1lbnQuZG9jdW1lbnRfYmluYXJ5X3VybCxcbiAgICAgIGRvY3VtZW50X2ZpbGVuYW1lOiBkb2N1bWVudC5kb2N1bWVudF9maWxlbmFtZVxuICAgIH0pO1xuICAgIHRoaXMuY3VycmVudERvY3VtZW50ID0gSlNPTi5wYXJzZShtZWRpYVZpZXdlckluZm8pO1xuICB9XG5cbiAgcHVibGljIG1vdmVEb2N1bWVudChkYXRhOiB7IGRvY3VtZW50OiBEb2N1bWVudFRyZWVOb2RlLCBuZXdDYXRlZ29yeTogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICBjb25zdCBjaWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldChDYXNlRmlsZVZpZXdGaWVsZENvbXBvbmVudC5QQVJBTV9DQVNFX0lEKTtcbiAgICBjb25zdCBsb2FkaW5nVG9rZW4gPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLnJlZ2lzdGVyKCk7XG4gICAgdGhpcy5jYXNlRmlsZVZpZXdTZXJ2aWNlLnVwZGF0ZURvY3VtZW50Q2F0ZWdvcnkoY2lkLCB0aGlzLmNhc2VWZXJzaW9uLCBkYXRhLmRvY3VtZW50LmF0dHJpYnV0ZV9wYXRoLCBkYXRhLm5ld0NhdGVnb3J5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnVucmVnaXN0ZXIobG9hZGluZ1Rva2VuKTtcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IFsnWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gbW92ZSB0aGlzIGRvY3VtZW50IHRvIHRoZSBzZWxlY3RlZCBmb2xkZXIuJ107XG4gICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHRoaXMucmVzZXRFcnJvck1lc3NhZ2VzKCk7XG4gICAgICAgICAgdGhpcy5yZWxvYWRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZWxvYWRQYWdlKCk6IHZvaWQge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0RXJyb3JNZXNzYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYXRlZ29yaWVzQW5kRG9jdW1lbnRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhdGVnb3JpZXNBbmREb2N1bWVudHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJlcnJvck1lc3NhZ2VzPy5sZW5ndGhcIj5cbiAgPGRpdlxuICAgIGlkPVwiY2FzZS1maWxlLXZpZXctZmllbGQtZXJyb3JzXCJcbiAgICBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnkgZ292dWstIS1tYXJnaW4tYm90dG9tLTRcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWVycm9yLXN1bW1hcnlcIj5cbiAgICA8ZGl2IHJvbGU9XCJhbGVydFwiPlxuICAgICAgPGgyIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fdGl0bGVcIj5cbiAgICAgICAgVGhlcmUgaXMgYSBwcm9ibGVtXG4gICAgICA8L2gyPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX2JvZHlcIj5cbiAgICAgICAgPHVsIGNsYXNzPVwiZ292dWstbGlzdCBnb3Z1ay1lcnJvci1zdW1tYXJ5X19saXN0XCI+XG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBlcnJvck1lc3NhZ2Ugb2YgZXJyb3JNZXNzYWdlc1wiPlxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIj57eyBlcnJvck1lc3NhZ2UgfX08L2E+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48ZGl2ICpuZ0lmPVwiZ2V0Q2F0ZWdvcmllc0FuZERvY3VtZW50c0Vycm9yXCIgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi10d28tdGhpcmRzXCI+XG4gIDxoMSBjbGFzcz1cImdvdnVrLWhlYWRpbmcteGxcIj5Tb3JyeSwgdGhlcmUgaXMgYSBwcm9ibGVtIHdpdGggdGhlIHNlcnZpY2U8L2gxPlxuICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5UcnkgYWdhaW4gbGF0ZXIuPC9wPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiIWdldENhdGVnb3JpZXNBbmREb2N1bWVudHNFcnJvclwiPlxuICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj5DYXNlIGZpbGU8L2gyPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiIGlkPVwiY2FzZS1maWxlLXZpZXdcIj5cbiAgICA8IS0tIERvY3VtZW50IHRyZWUgLS0+XG4gICAgPGRpdiBjbGFzcz1cImRvY3VtZW50LXRyZWUtY29udGFpbmVyXCI+XG4gICAgICA8Y2NkLWNhc2UtZmlsZS12aWV3LWZvbGRlclxuICAgICAgICBjbGFzcz1cImRvY3VtZW50LXRyZWUtY29udGFpbmVyX190cmVlXCJcbiAgICAgICAgW2NhdGVnb3JpZXNBbmREb2N1bWVudHNdPVwiY2F0ZWdvcmllc0FuZERvY3VtZW50cyRcIlxuICAgICAgICAoY2xpY2tlZERvY3VtZW50KT1cInNldE1lZGlhVmlld2VyRmlsZSgkZXZlbnQpOyByZXNldEVycm9yTWVzc2FnZXMoKVwiXG4gICAgICAgIChtb3ZlRG9jdW1lbnQpPVwibW92ZURvY3VtZW50KCRldmVudClcIlxuICAgICAgICBbYWxsb3dNb3ZpbmddPVwiYWxsb3dNb3ZpbmdcIlxuICAgICAgPjwvY2NkLWNhc2UtZmlsZS12aWV3LWZvbGRlcj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIFNsaWRlciAtLT5cbiAgICA8ZGl2IGNsYXNzPVwic2xpZGVyXCI+PC9kaXY+XG4gICAgPCEtLSBNZWRpYSB2aWV3ZXIgLS0+XG4gICAgPGRpdiBjbGFzcz1cIm1lZGlhLXZpZXdlci1jb250YWluZXJcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50RG9jdW1lbnRcIj5cbiAgICAgICAgPG12LW1lZGlhLXZpZXdlciBbdXJsXT1cImN1cnJlbnREb2N1bWVudC5kb2N1bWVudF9iaW5hcnlfdXJsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZG93bmxvYWRGaWxlTmFtZV09XCJjdXJyZW50RG9jdW1lbnQuZG9jdW1lbnRfZmlsZW5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtzaG93VG9vbGJhcl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbY29udGVudFR5cGVdPVwiY3VycmVudERvY3VtZW50LmNvbnRlbnRfdHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2VuYWJsZUFubm90YXRpb25zXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtlbmFibGVSZWRhY3Rpb25zXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtoZWlnaHRdPVwiJzk0LjV2aCdcIj5cbiAgICAgICAgPC9tdi1tZWRpYS12aWV3ZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==