import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: []
})
export class LoggerModule {
}