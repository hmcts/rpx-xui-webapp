import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class CommonDataService {
    constructor(http) {
        this.http = http;
    }
    getRefData(url) {
        if (url) {
            return this.http.get(url, { observe: 'body' });
        }
        return of(null);
    }
}
CommonDataService.ɵfac = function CommonDataService_Factory(t) { return new (t || CommonDataService)(i0.ɵɵinject(i1.HttpClient)); };
CommonDataService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CommonDataService, factory: CommonDataService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonDataService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLWRhdGEtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvY29tbW9uLWRhdGEtc2VydmljZS9jb21tb24tZGF0YS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQXVCdEMsTUFBTSxPQUFPLGlCQUFpQjtJQUU1QixZQUE2QixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUcsQ0FBQztJQUUxQyxVQUFVLENBQUMsR0FBVztRQUMzQixJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQTJCLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs7a0ZBVFUsaUJBQWlCO3VFQUFqQixpQkFBaUIsV0FBakIsaUJBQWlCO3VGQUFqQixpQkFBaUI7Y0FEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvdlJlZkRhdGFNb2RlbCB7XG4gIGNhdGVnb3J5X2tleTogc3RyaW5nO1xuICBrZXk6IHN0cmluZztcbiAgdmFsdWVfZW46IHN0cmluZztcbiAgdmFsdWVfY3k6IHN0cmluZztcbiAgaGludF90ZXh0X2VuOiBzdHJpbmc7XG4gIGhpbnRfdGV4dF9jeTogc3RyaW5nO1xuICBsb3Zfb3JkZXI6IG51bWJlcjtcbiAgcGFyZW50X2NhdGVnb3J5OiBzdHJpbmc7XG4gIHBhcmVudF9rZXk6IHN0cmluZztcbiAgYWN0aXZlX2ZsYWc6IHN0cmluZztcbiAgY2hpbGRfbm9kZXM/OiBMb3ZSZWZEYXRhTW9kZWxbXTtcbiAgZnJvbT86IHN0cmluZztcbiAgc2VsZWN0ZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvdlJlZkRhdGFCeVNlcnZpY2VNb2RlbCB7XG4gIGxpc3Rfb2ZfdmFsdWVzOiBMb3ZSZWZEYXRhTW9kZWxbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbW1vbkRhdGFTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgcHVibGljIGdldFJlZkRhdGEodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExvdlJlZkRhdGFCeVNlcnZpY2VNb2RlbD4ge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvdlJlZkRhdGFCeVNlcnZpY2VNb2RlbD4odXJsLCB7b2JzZXJ2ZTogJ2JvZHknfSk7XG4gICAgfVxuICAgIHJldHVybiBvZihudWxsKTtcbiAgfVxufVxuIl19