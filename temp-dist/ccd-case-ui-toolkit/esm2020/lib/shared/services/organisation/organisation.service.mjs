import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { catchError, map, publishReplay, refCount, take } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../app.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../../app.config";
export class OrganisationService {
    constructor(http, appconfig) {
        this.http = http;
        this.appconfig = appconfig;
    }
    static mapOrganisation(organisations) {
        const organisationsVm = new Array();
        organisations.forEach(org => {
            let contactInformation = null;
            if (org.contactInformation && org.contactInformation[0]) {
                contactInformation = org.contactInformation[0];
            }
            organisationsVm.push({
                organisationIdentifier: org.organisationIdentifier,
                name: org.name,
                addressLine1: contactInformation !== null ? contactInformation.addressLine1 : null,
                addressLine2: contactInformation !== null ? contactInformation.addressLine2 : null,
                addressLine3: contactInformation !== null ? contactInformation.addressLine3 : null,
                townCity: contactInformation !== null ? contactInformation.townCity : null,
                county: contactInformation !== null ? contactInformation.county : null,
                country: contactInformation !== null ? contactInformation.country : null,
                postCode: contactInformation !== null ? contactInformation.postCode : null,
            });
        });
        return organisationsVm;
    }
    getActiveOrganisations() {
        if (!this.organisations$) {
            const url = this.appconfig.getPrdUrl();
            const cacheTimeOut = this.appconfig.getCacheTimeOut();
            this.organisations$ = this.http.get(url)
                .pipe(map((orgs) => OrganisationService.mapOrganisation(orgs)), publishReplay(1), refCount(), take(1), catchError(e => {
                console.log(e);
                // Handle error and return blank Observable array
                return of([]);
            }));
            timer(cacheTimeOut).subscribe(() => {
                this.organisations$ = null;
            });
        }
        return this.organisations$;
    }
}
OrganisationService.ɵfac = function OrganisationService_Factory(t) { return new (t || OrganisationService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AbstractAppConfig)); };
OrganisationService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OrganisationService, factory: OrganisationService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrganisationService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pc2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL29yZ2FuaXNhdGlvbi9vcmdhbmlzYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBNkN4RCxNQUFNLE9BQU8sbUJBQW1CO0lBRTVCLFlBQTZCLElBQWdCLEVBQ2hCLFNBQTRCO1FBRDVCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBbUI7SUFBRyxDQUFDO0lBR3RELE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBNkI7UUFDdkQsTUFBTSxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQWtCLENBQUM7UUFDcEQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RELGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxzQkFBc0I7Z0JBQ2xELElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxZQUFZLEVBQUUsa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ2xGLFlBQVksRUFBRSxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDbEYsWUFBWSxFQUFFLGtCQUFrQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNsRixRQUFRLEVBQUUsa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQzFFLE1BQU0sRUFBRSxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDdEUsT0FBTyxFQUFFLGtCQUFrQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN4RSxRQUFRLEVBQUUsa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUk7YUFDN0UsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRU0sc0JBQXNCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFpQixHQUFHLENBQUM7aUJBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM5RCxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixpREFBaUQ7Z0JBQ2pELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOztzRkE1Q1EsbUJBQW1CO3lFQUFuQixtQkFBbUIsV0FBbkIsbUJBQW1CO3VGQUFuQixtQkFBbUI7Y0FEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2FwcC5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9yZ2FuaXNhdGlvblN1cGVyVXNlciB7XG4gICAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gICAgbGFzdE5hbWU6IHN0cmluZztcbiAgICBlbWFpbDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9yZ2FuaXNhdGlvbkFkZHJlc3Mge1xuICAgIGFkZHJlc3NMaW5lMTogc3RyaW5nO1xuICAgIGFkZHJlc3NMaW5lMjogc3RyaW5nO1xuICAgIGFkZHJlc3NMaW5lMzogc3RyaW5nO1xuICAgIHRvd25DaXR5OiBzdHJpbmc7XG4gICAgY291bnR5OiBzdHJpbmc7XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIHBvc3RDb2RlOiBzdHJpbmc7XG4gICAgZHhBZGRyZXNzOiBhbnkgW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3JnYW5pc2F0aW9uIHtcbiAgICBvcmdhbmlzYXRpb25JZGVudGlmaWVyOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHNyYUlkOiBzdHJpbmc7XG4gICAgc3JhUmVndWxhdGVkOiBib29sZWFuO1xuICAgIGNvbXBhbnlOdW1iZXI6IHN0cmluZztcbiAgICBjb21wYW55VXJsOiBzdHJpbmc7XG4gICAgc3VwZXJVc2VyOiBPcmdhbmlzYXRpb25TdXBlclVzZXI7XG4gICAgcGF5bWVudEFjY291bnQ6IHN0cmluZyBbXTtcbiAgICBjb250YWN0SW5mb3JtYXRpb246IE9yZ2FuaXNhdGlvbkFkZHJlc3MgW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3JnYW5pc2F0aW9uVm0ge1xuICAgIG9yZ2FuaXNhdGlvbklkZW50aWZpZXI6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYWRkcmVzc0xpbmUxOiBzdHJpbmc7XG4gICAgYWRkcmVzc0xpbmUyOiBzdHJpbmc7XG4gICAgYWRkcmVzc0xpbmUzOiBzdHJpbmc7XG4gICAgdG93bkNpdHk6IHN0cmluZztcbiAgICBjb3VudHk6IHN0cmluZztcbiAgICBjb3VudHJ5OiBzdHJpbmc7XG4gICAgcG9zdENvZGU6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXNhdGlvblNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwY29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZykge31cblxuICAgIHByaXZhdGUgb3JnYW5pc2F0aW9ucyQ6IE9ic2VydmFibGU8T3JnYW5pc2F0aW9uVm1bXT47XG4gICAgcHVibGljIHN0YXRpYyBtYXBPcmdhbmlzYXRpb24ob3JnYW5pc2F0aW9uczogT3JnYW5pc2F0aW9uW10pOiBPcmdhbmlzYXRpb25WbSBbXSB7XG4gICAgICAgIGNvbnN0IG9yZ2FuaXNhdGlvbnNWbSA9IG5ldyBBcnJheTxPcmdhbmlzYXRpb25WbT4oKTtcbiAgICAgICAgb3JnYW5pc2F0aW9ucy5mb3JFYWNoKG9yZyA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGFjdEluZm9ybWF0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChvcmcuY29udGFjdEluZm9ybWF0aW9uICYmICBvcmcuY29udGFjdEluZm9ybWF0aW9uWzBdKSB7XG4gICAgICAgICAgICAgICAgY29udGFjdEluZm9ybWF0aW9uID0gb3JnLmNvbnRhY3RJbmZvcm1hdGlvblswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9yZ2FuaXNhdGlvbnNWbS5wdXNoKHtcbiAgICAgICAgICAgICAgICBvcmdhbmlzYXRpb25JZGVudGlmaWVyOiBvcmcub3JnYW5pc2F0aW9uSWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICBuYW1lOiBvcmcubmFtZSxcbiAgICAgICAgICAgICAgICBhZGRyZXNzTGluZTE6IGNvbnRhY3RJbmZvcm1hdGlvbiAhPT0gbnVsbCA/IGNvbnRhY3RJbmZvcm1hdGlvbi5hZGRyZXNzTGluZTEgOiBudWxsLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NMaW5lMjogY29udGFjdEluZm9ybWF0aW9uICE9PSBudWxsID8gY29udGFjdEluZm9ybWF0aW9uLmFkZHJlc3NMaW5lMiA6IG51bGwsXG4gICAgICAgICAgICAgICAgYWRkcmVzc0xpbmUzOiBjb250YWN0SW5mb3JtYXRpb24gIT09IG51bGwgPyBjb250YWN0SW5mb3JtYXRpb24uYWRkcmVzc0xpbmUzIDogbnVsbCxcbiAgICAgICAgICAgICAgICB0b3duQ2l0eTogY29udGFjdEluZm9ybWF0aW9uICE9PSBudWxsID8gY29udGFjdEluZm9ybWF0aW9uLnRvd25DaXR5IDogbnVsbCxcbiAgICAgICAgICAgICAgICBjb3VudHk6IGNvbnRhY3RJbmZvcm1hdGlvbiAhPT0gbnVsbCA/IGNvbnRhY3RJbmZvcm1hdGlvbi5jb3VudHkgOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IGNvbnRhY3RJbmZvcm1hdGlvbiAhPT0gbnVsbCA/IGNvbnRhY3RJbmZvcm1hdGlvbi5jb3VudHJ5IDogbnVsbCxcbiAgICAgICAgICAgICAgICBwb3N0Q29kZTogY29udGFjdEluZm9ybWF0aW9uICE9PSBudWxsID8gY29udGFjdEluZm9ybWF0aW9uLnBvc3RDb2RlIDogbnVsbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9yZ2FuaXNhdGlvbnNWbTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWN0aXZlT3JnYW5pc2F0aW9ucygpOiBPYnNlcnZhYmxlPE9yZ2FuaXNhdGlvblZtW10+IHtcbiAgICAgICAgaWYgKCF0aGlzLm9yZ2FuaXNhdGlvbnMkKSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmFwcGNvbmZpZy5nZXRQcmRVcmwoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlVGltZU91dCA9IHRoaXMuYXBwY29uZmlnLmdldENhY2hlVGltZU91dCgpO1xuICAgICAgICAgICAgdGhpcy5vcmdhbmlzYXRpb25zJCA9IHRoaXMuaHR0cC5nZXQ8T3JnYW5pc2F0aW9uW10+KHVybClcbiAgICAgICAgICAgIC5waXBlKG1hcCgob3JncykgPT4gT3JnYW5pc2F0aW9uU2VydmljZS5tYXBPcmdhbmlzYXRpb24ob3JncykpLFxuICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSwgdGFrZSgxKSwgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3IgYW5kIHJldHVybiBibGFuayBPYnNlcnZhYmxlIGFycmF5XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRpbWVyKGNhY2hlVGltZU91dCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZ2FuaXNhdGlvbnMkID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm9yZ2FuaXNhdGlvbnMkO1xuICAgIH1cbn1cbiJdfQ==