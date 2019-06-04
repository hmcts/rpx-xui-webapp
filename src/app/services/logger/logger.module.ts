import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ExuiLoggerComponent } from './exui-logger/exui-logger.component';

@NgModule({
    declarations: [
        ExuiLoggerComponent
    ],
    imports: [
        BrowserModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [],
    exports: [ExuiLoggerComponent]
})
export class LoggerModule {
}
