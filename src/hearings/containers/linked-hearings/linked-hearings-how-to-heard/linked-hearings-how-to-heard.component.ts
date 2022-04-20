import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HearingLinksStateData } from '../../../models/hearingLinksStateData.model';
import { GroupLinkType, Mode } from '../../../models/hearings.enum';
import { GroupDetailsModel, HearingDetailModel, LinkedHearingGroupMainModel, LinkedHearingsDetailModel, ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
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
  public selectedOption: GroupLinkType;
  public linkTitle: string;
  public formValid: boolean = true;
  public selectionValid: boolean = true;
  public form: FormGroup;
  public mode: Mode = Mode.LINK_HEARINGS;
  public hearingLinks: HearingLinksStateData;
  public sub: Subscription;
  public hearingsInGroup: LinkedHearingsDetailModel[];
  public groupDetails: GroupDetailsModel;

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly route: ActivatedRoute,
    private readonly validators: ValidatorsUtils,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.mode = this.route.snapshot.data.mode || Mode.LINK_HEARINGS;
    this.form = this.fb.group({
      hearingGroup: ['', Validators.required],
      hearingOrder: this.fb.array([]),
    });
    if (this.mode === Mode.LINK_HEARINGS) {
      this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).subscribe((state) => {
        this.receivedCases = state.serviceLinkedCases;
        this.groupDetails = state.linkedHearingGroup && state.linkedHearingGroup.groupDetails;
        this.selectedOption = this.groupDetails && this.groupDetails.groupLinkType;
        this.groupDetails = state && state.linkedHearingGroup && state.linkedHearingGroup.groupDetails;
        this.hearingsInGroup = state && state.linkedHearingGroup && state.linkedHearingGroup.hearingsInGroup;
        this.form = this.fb.group({
          hearingGroup: [this.groupDetails && this.groupDetails.groupLinkType || '', Validators.required],
          hearingOrder: this.fb.array([]),
        });
    });
  } else {
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.caseName : '';
        this.hearingsInGroup = state.hearingLinks && state.hearingLinks.linkedHearingGroup && state.hearingLinks.linkedHearingGroup.hearingsInGroup;
        this.groupDetails = state.hearingLinks && state.hearingLinks.linkedHearingGroup && state.hearingLinks.linkedHearingGroup.groupDetails;
        this.hearingLinks =  state.hearingLinks;
        this.selectedOption = this.groupDetails && this.groupDetails.groupLinkType;
        this.form = this.fb.group({
          hearingGroup: [this.groupDetails.groupLinkType, Validators.required],
          hearingOrder: this.fb.array([]),
        });
      }
    );
  }
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
      position: [this.getPosition(linkCase.hearings[0]), this.validators.mandatory('')]
    }));
  }

  public getPosition(hearing: HearingDetailModel): number {
    const linkedHearings: LinkedHearingsDetailModel[] = this.hearingsInGroup && this.hearingsInGroup.filter(x => x.hearingId === hearing.hearingId);
    if (linkedHearings && linkedHearings.length > 0) {
      return linkedHearings[0].hearingOrder;
    }
    return null;
  }

  public ngOnInit(): void {
    this.selectedToBeLinkedCases = [];
    if (this.mode === Mode.MANAGE_HEARINGS) {
      this.sub = this.hearingsService.getAllCaseInformation(this.hearingLinks, true).subscribe((casesLinkedInfo) => {
        casesLinkedInfo.forEach(linkedCase => {
          const selectedHearings = linkedCase.hearings && linkedCase.hearings.filter(hearing => hearing.isSelected);
          if (selectedHearings && selectedHearings.length) {
            this.selectedToBeLinkedCases.push({
              caseReference: linkedCase.caseReference,
              caseName: linkedCase.caseName,
              hearings: selectedHearings,
              reasonsForLink: linkedCase.reasonsForLink
            });
          }
        });
        if (this.selectedToBeLinkedCases && this.selectedToBeLinkedCases.length) {
          this.positionDropdownValues = Array.from({ length: this.selectedToBeLinkedCases.length }, (_, i) => i + 1);
          this.createForm();
        }
      });
    } else {
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
        groupLinkType: GroupLinkType[this.selectedOption],
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
      if (this.mode === Mode.MANAGE_HEARINGS) {
        this.router.navigate([`/hearings/manage-links/${this.caseId}/${this.hearingId}/check-your-answers`]);
      } else {
        this.router.navigate([`/hearings/link/${this.caseId}/${this.hearingId}/check-your-answers`]);
      }

    }
  }

  public onOrderChange(index: number) {
    const positionSelected = this.hearingOrder.controls[index].get('position').value;
    const hasSamePosSelectedIndex = this.hearingOrder.value.map((val, rowIndex) => val.position === positionSelected && rowIndex !== index);
    hasSamePosSelectedIndex.forEach((val, idx: number) => val && this.hearingOrder.controls[idx].patchValue({ position: '' }));
  }

  public hasPosToBePreSelected(index: number) {
    return this.hearingOrder.controls[index].get('position') && this.hearingOrder.controls[index].get('position').value;
  }

  public hasGroupSelected(groupSelected) {
    return this.form.value.hearingGroup === groupSelected;
  }

  public isFormValid(): boolean {
    this.validationErrors = [];
    if (this.form.value.hearingGroup === 'Same Slot' || this.form.value.hearingGroup === 'SAME_SLOT') {
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
    return this.validationErrors.length > 0 && this.selectedOption === null;
  }

  public hasInvalidOrderSelection() {
    return this.validationErrors.length > 0 && this.selectedOption !== null && this.selectedToBeLinkedCases && this.selectedToBeLinkedCases.length;
  }

  public onOptionSelection(value: GroupLinkType): void {
    this.validationErrors = [];
    this.selectedOption = value;
  }

  public onBack(): void {
    if (this.mode === Mode.MANAGE_HEARINGS) {
      this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, this.hearingId, 'selected-hearings']);
    } else {
      this.router.navigate(['/', 'hearings', 'link', this.caseId, this.hearingId]);
    }
  }
}

