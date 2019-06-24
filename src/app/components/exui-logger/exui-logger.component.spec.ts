import { TestBed, async } from '@angular/core/testing';
import { ExuiLoggerComponent } from './exui-logger.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { ProvidersModule } from 'src/app/providers/providers.module';
import { NGXLogger } from 'ngx-logger';
import {reducers} from '../../../cases/store/reducers';

class MockNGXLogger {
    trace(message: any, ...additional: any[]): void {}
    debug(message: any, ...additional: any[]): void {}
    info(message: any, ...additional: any[]): void {}
    log(message: any, ...additional: any[]): void {
    }
    warn(message: any, ...additional: any[]): void {
    }
    error(message: any, ...additional: any[]): void {
    }
    fatal(message: any, ...additional: any[]): void {
    }
}

describe('ExuiLogger', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          StoreModule.forRoot({...reducers}),
          ProvidersModule
        ],
        declarations: [
          ExuiLoggerComponent
        ],
        providers: [
          {
            provide: NGXLogger,
            useValue: MockNGXLogger
          }
        ]
      }).compileComponents();
    }));
    it('should create the app', () => {
        const fixture = TestBed.createComponent(ExuiLoggerComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
        expect(app.ngOnInit).toBeTruthy();
    });

});
