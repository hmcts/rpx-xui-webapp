import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { HearingLinksStateData } from "src/hearings/models/hearingLinksStateData.model";
import { ACTION } from "src/hearings/models/hearings.enum";
import { LinkedHearingGroupMainModel, ServiceLinkedCasesModel } from "src/hearings/models/linkHearings.model";
import { HearingsService } from "src/hearings/services/hearings.service";
import { RequestHearingPageFlow } from "../request-hearing/request-hearing.page.flow";
import * as fromHearingStore from "../../store";
import { ValidatorsUtils } from "src/hearings/utils/validators.utils";

@Component({
  selector: "exui-how-hearings-linked-heard",
  templateUrl: "./how-linked-hearings-be-heard.component.html",
  styleUrls: ['./how-linked-hearings-be-heard.component.scss']
})
export class HowLinkedHearingsBeHeardComponent
  extends RequestHearingPageFlow
  implements OnInit, AfterViewInit, OnDestroy
{
  public caseId: string;
  public caseName: string;
  public hearingLinksStateData$: Observable<HearingLinksStateData>;
  public linkedCases: ServiceLinkedCasesModel[];
  public linkedHearingGroup: LinkedHearingGroupMainModel;
  public validationErrors: { id: string; message: string }[] = [];
  public positionDropdownValues = [];
  public selectedOption = "";
  public linkTitle: string;
  public formValid: boolean = true;
  public selectionValid: boolean = true;
  public form: FormGroup;
  public subscribedOnce$: Subject<boolean> = new Subject()

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly validators: ValidatorsUtils,
    private readonly fb: FormBuilder
  ) {
    super(hearingStore, hearingsService);
    this.form = this.fb.group({
      hearingGroup: '',
      hearingOrder: this.fb.array([]),
    });
    this.hearingStore
      .pipe(select(fromHearingStore.getHearingsFeatureState))
      .subscribe((state) => {
        this.caseId = state.hearingList.hearingListMainModel
          ? state.hearingList.hearingListMainModel.caseRef
          : "";
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.caseName : '';
      });
  }

  public get hearingOrder(): FormArray {
    return this.form.get('hearingOrder') as FormArray;
  }

  private addRow(linkCase:ServiceLinkedCasesModel) {
    if (!linkCase) return;
    this.hearingOrder.push(this.fb.group({
      caseReference: [linkCase.caseReference],
      caseName: [linkCase.caseName],
      hearingStage: [linkCase.hearings[0].hearingStage],
      position: [null, this.validators.mandatory('')]
    }));
  }

  public ngOnInit(): void {
    const receivedCases: ServiceLinkedCasesModel[] = this.route.snapshot.data.linkedCase && this.route.snapshot.data.linkedCase.serviceLinkedCases || [];
    if (receivedCases && receivedCases.length) {
      this.linkedCases = receivedCases.filter(cases => cases.hearings.filter(hearings => hearings.isSelected));
      this.positionDropdownValues = Array.from({length: this.linkedCases.length}, (_, i) => i + 1)
      this.createForm();
    }
  }

  private createForm(): void {
    this.linkedCases.forEach((linked) => {
     this.addRow(linked);
    })
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      if (this.isFormValid()) {
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
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
        const hearing = this.linkedCases.find(linked => linked.caseReference === formValue.caseReference)
        const selectedHearing = hearing && hearing.hearings.find(selected => selected.isSelected)
        selectedHearing && linkedHearingGroupMainModel.hearingsInGroup.push({
            hearingId: selectedHearing.hearingId,
            hearingOrder: formValue.position,
          })
      });
      this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesGroupDetail(linkedHearingGroupMainModel));
      //this.router.navigate(['/', 'hearings-link-summary', this.caseId]);
    }
  }

  public onOrderChange(index: number) {
    const positionSelected = this.hearingOrder.controls[index].get('position').value;
    const hasSamePositionExistedIndex = this.hearingOrder.value.map((val, rowIndex) => val.position == positionSelected && rowIndex != index);
    hasSamePositionExistedIndex.forEach((val, index) => val && this.hearingOrder.controls[index].patchValue({position: ''}));
  }

  public isFormValid(): boolean {
    this.validationErrors = [];
    if (this.form.value.hearingGroup === 'heardTogether') { 
      return true;
    } else {
      let noSelection = !this.hearingOrder.valid;
      if(noSelection) {
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

  public displayRowErrors(index: number): string {
    const errors = this.getAllRowErrors((this.hearingOrder.controls[index] as FormGroup).controls);
    if (!errors) {
      return '';
    }
    const keys = Object.keys(errors);
    if (!keys.length) {
      return null;
    }
    if (keys.length === 1) {
      return errors[keys[0]];
    }
  }

  private getAllRowErrors(controls: { [p: string]: AbstractControl }): { [p: string]: string } {
    const errors: { [p: string]: string } = {};
    Object.keys(controls).forEach(key => {
      const controlErrors: ValidationErrors = controls[key].errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          errors[key] = controlErrors[keyError].message;
        });
      }
    });
    return errors;
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
