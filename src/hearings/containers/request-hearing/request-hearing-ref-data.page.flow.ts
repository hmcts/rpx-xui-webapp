import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CaseFlagReferenceModel } from 'src/hearings/models/caseFlagReference.model';
import { ACTION } from '../../../hearings/models/hearings.enum';
import { PartyFlagsModel } from '../../../hearings/models/partyFlags.model';
import * as fromHearingStore from '../../../hearings/store';
import { HearingsService } from '../../services/hearings.service';
import { RequestHearingPageFlow } from './request-hearing.page.flow';

const LANGUAGE_INTERPRETER: string = 'Language interpreter';
const SIGN_LANGUAGE: string = 'Sign language';
const REASONABLE_ADJUSTMENT: string = 'Reasonable adjustment';
const EXCLUSTION_LIST: string[] = [LANGUAGE_INTERPRETER, SIGN_LANGUAGE, REASONABLE_ADJUSTMENT];

export class RequestHearingRefDataPageFlow extends RequestHearingPageFlow {
  constructor(
    public readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService);
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }
  public caseFlagsRefData: any;
  protected executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public displayCaseFlagsGroup(): void {
    if (this.serviceHearingValuesModel && this.serviceHearingValuesModel.caseFlags) {
      this.serviceHearingValuesModel.caseFlags.flags.forEach(flag => {
        this.assignPartyFlagToFlagId(this.caseFlagsRefData, flag);
      });
    }
  }

  public assignPartyFlagToFlagId(caseFlagReferenceModels: CaseFlagReferenceModel[], flag: PartyFlagsModel): boolean {
    let isAssigned = false;
    for (const caseFlag of caseFlagReferenceModels) {
      if (caseFlag.name && EXCLUSTION_LIST.some(exclusion => caseFlag.name.toLowerCase().includes(exclusion.toLowerCase()))) {
        caseFlag.isVisible = false;
      } else if (caseFlag.flagCode === flag.flagId) {
        if (!caseFlag.partyFlagDetails) {
          caseFlag.partyFlagDetails = [];
        }
        caseFlag.partyFlagDetails.push(flag);
        caseFlag.isVisible = true;
        isAssigned = true;
      } else if (caseFlag.childFlags && caseFlag.childFlags.length) {
        if (this.assignPartyFlagToFlagId(caseFlag.childFlags, flag)) {
          caseFlag.isVisible = true;
        }
      }
    }
    return isAssigned;
  }
}
