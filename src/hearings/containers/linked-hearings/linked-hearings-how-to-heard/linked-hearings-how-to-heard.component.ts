import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HearingLinksStateData } from 'src/hearings/models/hearingLinksStateData.model';
import { ACTION } from 'src/hearings/models/hearings.enum';
import { LinkedHearingGroupMainModel, ServiceLinkedCasesModel } from 'src/hearings/models/linkHearings.model';
import { HearingsService } from 'src/hearings/services/hearings.service';
import { RequestHearingPageFlow } from '../../request-hearing/request-hearing.page.flow';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from 'src/hearings/utils/validators.utils';

@Component({
  selector: 'exui-linked-hearings-how-to-heard',
  templateUrl: './linked-hearings-how-to-heard.component.html',
  styleUrls: ['./linked-hearings-how-to-heard.component.scss']
})
export class HowLinkedHearingsBeHeardComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
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
    private readonly fb: FormBuilder
  ) {
    super(hearingStore, hearingsService);
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

  private addLinkedCaseRow(linkedCase: ServiceLinkedCasesModel) {
    if (!linkedCase || !linkedCase.hearings) {
      return;
    }
    this.hearingOrder.push(this.fb.group({
      caseReference: [linkedCase.caseReference],
      caseName: [linkedCase.caseName],
      hearingStage: [linkedCase.hearings[0] && linkedCase.hearings[0].hearingStage || ''],
      position: [null, this.validators.mandatory('')]
    }));
  }

  public ngOnInit(): void {
    this.selectedToBeLinkedCases = [];
    this.receivedCases.forEach((linked) => {
      const selectedHearing = linked.hearings && linked.hearings.filter(hearing => hearing.isSelected === true);
      if (selectedHearing && selectedHearing.length) {
        this.selectedToBeLinkedCases.push({
          ...linked,
          hearings: selectedHearing,
        })
      }
    })
    if (this.selectedToBeLinkedCases && this.selectedToBeLinkedCases.length) {
      this.positionDropdownValues = Array.from({length: this.selectedToBeLinkedCases.length}, (_, i) => i + 1)
      this.createForm();
    }
  }

  private createForm(): void {
    this.selectedToBeLinkedCases.forEach((linked) => {
      this.addLinkedCaseRow(linked);
    });
  }

  public onSubmit(): void {
    const linkedHearingGroupMainModel: LinkedHearingGroupMainModel = {groupDetails: {
      groupComments: '',
      groupLinkType: this.form.value.hearingGroup,
      groupName: '',
      groupReason: ''
    }, hearingsInGroup: []};
    if (this.isFormValid()) {
      this.hearingOrder.value.forEach(formValue => {
        const hearing = this.selectedToBeLinkedCases.find(linked => linked.caseReference === formValue.caseReference)
        const selectedHearing = hearing && hearing.hearings.find(selected => selected.isSelected)
        selectedHearing && linkedHearingGroupMainModel.hearingsInGroup.push({
            hearingId: selectedHearing.hearingId,
            hearingOrder: formValue.position,
          })
      });
      this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesGroupDetail(linkedHearingGroupMainModel));
    }
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public onOrderChange(index: number) {
    const positionSelected = this.hearingOrder.controls[index].get('position').value;
    const hasSamePositionExistedIndex = this.hearingOrder.value.map((val, rowIndex) => val.position == positionSelected && rowIndex != index);
    hasSamePositionExistedIndex.forEach((val, idx) => val && this.hearingOrder.controls[idx].patchValue({position: ''}));
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
          message: 'check the position you have given to each hearing'
        });
        return false;
      }
    }
    this.validationErrors = [];
    return true
  }

  public rowHasErrors(index: number): boolean {
    return this.hearingOrder.controls[index].invalid;
  }

  public highlightRowError(index: number, error: string, formSubmitted: boolean): boolean {
    const controls = (this.hearingOrder.controls[index] as FormGroup).controls;
    return formSubmitted && controls[error].invalid;
  }

  public onOptionSelection(value: string): void {
    this.selectedOption = value;
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
