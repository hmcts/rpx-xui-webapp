import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HealthCheck } from 'src/cases/models/healthCheck.model';
import * as fromRoot from '../../store';
import { HealthCheckService } from '../services/health-check.service';

@Injectable()
export class HealthCheckGuard implements CanActivate {
    constructor(
        private readonly healthCheck: HealthCheckService,
        private readonly store: Store<fromRoot.State>,
    ) {
    }

    public canActivate(): Observable<boolean> {
        return this.checkHealth().pipe(
            switchMap(res => {
                const state = res.healthState;
                if (!state) {
                    this.redirectToServiceDownPage();
                }
                return of(res.healthState);
            }),
            catchError(() => {
                this.redirectToServiceDownPage();
                return of(false);
            })
        );
    }

    private checkHealth(): Observable<HealthCheck> {
        return this.healthCheck.doHealthCheck();
    }

    private redirectToServiceDownPage() {
        this.store.dispatch(new fromRoot.Go({ path: ['/service-down'] }));
    }
}

