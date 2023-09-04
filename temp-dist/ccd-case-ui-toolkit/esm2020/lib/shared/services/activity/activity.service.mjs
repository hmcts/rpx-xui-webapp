import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { HttpErrorService, HttpService } from '../http';
import { SessionStorageService } from '../session';
import * as i0 from "@angular/core";
import * as i1 from "../http";
import * as i2 from "../../../app.config";
import * as i3 from "../session";
// @dynamic
export class ActivityService {
    constructor(http, appConfig, sessionStorageService) {
        this.http = http;
        this.appConfig = appConfig;
        this.sessionStorageService = sessionStorageService;
        this.userAuthorised = undefined;
    }
    static get ACTIVITY_VIEW() { return 'view'; }
    static get ACTIVITY_EDIT() { return 'edit'; }
    get isEnabled() {
        return this.activityUrl() && this.userAuthorised;
    }
    static handleHttpError(response) {
        const error = HttpErrorService.convertToHttpError(response);
        if (response?.status !== error.status) {
            error.status = response.status;
        }
        return error;
    }
    getOptions() {
        const userDetails = JSON.parse(this.sessionStorageService.getItem('userDetails'));
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', userDetails.token);
        return {
            headers,
            withCredentials: true,
            observe: 'body',
        };
    }
    getActivities(...caseId) {
        try {
            const options = this.getOptions();
            const url = `${this.activityUrl()}/cases/${caseId.join(',')}/activity`;
            return this.http
                .get(url, options, false, ActivityService.handleHttpError)
                .pipe(map(response => response));
        }
        catch (error) {
            console.log(`user may not be authenticated.${error}`);
        }
    }
    postActivity(caseId, activity) {
        try {
            const options = this.getOptions();
            const url = `${this.activityUrl()}/cases/${caseId}/activity`;
            const body = { activity };
            return this.http
                .post(url, body, options, false)
                .pipe(map(response => response));
        }
        catch (error) {
            console.log(`user may not be authenticated.${error}`);
        }
    }
    verifyUserIsAuthorized() {
        if (this.sessionStorageService.getItem('userDetails') && this.activityUrl() && this.userAuthorised === undefined) {
            this.getActivities(ActivityService.DUMMY_CASE_REFERENCE).subscribe(() => this.userAuthorised = true, error => {
                this.userAuthorised = [401, 403].indexOf(error.status) <= -1;
            });
        }
    }
    activityUrl() {
        return this.appConfig.getActivityUrl();
    }
}
ActivityService.DUMMY_CASE_REFERENCE = '0';
ActivityService.ɵfac = function ActivityService_Factory(t) { return new (t || ActivityService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig), i0.ɵɵinject(i3.SessionStorageService)); };
ActivityService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ActivityService, factory: ActivityService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }, { type: i3.SessionStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvYWN0aXZpdHkvYWN0aXZpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXFCLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQWUsTUFBTSxTQUFTLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sWUFBWSxDQUFDOzs7OztBQUVuRCxXQUFXO0FBRVgsTUFBTSxPQUFPLGVBQWU7SUFJMUIsWUFDbUIsSUFBaUIsRUFDakIsU0FBNEIsRUFDNUIscUJBQTRDO1FBRjVDLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBbUI7UUFDNUIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQVF2RCxtQkFBYyxHQUFZLFNBQVMsQ0FBQztJQVB6QyxDQUFDO0lBUEcsTUFBTSxLQUFLLGFBQWEsS0FBSyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLGFBQWEsS0FBSyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFRcEQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDbkQsQ0FBQztJQUtPLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBMkI7UUFDeEQsTUFBTSxLQUFLLEdB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Q0FBQzs7QUFoRXNCLG9DQUFvQixHQUFHLEdBQUcsQ0FBQzs4RUFidkMsZUFBZTtxRUFBZixlQUFlLFdBQWYsZUFBZTt1RkFBZixlQUFlO2NBRDNCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBBY3Rpdml0eSB9IGZyb20gJy4uLy4uL2RvbWFpbi9hY3Rpdml0eS9hY3Rpdml0eS5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi9kb21haW4vaHR0cC9odHRwLWVycm9yLm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UsIEh0dHBTZXJ2aWNlLCBPcHRpb25zVHlwZSB9IGZyb20gJy4uL2h0dHAnO1xuaW1wb3J0IHsgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbic7XG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlTZXJ2aWNlIHtcbiAgcHVibGljIHN0YXRpYyBnZXQgQUNUSVZJVFlfVklFVygpIHsgcmV0dXJuICd2aWV3JzsgfVxuICBwdWJsaWMgc3RhdGljIGdldCBBQ1RJVklUWV9FRElUKCkgeyByZXR1cm4gJ2VkaXQnOyB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBodHRwOiBIdHRwU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcsXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXNzaW9uU3RvcmFnZVNlcnZpY2U6IFNlc3Npb25TdG9yYWdlU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIGdldCBpc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZpdHlVcmwoKSAmJiB0aGlzLnVzZXJBdXRob3Jpc2VkO1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRFVNTVlfQ0FTRV9SRUZFUkVOQ0UgPSAnMCc7XG5cbiAgcHJpdmF0ZSB1c2VyQXV0aG9yaXNlZDogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHN0YXRpYyBoYW5kbGVIdHRwRXJyb3IocmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogSHR0cEVycm9yIHtcbiAgICBjb25zdCBlcnJvcjogSHR0cEVycm9yID0gSHR0cEVycm9yU2VydmljZS5jb252ZXJ0VG9IdHRwRXJyb3IocmVzcG9uc2UpO1xuICAgIGlmIChyZXNwb25zZT8uc3RhdHVzICE9PSBlcnJvci5zdGF0dXMpIHtcbiAgICAgIGVycm9yLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG5cbiAgcHVibGljIGdldE9wdGlvbnMoKTogT3B0aW9uc1R5cGUge1xuICAgIGNvbnN0IHVzZXJEZXRhaWxzID0gSlNPTi5wYXJzZSh0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5nZXRJdGVtKCd1c2VyRGV0YWlscycpKTtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpLnNldCgnQXV0aG9yaXphdGlvbicsIHVzZXJEZXRhaWxzLnRva2VuKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGVhZGVycyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIG9ic2VydmU6ICdib2R5JyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2aXRpZXMoLi4uY2FzZUlkOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QWN0aXZpdHlbXT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFjdGl2aXR5VXJsKCl9L2Nhc2VzLyR7Y2FzZUlkLmpvaW4oJywnKX0vYWN0aXZpdHlgO1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAuZ2V0KHVybCwgb3B0aW9ucywgZmFsc2UsIEFjdGl2aXR5U2VydmljZS5oYW5kbGVIdHRwRXJyb3IpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChyZXNwb25zZSA9PiByZXNwb25zZSlcbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coYHVzZXIgbWF5IG5vdCBiZSBhdXRoZW50aWNhdGVkLiR7ZXJyb3J9YCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHBvc3RBY3Rpdml0eShjYXNlSWQ6IHN0cmluZywgYWN0aXZpdHk6IHN0cmluZyk6IE9ic2VydmFibGU8QWN0aXZpdHlbXT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFjdGl2aXR5VXJsKCl9L2Nhc2VzLyR7Y2FzZUlkfS9hY3Rpdml0eWA7XG4gICAgICBjb25zdCBib2R5ID0geyBhY3Rpdml0eSB9O1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAucG9zdCh1cmwsIGJvZHksIG9wdGlvbnMsIGZhbHNlKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UpXG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGB1c2VyIG1heSBub3QgYmUgYXV0aGVudGljYXRlZC4ke2Vycm9yfWApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB2ZXJpZnlVc2VySXNBdXRob3JpemVkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5nZXRJdGVtKCd1c2VyRGV0YWlscycpICYmIHRoaXMuYWN0aXZpdHlVcmwoKSAmJiB0aGlzLnVzZXJBdXRob3Jpc2VkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZ2V0QWN0aXZpdGllcyhBY3Rpdml0eVNlcnZpY2UuRFVNTVlfQ0FTRV9SRUZFUkVOQ0UpLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy51c2VyQXV0aG9yaXNlZCA9IHRydWUsXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLnVzZXJBdXRob3Jpc2VkID0gWzQwMSwgNDAzXS5pbmRleE9mKGVycm9yLnN0YXR1cykgPD0gLTE7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhY3Rpdml0eVVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFwcENvbmZpZy5nZXRBY3Rpdml0eVVybCgpO1xuICB9XG59XG4iXX0=