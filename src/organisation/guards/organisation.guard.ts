import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { take, filter, tap, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';


@Injectable()
export class OrganisationGuard implements CanActivate {
    constructor(private store: Store<fromStore.OrganisationState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.pipe(select(fromStore.getOrganisationLoaded),
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadOrganisation());
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}

