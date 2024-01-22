import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import * as fromHearingStore from '../../../../../hearings/store';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-additional-instructions-section',
  templateUrl: './additional-instructions-section.component.html'
})
export class AdditionalInstructionsSectionComponent implements OnInit {
  @Input() public listingComments: string;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public additionalInstructions: string;
  public hearingState$: Observable<fromHearingStore.State>;
  public showAmmended: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.hearingState$.subscribe((state) => {
      const objA = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.listingComments;
      const objB = state.hearingRequest.hearingRequestMainModel.hearingDetails.listingComments;
      this.showAmmended = !_.isEqual(objA, objB);
    });

    this.additionalInstructions = this.listingComments?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '';
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-additional-instructions#additionalInstructionsTextarea';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
