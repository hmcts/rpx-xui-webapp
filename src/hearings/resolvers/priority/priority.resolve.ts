import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HearingPriorityType } from '../../../hearings/models/hearings.enum';
import { RefDataModel } from '../../../hearings/models/refData.model';
import { HearingsRefDataService } from '../../services/hearings-ref-data.service';

@Injectable({
  providedIn: 'root'
})
export class PriorityResolver implements Resolve<RefDataModel[]> {
  constructor(
    private readonly router: Router,
    private readonly hearingsDataService: HearingsRefDataService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RefDataModel[]> {
    return this.hearingsDataService.getRefData(HearingPriorityType.Priority, HearingPriorityType.SSCS).pipe(
      catchError(error => {
        return [];
      })
    );
  }
}
