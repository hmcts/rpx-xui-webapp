import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertService, NavigationNotifierService, NavigationOrigin, HttpError } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-case-details-home',
  templateUrl: './case-details-home.html'
})
export class CaseDetailsHomeComponent implements OnInit, OnDestroy {
  public static readonly CASE_CREATED_MSG = 'The case has been created successfully';
  public static readonly DRAFT_DELETED_MSG = `The draft has been successfully deleted`;

  callbackErrorsSubject: Subject<any> = new Subject();
  navigationSubscription: Subscription;

  constructor(
    private alertService: AlertService,
    private navigationNotifier: NavigationNotifierService,
    private store: Store<fromFeature.State>,
  ) { }

  ngOnInit(): void {
    this.navigationSubscription = this.navigationNotifier.navigation.subscribe(navigation => {
      switch (navigation.action) {
        case NavigationOrigin.DRAFT_DELETED:
          return this.store.dispatch(new fromRoot.Go({
            path: ['list/case'],
            callback: () => {
              this.alertService.setPreserveAlerts(true);
              this.alertService.success(CaseDetailsHomeComponent.DRAFT_DELETED_MSG);
            }
          }));
        case NavigationOrigin.ERROR_DELETING_DRAFT:
          return this.store.dispatch(new fromRoot.Go({
            path: ['list/case']
          }));
        case NavigationOrigin.DRAFT_RESUMED:
          return this.store.dispatch(new fromRoot.Go({
            path: ['create/case',
              navigation.jid,
              navigation.ctid,
              navigation.etid],
            query: navigation.queryParams,
            errorHandler: (error) => this.handleError(error, navigation.etid)
          }));
        case NavigationOrigin.EVENT_TRIGGERED:
          return this.store.dispatch(new fromRoot.Go({
            path: ['trigger', navigation.etid],
            query: navigation.queryParams,
            extras: {relativeTo: navigation.relativeTo},
            errorHandler: (error) => this.handleError(error, navigation.etid)
          }));
        case NavigationOrigin.NO_READ_ACCESS_REDIRECTION:
          return this.store.dispatch(new fromRoot.Go({
            path: ['/list/case'],
            callback: () => {
              this.alertService.success(CaseDetailsHomeComponent.CASE_CREATED_MSG);
            }
          }));
      }
    }) as any;
  }


  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private handleError(error: HttpError, triggerId: string) {
    if (error.status !== 401 && error.status !== 403) {
      console.log('error during triggering event:', triggerId);
      console.log(error);
      this.callbackErrorsSubject.next(error);
    }
  }
}
