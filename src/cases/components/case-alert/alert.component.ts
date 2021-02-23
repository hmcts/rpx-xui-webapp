import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert, AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'exui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, OnDestroy {
  public message = '';
  public level = '';
  public alertMessageSubscription: Subscription;
  public routeSubscription: Subscription;

  private alertMessageObservable: Observable<Alert>;

  constructor(
    private readonly alertService: AlertService,
    private readonly router: Router
  ) {}

  public ngOnInit() {
    this.alertMessageObservable = this.alertService.alerts.pipe(select( alert => alert));
    this.routeSubscription = this.router.events.subscribe(() => this.message = '');
    this.alertMessageSubscription = this.alertMessageObservable.subscribe(alert => {
      if (alert) {
          const msg = alert.message;
          const caseId = msg.match(/[0-9]{16}/g);
          if(caseId) {
            const caseIdHyphen = msg.match(/([0-9][0-9][0-9][0-9])/g).join("-");
            this.message = msg.replace(caseId.toString(),caseIdHyphen);
          }else {
            this.message = msg;
          }
          this.level = alert.level;
      }
    });
  }

  public ngOnDestroy() {
    this.alertMessageSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
