import { ExUITitleService } from 'src/app/shared/services/exui-title.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertService, NavigationNotifierService, NavigationOrigin, HttpError } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-case-home',
  templateUrl: 'case-home.component.html',
  styleUrls: ['case-home.component.scss']
})
export class CaseHomeComponent implements OnInit, OnDestroy {

  public static readonly CASE_CREATED_MSG = 'The case has been created successfully';
  public static readonly DRAFT_DELETED_MSG = 'The draft has been successfully deleted';

  callbackErrorsSubject: Subject<any> = new Subject();
  navigationSubscription: Subscription;

  constructor(
    private titleService: ExUITitleService,
    private alertService: AlertService,
    private navigationNotifier: NavigationNotifierService,
    private store: Store<fromFeature.State>,
  ) { }

  ngOnInit(): void {
    this.navigationSubscription = this.navigationNotifier.navigation.subscribe(navigation => {
      switch (navigation.action) {
        case NavigationOrigin.DRAFT_DELETED:
          return this.store.dispatch(new fromRoot.Go({
            path: ['cases'],
            callback: () => {
              this.alertService.setPreserveAlerts(true);
              this.alertService.success(CaseHomeComponent.DRAFT_DELETED_MSG);
            }
          }));
        case NavigationOrigin.ERROR_DELETING_DRAFT:
          return this.store.dispatch(new fromRoot.Go({
            path: ['cases']
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
          const query = navigation.queryParams;
          return this.store.dispatch(new fromRoot.Go({
            path: ['cases',
              'case-details',
              navigation.relativeTo.snapshot.params.cid,
              'trigger',
              navigation.etid],
            query: {...query},
            errorHandler: (error) => this.handleError(error, navigation.etid)
          }));
        case NavigationOrigin.NO_READ_ACCESS_REDIRECTION:
          return this.store.dispatch(new fromRoot.Go({
            path: ['cases'],
            callback: () => {
              this.alertService.success(CaseHomeComponent.CASE_CREATED_MSG);
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
