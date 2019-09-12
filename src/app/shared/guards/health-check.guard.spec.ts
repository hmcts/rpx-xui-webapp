import { TestBed, inject } from '@angular/core/testing';
import { HealthCheckGuard } from './health-check.guard';
import { StoreModule } from '@ngrx/store';
import { HealthCheckService } from '../services/health-check.service';
import { HttpClient } from '@angular/common/http';

class HttpClientMock {

    get() {
        return 'response';
    }
}

describe('HealthCheckGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ],
            providers: [
                HealthCheckGuard,
                HealthCheckService,
                { provide: HttpClient, useClass: HttpClientMock }
            ]
        });
    });

    it('should exist', inject([HealthCheckGuard], (guard: HealthCheckGuard) => {
        expect(guard).toBeTruthy();
    }));

});
