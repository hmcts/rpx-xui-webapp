import type { CasePayloadBuildOptions } from '../../../core/types';
import { createPayloadFaker, mergePayloadValues } from '../../../core/helpers';

const DIVORCE_JURISDICTION = 'DIVORCE';
const DIVORCE_CASE_TYPE = 'xuiCaseFlagsV1';
const DIVORCE_EVENT_ID = 'createCase';

type DivorceCaseFlagsFieldValues = {
  LegalRepParty1Flags: {
    roleOnCase: string;
    partyName: string;
  };
  LegalRepParty2Flags: {
    roleOnCase: string;
    partyName: string;
  };
};

function buildPartyFlag(payloadFaker = createPayloadFaker(), fallbackRole: string) {
  const partyName = `${payloadFaker.person.firstName()} ${payloadFaker.person.lastName()}`;
  return {
    roleOnCase: `${fallbackRole} - ${payloadFaker.person.jobType()}`,
    partyName,
  };
}

export function buildDivorceXuiTestCaseTypeCreateCaseFlagsPayload(
  options: CasePayloadBuildOptions<DivorceCaseFlagsFieldValues> = {}
) {
  const payloadFaker = createPayloadFaker(options.seed ?? options.context?.seed);
  const defaultPayload: DivorceCaseFlagsFieldValues = {
    LegalRepParty1Flags: buildPartyFlag(payloadFaker, 'Applicant solicitor'),
    LegalRepParty2Flags: buildPartyFlag(payloadFaker, 'Respondent solicitor'),
  };

  return {
    fieldValues: mergePayloadValues(defaultPayload, options.overrides),
    meta: {
      template: 'divorce.xui-test-case-type.create-case-flags',
      jurisdiction: options.context?.jurisdiction ?? DIVORCE_JURISDICTION,
      caseType: options.context?.caseType ?? DIVORCE_CASE_TYPE,
      eventId: options.context?.eventId ?? DIVORCE_EVENT_ID,
      seed: options.seed ?? options.context?.seed,
    },
  };
}
