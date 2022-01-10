import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RefDataModel } from '../../../hearings/models/refData.model';
import { HearingsService } from '../../../hearings/services/hearings.service';

@Component({
  selector: 'exui-cancel-hearing',
  templateUrl: './cancel-hearing.component.html',
  styleUrls: ['./cancel-hearing.component.scss']
})
export class CancelHearingComponent implements OnInit {
  public hearingCancelOptions: RefDataModel[];
  public hearingCancelForm: FormGroup;
  public hearingCancelSelectionError: string;
  public validationErrors: { id: string, message: string }[] = [];

  constructor(private readonly route: ActivatedRoute,
              protected readonly hearingsService: HearingsService,
              private readonly formBuilder: FormBuilder) {
  }


  public ngOnInit(): void {
    this.hearingCancelOptions = this.route.snapshot.data.hearingCancelOptions;
    this.initForm();
  }

  public get getReasonsTypeFormArray(): FormArray {
    return this.formBuilder.array(this.hearingCancelOptions.map(val => this.formBuilder.group({
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
    this.hearingCancelForm = this.formBuilder.group({
      reasons: this.getReasonsTypeFormArray,
    });
  }

  public isFormValid(): boolean {
    return this.hearingCancelForm.valid;
  }

  public checkFormData(): void {
    this.hearingCancelSelectionError = null;
    this.validationErrors = [];
    // TODO: check form data
  }
}
