import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchResult } from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'exui-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public searchResultSubscription$: Subscription;
	public searchResult: SearchResult;
  public showSpinner: boolean = false;

  constructor(private readonly searchService: SearchService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
		console.log('before searchResult');
    this.searchResultSubscription$ = this.searchService.getResults().subscribe(searchResult => {
			console.log('searchResult', searchResult);
      // Navigate to no results page if case list is empty
      if (searchResult === undefined || searchResult.caseList === undefined || searchResult.caseList.length === 0) {
				console.log('inside if', searchResult);
        this.router.navigate(['noresults'], {relativeTo: this.route});
      }

      // Search result to populate the table
      this.searchResult = searchResult;

      console.log('searchResult', searchResult);

      // Hide spinner
      this.showSpinner = false;
    });

		console.log('end of function');
  }

	public ngOnDestroy(): void {
		if (this.searchResultSubscription$) {
			this.searchResultSubscription$.unsubscribe();
		}
	}
}
