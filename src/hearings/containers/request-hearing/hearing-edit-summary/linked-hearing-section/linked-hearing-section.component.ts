import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import * as fromHearingStore from '../../../../../hearings/store';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-linked-hearing-section',
  templateUrl: './linked-hearing-section.component.html'
})
export class LinkedHearingSectionComponent {
  @Input() public hearingIsLinkedFlag: boolean;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public hearingState$: Observable<fromHearingStore.State>;
  public showAmmended: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.hearingState$.subscribe((state) => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingIsLinkedFlag;
      const objB = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingIsLinkedFlag;
      this.showAmmended = !_.isEqual(objA, objB);
    });
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-link#yes';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
