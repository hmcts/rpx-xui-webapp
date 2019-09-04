import { Component, Input, OnDestroy } from '@angular/core';
import { AlertService, Alert, AlertLevel } from '@hmcts/ccd-case-ui-toolkit';
import { select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';



@Component({
  selector: 'exui-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent implements OnDestroy {
  message = '';
  level = '';
  alertMessageObservable: Observable<Alert>;
  alertMessageSubscription: Subscription;

  constructor(private alertService: AlertService) {

    this.alertMessageObservable = this.alertService.alerts.pipe(select( alert => alert));

    this.alertMessageSubscription = this.alertMessageObservable.subscribe(o => {
      if (o) {
        this.message = o.message;
        this.level = o.level;
      }

    });
  }

  ngOnDestroy() {
    this.alertMessageSubscription.unsubscribe();
  }
}
