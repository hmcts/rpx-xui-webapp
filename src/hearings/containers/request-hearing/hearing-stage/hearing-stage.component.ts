import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Actions } from 'api/hearings/models/hearings.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RefDataModel } from 'src/hearings/models/refData.model';
import { HearingsRefDataService } from 'src/hearings/services/hearings-ref-data.service';
import * as fromHearingStore from '../../../../hearings/store';
import { ServiceHearingValuesModel } from '../../../models/serviceHearingValues.model';
@Component({
  selector: 'xui-hearing-stage',
  templateUrl: './hearing-stage.component.html',
  styleUrls: ['./hearing-stage.component.scss']
})
export class HearingStageComponent implements OnInit, AfterViewInit {
  public hearingsActions: Actions[] = [Actions.READ];
  public serviceHearingValueModel$: Observable<ServiceHearingValuesModel>;
  public foreName: string;
  public surname: string;
  public fullName: string;
  public hearingStageOptions$: Observable<RefDataModel[]>;
  public stageForm: FormGroup;
  public hearingType: string;
  @ViewChildren('radioButton') public radios: QueryList<any>;

  constructor(private readonly hearingsRefDataService: HearingsRefDataService,
              private readonly hearingStore: Store<fromHearingStore.State>,
              fb: FormBuilder) {
    this.stageForm = fb.group({
      'stage-option': [null],
    });
  }

  public ngAfterViewInit(): void {
    this.hearingStageOptions$.subscribe(hearingStageOptions => {
      this.radios.forEach((radio, index) => {
        radio.nativeElement.value = hearingStageOptions.length > index ? hearingStageOptions[index].key : '';
        radio.nativeElement.name = hearingStageOptions.length > index ? hearingStageOptions[index].value_en : '';
      });
    });

    this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).pipe(
      map(model => {
        this.stageForm.controls['stage-option'].setValue('initial');
        console.log('setvalue', this.stageForm.controls['stage-option'].value);
      })
    );

    this.stageForm.controls['stage-option'].setValue('initial');
  }

  public ngOnInit() {
    this.hearingStageOptions$ = this.hearingsRefDataService.getRefData('HearingType', 'SSCS');
  }
}
