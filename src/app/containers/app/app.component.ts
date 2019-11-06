import {Component, ViewEncapsulation} from '@angular/core';
import { GoogleAnalyticsService } from '@hmcts/rpx-xui-common-lib';
import { environment as config } from '../../../environments/environment';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private googleAnalyticsService: GoogleAnalyticsService) {
    this.googleAnalyticsService.init(config.googleAnalyticsKey);
  }
}
