import { expect, test } from '@playwright/test';

import { __test__ as employmentJourneysTest } from '../../E2E/utils/test-setup/journeys/employmentJourneys.js';

const readyCompanyNameField = {
  respondentCompanyNameVisible: true,
  respondentCompanyNameEnabled: true,
};

const unavailableAcasQuestion = {
  respondentAcasQuestionVisible: false,
  respondentAcasQuestionEnabled: false,
};

test.describe('employment journey respondent details contract', () => {
  test('selects organisation when the radio is visible and enabled', () => {
    expect(
      employmentJourneysTest.resolveRespondentDetailsAction({
        respondentOrganisationChecked: false,
        respondentOrganisationVisible: true,
        respondentOrganisationEnabled: true,
        respondentCompanyNameVisible: false,
        respondentCompanyNameEnabled: false,
        ...unavailableAcasQuestion,
      })
    ).toBe('select-organisation');
  });

  test('uses current page state when organisation is already selected and company field is ready', () => {
    expect(
      employmentJourneysTest.resolveRespondentDetailsAction({
        respondentOrganisationChecked: true,
        respondentOrganisationVisible: false,
        respondentOrganisationEnabled: false,
        ...readyCompanyNameField,
        ...unavailableAcasQuestion,
      })
    ).toBe('use-company-page-state');
  });

  test('uses current page state when hidden radio has already exposed a ready company field', () => {
    expect(
      employmentJourneysTest.resolveRespondentDetailsAction({
        respondentOrganisationChecked: false,
        respondentOrganisationVisible: false,
        respondentOrganisationEnabled: false,
        ...readyCompanyNameField,
        ...unavailableAcasQuestion,
      })
    ).toBe('use-company-page-state');
  });

  test('uses name-only page state when respondent details controls are ready without organisation controls', () => {
    expect(
      employmentJourneysTest.resolveRespondentDetailsAction({
        respondentOrganisationChecked: false,
        respondentOrganisationVisible: false,
        respondentOrganisationEnabled: false,
        respondentCompanyNameVisible: false,
        respondentCompanyNameEnabled: false,
        respondentAcasQuestionVisible: true,
        respondentAcasQuestionEnabled: true,
      })
    ).toBe('use-name-only-page-state');
  });

  test('rejects selected organisation when the company field is not ready', () => {
    expect(() =>
      employmentJourneysTest.resolveRespondentDetailsAction({
        respondentOrganisationChecked: true,
        respondentOrganisationVisible: false,
        respondentOrganisationEnabled: false,
        respondentCompanyNameVisible: false,
        respondentCompanyNameEnabled: false,
        respondentAcasQuestionVisible: true,
        respondentAcasQuestionEnabled: true,
      })
    ).toThrow('respondent organisation is selected but company name field is not ready');
  });

  test('rejects page state where neither organisation nor company field can be used', () => {
    expect(() =>
      employmentJourneysTest.resolveRespondentDetailsAction({
        respondentOrganisationChecked: false,
        respondentOrganisationVisible: false,
        respondentOrganisationEnabled: false,
        respondentCompanyNameVisible: true,
        respondentCompanyNameEnabled: false,
        ...unavailableAcasQuestion,
      })
    ).toThrow('respondent details page shape is invalid');
  });
});
