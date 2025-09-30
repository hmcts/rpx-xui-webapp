// @ts-ignore

import { expect } from 'chai';
import { PactV3TestSetup } from '../settings/provider.mock';
import {getLocations} from "../../pactUtil";
import {CourtLocationDetails} from "../../pactFixtures";
import Any = jasmine.Any;
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_location', port: 8000 });

const serviceCode = 'BFA1';

describe('Locations ref data api, get all locations for service', () => {
  const RESPONSE_BODY = {
    'court_venues': [
      {
        'epimms_id': somethingLike('12345'),
        'site_name': somethingLike('siteName1'),
        'court_type_id': somethingLike('courtTypeId')
      }
    ],
    'court_type': somethingLike('CountyCourt'),
    'service_code': somethingLike(serviceCode),
    'court_type_id': somethingLike("courtTypeId")
  };

  describe('get /locations}', () => {


    before(async () => {
      const interaction = {
        states: [{description: 'Court Venues exist for the service code provided'}],
        uponReceiving: 'get list of court venues for given service code',
        withRequest: {
          method: 'GET',
          path: '/refdata/location/court-venues/services',
          query: {
            'service_code': serviceCode
          },
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: RESPONSE_BODY
        }
      };
      pactSetUp.provider.addInteraction(interaction);
    });


    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const path: string = `${mockServer.url}/refdata/location/court-venues/services?service_code=BFA1`;

        const response = await getLocations(path);
        const responseDto = <CourtLocationDetails[]> response.data;
        assertResponses(responseDto);
        });
    });
  });
});


function assertResponses(responseDto: any) {
    expect(responseDto.court_venues[0].site_name).be.equal('siteName1');
    expect(responseDto.court_venues[0].epimms_id).be.equal('12345');
    expect(responseDto.court_type).to.be.equal('CountyCourt');
    expect(responseDto.court_type_id).to.be.equal('courtTypeId');

  }
