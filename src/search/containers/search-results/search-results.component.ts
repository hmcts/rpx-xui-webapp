import { Component, OnInit } from '@angular/core';
import { SearchRequest } from 'src/search/models/search-request.model';
import { SearchResult } from 'src/search/models/search-result.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'exui-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchRequest: SearchRequest;
  searchResult: SearchResult;
  showSpinner: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getResults(this.searchRequest).subscribe(searchResult => {
    this.searchResult = searchResult;
    console.log(searchResult);
    this.showSpinner = false;
  });
}
}
