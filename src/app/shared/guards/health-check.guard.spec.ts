import { TestBed, inject } from '@angular/core/testing';
import { HealthCheckGuard } from './health-check.guard';
import { StoreModule, Store } from '@ngrx/store';
import { HealthCheckService } from '../services/health-check.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class HttpClientMock {

    get() {
        return 'response';
    }
}

const healthCheckServiceMock = {
    http: null,
    store: null,
    doHealthCheck: () => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@');
        return of('response');
    },
    ngOnDestroy: () => {}
};

describe('HealthCheckGuard', () => {
    let healthCheckGuardInstance: HealthCheckGuard;
    let healthCheckServiceInstance: HealthCheckService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ],
            providers: [
                HealthCheckGuard,
                { provide: HttpClient, useClass: HttpClientMock },
                { provide: HealthCheckService, useValue: healthCheckServiceMock }
            ]
        });
    });

    beforeEach(() => {
        healthCheckGuardInstance = TestBed.get(HealthCheckGuard);
        healthCheckServiceInstance = TestBed.get(HealthCheckService);
    });

    it('should have canActivate', inject([HealthCheckGuard], (guard: HealthCheckGuard) => {
        expect(guard.canActivate).toBeDefined();
    }));

    describe('canActivate', () => {
        // it('should trigger service call', () => {
        //     healthCheckGuardInstance = new HealthCheckGuard(healthCheckServiceInstance, null);
        //     const doHealthCheckSpy = spyOn(healthCheckServiceInstance, 'doHealthCheck');
        //     healthCheckGuardInstance.canActivate();
        //     expect(doHealthCheckSpy()).toHaveBeenCalled();
        // });


        // it('should trigger service call', inject([HealthCheckGuard, HealthCheckService],
        //     (guard: HealthCheckGuard, service: HealthCheckService) => {

        //         spyOn(service, 'doHealthCheck');
        //         guard.canActivate();
        //         expect(service.doHealthCheck()).toHaveBeenCalled();
        // }));
    });


});
