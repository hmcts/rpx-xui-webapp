import { expect } from 'chai';
import { TranslationsDto } from '../../pactFixtures';
import { getTranslations } from '../../pactUtil';
import { PactTestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'referenceData_location', port: 8000 });

describe('Post Translations API', () => {
  const mockRequest = {
    'phrases': ['Do you have a family?']
  };

  describe('Get Welsh translations for phrases', () => {
    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'Get list of phrases',
        uponReceiving: 'On receiving a request for those translation',
        withRequest: {
          method: 'POST',
          path: '/translation/cy',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer some-access-token',
            'ServiceAuthorization': 'serviceAuthToken'
          },
          body: mockRequest
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: getTranslationsResponse
        }
      };
      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      const path: string = `${pactSetUp.provider.mockService.baseUrl}/translation/cy`;

      const resp = getTranslations(path, mockRequest);
      resp.then((response) => {
        const responseDto: TranslationsDto = <TranslationsDto>response.data;
        assertResponse(responseDto);
      }).then(() => {
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
      });
    });
  });
});

function assertResponse(dto: TranslationsDto): void {
  // eslint-disable-next-line no-unused-expressions
  expect(dto).to.be.not.null;
  expect(dto.translations[0].translation).to.equal('Do you have a family?');
  expect(dto.translations[0].yesOrNo).to.equal(true);
  expect(dto.translations[0].yes).to.equal('gwnaf');
  expect(dto.translations[0].no).to.equal('dydw i ddim');
}

const getTranslationsResponse: TranslationsDto = {
  translations: [
    {
      translation: somethingLike('Family'),
      yesOrNo: somethingLike(true),
      yes: somethingLike('gwnaf'),
      no: somethingLike('dydw i ddim')
    }]
};
