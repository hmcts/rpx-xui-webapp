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

  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
		this.searchService.getResults('searchParameters').subscribe(searchResult => {
      this.searchResult = searchResult;
      console.log(searchResult);
      this.showSpinner = false;
    });
  }
}
