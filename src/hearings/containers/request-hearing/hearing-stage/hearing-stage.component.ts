import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Actions } from 'api/hearings/models/hearings.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { RefDataModel } from 'src/hearings/models/refData.model';
import { HearingsRefDataService } from 'src/hearings/services/hearings-ref-data.service';
import * as fromHearingStore from '../../../../hearings/store';
import { HearingValuesStateData } from '../../../models/hearingValuesStateData';
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
  public hearing$: Observable<string>;

  constructor(private readonly hearingsRefDataService: HearingsRefDataService,
              private readonly hearingStore: Store<fromHearingStore.State>,
              fb: FormBuilder) {
    this.stageForm = fb.group({
      'stage-option': [null],
    });

    this.hearing$ = this.hearingStore.pipe(select(fromHearingStore.getHearingValues)).pipe(
      map(hearingValuesModel => hearingValuesModel.serviceHearingValuesModel.hearingType)
    );
    // this.hearing$.subscribe(hearingValuesStateData => {
    //   this.hearingType =  hearingValuesStateData ? hearingValuesStateData.serviceHearingValuesModel.hearingType : '';
    // });

    // this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
    //   map(userDetails => userDetails.userInfo.roles)
    // );
  }

  public ngAfterViewInit(): void {
    this.hearingStageOptions$.subscribe(hearingStageOptions => {
      this.radios.forEach((radio, index) => {
        radio.nativeElement.value = hearingStageOptions.length > index ? hearingStageOptions[index].key : '';
        // radio.nativeElement.checked = this.hearingType ===  hearingStageOptions[index].key ? true : false;
      });
    });

    this.stageForm.controls['stage-option'].setValue(this.hearingType);
  }

  public ngOnInit() {
    this.hearingStageOptions$ = this.hearingsRefDataService.getRefData('HearingType', 'SSCS');
  }
}
