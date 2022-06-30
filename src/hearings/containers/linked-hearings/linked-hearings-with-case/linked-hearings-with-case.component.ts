import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HearingLinkedSelectionEnum, Mode } from '../../../models/hearings.enum';
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
  public isManageLink: boolean;
  public isHearingsPreSelected: boolean;
  public caseId: string;
  public hearingGroupRequestId: string;
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
    this.isManageLink = this.route.snapshot.data.mode === Mode.MANAGE_HEARINGS;
    this.mode = this.route.snapshot.data.mode;
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingGroupRequestId = this.route.snapshot.params.hearingGroupRequestId;
    this.hearingId = this.route.snapshot.params.hearingId;
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.publicCaseName : '';
        this.isHearingsSelected(state.hearingLinks.serviceLinkedCases);
        if (this.isManageLink || this.isHearingsPreSelected) {
          this.linkedCases = state.hearingLinks.serviceLinkedCases;
        }
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

  public isHearingsSelected(linkedCases) {
    linkedCases.forEach((caseInfo) => {
      if (caseInfo.hearings && caseInfo.hearings.find((hearingInfo) => hearingInfo.isSelected === true)) {
        this.isHearingsPreSelected = true;
      }
    });
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
      hearingIsInLinkedGroup: hearingInfo.hearingIsInLinkedGroup
    })));
  }

  public initForm(): void {
    this.linkHearingForm = this.fb.group({
      linkedCases: this.getCasesFormArray
    }, { validator: this.validators.validateLinkedHearings() });
  }

  public ngOnInit(): void {
    this.initForm();
    const currentCase: ServiceLinkedCasesModel = {
      caseReference: this.caseId,
      caseName: this.caseName,
      reasonsForLink: [],
    };
    if (!this.isManageLink && !this.isHearingsPreSelected) {
      this.sub = this.hearingsService.getAllCaseInformation(currentCase, this.route.snapshot.data.linkedCase, this.isManageLink).subscribe((casesLinkedInfo) => {
        this.linkedCases = casesLinkedInfo;
        this.initForm();
        this.getHearingsAvailable();
      });
    } else {
      this.getHearingsAvailable();
    }
  }

  public getHearingsAvailable() {
    this.linkedCases.forEach((caseInfo) => {
      if (caseInfo.hearings && caseInfo.hearings.length > 0) {
        this.isHearingsAvailable = true;
      }
    });
  }

  public updateLinkedCase(casePos: number, hearingPos: number) {
    this.clearHearings(casePos);
    this.getHearingsFormValue(casePos).controls[hearingPos].get('isSelected').setValue(true);
  }

  public saveLinkedHearingInfo(): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesSuccess(this.linkHearingForm.value.linkedCases));
    this.navigate();
  }

  public onSubmit() {
    if (this.isManageLink) {
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

  public clearHearings(casePos: number): void {
    this.linkedCases[casePos].hearings.forEach((hearingInfo, pos) => {
      this.getHearingsFormValue(casePos).controls[pos].get('isSelected').setValue(false);
    });
  }

  public navigate(): void {
    if (this.mode === this.pageMode.MANAGE_HEARINGS) {
      if (this.linkHearingForm.valid) {
        this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, this.hearingGroupRequestId, this.hearingId, 'group-selection']);
      } else {
        this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, this.hearingGroupRequestId, this.hearingId, 'check-your-answers']);
      }
    } else {
      this.router.navigate(['/', 'hearings', 'link', this.caseId, this.hearingId, 'group-selection']);
    }
  }

  public navigateToCaseHearing(caseId: string): void {
    this.router.navigate(['/', 'cases', 'case-details', caseId, 'hearings']);
  }

  public onBack(): void {
    if (this.isManageLink) {
      this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, this.hearingGroupRequestId, this.hearingId]);
    } else {
      this.router.navigate(['/', 'cases', 'case-details', this.caseId, 'hearings']);
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
