import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { LoggerMessage } from '../..//store/reducers/logger.reducer';
import { Store, select } from '@ngrx/store';
import { getDebugMessagesState, getInfoMessagesState, getWarningMessagesState, getErrorMessagesState,
  getFatalMessagesState, getTraceMessagesState } from '../../store/selectors/logger.selector';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'exui-logger',
  template: `
    <div>
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

  constructor(private ngxLogger: NGXLogger, private store: Store<LoggerMessage>,
              private logger: LoggerService) { }
  @Input() title: string;
  ngOnInit(): void {
    this.logger.trace(this.title + ' logger.trace()');
    this.logger.error(this.title + ' logger.error()');
    this.logger.fatal(this.title + ' logger.fatal()');
    this.logger.info(this.title + ' logger.info()');
    this.logger.debug(this.title + ' logger.debug()');
    this.logger.warn(this.title + ' logger.warn()');

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
      if (this.debugSubscribtion) {
        this.debugSubscribtion.unsubscribe();
      }
      if (this.infoSubscribtion) {
        this.infoSubscribtion.unsubscribe();
      }
      if (this.warningSubscribtion) {
        this.warningSubscribtion.unsubscribe();
      }
      if (this.errorSubscribtion) {
        this.errorSubscribtion.unsubscribe();
      }
      if (this.fatalSubscribtion) {
        this.fatalSubscribtion.unsubscribe();
      }
      if (this.traceSubscribtion) {
        this.traceSubscribtion.unsubscribe();
      }
    }
}
