import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoggerService} from './services/logger.service';
import {ConsoleLoggerService} from './services/console-logger.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ { provide: LoggerService, useClass: ConsoleLoggerService } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
