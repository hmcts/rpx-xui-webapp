import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpZapInterceptor } from './zap.interceptor';

describe('HttpZapInterceptor', () => {
    beforeEach(() => TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: HttpZapInterceptor, multi: true },
            ]
    }));

    describe('intercept HTTP requests', () => {
        it('should add X-XSS-Protection to Headers', inject([HttpClient, HttpTestingController],
            (http: HttpClient, mock: HttpTestingController) => {
                http.get('/api').subscribe(response => expect(response).toBeTruthy());
                mock.expectOne(req => (req.headers.has('X-XSS-Protection') && req.headers.get('X-XSS-Protection') === '1; mode=block'));
                mock.verify();
            })
        );
    });

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
            mock.verify();
    }));
});
