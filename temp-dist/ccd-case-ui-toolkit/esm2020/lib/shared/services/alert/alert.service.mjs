import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RpxTranslationService } from 'rpx-xui-translation';
import { Observable } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
export class AlertService {
    constructor(router, rpxTranslationService) {
        this.router = router;
        this.rpxTranslationService = rpxTranslationService;
        // the preserved messages
        this.preservedError = '';
        this.preservedWarning = '';
        this.preservedSuccess = '';
        this.preserveAlerts = false;
        this.successes = Observable
            .create(observer => this.successObserver = observer).pipe(publish(), refCount());
        this.successes.subscribe();
        this.errors = Observable
            .create(observer => this.errorObserver = observer).pipe(publish(), refCount());
        this.errors.subscribe();
        this.warnings = Observable
            .create(observer => this.warningObserver = observer).pipe(publish(), refCount());
        this.warnings.subscribe();
        // TODO: Remove
        this.alerts = Observable
            .create(observer => this.alertObserver = observer).pipe(publish(), refCount());
        this.alerts.subscribe();
        this.router
            .events
            .subscribe(event => {
            if (event instanceof NavigationStart) {
                // if there is no longer a preserve alerts setting for the page then clear all observers and preserved messages
                if (!this.preserveAlerts) {
                    this.clear();
                }
                // if not, then set the preserving of alerts to false so rendering to a new page
                this.preserveAlerts = false;
            }
        });
    }
    clear() {
        this.successObserver.next(null);
        this.errorObserver.next(null);
        this.warningObserver.next(null);
        this.preservedError = '';
        this.preservedWarning = '';
        this.preservedSuccess = '';
        // EUI-3381.
        this.alertObserver.next(null);
        this.message = '';
    }
    error({ phrase, replacements }) {
        const message = this.getTranslationWithReplacements(phrase, replacements);
        this.preservedError = this.preserveMessages(message);
        const alert = { level: 'error', message };
        this.errorObserver.next(alert);
        // EUI-3381.
        this.push(alert);
    }
    warning({ phrase, replacements }) {
        const message = this.getTranslationWithReplacements(phrase, replacements);
        this.preservedWarning = this.preserveMessages(message);
        const alert = { level: 'warning', message };
        this.warningObserver.next(alert);
        // EUI-3381.
        this.push(alert);
    }
    success({ preserve, phrase, replacements }) {
        const message = this.getTranslationWithReplacements(phrase, replacements);
        this.preserveAlerts = preserve || this.preserveAlerts;
        const alert = { level: 'success', message };
        this.preservedSuccess = this.preserveMessages(message);
        this.successObserver.next(alert);
        // EUI-3381.
        this.push(alert);
    }
    getTranslationWithReplacements(phrase, replacements) {
        let message;
        if (replacements) {
            this.rpxTranslationService.getTranslationWithReplacements$(phrase, replacements).subscribe(translation => {
                message = translation;
            });
        }
        else {
            this.rpxTranslationService.getTranslation$(phrase).subscribe(translation => {
                message = translation;
            });
        }
        return message;
    }
    setPreserveAlerts(preserve, urlInfo) {
        // if there is no url setting then just preserve the messages
        if (!urlInfo) {
            this.preserveAlerts = preserve;
        }
        else {
            // check if the url includes the sting given
            this.preserveAlerts = this.currentUrlIncludesInfo(preserve, urlInfo);
        }
    }
    currentUrlIncludesInfo(preserve, urlInfo) {
        // loop through the list of strings and check the router includes all of them
        for (const urlSnip of urlInfo) {
            if (!this.router.url.includes(urlSnip)) {
                // return the opposite boolean value if the router does not include one of the strings
                return !preserve;
            }
        }
        // return the boolean value if all strings are in the url
        return preserve;
    }
    isPreserveAlerts() {
        return this.preserveAlerts;
    }
    preserveMessages(message) {
        // preserve the messages if set to preserve them
        if (this.isPreserveAlerts()) {
            return message;
        }
        else {
            return '';
        }
    }
    // TODO: Remove
    push(msgObject) {
        this.message = msgObject.message;
        this.level = msgObject.level;
        this.alertObserver.next({
            level: this.level,
            message: this.message
        });
    }
}
AlertService.ɵfac = function AlertService_Factory(t) { return new (t || AlertService)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.RpxTranslationService)); };
AlertService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AlertService, factory: AlertService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertService, [{
        type: Injectable
    }], function () { return [{ type: i1.Router }, { type: i2.RpxTranslationService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvYWxlcnQvYWxlcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDNUQsT0FBTyxFQUF5QixVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU1uRCxNQUFNLE9BQU8sWUFBWTtJQXdCdkIsWUFBNkIsTUFBYyxFQUFtQixxQkFBNEM7UUFBN0UsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFtQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBdkIxRyx5QkFBeUI7UUFDbEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQWtCckIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFJN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVO2FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUN2RCxPQUFPLEVBQUUsRUFDVCxRQUFRLEVBQUUsQ0FDWCxDQUFDO1FBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVU7YUFDckIsTUFBTSxDQUFDLFFBQVEs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WixZQUFZO3VGQUFaLFlBQVk7Y0FEeEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25TdGFydCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQ29ubmVjdGFibGVPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgcHVibGlzaCwgcmVmQ291bnQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbGVydExldmVsIH0gZnJvbSAnLi4vLi4vZG9tYWluL2FsZXJ0L2FsZXJ0LWxldmVsLm1vZGVsJztcbmltcG9ydCB7IEFsZXJ0U3RhdHVzUGFyYW1zIH0gZnJvbSAnLi4vLi4vZG9tYWluL2FsZXJ0L2FsZXJ0LXN0YXR1cy1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuLi8uLi9kb21haW4vYWxlcnQvYWxlcnQubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWxlcnRTZXJ2aWNlIHtcbiAgLy8gdGhlIHByZXNlcnZlZCBtZXNzYWdlc1xuICBwdWJsaWMgcHJlc2VydmVkRXJyb3IgPSAnJztcbiAgcHVibGljIHByZXNlcnZlZFdhcm5pbmcgPSAnJztcbiAgcHVibGljIHByZXNlcnZlZFN1Y2Nlc3MgPSAnJztcblxuICAvLyBUT0RPOiBSZW1vdmVcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIGxldmVsOiBBbGVydExldmVsO1xuXG4gIHB1YmxpYyBzdWNjZXNzZXM6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxBbGVydD47XG4gIHB1YmxpYyBlcnJvcnM6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxBbGVydD47XG4gIHB1YmxpYyB3YXJuaW5nczogQ29ubmVjdGFibGVPYnNlcnZhYmxlPEFsZXJ0PjtcbiAgLy8gVE9ETzogUmVtb3ZlXG4gIHB1YmxpYyBhbGVydHM6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxBbGVydD47XG5cbiAgcHJpdmF0ZSBzdWNjZXNzT2JzZXJ2ZXI6IE9ic2VydmVyPEFsZXJ0PjtcbiAgcHJpdmF0ZSBlcnJvck9ic2VydmVyOiBPYnNlcnZlcjxBbGVydD47XG4gIHByaXZhdGUgd2FybmluZ09ic2VydmVyOiBPYnNlcnZlcjxBbGVydD47XG4gIC8vIFRPRE86IFJlbW92ZVxuICBwcml2YXRlIGFsZXJ0T2JzZXJ2ZXI6IE9ic2VydmVyPEFsZXJ0PjtcblxuICBwcml2YXRlIHByZXNlcnZlQWxlcnRzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByZWFkb25seSBycHhUcmFuc2xhdGlvblNlcnZpY2U6IFJweFRyYW5zbGF0aW9uU2VydmljZSkge1xuXG4gICAgdGhpcy5zdWNjZXNzZXMgPSBPYnNlcnZhYmxlXG4gICAgICAuY3JlYXRlKG9ic2VydmVyID0+IHRoaXMuc3VjY2Vzc09ic2VydmVyID0gb2JzZXJ2ZXIpLnBpcGUoXG4gICAgICAgIHB1Ymxpc2goKSxcbiAgICAgICAgcmVmQ291bnQoKVxuICAgICAgKTtcbiAgICB0aGlzLnN1Y2Nlc3Nlcy5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuZXJyb3JzID0gT2JzZXJ2YWJsZVxuICAgICAgLmNyZWF0ZShvYnNlcnZlciA9PiB0aGlzLmVycm9yT2JzZXJ2ZXIgPSBvYnNlcnZlcikucGlwZShcbiAgICAgICAgcHVibGlzaCgpLFxuICAgICAgICByZWZDb3VudCgpXG4gICAgICApO1xuICAgIHRoaXMuZXJyb3JzLnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy53YXJuaW5ncyA9IE9ic2VydmFibGVcbiAgICAgIC5jcmVhdGUob2JzZXJ2ZXIgPT4gdGhpcy53YXJuaW5nT2JzZXJ2ZXIgPSBvYnNlcnZlcikucGlwZShcbiAgICAgICAgcHVibGlzaCgpLFxuICAgICAgICByZWZDb3VudCgpXG4gICAgICApO1xuICAgIHRoaXMud2FybmluZ3Muc3Vic2NyaWJlKCk7XG5cbiAgICAvLyBUT0RPOiBSZW1vdmVcbiAgICB0aGlzLmFsZXJ0cyA9IE9ic2VydmFibGVcbiAgICAgIC5jcmVhdGUob2JzZXJ2ZXIgPT4gdGhpcy5hbGVydE9ic2VydmVyID0gb2JzZXJ2ZXIpLnBpcGUoXG4gICAgICAgIHB1Ymxpc2goKSxcbiAgICAgICAgcmVmQ291bnQoKVxuICAgICAgKTtcbiAgICB0aGlzLmFsZXJ0cy5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMucm91dGVyXG4gICAgICAuZXZlbnRzXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gbG9uZ2VyIGEgcHJlc2VydmUgYWxlcnRzIHNldHRpbmcgZm9yIHRoZSBwYWdlIHRoZW4gY2xlYXIgYWxsIG9ic2VydmVycyBhbmQgcHJlc2VydmVkIG1lc3NhZ2VzXG4gICAgICAgICAgaWYgKCF0aGlzLnByZXNlcnZlQWxlcnRzKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIG5vdCwgdGhlbiBzZXQgdGhlIHByZXNlcnZpbmcgb2YgYWxlcnRzIHRvIGZhbHNlIHNvIHJlbmRlcmluZyB0byBhIG5ldyBwYWdlXG4gICAgICAgICAgdGhpcy5wcmVzZXJ2ZUFsZXJ0cyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLnN1Y2Nlc3NPYnNlcnZlci5uZXh0KG51bGwpO1xuICAgIHRoaXMuZXJyb3JPYnNlcnZlci5uZXh0KG51bGwpO1xuICAgIHRoaXMud2FybmluZ09ic2VydmVyLm5leHQobnVsbCk7XG4gICAgdGhpcy5wcmVzZXJ2ZWRFcnJvciA9ICcnO1xuICAgIHRoaXMucHJlc2VydmVkV2FybmluZyA9ICcnO1xuICAgIHRoaXMucHJlc2VydmVkU3VjY2VzcyA9ICcnO1xuXG4gICAgLy8gRVVJLTMzODEuXG4gICAgdGhpcy5hbGVydE9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gIH1cblxuICBwdWJsaWMgZXJyb3IoeyBwaHJhc2UsIHJlcGxhY2VtZW50c306IE9taXQ8QWxlcnRTdGF0dXNQYXJhbXMsICdwcmVzZXJ2ZSc+KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuZ2V0VHJhbnNsYXRpb25XaXRoUmVwbGFjZW1lbnRzKHBocmFzZSwgcmVwbGFjZW1lbnRzKTtcblxuICAgIHRoaXMucHJlc2VydmVkRXJyb3IgPSB0aGlzLnByZXNlcnZlTWVzc2FnZXMobWVzc2FnZSk7XG4gICAgY29uc3QgYWxlcnQ6IEFsZXJ0ID0geyBsZXZlbDogJ2Vycm9yJywgbWVzc2FnZSB9O1xuICAgIHRoaXMuZXJyb3JPYnNlcnZlci5uZXh0KGFsZXJ0KTtcblxuICAgIC8vIEVVSS0zMzgxLlxuICAgIHRoaXMucHVzaChhbGVydCk7XG4gIH1cblxuICBwdWJsaWMgd2FybmluZyh7IHBocmFzZSwgcmVwbGFjZW1lbnRzfTogT21pdDxBbGVydFN0YXR1c1BhcmFtcywgJ3ByZXNlcnZlJz4pOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5nZXRUcmFuc2xhdGlvbldpdGhSZXBsYWNlbWVudHMocGhyYXNlLCByZXBsYWNlbWVudHMpO1xuXG4gICAgdGhpcy5wcmVzZXJ2ZWRXYXJuaW5nID0gdGhpcy5wcmVzZXJ2ZU1lc3NhZ2VzKG1lc3NhZ2UpO1xuICAgIGNvbnN0IGFsZXJ0OiBBbGVydCA9IHsgbGV2ZWw6ICd3YXJuaW5nJywgbWVzc2FnZSB9O1xuICAgIHRoaXMud2FybmluZ09ic2VydmVyLm5leHQoYWxlcnQpO1xuXG4gICAgLy8gRVVJLTMzODEuXG4gICAgdGhpcy5wdXNoKGFsZXJ0KTtcbiAgfVxuXG4gIHB1YmxpYyBzdWNjZXNzKHsgcHJlc2VydmUsIHBocmFzZSwgcmVwbGFjZW1lbnRzfTogQWxlcnRTdGF0dXNQYXJhbXMpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5nZXRUcmFuc2xhdGlvbldpdGhSZXBsYWNlbWVudHMocGhyYXNlLCByZXBsYWNlbWVudHMpO1xuXG4gICAgdGhpcy5wcmVzZXJ2ZUFsZXJ0cyA9IHByZXNlcnZlIHx8IHRoaXMucHJlc2VydmVBbGVydHM7XG4gICAgY29uc3QgYWxlcnQ6IEFsZXJ0ID0geyBsZXZlbDogJ3N1Y2Nlc3MnLCBtZXNzYWdlIH07XG4gICAgdGhpcy5wcmVzZXJ2ZWRTdWNjZXNzID0gdGhpcy5wcmVzZXJ2ZU1lc3NhZ2VzKG1lc3NhZ2UpO1xuICAgIHRoaXMuc3VjY2Vzc09ic2VydmVyLm5leHQoYWxlcnQpO1xuXG4gICAgLy8gRVVJLTMzODEuXG4gICAgdGhpcy5wdXNoKGFsZXJ0KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhbnNsYXRpb25XaXRoUmVwbGFjZW1lbnRzKHBocmFzZTogc3RyaW5nLCByZXBsYWNlbWVudHM6IEFsZXJ0U3RhdHVzUGFyYW1zWydyZXBsYWNlbWVudHMnXSk6IHN0cmluZyB7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBpZiAocmVwbGFjZW1lbnRzKSB7XG4gICAgICB0aGlzLnJweFRyYW5zbGF0aW9uU2VydmljZS5nZXRUcmFuc2xhdGlvbldpdGhSZXBsYWNlbWVudHMkKHBocmFzZSwgcmVwbGFjZW1lbnRzKS5zdWJzY3JpYmUodHJhbnNsYXRpb24gPT4ge1xuICAgICAgICBtZXNzYWdlID0gdHJhbnNsYXRpb247XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ycHhUcmFuc2xhdGlvblNlcnZpY2UuZ2V0VHJhbnNsYXRpb24kKHBocmFzZSkuc3Vic2NyaWJlKHRyYW5zbGF0aW9uID0+IHtcbiAgICAgICAgbWVzc2FnZSA9IHRyYW5zbGF0aW9uO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2U7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJlc2VydmVBbGVydHMocHJlc2VydmU6IGJvb2xlYW4sIHVybEluZm8/OiBzdHJpbmdbXSkge1xuICAgIC8vIGlmIHRoZXJlIGlzIG5vIHVybCBzZXR0aW5nIHRoZW4ganVzdCBwcmVzZXJ2ZSB0aGUgbWVzc2FnZXNcbiAgICBpZiAoIXVybEluZm8pIHtcbiAgICAgIHRoaXMucHJlc2VydmVBbGVydHMgPSBwcmVzZXJ2ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2hlY2sgaWYgdGhlIHVybCBpbmNsdWRlcyB0aGUgc3RpbmcgZ2l2ZW5cbiAgICAgIHRoaXMucHJlc2VydmVBbGVydHMgPSB0aGlzLmN1cnJlbnRVcmxJbmNsdWRlc0luZm8ocHJlc2VydmUsIHVybEluZm8pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjdXJyZW50VXJsSW5jbHVkZXNJbmZvKHByZXNlcnZlOiBib29sZWFuLCB1cmxJbmZvOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgbGlzdCBvZiBzdHJpbmdzIGFuZCBjaGVjayB0aGUgcm91dGVyIGluY2x1ZGVzIGFsbCBvZiB0aGVtXG4gICAgZm9yIChjb25zdCB1cmxTbmlwIG9mIHVybEluZm8pIHtcbiAgICAgIGlmICghdGhpcy5yb3V0ZXIudXJsLmluY2x1ZGVzKHVybFNuaXApKSB7XG4gICAgICAgIC8vIHJldHVybiB0aGUgb3Bwb3NpdGUgYm9vbGVhbiB2YWx1ZSBpZiB0aGUgcm91dGVyIGRvZXMgbm90IGluY2x1ZGUgb25lIG9mIHRoZSBzdHJpbmdzXG4gICAgICAgIHJldHVybiAhcHJlc2VydmU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiB0aGUgYm9vbGVhbiB2YWx1ZSBpZiBhbGwgc3RyaW5ncyBhcmUgaW4gdGhlIHVybFxuICAgIHJldHVybiBwcmVzZXJ2ZTtcbiAgfVxuXG4gIHB1YmxpYyBpc1ByZXNlcnZlQWxlcnRzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByZXNlcnZlQWxlcnRzO1xuICB9XG5cbiAgcHVibGljIHByZXNlcnZlTWVzc2FnZXMobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBwcmVzZXJ2ZSB0aGUgbWVzc2FnZXMgaWYgc2V0IHRvIHByZXNlcnZlIHRoZW1cbiAgICBpZiAodGhpcy5pc1ByZXNlcnZlQWxlcnRzKCkpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogUmVtb3ZlXG4gIHB1YmxpYyBwdXNoKG1zZ09iamVjdCkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1zZ09iamVjdC5tZXNzYWdlO1xuICAgIHRoaXMubGV2ZWwgPSBtc2dPYmplY3QubGV2ZWw7XG5cbiAgICB0aGlzLmFsZXJ0T2JzZXJ2ZXIubmV4dCh7XG4gICAgICBsZXZlbDogdGhpcy5sZXZlbCxcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZVxuICAgIH0pO1xuICB9XG59XG4iXX0=