import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoggerModule } from './logger/logger.module';
import { CaseFeatureModule } from './case/case-feature/case-feature.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoggerModule,
    CaseFeatureModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
