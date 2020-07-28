import {Component, ViewEncapsulation} from '@angular/core';
import { GoogleAnalyticsService } from '@hmcts/rpx-xui-common-lib';
import { environment as config } from '../../../environments/environment';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    private readonly store: Store<fromRoot.State>,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.googleAnalyticsService.init(config.googleAnalyticsKey);
  }

  ngOnInit() {
    this.store.dispatch(new fromRoot.LoadUserDetails());
  }
}
