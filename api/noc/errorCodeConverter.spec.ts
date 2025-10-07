import { expect } from 'chai';

import 'mocha';
import { generateErrorMessageWithCode } from './errorCodeConverter';

describe('Error Code Converter', () => {
  describe('generateErrorMessageWithCode', () => {
    it('should add error code for case-id-empty message', () => {
      const error = {
        data: {
          message: 'Case ID can not be empty'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('case-id-empty');
      expect(result.data.message).to.equal('Case ID can not be empty');
    });

    it('should add error code for case-id-invalid message', () => {
      const error = {
        data: {
          message: 'Case ID has to be a valid 16-digit'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('case-id-invalid');
      expect(result.data.message).to.equal('Case ID has to be a valid 16-digit');
    });

    it('should add error code for case-id-invalid-length message', () => {
      const error = {
        data: {
          message: 'Case ID has to be 16-digits long'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('case-id-invalid-length');
      expect(result.data.message).to.equal('Case ID has to be 16-digits long');
    });

    it('should add error code for case-not-found message', () => {
      const error = {
        data: {
          message: 'Case could not be found'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('case-not-found');
      expect(result.data.message).to.equal('Case could not be found');
    });

    it('should add error code for multiple-noc-requests-on-user message', () => {
      const error = {
        data: {
          message: 'Multiple NoC Request events found for the user'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('multiple-noc-requests-on-user');
      expect(result.data.message).to.equal('Multiple NoC Request events found for the user');
    });

    it('should add error code for multiple-noc-requests-on-case message', () => {
      const error = {
        data: {
          message: 'More than one change request found on the case'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('multiple-noc-requests-on-case');
      expect(result.data.message).to.equal('More than one change request found on the case');
    });

    it('should add error code for insufficient-privileges message', () => {
      const error = {
        data: {
          message: 'Insufficient privileges for notice of change request'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('insufficient-privileges');
      expect(result.data.message).to.equal('Insufficient privileges for notice of change request');
    });

    it('should add error code for no-org-policy message with first variant', () => {
      const error = {
        data: {
          message: 'No Organisation Policy'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('no-org-policy');
      expect(result.data.message).to.equal('No Organisation Policy');
    });

    it('should add error code for no-org-policy message with second variant', () => {
      const error = {
        data: {
          message: 'No OrganisationPolicy exists on the case for the case role'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('no-org-policy');
      expect(result.data.message).to.equal('No OrganisationPolicy exists on the case for the case role');
    });

    it('should add error code for noc-event-unavailable message', () => {
      const error = {
        data: {
          message: 'No NoC events available'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('noc-event-unavailable');
      expect(result.data.message).to.equal('No NoC events available');
    });

    it('should add error code for noc-in-progress message', () => {
      const error = {
        data: {
          message: 'Ongoing NoC request in progress'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('noc-in-progress');
      expect(result.data.message).to.equal('Ongoing NoC request in progress');
    });

    it('should add error code for answers-empty message', () => {
      const error = {
        data: {
          message: 'Challenge question answers can not be empty'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('answers-empty');
      expect(result.data.message).to.equal('Challenge question answers can not be empty');
    });

    it('should add error code for answers-mismatch-questions message', () => {
      const error = {
        data: {
          message: 'The number of provided answers must match the number of questions'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('answers-mismatch-questions');
      expect(result.data.message).to.equal('The number of provided answers must match the number of questions');
    });

    it('should add error code for answers-not-matched-any-litigant message', () => {
      const error = {
        data: {
          message: 'The answers did not match those for any litigant'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('answers-not-matched-any-litigant');
      expect(result.data.message).to.equal('The answers did not match those for any litigant');
    });

    it('should add error code for answers-not-identify-litigant message', () => {
      const error = {
        data: {
          message: 'The answers did not uniquely identify a litigant'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('answers-not-identify-litigant');
      expect(result.data.message).to.equal('The answers did not uniquely identify a litigant');
    });

    it('should add error code for no-answer-provided-for-question message', () => {
      const error = {
        data: {
          message: 'No answer has been provided for question ID'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('no-answer-provided-for-question');
      expect(result.data.message).to.equal('No answer has been provided for question ID');
    });

    it('should add error code for has-represented message', () => {
      const error = {
        data: {
          message: 'they are already representing'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('has-represented');
      expect(result.data.message).to.equal('they are already representing');
    });

    it('should add error code for missing-cor-case-role-id message', () => {
      const error = {
        data: {
          message: 'Missing ChangeOrganisationRequest.CaseRoleID'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('missing-cor-case-role-id');
      expect(result.data.message).to.equal('Missing ChangeOrganisationRequest.CaseRoleID');
    });

    it('should add generic error code for unknown message', () => {
      const error = {
        data: {
          message: 'Some unknown error occurred'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('generic-error');
      expect(result.data.message).to.equal('Some unknown error occurred');
    });

    it('should return original error data if code already exists', () => {
      const error = {
        data: {
          message: 'Case ID can not be empty',
          code: 'existing-code'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('existing-code');
      expect(result.data.message).to.equal('Case ID can not be empty');
    });

    it('should handle error without data property', () => {
      const error: any = {
        message: 'Some error without data property'
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data).to.equal(error.data);
    });

    it('should handle error with null data', () => {
      const error = {
        data: null
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data).to.be.null;
    });

    it('should handle error with undefined data', () => {
      const error = {
        data: undefined
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data).to.be.undefined;
    });

    it('should handle error with data but no message', () => {
      const error = {
        data: {
          status: 500
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.status).to.equal(500);
      expect(result.data.code).to.be.undefined;
    });

    it('should handle error with empty message', () => {
      const error = {
        data: {
          message: ''
        }
      };

      const result = generateErrorMessageWithCode(error);

      // Empty string is falsy, so no code is added
      expect(result.data.code).to.be.undefined;
      expect(result.data.message).to.equal('');
    });

    it('should handle partial message matches for case-id-empty', () => {
      const error = {
        data: {
          message: 'Error: Case ID can not be empty for this operation'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('case-id-empty');
    });

    it('should handle partial message matches for answers-not-matched-any-litigant', () => {
      const error = {
        data: {
          message: 'Validation failed: The answers did not match those for any litigant in the system'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('answers-not-matched-any-litigant');
    });

    it('should preserve other error properties', () => {
      const error = {
        status: 400,
        statusText: 'Bad Request',
        data: {
          message: 'Case ID can not be empty',
          timestamp: '2023-01-01T00:00:00Z',
          path: '/api/noc/questions'
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.status).to.equal(400);
      expect(result.statusText).to.equal('Bad Request');
      expect(result.data.code).to.equal('case-id-empty');
      expect(result.data.message).to.equal('Case ID can not be empty');
      expect(result.data.timestamp).to.equal('2023-01-01T00:00:00Z');
      expect(result.data.path).to.equal('/api/noc/questions');
    });

    it('should handle complex error objects with nested properties', () => {
      const error = {
        data: {
          message: 'No Organisation Policy',
          details: {
            caseId: '1234567890123456',
            userId: 'user123'
          },
          errors: ['Policy not found', 'Invalid case role']
        }
      };

      const result = generateErrorMessageWithCode(error);

      expect(result.data.code).to.equal('no-org-policy');
      expect(result.data.message).to.equal('No Organisation Policy');
      expect(result.data.details.caseId).to.equal('1234567890123456');
      expect(result.data.details.userId).to.equal('user123');
      expect(result.data.errors).to.deep.equal(['Policy not found', 'Invalid case role']);
    });
  });
});
