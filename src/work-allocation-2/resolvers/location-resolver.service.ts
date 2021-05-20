import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { first, map, mergeMap } from 'rxjs/operators';
import { UserDetails } from '../../app/models/user-details.model';
import * as fromRoot from '../../app/store';
import * as fromCaseList from '../../app/store/reducers';
import { Caseworker, JudicialWorker, Location } from '../models/dtos';
import { CaseworkerDataService } from '../services';
import { JudicialWorkerDataService } from '../services/judicialworker-data.service';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<Location> {

  constructor(
    private readonly store: Store<fromCaseList.State>,
    private readonly caseworkerDataService: CaseworkerDataService,
    private readonly judicialWorkersDataService: JudicialWorkerDataService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Location> {
    return this.userDetails()
      .pipe(
        first(),
        mergeMap((userDetails: UserDetails) => this.caseworkerDataService.getAll()
          .pipe(
            map((caseWorkers: Caseworker[]) => this.extractLocation(userDetails, caseWorkers))
          )
        )
      );
  }

  private userDetails(): Observable<UserDetails> {
    return this.store.pipe(select(fromRoot.getUserDetails));
  }

  private extractLocation(userDetails: UserDetails, workers: Caseworker[] | JudicialWorker[]): Location {
    const id = userDetails.userInfo.id;
    const worker = workers.find((cw: Caseworker) => cw.idamId === id);
    console.log(worker);
    return worker ? worker.location : null;
  }

  private getJudicialWorkersOrCaseWorkers(userDetails: UserDetails): Observable<Caseworker[]> | Observable<JudicialWorker[]> {
    const isCaseWorker = userDetails.userInfo.roles.filter((role: string) => role.includes('caseworker')).length;
    return isCaseWorker ? this.caseworkerDataService.getAll() : this.judicialWorkersDataService.getAll();
  }
}
