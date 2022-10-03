import { authenticateAndGetcookies } from './getCookie';
import {generateAPIRequest} from "./generateAPI";
import {generatePOSTAPIRequest} from "./generatePOSTAPIRequest";

var hearingID ;
const fetch = require('node-fetch');
const mainURL = process.env.TEST_URL || 'http://localhost:3000';

export async function generateApiHearingIdValue() {

  try {
    generateAPIRequest ('GET', '/api/hearings/getHearings?caseId=1656073414018376')
    .then(response => {
     response.status.should.be.eql(200);
     hearingID = response.data.caseHearings[0].hearingID;
     console.log(hearingID);
   });


    return hearingID;
  // const options = {
  //   headers: {
  //   Cookie: `${cookie}`,
  //      'Content-Type': 'application/json'
  //     },
  //     json: true,
  //     resolveWithFullResponse: true,
  //     method,
  //     body: JSON.stringify(payload)
  //   };
  // const url = `${mainURL}${subURL}`;
  //
  // console.log('url: ', url);
  // console.log('method: ', method);
  // console.log('options: ', options);
  //  // console.log('OPTIONS: ', method, mainURL + subURL, options);
  // const response = await fetch(url, options);
  // const data = await response.json();
  // const headers = response.headers;
  // return {
  //     headers,
  //     status: response.status,
  //     statusText: response.statusText,
  //     data
  //   };
  //
  } catch (error) {
    console.log(error);
  }

 }

