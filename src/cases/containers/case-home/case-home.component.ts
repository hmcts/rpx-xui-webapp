import { ExUITitleService } from 'src/app/shared/services/exui-title.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  AlertService,
  NavigationNotifierService,
  NavigationOrigin,
  HttpError,
  ErrorNotifierService
} from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../../store';
import { GoActionParams } from 'src/cases/models/go-action-params.model';

@Component({
  selector: 'exui-case-home',
  templateUrl: 'case-home.component.html',
  styleUrls: ['case-home.component.scss']
})
export class CaseHomeComponent implements OnInit, OnDestroy {

  public static readonly CASE_CREATED_MSG = 'The case has been created successfully';
  public static readonly DRAFT_DELETED_MSG = 'The draft has been successfully deleted';

  navigationSubscription: Subscription;

  constructor(
    private titleService: ExUITitleService,
    private alertService: AlertService,
    private errorNotifierService: ErrorNotifierService,
    private navigationNotifier: NavigationNotifierService,
    private store: Store<fromFeature.State>,
  ) { }

  /**
   * We dispatch an action to start the idle session timeout. We
   * do this here as this is the first 'authenticated' page the User hits.
   *
   * We do not want to be showing the User a Session Timeout modal, if they
   * have yet to be logged in. ie. Viewing an accessibility page.
   */
  ngOnInit(): void {
    this.navigationSubscription = this.navigationNotifier.navigation.subscribe(navigation => {
      if (navigation.action) {
        this.actionDispatcher(this.paramHandler(navigation));
      }
    }) as any;

    this.store.dispatch(new fromRoot.StartIdleSessionTimeout());
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

// TODO: please revisit
  paramHandler(navigation: any): GoActionParams {
    let params: GoActionParams;
    switch (navigation.action) {
      case NavigationOrigin.DRAFT_DELETED:
        params = {
          path: ['cases'],
          callback: () => {
            this.alertService.setPreserveAlerts(true);
            this.alertService.success(CaseHomeComponent.DRAFT_DELETED_MSG);
          }
        };
        break;
      case NavigationOrigin.ERROR_DELETING_DRAFT:
        params = {
          path: ['cases']
        };
        break;
      case NavigationOrigin.DRAFT_RESUMED:
        params = {
          path: ['create/case',
            navigation.jid,
            navigation.ctid,
            navigation.etid],
          query: navigation.queryParams,
          errorHandler: (error) => this.handleError(error, navigation.etid)
        };
        break;
      case NavigationOrigin.EVENT_TRIGGERED:
        const query = navigation.queryParams;
        params = {
          path: ['cases',
            'case-details',
            navigation.relativeTo.snapshot.params.cid,
            'trigger',
            navigation.etid],
          query: {...query},
          errorHandler: (error) => this.handleError(error, navigation.etid)
        };
        break;
      case NavigationOrigin.NO_READ_ACCESS_REDIRECTION:
        params = {
          path: ['cases'],
          callback: () => {
            this.alertService.success(CaseHomeComponent.CASE_CREATED_MSG);
          }
        };
        break;
      default:
        params = {
          path: ['cases',
            'case-details',
            navigation.relativeTo.snapshot.params.cid]
        };
    }
    return params;
  }

  actionDispatcher(params: GoActionParams): void {
    return this.store.dispatch(new fromRoot.Go(params));
  }

  handleError(error: HttpError, triggerId: string): void {
    if (error.status !== 401 && error.status !== 403) {
      console.log('error during triggering event:', triggerId);
      console.log(error);
      this.errorNotifierService.announceError(error);
      this.alertService.error(error.message);
    }
  }
}
