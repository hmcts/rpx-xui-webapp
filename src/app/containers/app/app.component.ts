import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { environment as config } from '../../../environments/environment';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
  ) {}

  ngOnInit() {
    this.googleAnalyticsService.init(config.googleAnalyticsKey);
  }
}
