import type { CcdDocumentValue } from '../../../../uploadDocumentViaApi';
import type { CasePayloadBuildOptions } from '../../../core/types';
import { createPayloadFaker, mergePayloadValues } from '../../../core/helpers';

const DIVORCE_JURISDICTION = 'DIVORCE';
const DIVORCE_CASE_TYPE = 'xuiTestCaseType';
const DIVORCE_EVENT_ID = 'createCase';

type DivorceXuiTestCaseTypeFieldValues = {
  TextField: string;
  Gender: string | null;
  MultiSelectListField: string[];
  NumberField: number | null;
  EmailField: string;
  PhoneUKField: string;
  DateField: string;
  DateTimeField: string;
  AmountInGBPField: string;
  YesOrNoField: string;
  AppicantPostcodeField: string;
  TestFixedListField: string | null;
  ComplexType_1: {
    judgeLevelRadio: string;
    proposal: string;
    proposalReason: string;
    TextField: string;
  };
  ComplexType_2: {
    email: string;
    address: {
      AddressLine1: string;
      AddressLine2: string;
      AddressLine3: string;
      PostTown: string;
      County: string;
      PostCode: string;
      Country: string;
    };
  };
  ComplexType_3: {
    dateOfBirth: string;
    dateTimeUploaded: string;
    responses: Array<{
      value: string;
      id: string | null;
    }>;
    caseLink: {
      CaseReference: string;
    };
    document: CcdDocumentValue | null;
  };
  ComplexType_4: {
    amount: string;
    FixedListField: string;
    selectedCategories: string[];
  };
};

export function buildDivorceXuiTestCaseTypeCreateCasePayload(
  options: CasePayloadBuildOptions<DivorceXuiTestCaseTypeFieldValues> = {}
) {
  const payloadFaker = createPayloadFaker(options.seed ?? options.context?.seed);
  const defaultPayload: DivorceXuiTestCaseTypeFieldValues = {
    TextField: `api-case-${payloadFaker.string.alphanumeric(8)}`,
    Gender: null,
    MultiSelectListField: [],
    NumberField: null,
    EmailField: payloadFaker.internet.email({ provider: 'example.com' }),
    PhoneUKField: '07123456789',
    DateField: '2006-03-06',
    DateTimeField: '2026-03-06T10:30:15.000',
    AmountInGBPField: '100000',
    YesOrNoField: 'Yes',
    AppicantPostcodeField: 'SW1A 1AA',
    TestFixedListField: null,
    ComplexType_1: {
      judgeLevelRadio: 'No',
      proposal: 'item_1',
      proposalReason: 'Details about why this level of judge is needed.',
      TextField: 'Key information',
    },
    ComplexType_2: {
      email: payloadFaker.internet.email({ provider: 'example.com' }),
      address: {
        AddressLine1: '10 Test Street',
        AddressLine2: '',
        AddressLine3: '',
        PostTown: '',
        County: '',
        PostCode: '',
        Country: '',
      },
    },
    ComplexType_3: {
      dateOfBirth: '1990-06-15',
      dateTimeUploaded: '2026-03-06T14:45:30.000',
      responses: [{ value: 'Compliant response', id: null }],
      caseLink: {
        CaseReference: '',
      },
      document: null,
    },
    ComplexType_4: {
      amount: '50000',
      FixedListField: 'item_1',
      selectedCategories: ['item_1'],
    },
  };

  return {
    fieldValues: mergePayloadValues(defaultPayload, options.overrides),
    meta: {
      template: 'divorce.xui-test-case-type.create-case',
      jurisdiction: options.context?.jurisdiction ?? DIVORCE_JURISDICTION,
      caseType: options.context?.caseType ?? DIVORCE_CASE_TYPE,
      eventId: options.context?.eventId ?? DIVORCE_EVENT_ID,
      seed: options.seed ?? options.context?.seed,
    },
  };
}
