import { Injectable } from '@angular/core';
import { SearchService, AbstractAppConfig, HttpService, RequestOptionsBuilder } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { isStringOrNumber, getFilterType, sanitiseMetadataFieldName } from '../utils/utils';
import { Store } from '@ngrx/store';
import * as fromCaseList from '../store/reducers';

@Injectable()
export class SearchFilterService {

  constructor(
    private ccdSearchService: SearchService,
    private appConfig: AbstractAppConfig,
    private httpService: HttpService,
    private requestOptionsBuilder: RequestOptionsBuilder,
  ) { }

  metadataFields: string[];
  elasticSearch: boolean = true;


  setElasticSearch() {
    this.elasticSearch = !this.elasticSearch;
  }

  getElasticSearch(): boolean {
    return this.elasticSearch;
  }

  search(payload): Observable<any> {

    const { jurisdictionId, caseTypeId, metadataFilters, caseFilters, view } = this.getParams(payload);

    // return this.ccdSearchService.search(jurisdictionId, caseTypeId, metadataFilters, caseFilters, view) as any;
    return this.getElasticSearch() ?
          this.ccdSearchService.searchCases(caseTypeId, metadataFilters, caseFilters, view) as any :
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

    return { jurisdictionId, caseTypeId, metadataFilters, caseFilters, view };
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

  public findPaginationMetadata(payload): Observable<any> {
    const { jurisdictionId, caseTypeId, metadataFilters, caseFilters, view } = this.getParams(payload);
    const url = this.appConfig.getCaseDataUrl() + `/caseworkers/:uid`
      + `/jurisdictions/${jurisdictionId}`
      + `/case-types/${caseTypeId}`
      + `/cases/pagination_metadata`;
    delete metadataFilters.page;
    const options = this.requestOptionsBuilder.buildOptions(metadataFilters, caseFilters);
    return this.httpService.get(url, options) as any;
  }

}
