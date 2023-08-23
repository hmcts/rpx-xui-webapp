import { getConfigValue } from '../../../../api/configuration';
import {
  IDAM_SECRET,
  SERVICE_S2S_PATH,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID
} from '../../../../api/configuration/references';

import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create();
const idamApi = getConfigValue(SERVICES_IDAM_API_URL);
const idamSecret = getConfigValue(IDAM_SECRET) || 'AAAAAAAAAAAAAAAA';
const baseUrl = 'http://localhost:3000';
const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID);
const s2sApi = getConfigValue(SERVICE_S2S_PATH);

export async function getAuthCode() {
  const redirectUri = `${baseUrl}/oauth2/callback`;
  const urlPost = `${idamApi}/oauth2/authorize?response_type=code&client_id=${idamClient}&redirect_uri=${redirectUri}&scope=openid profile roles manage-user create-user`;

  // let encode = base64.encode((process.env.TEST_EMAIL + ':' + process.env.TEST_PASSWORD))
  // const encode = base64.encode(('autotest_superuser@mailinator.com:Monday01'));
  const encode = Buffer.from('xui_auto_co_r2@justice.gov.uk:Welcome01').toString('base64');
  const otherParam = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encode}`
    },
    body: ''
  };

  console.log('authcode req ', urlPost);
  console.log('idamSecret ', idamSecret, ' : idamClient ', idamClient);
  const response = await axiosInstance.post(urlPost, {}, otherParam);
  const code = await response.data;
  return code.code;
}

export async function getAuthToken() {
  const codeValue = await getAuthCode();
  console.log('code value ', codeValue)
  const redirectUri = `${baseUrl}/oauth2/callback`;
  const tokenUrlPost = `${idamApi}/oauth2/token?grant_type=authorization_code&code=${codeValue}&redirect_uri=${redirectUri}`;

  const options = {
    headers: {
      Authorization: `Basic ${Buffer.from(`${idamClient}:${idamSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const response = await axiosInstance.post(tokenUrlPost, {}, options);
  console.log('response from idam; ', response)
  return response.data.access_token;
}

export async function getS2SToken(){
  let response;
  try {
    const response = await axiosInstance.post(`${s2sApi}/lease`,
      { "microservice": "xui_webapp" },
      {
        headers:{
          "accept": "*/*",
          "Content-Type": "application/json"
        }
      } );
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(`Error with s2s token generation: ${e}`);
  }
}
