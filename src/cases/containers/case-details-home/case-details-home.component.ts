import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'exui-case-details-home',
  templateUrl: './case-details-home.component.html'
})
export class CaseDetailsHomeComponent implements OnInit {

  private readonly extras: NavigationExtras;

  constructor(
    private readonly alertService: AlertService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      this.extras = navigation.extras;
    }
  }

  public ngOnInit() {
    if (this.extras && this.extras.state && this.extras.state.showMessage && this.extras.state.messageText) {
      this.alertService.success(this.extras.state.messageText);
    }
    this.activatedRoute.data.subscribe(data => data);
  }

}
