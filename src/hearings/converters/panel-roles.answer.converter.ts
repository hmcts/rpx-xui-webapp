import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class PanelRolesAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const panelRoles: LovRefDataModel[] = this.route.snapshot.data.otherPanelRoles;

    return hearingState$.pipe(
      map((state) => {
        const panelRequirements = state.hearingConditions?.isHearingAmendmentsEnabled
          ? state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements
          : state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const SelectedPanelSpecialism: string[] = panelRequirements && panelRequirements.panelSpecialisms || [];
        const SelectedPanelRoles: string[] = panelRequirements && panelRequirements.roleType || [];
        const panelRolesRequired: string[] = [];
        SelectedPanelRoles.forEach((roleName) => {
          let selectedRoleName: string = '';
          panelRoles.forEach((role) => {
            if (role.key === roleName) {
              if (!(role.child_nodes && role.child_nodes.length)){
                selectedRoleName = role.value_en;
                panelRolesRequired.push(selectedRoleName);
              }
            }
          });
        });
        SelectedPanelSpecialism.forEach((specialismName) => {
          let selectedSpecialismName: string = '';
          panelRoles.forEach((role) => {
            if (role.key === specialismName) {
              selectedSpecialismName = role.value_en;
            } else if (role.child_nodes && role.child_nodes.length) {
              role.child_nodes.forEach((specialism) => {
                if (specialismName === specialism.key && !selectedSpecialismName.length) {
                  selectedSpecialismName = `${role.value_en} - ${specialism.value_en}`;
                }
              });
            }
          });
          if (selectedSpecialismName.length > 0) {
            panelRolesRequired.push(selectedSpecialismName);
          }
        });
        return panelRolesRequired.join('<br>');
      })
    );
  }
}
