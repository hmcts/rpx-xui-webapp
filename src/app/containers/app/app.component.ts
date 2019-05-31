import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private logger: LoggerService) {
  }

  ngOnInit() {
    this.logger.debug('AppComponent: logger.debug()');
    this.logger.trace('AppComponent: logger.trace()');
    this.logger.info('AppComponent: logger.info()');
    this.logger.warn('AppComponent: logger.warn()');
    this.logger.error('AppComponent: logger.error()');
    this.logger.fatal('AppComponent: logger.fatal()');
  }
}
