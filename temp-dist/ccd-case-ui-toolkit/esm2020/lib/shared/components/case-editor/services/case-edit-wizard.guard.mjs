import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ShowCondition } from '../../../directives/conditional-show/domain/conditional-show.model';
import { AlertService } from '../../../services/alert/alert.service';
import { FieldsUtils } from '../../../services/fields/fields.utils';
import { RouterHelperService } from '../../../services/router/router-helper.service';
import { EventTriggerService } from './event-trigger.service';
import { WizardFactoryService } from './wizard-factory.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../services/router/router-helper.service";
import * as i3 from "./wizard-factory.service";
import * as i4 from "../../../services/alert/alert.service";
import * as i5 from "./event-trigger.service";
export class CaseEditWizardGuard {
    constructor(router, routerHelper, wizardFactory, alertService, eventTriggerService) {
        this.router = router;
        this.routerHelper = routerHelper;
        this.wizardFactory = wizardFactory;
        this.alertService = alertService;
        this.eventTriggerService = eventTriggerService;
    }
    resolve(route) {
        this.eventTriggerService.eventTriggerSource.asObservable().pipe(first()).subscribe(eventTrigger => {
            this.processEventTrigger(route, eventTrigger);
        });
        if (route.parent.data.eventTrigger) {
            this.eventTriggerService.announceEventTrigger(route.parent.data.eventTrigger);
        }
        return Promise.resolve(true);
    }
    processEventTrigger(route, eventTrigger) {
        if (!eventTrigger.hasFields() || !eventTrigger.hasPages()) {
            this.goToSubmit(route);
            return Promise.resolve(false);
        }
        const wizard = this.wizardFactory.create(eventTrigger);
        const currentState = this.buildState(eventTrigger.case_fields);
        // TODO Extract predicate and state creation in a factory
        const canShowPredicate = (page) => {
            return ShowCondition.getInstance(page.show_condition).match(currentState);
        };
        if (!route.params['page']) {
            this.goToFirst(wizard, canShowPredicate, route);
            return Promise.resolve(false);
        }
        const pageId = route.params['page'];
        if (!wizard.hasPage(pageId)) {
            this.goToFirst(wizard, canShowPredicate, route)
                .then(() => {
                const replacements = { PAGEID: pageId };
                this.alertService.error({ phrase: 'No page could be found for %PAGEID%', replacements });
            });
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
    goToFirst(wizard, canShowPredicate, route) {
        const firstPage = wizard.firstPage(canShowPredicate);
        // If there’s no specific wizard page called, it makes another navigation to either the first page available or to the submit page
        // TODO should find a way to navigate to target page without going through the whole loop (and make a second call to BE) again
        return this.router.navigate([...this.parentUrlSegments(route), firstPage ? firstPage.id : 'submit'], { queryParams: route.queryParams });
    }
    goToSubmit(route) {
        return this.router.navigate([...this.parentUrlSegments(route), 'submit'], { queryParams: route.queryParams });
    }
    buildState(caseFields) {
        const state = {};
        /**
         *
         * EUI-4873 SSCS - Dynamic lists in a collection within a complex type
         *
         * Catering for mid event callbacks, hence the call to re-evaluate
         * for DynamicList's
         *
         */
        FieldsUtils.handleNestedDynamicLists({ case_fields: caseFields });
        caseFields.forEach(field => {
            state[field.id] = field.value;
        });
        return state;
    }
    parentUrlSegments(route) {
        return this.routerHelper.getUrlSegmentsFromRoot(route.parent);
    }
}
CaseEditWizardGuard.ɵfac = function CaseEditWizardGuard_Factory(t) { return new (t || CaseEditWizardGuard)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.RouterHelperService), i0.ɵɵinject(i3.WizardFactoryService), i0.ɵɵinject(i4.AlertService), i0.ɵɵinject(i5.EventTriggerService)); };
CaseEditWizardGuard.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CaseEditWizardGuard, factory: CaseEditWizardGuard.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEditWizardGuard, [{
        type: Injectable
    }], function () { return [{ type: i1.Router }, { type: i2.RouterHelperService }, { type: i3.WizardFactoryService }, { type: i4.AlertService }, { type: i5.EventTriggerService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1lZGl0LXdpemFyZC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlLWVkaXQtd2l6YXJkLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFtQyxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBSW5HLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFHckYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7QUFHaEUsTUFBTSxPQUFPLG1CQUFtQjtJQUU5QixZQUNtQixNQUFjLEVBQ2QsWUFBaUMsRUFDakMsYUFBbUMsRUFDbkMsWUFBMEIsRUFDMUIsbUJBQXdDO1FBSnhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDeEQsQ0FBQztJQUVHLE9BQU8sQ0FBQyxLQUE2QjtRQUMxQyxJQUFJLENBQUMs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LENBQUM7SUFFTyxVQUFVLENBQUMsS0FBNkI7UUFDOUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFFTyxVQUFVLENBQUMsVUFBdUI7UUFDeEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCOzs7Ozs7O1dBT0c7UUFDSCxXQUFXLENBQUMsd0JBQXdCLENBQUMsRUFBQyxXQUFXLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUVoRSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQTZCO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7c0ZBdkZVLG1CQUFtQjt5RUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQjt1RkFBbkIsbUJBQW1CO2NBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSZXNvbHZlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTaG93Q29uZGl0aW9uIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9jb25kaXRpb25hbC1zaG93L2RvbWFpbi9jb25kaXRpb25hbC1zaG93Lm1vZGVsJztcbmltcG9ydCB7IENhc2VFdmVudFRyaWdnZXIgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2FzZS12aWV3L2Nhc2UtZXZlbnQtdHJpZ2dlci5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IFByZWRpY2F0ZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9wcmVkaWNhdGUubW9kZWwnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYWxlcnQvYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ZpZWxkcy9maWVsZHMudXRpbHMnO1xuaW1wb3J0IHsgUm91dGVySGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3JvdXRlci9yb3V0ZXItaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2l6YXJkUGFnZSB9IGZyb20gJy4uL2RvbWFpbi93aXphcmQtcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBXaXphcmQgfSBmcm9tICcuLi9kb21haW4vd2l6YXJkLm1vZGVsJztcbmltcG9ydCB7IEV2ZW50VHJpZ2dlclNlcnZpY2UgfSBmcm9tICcuL2V2ZW50LXRyaWdnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXaXphcmRGYWN0b3J5U2VydmljZSB9IGZyb20gJy4vd2l6YXJkLWZhY3Rvcnkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXNlRWRpdFdpemFyZEd1YXJkIGltcGxlbWVudHMgUmVzb2x2ZTxib29sZWFuPiB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlckhlbHBlcjogUm91dGVySGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdpemFyZEZhY3Rvcnk6IFdpemFyZEZhY3RvcnlTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBldmVudFRyaWdnZXJTZXJ2aWNlOiBFdmVudFRyaWdnZXJTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgcmVzb2x2ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMuZXZlbnRUcmlnZ2VyU2VydmljZS5ldmVudFRyaWdnZXJTb3VyY2UuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgIGZpcnN0KCksXG4gICAgKS5zdWJzY3JpYmUoZXZlbnRUcmlnZ2VyID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc0V2ZW50VHJpZ2dlcihyb3V0ZSwgZXZlbnRUcmlnZ2VyKTtcbiAgICB9KTtcbiAgICBpZiAocm91dGUucGFyZW50LmRhdGEuZXZlbnRUcmlnZ2VyKSB7XG4gICAgICB0aGlzLmV2ZW50VHJpZ2dlclNlcnZpY2UuYW5ub3VuY2VFdmVudFRyaWdnZXIocm91dGUucGFyZW50LmRhdGEuZXZlbnRUcmlnZ2VyKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc0V2ZW50VHJpZ2dlcihyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgZXZlbnRUcmlnZ2VyOiBDYXNlRXZlbnRUcmlnZ2VyKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCFldmVudFRyaWdnZXIuaGFzRmllbGRzKCkgfHwgIWV2ZW50VHJpZ2dlci5oYXNQYWdlcygpKSB7XG4gICAgICB0aGlzLmdvVG9TdWJtaXQocm91dGUpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgd2l6YXJkID0gdGhpcy53aXphcmRGYWN0b3J5LmNyZWF0ZShldmVudFRyaWdnZXIpO1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuYnVpbGRTdGF0ZShldmVudFRyaWdnZXIuY2FzZV9maWVsZHMpO1xuICAgIC8vIFRPRE8gRXh0cmFjdCBwcmVkaWNhdGUgYW5kIHN0YXRlIGNyZWF0aW9uIGluIGEgZmFjdG9yeVxuICAgIGNvbnN0IGNhblNob3dQcmVkaWNhdGU6IFByZWRpY2F0ZTxXaXphcmRQYWdlPiA9IChwYWdlOiBXaXphcmRQYWdlKTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gU2hvd0NvbmRpdGlvbi5nZXRJbnN0YW5jZShwYWdlLnNob3dfY29uZGl0aW9uKS5tYXRjaChjdXJyZW50U3RhdGUpO1xuICAgIH07XG5cbiAgICBpZiAoIXJvdXRlLnBhcmFtc1sncGFnZSddKSB7XG4gICAgICB0aGlzLmdvVG9GaXJzdCh3aXphcmQsIGNhblNob3dQcmVkaWNhdGUsIHJvdXRlKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhZ2VJZCA9IHJvdXRlLnBhcmFtc1sncGFnZSddO1xuXG4gICAgaWYgKCF3aXphcmQuaGFzUGFnZShwYWdlSWQpKSB7XG4gICAgICB0aGlzLmdvVG9GaXJzdCh3aXphcmQsIGNhblNob3dQcmVkaWNhdGUsIHJvdXRlKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZW1lbnRzID0geyBQQUdFSUQ6IHBhZ2VJZCB9O1xuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKHsgcGhyYXNlOiAnTm8gcGFnZSBjb3VsZCBiZSBmb3VuZCBmb3IgJVBBR0VJRCUnLCByZXBsYWNlbWVudHMgfSk7XG4gICAgICAgIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9GaXJzdCh3aXphcmQ6IFdpemFyZCwgY2FuU2hvd1ByZWRpY2F0ZTogUHJlZGljYXRlPFdpemFyZFBhZ2U+LCByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGZpcnN0UGFnZSA9IHdpemFyZC5maXJzdFBhZ2UoY2FuU2hvd1ByZWRpY2F0ZSk7XG4gICAgLy8gSWYgdGhlcmXigJlzIG5vIHNwZWNpZmljIHdpemFyZCBwYWdlIGNhbGxlZCwgaXQgbWFrZXMgYW5vdGhlciBuYXZpZ2F0aW9uIHRvIGVpdGhlciB0aGUgZmlyc3QgcGFnZSBhdmFpbGFibGUgb3IgdG8gdGhlIHN1Ym1pdCBwYWdlXG4gICAgLy8gVE9ETyBzaG91bGQgZmluZCBhIHdheSB0byBuYXZpZ2F0ZSB0byB0YXJnZXQgcGFnZSB3aXRob3V0IGdvaW5nIHRocm91Z2ggdGhlIHdob2xlIGxvb3AgKGFuZCBtYWtlIGEgc2Vjb25kIGNhbGwgdG8gQkUpIGFnYWluXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFsuLi50aGlzLnBhcmVudFVybFNlZ21lbnRzKHJvdXRlKSwgZmlyc3RQYWdlID8gZmlyc3RQYWdlLmlkIDogJ3N1Ym1pdCddLFxuICAgICAgeyBxdWVyeVBhcmFtczogcm91dGUucXVlcnlQYXJhbXMgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9TdWJtaXQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWy4uLnRoaXMucGFyZW50VXJsU2VnbWVudHMocm91dGUpLCAnc3VibWl0J10sIHtxdWVyeVBhcmFtczogcm91dGUucXVlcnlQYXJhbXN9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTdGF0ZShjYXNlRmllbGRzOiBDYXNlRmllbGRbXSk6IGFueSB7XG4gICAgY29uc3Qgc3RhdGUgPSB7fTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRVVJLTQ4NzMgU1NDUyAtIER5bmFtaWMgbGlzdHMgaW4gYSBjb2xsZWN0aW9uIHdpdGhpbiBhIGNvbXBsZXggdHlwZVxuICAgICAqXG4gICAgICogQ2F0ZXJpbmcgZm9yIG1pZCBldmVudCBjYWxsYmFja3MsIGhlbmNlIHRoZSBjYWxsIHRvIHJlLWV2YWx1YXRlXG4gICAgICogZm9yIER5bmFtaWNMaXN0J3NcbiAgICAgKlxuICAgICAqL1xuICAgIEZpZWxkc1V0aWxzLmhhbmRsZU5lc3RlZER5bmFtaWNMaXN0cyh7Y2FzZV9maWVsZHM6IGNhc2VGaWVsZHN9KTtcblxuICAgIGNhc2VGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBzdGF0ZVtmaWVsZC5pZF0gPSBmaWVsZC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyZW50VXJsU2VnbWVudHMocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVySGVscGVyLmdldFVybFNlZ21lbnRzRnJvbVJvb3Qocm91dGUucGFyZW50KTtcbiAgfVxufVxuIl19