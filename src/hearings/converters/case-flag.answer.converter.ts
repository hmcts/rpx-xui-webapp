import {OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {CaseFlagReferenceModel} from '../models/caseFlagReference.model';
import {State} from '../store';
import {CaseFlagsUtils} from '../utils/case-flags.utils';
import {AnswerConverter} from './answer.converter';

export class CaseFlagAnswerConverter implements AnswerConverter, OnDestroy {

  public caseFlagsRefData: CaseFlagReferenceModel[];
  public storeSub: Subscription;

  constructor(protected readonly route: ActivatedRoute) {
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    let partyWithFlags: Map<string, CaseFlagReferenceModel[]> = new Map();
    this.storeSub = hearingState$.subscribe(
      state => {
        partyWithFlags = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData,
          state.hearingRequest.hearingRequestMainModel.partyDetails);
      }
    );
    let result = '';
    partyWithFlags.forEach(
      (value, key) => {
        result += `<strong class='bold'>${key}</strong>\n<ul>`;
        value.forEach(flag => result += `<li>${flag.name}</li>`);
        result += '</ul><br>';
      }
    );
    return of(result);
  }

  public ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
