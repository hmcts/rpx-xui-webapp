import { Component, EventEmitter, Input, Output } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseView } from '../../../domain/case-view/case-view.model';
import { Draft } from '../../../domain/draft.model';
import { AlertService } from '../../../services/alert/alert.service';
import { DraftService } from '../../../services/draft/draft.service';
import { NavigationNotifierService } from '../../../services/navigation/navigation-notifier.service';
import { CaseNotifier } from '../../case-editor/services/case.notifier';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/navigation/navigation-notifier.service";
import * as i2 from "../../case-editor/services/case.notifier";
import * as i3 from "../../case-editor/services/cases.service";
import * as i4 from "../../../services/draft/draft.service";
import * as i5 from "../../../services/alert/alert.service";
function CaseViewComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-case-viewer", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("hasPrint", ctx_r0.hasPrint)("hasEventSelector", ctx_r0.hasEventSelector);
} }
export class CaseViewComponent {
    constructor(navigationNotifierService, caseNotifier, casesService, draftService, alertService) {
        this.navigationNotifierService = navigationNotifierService;
        this.caseNotifier = caseNotifier;
        this.casesService = casesService;
        this.draftService = draftService;
        this.alertService = alertService;
        this.hasPrint = true;
        this.hasEventSelector = true;
        this.navigationTriggered = new EventEmitter();
    }
    ngOnInit() {
        this.getCaseView(this.case)
            .pipe(map(caseView => {
            this.caseDetails = plainToClassFromExist(new CaseView(), caseView);
            this.caseNotifier.announceCase(this.caseDetails);
        }))
            .toPromise()
            .catch(error => this.checkErrorGettingCaseView(error));
        this.navigationSubscription = this.navigationNotifierService.navigation.subscribe(navigation => {
            this.navigationTriggered.emit(navigation);
        });
    }
    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
    isDataLoaded() {
        return !!this.caseDetails;
    }
    getCaseView(cid) {
        if (Draft.isDraft(cid)) {
            return this.getDraft(cid);
        }
        else {
            return this.casesService.getCaseViewV2(cid);
        }
    }
    getDraft(cid) {
        return this.draftService
            .getDraft(cid);
    }
    checkErrorGettingCaseView(error) {
        // TODO Should be logged to remote logging infrastructure
        console.error('Called checkErrorGettingCaseView.');
        console.error(error);
        if (error.status !== 401 && error.status !== 403) {
            this.alertService.error(error.message);
        }
        return throwError(error);
    }
}
CaseViewComponent.ɵfac = function CaseViewComponent_Factory(t) { return new (t || CaseViewComponent)(i0.ɵɵdirectiveInject(i1.NavigationNotifierService), i0.ɵɵdirectiveInject(i2.CaseNotifier), i0.ɵɵdirectiveInject(i3.CasesService), i0.ɵɵdirectiveInject(i4.DraftService), i0.ɵɵdirectiveInject(i5.AlertService)); };
CaseViewComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseViewComponent, selectors: [["ccd-case-view"]], inputs: { case: "case", hasPrint: "hasPrint", hasEventSelector: "hasEventSelector" }, outputs: { navigationTriggered: "navigationTriggered" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "hasPrint", "hasEventSelector"]], template: function CaseViewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseViewComponent_div_0_Template, 2, 2, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseViewComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-view', template: "<div *ngIf=\"isDataLoaded()\">\n    <ccd-case-viewer [hasPrint]=\"hasPrint\"\n                     [hasEventSelector]=\"hasEventSelector\">\n    </ccd-case-viewer>\n</div>\n" }]
    }], function () { return [{ type: i1.NavigationNotifierService }, { type: i2.CaseNotifier }, { type: i3.CasesService }, { type: i4.DraftService }, { type: i5.AlertService }]; }, { case: [{
            type: Input
        }], hasPrint: [{
            type: Input
        }], hasEventSelector: [{
            type: Input
        }], navigationTriggered: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLXZpZXcvY2FzZS12aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLXZpZXcvY2FzZS12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBNEIsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDckUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDckcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7Ozs7SUNWeEUsMkJBQTRCO0lBQ3hCLHFDQUVrQjtJQUN0QixpQkFBTTs7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QkFEekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0IH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXNlVmlldyB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS12aWV3Lm1vZGVsJztcbmltcG9ydCB7IERyYWZ0IH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RyYWZ0Lm1vZGVsJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FsZXJ0L2FsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhZnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZHJhZnQvZHJhZnQuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLW5vdGlmaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZU5vdGlmaWVyIH0gZnJvbSAnLi4vLi4vY2FzZS1lZGl0b3Ivc2VydmljZXMvY2FzZS5ub3RpZmllcic7XG5pbXBvcnQgeyBDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlcy5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICdjYXNlLXZpZXcuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBoYXNQcmludCA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBoYXNFdmVudFNlbGVjdG9yID0gdHJ1ZTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG5hdmlnYXRpb25UcmlnZ2VyZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBuYXZpZ2F0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBjYXNlRGV0YWlsczogQ2FzZVZpZXc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBuYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlOiBOYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZU5vdGlmaWVyOiBDYXNlTm90aWZpZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlc1NlcnZpY2U6IENhc2VzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRyYWZ0U2VydmljZTogRHJhZnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDYXNlVmlldyh0aGlzLmNhc2UpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGNhc2VWaWV3ID0+IHtcbiAgICAgICAgICB0aGlzLmNhc2VEZXRhaWxzID0gcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KG5ldyBDYXNlVmlldygpLCBjYXNlVmlldyk7XG4gICAgICAgICAgdGhpcy5jYXNlTm90aWZpZXIuYW5ub3VuY2VDYXNlKHRoaXMuY2FzZURldGFpbHMpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5jaGVja0Vycm9yR2V0dGluZ0Nhc2VWaWV3KGVycm9yKSk7XG4gICAgdGhpcy5uYXZpZ2F0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5uYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLm5hdmlnYXRpb24uc3Vic2NyaWJlKG5hdmlnYXRpb24gPT4ge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uVHJpZ2dlcmVkLmVtaXQobmF2aWdhdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubmF2aWdhdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRGF0YUxvYWRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmNhc2VEZXRhaWxzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXNlVmlldyhjaWQpOiBPYnNlcnZhYmxlPENhc2VWaWV3PiB7XG4gICAgaWYgKERyYWZ0LmlzRHJhZnQoY2lkKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RHJhZnQoY2lkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2FzZXNTZXJ2aWNlLmdldENhc2VWaWV3VjIoY2lkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERyYWZ0KGNpZCk6IE9ic2VydmFibGU8Q2FzZVZpZXc+IHtcbiAgICByZXR1cm4gdGhpcy5kcmFmdFNlcnZpY2VcbiAgICAgIC5nZXREcmFmdChjaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0Vycm9yR2V0dGluZ0Nhc2VWaWV3KGVycm9yOiBhbnkpIHtcbiAgICAvLyBUT0RPIFNob3VsZCBiZSBsb2dnZWQgdG8gcmVtb3RlIGxvZ2dpbmcgaW5mcmFzdHJ1Y3R1cmVcbiAgICBjb25zb2xlLmVycm9yKCdDYWxsZWQgY2hlY2tFcnJvckdldHRpbmdDYXNlVmlldy4nKTtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICBpZiAoZXJyb3Iuc3RhdHVzICE9PSA0MDEgJiYgZXJyb3Iuc3RhdHVzICE9PSA0MDMpIHtcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc0RhdGFMb2FkZWQoKVwiPlxuICAgIDxjY2QtY2FzZS12aWV3ZXIgW2hhc1ByaW50XT1cImhhc1ByaW50XCJcbiAgICAgICAgICAgICAgICAgICAgIFtoYXNFdmVudFNlbGVjdG9yXT1cImhhc0V2ZW50U2VsZWN0b3JcIj5cbiAgICA8L2NjZC1jYXNlLXZpZXdlcj5cbjwvZGl2PlxuIl19