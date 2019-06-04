import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { LoggerMessage } from 'src/app/services/logger/reducers/logger.reducer';
import { Store, select } from '@ngrx/store';
import { 
  getDebugMessagesState, 
  getInfoMessagesState, 
  getWarningMessagesState, 
  getErrorMessagesState, 
  getFatalMessagesState, 
  getTraceMessagesState 
} from 'src/app/services/logger/selectors/logger.selector';

@Component({
  selector: 'exui-logger',
  template: `
    <div>
        <p>{{message}}<p>
    <div>
  `
})
export class ExuiLoggerComponent implements OnInit, OnDestroy {

  debugSubscribtion: any;
  infoSubscribtion: any;
  warningSubscribtion: any;
  errorSubscribtion: any;
  fatalSubscribtion: any;
  traceSubscribtion: any;

  constructor(private ngxLogger: NGXLogger, private store: Store<LoggerMessage>) { }
  ngOnInit(): void {
    this.debugSubscribtion = this.store.pipe(select(getDebugMessagesState)).subscribe(debugMessage => {
      this.ngxLogger.debug(debugMessage);
    });
    this.infoSubscribtion = this.store.pipe(select(getInfoMessagesState)).subscribe(debugMessage => {
      this.ngxLogger.debug(debugMessage);
    });
    this.warningSubscribtion = this.store.pipe(select(getWarningMessagesState)).subscribe(debugMessage => {
      this.ngxLogger.debug(debugMessage);
    });
    this.errorSubscribtion = this.store.pipe(select(getErrorMessagesState)).subscribe(debugMessage => {
      this.ngxLogger.debug(debugMessage);
    });
    this.fatalSubscribtion = this.store.pipe(select(getFatalMessagesState)).subscribe(debugMessage => {
      this.ngxLogger.debug(debugMessage);
    });
    this.traceSubscribtion = this.store.pipe(select(getTraceMessagesState)).subscribe(debugMessage => {
      this.ngxLogger.debug(debugMessage);
    });
  }

    ngOnDestroy(): void {
      this.debugSubscribtion.unsubscribe();
      this.infoSubscribtion.unsubscribe();
      this.warningSubscribtion.unsubscribe();
      this.errorSubscribtion.unsubscribe();
      this.fatalSubscribtion.unsubscribe();
      this.traceSubscribtion.unsubscribe();
    }
}