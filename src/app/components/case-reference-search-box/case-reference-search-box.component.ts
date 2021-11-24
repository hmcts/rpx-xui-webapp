import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavItemsModel } from '../../../app/models/nav-item.model';
import { NoResultsMessageId, SearchStatePersistenceKey } from '../../../search/enums';
import { SearchParameters } from '../../../search/models';
import { SearchService } from '../../../search/services/search.service';

@Component({
  selector: 'exui-case-reference-search-box',
  templateUrl: './case-reference-search-box.component.html',
  styleUrls: ['./case-reference-search-box.component.scss']
})
export class CaseReferenceSearchBoxComponent implements OnInit {

  @Input() item: NavItemsModel;

  public formGroup: FormGroup;
  public decorate16DigitCaseReferenceSearchBox: boolean;
  public searchSubscription$: Subscription;

  constructor(private readonly fb: FormBuilder,
              private readonly searchService: SearchService,
              private readonly router: Router,
              private readonly route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.formGroup = this.fb.group({
      caseReference: ''
    });
  }

  public onSubmit(): void {
    console.log('case reference', this.formGroup.get('caseReference').value);
    // Populate a SearchParameters instance and persist via the SearchService
    const searchParameters: SearchParameters = {
      caseReferences: [this.formGroup.get('caseReference').value],
      CCDJurisdictionIds: null,
      otherReferences: null,
      fullName: null,
      address: null,
      postcode: null,
      emailAddress: null,
      dateOfBirth: null,
      dateOfDeath: null
    };

    // Store the search parameters to session
    this.searchService.storeState(SearchStatePersistenceKey.SEARCH_PARAMS, searchParameters);

    this.searchSubscription$ = this.searchService.getResults().subscribe(result => {
      if (result.resultInfo.casesReturned > 0) {
        this.router.navigate([`/cases/case-details/${result.results[0].caseReference}`], { relativeTo: this.route });
      } else {
        this.router.navigate(['/search/noresults', NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH], { relativeTo: this.route });
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.searchSubscription$) {
      this.searchSubscription$.unsubscribe();
    }
  }
}
