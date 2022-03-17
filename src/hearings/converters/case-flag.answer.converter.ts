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
    const partyWithFlags = {};
    this.storeSub = hearingState$.subscribe(
      state => {
        state.hearingRequest.hearingRequestMainModel.partyDetails.forEach(party => {
          const partyName = party.partyName;
          const allFlagsId: string[] = party.individualDetails.reasonableAdjustments.slice();
          if (party.individualDetails.interpreterLanguage) {
            allFlagsId.push(party.individualDetails.interpreterLanguage);
          }
          partyWithFlags[partyName] = allFlagsId.map(flagId => CaseFlagsUtils.findFlagByFlagId(this.caseFlagsRefData, flagId));
        });
      }
    );
    let result = '';
    Object.keys(partyWithFlags).forEach(
      key => {
        result += `<strong class='bold'>${key}</strong>\n<ul>`;
        partyWithFlags[key].forEach(flag => result += `<li>${flag.name}</li>`);
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
