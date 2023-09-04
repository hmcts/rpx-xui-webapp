import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../../../services/alert/alert.service';
import { ProfileNotifier } from '../../../services/profile/profile.notifier';
import { ProfileService } from '../../../services/profile/profile.service';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
import * as i1 from "../../case-editor/services/cases.service";
import * as i2 from "../../../services/alert/alert.service";
import * as i3 from "../../../services/profile/profile.service";
import * as i4 from "../../../services/profile/profile.notifier";
export class EventTriggerResolver {
    constructor(casesService, alertService, profileService, profileNotifier) {
        this.casesService = casesService;
        this.alertService = alertService;
        this.profileService = profileService;
        this.profileNotifier = profileNotifier;
    }
    resolve(route) {
        return this.isRootTriggerEventRoute(route) ? this.getAndCacheEventTrigger(route)
            : this.cachedEventTrigger ? Promise.resolve(this.cachedEventTrigger)
                : this.getAndCacheEventTrigger(route);
    }
    isRootTriggerEventRoute(route) {
        // if route is 'trigger/:eid'
        return !route.firstChild || !route.firstChild.url.length;
    }
    getAndCacheEventTrigger(route) {
        const cid = route.parent.paramMap.get(EventTriggerResolver.PARAM_CASE_ID);
        // tslint:disable-next-line: prefer-const
        let caseTypeId;
        const eventTriggerId = route.paramMap.get(EventTriggerResolver.PARAM_EVENT_ID);
        let ignoreWarning = route.queryParamMap.get(EventTriggerResolver.IGNORE_WARNING);
        if (-1 === EventTriggerResolver.IGNORE_WARNING_VALUES.indexOf(ignoreWarning)) {
            ignoreWarning = 'false';
        }
        if (this.cachedProfile) {
            this.profileNotifier.announceProfile(this.cachedProfile);
        }
        else {
            this.profileService.get().subscribe(profile => {
                this.cachedProfile = profile;
                this.profileNotifier.announceProfile(profile);
            });
        }
        return this.casesService
            .getEventTrigger(caseTypeId, eventTriggerId, cid, ignoreWarning)
            .pipe(map(eventTrigger => this.cachedEventTrigger = eventTrigger), catchError(error => {
            this.alertService.error(error.message);
            return throwError(error);
        })).toPromise();
    }
}
EventTriggerResolver.PARAM_CASE_ID = 'cid';
EventTriggerResolver.PARAM_EVENT_ID = 'eid';
EventTriggerResolver.IGNORE_WARNING = 'ignoreWarning';
EventTriggerResolver.IGNORE_WARNING_VALUES = ['true', 'false'];
EventTriggerResolver.ɵfac = function EventTriggerResolver_Factory(t) { return new (t || EventTriggerResolver)(i0.ɵɵinject(i1.CasesService), i0.ɵɵinject(i2.AlertService), i0.ɵɵinject(i3.ProfileService), i0.ɵɵinject(i4.ProfileNotifier)); };
EventTriggerResolver.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EventTriggerResolver, factory: EventTriggerResolver.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventTriggerResolver, [{
        type: Injectable
    }], function () { return [{ type: i1.CasesService }, { type: i2.AlertService }, { type: i3.ProfileService }, { type: i4.ProfileNotifier }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdHJpZ2dlci5yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9zZXJ2aWNlcy9ldmVudC10cmlnZ2VyLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7O0FBR3hFLE1BQU0sT0FBTyxvQkFBb0I7SUFPL0IsWUFDbUIsWUFBMEIsRUFDMUIsWUFBMEIsRUFDMUIsY0FBOEIsRUFDOUIsZUFBZ0M7UUFIaEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUM5QyxDQUFDO0lBRUMsT0FBTyxDQUFDLEtBQTZCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxLQUE2QjtRQUMzRCw2QkFBNkI7UUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDM0QsQ0FBQztJQUVPLHVCQUF1QixDQUFDLEtBQTZCO1FBQzNELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRSx5Q0FBeUM7UUFDekMsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9FLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxDQUFDLEtBQUssb0JBQW9CLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzVFLGFBQWEsR0FBRyxPQUFPLENBQUM7U0FDekI7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFEO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZO2FBQ3JCLGVBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUM7YUFDL0QsSUFBSSxDQUNILEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUMsRUFDM0QsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7O0FBcERzQixrQ0FBYSxHQUFHLEtBQUssQ0FBQztBQUN0QixtQ0FBYyxHQUFHLEtBQUssQ0FBQztBQUN2QixtQ0FBYyxHQUFHLGVBQWUsQ0FBQztBQUNoQywwQ0FBcUIsR0FBRyxDQUFFLE1BQU0sRUFBRSxPQUFPLENBQUUsQ0FBQzt3RkFKekQsb0JBQW9COzBFQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CO3VGQUFwQixvQkFBb0I7Y0FEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJlc29sdmUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FzZUV2ZW50VHJpZ2dlciB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS1ldmVudC10cmlnZ2VyLm1vZGVsJztcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vcHJvZmlsZS9wcm9maWxlLm1vZGVsJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FsZXJ0L2FsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZmlsZU5vdGlmaWVyIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHJvZmlsZS9wcm9maWxlLm5vdGlmaWVyJztcbmltcG9ydCB7IFByb2ZpbGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHJvZmlsZS9wcm9maWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY2FzZS1lZGl0b3Ivc2VydmljZXMvY2FzZXMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudFRyaWdnZXJSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8Q2FzZUV2ZW50VHJpZ2dlcj4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBBUkFNX0NBU0VfSUQgPSAnY2lkJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQQVJBTV9FVkVOVF9JRCA9ICdlaWQnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElHTk9SRV9XQVJOSU5HID0gJ2lnbm9yZVdhcm5pbmcnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJR05PUkVfV0FSTklOR19WQUxVRVMgPSBbICd0cnVlJywgJ2ZhbHNlJyBdO1xuICBwcml2YXRlIGNhY2hlZEV2ZW50VHJpZ2dlcjogQ2FzZUV2ZW50VHJpZ2dlcjtcbiAgcHJpdmF0ZSBjYWNoZWRQcm9maWxlOiBQcm9maWxlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VzU2VydmljZTogQ2FzZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9maWxlTm90aWZpZXI6IFByb2ZpbGVOb3RpZmllcixcbiAgICApIHt9XG5cbiAgcHVibGljIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBQcm9taXNlPENhc2VFdmVudFRyaWdnZXI+IHtcbiAgICByZXR1cm4gdGhpcy5pc1Jvb3RUcmlnZ2VyRXZlbnRSb3V0ZShyb3V0ZSkgPyB0aGlzLmdldEFuZENhY2hlRXZlbnRUcmlnZ2VyKHJvdXRlKVxuICAgICAgICA6IHRoaXMuY2FjaGVkRXZlbnRUcmlnZ2VyID8gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY2FjaGVkRXZlbnRUcmlnZ2VyKVxuICAgICAgICA6IHRoaXMuZ2V0QW5kQ2FjaGVFdmVudFRyaWdnZXIocm91dGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Jvb3RUcmlnZ2VyRXZlbnRSb3V0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge1xuICAgIC8vIGlmIHJvdXRlIGlzICd0cmlnZ2VyLzplaWQnXG4gICAgcmV0dXJuICFyb3V0ZS5maXJzdENoaWxkIHx8ICFyb3V0ZS5maXJzdENoaWxkLnVybC5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIGdldEFuZENhY2hlRXZlbnRUcmlnZ2VyKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogUHJvbWlzZTxDYXNlRXZlbnRUcmlnZ2VyPiB7XG4gICAgY29uc3QgY2lkID0gcm91dGUucGFyZW50LnBhcmFtTWFwLmdldChFdmVudFRyaWdnZXJSZXNvbHZlci5QQVJBTV9DQVNFX0lEKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1jb25zdFxuICAgIGxldCBjYXNlVHlwZUlkOiBzdHJpbmc7XG4gICAgY29uc3QgZXZlbnRUcmlnZ2VySWQgPSByb3V0ZS5wYXJhbU1hcC5nZXQoRXZlbnRUcmlnZ2VyUmVzb2x2ZXIuUEFSQU1fRVZFTlRfSUQpO1xuICAgIGxldCBpZ25vcmVXYXJuaW5nID0gcm91dGUucXVlcnlQYXJhbU1hcC5nZXQoRXZlbnRUcmlnZ2VyUmVzb2x2ZXIuSUdOT1JFX1dBUk5JTkcpO1xuICAgIGlmICgtMSA9PT0gRXZlbnRUcmlnZ2VyUmVzb2x2ZXIuSUdOT1JFX1dBUk5JTkdfVkFMVUVTLmluZGV4T2YoaWdub3JlV2FybmluZykpIHtcbiAgICAgIGlnbm9yZVdhcm5pbmcgPSAnZmFsc2UnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhY2hlZFByb2ZpbGUpIHtcbiAgICAgIHRoaXMucHJvZmlsZU5vdGlmaWVyLmFubm91bmNlUHJvZmlsZSh0aGlzLmNhY2hlZFByb2ZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldCgpLnN1YnNjcmliZShwcm9maWxlID0+IHtcbiAgICAgICAgdGhpcy5jYWNoZWRQcm9maWxlID0gcHJvZmlsZTtcbiAgICAgICAgdGhpcy5wcm9maWxlTm90aWZpZXIuYW5ub3VuY2VQcm9maWxlKHByb2ZpbGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FzZXNTZXJ2aWNlXG4gICAgICAuZ2V0RXZlbnRUcmlnZ2VyKGNhc2VUeXBlSWQsIGV2ZW50VHJpZ2dlcklkLCBjaWQsIGlnbm9yZVdhcm5pbmcpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGV2ZW50VHJpZ2dlciA9PiB0aGlzLmNhY2hlZEV2ZW50VHJpZ2dlciA9IGV2ZW50VHJpZ2dlciksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICkudG9Qcm9taXNlKCk7XG4gIH1cbn1cbiJdfQ==