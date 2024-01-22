import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import * as fromHearingStore from '../../../../../hearings/store';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-language-requirements-section',
  templateUrl: './language-requirements-section.component.html'
})
export class LanguageRequirementsSectionComponent {
  @Input() public hearingInWelshFlag: boolean;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public hearingState$: Observable<fromHearingStore.State>;
  public showAmmended: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.hearingState$.subscribe((state) => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingInWelshFlag;
      const objB = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingInWelshFlag;
      this.showAmmended = !_.isEqual(objA, objB);
    });
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-welsh#welsh_hearing_yes';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
