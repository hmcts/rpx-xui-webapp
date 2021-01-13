import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import * as fromRoot from '../../store';

@Injectable()
export class HealthCheckService implements OnDestroy {

    public routeSubscription: Subscription;

    constructor(
        private readonly http: HttpClient,
        private readonly store: Store<fromRoot.State>,
    ) { }

    public doHealthCheck(): Observable<any> {
        const healthState: boolean = true;
        const result: { healthState } = { healthState };
        let path = '';

        this.routeSubscription = this.store.pipe(select(fromRoot.getRouterUrl)).subscribe(value => {
            path = value;
        });

        return path ? this.http.get(`/api/healthCheck?path=${encodeURIComponent(path)}`) : of(result);
    }

    public ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }

}
