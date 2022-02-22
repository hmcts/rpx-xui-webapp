import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RequirementType } from "../models/hearings.enum";
import { LovRefDataModel } from "../models/lovRefData.model";
import { State } from "../store";
import { AnswerConverter } from "./answer.converter";

export class HearingPanelExcludeMemberConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        let panelPreferences =
          state.hearingRequest.hearingRequestMainModel.hearingDetails
            .panelRequirements.panelPreferences || [];
        let result = "<ul>";
        panelPreferences
          .filter((ref) => ref.requirementType === RequirementType.EXCLUDE)
          .map((member) => {
            result += `<li>${member.memberID}</li>`;
          });
        return result + "</ul>";
      })
    );
  }
}
