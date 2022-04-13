import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, Subscription } from 'rxjs';
import { HearingListMainModel } from '../../../models/hearingListMain.model';
import { EXUIDisplayStatusEnum, HearingLinkedSelectionEnum } from '../../../models/hearings.enum';
import { HearingDetailModel, ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';

@Component({
  selector: 'exui-linked-hearings-with-case',
  templateUrl: './linked-hearings-with-case.component.html',
  styleUrls: ['./linked-hearings-with-case.component.scss']
})
export class LinkedHearingsWithCaseComponent implements OnInit, OnDestroy {
  public caseId: string;
  public hearingId: string;
  public caseName: string;
  public linkedHearingSelectionError: string;
  public validationErrors: { id: string, message: string }[] = [];
  public linkedCases: ServiceLinkedCasesModel[];
  public sub: Subscription;
  public linkHearingForm: FormGroup;
  public caseTitle: string;
  public caseReference: string;
  public isHearingsAvailable: boolean;
  public linkedHearingEnum = HearingLinkedSelectionEnum;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly validators: ValidatorsUtils,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly fb: FormBuilder) {
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingId = this.route.snapshot.params.hearingId;
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.caseName : '';
      }
    );
  }

  public addHearingFormGroup(caseRef: string): FormGroup {
    return this.fb.group({
      caseReference: caseRef,
      hearingReference: new FormControl(),
    });
  }

  public ngOnInit(): void {
    this.linkHearingForm = this.fb.group({
      hearings: this.fb.array([], this.validators.validateLinkedHearings())
    });
    this.getAllCaseInformation();
  }

  public getAllCaseInformation() {
    this.isHearingsAvailable = false;
    const receivedCases: ServiceLinkedCasesModel[] = this.route.snapshot.data.linkedCase && this.route.snapshot.data.linkedCase.serviceLinkedCases || [];
    const linkedCaseIds: string[] = receivedCases.map((caseDetails: ServiceLinkedCasesModel) => caseDetails.caseReference);
    const hearingServices = [];
    linkedCaseIds.forEach(id => {
      hearingServices.push(this.hearingsService.getAllHearings(id));
    });
    this.sub = forkJoin(hearingServices).subscribe((hearingsList: HearingListMainModel[]) => {
      this.linkedCases = receivedCases.map((caseInfo: ServiceLinkedCasesModel, pos: number) => {
        (this.linkHearingForm.get('hearings') as FormArray).push(this.addHearingFormGroup(caseInfo.caseReference));
        const hearings = [] as HearingDetailModel[];
        hearingsList[pos].caseHearings.forEach((hearing) => {
          if (hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.AWAITING_LISTING || hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.UPDATE_REQUESTED || hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.LISTED) {
            const hearingInfo: HearingDetailModel = {
              hearingId: hearing.hearingID,
              hearingStage: hearing.hearingType,
              isSelected: false,
              hearingStatus: hearing.exuiDisplayStatus,
              hearingIsLinkedFlag: hearing.hearingIsLinkedFlag
            };
            hearings.push(hearingInfo);
            this.isHearingsAvailable = true;
          }
        });
        return {
          hearings,
          ...caseInfo
        };
      });
    });
  }

  public saveLinkedHearingInfo(): void {
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
    this.router.navigate([`/hearings/link/${this.caseId}/${this.hearingId}/group-selection`])
  }

  public onSubmit() {
    this.validationErrors = [];
    this.linkedHearingSelectionError = null;
    if (this.linkHearingForm.valid) {
      this.saveLinkedHearingInfo();
    } else {
      this.linkedHearingSelectionError = this.linkedHearingEnum.ValidSelectionError;
      this.validationErrors.push({ id: 'linked-form', message: this.linkedHearingEnum.ValidSelectionError });
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
