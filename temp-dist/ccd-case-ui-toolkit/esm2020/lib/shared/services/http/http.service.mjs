import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorService } from './http-error.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./http-error.service";
export class HttpService {
    constructor(httpclient, httpErrorService) {
        this.httpclient = httpclient;
        this.httpErrorService = httpErrorService;
    }
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    get(url, options, redirectIfNotAuthorised = true, errorHandler) {
        return this.httpclient
            .get(url, this.setDefaultValue(options))
            .pipe(catchError((res) => {
            let error = res;
            if (typeof errorHandler === 'function') {
                error = errorHandler(res);
            }
            return this.httpErrorService.handle(error, redirectIfNotAuthorised);
        }));
    }
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body Body for post
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    post(url, body, options, redirectIfNotAuthorised = true) {
        return this.httpclient
            .post(url, body, this.setDefaultValue(options))
            .pipe(catchError((res) => {
            return this.httpErrorService.handle(res, redirectIfNotAuthorised);
        }));
    }
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body Body for post
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    put(url, body, options) {
        return this.httpclient
            .put(url, body, this.setDefaultValue(options))
            .pipe(catchError((res) => {
            return this.httpErrorService.handle(res);
        }));
    }
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    delete(url, options) {
        return this.httpclient
            .delete(url, this.setDefaultValue(options))
            .pipe(catchError((res) => {
            return this.httpErrorService.handle(res);
        }));
    }
    setDefaultValue(options) {
        options = options || { observe: 'body' };
        options.withCredentials = true;
        if (!options.headers) {
            options.headers = new HttpHeaders()
                .set(HttpService.HEADER_ACCEPT, 'application/json')
                .set(HttpService.HEADER_CONTENT_TYPE, 'application/json');
        }
        return options;
    }
}
HttpService.HEADER_ACCEPT = 'Accept';
HttpService.HEADER_CONTENT_TYPE = 'Content-Type';
HttpService.ɵfac = function HttpService_Factory(t) { return new (t || HttpService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.HttpErrorService)); };
HttpService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HttpService, factory: HttpService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HttpService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpClient }, { type: i2.HttpErrorService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9odHRwL2h0dHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixXQUFXLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUd4RCxNQUFNLE9BQU8sV0FBVztJQUt0QixZQUNtQixVQUFzQixFQUN0QixnQkFBa0M7UUFEbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQ2xELENBQUM7SUFFSjs7Ozs7O09BTUc7SUFFSSxHQUFHLENBQ1IsR0FBVyxFQUNYLE9BQXFCLEVBQ3JCLHVCQUF1QixHQUFHLElBQUksRUFDOUIsWUFBc0Q7UUFDdEQsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNuQixHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkMsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEdBQXNCLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEtBQUssR0FBa0MsR0FBRyxDQUFDO1lBQy9DLElBQUksT0FBTyxZQUFZLEtBQUssVUFBVSxFQUFFO2dCQUN0QyxLQUFLLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBQyxHQUFXLEVBQUUsSUFBUyxFQUFFLE9BQXFCLEVBQUUsdUJBQXVCLEdBQUcsSUFBSTtRQUN2RixPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUMsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEdBQXNCLEVBQUUsRUFBRTtZQUNwQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksR0FBRyxDQUFDLEdBQVcsRUFBRSxJQUFTLEVBQUUsT0FBcUI7UUFDdEQsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNuQixHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzdDLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxHQUFzQixFQUFFLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLEdBQVcsRUFBRSxPQUFxQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ25CLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQyxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsR0FBc0IsRUFBRSxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVNLGVBQWUsQ0FBQyxPQUFxQjtRQUMxQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7aUJBQ2hDLEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDO2lCQUNsRCxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDN0Q7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztBQWpHdUIseUJBQWEsR0FBRyxRQUFRLENBQUM7QUFDekIsK0JBQW1CLEdBQUcsY0FBYyxDQUFDO3NFQUhsRCxXQUFXO2lFQUFYLFdBQVcsV0FBWCxXQUFXO3VGQUFYLFdBQVc7Y0FEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi9kb21haW4vaHR0cC9odHRwLWVycm9yLm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtZXJyb3Iuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSEVBREVSX0FDQ0VQVCA9ICdBY2NlcHQnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIRUFERVJfQ09OVEVOVF9UWVBFID0gJ0NvbnRlbnQtVHlwZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBodHRwY2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgaHR0cEVycm9yU2VydmljZTogSHR0cEVycm9yU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgVXJsIHJlc29sdmVkIHVzaW5nIFVybFJlc29sdmVyU2VydmljZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zVHlwZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT4gcmV0dXJuIHZhbHVlXG4gICAqIEBzZWUgVXJsUmVzb2x2ZXJTZXJ2aWNlXG4gICAqL1xuXG4gIHB1YmxpYyBnZXQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IE9wdGlvbnNUeXBlLFxuICAgIHJlZGlyZWN0SWZOb3RBdXRob3Jpc2VkID0gdHJ1ZSxcbiAgICBlcnJvckhhbmRsZXI/OiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBIdHRwRXJyb3IpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBjbGllbnRcbiAgICAgIC5nZXQodXJsLCB0aGlzLnNldERlZmF1bHRWYWx1ZShvcHRpb25zKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbGV0IGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSB8IEh0dHBFcnJvciA9IHJlcztcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9ySGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXJyb3IgPSBlcnJvckhhbmRsZXIocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEVycm9yU2VydmljZS5oYW5kbGUoZXJyb3IsIHJlZGlyZWN0SWZOb3RBdXRob3Jpc2VkKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHVybCBVcmwgcmVzb2x2ZWQgdXNpbmcgVXJsUmVzb2x2ZXJTZXJ2aWNlXG4gICAqIEBwYXJhbSBib2R5IEJvZHkgZm9yIHBvc3RcbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9uc1R5cGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+IHJldHVybiB2YWx1ZVxuICAgKiBAc2VlIFVybFJlc29sdmVyU2VydmljZVxuICAgKi9cbiAgcHVibGljIHBvc3QodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IE9wdGlvbnNUeXBlLCByZWRpcmVjdElmTm90QXV0aG9yaXNlZCA9IHRydWUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBjbGllbnRcbiAgICAgIC5wb3N0KHVybCwgYm9keSwgdGhpcy5zZXREZWZhdWx0VmFsdWUob3B0aW9ucykpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBFcnJvclNlcnZpY2UuaGFuZGxlKHJlcywgcmVkaXJlY3RJZk5vdEF1dGhvcmlzZWQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIFVybCByZXNvbHZlZCB1c2luZyBVcmxSZXNvbHZlclNlcnZpY2VcbiAgICogQHBhcmFtIGJvZHkgQm9keSBmb3IgcG9zdFxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zVHlwZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT4gcmV0dXJuIHZhbHVlXG4gICAqIEBzZWUgVXJsUmVzb2x2ZXJTZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcHV0KHVybDogc3RyaW5nLCBib2R5OiBhbnksIG9wdGlvbnM/OiBPcHRpb25zVHlwZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cGNsaWVudFxuICAgICAgLnB1dCh1cmwsIGJvZHksIHRoaXMuc2V0RGVmYXVsdFZhbHVlKG9wdGlvbnMpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5odHRwRXJyb3JTZXJ2aWNlLmhhbmRsZShyZXMpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIFVybCByZXNvbHZlZCB1c2luZyBVcmxSZXNvbHZlclNlcnZpY2VcbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9uc1R5cGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+IHJldHVybiB2YWx1ZVxuICAgKiBAc2VlIFVybFJlc29sdmVyU2VydmljZVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZSh1cmw6IHN0cmluZywgb3B0aW9ucz86IE9wdGlvbnNUeXBlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwY2xpZW50XG4gICAgICAuZGVsZXRlKHVybCwgdGhpcy5zZXREZWZhdWx0VmFsdWUob3B0aW9ucykpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBFcnJvclNlcnZpY2UuaGFuZGxlKHJlcyk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIHNldERlZmF1bHRWYWx1ZShvcHRpb25zPzogT3B0aW9uc1R5cGUpOiBPcHRpb25zVHlwZSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge29ic2VydmU6ICdib2R5J307XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAgIC5zZXQoSHR0cFNlcnZpY2UuSEVBREVSX0FDQ0VQVCwgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAgICAgICAuc2V0KEh0dHBTZXJ2aWNlLkhFQURFUl9DT05URU5UX1RZUEUsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc1R5cGUge1xuICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gIG9ic2VydmU6ICdib2R5JztcbiAgcGFyYW1zPzogSHR0cFBhcmFtcyB8IHsgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXTsgfTtcbiAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuO1xuICByZXNwb25zZVR5cGU/OiAnanNvbic7XG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG59XG4iXX0=