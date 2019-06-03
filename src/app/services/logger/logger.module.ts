import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoggerEffects } from '../logger/effects/logger.effects';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forFeature([LoggerEffects])
    ],
    providers: []
})
export class LoggerModule {
}