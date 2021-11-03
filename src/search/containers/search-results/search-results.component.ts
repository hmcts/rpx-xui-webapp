import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../../models';
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

  public ngOnInit(): void {
    this.searchService.getResults().subscribe(searchResult => {
      this.searchResult = searchResult;
      this.showSpinner = false;
    });
  }
}
