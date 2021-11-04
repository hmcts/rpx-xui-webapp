import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private readonly searchService: SearchService,
              private readonly router: Router) { }

  public ngOnInit(): void {
    this.searchService.getResults().subscribe(searchResult => {
      // Navigate to no results page if case list is empty
      if (searchResult === undefined || searchResult.caseList === undefined || searchResult.caseList.length === 0) {
        this.router.navigateByUrl('noresults');
      }

      // Search result to populate the table
      this.searchResult = searchResult;

      console.log('searchResult', searchResult);

      // Hide spinner
      this.showSpinner = false;
    });
  }
}
