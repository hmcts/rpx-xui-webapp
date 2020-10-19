import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocError, NocNavigation, NocNavigationEvent } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-case-ref',
  templateUrl: 'noc-case-ref.component.html',
  styleUrls: ['noc-case-ref.component.scss']
})
export class NocCaseRefComponent implements OnChanges {

  @Input() navEvent: NocNavigation;

  public nocNavigationCurrentState$: Observable<fromFeature.State>;
  public caseRefConfig: GovUiConfigModel;

  public validationErrors$: Observable<{}>;
  public lastError$: Observable<NocError>;

  public caseRefForm: FormGroup;

  constructor(
    private store: Store<fromFeature.State>,
    private formBuilder: FormBuilder
  ) {
    this.caseRefConfig = {
      id: 'caseRef',
      name: 'caseRef',
      hint: 'This is a 16-digit number from MyHMCTS, for example 1111-2222-3333-4444',
      classes: 'govuk-input--width-10',
      label: 'Online case reference number',
      type: 'text'
    };

    this.caseRefForm = formBuilder.group({ caseRef: null});

    this.validationErrors$ = this.store.pipe(select(fromFeature.validationErrors));
    this.lastError$ = this.store.pipe(select(fromFeature.lastError));
    this.navEvent = {
      event: null,
      timestamp: null
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.navEvent && this.navEvent) {
      this.navigationHandler(this.navEvent.event);
    }
  }

  public onSubmit() {
    this.navigationHandler(NocNavigationEvent.CONTINUE);
  }

  public navigationHandler(navEvent: NocNavigationEvent) {
    switch (navEvent) {
      case NocNavigationEvent.BACK: {
        break;
      }
      case NocNavigationEvent.CONTINUE: {
        this.store.dispatch(new fromFeature.SetCaseReference(this.caseRefForm.controls['caseRef'].value));
        break;
      }
    }
  }

  public mainErrorHandler(error: NocError, id: string) {
    if (error) {
      return [{
        id,
        message: error.message
      }];
    }

    return null;
  }
}
