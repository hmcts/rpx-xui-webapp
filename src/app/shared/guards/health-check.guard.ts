import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as fromRoot from '../../store';
import { HealthCheckService } from '../services/health-check.service';
import { LoggerService } from '../../services/logger/logger.service';

@Injectable()
export class HealthCheckGuard implements CanActivate {
  constructor(
        private readonly healthCheck: HealthCheckService,
        private readonly store: Store<fromRoot.State>,
        private readonly loggerService: LoggerService
  ) {}

  public canActivate() {
    return this.checkHealth().pipe(
      switchMap((res: any) => {
        const state = res.healthState;
        if (!state) {
          this.redirectToServiceDownPage();
        }
        return of(res.healthState);
      }),
      catchError((err) => {
        this.loggerService.error('Error in HealthCheckGuard:canActivate', err);
        this.redirectToServiceDownPage();
        return of(false);
      })
    );
  }

  public checkHealth(): Observable<boolean> {
    return this.healthCheck.doHealthCheck();
  }

  public redirectToServiceDownPage() {
    this.store.dispatch(new fromRoot.Go({ path: ['/service-down'] }));
  }
}

