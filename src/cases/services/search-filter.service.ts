import { Injectable } from '@angular/core';
import { SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

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
            if (this.isStringOrNumber(value)) {
                const filterType = this.getFilterType(attributeName);
                attributeName = this.sanitiseMetadataFieldName(filterType, attributeName);
                target[filterType][prefix + attributeName] = value;
            } else if (value) {
                this.buildFormDetails(attributeName, target, value);
            }
        }
    }

    private isStringOrNumber(value: any): boolean {
        return (typeof value === 'string' && value.length !== 0) || (typeof value === 'number');
    }

    private getFilterType(fieldName: string): string {
        return (this.metadataFields && (this.metadataFields.indexOf(fieldName) > -1)) ?
            'metadataFilter' : 'caseFilter';
    }

    private sanitiseMetadataFieldName(filterType: string, fieldName: string): string {
        if (filterType === 'metadataFilter') {
            fieldName = fieldName.replace(/\[(.*?)]/g, '$1').toLocaleLowerCase();
        }
        return fieldName;
    }
}
