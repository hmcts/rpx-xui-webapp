import { Component, OnInit } from '@angular/core';
import {
  SearchRequest,
  SearchRequestCriteria,
  SearchRequestSortCriteria,
  SearchResult
} from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'exui-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public searchResult: SearchResult;
  public showSpinner: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    const searchRequestCriteria: SearchRequestCriteria = {
      "ccdJurisdictionIds": ["BEFTA_MASTER"]
    };

		// const searchRequestCriteria: SearchRequestCriteria = {
		// 	stateIds: [
		// 		"CaseCreated",
		// 		"CaseUpdated"
		// 	]
		// };

    const searchRequestSortCriteria: SearchRequestSortCriteria[] = [
			{
					"sortBy": "caseName",
					"sortDirection": "descending"
			},
			{
					"sortBy": "caseManagementCategoryName",
					"sortDirection": "ascending"
			},
			{
					"sortBy": "createdDate",
					"sortDirection": "ascending"
			}
	];

    const searchRequest: SearchRequest = {
      searchCriteria: searchRequestCriteria,
      sortCriteria: searchRequestSortCriteria,
      maxReturnRecordCount: 25,
      startRecordNumber: 1
    };

		console.log(searchRequest);

		const request = {
			"searchCriteria": {
					"stateIds": [
							"CaseCreated",
							"CaseUpdated"
					]
			},
			"sortCriteria": [
					{
							"sortBy": "caseName",
							"sortDirection": "descending"
					},
					{
							"sortBy": "caseManagementCategoryName",
							"sortDirection": "ascending"
					},
					{
							"sortBy": "createdDate",
							"sortDirection": "ascending"
					}
			],
			"maxReturnRecordCount": 500,
			"startRecordNumber": 1
	};

	console.log(request);


    this.searchService.getResults(searchRequest).subscribe(searchResult => {
      this.searchResult = searchResult;
      console.log(searchResult);
      this.showSpinner = false;
    });
  }
}
