import { Component, Input, OnInit } from '@angular/core';
import { MemberType, RadioOptions } from '../../../models/hearings.enum';
import { PanelRequirementsModel } from '../../../models/panelRequirements.model';

@Component({
  selector: 'exui-panel-details-section',
  templateUrl: './panel-details-section.component.html'
})
export class PanelDetailsSectionComponent implements OnInit {
  @Input() public panelRequirements: PanelRequirementsModel;

  public hearingPanel: string;

  public ngOnInit(): void {
    this.hearingPanel = this.getHearingPanel();
  }

  private getHearingPanel(): string {
    const panelMembers = this.panelRequirements?.panelPreferences?.filter((preference) => preference.memberType === MemberType.PANEL_MEMBER).length || 0;
    const panelSpecialisms = this.panelRequirements?.panelSpecialisms?.length || 0;
    if (panelMembers > 0 || panelSpecialisms > 0) {
      return RadioOptions.YES;
    }
    return RadioOptions.NO;
  }
}
