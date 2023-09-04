import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { JurisdictionService, SearchService } from '../../../../services';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services";
export class LinkedCasesService {
    constructor(jurisdictionService, searchService) {
        this.jurisdictionService = jurisdictionService;
        this.searchService = searchService;
        this.caseFieldValue = [];
        this.isLinkedCasesEventTrigger = false;
        this.linkCaseReasons = [];
        this.linkedCases = [];
        this.initialCaseLinks = [];
        this.editMode = false;
        this.jurisdictionsResponse = [];
        this.serverError = null;
        this.serverLinkedApiError = null;
        this.isServerReasonCodeError = false;
        this.caseJurisdictionID = null;
        this.groupLinkedCasesByCaseType = (arrObj, key) => {
            return arrObj.reduce((rv, x) => {
                (rv[x.value[key]] = rv[x.value[key]] || []).push(x.value['CaseReference']);
                return rv;
            }, {});
        };
        this.jurisdictionService.getJurisdictions().subscribe((jurisdictions) => {
            this.jurisdictionsResponse = jurisdictions;
        }, (error) => {
            this.serverJurisdictionError = true;
        });
    }
    constructElasticSearchQuery(caseIds, size) {
        return {
            query: {
                terms: {
                    reference: caseIds,
                },
            },
            size,
        };
    }
    mapResponse(esSearchCasesResponse) {
        const caseInfo = this.caseFieldValue.find(item => item.value && item.value.CaseReference === esSearchCasesResponse.case_id);
        return caseInfo && {
            caseReference: esSearchCasesResponse.case_id,
            caseName: esSearchCasesResponse.case_fields.caseNameHmctsInternal || LinkedCasesService.CASE_NAME_MISSING_TEXT,
            caseType: this.mapLookupIDToValueFromJurisdictions('CASE_TYPE', esSearchCasesResponse.case_fields['[CASE_TYPE]']),
            service: this.mapLookupIDToValueFromJurisdictions('JURISDICTION', esSearchCasesResponse.case_fields['[JURISDICTION]']),
            state: this.mapLookupIDToValueFromJurisdictions('STATE', esSearchCasesResponse.case_fields['[STATE]']),
            reasons: caseInfo?.value?.ReasonForLink
        };
    }
    searchCasesByCaseIds(searchCasesResponse) {
        return forkJoin(searchCasesResponse);
    }
    getAllLinkedCaseInformation() {
        const searchCasesResponse = [];
        const linkedCaseIds = this.groupLinkedCasesByCaseType(this.caseFieldValue, 'CaseType');
        Object.keys(linkedCaseIds).forEach(key => {
            const esQuery = this.constructElasticSearchQuery(linkedCaseIds[key], 100);
            const query = this.searchService.searchCasesByIds(key, esQuery, SearchService.VIEW_WORKBASKET);
            searchCasesResponse.push(query);
        });
        if (searchCasesResponse.length) {
            this.searchCasesByCaseIds(searchCasesResponse).subscribe((searchCases) => {
                const casesResponse = [];
                searchCases.forEach(response => {
                    response.results.forEach((result) => {
                        casesResponse.push(this.mapResponse(result));
                    });
                });
                this.linkedCases = casesResponse.map(item => {
                    return {
                        caseReference: item.caseReference,
                        caseName: item.caseName,
                        caseService: item.service,
                        caseType: item.caseType,
                        unlink: false,
                        reasons: item.reasons && item.reasons.map(reason => {
                            return {
                                Reason: reason
                            };
                        }),
                    };
                });
                this.serverLinkedApiError = null;
            }, err => {
                this.serverLinkedApiError = {
                    id: 'backendError', message: 'Some case information is not available at the moment'
                };
            });
        }
    }
    mapLookupIDToValueFromJurisdictions(fieldName, fieldValue) {
        const selectedJurisdiction = this.jurisdictionsResponse &&
            this.jurisdictionsResponse.find(item => item.id === this.caseDetails.case_type.jurisdiction.id);
        const selectedCaseType = selectedJurisdiction && selectedJurisdiction.caseTypes.find(item => item.id === this.caseDetails.case_type.id);
        const state = selectedCaseType && selectedCaseType.states.find(item => item.id === fieldValue);
        switch (fieldName) {
            case 'JURISDICTION':
                return selectedJurisdiction && selectedJurisdiction.description;
            case 'CASE_TYPE':
                return selectedCaseType && selectedCaseType.name;
            case 'CASE_TYPE_DESCRIPTION':
                return selectedCaseType && selectedCaseType.description;
            case 'STATE':
                return state && state.name || fieldValue;
            case 'STATE_DESCRIPTION':
                return state && state.description || fieldValue;
            default:
                break;
        }
    }
    getCaseName(searchCasesResponse) {
        let caseName = LinkedCasesService.CASE_NAME_MISSING_TEXT;
        const tabs = searchCasesResponse.tabs.filter(tab => {
            const caseNameHmctsInternalField = tab.fields.find(field => field.id === 'caseNameHmctsInternal');
            if (caseNameHmctsInternalField) {
                caseName = caseNameHmctsInternalField.value;
            }
        });
        return caseName;
    }
}
LinkedCasesService.CASE_NAME_MISSING_TEXT = 'Case name missing';
LinkedCasesService.ɵfac = function LinkedCasesService_Factory(t) { return new (t || LinkedCasesService)(i0.ɵɵinject(i1.JurisdictionService), i0.ɵɵinject(i1.SearchService)); };
LinkedCasesService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LinkedCasesService, factory: LinkedCasesService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkedCasesService, [{
        type: Injectable
    }], function () { return [{ type: i1.JurisdictionService }, { type: i1.SearchService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VkLWNhc2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9saW5rZWQtY2FzZXMvc2VydmljZXMvbGlua2VkLWNhc2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSzFFLE1BQU0sT0FBTyxrQkFBa0I7SUFtQjdCLFlBQTZCLG1CQUF3QyxFQUN4QyxhQUE0QjtRQUQ1Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBakJsRCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQiw4QkFBeUIsR0FBRyxLQUFLLENBQUM7UUFJbEMsb0JBQWUsR0FBc0IsRUFBRSxDQUFDO1FBQ3hDLGdCQUFXLEdBQWUsRUFBRSxDQUFDO1FBQzdCLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLDBCQUFxQixHQUFtQixFQUFFLENBQUM7UUFFM0MsZ0JBQVcsR0FBb0MsSUFBSSxDQUFDO1FBQ3BELHlCQUFvQixHQUFvQyxJQUFJLENBQUM7UUFDN0QsNEJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQVcxQiwrQkFBMEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNsRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVB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QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakQsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssdUJBQXVCLENBQUMsQ0FBQztZQUNsRyxJQUFJLDBCQUEwQixFQUFFO2dCQUM5QixRQUFRLEdBQUcsMEJBQTBCLENBQUMsS0FBSyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOztBQXBJdUIseUNBQXNCLEdBQUcsbUJBQW1CLENBQUM7b0ZBRDFELGtCQUFrQjt3RUFBbEIsa0JBQWtCLFdBQWxCLGtCQUFrQjt1RkFBbEIsa0JBQWtCO2NBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FzZVZpZXcgfSBmcm9tICcuLi8uLi8uLi8uLi9kb21haW4vY2FzZS12aWV3JztcbmltcG9ydCB7IEp1cmlzZGljdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2p1cmlzZGljdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBKdXJpc2RpY3Rpb25TZXJ2aWNlLCBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgTG92UmVmRGF0YU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvY29tbW9uLWRhdGEtc2VydmljZS9jb21tb24tZGF0YS1zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VMaW5rLCBFU1F1ZXJ5VHlwZSwgTGlua1JlYXNvbiB9IGZyb20gJy4uL2RvbWFpbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMaW5rZWRDYXNlc1NlcnZpY2Uge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDQVNFX05BTUVfTUlTU0lOR19URVhUID0gJ0Nhc2UgbmFtZSBtaXNzaW5nJztcblxuICBwdWJsaWMgY2FzZUZpZWxkVmFsdWUgPSBbXTtcbiAgcHVibGljIGlzTGlua2VkQ2FzZXNFdmVudFRyaWdnZXIgPSBmYWxzZTtcbiAgcHVibGljIGNhc2VEZXRhaWxzOiBDYXNlVmlldztcbiAgcHVibGljIGNhc2VJZDogc3RyaW5nO1xuICBwdWJsaWMgY2FzZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGxpbmtDYXNlUmVhc29uczogTG92UmVmRGF0YU1vZGVsW10gPSBbXTtcbiAgcHVibGljIGxpbmtlZENhc2VzOiBDYXNlTGlua1tdID0gW107XG4gIHB1YmxpYyBpbml0aWFsQ2FzZUxpbmtzOiBDYXNlTGlua1tdID0gW107XG4gIHB1YmxpYyBlZGl0TW9kZSA9IGZhbHNlO1xuICBwdWJsaWMganVyaXNkaWN0aW9uc1Jlc3BvbnNlOiBKdXJpc2RpY3Rpb25bXSA9IFtdO1xuICBwdWJsaWMgc2VydmVySnVyaXNkaWN0aW9uRXJyb3I6IGJvb2xlYW47XG4gIHB1YmxpYyBzZXJ2ZXJFcnJvcjogeyBpZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcgfSA9IG51bGw7XG4gIHB1YmxpYyBzZXJ2ZXJMaW5rZWRBcGlFcnJvcjogeyBpZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcgfSA9IG51bGw7XG4gIHB1YmxpYyBpc1NlcnZlclJlYXNvbkNvZGVFcnJvciA9IGZhbHNlO1xuICBwdWJsaWMgY2FzZUp1cmlzZGljdGlvbklEID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGp1cmlzZGljdGlvblNlcnZpY2U6IEp1cmlzZGljdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge1xuICAgIHRoaXMuanVyaXNkaWN0aW9uU2VydmljZS5nZXRKdXJpc2RpY3Rpb25zKCkuc3Vic2NyaWJlKChqdXJpc2RpY3Rpb25zKSA9PiB7XG4gICAgICB0aGlzLmp1cmlzZGljdGlvbnNSZXNwb25zZSA9IGp1cmlzZGljdGlvbnM7XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLnNlcnZlckp1cmlzZGljdGlvbkVycm9yID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBncm91cExpbmtlZENhc2VzQnlDYXNlVHlwZSA9IChhcnJPYmosIGtleSkgPT4ge1xuICAgIHJldHVybiBhcnJPYmoucmVkdWNlKChydiwgeCkgPT4ge1xuICAgICAgKHJ2W3gudmFsdWVba2V5XV0gPSBydlt4LnZhbHVlW2tleV1dIHx8IFtdKS5wdXNoKHgudmFsdWVbJ0Nhc2VSZWZlcmVuY2UnXSk7XG4gICAgICByZXR1cm4gcnY7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdEVsYXN0aWNTZWFyY2hRdWVyeShjYXNlSWRzOiBhbnlbXSwgc2l6ZTogbnVtYmVyKTogRVNRdWVyeVR5cGUge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyeToge1xuICAgICAgICB0ZXJtczoge1xuICAgICAgICAgIHJlZmVyZW5jZTogY2FzZUlkcyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBzaXplLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgbWFwUmVzcG9uc2UoZXNTZWFyY2hDYXNlc1Jlc3BvbnNlKTogYW55IHtcbiAgICBjb25zdCBjYXNlSW5mbyA9IHRoaXMuY2FzZUZpZWxkVmFsdWUuZmluZChpdGVtID0+IGl0ZW0udmFsdWUgJiYgaXRlbS52YWx1ZS5DYXNlUmVmZXJlbmNlID09PSBlc1NlYXJjaENhc2VzUmVzcG9uc2UuY2FzZV9pZCk7XG4gICAgcmV0dXJuIGNhc2VJbmZvICYmIHtcbiAgICAgIGNhc2VSZWZlcmVuY2U6IGVzU2VhcmNoQ2FzZXNSZXNwb25zZS5jYXNlX2lkLFxuICAgICAgY2FzZU5hbWU6IGVzU2VhcmNoQ2FzZXNSZXNwb25zZS5jYXNlX2ZpZWxkcy5jYXNlTmFtZUhtY3RzSW50ZXJuYWwgfHwgTGlua2VkQ2FzZXNTZXJ2aWNlLkNBU0VfTkFNRV9NSVNTSU5HX1RFWFQsXG4gICAgICBjYXNlVHlwZTogdGhpcy5tYXBMb29rdXBJRFRvVmFsdWVGcm9tSnVyaXNkaWN0aW9ucygnQ0FTRV9UWVBFJywgZXNTZWFyY2hDYXNlc1Jlc3BvbnNlLmNhc2VfZmllbGRzWydbQ0FTRV9UWVBFXSddKSxcbiAgICAgIHNlcnZpY2U6IHRoaXMubWFwTG9va3VwSURUb1ZhbHVlRnJvbUp1cmlzZGljdGlvbnMoJ0pVUklTRElDVElPTicsIGVzU2VhcmNoQ2FzZXNSZXNwb25zZS5jYXNlX2ZpZWxkc1snW0pVUklTRElDVElPTl0nXSksXG4gICAgICBzdGF0ZTogdGhpcy5tYXBMb29rdXBJRFRvVmFsdWVGcm9tSnVyaXNkaWN0aW9ucygnU1RBVEUnLCBlc1NlYXJjaENhc2VzUmVzcG9uc2UuY2FzZV9maWVsZHNbJ1tTVEFURV0nXSksXG4gICAgICByZWFzb25zOiBjYXNlSW5mbz8udmFsdWU/LlJlYXNvbkZvckxpbmtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHNlYXJjaENhc2VzQnlDYXNlSWRzKHNlYXJjaENhc2VzUmVzcG9uc2U6IGFueVtdKTogT2JzZXJ2YWJsZTx1bmtub3duW10+IHtcbiAgICByZXR1cm4gZm9ya0pvaW4oc2VhcmNoQ2FzZXNSZXNwb25zZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWxsTGlua2VkQ2FzZUluZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlYXJjaENhc2VzUmVzcG9uc2UgPSBbXTtcbiAgICBjb25zdCBsaW5rZWRDYXNlSWRzID0gdGhpcy5ncm91cExpbmtlZENhc2VzQnlDYXNlVHlwZSh0aGlzLmNhc2VGaWVsZFZhbHVlLCAnQ2FzZVR5cGUnKTtcbiAgICBPYmplY3Qua2V5cyhsaW5rZWRDYXNlSWRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBlc1F1ZXJ5ID0gdGhpcy5jb25zdHJ1Y3RFbGFzdGljU2VhcmNoUXVlcnkobGlua2VkQ2FzZUlkc1trZXldLCAxMDApO1xuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoQ2FzZXNCeUlkcyhrZXksIGVzUXVlcnksIFNlYXJjaFNlcnZpY2UuVklFV19XT1JLQkFTS0VUKTtcbiAgICAgIHNlYXJjaENhc2VzUmVzcG9uc2UucHVzaChxdWVyeSk7XG4gICAgfSk7XG4gICAgaWYgKHNlYXJjaENhc2VzUmVzcG9uc2UubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlYXJjaENhc2VzQnlDYXNlSWRzKHNlYXJjaENhc2VzUmVzcG9uc2UpLnN1YnNjcmliZSgoc2VhcmNoQ2FzZXM6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjYXNlc1Jlc3BvbnNlID0gW107XG4gICAgICAgIHNlYXJjaENhc2VzLmZvckVhY2gocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdHMuZm9yRWFjaCgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNhc2VzUmVzcG9uc2UucHVzaCh0aGlzLm1hcFJlc3BvbnNlKHJlc3VsdCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpbmtlZENhc2VzID0gY2FzZXNSZXNwb25zZS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhc2VSZWZlcmVuY2U6IGl0ZW0uY2FzZVJlZmVyZW5jZSxcbiAgICAgICAgICAgIGNhc2VOYW1lOiBpdGVtLmNhc2VOYW1lLFxuICAgICAgICAgICAgY2FzZVNlcnZpY2U6IGl0ZW0uc2VydmljZSxcbiAgICAgICAgICAgIGNhc2VUeXBlOiBpdGVtLmNhc2VUeXBlLFxuICAgICAgICAgICAgdW5saW5rOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYXNvbnM6IGl0ZW0ucmVhc29ucyAmJiBpdGVtLnJlYXNvbnMubWFwKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgUmVhc29uOiByZWFzb25cbiAgICAgICAgICAgICAgfSBhcyBMaW5rUmVhc29uO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfSBhcyBDYXNlTGluaztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VydmVyTGlua2VkQXBpRXJyb3IgPSBudWxsO1xuICAgICAgfSxcbiAgICAgIGVyciA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyTGlua2VkQXBpRXJyb3IgPSB7XG4gICAgICAgICAgaWQ6ICdiYWNrZW5kRXJyb3InLCBtZXNzYWdlOiAnU29tZSBjYXNlIGluZm9ybWF0aW9uIGlzIG5vdCBhdmFpbGFibGUgYXQgdGhlIG1vbWVudCdcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXBMb29rdXBJRFRvVmFsdWVGcm9tSnVyaXNkaWN0aW9ucyhmaWVsZE5hbWUsIGZpZWxkVmFsdWUpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNlbGVjdGVkSnVyaXNkaWN0aW9uID0gdGhpcy5qdXJpc2RpY3Rpb25zUmVzcG9uc2UgJiZcbiAgICAgIHRoaXMuanVyaXNkaWN0aW9uc1Jlc3BvbnNlLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfdHlwZS5qdXJpc2RpY3Rpb24uaWQpO1xuICAgIGNvbnN0IHNlbGVjdGVkQ2FzZVR5cGUgPSBzZWxlY3RlZEp1cmlzZGljdGlvbiAmJiBzZWxlY3RlZEp1cmlzZGljdGlvbi5jYXNlVHlwZXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IHRoaXMuY2FzZURldGFpbHMuY2FzZV90eXBlLmlkKTtcbiAgICBjb25zdCBzdGF0ZSA9IHNlbGVjdGVkQ2FzZVR5cGUgJiYgc2VsZWN0ZWRDYXNlVHlwZS5zdGF0ZXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGZpZWxkVmFsdWUpO1xuICAgIHN3aXRjaCAoZmllbGROYW1lKSB7XG4gICAgICBjYXNlICdKVVJJU0RJQ1RJT04nOlxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRKdXJpc2RpY3Rpb24gJiYgc2VsZWN0ZWRKdXJpc2RpY3Rpb24uZGVzY3JpcHRpb247XG4gICAgICBjYXNlICdDQVNFX1RZUEUnOlxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRDYXNlVHlwZSAmJiBzZWxlY3RlZENhc2VUeXBlLm5hbWU7XG4gICAgICBjYXNlICdDQVNFX1RZUEVfREVTQ1JJUFRJT04nOlxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRDYXNlVHlwZSAmJiBzZWxlY3RlZENhc2VUeXBlLmRlc2NyaXB0aW9uO1xuICAgICAgY2FzZSAnU1RBVEUnOlxuICAgICAgICByZXR1cm4gc3RhdGUgJiYgc3RhdGUubmFtZSB8fCBmaWVsZFZhbHVlO1xuICAgICAgY2FzZSAnU1RBVEVfREVTQ1JJUFRJT04nOlxuICAgICAgICByZXR1cm4gc3RhdGUgJiYgc3RhdGUuZGVzY3JpcHRpb24gfHwgZmllbGRWYWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDYXNlTmFtZShzZWFyY2hDYXNlc1Jlc3BvbnNlOiBDYXNlVmlldyk6IHN0cmluZyB7XG4gICAgbGV0IGNhc2VOYW1lID0gTGlua2VkQ2FzZXNTZXJ2aWNlLkNBU0VfTkFNRV9NSVNTSU5HX1RFWFQ7XG4gICAgY29uc3QgdGFicyA9IHNlYXJjaENhc2VzUmVzcG9uc2UudGFicy5maWx0ZXIodGFiID0+IHtcbiAgICAgIGNvbnN0IGNhc2VOYW1lSG1jdHNJbnRlcm5hbEZpZWxkID0gdGFiLmZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlkID09PSAnY2FzZU5hbWVIbWN0c0ludGVybmFsJyk7XG4gICAgICBpZiAoY2FzZU5hbWVIbWN0c0ludGVybmFsRmllbGQpIHtcbiAgICAgICAgY2FzZU5hbWUgPSBjYXNlTmFtZUhtY3RzSW50ZXJuYWxGaWVsZC52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2FzZU5hbWU7XG4gIH1cbn1cbiJdfQ==