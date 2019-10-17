import { inject, TestBed } from '@angular/core/testing';
import { HealthCheckService } from './health-check.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, BehaviorSubject } from 'rxjs';

describe('HealthCheckService', () => {
    const mockedValue = 'dummy';
    const storeSubjectMock = new BehaviorSubject(mockedValue);
    const mockedStore = {
        pipe: () => storeSubjectMock.asObservable(),
    };

    const httpClientMock = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                HealthCheckService,
                { provide: HttpClient, useValue: httpClientMock },
                { provide: Store, useValue: mockedStore }
            ]
        });
    });

    it('should be created', inject([HealthCheckService], (service: HealthCheckService) => {
        expect(service).toBeTruthy();
    }));

    describe('doHealthCheck', () => {
        it('should query health state', inject([HealthCheckService], (service: HealthCheckService) => {
            service.doHealthCheck();
            expect(httpClientMock.get).toHaveBeenCalledWith('/api/healthCheck?path=dummy');
        }));

    });

});
