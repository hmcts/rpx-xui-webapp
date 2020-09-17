import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  AlertService,
  NavigationNotifierService,
  HttpError,
  ErrorNotifierService
} from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-home',
  templateUrl: 'noc-home.component.html',
  styleUrls: ['noc-home.component.scss']
})
export class NocHomeComponent implements OnInit, OnDestroy {

  navigationSubscription: Subscription;

  constructor(
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
  paramHandler(navigation: any) {
    let params;
    switch (navigation.action) {
      default:
        params = {
          path: ['noc',
            navigation.relativeTo.snapshot.params.cid]
        };
    }
    return params;
  }

  actionDispatcher(params): void {
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
