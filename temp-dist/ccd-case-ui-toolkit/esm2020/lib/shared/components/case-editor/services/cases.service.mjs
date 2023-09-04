import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { AbstractAppConfig } from '../../../../app.config';
import { ShowCondition } from '../../../directives';
import { CaseEventTrigger, Draft } from '../../../domain';
import { FieldsUtils, HttpErrorService, HttpService, LoadingService, OrderService, RetryUtil, SessionStorageService } from '../../../services';
import { CaseAccessUtils } from '../case-access-utils';
import { WizardPageFieldToCaseFieldMapper } from './wizard-page-field-to-case-field.mapper';
import * as i0 from "@angular/core";
import * as i1 from "../../../services";
import * as i2 from "../../../../app.config";
import * as i3 from "./wizard-page-field-to-case-field.mapper";
export class CasesService {
    constructor(http, appConfig, orderService, errorService, wizardPageFieldToCaseFieldMapper, loadingService, sessionStorageService, retryUtil) {
        this.http = http;
        this.appConfig = appConfig;
        this.orderService = orderService;
        this.errorService = errorService;
        this.wizardPageFieldToCaseFieldMapper = wizardPageFieldToCaseFieldMapper;
        this.loadingService = loadingService;
        this.sessionStorageService = sessionStorageService;
        this.retryUtil = retryUtil;
        this.get = this.getCaseView;
    }
    static updateChallengedAccessRequestAttributes(httpClient, caseId, attributesToUpdate) {
        return httpClient.post(`/api/challenged-access-request/update-attributes`, {
            caseId,
            attributesToUpdate
        });
    }
    static updateSpecificAccessRequestAttributes(httpClient, caseId, attributesToUpdate) {
        return httpClient.post(`/api/specific-access-request/update-attributes`, {
            caseId,
            attributesToUpdate
        });
    }
    getCaseView(jurisdictionId, caseTypeId, caseId) {
        const url = `${this.appConfig.getApiUrl()}/caseworkers/:uid/jurisdictions/${jurisdictionId}/case-types/${caseTypeId}/cases/${caseId}`;
        const loadingToken = this.loadingService.register();
        return this.http
            .get(url)
            .pipe(catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }), finalize(() => this.loadingService.unregister(loadingToken)));
    }
    getCaseViewV2(caseId) {
        const url = `${this.appConfig.getCaseDataUrl()}/internal/cases/${caseId}`;
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService.V2_MEDIATYPE_CASE_VIEW)
            .set('Content-Type', 'application/json');
        const loadingToken = this.loadingService.register();
        let http$ = this.http.get(url, { headers, observe: 'body' });
        const artificialDelay = this.appConfig.getTimeoutsCaseRetrievalArtificialDelay();
        const timeoutPeriods = this.appConfig.getTimeoutsForCaseRetrieval();
        console.log(`Timeout periods: ${timeoutPeriods} seconds.`);
        if (timeoutPeriods && timeoutPeriods.length > 0 && timeoutPeriods[0] > 0) {
            http$ = this.retryUtil.pipeTimeoutMechanismOn(http$, artificialDelay, timeoutPeriods);
        }
        else {
            console.warn('Skipping to pipe a retry mechanism!');
        }
        http$ = this.pipeErrorProcessor(http$);
        http$ = http$.pipe(finalize(() => this.finalizeGetCaseViewWith(caseId, loadingToken)));
        return http$;
    }
    pipeErrorProcessor(in$) {
        const out$ = in$.pipe(catchError(error => {
            console.error(`Error while getting case view with getCaseViewV2! Error type: '${typeof error}, Error name: '${error?.name}'`);
            console.error(error);
            this.errorService.setError(error);
            return throwError(error);
        }));
        return out$;
    }
    finalizeGetCaseViewWith(caseId, loadingToken) {
        console.info(`finalizeGetCaseViewWith started for ${caseId}.`);
        this.loadingService.unregister(loadingToken);
        console.info(`finalizeGetCaseViewWith finished for ${caseId}.`);
    }
    getEventTrigger(caseTypeId, eventTriggerId, caseId, ignoreWarning) {
        ignoreWarning = undefined !== ignoreWarning ? ignoreWarning : 'false';
        const url = this.buildEventTriggerUrl(caseTypeId, eventTriggerId, caseId, ignoreWarning);
        let headers = new HttpHeaders();
        headers = headers.set('experimental', 'true');
        headers = headers.set('Content-Type', 'application/json');
        if (Draft.isDraft(caseId)) {
            headers = headers.set('Accept', CasesService.V2_MEDIATYPE_START_DRAFT_TRIGGER);
        }
        else if (caseId !== undefined && caseId !== null) {
            headers = headers.set('Accept', CasesService.V2_MEDIATYPE_START_EVENT_TRIGGER);
        }
        else {
            headers = headers.set('Accept', CasesService.V2_MEDIATYPE_START_CASE_TRIGGER);
        }
        return this.http
            .get(url, { headers, observe: 'body' })
            .pipe(map(body => {
            return FieldsUtils.handleNestedDynamicLists(body);
        }), catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }), map((p) => plainToClass(CaseEventTrigger, p)), tap(eventTrigger => this.initialiseEventTrigger(eventTrigger)));
    }
    createEvent(caseDetails, eventData) {
        const caseId = caseDetails.case_id;
        const url = `${this.appConfig.getCaseDataUrl()}/cases/${caseId}/events`;
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService.V2_MEDIATYPE_CREATE_EVENT)
            .set('Content-Type', 'application/json');
        return this.http
            .post(url, eventData, { headers, observe: 'body' })
            .pipe(catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }));
    }
    validateCase(ctid, eventData, pageId) {
        const pageIdString = pageId ? `?pageId=${pageId}` : '';
        const url = `${this.appConfig.getCaseDataUrl()}/case-types/${ctid}/validate${pageIdString}`;
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService.V2_MEDIATYPE_CASE_DATA_VALIDATE)
            .set('Content-Type', 'application/json');
        return this.http
            .post(url, eventData, { headers, observe: 'body' })
            .pipe(catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }));
    }
    createCase(ctid, eventData) {
        let ignoreWarning = 'false';
        if (eventData.ignore_warning) {
            ignoreWarning = 'true';
        }
        const url = `${this.appConfig.getCaseDataUrl()}/case-types/${ctid}/cases?ignore-warning=${ignoreWarning}`;
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService.V2_MEDIATYPE_CREATE_CASE)
            .set('Content-Type', 'application/json');
        return this.http
            .post(url, eventData, { headers, observe: 'body' })
            .pipe(catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }));
    }
    getPrintDocuments(caseId) {
        const url = `${this.appConfig.getCaseDataUrl()}/cases/${caseId}/documents`;
        const headers = new HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', CasesService.V2_MEDIATYPE_CASE_DOCUMENTS)
            .set('Content-Type', 'application/json');
        return this.http
            .get(url, { headers, observe: 'body' })
            .pipe(map(body => body.documentResources), catchError(error => {
            this.errorService.setError(error);
            return throwError(error);
        }));
    }
    buildEventTriggerUrl(caseTypeId, eventTriggerId, caseId, ignoreWarning) {
        let url = `${this.appConfig.getCaseDataUrl()}/internal`;
        if (Draft.isDraft(caseId)) {
            url += `/drafts/${caseId}`
                + `/event-trigger`
                + `?ignore-warning=${ignoreWarning}`;
        }
        else if (caseTypeId === undefined || caseTypeId === null) {
            url += `/cases/${caseId}`
                + `/event-triggers/${eventTriggerId}`
                + `?ignore-warning=${ignoreWarning}`;
        }
        else {
            url += `/case-types/${caseTypeId}`
                + `/event-triggers/${eventTriggerId}`
                + `?ignore-warning=${ignoreWarning}`;
        }
        return url;
    }
    initialiseEventTrigger(eventTrigger) {
        if (!eventTrigger.wizard_pages) {
            eventTrigger.wizard_pages = [];
        }
        eventTrigger.wizard_pages.forEach((wizardPage) => {
            wizardPage.parsedShowCondition = ShowCondition.getInstance(wizardPage.show_condition);
            wizardPage.case_fields = this.orderService.sort(this.wizardPageFieldToCaseFieldMapper.mapAll(wizardPage.wizard_page_fields, eventTrigger.case_fields));
        });
    }
    /*
    Checks if the user has role of pui-case-manager and returns true or false
    */
    isPuiCaseManager() {
        const userInfoStr = this.sessionStorageService.getItem('userDetails');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            return userInfo && userInfo.roles && (userInfo.roles.indexOf(CasesService.PUI_CASE_MANAGER) !== -1);
        }
        return false;
    }
    getCourtOrHearingCentreName(locationId) {
        return this.http.post(`/api/locations/getLocationsById`, { locations: [{ locationId }] });
    }
    createChallengedAccessRequest(caseId, request) {
        // Assignment API endpoint
        const userInfoStr = this.sessionStorageService.getItem('userDetails');
        const camUtils = new CaseAccessUtils();
        let userInfo;
        if (userInfoStr) {
            userInfo = JSON.parse(userInfoStr);
        }
        const roleCategory = userInfo.roleCategory || camUtils.getMappedRoleCategory(userInfo.roles, userInfo.roleCategories);
        const roleName = camUtils.getAMRoleName('challenged', roleCategory);
        const beginTime = new Date();
        const endTime = new Date(new Date().setUTCHours(23, 59, 59, 999));
        const id = userInfo.id ? userInfo.id : userInfo.uid;
        const isNew = true;
        const payload = camUtils.getAMPayload(id, id, roleName, roleCategory, 'CHALLENGED', caseId, request, beginTime, endTime, isNew);
        return this.http.post(`/api/challenged-access-request`, payload);
    }
    createSpecificAccessRequest(caseId, sar) {
        // Assignment API endpoint
        const userInfoStr = this.sessionStorageService.getItem('userDetails');
        const camUtils = new CaseAccessUtils();
        let userInfo;
        if (userInfoStr) {
            userInfo = JSON.parse(userInfoStr);
        }
        const roleCategory = userInfo.roleCategory || camUtils.getMappedRoleCategory(userInfo.roles, userInfo.roleCategories);
        const roleName = camUtils.getAMRoleName('specific', roleCategory);
        const id = userInfo.id ? userInfo.id : userInfo.uid;
        const payload = camUtils.getAMPayload(null, id, roleName, roleCategory, 'SPECIFIC', caseId, sar, null, null, true);
        payload.roleRequest = {
            ...payload.roleRequest,
            process: 'specific-access',
            replaceExisting: true,
            assignerId: payload.requestedRoles[0].actorId,
            reference: `${caseId}/${roleName}/${payload.requestedRoles[0].actorId}`
        };
        payload.requestedRoles[0] = {
            ...payload.requestedRoles[0],
            roleName: 'specific-access-requested',
            roleCategory,
            classification: 'PRIVATE',
            endTime: new Date(new Date().setDate(new Date().getDate() + 30)),
            beginTime: null,
            grantType: 'BASIC',
            readOnly: true
        };
        payload.requestedRoles[0].attributes = {
            ...payload.requestedRoles[0].attributes,
            requestedRole: roleName,
            specificAccessReason: sar.specificReason
        };
        payload.requestedRoles[0].notes[0] = {
            ...payload.requestedRoles[0].notes[0],
            userId: payload.requestedRoles[0].actorId
        };
        return this.http.post(`/api/specific-access-request`, payload);
    }
    getLinkedCases(caseId) {
        const url = `${this.appConfig.getCaseDataStoreApiUrl()}/${caseId}`;
        return this.http
            .get(url)
            .pipe(catchError(error => throwError(error)));
    }
}
// Internal (UI) API
CasesService.V2_MEDIATYPE_CASE_VIEW = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json';
CasesService.V2_MEDIATYPE_START_CASE_TRIGGER = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8';
CasesService.V2_MEDIATYPE_START_EVENT_TRIGGER = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8';
CasesService.V2_MEDIATYPE_START_DRAFT_TRIGGER = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-draft-trigger.v2+json;charset=UTF-8';
// External (Data Store) API
CasesService.V2_MEDIATYPE_CASE_DOCUMENTS = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.case-documents.v2+json;charset=UTF-8';
CasesService.V2_MEDIATYPE_CASE_DATA_VALIDATE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.case-data-validate.v2+json;charset=UTF-8';
CasesService.V2_MEDIATYPE_CREATE_EVENT = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8';
CasesService.V2_MEDIATYPE_CREATE_CASE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8';
CasesService.PUI_CASE_MANAGER = 'pui-case-manager';
CasesService.ɵfac = function CasesService_Factory(t) { return new (t || CasesService)(i0.ɵɵinject(i1.HttpService), i0.ɵɵinject(i2.AbstractAppConfig), i0.ɵɵinject(i1.OrderService), i0.ɵɵinject(i1.HttpErrorService), i0.ɵɵinject(i3.WizardPageFieldToCaseFieldMapper), i0.ɵɵinject(i1.LoadingService), i0.ɵɵinject(i1.SessionStorageService), i0.ɵɵinject(i1.RetryUtil)); };
CasesService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CasesService, factory: CasesService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CasesService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpService }, { type: i2.AbstractAppConfig }, { type: i1.OrderService }, { type: i1.HttpErrorService }, { type: i3.WizardPageFieldToCaseFieldMapper }, { type: i1.LoadingService }, { type: i1.SessionStorageService }, { type: i1.RetryUtil }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUVMLGdCQUFnQixFQUdTLEtBQUssRUFJL0IsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRS9JLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7QUFHNUYsTUFBTSxPQUFPLFlBQVk7SUEwQ3ZCLFlBQ1UsSUFBaUIsRUFDakIsU0FBNEIsRUFDNUIsWUFBMEIsRUFDMUIsWUFBOEIsRUFDOUIsZ0NBQWtFLEVBQ2xFLGNBQThCLEVBQ3JCLHFC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QXdCLEdBQzdDLG1GQUFtRixDQUFDO0FBRS9ELDZCQUFnQixHQUFHLGtCQUFrQixDQUFDO3dFQXRCbEQsWUFBWTtrRUFBWixZQUFZLFdBQVosWUFBWTt1RkFBWixZQUFZO2NBRHhCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZpbmFsaXplLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBTaG93Q29uZGl0aW9uIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQge1xuICBDYXNlRXZlbnREYXRhLFxuICBDYXNlRXZlbnRUcmlnZ2VyLFxuICBDYXNlUHJpbnREb2N1bWVudCxcbiAgQ2FzZVZpZXcsXG4gIENoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0LCBEcmFmdCxcbiAgUm9sZUFzc2lnbm1lbnRSZXNwb25zZSxcbiAgUm9sZUNhdGVnb3J5LFxuICBSb2xlUmVxdWVzdFBheWxvYWQsIFNwZWNpZmljQWNjZXNzUmVxdWVzdFxufSBmcm9tICcuLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tICcuLi8uLi8uLi9kb21haW4vdXNlci91c2VyLWluZm8ubW9kZWwnO1xuaW1wb3J0IHsgRmllbGRzVXRpbHMsIEh0dHBFcnJvclNlcnZpY2UsIEh0dHBTZXJ2aWNlLCBMb2FkaW5nU2VydmljZSwgT3JkZXJTZXJ2aWNlLCBSZXRyeVV0aWwsIFNlc3Npb25TdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IExpbmtlZENhc2VzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9wYWxldHRlL2xpbmtlZC1jYXNlcy9kb21haW4vbGlua2VkLWNhc2VzLm1vZGVsJztcbmltcG9ydCB7IENhc2VBY2Nlc3NVdGlscyB9IGZyb20gJy4uL2Nhc2UtYWNjZXNzLXV0aWxzJztcbmltcG9ydCB7IFdpemFyZFBhZ2UgfSBmcm9tICcuLi9kb21haW4nO1xuaW1wb3J0IHsgV2l6YXJkUGFnZUZpZWxkVG9DYXNlRmllbGRNYXBwZXIgfSBmcm9tICcuL3dpemFyZC1wYWdlLWZpZWxkLXRvLWNhc2UtZmllbGQubWFwcGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhc2VzU2VydmljZSB7XG4gIC8vIEludGVybmFsIChVSSkgQVBJXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVjJfTUVESUFUWVBFX0NBU0VfVklFVyA9ICdhcHBsaWNhdGlvbi92bmQudWsuZ292LmhtY3RzLmNjZC1kYXRhLXN0b3JlLWFwaS51aS1jYXNlLXZpZXcudjIranNvbic7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVjJfTUVESUFUWVBFX1NUQVJUX0NBU0VfVFJJR0dFUiA9XG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC51ay5nb3YuaG1jdHMuY2NkLWRhdGEtc3RvcmUtYXBpLnVpLXN0YXJ0LWNhc2UtdHJpZ2dlci52Mitqc29uO2NoYXJzZXQ9VVRGLTgnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFYyX01FRElBVFlQRV9TVEFSVF9FVkVOVF9UUklHR0VSID1cbiAgICAnYXBwbGljYXRpb24vdm5kLnVrLmdvdi5obWN0cy5jY2QtZGF0YS1zdG9yZS1hcGkudWktc3RhcnQtZXZlbnQtdHJpZ2dlci52Mitqc29uO2NoYXJzZXQ9VVRGLTgnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFYyX01FRElBVFlQRV9TVEFSVF9EUkFGVF9UUklHR0VSID1cbiAgICAnYXBwbGljYXRpb24vdm5kLnVrLmdvdi5obWN0cy5jY2QtZGF0YS1zdG9yZS1hcGkudWktc3RhcnQtZHJhZnQtdHJpZ2dlci52Mitqc29uO2NoYXJzZXQ9VVRGLTgnO1xuXG4gIC8vIEV4dGVybmFsIChEYXRhIFN0b3JlKSBBUElcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFYyX01FRElBVFlQRV9DQVNFX0RPQ1VNRU5UUyA9XG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC51ay5nb3YuaG1jdHMuY2NkLWRhdGEtc3RvcmUtYXBpLmNhc2UtZG9jdW1lbnRzLnYyK2pzb247Y2hhcnNldD1VVEYtOCc7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBWMl9NRURJQVRZUEVfQ0FTRV9EQVRBX1ZBTElEQVRFID1cbiAgICAnYXBwbGljYXRpb24vdm5kLnVrLmdvdi5obWN0cy5jY2QtZGF0YS1zdG9yZS1hcGkuY2FzZS1kYXRhLXZhbGlkYXRlLnYyK2pzb247Y2hhcnNldD1VVEYtOCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVjJfTUVESUFUWVBFX0NSRUFURV9FVkVOVCA9XG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC51ay5nb3YuaG1jdHMuY2NkLWRhdGEtc3RvcmUtYXBpLmNyZWF0ZS1ldmVudC52Mitqc29uO2NoYXJzZXQ9VVRGLTgnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFYyX01FRElBVFlQRV9DUkVBVEVfQ0FTRSA9XG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC51ay5nb3YuaG1jdHMuY2NkLWRhdGEtc3RvcmUtYXBpLmNyZWF0ZS1jYXNlLnYyK2pzb247Y2hhcnNldD1VVEYtOCc7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQVUlfQ0FTRV9NQU5BR0VSID0gJ3B1aS1jYXNlLW1hbmFnZXInO1xuXG4gIHB1YmxpYyBnZXQgPSB0aGlzLmdldENhc2VWaWV3O1xuXG4gIHB1YmxpYyBzdGF0aWMgdXBkYXRlQ2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3RBdHRyaWJ1dGVzKGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIGNhc2VJZDogc3RyaW5nLCBhdHRyaWJ1dGVzVG9VcGRhdGU6IHsgW3g6IHN0cmluZ106IGFueSB9KVxuICAgIDogT2JzZXJ2YWJsZTxSb2xlQXNzaWdubWVudFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGh0dHBDbGllbnQucG9zdDxSb2xlQXNzaWdubWVudFJlc3BvbnNlPihgL2FwaS9jaGFsbGVuZ2VkLWFjY2Vzcy1yZXF1ZXN0L3VwZGF0ZS1hdHRyaWJ1dGVzYCwge1xuICAgICAgY2FzZUlkLFxuICAgICAgYXR0cmlidXRlc1RvVXBkYXRlXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVwZGF0ZVNwZWNpZmljQWNjZXNzUmVxdWVzdEF0dHJpYnV0ZXMoaHR0cENsaWVudDogSHR0cENsaWVudCwgY2FzZUlkOiBzdHJpbmcsIGF0dHJpYnV0ZXNUb1VwZGF0ZTogeyBbeDogc3RyaW5nXTogYW55IH0pXG4gICAgOiBPYnNlcnZhYmxlPFJvbGVBc3NpZ25tZW50UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gaHR0cENsaWVudC5wb3N0PFJvbGVBc3NpZ25tZW50UmVzcG9uc2U+KGAvYXBpL3NwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0L3VwZGF0ZS1hdHRyaWJ1dGVzYCwge1xuICAgICAgY2FzZUlkLFxuICAgICAgYXR0cmlidXRlc1RvVXBkYXRlXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZyxcbiAgICBwcml2YXRlIG9yZGVyU2VydmljZTogT3JkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXJyb3JTZXJ2aWNlOiBIdHRwRXJyb3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2l6YXJkUGFnZUZpZWxkVG9DYXNlRmllbGRNYXBwZXI6IFdpemFyZFBhZ2VGaWVsZFRvQ2FzZUZpZWxkTWFwcGVyLFxuICAgIHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlOiBTZXNzaW9uU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSByZXRyeVV0aWw6IFJldHJ5VXRpbFxuICApIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYXNlVmlldyhqdXJpc2RpY3Rpb25JZDogc3RyaW5nLFxuICAgIGNhc2VUeXBlSWQ6IHN0cmluZyxcbiAgICBjYXNlSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q2FzZVZpZXc+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRBcGlVcmwoKX0vY2FzZXdvcmtlcnMvOnVpZC9qdXJpc2RpY3Rpb25zLyR7anVyaXNkaWN0aW9uSWR9L2Nhc2UtdHlwZXMvJHtjYXNlVHlwZUlkfS9jYXNlcy8ke2Nhc2VJZH1gO1xuXG4gICAgY29uc3QgbG9hZGluZ1Rva2VuID0gdGhpcy5sb2FkaW5nU2VydmljZS5yZWdpc3RlcigpO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNldEVycm9yKGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pLFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLmxvYWRpbmdTZXJ2aWNlLnVucmVnaXN0ZXIobG9hZGluZ1Rva2VuKSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FzZVZpZXdWMihjYXNlSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q2FzZVZpZXc+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRDYXNlRGF0YVVybCgpfS9pbnRlcm5hbC9jYXNlcy8ke2Nhc2VJZH1gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgLnNldCgnZXhwZXJpbWVudGFsJywgJ3RydWUnKVxuICAgICAgLnNldCgnQWNjZXB0JywgQ2FzZXNTZXJ2aWNlLlYyX01FRElBVFlQRV9DQVNFX1ZJRVcpXG4gICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgY29uc3QgbG9hZGluZ1Rva2VuID0gdGhpcy5sb2FkaW5nU2VydmljZS5yZWdpc3RlcigpO1xuXG4gICAgbGV0IGh0dHAkID0gdGhpcy5odHRwLmdldCh1cmwsIHsgaGVhZGVycywgb2JzZXJ2ZTogJ2JvZHknIH0pO1xuXG4gICAgY29uc3QgYXJ0aWZpY2lhbERlbGF5OiBudW1iZXIgPSB0aGlzLmFwcENvbmZpZy5nZXRUaW1lb3V0c0Nhc2VSZXRyaWV2YWxBcnRpZmljaWFsRGVsYXkoKTtcbiAgICBjb25zdCB0aW1lb3V0UGVyaW9kcyA9IHRoaXMuYXBwQ29uZmlnLmdldFRpbWVvdXRzRm9yQ2FzZVJldHJpZXZhbCgpO1xuICAgIGNvbnNvbGUubG9nKGBUaW1lb3V0IHBlcmlvZHM6ICR7dGltZW91dFBlcmlvZHN9IHNlY29uZHMuYCk7XG4gICAgaWYgKHRpbWVvdXRQZXJpb2RzICYmIHRpbWVvdXRQZXJpb2RzLmxlbmd0aCA+IDAgJiYgdGltZW91dFBlcmlvZHNbMF0gPiAwKSB7XG4gICAgICBodHRwJCA9IHRoaXMucmV0cnlVdGlsLnBpcGVUaW1lb3V0TWVjaGFuaXNtT24oaHR0cCQsIGFydGlmaWNpYWxEZWxheSwgdGltZW91dFBlcmlvZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NraXBwaW5nIHRvIHBpcGUgYSByZXRyeSBtZWNoYW5pc20hJyk7XG4gICAgfVxuXG4gICAgaHR0cCQgPSB0aGlzLnBpcGVFcnJvclByb2Nlc3NvcihodHRwJCk7XG5cbiAgICBodHRwJCA9IGh0dHAkLnBpcGUoZmluYWxpemUoKCkgPT4gdGhpcy5maW5hbGl6ZUdldENhc2VWaWV3V2l0aChjYXNlSWQsIGxvYWRpbmdUb2tlbikpKTtcblxuICAgIHJldHVybiBodHRwJDtcbiAgfVxuXG4gIHByaXZhdGUgcGlwZUVycm9yUHJvY2Vzc29yKGluJDogT2JzZXJ2YWJsZTxDYXNlVmlldz4pOiBPYnNlcnZhYmxlPENhc2VWaWV3PiB7XG4gICAgY29uc3Qgb3V0JCA9IGluJC5waXBlKGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgZ2V0dGluZyBjYXNlIHZpZXcgd2l0aCBnZXRDYXNlVmlld1YyISBFcnJvciB0eXBlOiAnJHt0eXBlb2YgZXJyb3J9LCBFcnJvciBuYW1lOiAnJHtlcnJvcj8ubmFtZX0nYCk7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNldEVycm9yKGVycm9yKTtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIG91dCQ7XG4gIH1cblxuICBwcml2YXRlIGZpbmFsaXplR2V0Q2FzZVZpZXdXaXRoKGNhc2VJZDogc3RyaW5nLCBsb2FkaW5nVG9rZW46IHN0cmluZykge1xuICAgIGNvbnNvbGUuaW5mbyhgZmluYWxpemVHZXRDYXNlVmlld1dpdGggc3RhcnRlZCBmb3IgJHtjYXNlSWR9LmApO1xuICAgIHRoaXMubG9hZGluZ1NlcnZpY2UudW5yZWdpc3Rlcihsb2FkaW5nVG9rZW4pO1xuICAgIGNvbnNvbGUuaW5mbyhgZmluYWxpemVHZXRDYXNlVmlld1dpdGggZmluaXNoZWQgZm9yICR7Y2FzZUlkfS5gKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFdmVudFRyaWdnZXIoY2FzZVR5cGVJZDogc3RyaW5nLFxuICAgIGV2ZW50VHJpZ2dlcklkOiBzdHJpbmcsXG4gICAgY2FzZUlkPzogc3RyaW5nLFxuICAgIGlnbm9yZVdhcm5pbmc/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPENhc2VFdmVudFRyaWdnZXI+IHtcbiAgICBpZ25vcmVXYXJuaW5nID0gdW5kZWZpbmVkICE9PSBpZ25vcmVXYXJuaW5nID8gaWdub3JlV2FybmluZyA6ICdmYWxzZSc7XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkRXZlbnRUcmlnZ2VyVXJsKGNhc2VUeXBlSWQsIGV2ZW50VHJpZ2dlcklkLCBjYXNlSWQsIGlnbm9yZVdhcm5pbmcpO1xuXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ2V4cGVyaW1lbnRhbCcsICd0cnVlJyk7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgaWYgKERyYWZ0LmlzRHJhZnQoY2FzZUlkKSkge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBY2NlcHQnLCBDYXNlc1NlcnZpY2UuVjJfTUVESUFUWVBFX1NUQVJUX0RSQUZUX1RSSUdHRVIpO1xuICAgIH0gZWxzZSBpZiAoY2FzZUlkICE9PSB1bmRlZmluZWQgJiYgY2FzZUlkICE9PSBudWxsKSB7XG4gICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsIENhc2VzU2VydmljZS5WMl9NRURJQVRZUEVfU1RBUlRfRVZFTlRfVFJJR0dFUik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQWNjZXB0JywgQ2FzZXNTZXJ2aWNlLlYyX01FRElBVFlQRV9TVEFSVF9DQVNFX1RSSUdHRVIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsLCB7IGhlYWRlcnMsIG9ic2VydmU6ICdib2R5JyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChib2R5ID0+IHtcbiAgICAgICAgICByZXR1cm4gRmllbGRzVXRpbHMuaGFuZGxlTmVzdGVkRHluYW1pY0xpc3RzKGJvZHkpO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2V0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgocCkgPT4gcGxhaW5Ub0NsYXNzKENhc2VFdmVudFRyaWdnZXIsIHApKSxcbiAgICAgICAgdGFwKGV2ZW50VHJpZ2dlciA9PiB0aGlzLmluaXRpYWxpc2VFdmVudFRyaWdnZXIoZXZlbnRUcmlnZ2VyKSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRXZlbnQoY2FzZURldGFpbHM6IENhc2VWaWV3LCBldmVudERhdGE6IENhc2VFdmVudERhdGEpOiBPYnNlcnZhYmxlPHt9PiB7XG4gICAgY29uc3QgY2FzZUlkID0gY2FzZURldGFpbHMuY2FzZV9pZDtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRDYXNlRGF0YVVybCgpfS9jYXNlcy8ke2Nhc2VJZH0vZXZlbnRzYDtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgLnNldCgnZXhwZXJpbWVudGFsJywgJ3RydWUnKVxuICAgICAgLnNldCgnQWNjZXB0JywgQ2FzZXNTZXJ2aWNlLlYyX01FRElBVFlQRV9DUkVBVEVfRVZFTlQpXG4gICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCBldmVudERhdGEsIHsgaGVhZGVycywgb2JzZXJ2ZTogJ2JvZHknIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2V0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVDYXNlKGN0aWQ6IHN0cmluZywgZXZlbnREYXRhOiBDYXNlRXZlbnREYXRhLCBwYWdlSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG4gICAgY29uc3QgcGFnZUlkU3RyaW5nID0gcGFnZUlkID8gYD9wYWdlSWQ9JHtwYWdlSWR9YCA6ICcnO1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBwQ29uZmlnLmdldENhc2VEYXRhVXJsKCl9L2Nhc2UtdHlwZXMvJHtjdGlkfS92YWxpZGF0ZSR7cGFnZUlkU3RyaW5nfWA7XG5cbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcbiAgICAgIC5zZXQoJ2V4cGVyaW1lbnRhbCcsICd0cnVlJylcbiAgICAgIC5zZXQoJ0FjY2VwdCcsIENhc2VzU2VydmljZS5WMl9NRURJQVRZUEVfQ0FTRV9EQVRBX1ZBTElEQVRFKVxuICAgICAgLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCwgZXZlbnREYXRhLCB7IGhlYWRlcnMsIG9ic2VydmU6ICdib2R5JyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNldEVycm9yKGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUNhc2UoY3RpZDogc3RyaW5nLCBldmVudERhdGE6IENhc2VFdmVudERhdGEpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgIGxldCBpZ25vcmVXYXJuaW5nID0gJ2ZhbHNlJztcblxuICAgIGlmIChldmVudERhdGEuaWdub3JlX3dhcm5pbmcpIHtcbiAgICAgIGlnbm9yZVdhcm5pbmcgPSAndHJ1ZSc7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBwQ29uZmlnLmdldENhc2VEYXRhVXJsKCl9L2Nhc2UtdHlwZXMvJHtjdGlkfS9jYXNlcz9pZ25vcmUtd2FybmluZz0ke2lnbm9yZVdhcm5pbmd9YDtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICAgLnNldCgnZXhwZXJpbWVudGFsJywgJ3RydWUnKVxuICAgICAgLnNldCgnQWNjZXB0JywgQ2FzZXNTZXJ2aWNlLlYyX01FRElBVFlQRV9DUkVBVEVfQ0FTRSlcbiAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsIGV2ZW50RGF0YSwgeyBoZWFkZXJzLCBvYnNlcnZlOiAnYm9keScgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zZXRFcnJvcihlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcmludERvY3VtZW50cyhjYXNlSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q2FzZVByaW50RG9jdW1lbnRbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBwQ29uZmlnLmdldENhc2VEYXRhVXJsKCl9L2Nhc2VzLyR7Y2FzZUlkfS9kb2N1bWVudHNgO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgICAuc2V0KCdleHBlcmltZW50YWwnLCAndHJ1ZScpXG4gICAgICAuc2V0KCdBY2NlcHQnLCBDYXNlc1NlcnZpY2UuVjJfTUVESUFUWVBFX0NBU0VfRE9DVU1FTlRTKVxuICAgICAgLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsLCB7IGhlYWRlcnMsIG9ic2VydmU6ICdib2R5JyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChib2R5ID0+IGJvZHkuZG9jdW1lbnRSZXNvdXJjZXMpLFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zZXRFcnJvcihlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRFdmVudFRyaWdnZXJVcmwoY2FzZVR5cGVJZDogc3RyaW5nLFxuICAgIGV2ZW50VHJpZ2dlcklkOiBzdHJpbmcsXG4gICAgY2FzZUlkPzogc3RyaW5nLFxuICAgIGlnbm9yZVdhcm5pbmc/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRDYXNlRGF0YVVybCgpfS9pbnRlcm5hbGA7XG5cbiAgICBpZiAoRHJhZnQuaXNEcmFmdChjYXNlSWQpKSB7XG4gICAgICB1cmwgKz0gYC9kcmFmdHMvJHtjYXNlSWR9YFxuICAgICAgICArIGAvZXZlbnQtdHJpZ2dlcmBcbiAgICAgICAgKyBgP2lnbm9yZS13YXJuaW5nPSR7aWdub3JlV2FybmluZ31gO1xuICAgIH0gZWxzZSBpZiAoY2FzZVR5cGVJZCA9PT0gdW5kZWZpbmVkIHx8IGNhc2VUeXBlSWQgPT09IG51bGwpIHtcbiAgICAgIHVybCArPSBgL2Nhc2VzLyR7Y2FzZUlkfWBcbiAgICAgICAgKyBgL2V2ZW50LXRyaWdnZXJzLyR7ZXZlbnRUcmlnZ2VySWR9YFxuICAgICAgICArIGA/aWdub3JlLXdhcm5pbmc9JHtpZ25vcmVXYXJuaW5nfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCArPSBgL2Nhc2UtdHlwZXMvJHtjYXNlVHlwZUlkfWBcbiAgICAgICAgKyBgL2V2ZW50LXRyaWdnZXJzLyR7ZXZlbnRUcmlnZ2VySWR9YFxuICAgICAgICArIGA/aWdub3JlLXdhcm5pbmc9JHtpZ25vcmVXYXJuaW5nfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGlzZUV2ZW50VHJpZ2dlcihldmVudFRyaWdnZXI6IENhc2VFdmVudFRyaWdnZXIpIHtcbiAgICBpZiAoIWV2ZW50VHJpZ2dlci53aXphcmRfcGFnZXMpIHtcbiAgICAgIGV2ZW50VHJpZ2dlci53aXphcmRfcGFnZXMgPSBbXTtcbiAgICB9XG5cbiAgICBldmVudFRyaWdnZXIud2l6YXJkX3BhZ2VzLmZvckVhY2goKHdpemFyZFBhZ2U6IFdpemFyZFBhZ2UpID0+IHtcbiAgICAgIHdpemFyZFBhZ2UucGFyc2VkU2hvd0NvbmRpdGlvbiA9IFNob3dDb25kaXRpb24uZ2V0SW5zdGFuY2Uod2l6YXJkUGFnZS5zaG93X2NvbmRpdGlvbik7XG4gICAgICB3aXphcmRQYWdlLmNhc2VfZmllbGRzID0gdGhpcy5vcmRlclNlcnZpY2Uuc29ydChcbiAgICAgICAgdGhpcy53aXphcmRQYWdlRmllbGRUb0Nhc2VGaWVsZE1hcHBlci5tYXBBbGwod2l6YXJkUGFnZS53aXphcmRfcGFnZV9maWVsZHMsIGV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcykpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgQ2hlY2tzIGlmIHRoZSB1c2VyIGhhcyByb2xlIG9mIHB1aS1jYXNlLW1hbmFnZXIgYW5kIHJldHVybnMgdHJ1ZSBvciBmYWxzZVxuICAqL1xuICBwcml2YXRlIGlzUHVpQ2FzZU1hbmFnZXIoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdXNlckluZm9TdHIgPSB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5nZXRJdGVtKCd1c2VyRGV0YWlscycpO1xuICAgIGlmICh1c2VySW5mb1N0cikge1xuICAgICAgY29uc3QgdXNlckluZm86IFVzZXJJbmZvID0gSlNPTi5wYXJzZSh1c2VySW5mb1N0cik7XG4gICAgICByZXR1cm4gdXNlckluZm8gJiYgdXNlckluZm8ucm9sZXMgJiYgKHVzZXJJbmZvLnJvbGVzLmluZGV4T2YoQ2FzZXNTZXJ2aWNlLlBVSV9DQVNFX01BTkFHRVIpICE9PSAtMSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3VydE9ySGVhcmluZ0NlbnRyZU5hbWUobG9jYXRpb25JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYC9hcGkvbG9jYXRpb25zL2dldExvY2F0aW9uc0J5SWRgLCB7IGxvY2F0aW9uczogW3sgbG9jYXRpb25JZCB9XSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVDaGFsbGVuZ2VkQWNjZXNzUmVxdWVzdChjYXNlSWQ6IHN0cmluZywgcmVxdWVzdDogQ2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3QpOiBPYnNlcnZhYmxlPFJvbGVBc3NpZ25tZW50UmVzcG9uc2U+IHtcbiAgICAvLyBBc3NpZ25tZW50IEFQSSBlbmRwb2ludFxuICAgIGNvbnN0IHVzZXJJbmZvU3RyID0gdGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbSgndXNlckRldGFpbHMnKTtcblxuICAgIGNvbnN0IGNhbVV0aWxzID0gbmV3IENhc2VBY2Nlc3NVdGlscygpO1xuICAgIGxldCB1c2VySW5mbzogVXNlckluZm87XG4gICAgaWYgKHVzZXJJbmZvU3RyKSB7XG4gICAgICB1c2VySW5mbyA9IEpTT04ucGFyc2UodXNlckluZm9TdHIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJvbGVDYXRlZ29yeTogUm9sZUNhdGVnb3J5ID0gdXNlckluZm8ucm9sZUNhdGVnb3J5IHx8IGNhbVV0aWxzLmdldE1hcHBlZFJvbGVDYXRlZ29yeSh1c2VySW5mby5yb2xlcywgdXNlckluZm8ucm9sZUNhdGVnb3JpZXMpO1xuICAgIGNvbnN0IHJvbGVOYW1lID0gY2FtVXRpbHMuZ2V0QU1Sb2xlTmFtZSgnY2hhbGxlbmdlZCcsIHJvbGVDYXRlZ29yeSk7XG4gICAgY29uc3QgYmVnaW5UaW1lID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBlbmRUaW1lID0gbmV3IERhdGUobmV3IERhdGUoKS5zZXRVVENIb3VycygyMywgNTksIDU5LCA5OTkpKTtcbiAgICBjb25zdCBpZCA9IHVzZXJJbmZvLmlkID8gdXNlckluZm8uaWQgOiB1c2VySW5mby51aWQ7XG4gICAgY29uc3QgaXNOZXcgPSB0cnVlO1xuXG4gICAgY29uc3QgcGF5bG9hZDogUm9sZVJlcXVlc3RQYXlsb2FkID0gY2FtVXRpbHMuZ2V0QU1QYXlsb2FkKGlkLFxuICAgICAgaWQsXG4gICAgICByb2xlTmFtZSxcbiAgICAgIHJvbGVDYXRlZ29yeSxcbiAgICAgICdDSEFMTEVOR0VEJyxcbiAgICAgIGNhc2VJZCxcbiAgICAgIHJlcXVlc3QsXG4gICAgICBiZWdpblRpbWUsXG4gICAgICBlbmRUaW1lLFxuICAgICAgaXNOZXdcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAvYXBpL2NoYWxsZW5nZWQtYWNjZXNzLXJlcXVlc3RgLCBwYXlsb2FkKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVTcGVjaWZpY0FjY2Vzc1JlcXVlc3QoY2FzZUlkOiBzdHJpbmcsIHNhcjogU3BlY2lmaWNBY2Nlc3NSZXF1ZXN0KTogT2JzZXJ2YWJsZTxSb2xlQXNzaWdubWVudFJlc3BvbnNlPiB7XG4gICAgLy8gQXNzaWdubWVudCBBUEkgZW5kcG9pbnRcbiAgICBjb25zdCB1c2VySW5mb1N0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmdldEl0ZW0oJ3VzZXJEZXRhaWxzJyk7XG5cbiAgICBjb25zdCBjYW1VdGlscyA9IG5ldyBDYXNlQWNjZXNzVXRpbHMoKTtcbiAgICBsZXQgdXNlckluZm86IFVzZXJJbmZvO1xuICAgIGlmICh1c2VySW5mb1N0cikge1xuICAgICAgdXNlckluZm8gPSBKU09OLnBhcnNlKHVzZXJJbmZvU3RyKTtcbiAgICB9XG5cbiAgICBjb25zdCByb2xlQ2F0ZWdvcnk6IFJvbGVDYXRlZ29yeSA9IHVzZXJJbmZvLnJvbGVDYXRlZ29yeSB8fCBjYW1VdGlscy5nZXRNYXBwZWRSb2xlQ2F0ZWdvcnkodXNlckluZm8ucm9sZXMsIHVzZXJJbmZvLnJvbGVDYXRlZ29yaWVzKTtcbiAgICBjb25zdCByb2xlTmFtZSA9IGNhbVV0aWxzLmdldEFNUm9sZU5hbWUoJ3NwZWNpZmljJywgcm9sZUNhdGVnb3J5KTtcbiAgICBjb25zdCBpZCA9IHVzZXJJbmZvLmlkID8gdXNlckluZm8uaWQgOiB1c2VySW5mby51aWQ7XG4gICAgY29uc3QgcGF5bG9hZDogUm9sZVJlcXVlc3RQYXlsb2FkID0gY2FtVXRpbHMuZ2V0QU1QYXlsb2FkKG51bGwsIGlkLFxuICAgICAgcm9sZU5hbWUsIHJvbGVDYXRlZ29yeSwgJ1NQRUNJRklDJywgY2FzZUlkLCBzYXIsIG51bGwsIG51bGwsIHRydWUpO1xuXG4gICAgcGF5bG9hZC5yb2xlUmVxdWVzdCA9IHtcbiAgICAgIC4uLnBheWxvYWQucm9sZVJlcXVlc3QsXG4gICAgICBwcm9jZXNzOiAnc3BlY2lmaWMtYWNjZXNzJyxcbiAgICAgIHJlcGxhY2VFeGlzdGluZzogdHJ1ZSxcbiAgICAgIGFzc2lnbmVySWQ6IHBheWxvYWQucmVxdWVzdGVkUm9sZXNbMF0uYWN0b3JJZCxcbiAgICAgIHJlZmVyZW5jZTogYCR7Y2FzZUlkfS8ke3JvbGVOYW1lfS8ke3BheWxvYWQucmVxdWVzdGVkUm9sZXNbMF0uYWN0b3JJZH1gXG4gICAgfTtcblxuICAgIHBheWxvYWQucmVxdWVzdGVkUm9sZXNbMF0gPSB7XG4gICAgICAuLi5wYXlsb2FkLnJlcXVlc3RlZFJvbGVzWzBdLFxuICAgICAgcm9sZU5hbWU6ICdzcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdGVkJyxcbiAgICAgIHJvbGVDYXRlZ29yeSxcbiAgICAgIGNsYXNzaWZpY2F0aW9uOiAnUFJJVkFURScsXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLnNldERhdGUobmV3IERhdGUoKS5nZXREYXRlKCkgKyAzMCkpLFxuICAgICAgYmVnaW5UaW1lOiBudWxsLFxuICAgICAgZ3JhbnRUeXBlOiAnQkFTSUMnLFxuICAgICAgcmVhZE9ubHk6IHRydWVcbiAgICB9O1xuXG4gICAgcGF5bG9hZC5yZXF1ZXN0ZWRSb2xlc1swXS5hdHRyaWJ1dGVzID0ge1xuICAgICAgLi4ucGF5bG9hZC5yZXF1ZXN0ZWRSb2xlc1swXS5hdHRyaWJ1dGVzLFxuICAgICAgcmVxdWVzdGVkUm9sZTogcm9sZU5hbWUsXG4gICAgICBzcGVjaWZpY0FjY2Vzc1JlYXNvbjogc2FyLnNwZWNpZmljUmVhc29uXG4gICAgfTtcblxuICAgIHBheWxvYWQucmVxdWVzdGVkUm9sZXNbMF0ubm90ZXNbMF0gPSB7XG4gICAgICAuLi5wYXlsb2FkLnJlcXVlc3RlZFJvbGVzWzBdLm5vdGVzWzBdLFxuICAgICAgdXNlcklkOiBwYXlsb2FkLnJlcXVlc3RlZFJvbGVzWzBdLmFjdG9ySWRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgYC9hcGkvc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3RgLFxuICAgICAgcGF5bG9hZFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua2VkQ2FzZXMoY2FzZUlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpbmtlZENhc2VzUmVzcG9uc2U+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwcENvbmZpZy5nZXRDYXNlRGF0YVN0b3JlQXBpVXJsKCl9LyR7Y2FzZUlkfWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldCh1cmwpXG4gICAgICAucGlwZShjYXRjaEVycm9yKGVycm9yID0+IHRocm93RXJyb3IoZXJyb3IpKSk7XG4gIH1cbn1cbiJdfQ==