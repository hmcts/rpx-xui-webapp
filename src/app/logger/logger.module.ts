import {NgModule, Optional, SkipSelf} from '@angular/core';
import {LoggerService} from './logger.service';
import {ConsoleLoggerService} from './console-logger.service';

@NgModule({
  providers: [
    {
      provide: LoggerService,
      useClass: ConsoleLoggerService
    }
  ]
})
export class LoggerModule {
  constructor(@Optional() @SkipSelf() parentModule: LoggerModule) {
    if (parentModule) { console.error('LoggerModule already loaded; import in root module only.'); }
  }
}
