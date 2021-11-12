import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JurisdictionService } from '../../../app/services/jurisdiction/jurisdiction.service';
import { combineLatest, Subscription } from 'rxjs';
import { SearchResult, SearchResultDisplay } from '../../models';
import { SearchService } from '../../services/search.service';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

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

  constructor(private readonly searchService: SearchService,
              private readonly jurisdictionService: JurisdictionService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.searchSubscription$ = combineLatest([
      this.searchService.getResults(),
      this.jurisdictionService.getJurisdictions()
    ]).subscribe(
      results => this.onSearchSubscriptionHandler(results),
      error => this.router.navigate(['/search/noresults', true], {relativeTo: this.route})
    );
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
      this.router.navigate(['/search/noresults', false], {relativeTo: this.route})
    }

    // Get the jurisdiction list from the results
    this.jurisdictions = results[1];

    // Generate search result to display
    this.searchResultDisplay = [];
    searchResult.results.forEach(result => {
      const searchResultDisplay: SearchResultDisplay = {
        caseReference: result.caseReference,
        caseName: result.caseNameHmctsInternal,
        service: result.CCDJurisdictionName,
        state: this.getStateName(result.stateId, result.CCDJurisdictionId, result.CCDCaseTypeId),
        location: result.baseLocationName,
        actionLink: this.getActionLink(result.processForAccess, result.caseReference),
        actionLinkText: this.getActionLinkText(result.processForAccess)
      };

      this.searchResultDisplay.push(searchResultDisplay);
    });

    // Hide spinner
    this.showSpinner = false;
  }

  /**
   * Returns the state name based on jurisdiction, case type and state if found.
   * Else returns state id
   *
   */
  private getStateName(stateId: string, jurisdictionId: string, caseTypeId: string): string {
    const jurisdiction = this.jurisdictions.find(x => x.id === jurisdictionId);
    if (jurisdiction !== undefined) {
      const caseType = jurisdiction.caseTypes.find(x => x.id === caseTypeId);
      if (caseType !== undefined) {
        const state = caseType.states.find(x => x.id === stateId);
        if (state !== undefined) {
          return state.name !== '' ? state.name : stateId;
        }
      }
    }

    return stateId;
  }

  /**
   * Returns the href url for the anchor tag based on process for access and case reference
   *
   */
  private getActionLink(processForAccess: string, caseReference: string): string {
    if (processForAccess === 'SPECIFIC') {
      return `/cases/case-details/${caseReference}/specific-access-request`;
    }

    if (processForAccess === 'CHALLENGED') {
      return `/cases/case-details/${caseReference}/challenged-access-request`;
    }

    return `/cases/case-details/${caseReference}`;
  }

  /**
   * Returns the text for the anchor tag based on process for access
   *
   */
  private getActionLinkText(processForAccess: string): string {
    if (processForAccess === 'SPECIFIC') {
      return 'Specific access';
    }

    if (processForAccess === 'CHALLENGED') {
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
