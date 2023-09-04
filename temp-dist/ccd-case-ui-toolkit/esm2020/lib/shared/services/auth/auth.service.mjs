import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AbstractAppConfig } from '../../../app.config';
import * as i0 from "@angular/core";
import * as i1 from "../../../app.config";
/**
 * `Oauth2Service` and `AuthService` cannot be merged as it creates a cyclic dependency on `AuthService` through `HttpErrorService`.
 */
export class AuthService {
    constructor(appConfig, document) {
        this.appConfig = appConfig;
        this.document = document;
    }
    signIn() {
        const loginUrl = this.appConfig.getLoginUrl();
        const clientId = this.appConfig.getOAuth2ClientId();
        const redirectUri = encodeURIComponent(this.redirectUri());
        this.document.location.href = `${loginUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    }
    redirectUri() {
        return this.document.location.origin + AuthService.PATH_OAUTH2_REDIRECT;
    }
}
AuthService.PATH_OAUTH2_REDIRECT = '/oauth2redirect';
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(i0.ɵɵinject(i1.AbstractAppConfig), i0.ɵɵinject(DOCUMENT)); };
AuthService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable
    }], function () { return [{ type: i1.AbstractAppConfig }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9hdXRoL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUV4RDs7R0FFRztBQUVILE1BQU0sT0FBTyxXQUFXO0lBSXRCLFlBQTZCLFNBQTRCLEVBQ1YsUUFBYTtRQUQvQixjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUNWLGFBQVEsR0FBUixRQUFRLENBQUs7SUFBRyxDQUFDO0lBRXpELE1BQU07UUFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNwRCxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxRQUFRLGlDQUFpQyxRQUFRLGlCQUFpQixXQUFXLEVBQUUsQ0FBQztJQUNuSCxDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsb0JBQW9CLENBQUM7SUFDMUUsQ0FBQzs7QUFmdUIsZ0NBQW9CLEdBQUcsaUJBQWlCLENBQUM7c0VBRnRELFdBQVcsaURBS0YsUUFBUTtpRUFMakIsV0FBVyxXQUFYLFdBQVc7dUZBQVgsV0FBVztjQUR2QixVQUFVOztzQkFNSSxNQUFNO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5cbi8qKlxuICogYE9hdXRoMlNlcnZpY2VgIGFuZCBgQXV0aFNlcnZpY2VgIGNhbm5vdCBiZSBtZXJnZWQgYXMgaXQgY3JlYXRlcyBhIGN5Y2xpYyBkZXBlbmRlbmN5IG9uIGBBdXRoU2VydmljZWAgdGhyb3VnaCBgSHR0cEVycm9yU2VydmljZWAuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgUEFUSF9PQVVUSDJfUkVESVJFQ1QgPSAnL29hdXRoMnJlZGlyZWN0JztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcsXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnQ6IGFueSkge31cblxuICBwdWJsaWMgc2lnbkluKCk6IHZvaWQge1xuICAgIGNvbnN0IGxvZ2luVXJsID0gdGhpcy5hcHBDb25maWcuZ2V0TG9naW5VcmwoKTtcbiAgICBjb25zdCBjbGllbnRJZCA9IHRoaXMuYXBwQ29uZmlnLmdldE9BdXRoMkNsaWVudElkKCk7XG4gICAgY29uc3QgcmVkaXJlY3RVcmkgPSBlbmNvZGVVUklDb21wb25lbnQodGhpcy5yZWRpcmVjdFVyaSgpKTtcblxuICAgIHRoaXMuZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGAke2xvZ2luVXJsfT9yZXNwb25zZV90eXBlPWNvZGUmY2xpZW50X2lkPSR7Y2xpZW50SWR9JnJlZGlyZWN0X3VyaT0ke3JlZGlyZWN0VXJpfWA7XG4gIH1cblxuICBwdWJsaWMgcmVkaXJlY3RVcmkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKyBBdXRoU2VydmljZS5QQVRIX09BVVRIMl9SRURJUkVDVDtcbiAgfVxufVxuIl19