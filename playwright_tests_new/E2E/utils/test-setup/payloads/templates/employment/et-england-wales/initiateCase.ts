import type { CasePayloadBuildOptions } from '../../../core/types';
import {
  buildAcasCertificateNumber,
  buildCcdListItem,
  buildPhoneNumber,
  buildUkAddress,
  compactAddressLabel,
  createPayloadFaker,
  formatCcdDate,
  mergePayloadValues,
} from '../../../core/helpers';

const EMPLOYMENT_JURISDICTION = 'EMPLOYMENT';
const EMPLOYMENT_CASE_TYPE = 'ET_EnglandWales';
const EMPLOYMENT_EVENT_ID = 'initiateCase';
const DEFAULT_JURISDICTION_CODE = 'DAG';
const DEFAULT_CASE_TYPE = 'Single';
const DEFAULT_TRACK = 'Open Track';
const DEFAULT_POSITION_TYPE = 'ET1 Online submission';
const DEFAULT_CLAIM_TYPE = 'discrimination';

type EmploymentInitiateCaseFieldValues = Record<string, unknown>;

export function buildEmploymentEtEnglandWalesInitiateCasePayload(
  options: CasePayloadBuildOptions<EmploymentInitiateCaseFieldValues> = {}
) {
  const payloadFaker = createPayloadFaker(options.seed ?? options.context?.seed);
  const receiptDate = payloadFaker.date.recent({ days: 30 });
  const claimantFirstName = payloadFaker.person.firstName();
  const claimantLastName = payloadFaker.person.lastName();
  const claimantTitle = payloadFaker.helpers.arrayElement(['Mr', 'Mrs', 'Ms', 'Dr']);
  const claimantGender = payloadFaker.helpers.arrayElement(['Male', 'Female']);
  const claimantDateOfBirth = payloadFaker.date.birthdate({ min: 18, max: 68, mode: 'age' });
  const claimantAddress = buildUkAddress(payloadFaker);
  const claimantWorkAddress = buildUkAddress(payloadFaker);
  const respondentName = payloadFaker.company.name();
  const respondentAddress = buildUkAddress(payloadFaker);
  const respondentAcas = buildAcasCertificateNumber(payloadFaker, receiptDate);
  const claimantEmail = payloadFaker.internet.email({
    firstName: claimantFirstName,
    lastName: claimantLastName,
    provider: 'example.com',
  });

  const defaultPayload: EmploymentInitiateCaseFieldValues = {
    jurCodesCollection: [
      buildCcdListItem(payloadFaker, {
        juridictionCodesList: DEFAULT_JURISDICTION_CODE,
      }),
    ],
    typesOfClaim: [DEFAULT_CLAIM_TYPE],
    positionType: DEFAULT_POSITION_TYPE,
    conciliationTrack: DEFAULT_TRACK,
    receiptDate: formatCcdDate(receiptDate),
    feeGroupReference: '',
    managingOffice: 'Newcastle',
    stateAPI: null,
    caseRefNumberCount: null,
    startCaseRefNumber: null,
    multipleRefNumber: null,
    caseType: DEFAULT_CASE_TYPE,
    multipleReference: null,
    leadClaimant: null,
    claimant_TypeOfClaimant: 'Individual',
    claimant_Company: null,
    claimantIndType: {
      claimant_title1: claimantTitle,
      claimant_title_other: null,
      claimant_first_names: claimantFirstName,
      claimant_last_name: claimantLastName,
      claimant_date_of_birth: formatCcdDate(claimantDateOfBirth),
      claimant_gender: claimantGender,
    },
    claimantType: {
      claimant_phone_number: buildPhoneNumber(payloadFaker),
      claimant_mobile_number: buildPhoneNumber(payloadFaker),
      claimant_email_address: claimantEmail,
      claimant_contact_preference: 'Email',
      claimant_addressUK: claimantAddress,
    },
    et1OnlineSubmission: 'Yes',
    respondentCollection: [
      buildCcdListItem(payloadFaker, {
        respondent_name: respondentName,
        respondent_ACAS_question: 'Yes',
        respondent_ACAS: respondentAcas,
        respondent_ACAS_no: null,
        respondent_phone1: buildPhoneNumber(payloadFaker),
        responseReceived: 'No',
        responseContinue: null,
        responseReceivedDate: null,
        responseStruckOut: null,
        responseRespondentName: null,
        responseReference: null,
        response_status: null,
        responseToClaim: null,
        rejection_reason: null,
        rejection_reason_other: null,
        responseOutOfTime: null,
        responseNotOnPrescribedForm: null,
        responseRequiredInfoAbsent: null,
        responseStruckOutDate: null,
        responseStruckOutChairman: null,
        responseStruckOutReason: null,
        respondent_phone2: buildPhoneNumber(payloadFaker),
        respondent_email: payloadFaker.internet.email({ provider: 'example.com' }),
        respondent_contact_preference: 'Email',
        responseRespondentPhone1: null,
        responseRespondentPhone2: null,
        responseRespondentEmail: null,
        responseRespondentContactPreference: null,
        response_referred_to_judge: null,
        response_returned_from_judge: null,
        responseNotes: null,
        respondent_address: respondentAddress,
        responseRespondentAddress: {
          AddressLine1: null,
          AddressLine2: null,
          AddressLine3: null,
          PostTown: null,
          County: null,
          PostCode: null,
          Country: null,
        },
      }),
    ],
    claimantWorkAddressQuestion: 'No',
    claimantWorkAddress: {
      claimant_work_address: claimantWorkAddress,
    },
    claimantWorkAddressQRespondent: {
      value: {
        code: respondentName,
        label: compactAddressLabel(respondentName, respondentAddress),
      },
      list_items: [
        {
          code: respondentName,
          label: compactAddressLabel(respondentName, respondentAddress),
        },
      ],
    },
    claimantOtherType: null,
    claimantRepresentedQuestion: 'No',
    representativeClaimantType: null,
  };

  return {
    fieldValues: mergePayloadValues(defaultPayload, options.overrides),
    meta: {
      template: 'employment.et-england-wales.initiate-case',
      jurisdiction: options.context?.jurisdiction ?? EMPLOYMENT_JURISDICTION,
      caseType: options.context?.caseType ?? EMPLOYMENT_CASE_TYPE,
      eventId: options.context?.eventId ?? EMPLOYMENT_EVENT_ID,
      seed: options.seed ?? options.context?.seed,
    },
  };
}
