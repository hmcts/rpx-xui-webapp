import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Store} from '@ngrx/store';
import { ErrorMessage } from '../../../../app/models';
import {ACTION} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

export const NAME_ERROR: ErrorMessage = {
  title: 'There is a problem',
  description: 'You must select Yes or No',
  fieldId: 'welsh-hint',
};

@Component({
  selector: 'exui-welsh-hearing',
  templateUrl: './welsh-hearing.component.html',
})
export class WelshHearingComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public error: ErrorMessage = null;
  public welshForm: FormGroup;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              private readonly formBuilder: FormBuilder) {
    super(hearingStore, hearingsService);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.welshForm = this.formBuilder.group({
      hearingInWelshFlag: [false, Validators.required],
    });
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
