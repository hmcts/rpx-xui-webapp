import { Injectable } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseView } from '../../../domain';
import { CasesService } from './cases.service';
import * as i0 from "@angular/core";
import * as i1 from "./cases.service";
export class CaseNotifier {
    constructor(casesService) {
        this.casesService = casesService;
        this.caseViewSource = new BehaviorSubject(new CaseView());
        this.caseView = this.caseViewSource.asObservable();
    }
    removeCachedCase() {
        this.cachedCaseView = null;
    }
    announceCase(c) {
        console.info('announceCase started.');
        this.caseViewSource.next(c);
        console.info('announceCase finished.');
    }
    fetchAndRefresh(cid) {
        console.info('fetchAndRefresh started.');
        return this.casesService
            .getCaseViewV2(cid)
            .pipe(map(caseView => {
            console.info('mapping caseView started.');
            // this.casesService.syncWait(10);
            // throw new Error('******************************************************');
            this.cachedCaseView = plainToClassFromExist(new CaseView(), caseView);
            this.setBasicFields(this.cachedCaseView.tabs);
            this.announceCase(this.cachedCaseView);
            console.info('mapping caseView finished. Returning it.');
            return this.cachedCaseView;
        }));
    }
    setBasicFields(tabs) {
        tabs.forEach((t) => {
            const caseName = t.fields.find(f => f.id === CaseNotifier.CASE_NAME);
            const caseLocation = t.fields.find(f => f.id === CaseNotifier.CASE_LOCATION);
            if (caseName || caseLocation) {
                this.cachedCaseView.basicFields = {
                    caseNameHmctsInternal: caseName ? caseName.value : null,
                    caseManagementLocation: caseLocation ? caseLocation.value : null
                };
            }
        });
    }
}
CaseNotifier.CASE_NAME = 'caseNameHmctsInternal';
CaseNotifier.CASE_LOCATION = 'caseManagementLocation';
CaseNotifier.ɵfac = function CaseNotifier_Factory(t) { return new (t || CaseNotifier)(i0.ɵɵinject(i1.CasesService)); };
CaseNotifier.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseNotifier, factory: CaseNotifier.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseNotifier, [{
        type: Injectable
    }], function () { return [{ type: i1.CasesService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS5ub3RpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlLm5vdGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFXLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBRy9DLE1BQU0sT0FBTyxZQUFZO0lBT3JCLFlBQTZCLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSnRDLG1CQUFjLEdBQThCLElBQUksZUFBZSxDQUFXLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNwRyxhQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUdLLENBQUM7SUFFcEQsZ0JBQWdCO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFTSxZQUFZLENBQUMsQ0FBVztRQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDTSxlQUFlLENBQUMsR0FBVztRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsWUFBWTthQUNyQixhQUFhLENBQUMsR0FBRyxDQUFDO2FBQ2xCLElBQUksQ0FDSCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDMUMsa0NBQWtDO1lBQ2xDLDZFQUE2RTtZQUM3RSxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUN6RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFTSxjQUFjLENBQUMsSUFBZTtRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdFLElBQUksUUFBUSxJQUFJLFlBQVksRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUc7b0JBQ2hDLHFCQUFxQixFQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDeEQsc0JBQXNCLEVBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO2lCQUNsRSxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBOUNzQixzQkFBUyxHQUFHLHVCQUF1QixDQUFDO0FBQ3BDLDBCQUFhLEdBQUcsd0JBQXdCLENBQUM7d0VBRnZELFlBQVk7a0VBQVosWUFBWSxXQUFaLFlBQVk7dUZBQVosWUFBWTtjQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0IH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXNlVGFiLCBDYXNlVmlldyB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBDYXNlc1NlcnZpY2UgfSBmcm9tICcuL2Nhc2VzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FzZU5vdGlmaWVyIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENBU0VfTkFNRSA9ICdjYXNlTmFtZUhtY3RzSW50ZXJuYWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ0FTRV9MT0NBVElPTiA9ICdjYXNlTWFuYWdlbWVudExvY2F0aW9uJztcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VWaWV3U291cmNlOiBCZWhhdmlvclN1YmplY3Q8Q2FzZVZpZXc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDYXNlVmlldz4obmV3IENhc2VWaWV3KCkpO1xuICAgIHB1YmxpYyBjYXNlVmlldyA9IHRoaXMuY2FzZVZpZXdTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgcHVibGljIGNhY2hlZENhc2VWaWV3OiBDYXNlVmlldztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgY2FzZXNTZXJ2aWNlOiBDYXNlc1NlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQ2FjaGVkQ2FzZSgpIHtcbiAgICAgIHRoaXMuY2FjaGVkQ2FzZVZpZXcgPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBhbm5vdW5jZUNhc2UoYzogQ2FzZVZpZXcpIHtcbiAgICAgIGNvbnNvbGUuaW5mbygnYW5ub3VuY2VDYXNlIHN0YXJ0ZWQuJyk7XG4gICAgICB0aGlzLmNhc2VWaWV3U291cmNlLm5leHQoYyk7XG4gICAgICBjb25zb2xlLmluZm8oJ2Fubm91bmNlQ2FzZSBmaW5pc2hlZC4nKTtcbiAgICB9XG4gICAgcHVibGljIGZldGNoQW5kUmVmcmVzaChjaWQ6IHN0cmluZykge1xuICAgICAgY29uc29sZS5pbmZvKCdmZXRjaEFuZFJlZnJlc2ggc3RhcnRlZC4nKTtcbiAgICAgIHJldHVybiB0aGlzLmNhc2VzU2VydmljZVxuICAgICAgICAuZ2V0Q2FzZVZpZXdWMihjaWQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChjYXNlVmlldyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ21hcHBpbmcgY2FzZVZpZXcgc3RhcnRlZC4nKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2FzZXNTZXJ2aWNlLnN5bmNXYWl0KDEwKTtcbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBFcnJvcignKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlZENhc2VWaWV3ID0gcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KG5ldyBDYXNlVmlldygpLCBjYXNlVmlldyk7XG4gICAgICAgICAgICB0aGlzLnNldEJhc2ljRmllbGRzKHRoaXMuY2FjaGVkQ2FzZVZpZXcudGFicyk7XG4gICAgICAgICAgICB0aGlzLmFubm91bmNlQ2FzZSh0aGlzLmNhY2hlZENhc2VWaWV3KTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnbWFwcGluZyBjYXNlVmlldyBmaW5pc2hlZC4gUmV0dXJuaW5nIGl0LicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkQ2FzZVZpZXc7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEJhc2ljRmllbGRzKHRhYnM6IENhc2VUYWJbXSk6IHZvaWQge1xuICAgICAgdGFicy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGNhc2VOYW1lID0gdC5maWVsZHMuZmluZChmID0+IGYuaWQgPT09IENhc2VOb3RpZmllci5DQVNFX05BTUUpO1xuICAgICAgICBjb25zdCBjYXNlTG9jYXRpb24gPSB0LmZpZWxkcy5maW5kKGYgPT4gZi5pZCA9PT0gQ2FzZU5vdGlmaWVyLkNBU0VfTE9DQVRJT04pO1xuICAgICAgICBpZiAoY2FzZU5hbWUgfHwgY2FzZUxvY2F0aW9uKSB7XG4gICAgICAgICAgdGhpcy5jYWNoZWRDYXNlVmlldy5iYXNpY0ZpZWxkcyA9IHtcbiAgICAgICAgICAgIGNhc2VOYW1lSG1jdHNJbnRlcm5hbCA6IGNhc2VOYW1lID8gY2FzZU5hbWUudmFsdWUgOiBudWxsLFxuICAgICAgICAgICAgY2FzZU1hbmFnZW1lbnRMb2NhdGlvbiA6IGNhc2VMb2NhdGlvbiA/IGNhc2VMb2NhdGlvbi52YWx1ZSA6IG51bGxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG59XG4iXX0=