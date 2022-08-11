import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HearingLinksStateData } from '../../../models/hearingLinksStateData.model';
import { GroupLinkType } from '../../../models/hearings.enum';
import { LinkedHearingGroupMainModel, ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';

@Component({
  selector: 'exui-linked-hearings-how-to-heard',
  templateUrl: './linked-hearings-how-to-heard.component.html',
  styleUrls: ['./linked-hearings-how-to-heard.component.scss']
})
export class HowLinkedHearingsBeHeardComponent implements OnInit {
  public caseId: string;
  public hearingId: string;
  public caseName: string;
  public hearingLinksStateData$: Observable<HearingLinksStateData>;
  public receivedCases: ServiceLinkedCasesModel[];
  public selectedToBeLinkedCases: ServiceLinkedCasesModel[];
  public linkedHearingGroup: LinkedHearingGroupMainModel;
  public validationErrors: { id: string; message: string }[] = [];
  public positionDropdownValues = [];
  public selectedOption = '';
  public linkTitle: string;
  public formValid: boolean = true;
  public selectionValid: boolean = true;
  public form: FormGroup;

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly route: ActivatedRoute,
    private readonly validators: ValidatorsUtils,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.form = this.fb.group({
      hearingGroup: ['', Validators.required],
      hearingOrder: this.fb.array([]),
    });
    this.hearingStore
      .pipe(select(fromHearingStore.getHearingLinks))
      .subscribe((state) => {
        this.receivedCases = state.serviceLinkedCases;
      });
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingId = this.route.snapshot.params.hearingId;
  }

  public get hearingOrder(): FormArray {
    return this.form.get('hearingOrder') as FormArray;
  }

  private addRow(linkCase: ServiceLinkedCasesModel) {
    if (!linkCase || !linkCase.hearings) { return; }

    this.hearingOrder.push(this.fb.group({
      caseReference: [linkCase.caseReference],
      caseName: [linkCase.caseName],
      hearingStage: [linkCase.hearings[0] && linkCase.hearings[0].hearingStage || ''],
      position: [null, this.validators.mandatory('')]
    }));
  }

  public ngOnInit(): void {
    this.selectedToBeLinkedCases = [];
    this.receivedCases.forEach((linked) => {
      const selectedHearing = linked.hearings && linked.hearings.filter(hearing => hearing.isSelected === true);
      if (selectedHearing && selectedHearing.length) {
        this.selectedToBeLinkedCases.push({
          caseReference: linked.caseReference,
          caseName: linked.caseName,
          hearings: selectedHearing,
          reasonsForLink: linked.reasonsForLink
        });
      }
    });
    if (this.selectedToBeLinkedCases && this.selectedToBeLinkedCases.length) {
      this.positionDropdownValues = Array.from({ length: this.selectedToBeLinkedCases.length }, (_, i) => i + 1);
      this.createForm();
    }
  }

  private createForm(): void {
    this.selectedToBeLinkedCases.forEach((linked) => {
      this.addRow(linked);
    });
  }

  public onSubmit(): void {
    const linkedHearingGroupMainModel: LinkedHearingGroupMainModel = {
      groupDetails: {
        groupComments: '',
        groupLinkType: this.selectedOption === 'heardTogether' ? GroupLinkType.SAME_SLOT : GroupLinkType.ORDERED,
        groupName: '',
        groupReason: ''
      }, hearingsInGroup: []
    };
    if (this.isFormValid()) {
      this.hearingOrder.value.forEach(formValue => {
        const hearing = this.selectedToBeLinkedCases.find(linked => linked.caseReference === formValue.caseReference);
        const selectedHearing = hearing && hearing.hearings.find(selected => selected.isSelected);
        if (selectedHearing) {
          linkedHearingGroupMainModel.hearingsInGroup.push({
            hearingId: selectedHearing.hearingId,
            hearingOrder: formValue.position,
          });
        }
      });
      this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesGroupDetail(linkedHearingGroupMainModel));
      this.router.navigate([`/hearings/link/${this.caseId}/${this.hearingId}/check-your-answers`]);
    }
  }

  public onOrderChange(index: number) {
    const positionSelected = this.hearingOrder.controls[index].get('position').value;
    const hasSamePosSelectedIndex = this.hearingOrder.value.map((val, rowIndex) => val.position === positionSelected && rowIndex !== index);
    hasSamePosSelectedIndex.forEach((val, idx: number) => val && this.hearingOrder.controls[idx].patchValue({ position: '' }));
  }

  public isFormValid(): boolean {
    this.validationErrors = [];
    if (this.form.value.hearingGroup === 'heardTogether') {
      return true;
    } else {
      const validSelection = this.hearingOrder.valid && this.form.valid;
      if (!validSelection) {
        this.validationErrors.push({
          id: `selection-error`,
          message: !this.form.value.hearingGroup ? 'Please make a selection' : 'Check the position you have given to each hearing'
        });
        return false;
      }
    }
    this.validationErrors = [];
    return true;
  }

  public highlightRowError(index: number, error: string, formSubmitted: boolean): boolean {
    const controls = (this.hearingOrder.controls[index] as FormGroup).controls;
    return formSubmitted && controls[error].invalid;
  }

  public hasEmptyGroupSelection() {
    return this.validationErrors.length > 0 && this.selectedOption === '';
  }

  public hasInvalidOrderSelection() {
    return this.validationErrors.length > 0 && this.selectedOption !== '' && this.selectedToBeLinkedCases && this.selectedToBeLinkedCases.length;
  }

  public onOptionSelection(value: string): void {
    this.validationErrors = [];
    this.selectedOption = value;
  }
}

