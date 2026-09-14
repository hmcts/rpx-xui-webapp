import { faker } from '@faker-js/faker';

import type { CivilApiUser, JsonRecord } from './civilTypes';

const CIVIL_SMALL_CLAIM_AMOUNT = '1500';

export function createLipClaimWithCompanyDefendantPayload(user: CivilApiUser, userId: string): JsonRecord {
  const applicantFirstName = faker.person.firstName();
  const applicantLastName = faker.person.lastName();
  const applicantTitle = faker.person.prefix();
  const defendantCompanyName = faker.company.name();
  const claimReason = faker.lorem.words(3);
  const claimantContactPerson = faker.person.fullName();
  const timelineDescription = faker.lorem.sentence();

  return {
    event: 'CREATE_LIP_CLAIM',
    caseDataUpdate: {
      applicant1: {
        individualDateOfBirth: '1995-08-28',
        individualFirstName: applicantFirstName,
        individualLastName: applicantLastName,
        individualTitle: applicantTitle,
        partyEmail: user.email,
        partyPhone: '07446777177',
        primaryAddress: {
          AddressLine1: faker.location.buildingNumber(),
          AddressLine2: faker.location.street(),
          AddressLine3: '',
          PostCode: 'S12eu',
          PostTown: faker.location.city(),
        },
        type: 'INDIVIDUAL',
      },
      respondent1: {
        companyName: defendantCompanyName,
        partyEmail: user.email,
        partyPhone: '07800000000',
        primaryAddress: {
          AddressLine1: faker.location.buildingNumber(),
          AddressLine2: faker.location.street(),
          AddressLine3: '',
          PostCode: 'IG61JD',
          PostTown: faker.location.city(),
        },
        type: 'COMPANY',
      },
      applicant1Represented: 'No',
      totalClaimAmount: CIVIL_SMALL_CLAIM_AMOUNT,
      claimAmountBreakup: [
        {
          id: '0',
          value: {
            claimAmount: CIVIL_SMALL_CLAIM_AMOUNT,
            claimReason,
          },
        },
      ],
      detailsOfClaim: claimReason,
      claimInterest: 'No',
      claimantUserDetails: {
        email: user.email,
        id: userId,
      },
      respondent1LiPResponse: {
        respondent1DQExtraDetails: {
          whyPhoneOrVideoHearing: '',
          determinationWithoutHearingReason: '',
          considerClaimantDocumentsDetails: '',
          respondent1DQLiPExpert: {
            expertCanStillExamineDetails: '',
          },
        },
      },
      specRespondent1Represented: 'No',
      helpWithFees: {
        helpWithFee: 'No',
        helpWithFeesReferenceNumber: '',
      },
      pcqId: '4c10fec5-1278-45f3-89f0-d3d016d47f95',
      respondent1AdditionalLipPartyDetails: {
        correspondenceAddress: {},
        contactPerson: defendantCompanyName,
      },
      applicant1AdditionalLipPartyDetails: {
        correspondenceAddress: {
          AddressLine1: faker.location.buildingNumber(),
          AddressLine2: faker.location.street(),
          AddressLine3: '',
          PostCode: 'L7 2pz',
          PostTown: faker.location.city(),
        },
        contactPerson: claimantContactPerson,
      },
      timelineOfEvents: [
        {
          id: '0',
          value: {
            timelineDate: '2000-01-01',
            timelineDescription,
          },
        },
      ],
      claimFee: {
        calculatedAmountInPence: '8000',
        code: 'FEE0206',
        version: '6',
      },
    },
  };
}

export function createClaimAfterPaymentPayload(): JsonRecord {
  const currentDate = new Date().toISOString();
  return {
    event: 'CREATE_CLAIM_SPEC_AFTER_PAYMENT',
    caseDataUpdate: {
      claimIssuedPaymentDetails: {
        status: 'SUCCESS',
        reference: 'RC-1234-1234-1234-1234',
      },
      issueDate: currentDate,
      respondent1ResponseDeadline: currentDate,
    },
  };
}

export function defendantResponseCarmCompanyPayload(): JsonRecord {
  return {
    event: 'DEFENDANT_RESPONSE_CUI',
    caseDataUpdate: {
      respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
      defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY',
      respondToClaimAdmitPartLRspec: {},
      responseClaimMediationSpecRequired: 'No',
      specAoSApplicantCorrespondenceAddressRequired: 'Yes',
      totalClaimAmount: 1500,
      respondent1: {
        companyName: 'Test Company Defendant',
        partyEmail: faker.internet.email({ provider: 'example.com' }),
        partyPhone: '07800000000',
        primaryAddress: {
          AddressLine1: 'TestAddressLine1',
          AddressLine2: 'TestAddressLine2',
          AddressLine3: 'TestAddressLine3',
          PostCode: 'IG61JD',
          PostTown: 'TestCity',
        },
        type: 'COMPANY',
      },
      respondent1LiPResponse: {
        timelineComment: 'Add any comments about their timeline (optional)',
        evidenceComment: 'disagree',
        respondent1DQExtraDetails: {
          wantPhoneOrVideoHearing: 'Yes',
          whyPhoneOrVideoHearing: 'video',
          giveEvidenceYourSelf: 'Yes',
          determinationWithoutHearingRequired: 'Yes',
          determinationWithoutHearingReason: '',
          considerClaimantDocumentsDetails: '',
          respondent1DQLiPExpert: {
            caseNeedsAnExpert: 'No',
            expertCanStillExamineDetails: '',
          },
        },
        respondent1DQHearingSupportLip: {
          supportRequirementLip: 'Yes',
          requirementsLip: [
            {
              value: {
                name: 'Whit Nessie',
                requirements: ['DISABLED_ACCESS', 'HEARING_LOOPS'],
                signLanguageRequired: '',
                languageToBeInterpreted: '',
                otherSupport: '',
              },
            },
          ],
        },
        respondent1LiPContactPerson: 'contact person',
        respondent1ResponseLanguage: 'ENGLISH',
      },
      respondent1LiPResponseCarm: {
        isMediationContactNameCorrect: 'No',
        alternativeMediationContactPerson: 'new defendant cp',
        isMediationEmailCorrect: 'No',
        alternativeMediationEmail: faker.internet.email({ provider: 'example.com' }),
        isMediationPhoneCorrect: 'No',
        alternativeMediationTelephone: '07744444444',
        hasUnavailabilityNextThreeMonths: 'Yes',
        unavailableDatesForMediation: [createUnavailableDate('defendant', 30), createUnavailableDate('defendant', 40, 45)],
      },
      respondent1LiPFinancialDetails: {},
      detailsOfWhyDoesYouDisputeTheClaim: 'reasons',
      specClaimResponseTimelineList: 'MANUAL',
      specResponseTimelineOfEvents: [
        {
          value: {
            timelineDate: formatCivilDate(-100),
            timelineDescription: 'asd',
          },
        },
      ],
      specResponselistYourEvidenceList: [
        {
          id: '0',
          value: {
            evidenceType: 'PHOTO_EVIDENCE',
            photoEvidence: '',
          },
        },
      ],
      defenceRouteRequired: 'HAS_PAID_THE_AMOUNT_CLAIMED',
      respondToClaim: {
        howMuchWasPaid: 95000,
        howWasThisAmountPaid: 'OTHER',
        whenWasThisAmountPaid: '2000-01-01T00:00:00.000Z',
        howWasThisAmountPaidOther: 'card',
      },
      respondent1DQHomeDetails: {},
      respondent1PartnerAndDependent: {
        howManyChildrenByAgeGroup: {},
      },
      specDefendant1SelfEmploymentDetails: {},
      respondToClaimAdmitPartUnemployedLRspec: {},
      respondent1DQLanguage: {
        court: 'ENGLISH',
        documents: 'ENGLISH',
      },
      respondent1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: 'vulnerable',
      },
      respondent1DQRequestedCourt: {
        requestHearingAtSpecificCourt: 'Yes',
        otherPartyPreferredSite: '',
        responseCourtCode: '',
        reasonForHearingAtSpecificCourt: 'court',
        responseCourtLocations: [],
        caseLocation: {
          region: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
          baseLocation: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
        },
      },
      respondent1DQWitnesses: {
        witnessesToAppear: 'Yes',
        details: [
          {
            value: {
              name: 'Whit',
              firstName: 'Whit',
              lastName: 'Nessie',
              emailAddress: '',
              phoneNumber: '',
              reasonForWitness: 'asd',
            },
          },
        ],
      },
      respondent1DQHearingSmallClaim: {
        unavailableDatesRequired: 'Yes',
        smallClaimUnavailableDate: [createUnavailableDate('defendant', 30), createUnavailableDate('defendant', 40, 45)],
      },
      respondent1DQExperts: {},
    },
  };
}

export function claimantLipIntendsToProceedCarmPayload(): JsonRecord {
  return {
    event: 'CLAIMANT_RESPONSE_CUI',
    caseDataUpdate: {
      applicant1LiPResponse: {
        applicant1DQExtraDetails: {
          wantPhoneOrVideoHearing: 'Yes',
          whyPhoneOrVideoHearing: 'skype',
          giveEvidenceYourSelf: 'Yes',
          determinationWithoutHearingRequired: 'No',
          determinationWithoutHearingReason: 'reasons',
          considerClaimantDocumentsDetails: '',
          applicant1DQLiPExpert: {
            caseNeedsAnExpert: 'No',
            expertCanStillExamineDetails: '',
          },
        },
        applicant1DQHearingSupportLip: {
          supportRequirementLip: 'Yes',
          requirementsLip: [
            {
              value: {
                name: 'Test Inc',
                requirements: ['DISABLED_ACCESS'],
                signLanguageRequired: '',
                languageToBeInterpreted: '',
                otherSupport: '',
              },
            },
            {
              value: {
                name: 'Whit Ness',
                requirements: ['HEARING_LOOPS'],
                signLanguageRequired: '',
                languageToBeInterpreted: '',
                otherSupport: '',
              },
            },
          ],
        },
        applicant1RejectedRepaymentReason: 'reasons',
      },
      applicant1LiPResponseCarm: {
        isMediationContactNameCorrect: 'No',
        alternativeMediationContactPerson: 'new contact person',
        isMediationEmailCorrect: 'No',
        alternativeMediationEmail: faker.internet.email({ provider: 'example.com' }),
        isMediationPhoneCorrect: 'No',
        alternativeMediationTelephone: '07755555555',
        hasUnavailabilityNextThreeMonths: 'Yes',
        unavailableDatesForMediation: [createUnavailableDate('defendant', 6), createUnavailableDate('defendant', 10, 15)],
      },
      applicant1DQLanguage: {
        court: 'ENGLISH',
        documents: 'ENGLISH',
      },
      applicant1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: 'vulnerable',
      },
      applicant1DQRequestedCourt: {
        requestHearingAtSpecificCourt: 'Yes',
        otherPartyPreferredSite: '',
        responseCourtCode: '',
        reasonForHearingAtSpecificCourt: 'reasons',
        responseCourtLocations: [],
        caseLocation: {
          region: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
          baseLocation: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
        },
      },
      applicant1DQWitnesses: {
        witnessesToAppear: 'Yes',
        details: [
          {
            value: {
              name: 'Whit',
              firstName: 'Whit',
              lastName: 'Ness',
              emailAddress: '',
              phoneNumber: '',
              reasonForWitness: 'terrible things',
            },
          },
        ],
      },
      applicant1DQSmallClaimHearing: {
        unavailableDatesRequired: 'Yes',
        smallClaimUnavailableDate: [createUnavailableDate('defendant', 6), createUnavailableDate('defendant', 10, 15)],
      },
      applicant1DQExperts: {},
      applicant1DQHearingSupport: {
        supportRequirements: 'Yes',
        supportRequirementsAdditional: 'Test Inc :Disabled access;Whit Ness :Hearing loop;',
      },
      applicant1PartAdmitIntentionToSettleClaimSpec: 'No',
      applicant1FullDefenceConfirmAmountPaidSpec: 'Yes',
      applicant1SettleClaim: 'No',
    },
  };
}

function createUnavailableDate(who: string, fromDays: number, toDays?: number): JsonRecord {
  return {
    value: {
      who,
      date: formatCivilDate(fromDays),
      fromDate: formatCivilDate(fromDays),
      ...(toDays === undefined
        ? { unavailableDateType: 'SINGLE_DATE' }
        : {
            toDate: formatCivilDate(toDays),
            unavailableDateType: 'DATE_RANGE',
          }),
    },
  };
}

function formatCivilDate(days = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
