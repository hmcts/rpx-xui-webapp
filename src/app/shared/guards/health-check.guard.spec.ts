import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HealthCheckService } from '../services/health-check.service';
import { HealthCheckGuard } from './health-check.guard';

class HttpClientMock {

    public get() {
        return {healthState: true};
    }
}

const healthCheckServiceMock = jasmine.createSpyObj('HealthCheckService', [
    'doHealthCheck'
]);

const storeMock = jasmine.createSpyObj('Store', [
    'dispatch'
]);

describe('HealthCheckGuard', () => {
    let healthCheckServiceInstance: HealthCheckService;
    let storeInstance: Store<any>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ],
            providers: [
                HealthCheckGuard,
                { provide: HttpClient, useClass: HttpClientMock },
                { provide: HealthCheckService, useValue: healthCheckServiceMock},
                { provide: Store, useValue: storeMock}
            ]
        });
    });

    beforeEach(() => {
        healthCheckServiceInstance = TestBed.get(HealthCheckService);
        storeInstance = TestBed.get(Store);
    });

    describe('canActivate', () => {
        it('should trigger service call', inject([HealthCheckGuard], (guard: HealthCheckGuard) => {
            const healthState: boolean = true;
            const result: { healthState } = { healthState };
            healthCheckServiceMock.doHealthCheck.and.returnValue(of(result));
            guard.canActivate().subscribe(() => {
                expect(healthCheckServiceInstance.doHealthCheck).toHaveBeenCalled();
            });
        }));

        it('should trigger service down when there is a false healthstate', inject([HealthCheckGuard], (guard: HealthCheckGuard) => {
            const healthState: boolean = false;
            const result: { healthState } = { healthState };
            healthCheckServiceMock.doHealthCheck.and.returnValue(of(result));
            guard.canActivate().subscribe(() => {
                expect(storeInstance.dispatch).toHaveBeenCalled();
            });
        }));

        it('should trigger service down when there is an error', inject([HealthCheckGuard], (guard: HealthCheckGuard) => {
            healthCheckServiceMock.doHealthCheck.and.returnValue(Observable.throwError({status: 404}));
            guard.canActivate().subscribe(() => {
                expect(storeInstance.dispatch).toHaveBeenCalled();
            });
        }));

    });

});
