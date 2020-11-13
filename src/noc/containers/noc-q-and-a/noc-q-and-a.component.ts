import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NocAnswer, NocEvent, NocNavigation, NocNavigationEvent, NocQuestion, NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-q-and-a',
  templateUrl: './noc-q-and-a.component.html',
  styleUrls: ['./noc-q-and-a.component.scss']
})
export class NocQAndAComponent implements OnInit, OnChanges, OnDestroy {

  public questions$: Observable<NocQuestion[]>;
  public formGroup: FormGroup;
  @Input() public navEvent: NocNavigation;

  public nocNavigationCurrentState: NocState;
  private nocNavigationCurrentStateSub: Subscription;
  public nocCaseReference: string;
  private nocCaseReferenceSub: Subscription;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.questions$ = this.store.pipe(select(fromFeature.questions));
    this.formGroup = new FormGroup({});
    this.nocNavigationCurrentStateSub = this.store.pipe(select(fromFeature.currentNavigation)).subscribe(
      state => this.nocNavigationCurrentState = state);
    this.nocCaseReferenceSub = this.store.pipe(select(fromFeature.caseReference)).subscribe(
      caseReference => this.nocCaseReference = caseReference);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.navEvent && this.navEvent) {
      this.navigationHandler(this.navEvent.event);
    }
  }

  public navigationHandler(navEvent: NocNavigationEvent) {
    switch (navEvent) {
      case NocNavigationEvent.BACK: {
        // Check the current navigation state is the correct one (i.e. NocState.QUESTION) before proceeding
        // (necessary because the "Back" navigation event is triggered from multiple states)
        if (this.nocNavigationCurrentState === NocState.QUESTION) {
          this.store.dispatch(new fromFeature.ChangeNavigation(NocState.START));
        }
        break;
      }
      case NocNavigationEvent.CONTINUE: {
        // Check the current navigation state is the correct one (i.e. NocState.QUESTION) before proceeding
        // (necessary because the "Continue" navigation event is triggered from multiple states)
        if (this.nocNavigationCurrentState === NocState.QUESTION) {
          // Set answers on store
          if (this.formGroup) {
            const nocAnswers: NocAnswer[] = [];
            Object.keys(this.formGroup.value).forEach(key => {
              nocAnswers.push({question_id: key, value: this.formGroup.value[key]});
            });
            const nocEvent: NocEvent = {
              caseReference: this.nocCaseReference,
              nocAnswers
            };
            this.store.dispatch(new fromFeature.SetAnswers(nocEvent));
          }
        }
        break;
      }
      default:
        throw new Error('Invalid option');
    }
  }

  public ngOnDestroy() {
    if (this.nocNavigationCurrentStateSub) {
      this.nocNavigationCurrentStateSub.unsubscribe();
    }

    if (this.nocCaseReferenceSub) {
      this.nocCaseReferenceSub.unsubscribe();
    }
  }
}
