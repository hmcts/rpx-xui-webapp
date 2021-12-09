import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromHearingStore from '../../../../hearings/store';
@Component({
  selector: 'xui-hearing-requirements',
  templateUrl: './hearing-requirements.component.html',
  styleUrls: ['./hearing-requirements.component.scss']
})
export class HearingRequirementsComponent implements OnInit {
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
    this.hearingType = hearingValueModel && hearingValueModel.hearingType ? hearingValueModel.hearingType :  this.hearingType;
    }
    );
    }

}


// ServiceHearingValuesModel