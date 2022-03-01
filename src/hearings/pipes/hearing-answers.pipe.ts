import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdditionalFacilitiesAnswerConverter } from '../converters/additional-facilities.answer.converter';
import { AdditionalInstructionsAnswerConverter } from '../converters/additional-instructions.answer.converter';
import { AdditionalSecurityAnswerConverter } from '../converters/additional-security.answer.converter';
import { AnswerConverter } from '../converters/answer.converter';
import { CaseFlagAnswerConverter } from '../converters/case-flag.answer.converter';
import { CaseNameAnswerConverter } from '../converters/case-name.answer.converter';
import { CaseNumberAnswerConverter } from '../converters/case-number.answer.converter';
import { DefaultAnswerConverter } from '../converters/default.answer.converter';
import { HearingLengthAnswerConverter } from '../converters/hearing-length.answer.converter';
import { HearingPanelAnswerConverter } from '../converters/hearing-panel.answer.converter';
import { HearingPriorityAnswerConverter } from '../converters/hearing-priority.answer.converter';
import { HearingSpecificDateAnswerConverter } from '../converters/hearing-specific-date.answer.converter';
import { JudgeExclusionAnswerConverter } from '../converters/judge-exclusion.answer.converter';
import { JudgeNameAnswerConverter } from '../converters/judge-name.answer.converter';
import { JudgeTypesAnswerConverter } from '../converters/judge-types.answer.converter';
import { NeedJudgeAnswerConverter } from '../converters/need-judge.answer.converter';
import { NeedWelshAnswerConverter } from '../converters/need-welsh.answer.converter';
import { NumberOfAttendancesAnswerConverter } from '../converters/number-of-attendances-answer.converter';
import { PanelExclusionAnswerConverter } from '../converters/panel-exclusion.answer.converter';
import { PanelInclusionAnswerConverter } from '../converters/panel-inclusion.answer.converter';
import { PanelRolesAnswerConverter } from '../converters/panel-roles.answer.converter';
import { PartyChannelsAnswerConverter } from '../converters/party-channels-answer.converter';
import { StageAnswerConverter } from '../converters/stage.answer.converter';
import { TypeAnswerConverter } from '../converters/type.answer.converter';
import { VenueAnswerConverter } from '../converters/venue.answer.converter';
import { AnswerSource } from '../models/hearings.enum';
import { State } from '../store';

@Pipe({
  name: 'transformAnswer'
})
export class HearingAnswersPipe implements PipeTransform {

  constructor(protected readonly route: ActivatedRoute) {
  }

  public transform(answerSource: AnswerSource, hearingState$: Observable<State>): Observable<string> {
    let converter: AnswerConverter = new DefaultAnswerConverter();
    switch (answerSource) {
      case AnswerSource.CASE_NAME:
        converter = new CaseNameAnswerConverter();
        break;
      case AnswerSource.CASE_NUMBER:
        converter = new CaseNumberAnswerConverter();
        break;
      case AnswerSource.Type:
        converter = new TypeAnswerConverter();
        break;
      case AnswerSource.CASE_FLAGS:
        converter = new CaseFlagAnswerConverter(this.route);
        break;
      case AnswerSource.ADDITIONAL_SECURITY_REQUIRED:
        converter = new AdditionalSecurityAnswerConverter();
        break;
      case AnswerSource.ADDITIONAL_FACILITIES_REQUIRED:
        converter = new AdditionalFacilitiesAnswerConverter(this.route);
        break;
      case AnswerSource.VENUE:
        converter = new VenueAnswerConverter();
        break;
      case AnswerSource.HOW_ATTENDANT:
        converter = new PartyChannelsAnswerConverter(this.route);
        break;
      case AnswerSource.ATTENDANT_PERSON_AMOUNT:
        converter = new NumberOfAttendancesAnswerConverter();
        break;
      case AnswerSource.NEED_WELSH:
        converter = new NeedWelshAnswerConverter();
        break;
      case AnswerSource.ADDITIONAL_INSTRUCTION:
        converter = new AdditionalInstructionsAnswerConverter();
        break;
      case AnswerSource.STAGE:
        converter = new StageAnswerConverter(this.route);
        break;
      case AnswerSource.HEARING_LENGTH:
        converter = new HearingLengthAnswerConverter();
        break;
      case AnswerSource.HEARING_SPECIFIC_DATE:
        converter = new HearingSpecificDateAnswerConverter();
        break;
      case AnswerSource.HEARING_PRIORITY:
        converter = new HearingPriorityAnswerConverter(this.route);
        break;
      case AnswerSource.NEED_JUDGE:
        converter = new NeedJudgeAnswerConverter();
        break;
      case AnswerSource.JUDGE_NAME:
        converter = new JudgeNameAnswerConverter(this.route);
        break;
      case AnswerSource.JUDGE_TYPES:
        converter = new JudgeTypesAnswerConverter(this.route);
        break;
      case AnswerSource.JUDGE_EXCLUSION:
        converter = new JudgeExclusionAnswerConverter(this.route);
        break;
      case AnswerSource.HEARING_PANEL:
        converter = new HearingPanelAnswerConverter();
        break;
      case AnswerSource.PANEL_INCLUSION:
        converter = new PanelInclusionAnswerConverter(this.route);
        break;
      case AnswerSource.PANEL_EXCLUSION:
        converter = new PanelExclusionAnswerConverter(this.route);
        break;
      case AnswerSource.PANEL_ROLES:
        converter = new PanelRolesAnswerConverter(this.route);
        break;
      default:
        break;
    }
    return converter.transformAnswer(hearingState$);
  }

}
