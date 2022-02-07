import {OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, of, Subscription} from 'rxjs';
import {CaseFlagReferenceModel} from '../models/caseFlagReference.model';
import {CaseFlagType} from '../models/hearings.enum';
import {PartyFlagsModel} from '../models/partyFlags.model';
import * as fromHearingStore from '../store';
import {CaseFlagsUtils} from '../utils/case-flags.utils';
import {AbstractAnswerConverter} from './abstract.answer.converter';

export class CaseFlagConverter extends AbstractAnswerConverter implements OnDestroy {

  public caseFlagsRefData: CaseFlagReferenceModel[];
  public storeSub: Subscription;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly route: ActivatedRoute) {
    super(hearingStore);
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }

  public transformAnswer(): Observable<string> {
    let partyFlags: PartyFlagsModel[] = [];
    this.storeSub = this.hearingState.subscribe(
      state => {
        if (state.hearingValues.serviceHearingValuesModel && state.hearingValues.serviceHearingValuesModel.caseFlags) {
          partyFlags = state.hearingValues.serviceHearingValuesModel.caseFlags.flags;
        }
      }
    );
    const caseFlagsGroup = CaseFlagsUtils.displayCaseFlagsGroup(partyFlags, this.caseFlagsRefData, CaseFlagType.REASONABLE_ADJUSTMENT);
    let result = '';
    caseFlagsGroup.forEach(flagsGroup => {
      result += `<strong class='bold'>${flagsGroup.name}</strong>\n<ul>`;
      flagsGroup.partyFlags.forEach(flag => result += `<li>${flag.displayName}</li>`);
      result += '</ul><br>';
    });
    return of(result);
  }

  public ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
