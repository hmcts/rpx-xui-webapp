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
  public alertMessage = '';
  public alertLevel = '';
  public successMessage = '';
  public errorMessage = '';
  public warningMessage = '';

  public alertMessageSubscription: Subscription;
  public successMessageSubscription: Subscription;
  public errorMessageSubscription: Subscription;
  public warningMessageSubscription: Subscription;
  public routeSubscription: Subscription;

  private alertMessageObservable: Observable<Alert>;
  private successMessageObservable: Observable<Alert>;
  private errorMessageObservable: Observable<Alert>;
  private warningMessageObservable: Observable<Alert>;

  constructor(
    private readonly alertService: AlertService,
    private readonly router: Router
  ) { }

  public ngOnInit() {
    this.setAlertMessage();
    this.setSuccessMessage();
    this.setErrorMessage();
    this.setWarningMessage();
  }

  public setAlertMessage() {
    // currently only used for default messages but kept in because of possible reversion to earlier techniques if necessary
    this.alertMessageObservable = this.alertService.alerts.pipe(select(alert => alert));
    this.routeSubscription = this.router.events.subscribe(() => this.alertMessage = '');
    this.alertMessageSubscription = this.alertMessageObservable.subscribe(alert => {
      if (alert) {
        this.alertMessage = alert.message;
        this.alertLevel = alert.level;
      }
    });
  }

  // next three methods are to ensure different message types can be displayed at same time
  public setSuccessMessage() {
    // specific observable connection to success messages
    this.successMessageObservable = this.alertService.successes.pipe(select(alert => alert));
    this.routeSubscription = this.router.events.subscribe(() => {
        this.successMessage = this.alertService.preservedSuccess;
    });
    this.successMessageSubscription = this.successMessageObservable.subscribe(alert => {
      if (alert) {
        this.successMessage = alert.message;
      }
    });
  }

  public setErrorMessage() {
    // specific observable connection to error messages
    this.errorMessageObservable = this.alertService.errors.pipe(select(alert => alert));
    this.routeSubscription = this.router.events.subscribe(() => {
        this.errorMessage = this.alertService.preservedError;
    });
    this.errorMessageSubscription = this.errorMessageObservable.subscribe(alert => {
      if (alert) {
        this.errorMessage = alert.message;
      }
    });
  }

  public setWarningMessage() {
    // specific observable connection to warning messages
    this.warningMessageObservable = this.alertService.warnings.pipe(select(alert => alert));
    this.routeSubscription = this.router.events.subscribe(() => {
        this.warningMessage = this.alertService.preservedWarning;
    });
    this.warningMessageSubscription = this.warningMessageObservable.subscribe(alert => {
      if (alert) {
        this.warningMessage = alert.message;
      }
    });
  }

  public ngOnDestroy() {
    // unsubscribe from all subscriptions
    this.alertMessageSubscription.unsubscribe();
    this.successMessageSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
    this.warningMessageSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
