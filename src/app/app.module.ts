import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoggerModule } from './logger/logger.module';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {enableTracing: true}),
    LoggerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
