import { Injectable } from '@angular/core';
import { SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Injectable()
export class SearchFilterService {

    constructor(
        private ccdSearchService: SearchService
    ) { }

    search(payload): Observable<any> {
        const jurisdictionId = payload.selected.jurisdiction.id;
        const caseTypeId = payload.selected.caseType.id;
        const metaCriteria = payload.selected.metadataFields;
        const caseCriteria = this.stringifyKeysAndValues(payload.selected.formGroup.value);
        debugger;
        return this.ccdSearchService.search(jurisdictionId, caseTypeId, metaCriteria, caseCriteria) as any;
    }


    stringifyKeysAndValues(formGroupValue) {
        for (const attributeName of Object.keys(formGroupValue)) {
            if (attributeName.indexOf('[') > -1) {
                const newAttributeName = attributeName.slice(1, attributeName.length - 1).toLowerCase();
                const newValue = formGroupValue[attributeName].toString();
                formGroupValue = {
                    ...formGroupValue,
                    [newAttributeName]: newValue
                };
                delete formGroupValue[attributeName];
            }
        }
        return formGroupValue;
    }

    // search(payload): Observable<any> {
    //     const jurisdictionId = payload.selected.jurisdiction.id;
    //     const caseTypeId = payload.selected.caseType.id;
    //     const metaCriteria = payload.selected.metadataFields;
    //     const caseCriteria = this.getCaseFilterFromFormGroup(payload.selected.formGroup);
    //     debugger;
    //     return this.ccdSearchService.search(jurisdictionId, caseTypeId, metaCriteria, caseCriteria) as any;
    // }

    // private getCaseFilterFromFormGroup(formGroup?: FormGroup): object {
    //     const result = {};

    //     if (formGroup) {
    //         this.buildFormDetails('case', result, formGroup.value);
    //     }
    //     return result;
    // }

    // private buildFormDetails(parentPrefix: string, target: object, formGroupValue: object): void {
    //     let prefix = parentPrefix;
    //     if (parentPrefix && parentPrefix.length > 0) {
    //         prefix = parentPrefix + '.';
    //     }
    //     for (const attributeName of Object.keys(formGroupValue)) {
    //         const value = formGroupValue[attributeName];
    //         if (this.isStringOrNumber(value)) {
    //             debugger;
    //             target[prefix + attributeName] = value;
    //         } else if (value) {
    //             this.buildFormDetails(attributeName, target, value);
    //         }
    //     }
    // }

    // private isStringOrNumber(value: any): boolean {
    //     return (typeof value === 'string' && value.length !== 0) || (typeof value === 'number');
    // }
}
