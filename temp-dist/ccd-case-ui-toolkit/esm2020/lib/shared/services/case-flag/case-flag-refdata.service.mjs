import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import { HttpService } from '../http';
import * as i0 from "@angular/core";
import * as i1 from "../http";
import * as i2 from "../../../app.config";
export class CaseFlagRefdataService {
    constructor(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    /**
     * Retrieves the Case Flag types for an HMCTS service.
     *
     * @param serviceId The HMCTS Service Code for a jurisdiction or service. **Note:** This is _not_ the service name
     * @param flagType `PARTY` for party-level flags; `CASE` for case-level
     * @param welshRequired `true` if Welsh language versions of flags are required; `false` otherwise (future feature)
     * @returns An `Observable` of an array of flag types
     */
    getCaseFlagsRefdata(serviceId, flagType, welshRequired) {
        let url = this.appConfig.getCaseFlagsRefdataApiUrl();
        if (url) {
            url = url.replace(':sid', serviceId);
            if (flagType) {
                url += `?flag-type=${flagType}`;
            }
            if (typeof welshRequired === 'boolean') {
                // Check if flag-type has been added to the query string; if so, append welsh-required with '&'
                url.indexOf('?') > -1 ? url += '&' : url += '?';
                welshRequired ? url += 'welsh-required=Y' : url += 'welsh-required=N';
            }
            return this.http
                .get(url, { observe: 'body' })
                .pipe(
            // Reference Data Common API returns a single object with a "flags" array, which itself contains a single object
            // with a "FlagDetails" array, which contains a hierarchy of flag types in an object - one each for "Party" flags
            // and "Case" flags
            map(body => {
                if (!body || !body.flags || !body.flags.length || !body.flags[0].FlagDetails || !body.flags[0].FlagDetails.length) {
                    // Note: Reference Data Common API appears to respond with a 404 error rather than send an empty response,
                    // so this may be redundant
                    return throwError(new Error('No flag types could be retrieved'));
                }
                return body.flags[0].FlagDetails;
            }));
        }
        return of(null);
    }
    /**
     * Retrieves the HMCTS service details for a jurisdiction or service, including service codes. More than one
     * service code may be present. For example, the Divorce jurisdiction/service has corresponding service codes of
     * "ABA1" and "ABA2".
     *
     * @param serviceNames The service name(s) to look up, comma-separated if more than one
     * @returns An `Observable` of an array of service details
     */
    getHmctsServiceDetailsByServiceName(serviceNames) {
        let url = this.appConfig.getLocationRefApiUrl();
        if (url) {
            url += '/orgServices';
            if (serviceNames) {
                url += `?ccdServiceNames=${serviceNames}`;
            }
            return this.http.get(url, { observe: 'body' });
        }
        return of(null);
    }
    /**
     * Retrieves the HMCTS service details for a case type, including service code. For example, the
     * "FinancialRemedyContested" case type is associated with the Divorce jurisdiction/service and service code "ABA2".
     *
     * Note that a case type might not be associated with any service codes of a jurisdiction or service.
     *
     * @param caseTypeId The case type ID to look up
     * @returns An `Observable` of an array of service details
     */
    getHmctsServiceDetailsByCaseType(caseTypeId) {
        let url = this.appConfig.getLocationRefApiUrl();
        if (url) {
            url += '/orgServices';
            if (caseTypeId) {
                url += `?ccdCaseType=${caseTypeId}`;
            }
            return this.http.get(url, { observe: 'body' });
        }
        return of(null);
    }
}
CaseFlagRefdataService.ɵfac = function CaseFlagRefdataService_Factory(t) { return new (t || CaseFlagRefdataService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig)); };
CaseFlagRefdataService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseFlagRefdataService, factory: CaseFlagRefdataService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFlagRefdataService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1mbGFnLXJlZmRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvY2FzZS1mbGFnL2Nhc2UtZmxhZy1yZWZkYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQUl0QyxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQ21CLElBQWlCLEVBQ2pCLFNBQTRCO1FBRDVCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBbUI7SUFDM0MsQ0FBQztJQUVMOzs7Ozs7O09BT0c7SUFDSSxtQkFBbUIsQ0FBQyxTQUFpQixFQUFFLFFBQThCLEVBQUUsYUFBdUI7UUFDbkcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRXJELElBQUksR0FBRyxFQUFFO1lBQ1AsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksUUFBUSxFQUFFO2dCQUNaLEdBQUcsSUFBSSxjQUFjLFFBQVEsRUFBRSxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxPQUFPLGFBQWEsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLCtGQUErRjtnQkFDL0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztnQkFDaEQsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQzthQUN2RTtZQUVELE9BQU8sSUFBSSxDQUFDLElBQUk7aUJBQ2IsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQztpQkFDM0IsSUFBSTtZQUNILGdIQUFnSDtZQUNoSCxpSEFBaUg7WUFDakgsbUJBQW1CO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDVCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pILDBHQUEwRztvQkFDMUcsMkJBQTJCO29CQUMzQixPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7aUJBQ2xFO2dCQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNMO1FBRUQsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxtQ0FBbUMsQ0FBQyxZQUFxQjtRQUM5RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFaEQsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLElBQUksY0FBYyxDQUFDO1lBQ3RCLElBQUksWUFBWSxFQUFFO2dCQUNoQixHQUFHLElBQUksb0JBQW9CLFlBQVksRUFBRSxDQUFDO2FBQzNDO1lBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUM5QztRQUVELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLGdDQUFnQyxDQUFDLFVBQW1CO1FBQ3pELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUVoRCxJQUFJLEdBQUcsRUFBRTtZQUNQLEdBQUcsSUFBSSxjQUFjLENBQUM7WUFDdEIsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsR0FBRyxJQUFJLGdCQUFnQixVQUFVLEVBQUUsQ0FBQzthQUNyQztZQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7U0FDOUM7UUFFRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDOzs0RkE3RlUsc0JBQXNCOzRFQUF0QixzQkFBc0IsV0FBdEIsc0JBQXNCO3VGQUF0QixzQkFBc0I7Y0FEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgRmxhZ1R5cGUsIEhtY3RzU2VydmljZURldGFpbCB9IGZyb20gJy4uLy4uL2RvbWFpbi9jYXNlLWZsYWcnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuLi9odHRwJztcbmltcG9ydCB7IFJlZmRhdGFDYXNlRmxhZ1R5cGUgfSBmcm9tICcuL3JlZmRhdGEtY2FzZS1mbGFnLXR5cGUuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXNlRmxhZ1JlZmRhdGFTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBodHRwOiBIdHRwU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWdcbiAgKSB7IH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBDYXNlIEZsYWcgdHlwZXMgZm9yIGFuIEhNQ1RTIHNlcnZpY2UuXG4gICAqXG4gICAqIEBwYXJhbSBzZXJ2aWNlSWQgVGhlIEhNQ1RTIFNlcnZpY2UgQ29kZSBmb3IgYSBqdXJpc2RpY3Rpb24gb3Igc2VydmljZS4gKipOb3RlOioqIFRoaXMgaXMgX25vdF8gdGhlIHNlcnZpY2UgbmFtZVxuICAgKiBAcGFyYW0gZmxhZ1R5cGUgYFBBUlRZYCBmb3IgcGFydHktbGV2ZWwgZmxhZ3M7IGBDQVNFYCBmb3IgY2FzZS1sZXZlbFxuICAgKiBAcGFyYW0gd2Vsc2hSZXF1aXJlZCBgdHJ1ZWAgaWYgV2Vsc2ggbGFuZ3VhZ2UgdmVyc2lvbnMgb2YgZmxhZ3MgYXJlIHJlcXVpcmVkOyBgZmFsc2VgIG90aGVyd2lzZSAoZnV0dXJlIGZlYXR1cmUpXG4gICAqIEByZXR1cm5zIEFuIGBPYnNlcnZhYmxlYCBvZiBhbiBhcnJheSBvZiBmbGFnIHR5cGVzXG4gICAqL1xuICBwdWJsaWMgZ2V0Q2FzZUZsYWdzUmVmZGF0YShzZXJ2aWNlSWQ6IHN0cmluZywgZmxhZ1R5cGU/OiBSZWZkYXRhQ2FzZUZsYWdUeXBlLCB3ZWxzaFJlcXVpcmVkPzogYm9vbGVhbik6IE9ic2VydmFibGU8RmxhZ1R5cGVbXT4ge1xuICAgIGxldCB1cmwgPSB0aGlzLmFwcENvbmZpZy5nZXRDYXNlRmxhZ3NSZWZkYXRhQXBpVXJsKCk7XG5cbiAgICBpZiAodXJsKSB7XG4gICAgICB1cmwgPSB1cmwucmVwbGFjZSgnOnNpZCcsIHNlcnZpY2VJZCk7XG4gICAgICBpZiAoZmxhZ1R5cGUpIHtcbiAgICAgICAgdXJsICs9IGA/ZmxhZy10eXBlPSR7ZmxhZ1R5cGV9YDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygd2Vsc2hSZXF1aXJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGZsYWctdHlwZSBoYXMgYmVlbiBhZGRlZCB0byB0aGUgcXVlcnkgc3RyaW5nOyBpZiBzbywgYXBwZW5kIHdlbHNoLXJlcXVpcmVkIHdpdGggJyYnXG4gICAgICAgIHVybC5pbmRleE9mKCc/JykgPiAtMSA/IHVybCArPSAnJicgOiB1cmwgKz0gJz8nO1xuICAgICAgICB3ZWxzaFJlcXVpcmVkID8gdXJsICs9ICd3ZWxzaC1yZXF1aXJlZD1ZJyA6IHVybCArPSAnd2Vsc2gtcmVxdWlyZWQ9Tic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgLmdldCh1cmwsIHtvYnNlcnZlOiAnYm9keSd9KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAvLyBSZWZlcmVuY2UgRGF0YSBDb21tb24gQVBJIHJldHVybnMgYSBzaW5nbGUgb2JqZWN0IHdpdGggYSBcImZsYWdzXCIgYXJyYXksIHdoaWNoIGl0c2VsZiBjb250YWlucyBhIHNpbmdsZSBvYmplY3RcbiAgICAgICAgICAvLyB3aXRoIGEgXCJGbGFnRGV0YWlsc1wiIGFycmF5LCB3aGljaCBjb250YWlucyBhIGhpZXJhcmNoeSBvZiBmbGFnIHR5cGVzIGluIGFuIG9iamVjdCAtIG9uZSBlYWNoIGZvciBcIlBhcnR5XCIgZmxhZ3NcbiAgICAgICAgICAvLyBhbmQgXCJDYXNlXCIgZmxhZ3NcbiAgICAgICAgICBtYXAoYm9keSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJvZHkgfHwgIWJvZHkuZmxhZ3MgfHwgIWJvZHkuZmxhZ3MubGVuZ3RoIHx8ICFib2R5LmZsYWdzWzBdLkZsYWdEZXRhaWxzIHx8ICFib2R5LmZsYWdzWzBdLkZsYWdEZXRhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBOb3RlOiBSZWZlcmVuY2UgRGF0YSBDb21tb24gQVBJIGFwcGVhcnMgdG8gcmVzcG9uZCB3aXRoIGEgNDA0IGVycm9yIHJhdGhlciB0aGFuIHNlbmQgYW4gZW1wdHkgcmVzcG9uc2UsXG4gICAgICAgICAgICAgIC8vIHNvIHRoaXMgbWF5IGJlIHJlZHVuZGFudFxuICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ05vIGZsYWcgdHlwZXMgY291bGQgYmUgcmV0cmlldmVkJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJvZHkuZmxhZ3NbMF0uRmxhZ0RldGFpbHM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBITUNUUyBzZXJ2aWNlIGRldGFpbHMgZm9yIGEganVyaXNkaWN0aW9uIG9yIHNlcnZpY2UsIGluY2x1ZGluZyBzZXJ2aWNlIGNvZGVzLiBNb3JlIHRoYW4gb25lXG4gICAqIHNlcnZpY2UgY29kZSBtYXkgYmUgcHJlc2VudC4gRm9yIGV4YW1wbGUsIHRoZSBEaXZvcmNlIGp1cmlzZGljdGlvbi9zZXJ2aWNlIGhhcyBjb3JyZXNwb25kaW5nIHNlcnZpY2UgY29kZXMgb2ZcbiAgICogXCJBQkExXCIgYW5kIFwiQUJBMlwiLlxuICAgKlxuICAgKiBAcGFyYW0gc2VydmljZU5hbWVzIFRoZSBzZXJ2aWNlIG5hbWUocykgdG8gbG9vayB1cCwgY29tbWEtc2VwYXJhdGVkIGlmIG1vcmUgdGhhbiBvbmVcbiAgICogQHJldHVybnMgQW4gYE9ic2VydmFibGVgIG9mIGFuIGFycmF5IG9mIHNlcnZpY2UgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIGdldEhtY3RzU2VydmljZURldGFpbHNCeVNlcnZpY2VOYW1lKHNlcnZpY2VOYW1lcz86IHN0cmluZyk6IE9ic2VydmFibGU8SG1jdHNTZXJ2aWNlRGV0YWlsW10+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5hcHBDb25maWcuZ2V0TG9jYXRpb25SZWZBcGlVcmwoKTtcblxuICAgIGlmICh1cmwpIHtcbiAgICAgIHVybCArPSAnL29yZ1NlcnZpY2VzJztcbiAgICAgIGlmIChzZXJ2aWNlTmFtZXMpIHtcbiAgICAgICAgdXJsICs9IGA/Y2NkU2VydmljZU5hbWVzPSR7c2VydmljZU5hbWVzfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwge29ic2VydmU6ICdib2R5J30pO1xuICAgIH1cblxuICAgIHJldHVybiBvZihudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIEhNQ1RTIHNlcnZpY2UgZGV0YWlscyBmb3IgYSBjYXNlIHR5cGUsIGluY2x1ZGluZyBzZXJ2aWNlIGNvZGUuIEZvciBleGFtcGxlLCB0aGVcbiAgICogXCJGaW5hbmNpYWxSZW1lZHlDb250ZXN0ZWRcIiBjYXNlIHR5cGUgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBEaXZvcmNlIGp1cmlzZGljdGlvbi9zZXJ2aWNlIGFuZCBzZXJ2aWNlIGNvZGUgXCJBQkEyXCIuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBhIGNhc2UgdHlwZSBtaWdodCBub3QgYmUgYXNzb2NpYXRlZCB3aXRoIGFueSBzZXJ2aWNlIGNvZGVzIG9mIGEganVyaXNkaWN0aW9uIG9yIHNlcnZpY2UuXG4gICAqXG4gICAqIEBwYXJhbSBjYXNlVHlwZUlkIFRoZSBjYXNlIHR5cGUgSUQgdG8gbG9vayB1cFxuICAgKiBAcmV0dXJucyBBbiBgT2JzZXJ2YWJsZWAgb2YgYW4gYXJyYXkgb2Ygc2VydmljZSBkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgZ2V0SG1jdHNTZXJ2aWNlRGV0YWlsc0J5Q2FzZVR5cGUoY2FzZVR5cGVJZD86IHN0cmluZyk6IE9ic2VydmFibGU8SG1jdHNTZXJ2aWNlRGV0YWlsW10+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5hcHBDb25maWcuZ2V0TG9jYXRpb25SZWZBcGlVcmwoKTtcblxuICAgIGlmICh1cmwpIHtcbiAgICAgIHVybCArPSAnL29yZ1NlcnZpY2VzJztcbiAgICAgIGlmIChjYXNlVHlwZUlkKSB7XG4gICAgICAgIHVybCArPSBgP2NjZENhc2VUeXBlPSR7Y2FzZVR5cGVJZH1gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHtvYnNlcnZlOiAnYm9keSd9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YobnVsbCk7XG4gIH1cbn1cbiJdfQ==