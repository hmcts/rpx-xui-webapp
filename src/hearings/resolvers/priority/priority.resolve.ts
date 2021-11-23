import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { RefDataModel } from 'api/hearings/models/refData.model';
import { forkJoin, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HearingsDataService } from 'src/hearings/services/hearings-data.service';

@Injectable({
  providedIn: 'root'
})
export class PriorityResolver implements Resolve<{ priorities: RefDataModel[] }> {
  constructor(
    private readonly router: Router,
    private readonly hearingsDataService: HearingsDataService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ priorities: RefDataModel[] }> {
    const priorities$ = this.hearingsDataService.getPriorities().pipe(
      catchError(error => {
        return [];
      })
    ) as Observable<RefDataModel[]>;

    return forkJoin({ priorities: priorities$ });
  }
}
