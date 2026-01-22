import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { NoResultsMessageId } from '../../../search/enums';

@Component({
  standalone: false,
  selector: 'exui-case-details-home',
  templateUrl: './case-details-home.component.html'
})
export class CaseDetailsHomeComponent implements OnInit, OnDestroy {
  private readonly extras: NavigationExtras;
  private readonly destroy$ = new Subject<void>();
  public caseInfo: { cid: string; caseType: string; jurisdiction: string };

  constructor(
    private readonly alertService: AlertService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly loggerService: LoggerService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      this.extras = navigation.extras;
    }
  }

  public ngOnInit() {
    if (this.extras && this.extras.state && this.extras.state.showMessage && this.extras.state.messageText) {
      // EUI-4488 - preserve alerts on initialisation so messages are not removed when first entering page
      this.alertService.setPreserveAlerts(true);
      this.alertService.success({ phrase: this.extras.state.messageText });
    }
    this.activatedRoute.data.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if (data && data.case && data.case.case_type && data.case.case_type.jurisdiction) {
          this.caseInfo = {
            cid: data.case.case_id,
            caseType: data.case.case_type.id,
            jurisdiction: data.case.case_type.jurisdiction.id
          };
        } else if (!data.case) {
          // Case not found - resolver returned empty data
          this.loggerService.error('CaseDetailsHomeComponent: Case not found, redirecting to no results page');
          this.navigateToNoResultsPage();
        } else {
          this.loggerService.log('CaseDetailsHomeComponent: No data available to add caseInfo details in session storage');
        }
      },
      error: (error) => {
        // Handle resolver errors (e.g., case not found, access denied)
        this.loggerService.error('CaseDetailsHomeComponent: Error loading case data', error);
        this.navigateToNoResultsPage();
      }
    });
  }

  private navigateToNoResultsPage(): void {
    this.router.navigate(['/search/noresults'], { 
      state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH }, 
      relativeTo: this.activatedRoute 
    }).catch((err) => this.loggerService.error('Error navigating to /search/noresults', err));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
