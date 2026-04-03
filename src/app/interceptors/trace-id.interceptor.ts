// src/app/interceptors/trace-id.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionTelemetryService } from '../services/session-telemetry.service';

@Injectable()
export class TraceIdInterceptor implements HttpInterceptor {
  constructor(private telemetry: SessionTelemetryService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const traceId = this.telemetry?.traceId;
    if (!traceId) {
      return next.handle(req);
    }
    const cloned = req.clone({
      setHeaders: {
        'x-trace-id': traceId,
      },
    });
    return next.handle(cloned);
  }
}
