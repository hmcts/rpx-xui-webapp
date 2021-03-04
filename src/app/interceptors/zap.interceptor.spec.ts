import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpZapInterceptor } from './zap.interceptor';
import { Provider } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HttpZapInterceptor', () => {

    // let httpMock: HttpTestingController;
    let injector: TestBed;

    function createTestModule(providers: Provider[] = []) {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpZapInterceptor,
                multi: true
            },
            ]
        });
        injector = getTestBed();
        // httpMock = injector.get(HttpTestingController);
    }
  
    // beforeEach(() => TestBed.configureTestingModule({
    //         imports: [HttpClientTestingModule],
    //         providers: [
    //             { provide: HTTP_INTERCEPTORS, useClass: HttpZapInterceptor, multi: true },
    //         ]
    // }));

    describe('intercept HTTP requests', () => {
        beforeEach(() => {
          createTestModule();
        });
        it('should have X-XSS-Protection header', inject([HttpClient, HttpTestingController],
            (http: HttpClient, mock: HttpTestingController) => {
                http.get('/api').subscribe();
                const httpRequest = mock.expectOne('/api');
                expect(httpRequest.request.headers.has("X-XSS-Protection")).toBeTruthy();
                expect(httpRequest.request.headers.has("X-XSS-Protection")).toEqual(true);
                mock.verify();
            })
        );
        it('should add X-XSS-Protection to Headers', inject([HttpClient, HttpTestingController],
            (http: HttpClient, mock: HttpTestingController) => {
                http.get('/api').subscribe(response => expect(response).toBeTruthy());
                mock.expectOne(req => (req.headers.has('X-XSS-Protection')));
                mock.verify();
            })
        );
        it('should add X-Content-Type-Options to Headers', inject([HttpClient, HttpTestingController],
            (http: HttpClient, mock: HttpTestingController) => {
                http.get('/api').subscribe(response => expect(response).toBeTruthy());
                mock.expectOne(req => (req.headers.has('X-Content-Type-Options') && req.headers.get('X-Content-Type-Options') === 'nosniff'));
                mock.verify();
            })
        );
        it('should not have X-Powered-By in Headers', inject([HttpClient, HttpTestingController],
            (http: HttpClient, mock: HttpTestingController) => {
                http.get('/api').subscribe(response => expect(response).toBeTruthy());
                mock.expectOne(req => (!req.headers.has('X-Powered-By')));
                mock.verify();
            })
        );
    });

    // afterEach(() => {
    //     httpMock.verify();
    // });

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
    }));
});
