import { authenticateAndGetcookies } from './getCookie';

const fetch = require('node-fetch');
const mainURL = process.env.TEST_URL || 'http://localhost:3000';

export async function generateDeleteRequest(method, subURL, payload) {

  try {
  const cookie = await authenticateAndGetcookies(mainURL);

  const options = {
    headers: {
    Cookie: `${cookie}`,
       'Content-Type': 'application/json'
      },
      json: true,
      resolveWithFullResponse: true,
      method,
      body: JSON.stringify(payload)
    };
  const url = `${mainURL}${subURL}`;

  console.log('url: ', url);
  console.log('method: ', method);
  console.log('options: ', options);
   // console.log('OPTIONS: ', method, mainURL + subURL, options);
  const response = await fetch(url, options);
  const data = await response.json();
  const headers = response.headers;
  return {
      headers,
      status: response.status,
      statusText: response.statusText,
      data
    };

  } catch (error) {
    console.log(error);
  }

 }

