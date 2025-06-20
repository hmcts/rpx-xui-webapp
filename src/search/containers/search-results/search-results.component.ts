import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { combineLatest, Subscription } from 'rxjs';
import { JurisdictionService } from '../../../app/services/jurisdiction/jurisdiction.service';
import { NoResultsMessageId, ProcessForAccessType } from '../../enums';
import { SearchResult, SearchResultDisplay } from '../../models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'exui-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public searchSubscription$: Subscription;
  public jurisdictions: Jurisdiction[];
  public searchResultDisplay: SearchResultDisplay[];
  public showSpinner: boolean = true;
  public moreResultsToGo: boolean = false;
  public caseStartRecord: number = 1;

  constructor(private readonly searchService: SearchService,
              private readonly jurisdictionService: JurisdictionService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.retrieveSearchResults();
  }

  /**
   * Function to handle the API results
   *
   */
  public onSearchSubscriptionHandler(results: [SearchResult, Jurisdiction[]]): void {
    // Get the search result from the results
    const searchResult = results[0];
    // Navigate to no results page if case list is empty
    if (searchResult.resultInfo.casesReturned === 0) {
      this.router.navigate(['/search/noresults'], { state: { messageId: NoResultsMessageId.NO_RESULTS }, relativeTo: this.route });
    }

    // Get the jurisdiction list from the results
    this.jurisdictions = results[1];

    // Generate search result to display
    this.searchResultDisplay = [];
    searchResult.results.forEach((result) => {
      const searchResultDisplay: SearchResultDisplay = {
        caseReference: result.caseReference,
        caseName: result.caseNameHmctsInternal,
        service: result.CCDJurisdictionName,
        state: this.getStateName(result.stateId, result.CCDJurisdictionId, result.CCDCaseTypeId),
        location: result.baseLocationName,
        actionLink: `/cases/case-details/${result.CCDJurisdictionId}/${result.CCDCaseTypeId}/${result.caseReference}`,
        actionLinkText: this.getActionLinkText(result.processForAccess)
      };

      this.searchResultDisplay.push(searchResultDisplay);
    });

    // Hide spinner
    this.showSpinner = false;

    // Update moreResultsToGo flag
    this.moreResultsToGo = searchResult.resultInfo.moreResultsToGo;
  }

  public getPreviousResultsPage(): void {
    // Decrement the start record
    this.caseStartRecord = this.searchService.decrementStartRecord();

    // Retrieve the search results
    this.retrieveSearchResults();
  }

  public getNextResultsPage(): void {
    // Increment the start record
    this.caseStartRecord = this.searchService.incrementStartRecord();

    // Retrieve the search results
    this.retrieveSearchResults();
  }

  private retrieveSearchResults(): void {
    this.showSpinner = true;
    this.searchSubscription$ = combineLatest([
      this.searchService.getResults(),
      this.jurisdictionService.getJurisdictions()
    ]).subscribe(
      (results) => this.onSearchSubscriptionHandler(results),
      () => this.router.navigate(['/search/noresults'], { state: { messageId: NoResultsMessageId.ERROR }, relativeTo: this.route })
    );
  }

  /**
   * Returns the state name based on jurisdiction, case type and state if found.
   * Else returns state id
   *
   */
  private getStateName(stateId: string, jurisdictionId: string, caseTypeId: string): string {
    const jurisdiction = this.jurisdictions.find((x) => x.id === jurisdictionId);
    if (jurisdiction !== undefined) {
      const caseType = jurisdiction.caseTypes.find((x) => x.id === caseTypeId);
      if (caseType !== undefined) {
        const state = caseType.states.find((x) => x.id === stateId);
        if (state !== undefined) {
          return state.name !== '' ? state.name : stateId;
        }
      }
    }

    return stateId;
  }

  /**
   * Returns the text for the anchor tag based on process for access
   *
   */
  private getActionLinkText(processForAccess: string): string {
    if (processForAccess === ProcessForAccessType.SPECIFIC) {
      return 'Specific access';
    }

    if (processForAccess === ProcessForAccessType.CHALLENGED) {
      return 'Challenged access';
    }

    return 'View';
  }

  public ngOnDestroy(): void {
    if (this.searchSubscription$) {
      this.searchSubscription$.unsubscribe();
    }
  }
}
