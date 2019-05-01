import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoggerService } from './logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'XUI';

  constructor(private logger: LoggerService, private router: Router) {
    logger.info('AppComponent: logger.info()');
    logger.warn('AppComponent: logger.warn()');
    logger.error('AppComponent: logger.error()');
  }
}
