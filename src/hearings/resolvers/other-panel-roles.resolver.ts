import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HearingRequestMainModel } from "../models/hearingRequestMain.model";
import { HearingRequestStateData } from "../models/hearingRequestStateData.model";
import { LovRefDataModel } from "../models/lovRefData.model";
import { JudicialRefDataService } from "../services/judicial-ref-data.service";
import { LovRefDataService } from "../services/lov-ref-data.service";
import * as fromHearingStore from "../store";

@Injectable({
  providedIn: "root",
})
export class OtherPanelRolesResolver implements Resolve<LovRefDataModel[]> {
  public hearingRequestMainModel$: Observable<HearingRequestStateData>;
  public hearingRequestMainModel: HearingRequestMainModel;
  public constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly lovRefDataService: LovRefDataService,
    protected readonly judicialRefDataService: JudicialRefDataService
  ) {}

  public resolve(
    route?: ActivatedRouteSnapshot
  ): Observable<LovRefDataModel[]> {
    return this.lovRefDataService
      .getListOfValues("OtherPanelRoles", "SSCS")
      .pipe(
        map((data) => {
          return data.map((member) => member);
        })
      );
  }
}
