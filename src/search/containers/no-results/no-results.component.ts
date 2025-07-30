import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromActions from '../../../app/store';
import { NoResultsMessageId } from '../../enums';

@Component({
    selector: 'exui-no-results',
    templateUrl: './no-results.component.html',
    styleUrls: ['./no-results.component.scss'],
    standalone: false
})
export class NoResultsComponent implements OnInit {
  private readonly extras: NavigationExtras;
  public messageId: number;
  public noResultsMessageId = NoResultsMessageId;

  constructor(private readonly store: Store<fromActions.State>,
              private readonly router: Router) {
    // Get current navigation
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation) {
      this.extras = currentNavigation.extras;
    }
  }

  public ngOnInit(): void {
    if (this.extras && this.extras.state && this.extras.state.messageId) {
      // Get message id from current navigation extras state
      this.messageId = this.extras.state.messageId;
    } else {
      this.messageId = NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH;
    }
    // Decorate 16-digit case reference search box if a case has been searched from the header and not found
    if (this.messageId === NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH) {
      this.store.dispatch(new fromActions.Decorate16DigitCaseReferenceSearchBoxInHeader(true));
    }
  }

  public onBack(): void {
    window.history.back();
  }
}
