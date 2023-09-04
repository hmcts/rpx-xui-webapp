import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class WindowService {
    locationAssign(url) {
        window.location.assign(url);
    }
    setLocalStorage(key, value) {
        window.localStorage.setItem(key, value);
    }
    getLocalStorage(key) {
        return window.localStorage.getItem(key);
    }
    clearLocalStorage() {
        window.localStorage.clear();
    }
    removeLocalStorage(key) {
        window.localStorage.removeItem(key);
    }
    setSessionStorage(key, value) {
        window.sessionStorage.setItem(key, value);
    }
    getSessionStorage(key) {
        return window.sessionStorage.getItem(key);
    }
    openOnNewTab(url) {
        window.open(url, '_blank');
    }
    confirm(message) {
        return window.confirm(message);
    }
    alert(message) {
        return window.alert(message);
    }
}
WindowService.ɵfac = function WindowService_Factory(t) { return new (t || WindowService)(); };
WindowService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WindowService, factory: WindowService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WindowService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL3dpbmRvdy93aW5kb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxNQUFNLE9BQU8sYUFBYTtJQUNqQixjQUFjLENBQUMsR0FBVztRQUMvQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sZUFBZSxDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sZUFBZSxDQUFDLEdBQVc7UUFDaEMsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0saUJBQWlCO1FBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEdBQVc7UUFDbkMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQ2pELE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0saUJBQWlCLENBQUMsR0FBVztRQUNsQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxZQUFZLENBQUMsR0FBVztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sT0FBTyxDQUFDLE9BQWU7UUFDNUIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBZTtRQUMxQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7MEVBdkNVLGFBQWE7bUVBQWIsYUFBYSxXQUFiLGFBQWE7dUZBQWIsYUFBYTtjQUR6QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2luZG93U2VydmljZSB7XG4gIHB1YmxpYyBsb2NhdGlvbkFzc2lnbih1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24odXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRMb2NhbFN0b3JhZ2Uoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYWxTdG9yYWdlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyTG9jYWxTdG9yYWdlKCkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVMb2NhbFN0b3JhZ2Uoa2V5OiBzdHJpbmcpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTZXNzaW9uU3RvcmFnZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldFNlc3Npb25TdG9yYWdlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICBwdWJsaWMgb3Blbk9uTmV3VGFiKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gIH1cblxuICBwdWJsaWMgY29uZmlybShtZXNzYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gd2luZG93LmNvbmZpcm0obWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgYWxlcnQobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgcmV0dXJuIHdpbmRvdy5hbGVydChtZXNzYWdlKTtcbiAgfVxufVxuIl19