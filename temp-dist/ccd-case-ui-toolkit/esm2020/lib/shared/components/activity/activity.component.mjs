import { Component, Input } from '@angular/core';
import { Activity, DisplayMode } from '../../domain/activity/activity.model';
import { ActivityPollingService } from '../../services/activity/activity.polling.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/activity/activity.polling.service";
import * as i2 from "@angular/common";
import * as i3 from "./activity-banner/activity-banner.component";
import * as i4 from "./activity-icon/activity-icon.component";
import * as i5 from "rpx-xui-translation";
function ActivityComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-activity-icon", 5);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("activityEditorsAndViewersIcons", ctx_r1.viewersPresent())("activityEditorsIcon", !ctx_r1.viewersPresent());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("description", i0.ɵɵpipeBind1(2, 5, ctx_r1.editorsText));
} }
function ActivityComponent_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ccd-activity-icon", 7);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("description", i0.ɵɵpipeBind1(2, 1, ctx_r2.viewersText));
} }
function ActivityComponent_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-activity-banner", 8);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("description", i0.ɵɵpipeBind1(2, 1, ctx_r3.editorsText));
} }
function ActivityComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-activity-banner", 9);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("description", i0.ɵɵpipeBind1(2, 1, ctx_r4.viewersText));
} }
function ActivityComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, ActivityComponent_div_0_div_1_Template, 3, 7, "div", 2);
    i0.ɵɵtemplate(2, ActivityComponent_div_0_div_2_Template, 3, 3, "div", 3);
    i0.ɵɵtemplate(3, ActivityComponent_div_0_div_3_Template, 3, 3, "div", 4);
    i0.ɵɵtemplate(4, ActivityComponent_div_0_div_4_Template, 3, 3, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayMode === ctx_r0.dspMode.ICON && ctx_r0.editorsPresent());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayMode === ctx_r0.dspMode.ICON && ctx_r0.viewersPresent());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayMode === ctx_r0.dspMode.BANNER && ctx_r0.editorsPresent());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayMode === ctx_r0.dspMode.BANNER && ctx_r0.viewersPresent());
} }
export class ActivityComponent {
    constructor(activityPollingService) {
        this.activityPollingService = activityPollingService;
        this.dspMode = DisplayMode;
        this.VIEWERS_PREFIX = '';
        this.VIEWERS_SUFFIX = 'viewing this case';
        this.EDITORS_PREFIX = 'This case is being updated by ';
        this.EDITORS_SUFFIX = '';
    }
    ngOnInit() {
        this.activity = new Activity();
        this.activity.caseId = this.caseId;
        this.activity.editors = [];
        this.activity.unknownEditors = 0;
        this.activity.viewers = [];
        this.activity.unknownViewers = 0;
        this.viewersText = '';
        this.editorsText = '';
        this.subscription = this.activityPollingService.subscribeToActivity(this.caseId, newActivity => this.onActivityChange(newActivity));
    }
    onActivityChange(newActivity) {
        this.activity = newActivity;
        this.viewersText = this.generateDescription(this.VIEWERS_PREFIX, this.VIEWERS_SUFFIX, this.activity.viewers, this.activity.unknownViewers);
        this.editorsText = this.generateDescription(this.EDITORS_PREFIX, this.EDITORS_SUFFIX, this.activity.editors, this.activity.unknownEditors);
    }
    isActivityEnabled() {
        return this.activityPollingService.isEnabled;
    }
    isActiveCase() {
        return this.activity.editors.length || this.activity.viewers.length || this.activity.unknownEditors || this.activity.unknownViewers;
    }
    viewersPresent() {
        return (this.activity.viewers.length > 0 || this.activity.unknownViewers > 0);
    }
    editorsPresent() {
        return (this.activity.editors.length > 0 || this.activity.unknownEditors > 0);
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.complete();
            this.subscription.unsubscribe();
        }
        this.activityPollingService.stopPolling();
    }
    generateDescription(prefix, suffix, namesArray, unknownCount) {
        let resultText = prefix;
        resultText += namesArray.map(activityInfo => `${activityInfo.forename} ${activityInfo.surname}`).join(', ');
        if (unknownCount > 0) {
            resultText += (namesArray.length > 0 ? ` and ${unknownCount} other` : `${unknownCount} user`);
            resultText += (unknownCount > 1 ? 's' : '');
        }
        else {
            resultText = this.replaceLastCommaWithAnd(resultText);
        }
        if (suffix.length > 0) {
            if (namesArray.length + unknownCount > 1) {
                resultText += ` are ${suffix}`;
            }
            else {
                resultText += ` is ${suffix}`;
            }
        }
        return resultText;
    }
    replaceLastCommaWithAnd(str) {
        return str.trim().replace(/,([^,]*)$/, ' and $1').split('  ').join(' ');
    }
}
ActivityComponent.ɵfac = function ActivityComponent_Factory(t) { return new (t || ActivityComponent)(i0.ɵɵdirectiveInject(i1.ActivityPollingService)); };
ActivityComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActivityComponent, selectors: [["ccd-activity"]], inputs: { caseId: "caseId", displayMode: "displayMode" }, decls: 1, vars: 1, consts: [["class", "activityComponent", 4, "ngIf"], [1, "activityComponent"], [3, "activityEditorsAndViewersIcons", "activityEditorsIcon", 4, "ngIf"], ["class", "activityViewersIcon", 4, "ngIf"], [4, "ngIf"], ["imageLink", "/img/editor.png", 3, "description"], [1, "activityViewersIcon"], ["imageLink", "/img/viewer.png", 3, "description"], ["imageLink", "/img/editorBanner.png", "bannerType", "editor", 3, "description"], ["imageLink", "/img/viewerBanner.png", "bannerType", "viewer", 3, "description"]], template: function ActivityComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ActivityComponent_div_0_Template, 5, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isActivityEnabled());
    } }, dependencies: [i2.NgIf, i3.ActivityBannerComponent, i4.ActivityIconComponent, i5.RpxTranslatePipe], styles: [".activityEditorsIcon[_ngcontent-%COMP%]{margin-left:14px}.activityEditorsAndViewersIcons[_ngcontent-%COMP%], .activityViewersIcon[_ngcontent-%COMP%]{float:left;margin-left:14px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityComponent, [{
        type: Component,
        args: [{ selector: 'ccd-activity', template: "<div class=\"activityComponent\" *ngIf=\"isActivityEnabled()\">\n  <div *ngIf=\"displayMode === dspMode.ICON && editorsPresent()\" [class.activityEditorsAndViewersIcons]=\"viewersPresent()\" [class.activityEditorsIcon]=\"!viewersPresent()\">\n    <ccd-activity-icon imageLink=\"/img/editor.png\" [description]=\"editorsText | rpxTranslate\"></ccd-activity-icon>\n  </div>\n  <div *ngIf=\"displayMode === dspMode.ICON && viewersPresent()\" class=\"activityViewersIcon\">\n    <ccd-activity-icon imageLink=\"/img/viewer.png\" [description]=\"viewersText | rpxTranslate\"></ccd-activity-icon>\n  </div>\n  <div *ngIf=\"displayMode === dspMode.BANNER && editorsPresent()\">\n    <ccd-activity-banner imageLink=\"/img/editorBanner.png\" [description]=\"editorsText | rpxTranslate\" bannerType=\"editor\">\n    </ccd-activity-banner>\n  </div>\n  <div *ngIf=\"displayMode === dspMode.BANNER && viewersPresent()\">\n    <ccd-activity-banner imageLink=\"/img/viewerBanner.png\" [description]=\"viewersText | rpxTranslate\" bannerType=\"viewer\">\n    </ccd-activity-banner>\n  </div>\n</div>\n", styles: [".activityEditorsIcon{margin-left:14px}.activityEditorsAndViewersIcons,.activityViewersIcon{float:left;margin-left:14px}\n"] }]
    }], function () { return [{ type: i1.ActivityPollingService }]; }, { caseId: [{
            type: Input
        }], displayMode: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2FjdGl2aXR5L2FjdGl2aXR5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9hY3Rpdml0eS9hY3Rpdml0eS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFFcEUsT0FBTyxFQUFFLFFBQVEsRUFBZ0IsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7Ozs7Ozs7O0lDRnhGLDJCQUF3SztJQUN0Syx1Q0FBOEc7O0lBQ2hILGlCQUFNOzs7SUFGd0QseUVBQXlELGlEQUFBO0lBQ3RFLGVBQTBDO0lBQTFDLHNFQUEwQzs7O0lBRTNGLDhCQUEwRjtJQUN4Rix1Q0FBOEc7O0lBQ2hILGlCQUFNOzs7SUFEMkMsZUFBMEM7SUFBMUMsc0VBQTBDOzs7SUFFM0YsMkJBQWdFO0lBQzlELHlDQUNzQjs7SUFDeEIsaUJBQU07OztJQUZtRCxlQUEwQztJQUExQyxzRUFBMEM7OztJQUduRywyQkFBZ0U7SUFDOUQseUNBQ3NCOztJQUN4QixpQkFBTTs7O0lBRm1ELGVBQTBDO0lBQTFDLHNFQUEwQzs7O0lBWnJHLDhCQUEyRDtJQUN6RCx3RUFFTTtJQUNOLHdFQUVNO0lBQ04sd0VBR007SUFDTix3RUFHTTtJQUNSLGlCQUFNOzs7SUFkRSxlQUFzRDtJQUF0RCw0RkFBc0Q7SUFHdEQsZUFBc0Q7SUFBdEQsNEZBQXNEO0lBR3RELGVBQXdEO0lBQXhELDhGQUF3RDtJQUl4RCxlQUF3RDtJQUF4RCw4RkFBd0Q7O0FERGhFLE1BQU0sT0FBTyxpQkFBaUI7SUFtQjVCLFlBQTZCLHNCQUE4QztRQUE5QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBakJwRSxZQUFPLEdBQUcsV0FBVyxDQUFDO1FBWVosbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxtQkFBbUIsQ0FBQztRQUNyQyxtQkFBYyxHQUFHLGdDQUFnQyxDQUFDO1FBQ2xELG1CQUFjLEdBQUcsRUFBRSxDQUFDO0lBRXlDLENBQUM7SUFFeEUsUUFBUTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEksQ0FBQztJQUVNLGdCQUFnQixDQUFDLFdBQXFCO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQzdELElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQzdELElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxpQkFBaUI7UUFDdEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDO0lBQy9DLENBQUM7SUFFTSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUN0SSxDQUFDO0lBRU0sY0FBYztRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0sY0FBYztRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLFVBQTBCLEVBQUUsWUFBWTtRQUNqRyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDeEIsVUFBVSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVHLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNwQixVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQyxDQUFDO1lBQzlGLFVBQVUsSUFBSSxDQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNMLFVBQVUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkQ7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxZQUFZLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QyxVQUFVLElBQUksUUFBUSxNQUFNLEVBQUUsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxVQUFVLElBQUksT0FBTyxNQUFNLEVBQUUsQ0FBQzthQUMvQjtTQUNGO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVPLHVCQUF1QixDQUFDLEdBQVc7UUFDekMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFFLENBQUM7O2tGQTFGVSxpQkFBaUI7b0VBQWpCLGlCQUFpQjtRQ1Y5QixrRUFlTTs7UUFmMEIsOENBQXlCOzt1RkRVNUMsaUJBQWlCO2NBTDdCLFNBQVM7MkJBQ0UsY0FBYzt5RUFjakIsTUFBTTtrQkFEWixLQUFLO1lBSUMsV0FBVztrQkFEakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpdml0eSwgQWN0aXZpdHlJbmZvLCBEaXNwbGF5TW9kZSB9IGZyb20gJy4uLy4uL2RvbWFpbi9hY3Rpdml0eS9hY3Rpdml0eS5tb2RlbCc7XG5pbXBvcnQgeyBBY3Rpdml0eVBvbGxpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYWN0aXZpdHkvYWN0aXZpdHkucG9sbGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWFjdGl2aXR5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FjdGl2aXR5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWN0aXZpdHkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgYWN0aXZpdHk6IEFjdGl2aXR5O1xuICBwdWJsaWMgZHNwTW9kZSA9IERpc3BsYXlNb2RlO1xuXG4gIHB1YmxpYyB2aWV3ZXJzVGV4dDogc3RyaW5nO1xuICBwdWJsaWMgZWRpdG9yc1RleHQ6IHN0cmluZztcblxuICBwdWJsaWMgc3Vic2NyaXB0aW9uOiBTdWJqZWN0PEFjdGl2aXR5PjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZUlkOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZTtcbiAgcHJpdmF0ZSByZWFkb25seSBWSUVXRVJTX1BSRUZJWCA9ICcnO1xuICBwcml2YXRlIHJlYWRvbmx5IFZJRVdFUlNfU1VGRklYID0gJ3ZpZXdpbmcgdGhpcyBjYXNlJztcbiAgcHJpdmF0ZSByZWFkb25seSBFRElUT1JTX1BSRUZJWCA9ICdUaGlzIGNhc2UgaXMgYmVpbmcgdXBkYXRlZCBieSAnO1xuICBwcml2YXRlIHJlYWRvbmx5IEVESVRPUlNfU1VGRklYID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhY3Rpdml0eVBvbGxpbmdTZXJ2aWNlOiBBY3Rpdml0eVBvbGxpbmdTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjdGl2aXR5ID0gbmV3IEFjdGl2aXR5KCk7XG4gICAgdGhpcy5hY3Rpdml0eS5jYXNlSWQgPSB0aGlzLmNhc2VJZDtcbiAgICB0aGlzLmFjdGl2aXR5LmVkaXRvcnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2aXR5LnVua25vd25FZGl0b3JzID0gMDtcbiAgICB0aGlzLmFjdGl2aXR5LnZpZXdlcnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2aXR5LnVua25vd25WaWV3ZXJzID0gMDtcbiAgICB0aGlzLnZpZXdlcnNUZXh0ID0gJyc7XG4gICAgdGhpcy5lZGl0b3JzVGV4dCA9ICcnO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5hY3Rpdml0eVBvbGxpbmdTZXJ2aWNlLnN1YnNjcmliZVRvQWN0aXZpdHkodGhpcy5jYXNlSWQsIG5ld0FjdGl2aXR5ID0+IHRoaXMub25BY3Rpdml0eUNoYW5nZShuZXdBY3Rpdml0eSkpO1xuICB9XG5cbiAgcHVibGljIG9uQWN0aXZpdHlDaGFuZ2UobmV3QWN0aXZpdHk6IEFjdGl2aXR5KSB7XG4gICAgdGhpcy5hY3Rpdml0eSA9IG5ld0FjdGl2aXR5O1xuICAgIHRoaXMudmlld2Vyc1RleHQgPSB0aGlzLmdlbmVyYXRlRGVzY3JpcHRpb24odGhpcy5WSUVXRVJTX1BSRUZJWCxcbiAgICAgIHRoaXMuVklFV0VSU19TVUZGSVgsXG4gICAgICB0aGlzLmFjdGl2aXR5LnZpZXdlcnMsXG4gICAgICB0aGlzLmFjdGl2aXR5LnVua25vd25WaWV3ZXJzKTtcbiAgICB0aGlzLmVkaXRvcnNUZXh0ID0gdGhpcy5nZW5lcmF0ZURlc2NyaXB0aW9uKHRoaXMuRURJVE9SU19QUkVGSVgsXG4gICAgICB0aGlzLkVESVRPUlNfU1VGRklYLFxuICAgICAgdGhpcy5hY3Rpdml0eS5lZGl0b3JzLFxuICAgICAgdGhpcy5hY3Rpdml0eS51bmtub3duRWRpdG9ycyk7XG4gIH1cblxuICBwdWJsaWMgaXNBY3Rpdml0eUVuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZpdHlQb2xsaW5nU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNBY3RpdmVDYXNlKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2aXR5LmVkaXRvcnMubGVuZ3RoIHx8IHRoaXMuYWN0aXZpdHkudmlld2Vycy5sZW5ndGggfHwgdGhpcy5hY3Rpdml0eS51bmtub3duRWRpdG9ycyB8fCB0aGlzLmFjdGl2aXR5LnVua25vd25WaWV3ZXJzO1xuICB9XG5cbiAgcHVibGljIHZpZXdlcnNQcmVzZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5hY3Rpdml0eS52aWV3ZXJzLmxlbmd0aCA+IDAgfHwgdGhpcy5hY3Rpdml0eS51bmtub3duVmlld2VycyA+IDApO1xuICB9XG5cbiAgcHVibGljIGVkaXRvcnNQcmVzZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5hY3Rpdml0eS5lZGl0b3JzLmxlbmd0aCA+IDAgfHwgdGhpcy5hY3Rpdml0eS51bmtub3duRWRpdG9ycyA+IDApO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uY29tcGxldGUoKTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuYWN0aXZpdHlQb2xsaW5nU2VydmljZS5zdG9wUG9sbGluZygpO1xuICB9XG5cbiAgcHVibGljIGdlbmVyYXRlRGVzY3JpcHRpb24ocHJlZml4OiBzdHJpbmcsIHN1ZmZpeDogc3RyaW5nLCBuYW1lc0FycmF5OiBBY3Rpdml0eUluZm9bXSwgdW5rbm93bkNvdW50KSB7XG4gICAgbGV0IHJlc3VsdFRleHQgPSBwcmVmaXg7XG4gICAgcmVzdWx0VGV4dCArPSBuYW1lc0FycmF5Lm1hcChhY3Rpdml0eUluZm8gPT4gYCR7YWN0aXZpdHlJbmZvLmZvcmVuYW1lfSAke2FjdGl2aXR5SW5mby5zdXJuYW1lfWApLmpvaW4oJywgJyk7XG4gICAgaWYgKHVua25vd25Db3VudCA+IDApIHtcbiAgICAgIHJlc3VsdFRleHQgKz0gKG5hbWVzQXJyYXkubGVuZ3RoID4gMCA/IGAgYW5kICR7dW5rbm93bkNvdW50fSBvdGhlcmAgOiBgJHt1bmtub3duQ291bnR9IHVzZXJgKTtcbiAgICAgIHJlc3VsdFRleHQgKz0gKCB1bmtub3duQ291bnQgPiAxID8gJ3MnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRUZXh0ID0gdGhpcy5yZXBsYWNlTGFzdENvbW1hV2l0aEFuZChyZXN1bHRUZXh0KTtcbiAgICB9XG4gICAgaWYgKHN1ZmZpeC5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAobmFtZXNBcnJheS5sZW5ndGggKyB1bmtub3duQ291bnQgPiAxKSB7XG4gICAgICAgIHJlc3VsdFRleHQgKz0gYCBhcmUgJHtzdWZmaXh9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFRleHQgKz0gYCBpcyAke3N1ZmZpeH1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0VGV4dDtcbiAgfVxuXG4gIHByaXZhdGUgcmVwbGFjZUxhc3RDb21tYVdpdGhBbmQoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnJlcGxhY2UoLywoW14sXSopJC8sICcgYW5kICQxJykuc3BsaXQoJyAgJykuam9pbignICcpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWN0aXZpdHlDb21wb25lbnRcIiAqbmdJZj1cImlzQWN0aXZpdHlFbmFibGVkKClcIj5cbiAgPGRpdiAqbmdJZj1cImRpc3BsYXlNb2RlID09PSBkc3BNb2RlLklDT04gJiYgZWRpdG9yc1ByZXNlbnQoKVwiIFtjbGFzcy5hY3Rpdml0eUVkaXRvcnNBbmRWaWV3ZXJzSWNvbnNdPVwidmlld2Vyc1ByZXNlbnQoKVwiIFtjbGFzcy5hY3Rpdml0eUVkaXRvcnNJY29uXT1cIiF2aWV3ZXJzUHJlc2VudCgpXCI+XG4gICAgPGNjZC1hY3Rpdml0eS1pY29uIGltYWdlTGluaz1cIi9pbWcvZWRpdG9yLnBuZ1wiIFtkZXNjcmlwdGlvbl09XCJlZGl0b3JzVGV4dCB8IHJweFRyYW5zbGF0ZVwiPjwvY2NkLWFjdGl2aXR5LWljb24+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwiZGlzcGxheU1vZGUgPT09IGRzcE1vZGUuSUNPTiAmJiB2aWV3ZXJzUHJlc2VudCgpXCIgY2xhc3M9XCJhY3Rpdml0eVZpZXdlcnNJY29uXCI+XG4gICAgPGNjZC1hY3Rpdml0eS1pY29uIGltYWdlTGluaz1cIi9pbWcvdmlld2VyLnBuZ1wiIFtkZXNjcmlwdGlvbl09XCJ2aWV3ZXJzVGV4dCB8IHJweFRyYW5zbGF0ZVwiPjwvY2NkLWFjdGl2aXR5LWljb24+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwiZGlzcGxheU1vZGUgPT09IGRzcE1vZGUuQkFOTkVSICYmIGVkaXRvcnNQcmVzZW50KClcIj5cbiAgICA8Y2NkLWFjdGl2aXR5LWJhbm5lciBpbWFnZUxpbms9XCIvaW1nL2VkaXRvckJhbm5lci5wbmdcIiBbZGVzY3JpcHRpb25dPVwiZWRpdG9yc1RleHQgfCBycHhUcmFuc2xhdGVcIiBiYW5uZXJUeXBlPVwiZWRpdG9yXCI+XG4gICAgPC9jY2QtYWN0aXZpdHktYmFubmVyPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cImRpc3BsYXlNb2RlID09PSBkc3BNb2RlLkJBTk5FUiAmJiB2aWV3ZXJzUHJlc2VudCgpXCI+XG4gICAgPGNjZC1hY3Rpdml0eS1iYW5uZXIgaW1hZ2VMaW5rPVwiL2ltZy92aWV3ZXJCYW5uZXIucG5nXCIgW2Rlc2NyaXB0aW9uXT1cInZpZXdlcnNUZXh0IHwgcnB4VHJhbnNsYXRlXCIgYmFubmVyVHlwZT1cInZpZXdlclwiPlxuICAgIDwvY2NkLWFjdGl2aXR5LWJhbm5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==