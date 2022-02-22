import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LovRefDataModel } from "../models/lovRefData.model";
import { State } from "../store";
import { AnswerConverter } from "./answer.converter";

export class HearingPanelConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        console.log(state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.length)
        return state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.length > 0
          ? "Yes"
          : "No";
      })
    );
  }
}
