import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService, Alert, AlertLevel } from '@hmcts/ccd-case-ui-toolkit';
import { select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'exui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, OnDestroy {
  message = '';
  level = '';
  currentUrl = '';
  alertMessageObservable: Observable<Alert>;
  alertMessageSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private alertService: AlertService, private router: Router) {
  }

  ngOnInit() {
    this.alertMessageObservable = this.alertService.errors.pipe(select( alert => alert));
    this.routeSubscription = this.router.events.subscribe((val) => this.message = '');
    this.alertMessageSubscription = this.alertMessageObservable.subscribe(alert => {
      if (alert) {
        this.message = alert.message;
        this.level = alert.level;
      }
    });
  }

  ngOnDestroy() {
    this.alertMessageSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
