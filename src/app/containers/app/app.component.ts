import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GoogleAnalyticsService, ManageSessionServices} from '@hmcts/rpx-xui-common-lib';
import { environment as config } from '../../../environments/environment';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../store';
import {combineLatest, Observable} from 'rxjs';
import {filter, first, take} from 'rxjs/operators';
import {IdleConfigModel} from '../../models/idle-config.model';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public modalData$: Observable<{isVisible?: boolean; countdown?: string}>;
  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private store: Store<fromRoot.State>,
    private idleService: ManageSessionServices,
  ) {
    this.googleAnalyticsService.init(config.googleAnalyticsKey);
  }

  public ngOnInit(): void {
    this.store.dispatch(new fromRoot.GetUserDetails());
    this.modalData$ = this.store.pipe(select(fromRoot.getModalSessionData));
    this.idleStart();
    this.idleService.appStateChanges().subscribe(value => {
      switch (value.type) {
        case 'modal': {
          this.dispatchModal(value.countdown, value.isVisible);
          return;
        }
        case 'signout': {
          this.dispatchModal(undefined, false);
          this.store.dispatch(new fromRoot.SignedOut()); // sing out BE
          return;
        }
        case 'keepalive': {
          this.store.dispatch(new fromRoot.KeepAlive());
          return;
        }
      }
    });
  }

  public idleStart() {
    const route$ = this.store.pipe(select(fromRoot.getRouterUrl));
    const userIdleSession$ =  this.store.pipe(select(fromRoot.getUserIdleTime));
    const userTimeOut$ =  this.store.pipe(select(fromRoot.getUserTimeOut));
    combineLatest([
      route$.pipe(first(value => typeof value === 'string' )),
      userIdleSession$.pipe(filter(value => !isNaN(value)), take(1)),
      userTimeOut$.pipe(filter(value => !isNaN(value)), take(1))
    ]).subscribe(([routes, idleMilliseconds, timeout]) => {
      const isSignedOut: boolean = routes.indexOf('signed-out') !== -1;
      if (timeout && idleMilliseconds && !isSignedOut) {
        const idleConfig: IdleConfigModel = {
          timeout,
          idleMilliseconds,
          keepAliveInSeconds: 5 * 60 * 60, // 5 hrs
          idleServiceName: 'idleSession'
        };
        this.idleService.init(idleConfig);
      }
    });
  }

  public dispatchModal(countdown = '0', isVisible): void {
    const modalConfig: any = {
      session: {
        countdown,
        isVisible
      }
    };
    this.store.dispatch(new fromRoot.SetModal(modalConfig));
  }

  public onStaySignedIn() {
    const payload = {
      session : {
        isVisible: false
      }
    };
    this.store.dispatch(new fromRoot.SetModal(payload));
  }

  public onNavigate(event): void {
    if (event === 'signed-out') {
      return this.store.dispatch(new fromRoot.Logout());
    }
  }
}
