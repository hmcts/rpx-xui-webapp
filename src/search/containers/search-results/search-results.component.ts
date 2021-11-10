import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JurisdictionService } from '../../../app/services/jurisdiction/jurisdiction.service';
import { Subscription } from 'rxjs';
import { SearchResult, SearchResultDisplay } from '../../models';
import { SearchService } from '../../services/search.service';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'exui-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public searchResultSubscription$: Subscription;
  public jurisdictionsSubscription$: Subscription;
  public jurisdictions: Jurisdiction[];
  public searchResultDisplay: SearchResultDisplay[];
  public showSpinner: boolean = true;

  constructor(private readonly searchService: SearchService,
              private readonly jurisdictionService: JurisdictionService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {

    this.searchResultSubscription$ = this.searchService.getResults().subscribe(searchResult => {
      // Navigate to no results page if case list is empty
      if (searchResult.resultInfo.casesReturned === 0) {
        this.router.navigate(['/search/noresults'], {relativeTo: this.route});
      }

      this.jurisdictionsSubscription$ = this.jurisdictionService.getJurisdictions().subscribe(jurisdictionsResult => {
        this.jurisdictions = jurisdictionsResult;

        this.searchResultDisplay = [];

        searchResult.results.forEach(result => {
          // console.log(result);
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
      });

      // Hide spinner
      this.showSpinner = false;
    });
  }

  private getStateName(stateId: string, jurisdictionId: string, caseTypeId: string): string {
    const caseTypes = this.jurisdictions.find(x => x.id === jurisdictionId).caseTypes;
    const caseType = caseTypes.find(x => x.id === caseTypeId);
    console.log(caseTypes);
    console.log(caseType);
    return caseType.states.find(x => x.id === stateId).name;
  }

  private getActionLink(processForAccess: string, caseReference: string): string {
    if (processForAccess === 'SPECIFIC') {
      return `/cases/case-details/${caseReference}/specific-access-request`;
    }

    if (processForAccess === 'CHALLENGED') {
      return `/cases/case-details/${caseReference}/challenged-access-request`;
    }

    return `/cases/case-details/${caseReference}`;
  }

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
    if (this.searchResultSubscription$) {
      this.searchResultSubscription$.unsubscribe();
    }
    if (this.jurisdictionsSubscription$) {
      this.jurisdictionsSubscription$.unsubscribe();
    }
  }
}
