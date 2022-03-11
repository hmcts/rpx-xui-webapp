import {Component, OnDestroy} from '@angular/core';
import {ACTION, HearingChangeReasonMessages, } from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';
import {OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import { LovRefDataModel } from 'src/hearings/models/lovRefData.model';
import { HearingListModel } from 'src/hearings/models/hearingList.model';
@Component({
  selector: 'exui-hearing-change-reason',
  templateUrl: './hearing-change-reason.component.html',
})
export class HearingChangeReasonComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public hearingChangeReason: LovRefDataModel[];
  public hearingChangeReasonForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public selectionValid: boolean = true;
  public hearingId: string;
  public caseId: string;
  public caseHearing: HearingListModel;

  constructor(protected readonly route: ActivatedRoute,
              protected readonly router: Router,
              private readonly formBuilder: FormBuilder,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
      super(hearingStore, hearingsService);
    }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
        if (hearingList.hearingListMainModel) {
          const caseHearings = hearingList.hearingListMainModel.caseHearings.filter(caseHearing => caseHearing.hearingID === this.hearingId);
          this.caseHearing = caseHearings.length ? caseHearings[0] : undefined;
        }
      });
    this.hearingChangeReason = this.route.snapshot.data.hearingChangeReason;
    this.initForm();
  }

  public get getReasonsTypeFormArray(): FormArray {
    return this.formBuilder.array(this.hearingChangeReason.map(val => this.formBuilder.group({
      key: [val.key],
      value_en: [val.value_en],
      value_cy: [val.value_cy],
      hintText_EN: [val.hintText_EN],
      hintTextCY: [val.hintTextCY],
      order: [val.order],
      parentKey: [val.parentKey],
      selected: [!!val.selected]
    })));
  }

  public initForm(): void {
    this.hearingChangeReasonForm = this.formBuilder.group({
      reasons: this.getReasonsTypeFormArray,
    });
  }

  public isFormValid(action: ACTION): boolean {
    if (!action || action !== ACTION.VIEW_EDIT_SUBMIT) {
      return true;
    } else {
      this.selectionValid = true;
      const isReasons = (this.hearingChangeReasonForm.controls.reasons as FormArray).controls
        .filter(reason => reason.value.selected === true).length > 0;
      if (!isReasons) {
        this.validationErrors = [{
          id: `hearing-option-container`, message: HearingChangeReasonMessages.NOT_SELECTED_A_REASON
        }];
        this.selectionValid = false;
      }
      return this.selectionValid;
    }
  }

  public get hearingChangeReasonMessageEnum() {
    return HearingChangeReasonMessages;
  }

  public executeAction(action: ACTION): void {
    if (this.isFormValid(action)) {
      super.navigateAction(action);
    }
  }

  public executeContinue(): void {
    if (this.isFormValid(ACTION.BACK)) {
        this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']).then();
    }
  }

  public getChosenReasons(): LovRefDataModel[] {
    const mappedReason: LovRefDataModel[] = [];
    const reasonChosen = (this.hearingChangeReasonForm.controls.reasons as FormArray).controls
      .filter(reason => reason.value.selected === true);
    reasonChosen.forEach(element => {
      mappedReason.push({
        key: element.value.key,
        value_en: element.value.value_en,
        value_cy: element.value.value_cy,
        hintText_EN: element.value.hintText_EN,
        hintTextCY: element.value.hintTextCY,
        order: element.value.order,
        parentKey: element.value.parentKey,
      } as LovRefDataModel);
    });
    return mappedReason;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
