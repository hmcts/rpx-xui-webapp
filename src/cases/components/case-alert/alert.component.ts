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
    console.log('hello 1');
    this.alertMessageObservable = this.alertService.alerts.pipe(select( alert => alert));
    console.log('hello 2');
    this.routeSubscription = this.router.events.subscribe((val) => this.message = '');
    console.log('hello 3');
    console.log(this.alertMessageObservable);
    this.alertMessageSubscription = this.alertMessageObservable.subscribe(alert => {
      console.log('hello 4');
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
