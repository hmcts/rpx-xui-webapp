import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpDefaultInterceptor implements HttpInterceptor {

    constructor(private http: HttpClient) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
                'Content-Type': 'application/json',
                'X-XSS-Protection': '1; mode=block',
                'X-Content-Type-Options': 'nosniff',
                'Cache-Control': 'no-store, no-cache',
                Pragma: 'no-cache',
            }
        });
        return next.handle(req);
    }
}
