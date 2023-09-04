import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { plainToClassFromExist } from 'class-transformer';
import { of, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { CaseView, Draft } from '../../../domain';
import { DraftService, NavigationOrigin, SessionStorageService } from '../../../services';
import { NavigationNotifierService } from '../../../services/navigation/navigation-notifier.service';
import { CaseNotifier } from '../../case-editor';
import * as i0 from "@angular/core";
import * as i1 from "../../case-editor";
import * as i2 from "../../../services";
import * as i3 from "../../../services/navigation/navigation-notifier.service";
import * as i4 from "@angular/router";
export class CaseResolver {
    constructor(caseNotifier, draftService, navigationNotifierService, router, sessionStorage) {
        this.caseNotifier = caseNotifier;
        this.draftService = draftService;
        this.navigationNotifierService = navigationNotifierService;
        this.router = router;
        this.sessionStorage = sessionStorage;
        router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event) => {
            this.previousUrl = event.url;
        });
    }
    resolve(route) {
        const cid = route.paramMap.get(CaseResolver.PARAM_CASE_ID);
        if (!cid) {
            console.info('No case ID available in the route. Will navigate to case list.');
            // when redirected to case view after a case created, and the user has no READ access,
            // the post returns no id
            this.navigateToCaseList();
        }
        else {
            return this.isRootCaseViewRoute(route) ? this.getAndCacheCaseView(cid)
                : this.caseNotifier.cachedCaseView ? Promise.resolve(this.caseNotifier.cachedCaseView)
                    : this.getAndCacheCaseView(cid);
        }
    }
    navigateToCaseList() {
        this.navigationNotifierService.announceNavigation({ action: NavigationOrigin.NO_READ_ACCESS_REDIRECTION });
    }
    isRootCaseViewRoute(route) {
        // is route case/:jid/:ctid/:cid
        return ((!route.firstChild || !route.firstChild.url.length) && !this.isTabViewRoute(route));
    }
    isTabViewRoute(route) {
        // is route case/:jid/:ctid/:cid#fragment
        return route.firstChild && route.firstChild.fragment;
    }
    getAndCacheCaseView(cid) {
        console.info('getAndCacheCaseView started.');
        if (this.caseNotifier.cachedCaseView && this.caseNotifier.cachedCaseView.case_id && this.caseNotifier.cachedCaseView.case_id === cid) {
            this.caseNotifier.announceCase(this.caseNotifier.cachedCaseView);
            console.info('getAndCacheCaseView - Path A.');
            return of(this.caseNotifier.cachedCaseView).toPromise();
        }
        else {
            if (Draft.isDraft(cid)) {
                return this.getAndCacheDraft(cid);
            }
            else {
                console.info('getAndCacheCaseView - Path B.');
                return this.caseNotifier.fetchAndRefresh(cid)
                    .pipe(catchError(error => this.processErrorInCaseFetch(error)))
                    .toPromise();
            }
        }
    }
    getAndCacheDraft(cid) {
        return this.draftService
            .getDraft(cid)
            .pipe(map(caseView => {
            this.caseNotifier.cachedCaseView = plainToClassFromExist(new CaseView(), caseView);
            this.caseNotifier.announceCase(this.caseNotifier.cachedCaseView);
            return this.caseNotifier.cachedCaseView;
        }), catchError(error => this.processErrorInCaseFetch(error))).toPromise();
    }
    processErrorInCaseFetch(error) {
        console.error('!!! processErrorInCaseFetch !!!');
        console.error(error);
        // TODO Should be logged to remote logging infrastructure
        if (error.status === 400) {
            this.router.navigate(['/search/noresults']);
            return of(null);
        }
        console.error(error);
        if (CaseResolver.EVENT_REGEX.test(this.previousUrl) && error.status === 404) {
            this.router.navigate(['/list/case']);
            return of(null);
        }
        if (error.status !== 401 && error.status !== 403) {
            this.router.navigate(['/error']);
        }
        this.goToDefaultPage();
        return throwError(error);
    }
    // as discussed for EUI-5456, need functionality to go to default page
    goToDefaultPage() {
        console.info('Going to default page!');
        const userDetails = JSON.parse(this.sessionStorage.getItem('userDetails'));
        userDetails && userDetails.roles
            && !userDetails.roles.includes('pui-case-manager')
            &&
                (userDetails.roles.includes('caseworker-ia-iacjudge')
                    || userDetails.roles.includes('caseworker-ia-caseofficer')
                    || userDetails.roles.includes('caseworker-ia-admofficer')
                    || userDetails.roles.includes('caseworker-civil')
                    || userDetails.roles.includes('caseworker-privatelaw'))
            ? this.router.navigate([CaseResolver.defaultWAPage]) : this.router.navigate([CaseResolver.defaultPage]);
    }
}
CaseResolver.EVENT_REGEX = new RegExp('\/trigger\/.*?\/submit$');
CaseResolver.PARAM_CASE_ID = 'cid';
CaseResolver.CASE_CREATED_MSG = 'The case has been created successfully';
CaseResolver.defaultWAPage = '/work/my-work/list';
CaseResolver.defaultPage = '/cases';
CaseResolver.ɵfac = function CaseResolver_Factory(t) { return new (t || CaseResolver)(i0.ɵɵinject(i1.CaseNotifier), i0.ɵɵinject(i2.DraftService), i0.ɵɵinject(i3.NavigationNotifierService), i0.ɵɵinject(i4.Router), i0.ɵɵinject(i2.SessionStorageService)); };
CaseResolver.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseResolver, factory: CaseResolver.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseResolver, [{
        type: Injectable
    }], function () { return [{ type: i1.CaseNotifier }, { type: i2.DraftService }, { type: i3.NavigationNotifierService }, { type: i4.Router }, { type: i2.SessionStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS5yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9zZXJ2aWNlcy9jYXNlLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUEwQixhQUFhLEVBQVcsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDckcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFHakQsTUFBTSxPQUFPLFlBQVk7SUFXdkIsWUFBb0IsWUFBMEIsRUFDMUIsWUFBMEIsRUFDMUIseUJBQW9ELEVBQ3BELE1BQWMsRUFDZCxjQUFxQztRQUpyQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7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LENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDOztBQWxIc0Isd0JBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3BELDBCQUFhLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLDZCQUFnQixHQUFHLHdDQUF3QyxDQUFDO0FBRXJFLDBCQUFhLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsd0JBQVcsR0FBRyxRQUFRLENBQUM7d0VBTjFCLFlBQVk7a0VBQVosWUFBWSxXQUFaLFlBQVk7dUZBQVosWUFBWTtjQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgTmF2aWdhdGlvbkVuZCwgUmVzb2x2ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2FzZVZpZXcsIERyYWZ0IH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IERyYWZ0U2VydmljZSwgTmF2aWdhdGlvbk9yaWdpbiwgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbk5vdGlmaWVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1ub3RpZmllci5zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VOb3RpZmllciB9IGZyb20gJy4uLy4uL2Nhc2UtZWRpdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhc2VSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8Q2FzZVZpZXc+IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVkVOVF9SRUdFWCA9IG5ldyBSZWdFeHAoJ1xcL3RyaWdnZXJcXC8uKj9cXC9zdWJtaXQkJyk7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUEFSQU1fQ0FTRV9JRCA9ICdjaWQnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENBU0VfQ1JFQVRFRF9NU0cgPSAnVGhlIGNhc2UgaGFzIGJlZW4gY3JlYXRlZCBzdWNjZXNzZnVsbHknO1xuXG4gIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFdBUGFnZSA9ICcvd29yay9teS13b3JrL2xpc3QnO1xuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQYWdlID0gJy9jYXNlcyc7XG4gIC8vIHdlIG5lZWQgdG8gcnVuIHRoZSBDYXNlUmVzb2x2ZXIgb24gZXZlcnkgY2hpbGQgcm91dGUgb2YgJ2Nhc2UvOmppZC86Y3RpZC86Y2lkJ1xuICAvLyB0aGlzIGlzIGFjaGlldmVkIHdpdGggcnVuR3VhcmRzQW5kUmVzb2x2ZXJzOiAnYWx3YXlzJyBjb25maWd1cmF0aW9uXG4gIC8vIHdlIGNhY2hlIHRoZSBjYXNlIHZpZXcgdG8gYXZvaWQgcmV0cmlldmluZyBpdCBmb3IgZWFjaCBjaGlsZCByb3V0ZVxuICBwdWJsaWMgcHJldmlvdXNVcmw6IHN0cmluZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXNlTm90aWZpZXI6IENhc2VOb3RpZmllcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkcmFmdFNlcnZpY2U6IERyYWZ0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlOiBOYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlc3Npb25TdG9yYWdlOiBTZXNzaW9uU3RvcmFnZVNlcnZpY2UpIHtcbiAgICByb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICB0aGlzLnByZXZpb3VzVXJsID0gZXZlbnQudXJsO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IFByb21pc2U8Q2FzZVZpZXc+IHtcbiAgICBjb25zdCBjaWQgPSByb3V0ZS5wYXJhbU1hcC5nZXQoQ2FzZVJlc29sdmVyLlBBUkFNX0NBU0VfSUQpO1xuXG4gICAgaWYgKCFjaWQpIHtcbiAgICAgIGNvbnNvbGUuaW5mbygnTm8gY2FzZSBJRCBhdmFpbGFibGUgaW4gdGhlIHJvdXRlLiBXaWxsIG5hdmlnYXRlIHRvIGNhc2UgbGlzdC4nKTtcbiAgICAgIC8vIHdoZW4gcmVkaXJlY3RlZCB0byBjYXNlIHZpZXcgYWZ0ZXIgYSBjYXNlIGNyZWF0ZWQsIGFuZCB0aGUgdXNlciBoYXMgbm8gUkVBRCBhY2Nlc3MsXG4gICAgICAvLyB0aGUgcG9zdCByZXR1cm5zIG5vIGlkXG4gICAgICB0aGlzLm5hdmlnYXRlVG9DYXNlTGlzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1Jvb3RDYXNlVmlld1JvdXRlKHJvdXRlKSA/IHRoaXMuZ2V0QW5kQ2FjaGVDYXNlVmlldyhjaWQpXG4gICAgICAgIDogdGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcgPyBQcm9taXNlLnJlc29sdmUodGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcpXG4gICAgICAgIDogdGhpcy5nZXRBbmRDYWNoZUNhc2VWaWV3KGNpZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBuYXZpZ2F0ZVRvQ2FzZUxpc3QoKSB7XG4gICAgdGhpcy5uYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLmFubm91bmNlTmF2aWdhdGlvbih7YWN0aW9uOiBOYXZpZ2F0aW9uT3JpZ2luLk5PX1JFQURfQUNDRVNTX1JFRElSRUNUSU9OfSk7XG4gIH1cblxuICBwcml2YXRlIGlzUm9vdENhc2VWaWV3Um91dGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpIHtcbiAgICAvLyBpcyByb3V0ZSBjYXNlLzpqaWQvOmN0aWQvOmNpZFxuICAgIHJldHVybiAoKCFyb3V0ZS5maXJzdENoaWxkIHx8ICFyb3V0ZS5maXJzdENoaWxkLnVybC5sZW5ndGgpICYmICF0aGlzLmlzVGFiVmlld1JvdXRlKHJvdXRlKSk7XG4gIH1cblxuICBwcml2YXRlIGlzVGFiVmlld1JvdXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7XG4gICAgLy8gaXMgcm91dGUgY2FzZS86amlkLzpjdGlkLzpjaWQjZnJhZ21lbnRcbiAgICByZXR1cm4gcm91dGUuZmlyc3RDaGlsZCAmJiByb3V0ZS5maXJzdENoaWxkLmZyYWdtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbmRDYWNoZUNhc2VWaWV3KGNpZCk6IFByb21pc2U8Q2FzZVZpZXc+IHtcbiAgICBjb25zb2xlLmluZm8oJ2dldEFuZENhY2hlQ2FzZVZpZXcgc3RhcnRlZC4nKTtcbiAgICBpZiAodGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcgJiYgdGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcuY2FzZV9pZCAmJiB0aGlzLmNhc2VOb3RpZmllci5jYWNoZWRDYXNlVmlldy5jYXNlX2lkID09PSBjaWQpIHtcbiAgICAgIHRoaXMuY2FzZU5vdGlmaWVyLmFubm91bmNlQ2FzZSh0aGlzLmNhc2VOb3RpZmllci5jYWNoZWRDYXNlVmlldyk7XG4gICAgICBjb25zb2xlLmluZm8oJ2dldEFuZENhY2hlQ2FzZVZpZXcgLSBQYXRoIEEuJyk7XG4gICAgICByZXR1cm4gb2YodGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcpLnRvUHJvbWlzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoRHJhZnQuaXNEcmFmdChjaWQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlRHJhZnQoY2lkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmluZm8oJ2dldEFuZENhY2hlQ2FzZVZpZXcgLSBQYXRoIEIuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmNhc2VOb3RpZmllci5mZXRjaEFuZFJlZnJlc2goY2lkKVxuICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoZXJyb3IgPT4gdGhpcy5wcm9jZXNzRXJyb3JJbkNhc2VGZXRjaChlcnJvcikpKVxuICAgICAgICAgIC50b1Byb21pc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFuZENhY2hlRHJhZnQoY2lkKTogUHJvbWlzZTxDYXNlVmlldz4ge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZnRTZXJ2aWNlXG4gICAgICAuZ2V0RHJhZnQoY2lkKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChjYXNlVmlldyA9PiB7XG4gICAgICAgICAgdGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcgPSBwbGFpblRvQ2xhc3NGcm9tRXhpc3QobmV3IENhc2VWaWV3KCksIGNhc2VWaWV3KTtcbiAgICAgICAgICB0aGlzLmNhc2VOb3RpZmllci5hbm5vdW5jZUNhc2UodGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmNhc2VOb3RpZmllci5jYWNoZWRDYXNlVmlldztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gdGhpcy5wcm9jZXNzRXJyb3JJbkNhc2VGZXRjaChlcnJvcikpXG4gICAgICApLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzRXJyb3JJbkNhc2VGZXRjaChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignISEhIHByb2Nlc3NFcnJvckluQ2FzZUZldGNoICEhIScpO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIC8vIFRPRE8gU2hvdWxkIGJlIGxvZ2dlZCB0byByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxuICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc2VhcmNoL25vcmVzdWx0cyddKTtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgaWYgKENhc2VSZXNvbHZlci5FVkVOVF9SRUdFWC50ZXN0KHRoaXMucHJldmlvdXNVcmwpICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0L2Nhc2UnXSk7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICAgIGlmIChlcnJvci5zdGF0dXMgIT09IDQwMSAmJiBlcnJvci5zdGF0dXMgIT09IDQwMykge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXJyb3InXSk7XG4gICAgfVxuICAgIHRoaXMuZ29Ub0RlZmF1bHRQYWdlKCk7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICB9XG5cbiAgLy8gYXMgZGlzY3Vzc2VkIGZvciBFVUktNTQ1NiwgbmVlZCBmdW5jdGlvbmFsaXR5IHRvIGdvIHRvIGRlZmF1bHQgcGFnZVxuICBwcml2YXRlIGdvVG9EZWZhdWx0UGFnZSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmluZm8oJ0dvaW5nIHRvIGRlZmF1bHQgcGFnZSEnKTtcbiAgICBjb25zdCB1c2VyRGV0YWlscyA9IEpTT04ucGFyc2UodGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyRGV0YWlscycpKTtcbiAgICB1c2VyRGV0YWlscyAmJiB1c2VyRGV0YWlscy5yb2xlc1xuICAgICAgICAmJiAhdXNlckRldGFpbHMucm9sZXMuaW5jbHVkZXMoJ3B1aS1jYXNlLW1hbmFnZXInKVxuICAgICAgICAmJlxuICAgICAgICAodXNlckRldGFpbHMucm9sZXMuaW5jbHVkZXMoJ2Nhc2V3b3JrZXItaWEtaWFjanVkZ2UnKVxuICAgICAgICAgIHx8IHVzZXJEZXRhaWxzLnJvbGVzLmluY2x1ZGVzKCdjYXNld29ya2VyLWlhLWNhc2VvZmZpY2VyJylcbiAgICAgICAgICB8fCB1c2VyRGV0YWlscy5yb2xlcy5pbmNsdWRlcygnY2FzZXdvcmtlci1pYS1hZG1vZmZpY2VyJylcbiAgICAgICAgICB8fCB1c2VyRGV0YWlscy5yb2xlcy5pbmNsdWRlcygnY2FzZXdvcmtlci1jaXZpbCcpXG4gICAgICAgICAgfHwgdXNlckRldGFpbHMucm9sZXMuaW5jbHVkZXMoJ2Nhc2V3b3JrZXItcHJpdmF0ZWxhdycpKVxuICAgICAgICA/IHRoaXMucm91dGVyLm5hdmlnYXRlKFtDYXNlUmVzb2x2ZXIuZGVmYXVsdFdBUGFnZV0pIDogdGhpcy5yb3V0ZXIubmF2aWdhdGUoW0Nhc2VSZXNvbHZlci5kZWZhdWx0UGFnZV0pO1xuICB9XG59XG4iXX0=