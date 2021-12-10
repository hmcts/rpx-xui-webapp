import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ServiceHearingValuesModel } from 'api/hearings/models/serviceHearingValues.model';
import { Subscription } from 'rxjs';
import * as fromHearingStore from '../../../../hearings/store';
@Component({
  selector: 'xui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
  styleUrls: ['./hearing-requirements.component.scss']
})
export class HearingRequirementsComponent implements OnInit {
  public hearingRequirmentForm: FormGroup;
  public hearingStoreSub: Subscription;
  public hearingValueModel: ServiceHearingValuesModel;

  constructor(private readonly route: ActivatedRoute,
              private readonly hearingStore: Store<fromHearingStore.State>,
              fb: FormBuilder) {
    this.hearingRequirmentForm = fb.group({
    'stage-option': [null],
    });
  }

  public ngOnInit() {
    this.hearingStoreSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
    hearingValueModel => {
      this.hearingValueModel = hearingValueModel;
    });
  }
}
// ServiceHearingValuesModel

// caseFlags: {
//   flags: [
//     {
//       partyName: 'Jane and Smith',
//       flagId: 'Language Interpreter',
//       flagDescription: 'Spanish interpreter required',
//       flagStatus: 'ACTIVE',
//     },
//     {
//       partyName: 'Jane and Smith',
//       flagId: 'Sign language interpreter',
//       flagDescription: 'Sign language interpreter required',
//       flagStatus: 'ACTIVE',
//     },
//     {
//       partyName: 'Jane and Smith',
//       flagId: 'Reasonable adjustment',
//       flagDescription: 'Hearing loop required',
//       flagStatus: 'ACTIVE',
//     },
//     {
//       partyName: 'DWP',
//       flagId: 'case flag 1',
//       flagDescription: 'case flag 1 description',
//       flagStatus: 'ACTIVE',
//     },
//   ],
