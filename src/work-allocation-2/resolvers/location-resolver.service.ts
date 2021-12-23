import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { AppUtils } from '../../app/app-utils';
import { UserDetails, UserRole } from '../../app/models/user-details.model';
import * as fromRoot from '../../app/store';
import * as fromCaseList from '../../app/store/reducers';
import { Caseworker, JudicialWorker, Location } from '../models/dtos';
import { CaseworkerDataService } from '../services';
import { JudicialWorkerDataService } from '../services/judicialworker-data.service';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<Location> {

  constructor(
    private readonly store: Store<fromCaseList.State>,
    private readonly router: Router,
    private readonly caseworkerDataService: CaseworkerDataService,
    private readonly judicialWorkerDataService: JudicialWorkerDataService
  ) {
  }

  public resolve(): Observable<any> {
    return this.userDetails()
      .pipe(
        first(),
        mergeMap((userDetails: UserDetails) => this.getJudicialWorkersOrCaseWorkers(userDetails)
          .pipe(
            map((caseWorkers) => this.extractLocation(userDetails, caseWorkers))
          )
        ),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
  }

  private userDetails(): Observable<UserDetails> {
    return this.store.pipe(select(fromRoot.getUserDetails));
  }

  private extractLocation(userDetails: UserDetails, workers: Caseworker[] | JudicialWorker[]): Location {
    const id = userDetails.userInfo.id ? userDetails.userInfo.id : userDetails.userInfo.uid;
    const worker = workers.find((cw: Caseworker) => cw.idamId === id);
    return worker ? worker.location : null;
  }

  private getJudicialWorkersOrCaseWorkers(userDetails: UserDetails): Observable<any[]> {
    const role = AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
    return role === UserRole.LegalOps ? this.caseworkerDataService.getAll() : this.judicialWorkerDataService.getAll();
  }
}
