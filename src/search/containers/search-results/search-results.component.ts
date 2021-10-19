import { Component, Input, OnInit } from '@angular/core';
import { SearchRequestCriteria } from 'src/search/models/search-request-criteria.model';
import { SearchRequestSortCriteria } from 'src/search/models/search-request-sort-criteria.model';
import { SearchRequest } from 'src/search/models/search-request.model';
import { SearchResult } from 'src/search/models/search-result.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'exui-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  // searchRequest: SearchRequest;
  searchResult: SearchResult;
  showSpinner: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    const searchRequestCriteria: SearchRequestCriteria = {
      ccdCaseTypeIds: null,
      ccdJurisdictionIds: ['DIVORCE', 'PROBATE', 'PUBLICLAW'],
      caseManagementBaseLocationIds: null,
      caseManagementRegionIds: null,
      caseReferences: null,
      otherReferences: null,
      parties: null,
      stateIds: null
    };

    const searchRequestSortCriteria: SearchRequestSortCriteria = null;

    const searchRequest: SearchRequest = {
      searchCriteria: searchRequestCriteria,
      sortCriteria: searchRequestSortCriteria,
      maxReturnRecordCount: 25,
      startRecordNumber: 1
    }

    this.searchService.getResults(searchRequest).subscribe(searchResult => {
      this.searchResult = searchResult;
      console.log(searchResult);
      this.showSpinner = false;
    });
  }
}
