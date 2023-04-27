import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService, SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { CaseReferencePipe } from '../../../hearings/pipes/case-reference.pipe';

@Component({
  selector: 'exui-case-details-home',
  templateUrl: './case-details-home.component.html',
  providers: [CaseReferencePipe]
})
export class CaseDetailsHomeComponent implements OnInit {
  private readonly extras: NavigationExtras;

  constructor(
    private readonly alertService: AlertService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
    private readonly titleService: Title,
    private readonly caseReferencePipe: CaseReferencePipe
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
      this.alertService.success(this.extras.state.messageText);
    }
    this.activatedRoute.data.subscribe((data) => {
      if (data?.case?.case_type?.jurisdiction) {
        let fullName: string = '';
        let caseDetails: string = '';

        const caseDetailsTab = data.case.tabs.find((tab) => tab.id === 'caseDetails');
        const firstName: string = caseDetailsTab?.fields.find((field) => field.id === 'appellantGivenNames')?.formatted_value;
        const lastName: string = caseDetailsTab?.fields.find((field) => field.id === 'appellantFamilyName')?.formatted_value;
        fullName += firstName ? firstName : '';
        fullName += lastName ? ` ${lastName}` : '';

        const overviewTab = data.case.tabs.find((tab) => tab.id === 'overview');
        const appealReferenceNumber: string = overviewTab?.fields.find((field) => field.id === 'appealReferenceNumber')?.formatted_value;

        caseDetails += fullName ? fullName : '';

        caseDetails += fullName && appealReferenceNumber ? ` (${appealReferenceNumber})` : '';
        caseDetails += fullName && !appealReferenceNumber ? ` (${this.caseReferencePipe.transform(data.case.case_id)})` : '';

        caseDetails += !fullName && appealReferenceNumber ? appealReferenceNumber : '';
        caseDetails += !fullName && !appealReferenceNumber ? this.caseReferencePipe.transform(data.case.case_id) : '';

        this.titleService.setTitle(`${caseDetails} - HM Courts & Tribunals Service - GOV.UK`);

        const caseInfo = {
          cid: data.case.case_id,
          caseType: data.case.case_type.id,
          jurisdiction: data.case.case_type.jurisdiction.id
        };
        this.sessionStorageService.setItem('caseInfo', JSON.stringify(caseInfo));
      }
    });
  }
}
