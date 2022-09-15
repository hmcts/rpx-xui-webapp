import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {ACTION, HearingChangeReasonMessages, HearingSummaryEnum} from '../../../models/hearings.enum';
import {LovRefDataModel} from '../../../models/lovRefData.model';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-change-reasons',
  templateUrl: './hearing-change-reasons.component.html',
})
export class HearingChangeReasonsComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public hearingChangeReasons: LovRefDataModel[];
  public hearingChangeReasonForm: FormGroup;
  public errors: { id: string, message: string }[] = [];
  public selectionValid: boolean = true;
  public hearingRequestLastError$: Observable<fromHearingStore.State>;
  public lastErrorSubscription: Subscription;
  public hearingChangeReasonMessages = HearingChangeReasonMessages;

  constructor(protected readonly route: ActivatedRoute,
              protected readonly router: Router,
              private readonly formBuilder: FormBuilder,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
    this.hearingRequestLastError$ = this.hearingStore.pipe(select(fromHearingStore.getHearingRequestLastError));
  }

  public ngOnInit(): void {
    this.lastErrorSubscription = this.hearingRequestLastError$.subscribe(lastError => {
      if (lastError) {
        this.errors = [{
          id: 'backendError', message: HearingSummaryEnum.BackendError
        }];
      }
    });
    this.hearingChangeReasons = this.route.snapshot.data.hearingChangeReasons;
    this.initForm();
  }

  public get getReasonsTypeFormArray(): FormArray {
    return this.formBuilder.array(this.hearingChangeReasons.map(val => this.formBuilder.group({
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
    this.hearingChangeReasonForm = this.formBuilder.group({
      reasons: this.getReasonsTypeFormArray,
    });
  }

  public isFormValid(action: ACTION): boolean {
    if (!action || action !== ACTION.VIEW_EDIT_SUBMIT) {
      return true;
    }
    this.selectionValid = true;
    const isReasons = (this.hearingChangeReasonForm.controls.reasons as FormArray).controls
      .filter(reason => reason.value.selected === true).length > 0;
    if (!isReasons) {
      this.errors = [{
        id: `hearing-option-container`, message: HearingChangeReasonMessages.NOT_SELECTED_A_REASON
      }];
      this.selectionValid = false;
    }
    return this.selectionValid;
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.VIEW_EDIT_SUBMIT) {
      if (this.isFormValid(action)) {
        this.prepareHearingRequestData();
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public prepareHearingRequestData(): void {
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        amendReasonCodes: this.getChosenReasons(),
      }
    };
  }

  public getChosenReasons(): string[] {
    const chosenReasons: string[] = [];
    (this.hearingChangeReasonForm.controls.reasons as FormArray).controls.forEach(reason => {
      if (reason.value.selected === true) {
        chosenReasons.push(reason.value.key);
      }
    });
    return chosenReasons;
  }

  public ngOnDestroy(): void {
    if (this.lastErrorSubscription) {
      this.lastErrorSubscription.unsubscribe();
    }
    super.unsubscribe();
  }
}
