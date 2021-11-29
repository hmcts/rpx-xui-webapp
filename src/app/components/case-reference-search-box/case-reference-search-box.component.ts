import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NavItemsModel } from '../../../app/models/nav-item.model';
import * as fromActions from '../../../app/store';
import { NoResultsMessageId, SearchStatePersistenceKey } from '../../../search/enums';
import { SearchParameters } from '../../../search/models';
import { SearchService } from '../../../search/services/search.service';
import { SearchValidators } from '../../../search/utils';

@Component({
  selector: 'exui-case-reference-search-box',
  templateUrl: './case-reference-search-box.component.html',
  styleUrls: ['./case-reference-search-box.component.scss']
})
export class CaseReferenceSearchBoxComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public item: NavItemsModel;
  @Input() public decorate16DigitCaseReferenceSearchBoxInHeader: boolean;

  @ViewChild('caseReferenceInput') public caseReferenceInputEl: ElementRef;

  public formGroup: FormGroup;
  public searchSubscription$: Subscription;
  private readonly CASE_REF_FIELD = 'caseReference';

  constructor(private readonly store: Store<fromActions.State>,
              private readonly fb: FormBuilder,
              private readonly searchService: SearchService,
              private readonly router: Router,
              private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      [this.CASE_REF_FIELD]: ''
    });

    // Set validator for the caseReference form control
    this.formGroup.get(this.CASE_REF_FIELD).setValidators(SearchValidators.caseReferenceValidator());

    // If search returned no case, retrieve case reference from session storage
    // and populate the 16-digit case reference search box
    if (this.decorate16DigitCaseReferenceSearchBoxInHeader) {
      const searchParameters = this.searchService.retrieveState(SearchStatePersistenceKey.SEARCH_PARAMS);
      this.formGroup.controls['caseReference'].setValue(searchParameters.caseReferences[0]);
    }
  }

  public ngAfterViewInit(): void {
    // If search returned no case, set focus on the 16-digit case reference search box
    if (this.decorate16DigitCaseReferenceSearchBoxInHeader) {
      this.caseReferenceInputEl.nativeElement.focus();
    }
  }

  public onSubmit(): void {
    // Populate a SearchParameters instance and persist via the SearchService. Do this even if the input to the 16-digit case reference
    // search box is invalid, so the value can be pre-populated in the box for the user to amend
    const searchParameters: SearchParameters = {
      caseReferences: [this.formGroup.get(this.CASE_REF_FIELD).value],
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

    // If the input to the 16-digit case reference search box is invalid, navigate to the "no results" error page
    if (this.formGroup.get(this.CASE_REF_FIELD).invalid) {
      this.router.navigate(['/search/noresults'], { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH }, relativeTo: this.route });
    } else {
      this.searchSubscription$ = this.searchService.getResults().subscribe(
        result => {
          if (result.resultInfo.casesReturned > 0) {
            // Case found, do not decorate 16-digit case reference search box with error class
            this.store.dispatch(new fromActions.Decorate16DigitCaseReferenceSearchBoxInHeader(false));
            // Navigate to case details page
            this.router.navigate([`/cases/case-details/${result.results[0].caseReference}`], { relativeTo: this.route });
          } else {
            // Navigate to no results page
            this.router.navigate(['/search/noresults'], { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH }, relativeTo: this.route });
          }
        },
        error => {
          // Error, navigate to service down page
          this.router.navigate(['/service-down'], { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH } });
        }
      );
    }
  }

  public ngOnDestroy(): void {
    if (this.searchSubscription$) {
      this.searchSubscription$.unsubscribe();
    }
  }
}
