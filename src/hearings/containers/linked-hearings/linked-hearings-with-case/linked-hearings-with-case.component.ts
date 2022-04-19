import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, Subscription } from 'rxjs';
import { HearingListMainModel } from '../../../models/hearingListMain.model';
import { EXUIDisplayStatusEnum, HearingLinkedSelectionEnum, Mode } from '../../../models/hearings.enum';
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
  public linkedCases: ServiceLinkedCasesModel[] = [];
  public sub: Subscription;
  public linkHearingForm: FormGroup;
  public caseTitle: string;
  public caseReference: string;
  public isHearingsAvailable: boolean;
  public linkedHearingEnum = HearingLinkedSelectionEnum;
  public mode: Mode;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly validators: ValidatorsUtils,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly fb: FormBuilder) {
    this.mode = this.route.snapshot.data.mode;
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingId = this.route.snapshot.params.hearingId;
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.caseName : '';
      }
    );
  }

  public get pageMode(): typeof Mode {
    return Mode;
  }

  public get getCasesFormValue(): FormArray {
    return (this.linkHearingForm.get('linkedCases') as FormArray);
  }

  public getHearingsFormValue(position): FormArray {
    return this.getCasesFormValue.controls[position].get('hearings') as FormArray;
  }

  public get getCasesFormArray(): FormArray {
    return this.fb.array(this.linkedCases.map((caseInfo: ServiceLinkedCasesModel) => this.fb.group({
      caseReference: caseInfo.caseReference,
      caseName: caseInfo.caseName,
      reasonsForLink: this.fb.array(caseInfo.reasonsForLink),
      hearings: this.getHearingsFormArray(caseInfo.hearings),
    })));
  }

  public getHearingsFormArray(hearings: HearingDetailModel[]): FormArray {
    return this.fb.array(hearings.map((hearingInfo: HearingDetailModel) => this.fb.group({
      hearingId: hearingInfo.hearingId,
      hearingStage: hearingInfo.hearingStage,
      isSelected: hearingInfo.isSelected,
      hearingStatus: hearingInfo.hearingStatus,
      hearingIsLinkedFlag: hearingInfo.hearingIsLinkedFlag
    })));
  }

  public initForm(): void {
    this.linkHearingForm = this.fb.group({
      linkedCases: this.getCasesFormArray
    });
  }

  public ngOnInit(): void {
    this.initForm();
    this.getAllCaseInformation();
  }

  public updateLinkedCase(casePos: number, hearingPos: number) {
    this.linkedCases[casePos].hearings.forEach((hearingInfo, pos) => {
      const isSelected = (pos !== hearingPos) ? false : true;
      hearingInfo.isSelected = isSelected;
      this.getHearingsFormValue(casePos).controls[pos].patchValue(hearingInfo);
      return hearingInfo;
    });
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
      this.initForm();
    });
  }

  public saveLinkedHearingInfo(): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesSuccess(this.linkedCases));
    this.navigate();
  }

  public onSubmit() {
    if (this.mode === this.pageMode.MANAGE_HEARINGS) {
      this.saveLinkedHearingInfo();
    } else {
      this.validationErrors = [];
      this.linkedHearingSelectionError = null;
      if (this.linkHearingForm.valid) {
        this.saveLinkedHearingInfo();
      } else {
        this.linkedHearingSelectionError = this.linkedHearingEnum.ValidSelectionError;
        this.validationErrors.push({ id: 'linked-form', message: this.linkedHearingEnum.ValidSelectionError });
      }
    }
  }

  public clearHearings(caseReference: string): void {
    const formArray = this.linkHearingForm.get('hearings') as FormArray;
    for (const control of formArray.controls) {
      const formGroup = control as FormGroup;
      if (formGroup.value.caseReference === caseReference) {
        formGroup.controls['hearingReference'].reset();
        break;
      }
    }
  }

  public navigate(): void {
    if (this.mode === this.pageMode.MANAGE_HEARINGS) {
      this.router.navigate([`/hearings/link/${this.caseId}/${this.hearingId}/check-your-answers`]);
    } else {
      this.router.navigate([`/hearings/link/${this.caseId}/${this.hearingId}/group-selection`]);
    }
  }

  public onBack(): void {
    this.router.navigate(['/', 'cases', 'case-details', this.caseId, 'hearings']);
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
