import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http';
import * as i0 from "@angular/core";
import * as i1 from "../http";
import * as i2 from "../../../app.config";
export class CaseFileViewService {
    constructor(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    /**
     * Retrieves the categories and documents for a case.
     *
     * @param caseRef 16-digit Case Reference number of the case
     * @returns An `Observable` of the `CategoriesAndDocuments` for the case
     */
    getCategoriesAndDocuments(caseRef) {
        let url = this.appConfig.getCategoriesAndDocumentsUrl();
        if (url) {
            url += `/${caseRef}`;
            return this.http.get(url, { observe: 'body' });
        }
        return of(null);
    }
    updateDocumentCategory(caseRef, caseVersion, attributePath, categoryId) {
        let url = this.appConfig.getDocumentDataUrl();
        if (url) {
            url += `/${caseRef}`;
            const body = {
                case_version: caseVersion,
                attribute_path: attributePath,
                category_id: categoryId
            };
            return this.http.put(url, body, { observe: 'body' });
        }
        return of(null);
    }
}
CaseFileViewService.ɵfac = function CaseFileViewService_Factory(t) { return new (t || CaseFileViewService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
CaseFileViewService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseFileViewService, factory: CaseFileViewService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFileViewService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWxlLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvY2FzZS1maWxlLXZpZXcvY2FzZS1maWxlLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQUd0QyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ21CLElBQWlCLEVBQ2pCLFNBQTRCO1FBRDVCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBbUI7SUFDM0MsQ0FBQztJQUVMOzs7OztPQUtHO0lBQ0kseUJBQXlCLENBQUMsT0FBZTtRQUM5QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFFeEQsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUVyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVNLHNCQUFzQixDQUFDLE9BQWUsRUFDZixXQUFtQixFQUNuQixhQUFxQixFQUNyQixVQUFrQjtRQUM5QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFOUMsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNyQixNQUFNLElBQUksR0FBRztnQkFDWCxZQUFZLEVBQUUsV0FBVztnQkFDekIsY0FBYyxFQUFFLGFBQWE7Z0JBQzdCLFdBQVcsRUFBRSxVQUFVO2FBQ3hCLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUNwRDtRQUVELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7O3NGQTFDVSxtQkFBbUI7eUVBQW5CLG1CQUFtQixXQUFuQixtQkFBbUI7dUZBQW5CLG1CQUFtQjtjQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBDYXRlZ29yaWVzQW5kRG9jdW1lbnRzIH0gZnJvbSAnLi4vLi4vZG9tYWluL2Nhc2UtZmlsZS12aWV3JztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXNlRmlsZVZpZXdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBodHRwOiBIdHRwU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWdcbiAgKSB7IH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBjYXRlZ29yaWVzIGFuZCBkb2N1bWVudHMgZm9yIGEgY2FzZS5cbiAgICpcbiAgICogQHBhcmFtIGNhc2VSZWYgMTYtZGlnaXQgQ2FzZSBSZWZlcmVuY2UgbnVtYmVyIG9mIHRoZSBjYXNlXG4gICAqIEByZXR1cm5zIEFuIGBPYnNlcnZhYmxlYCBvZiB0aGUgYENhdGVnb3JpZXNBbmREb2N1bWVudHNgIGZvciB0aGUgY2FzZVxuICAgKi9cbiAgcHVibGljIGdldENhdGVnb3JpZXNBbmREb2N1bWVudHMoY2FzZVJlZjogc3RyaW5nKTogT2JzZXJ2YWJsZTxDYXRlZ29yaWVzQW5kRG9jdW1lbnRzPiB7XG4gICAgbGV0IHVybCA9IHRoaXMuYXBwQ29uZmlnLmdldENhdGVnb3JpZXNBbmREb2N1bWVudHNVcmwoKTtcblxuICAgIGlmICh1cmwpIHtcbiAgICAgIHVybCArPSBgLyR7Y2FzZVJlZn1gO1xuXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHtvYnNlcnZlOiAnYm9keSd9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YobnVsbCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRG9jdW1lbnRDYXRlZ29yeShjYXNlUmVmOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VWZXJzaW9uOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxDYXRlZ29yaWVzQW5kRG9jdW1lbnRzPiB7XG4gICAgbGV0IHVybCA9IHRoaXMuYXBwQ29uZmlnLmdldERvY3VtZW50RGF0YVVybCgpO1xuXG4gICAgaWYgKHVybCkge1xuICAgICAgdXJsICs9IGAvJHtjYXNlUmVmfWA7XG4gICAgICBjb25zdCBib2R5ID0ge1xuICAgICAgICBjYXNlX3ZlcnNpb246IGNhc2VWZXJzaW9uLFxuICAgICAgICBhdHRyaWJ1dGVfcGF0aDogYXR0cmlidXRlUGF0aCxcbiAgICAgICAgY2F0ZWdvcnlfaWQ6IGNhdGVnb3J5SWRcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHVybCwgYm9keSwge29ic2VydmU6ICdib2R5J30pO1xuICAgIH1cblxuICAgIHJldHVybiBvZihudWxsKTtcbiAgfVxufVxuIl19