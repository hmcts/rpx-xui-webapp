import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { HMCStatus } from 'api/hearings/models/hearings.enum';
import { forkJoin, Subscription } from 'rxjs';
import { HearingListMainModel } from '../../../../hearings/models/hearingListMain.model';
import { LinkedHearingsDetailModel, ServiceLinkedCasesModel } from '../../../../hearings/models/linkHearings.model';
import { ACTION } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-linked-hearings-with-case',
  templateUrl: './linked-hearings-with-case.component.html',
  styleUrls: ['./linked-hearings-with-case.component.scss']
})
export class LinkedHearingsWithCaseComponent implements OnInit, OnDestroy {
  public linkedCases: ServiceLinkedCasesModel[];
  public sub: Subscription;
  public caseId: string;
  public linkHearingForm: FormGroup;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly route: ActivatedRoute,
              private readonly fb: FormBuilder) {
    this.caseId = this.route.snapshot.params.caseId;
  }

  public addHearingFormGroup(caseRef: string): FormGroup {
    return this.fb.group({
      caseReference: caseRef,
      hearingReference: new FormControl(),
    });
  }

  public ngOnInit(): void {
    this.linkHearingForm = this.fb.group({
      hearings: this.fb.array([])
    });
    this.getAllCaseInformation();
  }

  public getAllCaseInformation() {
    const receivedCases: ServiceLinkedCasesModel[] = this.route.snapshot.data.linkedCase && this.route.snapshot.data.linkedCase.serviceLinkedCases || [];
    const linkedCaseIds: string[] = receivedCases.map((caseDetails: ServiceLinkedCasesModel) => caseDetails.caseReference);
    const hearingServices = [];
    linkedCaseIds.forEach(id => {
      hearingServices.push(this.hearingsService.getAllHearings(id));
    });
    this.sub = forkJoin(hearingServices).subscribe((hearingsList: HearingListMainModel[]) => {
      this.linkedCases = receivedCases.map((caseInfo: ServiceLinkedCasesModel, pos: number) => {
        (this.linkHearingForm.get('hearings') as FormArray).push(this.addHearingFormGroup(caseInfo.caseReference));
        const hearings = [] as LinkedHearingsDetailModel[];
        hearingsList[pos].caseHearings.forEach((hearing) => {
          if (hearing.hmcStatus === HMCStatus.UPDATE_REQUESTED || hearing.hmcStatus === HMCStatus.UPDATE_REQUESTED) {
            const hearingInfo: LinkedHearingsDetailModel = {
              hearingId: hearing.hearingID,
              hearingOrder: 0,
              hearingStage: hearing.exuiDisplayStatus,
              isSelected: false,
              hearingStatus: hearing.exuiSectionStatus,
              hearingIsLinkedFlag: hearing.hearingIsLinkedFlag
            };
            hearings.push(hearingInfo);
          }
        });
        return {
          hearings,
          ...caseInfo
        };
      });
    });
  }

  public onSubmit() {
    if (this.linkHearingForm.value) {
      this.linkHearingForm.value.hearings.forEach(formValue => {
        this.linkedCases.forEach((caseInfo: ServiceLinkedCasesModel, pos: number) => {
          if (caseInfo.caseReference === formValue.caseReference) {
            caseInfo.hearings.forEach((hearing) => {
              if (hearing.hearingId === formValue.hearingReference) {
                hearing.isSelected = true;
              }
            });
          }
        });
      });
      this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesSuccess(this.linkedCases));
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onBack(): void {
    this.hearingsService.navigateAction(ACTION.BACK);
  }

}
