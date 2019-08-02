import { Injectable } from '@angular/core';
import { SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { isStringOrNumber, getFilterType, sanitiseMetadataFieldName } from '../utils/utils';

@Injectable()
export class SearchFilterService {

    constructor(
        private ccdSearchService: SearchService
    ) { }

    metadataFields: string[];

    search(payload): Observable<any> {

        const filter = payload.selected;

        let searchParams = {};

        this.metadataFields = filter.metadataFields;

        if (filter.caseState) {
            searchParams = {
                ...searchParams,
                state: filter.caseState.id
            };
        }

        if (filter.page) {
            searchParams = {
                ...searchParams,
                page: filter.page
            };
        }

        const jurisdictionId = filter.jurisdiction.id;
        const caseTypeId = filter.caseType.id;
        const filters = this.getCaseFilterFromFormGroup(filter.formGroup);
        const caseFilters = filters.caseFilter;
        const metadataFilters = Object.assign(searchParams, filters.metadataFilter);

        return this.ccdSearchService.search(jurisdictionId, caseTypeId, metadataFilters, caseFilters) as any;
    }

    private getCaseFilterFromFormGroup(formGroup?: FormGroup): { caseFilter, metadataFilter } {
        const result = {
            caseFilter: {},
            metadataFilter: {}
        };

        if (formGroup) {
            this.buildFormDetails('', result, formGroup.value);
        }
        return result;
    }

    private buildFormDetails(parentPrefix: string, target: object, formGroupValue: object): void {
        let prefix = parentPrefix;
        if (parentPrefix && parentPrefix.length > 0) {
            prefix = parentPrefix + '.';
        }
        for (let attributeName of Object.keys(formGroupValue)) {
            const value = formGroupValue[attributeName];
            if (isStringOrNumber(value)) {
                const filterType = getFilterType(attributeName, this.metadataFields);
                attributeName = sanitiseMetadataFieldName(filterType, attributeName);
                target[filterType][prefix + attributeName] = value;
            } else if (value) {
                this.buildFormDetails(attributeName, target, value);
            }
        }
    }

}
