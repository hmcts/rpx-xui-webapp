import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LovRefDataModel } from '../models/lovRefData.model';
import { HearingsService } from '../services/hearings.service';

@Injectable({
  providedIn: 'root'
})
export class CaseLinkingReasonCodesResolver implements Resolve<LovRefDataModel[]> {
  constructor(private readonly hearingsService: HearingsService) {}

  public resolve(route?: ActivatedRouteSnapshot): Observable<LovRefDataModel[]> {
    return this.hearingsService.loadCaseLinkingReasonCodes();
  }
}
