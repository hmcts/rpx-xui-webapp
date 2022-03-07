import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {AdditionalFacilitiesAmendedConverter} from '../converters/additional-facilities.amended.converter';
import {AdditionalSecurityAmendedConverter} from '../converters/additional-security.amended.converter';
import {DefaultAmendedConverter} from '../converters/default.amended.converter';
import { HearingLengthAmendedConverter } from '../converters/hearing-length.amended.converter';
import { HearingSpecificDateAmendedConverter } from '../converters/hearing-specific-date.amended.converter';
import { HearingPriorityAmendedConverter } from '../converters/hearing-priority.amended.converter';
import { HowManyPeopleAttendAmendedConverter } from '../converters/how-many-people-attend.amended.converter';
import { HowPartyAttendAmendedConverter } from '../converters/how-party-attend.amended.converter';
import {IsAmendedConverter} from '../converters/is-amended.converter';
import { JudgeExclusionAmendedConverter } from '../converters/judge-exclusion.amended.converter';
import { NeedJudgeAmendedConverter } from '../converters/need-judge.amended.converter';
import { JudgeTypesAmendedConverter } from '../converters/judge-types.amended.converter';
import { HearingPanelAmendedConverter } from '../converters/hearing-panel.amended.converter';
import { PanelExclusionAmendedConverter } from '../converters/panel-exclusion.amended.converter';
import { PanelInclusionAmendedConverter } from '../converters/panel-inclusion.amended.converter';
import { PanelRolesAmendedConverter } from '../converters/panel-roles.amended.converter';
import { StageAmendedConverter } from '../converters/stage.amended.converter';
import { VenueAmendedConverter } from '../converters/venue.amended.converter';
import { AnswerSource } from '../models/hearings.enum';
import { State } from '../store';
import { JudgeNameAmendedConverter } from '../converters/judge-name.amended.converter';

@Pipe({
  name: 'isAmended'
})
export class IsAmendedPipe implements PipeTransform {

  public transform(answerSource: AnswerSource, hearingState$: Observable<State>): Observable<boolean> {
    let converter: IsAmendedConverter = new DefaultAmendedConverter();
    switch (answerSource) {
      case AnswerSource.VENUE:
        converter = new VenueAmendedConverter();
        break;
      case AnswerSource.ADDITIONAL_SECURITY_REQUIRED:
        converter = new AdditionalSecurityAmendedConverter();
        break;
      case AnswerSource.ADDITIONAL_FACILITIES_REQUIRED:
        converter = new AdditionalFacilitiesAmendedConverter();
        break;
      case AnswerSource.HOW_ATTENDANT:
        converter = new HowPartyAttendAmendedConverter();
        break;
      case AnswerSource.ATTENDANT_PERSON_AMOUNT:
        converter = new HowManyPeopleAttendAmendedConverter();
        break;
      case AnswerSource.STAGE:
        converter = new StageAmendedConverter();
        break;
      case AnswerSource.NEED_JUDGE:
        converter = new NeedJudgeAmendedConverter();
        break;
      case AnswerSource.JUDGE_NAME:
        converter = new JudgeNameAmendedConverter();
        break;
      case AnswerSource.JUDGE_TYPES:
        converter = new JudgeTypesAmendedConverter();
        break;
      case AnswerSource.JUDGE_EXCLUSION:
        converter = new JudgeExclusionAmendedConverter();
        break;
      case AnswerSource.HEARING_LENGTH:
        converter = new HearingLengthAmendedConverter();
        break;
      case AnswerSource.HEARING_SPECIFIC_DATE:
        converter = new HearingSpecificDateAmendedConverter();
        break;
      case AnswerSource.HEARING_PRIORITY:
        converter = new HearingPriorityAmendedConverter();
      case AnswerSource.HEARING_PANEL:
        converter = new HearingPanelAmendedConverter();
        break;
      case AnswerSource.PANEL_INCLUSION:
        converter = new PanelInclusionAmendedConverter();
        break;
      case AnswerSource.PANEL_EXCLUSION:
        converter = new PanelExclusionAmendedConverter();
        break;
      case AnswerSource.PANEL_ROLES:
        converter = new PanelRolesAmendedConverter();
        break;
      default:
        break;
    }
    return converter.transformIsAmended(hearingState$);
  }

}
