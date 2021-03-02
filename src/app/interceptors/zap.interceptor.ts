import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpZapInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenExtractor.getToken() as string;
    if (token !== null && !req.headers.has('X-XSRF-TOKEN')) {
        req = req.clone({ headers: req.headers.set('X-XSRF-TOKEN', token) });
    }
    if (req.headers.has('X-Powered-By') || req.headers.has('x-powered-by')) {
        req = req.clone({
            headers: req.headers
            .delete('X-Powered-By', 'XUI Server 1.0')
            .delete('X-Powered-By', 'Express')
            .delete('x-powered-by', 'XUI Server 1.0')
            .delete('x-powered-by', 'Express')
        });
    }
    req = req.clone({
        setHeaders: {
            'X-XSS-Protection': '1; mode=block',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'no-store, no-cache',
            Pragma: 'no-cache',
        }
    });
    return next.handle(req);
  }
}
