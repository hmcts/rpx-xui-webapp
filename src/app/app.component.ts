import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private logger: LoggerService) {
    logger.info('AppComponent: logger.info()');
    logger.warn('AppComponent: logger.warn()');
    logger.error('AppComponent: logger.error()');
  }
}
