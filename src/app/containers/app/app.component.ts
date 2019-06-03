import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(
    private logger: LoggerService,
    private store: Store<fromActions.State>
  ) {
  }

  ngOnInit() {
    this.logger.trace('AppComponent: logger.trace()');
    this.logger.error('AppComponent: logger.error()');
    this.logger.fatal('AppComponent: logger.fatal()');
    this.logger.info('AppComponent: logger.info()');
    this.logger.debug('AppComponent: logger.debug()');
    this.logger.warn('AppComponent: logger.warn()');
  }


  // To do move signOut to header component when available!!!
  signOut() {
    this.store.dispatch(new fromActions.Logout());
  }
}
