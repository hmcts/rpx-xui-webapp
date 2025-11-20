import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { LoggerService } from 'src/app/services/logger/logger.service';
@Component({
  standalone: false,
  selector: 'exui-case-details-home',
  templateUrl: './case-details-home.component.html'
})
export class CaseDetailsHomeComponent implements OnInit {
  private readonly extras: NavigationExtras;
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
    this.activatedRoute.data.subscribe((data) => {
      if (data && data.case && data.case.case_type && data.case.case_type.jurisdiction) {
        this.caseInfo = {
          cid: data.case.case_id,
          caseType: data.case.case_type.id,
          jurisdiction: data.case.case_type.jurisdiction.id
        };
      } else {
        this.loggerService.log('CaseDetailsHomeComponent: No data available to add caseInfo details in session storage');
      }
    });
  }
}
