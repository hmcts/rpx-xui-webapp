import { Component, ViewEncapsulation } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private logger: LoggerService, private store: Store<fromActions.State>) {
    logger.info('AppComponent: logger.info()');
    logger.warn('AppComponent: logger.warn()');
    logger.error('AppComponent: logger.error()');
  }


  // To do move signOut to header component when available!!!
  signOut() {
    this.store.dispatch(new fromActions.Logout());
  }
}
