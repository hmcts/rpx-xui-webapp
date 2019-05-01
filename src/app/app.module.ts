import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoggerModule } from './logger/logger.module';
import { CaseFeatureModule } from './case/case-feature/case-feature.module';
import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CaseFeatureModule,
    RouterModule.forRoot(ROUTES),
    LoggerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
