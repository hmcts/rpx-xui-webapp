import { Component, OnInit } from '@angular/core';
import { SearchRequestCriteria,
  SearchRequestSortCriteria,
  SearchRequest,
  SearchResult
} from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'exui-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchResult: SearchResult;
  showSpinner: boolean = false;

  constructor(private readonly searchService: SearchService) { }

  public ngOnInit(): void {
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
      this.showSpinner = false;
    });
  }
}
