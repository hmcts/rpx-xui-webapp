import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractAppConfig, HttpService, RequestOptionsBuilder, SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { getFilterType, isStringOrNumber, sanitiseMetadataFieldName } from '../utils/utils';

@Injectable()
export class SearchFilterService {

  public metadataFields: string[];

  constructor(
    private readonly ccdSearchService: SearchService,
    private readonly appConfig: AbstractAppConfig,
    private readonly httpService: HttpService,
    private readonly requestOptionsBuilder: RequestOptionsBuilder,
  ) { }

  public search(payload, isElasticSearchEnabled: boolean = false): Observable<any> {

    const { jurisdictionId, caseTypeId, metadataFilters, caseFilters, view, sortParameters } = this.getParams(payload);

    // return this.ccdSearchService.search(jurisdictionId, caseTypeId, metadataFilters, caseFilters, view) as any;
    return isElasticSearchEnabled ?
          this.ccdSearchService.searchCases(caseTypeId, metadataFilters, caseFilters, view, sortParameters) as any :
          this.ccdSearchService.search(jurisdictionId, caseTypeId, metadataFilters, caseFilters, view) as any;
  }

  private getParams(payload: any) {
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
    const jurisdictionId = filter.jurisdiction ? filter.jurisdiction.id : null;
    const caseTypeId = filter.caseType.id;
    const filters = this.getCaseFilterFromFormGroup(filter.formGroup);
    const caseFilters = filters.caseFilter;
    const metadataFilters = Object.assign(searchParams, filters.metadataFilter);
    const view = filter.view;
    const sortParameters = payload.sortParameters;

    return { jurisdictionId, caseTypeId, metadataFilters, caseFilters, view, sortParameters };
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
      prefix = `${parentPrefix}.`;
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

  public findPaginationMetadata(payload): Observable<any> {
    const { jurisdictionId, caseTypeId, metadataFilters, caseFilters } = this.getParams(payload);
    const url = `${this.appConfig.getCaseDataUrl()}/caseworkers/:uid`
      + `/jurisdictions/${jurisdictionId}`
      + `/case-types/${caseTypeId}`
      + `/cases/pagination_metadata`;
    delete metadataFilters.page;
    const options = this.requestOptionsBuilder.buildOptions(metadataFilters, caseFilters);
    return this.httpService.get(url, options) as any;
  }

}
