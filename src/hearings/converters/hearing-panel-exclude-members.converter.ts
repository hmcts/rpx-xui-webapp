import { ActivatedRoute } from "@angular/router";
import { MemberType } from "api/hearings/models/hearings.enum";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RequirementType } from "../models/hearings.enum";
import { JudicialUserModel } from "../models/judicialUser.model";
import { State } from "../store";
import { AnswerConverter } from "./answer.converter";

export class HearingPanelExcludeMemberConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        const panelRequirementsState =
          state.hearingRequest.hearingRequestMainModel.hearingDetails
            .panelRequirements;
        const panelDetailsResolverData = this.route.snapshot.data.panelDetails;
        let transformedResult = "<ul>";
        const personalCodes = panelRequirementsState.panelPreferences
          .filter((ref) => ref.requirementType === RequirementType.EXCLUDE)
          .map((ref) => ref.memberID);

        (panelDetailsResolverData as JudicialUserModel[])
          .filter((routeData) =>
            personalCodes.includes(routeData.personal_code)
          )
          .forEach((data) => {
            let personDetails = panelRequirementsState.panelPreferences.find(
              (ref) => ref.memberID === data.personal_code
            );
            if (personDetails.memberType === MemberType.PANEL_MEMBER) {
              transformedResult += `<li>${data.full_name}</li>`;
            } else {
              // TODO - have to revisit after we have incl the member type enum for JUDGE
              transformedResult += `<li>${data.known_as}</li>`;
            }
          });
        return transformedResult + "</ul>";
      })
    );
  }
}
