import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  name: string;
  constructor(
    private logger: LoggerService,
    private store: Store<fromActions.State>
  ) {
    this.name = 'App.Component';
  }

  ngOnInit() {
    this.logger.debug('logger debug');
    this.logger.info('logger info');
    this.logger.error('logger error');
    this.logger.warn('logger warn');
    this.logger.fatal('logger fatal');
    this.logger.trace('logger trace');
  }

  // To do move signOut to header component when available!!!
  signOut() {
    this.store.dispatch(new fromActions.Logout());
  }
}
