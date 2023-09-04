import { Pipe } from '@angular/core';
import { AbstractAppConfig } from '../../../../../app.config';
import * as i0 from "@angular/core";
import * as i1 from "../../../../../app.config";
export class PrintUrlPipe {
    constructor(appConfig) {
        this.appConfig = appConfig;
    }
    /**
     * Takes a "remote" Print Service URL (for example, as returned by calling the `/documents` CCD endpoint) and
     * rewrites it into a "local", application-specific URL for the front-end. The resulting URL is of the form:
     *
     * Configurable "Local URL" (e.g. `/print`) + _pathname_ from original "remote URL"
     * (e.g. `/jurisdictions/TEST/case-types/Test1/cases/1111222233334444`)
     *
     * @param remoteUrl The "remote" URL to rewrite
     * @returns A rewritten URL as per the above description, or the original `remoteUrl` if it is `null`, `undefined`,
     * or the empty string
     */
    transform(remoteUrl) {
        if (remoteUrl?.length > 0) {
            let printServiceUrlPathname;
            /**
             * Check navigator.userAgent to see if the browser is IE or not. Check for either the browser name, "MSIE", or
             * the rendering engine, "Trident" (used to identify IE 11 because it no longer reports as "MSIE").
             * Note: IE does not support the URL interface and requires a workaround to parse URLs.
             */
            if (navigator.userAgent.indexOf(PrintUrlPipe.MSIE_BROWSER_NAME) !== -1 ||
                navigator.userAgent.indexOf(PrintUrlPipe.IE11_BROWSER_ENGINE) !== -1) {
                // Workaround for not being able to use the URL interface
                const urlParser = document.createElement('a');
                urlParser.href = remoteUrl;
                // Get the pathname from the anchor element with the "remote" Print Service URL
                printServiceUrlPathname = urlParser.pathname;
                if (printServiceUrlPathname[0] !== '/') {
                    // Fix for IE11; it returns the pathname without leading slash
                    printServiceUrlPathname = `/${printServiceUrlPathname}`;
                }
            }
            else {
                // Get the pathname parsed from the "remote" Print Service URL object
                printServiceUrlPathname = new URL(remoteUrl).pathname;
            }
            // Return an amended URL comprising the "local" Print Service URL (usually /print) and the "remote" pathname
            return this.appConfig.getPrintServiceUrl() + printServiceUrlPathname;
        }
        return remoteUrl;
    }
}
PrintUrlPipe.MSIE_BROWSER_NAME = 'MSIE';
PrintUrlPipe.IE11_BROWSER_ENGINE = 'Trident';
PrintUrlPipe.ɵfac = function PrintUrlPipe_Factory(t) { return new (t || PrintUrlPipe)(i0.ɵɵdirectiveInject(i1.AbstractAppConfig, 16)); };
PrintUrlPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdPrintUrl", type: PrintUrlPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PrintUrlPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdPrintUrl'
            }]
    }], function () { return [{ type: i1.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtdXJsLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS12aWV3ZXIvcHJpbnRlci9waXBlcy9wcmludC11cmwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBSzlELE1BQU0sT0FBTyxZQUFZO0lBSXZCLFlBQTZCLFNBQTRCO1FBQTVCLGNBQVMsR0FBVCxTQUFTLENBQW1CO0lBQUcsQ0FBQztJQUU3RDs7Ozs7Ozs7OztPQVVHO0lBQ0ksU0FBUyxDQUFDLFNBQWlCO1FBQ2hDLElBQUksU0FBUyxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSx1QkFBK0IsQ0FBQztZQUVwQzs7OztlQUlHO1lBQ0gsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xFLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN4RSx5REFBeUQ7Z0JBQ3pELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUMzQiwrRUFBK0U7Z0JBQy9FLHVCQUF1QixHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQzdDLElBQUksdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUN0Qyw4REFBOEQ7b0JBQzlELHVCQUF1QixHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztpQkFDekQ7YUFDRjtpQkFBTTtnQkFDTCxxRUFBcUU7Z0JBQ3JFLHVCQUF1QixHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUN2RDtZQUVELDRHQUE0RztZQUM1RyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQztTQUN0RTtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O0FBOUN1Qiw4QkFBaUIsR0FBRyxNQUFNLENBQUM7QUFDM0IsZ0NBQW1CLEdBQUcsU0FBUyxDQUFDO3dFQUY3QyxZQUFZO2dGQUFaLFlBQVk7dUZBQVosWUFBWTtjQUh4QixJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLGFBQWE7YUFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FwcC5jb25maWcnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2RQcmludFVybCdcbn0pXG5leHBvcnQgY2xhc3MgUHJpbnRVcmxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1TSUVfQlJPV1NFUl9OQU1FID0gJ01TSUUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJRTExX0JST1dTRVJfRU5HSU5FID0gJ1RyaWRlbnQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZykge31cblxuICAvKipcbiAgICogVGFrZXMgYSBcInJlbW90ZVwiIFByaW50IFNlcnZpY2UgVVJMIChmb3IgZXhhbXBsZSwgYXMgcmV0dXJuZWQgYnkgY2FsbGluZyB0aGUgYC9kb2N1bWVudHNgIENDRCBlbmRwb2ludCkgYW5kXG4gICAqIHJld3JpdGVzIGl0IGludG8gYSBcImxvY2FsXCIsIGFwcGxpY2F0aW9uLXNwZWNpZmljIFVSTCBmb3IgdGhlIGZyb250LWVuZC4gVGhlIHJlc3VsdGluZyBVUkwgaXMgb2YgdGhlIGZvcm06XG4gICAqXG4gICAqIENvbmZpZ3VyYWJsZSBcIkxvY2FsIFVSTFwiIChlLmcuIGAvcHJpbnRgKSArIF9wYXRobmFtZV8gZnJvbSBvcmlnaW5hbCBcInJlbW90ZSBVUkxcIlxuICAgKiAoZS5nLiBgL2p1cmlzZGljdGlvbnMvVEVTVC9jYXNlLXR5cGVzL1Rlc3QxL2Nhc2VzLzExMTEyMjIyMzMzMzQ0NDRgKVxuICAgKlxuICAgKiBAcGFyYW0gcmVtb3RlVXJsIFRoZSBcInJlbW90ZVwiIFVSTCB0byByZXdyaXRlXG4gICAqIEByZXR1cm5zIEEgcmV3cml0dGVuIFVSTCBhcyBwZXIgdGhlIGFib3ZlIGRlc2NyaXB0aW9uLCBvciB0aGUgb3JpZ2luYWwgYHJlbW90ZVVybGAgaWYgaXQgaXMgYG51bGxgLCBgdW5kZWZpbmVkYCxcbiAgICogb3IgdGhlIGVtcHR5IHN0cmluZ1xuICAgKi9cbiAgcHVibGljIHRyYW5zZm9ybShyZW1vdGVVcmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHJlbW90ZVVybD8ubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHByaW50U2VydmljZVVybFBhdGhuYW1lOiBzdHJpbmc7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgbmF2aWdhdG9yLnVzZXJBZ2VudCB0byBzZWUgaWYgdGhlIGJyb3dzZXIgaXMgSUUgb3Igbm90LiBDaGVjayBmb3IgZWl0aGVyIHRoZSBicm93c2VyIG5hbWUsIFwiTVNJRVwiLCBvclxuICAgICAgICogdGhlIHJlbmRlcmluZyBlbmdpbmUsIFwiVHJpZGVudFwiICh1c2VkIHRvIGlkZW50aWZ5IElFIDExIGJlY2F1c2UgaXQgbm8gbG9uZ2VyIHJlcG9ydHMgYXMgXCJNU0lFXCIpLlxuICAgICAgICogTm90ZTogSUUgZG9lcyBub3Qgc3VwcG9ydCB0aGUgVVJMIGludGVyZmFjZSBhbmQgcmVxdWlyZXMgYSB3b3JrYXJvdW5kIHRvIHBhcnNlIFVSTHMuXG4gICAgICAgKi9cbiAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoUHJpbnRVcmxQaXBlLk1TSUVfQlJPV1NFUl9OQU1FKSAhPT0gLTEgfHxcbiAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoUHJpbnRVcmxQaXBlLklFMTFfQlJPV1NFUl9FTkdJTkUpICE9PSAtMSkge1xuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBub3QgYmVpbmcgYWJsZSB0byB1c2UgdGhlIFVSTCBpbnRlcmZhY2VcbiAgICAgICAgY29uc3QgdXJsUGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICB1cmxQYXJzZXIuaHJlZiA9IHJlbW90ZVVybDtcbiAgICAgICAgLy8gR2V0IHRoZSBwYXRobmFtZSBmcm9tIHRoZSBhbmNob3IgZWxlbWVudCB3aXRoIHRoZSBcInJlbW90ZVwiIFByaW50IFNlcnZpY2UgVVJMXG4gICAgICAgIHByaW50U2VydmljZVVybFBhdGhuYW1lID0gdXJsUGFyc2VyLnBhdGhuYW1lO1xuICAgICAgICBpZiAocHJpbnRTZXJ2aWNlVXJsUGF0aG5hbWVbMF0gIT09ICcvJykge1xuICAgICAgICAgIC8vIEZpeCBmb3IgSUUxMTsgaXQgcmV0dXJucyB0aGUgcGF0aG5hbWUgd2l0aG91dCBsZWFkaW5nIHNsYXNoXG4gICAgICAgICAgcHJpbnRTZXJ2aWNlVXJsUGF0aG5hbWUgPSBgLyR7cHJpbnRTZXJ2aWNlVXJsUGF0aG5hbWV9YDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IHRoZSBwYXRobmFtZSBwYXJzZWQgZnJvbSB0aGUgXCJyZW1vdGVcIiBQcmludCBTZXJ2aWNlIFVSTCBvYmplY3RcbiAgICAgICAgcHJpbnRTZXJ2aWNlVXJsUGF0aG5hbWUgPSBuZXcgVVJMKHJlbW90ZVVybCkucGF0aG5hbWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiBhbiBhbWVuZGVkIFVSTCBjb21wcmlzaW5nIHRoZSBcImxvY2FsXCIgUHJpbnQgU2VydmljZSBVUkwgKHVzdWFsbHkgL3ByaW50KSBhbmQgdGhlIFwicmVtb3RlXCIgcGF0aG5hbWVcbiAgICAgIHJldHVybiB0aGlzLmFwcENvbmZpZy5nZXRQcmludFNlcnZpY2VVcmwoKSArIHByaW50U2VydmljZVVybFBhdGhuYW1lO1xuICAgIH1cblxuICAgIHJldHVybiByZW1vdGVVcmw7XG4gIH1cbn1cbiJdfQ==