import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {HearingListModel} from '../../models/hearingList.model';
import {CancelHearingMessages} from '../../models/hearings.enum';
import {LovRefDataModel} from '../../models/lovRefData.model';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-cancel-hearing',
  templateUrl: './cancel-hearing.component.html',
  styleUrls: ['./cancel-hearing.component.scss']
})
export class CancelHearingComponent implements OnInit {
  public hearingCancelOptions: LovRefDataModel[];
  public hearingCancelForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public selectionValid: boolean = true;
  public hearingId: string;
  public caseId: string;
  public caseHearing: HearingListModel;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService) {
    this.route.params.subscribe(params => {
      this.hearingId = params.hearingId;
    });
  }

  public get cancelHearingMessageEnum() {
    return CancelHearingMessages;
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
    this.hearingCancelOptions = this.route.snapshot.data.hearingCancelOptions;
    this.initForm();
  }

  public get getReasonsTypeFormArray(): FormArray {
    return this.formBuilder.array(this.hearingCancelOptions.map(val => this.formBuilder.group({
      key: [val.key],
      value_en: [val.value_en],
      value_cy: [val.value_cy],
      hint_text_en: [val.hint_text_en],
      hint_text_cy: [val.hint_text_cy],
      lov_order: [val.lov_order],
      parent_key: [val.parent_key],
      selected: [!!val.selected]
    })));
  }

  public initForm(): void {
    this.hearingCancelForm = this.formBuilder.group({
      reasons: this.getReasonsTypeFormArray,
    });
  }

  public isFormValid(): boolean {
    this.selectionValid = true;
    const isReasons = (this.hearingCancelForm.controls.reasons as FormArray).controls
      .filter(reason => reason.value.selected === true).length > 0;
    if (!isReasons) {
      this.validationErrors = [{
        id: `hearing-option-container`, message: CancelHearingMessages.NOT_SELECTED_A_REASON
      }];
      this.selectionValid = false;
    }
    return this.selectionValid;
  }

  public executeContinue(): void {
    const cancellationErrorMessage = 'There was a system error and your request could not be processed. Please try again.';
    if (this.isFormValid()) {
      this.hearingsService.cancelHearingRequest(this.hearingId, this.getChosenReasons()).subscribe(
        value => {
          this.validationErrors = null;
          return this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']);
        },
        err => {
            this.validationErrors = [{id: 'cancel-request-error', message: cancellationErrorMessage}];
        }
      );
    }
  }

  public getChosenReasons(): LovRefDataModel[] {
    const mappedReason: LovRefDataModel[] = [];
    const reasonChosen = (this.hearingCancelForm.controls.reasons as FormArray).controls
      .filter(reason => reason.value.selected === true);
    reasonChosen.forEach(element => {
      mappedReason.push({
        key: element.value.key,
        value_en: element.value.value_en,
        value_cy: element.value.value_cy,
        hint_text_en: element.value.hint_text_en,
        hint_text_cy: element.value.hint_text_cy,
        lov_order: element.value.lov_order,
        parent_key: element.value.parent_key,
      } as LovRefDataModel);
    });
    return mappedReason;
  }
}
