import { Injectable, NgZone } from '@angular/core';
import polling from 'rx-polling';
import { EMPTY, Subject } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { ActivityService } from './activity.service';
import * as i0 from "@angular/core";
import * as i1 from "./activity.service";
import * as i2 from "../../../app.config";
// @dynamic
export class ActivityPollingService {
    constructor(activityService, ngZone, config) {
        this.activityService = activityService;
        this.ngZone = ngZone;
        this.config = config;
        this.pendingRequests = new Map();
        this.pollConfig = {
            interval: config.getActivityNexPollRequestMs(),
            attempts: config.getActivityRetry(),
            backgroundPolling: true
        };
        this.batchCollectionDelayMs = config.getActivityBatchCollectionDelayMs();
        this.maxRequestsPerBatch = config.getActivityMaxRequestPerBatch();
    }
    get isEnabled() {
        return this.activityService.isEnabled;
    }
    subscribeToActivity(caseId, done) {
        if (!this.isEnabled) {
            return new Subject();
        }
        let subject = this.pendingRequests.get(caseId);
        if (subject) {
            subject.subscribe(done);
        }
        else {
            subject = new Subject();
            subject.subscribe(done);
            this.pendingRequests.set(caseId, subject);
        }
        if (this.pendingRequests.size === 1) {
            this.ngZone.runOutsideAngular(() => {
                this.currentTimeoutHandle = setTimeout(() => this.ngZone.run(() => {
                    // console.log('timeout: flushing requests')
                    this.flushRequests();
                }), this.batchCollectionDelayMs);
            });
        }
        if (this.pendingRequests.size >= this.maxRequestsPerBatch) {
            // console.log('max pending hit: flushing requests');
            this.flushRequests();
        }
        return subject;
    }
    stopPolling() {
        if (this.pollActivitiesSubscription) {
            this.pollActivitiesSubscription.unsubscribe();
        }
    }
    flushRequests() {
        if (this.currentTimeoutHandle) {
            clearTimeout(this.currentTimeoutHandle);
            this.currentTimeoutHandle = undefined;
        }
        const requests = new Map(this.pendingRequests);
        this.pendingRequests.clear();
        this.performBatchRequest(requests);
    }
    pollActivities(...caseIds) {
        if (!this.isEnabled) {
            return EMPTY;
        }
        return polling(this.activityService.getActivities(...caseIds), this.pollConfig);
    }
    postViewActivity(caseId) {
        return this.postActivity(caseId, ActivityService.ACTIVITY_VIEW);
    }
    postEditActivity(caseId) {
        return this.postActivity(caseId, ActivityService.ACTIVITY_EDIT);
    }
    performBatchRequest(requests) {
        const caseIds = Array.from(requests.keys()).join();
        // console.log('issuing batch request for cases: ' + caseIds);
        this.ngZone.runOutsideAngular(() => {
            // run polling outside angular zone so it does not trigger change detection
            this.pollActivitiesSubscription = this.pollActivities(caseIds).subscribe(
            // process activity inside zone so it triggers change detection for activity.component.ts
            (activities) => this.ngZone.run(() => {
                activities.forEach((activity) => {
                    // console.log('pushing activity: ' + activity.caseId);
                    requests.get(activity.caseId).next(activity);
                });
            }, (err) => {
                console.log(`error: ${err}`);
                Array.from(requests.values()).forEach((subject) => subject.error(err));
            }));
        });
    }
    postActivity(caseId, activityType) {
        if (!this.isEnabled) {
            return EMPTY;
        }
        const pollingConfig = {
            ...this.pollConfig,
            interval: 5000 // inline with CCD Backend
        };
        return polling(this.activityService.postActivity(caseId, activityType), pollingConfig);
    }
}
ActivityPollingService.ɵfac = function ActivityPollingService_Factory(t) { return new (t || ActivityPollingService)(i0.ɵɵinject(i1.ActivityService), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.AbstractAppConfig)); };
ActivityPollingService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ActivityPollingService, factory: ActivityPollingService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityPollingService, [{
        type: Injectable
    }], function () { return [{ type: i1.ActivityService }, { type: i0.NgZone }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkucG9sbGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpdml0eS9hY3Rpdml0eS5wb2xsaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxPQUFxQixNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBRXJELFdBQVc7QUFFWCxNQUFNLE9BQU8sc0JBQXNCO0lBUWpDLFlBQTZCLGVBQWdDLEVBQW1CLE1BQWMsRUFBbUIsTUFBeUI7UUFBN0csb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQW1CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBbUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFQekgsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztRQVF0RSxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsMkJBQTJCLEVBQUU7WUFDOUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUNuQyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFDRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFDekUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO0lBQ3BFLENBQUM7SUFFRCxJQUFXLFNB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RUFBRSxhQUFhLENBQUMsQ0FBQztJQUN6RixDQUFDOzs0RkF2SFUsc0JBQXNCOzRFQUF0QixzQkFBc0IsV0FBdEIsc0JBQXNCO3VGQUF0QixzQkFBc0I7Y0FEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHBvbGxpbmcsIHsgSU9wdGlvbnMgfSBmcm9tICdyeC1wb2xsaW5nJztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBBY3Rpdml0eSB9IGZyb20gJy4uLy4uL2RvbWFpbi9hY3Rpdml0eS9hY3Rpdml0eS5tb2RlbCc7XG5pbXBvcnQgeyBBY3Rpdml0eVNlcnZpY2UgfSBmcm9tICcuL2FjdGl2aXR5LnNlcnZpY2UnO1xuXG4vLyBAZHluYW1pY1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5UG9sbGluZ1NlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IHBlbmRpbmdSZXF1ZXN0cyA9IG5ldyBNYXA8c3RyaW5nLCBTdWJqZWN0PEFjdGl2aXR5Pj4oKTtcbiAgcHJpdmF0ZSBjdXJyZW50VGltZW91dEhhbmRsZTogYW55O1xuICBwcml2YXRlIHBvbGxBY3Rpdml0aWVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcmVhZG9ubHkgcG9sbENvbmZpZzogSU9wdGlvbnM7XG4gIHByaXZhdGUgcmVhZG9ubHkgYmF0Y2hDb2xsZWN0aW9uRGVsYXlNczogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IG1heFJlcXVlc3RzUGVyQmF0Y2g6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLCBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogQWJzdHJhY3RBcHBDb25maWcpIHtcbiAgICB0aGlzLnBvbGxDb25maWcgPSB7XG4gICAgICBpbnRlcnZhbDogY29uZmlnLmdldEFjdGl2aXR5TmV4UG9sbFJlcXVlc3RNcygpLFxuICAgICAgYXR0ZW1wdHM6IGNvbmZpZy5nZXRBY3Rpdml0eVJldHJ5KCksXG4gICAgICBiYWNrZ3JvdW5kUG9sbGluZzogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5iYXRjaENvbGxlY3Rpb25EZWxheU1zID0gY29uZmlnLmdldEFjdGl2aXR5QmF0Y2hDb2xsZWN0aW9uRGVsYXlNcygpO1xuICAgIHRoaXMubWF4UmVxdWVzdHNQZXJCYXRjaCA9IGNvbmZpZy5nZXRBY3Rpdml0eU1heFJlcXVlc3RQZXJCYXRjaCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZpdHlTZXJ2aWNlLmlzRW5hYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmVUb0FjdGl2aXR5KGNhc2VJZDogc3RyaW5nLCBkb25lOiAoYWN0aXZpdHk6IEFjdGl2aXR5KSA9PiB2b2lkKTogU3ViamVjdDxBY3Rpdml0eT4ge1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybiBuZXcgU3ViamVjdDxBY3Rpdml0eT4oKTtcbiAgICB9XG5cbiAgICBsZXQgc3ViamVjdCA9IHRoaXMucGVuZGluZ1JlcXVlc3RzLmdldChjYXNlSWQpO1xuICAgIGlmIChzdWJqZWN0KSB7XG4gICAgICBzdWJqZWN0LnN1YnNjcmliZShkb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3ViamVjdCA9IG5ldyBTdWJqZWN0PEFjdGl2aXR5PigpO1xuICAgICAgc3ViamVjdC5zdWJzY3JpYmUoZG9uZSk7XG4gICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0cy5zZXQoY2FzZUlkLCBzdWJqZWN0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGVuZGluZ1JlcXVlc3RzLnNpemUgPT09IDEpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgKCkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aW1lb3V0OiBmbHVzaGluZyByZXF1ZXN0cycpXG4gICAgICAgICAgICB0aGlzLmZsdXNoUmVxdWVzdHMoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0aGlzLmJhdGNoQ29sbGVjdGlvbkRlbGF5TXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGVuZGluZ1JlcXVlc3RzLnNpemUgPj0gdGhpcy5tYXhSZXF1ZXN0c1BlckJhdGNoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbWF4IHBlbmRpbmcgaGl0OiBmbHVzaGluZyByZXF1ZXN0cycpO1xuICAgICAgdGhpcy5mbHVzaFJlcXVlc3RzKCk7XG4gICAgfVxuICAgIHJldHVybiBzdWJqZWN0O1xuICB9XG5cbiAgcHVibGljIHN0b3BQb2xsaW5nKCkge1xuICAgIGlmICh0aGlzLnBvbGxBY3Rpdml0aWVzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnBvbGxBY3Rpdml0aWVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGZsdXNoUmVxdWVzdHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFRpbWVvdXRIYW5kbGUpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmN1cnJlbnRUaW1lb3V0SGFuZGxlKTtcbiAgICAgIHRoaXMuY3VycmVudFRpbWVvdXRIYW5kbGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdHMgPSBuZXcgTWFwKHRoaXMucGVuZGluZ1JlcXVlc3RzKTtcbiAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0cy5jbGVhcigpO1xuICAgIHRoaXMucGVyZm9ybUJhdGNoUmVxdWVzdChyZXF1ZXN0cyk7XG4gIH1cblxuICBwdWJsaWMgcG9sbEFjdGl2aXRpZXMoLi4uY2FzZUlkczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEFjdGl2aXR5W10+IHtcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKSB7XG4gICAgICByZXR1cm4gRU1QVFk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvbGxpbmcodGhpcy5hY3Rpdml0eVNlcnZpY2UuZ2V0QWN0aXZpdGllcyguLi5jYXNlSWRzKSwgdGhpcy5wb2xsQ29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBwb3N0Vmlld0FjdGl2aXR5KGNhc2VJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBY3Rpdml0eVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucG9zdEFjdGl2aXR5KGNhc2VJZCwgQWN0aXZpdHlTZXJ2aWNlLkFDVElWSVRZX1ZJRVcpO1xuICB9XG5cbiAgcHVibGljIHBvc3RFZGl0QWN0aXZpdHkoY2FzZUlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFjdGl2aXR5W10+IHtcbiAgICByZXR1cm4gdGhpcy5wb3N0QWN0aXZpdHkoY2FzZUlkLCBBY3Rpdml0eVNlcnZpY2UuQUNUSVZJVFlfRURJVCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGVyZm9ybUJhdGNoUmVxdWVzdChyZXF1ZXN0czogTWFwPHN0cmluZywgU3ViamVjdDxBY3Rpdml0eT4+KTogdm9pZCB7XG4gICAgY29uc3QgY2FzZUlkcyA9IEFycmF5LmZyb20ocmVxdWVzdHMua2V5cygpKS5qb2luKCk7XG4gICAgLy8gY29uc29sZS5sb2coJ2lzc3VpbmcgYmF0Y2ggcmVxdWVzdCBmb3IgY2FzZXM6ICcgKyBjYXNlSWRzKTtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4ge1xuICAgICAgLy8gcnVuIHBvbGxpbmcgb3V0c2lkZSBhbmd1bGFyIHpvbmUgc28gaXQgZG9lcyBub3QgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgICB0aGlzLnBvbGxBY3Rpdml0aWVzU3Vic2NyaXB0aW9uID0gdGhpcy5wb2xsQWN0aXZpdGllcyhjYXNlSWRzKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgIC8vIHByb2Nlc3MgYWN0aXZpdHkgaW5zaWRlIHpvbmUgc28gaXQgdHJpZ2dlcnMgY2hhbmdlIGRldGVjdGlvbiBmb3IgYWN0aXZpdHkuY29tcG9uZW50LnRzXG4gICAgICAgIChhY3Rpdml0aWVzOiBBY3Rpdml0eVtdKSA9PiB0aGlzLm5nWm9uZS5ydW4oICgpID0+IHtcbiAgICAgICAgICAgIGFjdGl2aXRpZXMuZm9yRWFjaCgoYWN0aXZpdHkpID0+IHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3B1c2hpbmcgYWN0aXZpdHk6ICcgKyBhY3Rpdml0eS5jYXNlSWQpO1xuICAgICAgICAgICAgICByZXF1ZXN0cy5nZXQoYWN0aXZpdHkuY2FzZUlkKS5uZXh0KGFjdGl2aXR5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGVycm9yOiAke2Vycn1gKTtcbiAgICAgICAgICAgIEFycmF5LmZyb20ocmVxdWVzdHMudmFsdWVzKCkpLmZvckVhY2goKHN1YmplY3QpID0+IHN1YmplY3QuZXJyb3IoZXJyKSk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0QWN0aXZpdHkoY2FzZUlkOiBzdHJpbmcsIGFjdGl2aXR5VHlwZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBY3Rpdml0eVtdPiB7XG4gICAgaWYgKCF0aGlzLmlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuIEVNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IHBvbGxpbmdDb25maWcgPSB7XG4gICAgICAuLi50aGlzLnBvbGxDb25maWcsXG4gICAgICBpbnRlcnZhbDogNTAwMCAvLyBpbmxpbmUgd2l0aCBDQ0QgQmFja2VuZFxuICAgIH07XG5cbiAgICByZXR1cm4gcG9sbGluZyh0aGlzLmFjdGl2aXR5U2VydmljZS5wb3N0QWN0aXZpdHkoY2FzZUlkLCBhY3Rpdml0eVR5cGUpLCBwb2xsaW5nQ29uZmlnKTtcbiAgfVxufVxuIl19