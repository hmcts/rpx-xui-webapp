import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NocHttpError, NocNavigation, NocNavigationEvent, NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-case-ref',
  templateUrl: 'noc-case-ref.component.html',
  styleUrls: ['noc-case-ref.component.scss']
})
export class NocCaseRefComponent implements OnInit, OnDestroy {
  @Input() public navEvent: NocNavigation;
  @ViewChild('errorContainer') errorContainer: ElementRef;

  public caseRefConfig: GovUiConfigModel;

  public validationErrors$: Observable<NocHttpError>;
  public lastError$: Observable<NocHttpError>;

  public caseRefForm: FormGroup;

  public nocNavigationCurrentState: NocState;
  private nocNavigationCurrentStateSub: Subscription;

  private scrollToError = false;

  constructor(
    private readonly store: Store<fromFeature.State>,
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.caseRefConfig = {
      id: 'caseRef',
      name: 'caseRef',
      hint: 'This is a 16-digit number from MyHMCTS, for example 1111-2222-3333-4444',
      classes: 'govuk-input--width-10',
      label: 'Online case reference number',
      type: 'text'
    };

    this.caseRefForm = this.formBuilder.group({ caseRef: null });

    this.validationErrors$ = this.store.pipe(select(fromFeature.validationErrors));
    this.lastError$ = this.store.pipe(select(fromFeature.lastError));
    this.navEvent = {
      event: null,
      timestamp: null
    };
  }

  public ngOnInit() {
    this.nocNavigationCurrentStateSub = this.store.pipe(select(fromFeature.currentNavigation)).subscribe(
      (state) => this.nocNavigationCurrentState = state);

    this.validationErrors$.subscribe(() => {
      // if error present scroll to error
      this.scrollToError = true;
    });
  }

  public ngAfterViewChecked(): void {
    if (this.scrollToError && this.errorContainer) {
      this.errorContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.errorContainer.nativeElement.focus();
      this.scrollToError = false;
    }
  }

  public onSubmit() {
    this.navigationHandler(NocNavigationEvent.CONTINUE);
  }

  public navigationHandler(navEvent: NocNavigationEvent) {
    switch (navEvent) {
      case NocNavigationEvent.BACK: {
        if (this.nocNavigationCurrentState === NocState.QUESTION) {
          this.store.dispatch(new fromFeature.Reset());
        } else if (this.nocNavigationCurrentState === NocState.CHECK_ANSWERS) {
          this.store.dispatch(new fromFeature.ChangeNavigation(NocState.QUESTION));
        }
        break;
      }
      case NocNavigationEvent.CONTINUE: {
        this.store.dispatch(new fromFeature.SetCaseReference(this.caseRefForm.controls.caseRef.value));
        break;
      }
      default:
        throw new Error('Invalid option');
    }
    // Addded this to set scroll to error constantly on continue if error present
    if (this.errorContainer) {
      this.scrollToError = true;
    }
  }

  public ngOnDestroy() {
    if (this.nocNavigationCurrentStateSub) {
      this.nocNavigationCurrentStateSub.unsubscribe();
    }
  }
}
