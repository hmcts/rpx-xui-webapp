import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GoogleAnalyticsService } from '@hmcts/rpx-xui-common-lib';
import { environment as config } from '../../../environments/environment';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../store';
import {IdleService} from '../../services/idle/idle.services';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private store: Store<fromRoot.State>,
    private idleService: IdleService,
  ) {
    this.googleAnalyticsService.init(config.googleAnalyticsKey);
  }

  ngOnInit(): void {
    this.idleService.init();
    this.modalData$ = this.store.pipe(select(fromRoot.getModalSessionData));
  }

  onStaySignedIn() {
    const payload = {
      session : {
        isVisible: false
      }
    };
    this.store.dispatch(new fromRoot.SetModal(payload));
  }
}
