import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SessionStorageService {
    /**
     * Get an item from the session storage.
     */
    getItem(key) {
        return sessionStorage.getItem(key);
    }
    /**
     * Set an item in the session storage.
     */
    setItem(key, value) {
        sessionStorage.setItem(key, value);
    }
    /**
     * Remove an item from the session storage.
     */
    removeItem(key) {
        sessionStorage.removeItem(key);
    }
    /**
     * Clear all the items held in session storage.
     */
    clear() {
        sessionStorage.clear();
    }
}
SessionStorageService.ɵfac = function SessionStorageService_Factory(t) { return new (t || SessionStorageService)(); };
SessionStorageService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SessionStorageService, factory: SessionStorageService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SessionStorageService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi1zdG9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL3Nlc3Npb24vc2Vzc2lvbi1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUVoQzs7T0FFRztJQUNJLE9BQU8sQ0FBQyxHQUFXO1FBQ3hCLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDdkMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVSxDQUFDLEdBQVc7UUFDM0IsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7OzBGQTVCVSxxQkFBcUI7MkVBQXJCLHFCQUFxQixXQUFyQixxQkFBcUI7dUZBQXJCLHFCQUFxQjtjQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIHtcblxuICAvKipcbiAgICogR2V0IGFuIGl0ZW0gZnJvbSB0aGUgc2Vzc2lvbiBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFuIGl0ZW0gaW4gdGhlIHNlc3Npb24gc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIHRoZSBzZXNzaW9uIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgdGhlIGl0ZW1zIGhlbGQgaW4gc2Vzc2lvbiBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gIH1cbn1cbiJdfQ==