import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class ConvertHrefToRouterService {
    constructor(router) {
        this.router = router;
        this.hrefMarkdownLinkContent = new BehaviorSubject('Default');
    }
    updateHrefLink(content) {
        this.hrefMarkdownLinkContent.next(content);
    }
    getHrefMarkdownLinkContent() {
        return this.hrefMarkdownLinkContent.asObservable();
    }
    callAngularRouter(hrefMarkdownLinkContent) {
        const urls = hrefMarkdownLinkContent.split('?');
        const queryParams = urls[1];
        const queryParamObj = {};
        if (queryParams) {
            const queryParam = queryParams.split('&');
            if (queryParam[0]) {
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < queryParam.length; i++) {
                    const param = queryParam[i].split('=');
                    queryParamObj[param[0]] = param[1];
                }
            }
        }
        this.router.navigate([urls[0]], {
            queryParams: queryParamObj && (Object.keys(queryParamObj).length) ? queryParamObj : ''
        });
    }
}
ConvertHrefToRouterService.ɵfac = function ConvertHrefToRouterService_Factory(t) { return new (t || ConvertHrefToRouterService)(i0.ɵɵinject(i1.Router)); };
ConvertHrefToRouterService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ConvertHrefToRouterService, factory: ConvertHrefToRouterService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConvertHrefToRouterService, [{
        type: Injectable
    }], function () { return [{ type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1ocmVmLXRvLXJvdXRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2NvbnZlcnQtaHJlZi10by1yb3V0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOzs7QUFHbkQsTUFBTSxPQUFPLDBCQUEwQjtJQUlyQyxZQUE2QixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUYxQiw0QkFBdUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU1QixDQUFDO0lBRXhDLGNBQWMsQ0FBQyxPQUFlO1FBQ25DLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLDBCQUEwQjtRQUMvQixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRU0saUJBQWlCLENBQUMsdUJBQXVCO1FBQzlDLE1BQU0sSUFBSSxHQUFHLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRXpCLElBQUksV0FBVyxFQUFFO1lBQ2YsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakIsMENBQTBDO2dCQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDMUMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtTQUNGO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixXQUFXLEVBQUUsYUFBYSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ3ZGLENBQUMsQ0FBQztJQUNMLENBQUM7O29HQWpDVSwwQkFBMEI7Z0ZBQTFCLDBCQUEwQixXQUExQiwwQkFBMEI7dUZBQTFCLDBCQUEwQjtjQUR0QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udmVydEhyZWZUb1JvdXRlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaHJlZk1hcmtkb3duTGlua0NvbnRlbnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCdEZWZhdWx0Jyk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcikge31cblxuICBwdWJsaWMgdXBkYXRlSHJlZkxpbmsoY29udGVudDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5ocmVmTWFya2Rvd25MaW5rQ29udGVudC5uZXh0KGNvbnRlbnQpO1xuICB9XG5cbiAgcHVibGljIGdldEhyZWZNYXJrZG93bkxpbmtDb250ZW50KCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuaHJlZk1hcmtkb3duTGlua0NvbnRlbnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgY2FsbEFuZ3VsYXJSb3V0ZXIoaHJlZk1hcmtkb3duTGlua0NvbnRlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB1cmxzID0gaHJlZk1hcmtkb3duTGlua0NvbnRlbnQuc3BsaXQoJz8nKTtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHVybHNbMV07XG4gICAgY29uc3QgcXVlcnlQYXJhbU9iaiA9IHt9O1xuXG4gICAgaWYgKHF1ZXJ5UGFyYW1zKSB7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtID0gcXVlcnlQYXJhbXMuc3BsaXQoJyYnKTtcbiAgICAgIGlmIChxdWVyeVBhcmFtWzBdKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcHJlZmVyLWZvci1vZlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXJ5UGFyYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBwYXJhbSA9IHF1ZXJ5UGFyYW1baV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICBxdWVyeVBhcmFtT2JqW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3VybHNbMF1dLCB7XG4gICAgICBxdWVyeVBhcmFtczogcXVlcnlQYXJhbU9iaiAmJiAoT2JqZWN0LmtleXMocXVlcnlQYXJhbU9iaikubGVuZ3RoKSA/IHF1ZXJ5UGFyYW1PYmogOiAnJ1xuICAgIH0pO1xuICB9XG59XG4iXX0=