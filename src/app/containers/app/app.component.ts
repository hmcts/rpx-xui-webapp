import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GoogleAnalyticsService } from '@hmcts/rpx-xui-common-lib';
import { environment as config } from '../../../environments/environment';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../store';
import {IdleService} from '../../services/idle/idle.services';
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
    private idleService: IdleService,
  ) {
    this.googleAnalyticsService.init(config.googleAnalyticsKey);
  }

  public ngOnInit(): void {
    this.store.dispatch(new fromRoot.GetUserDetails());
    this.modalData$ = this.store.pipe(select(fromRoot.getModalSessionData));
    this.idleStart();
  }

  public idleStart() {
    const route$ = this.store.pipe(select(fromRoot.getRouterUrl));
    const userIdleSession$ =  this.store.pipe(select(fromRoot.getUserIdleTimeOut));
    combineLatest([
      route$.pipe(first(value => typeof value === 'string' )),
      userIdleSession$.pipe(filter(value => !isNaN(value)), take(1))
    ]).subscribe(([routes, idleMilliseconds]) => {
      const isSignedOut: boolean = routes.indexOf('signed-out') !== -1;
      if (idleMilliseconds && !isSignedOut) {
        const idleConfig: IdleConfigModel = {
          timeout: 10 * 60, // 10 min
          idleMilliseconds,
          keepAliveInSeconds: 5 * 60 * 60, // 5 hrs
          idleServiceName: 'idleSession'
        };
        this.idleService.init(idleConfig);
      }
    });
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
