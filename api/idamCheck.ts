import { getConfigValue } from './configuration';
import { SERVICES_IDAM_LOGIN_URL } from './configuration/references';
import { http } from './lib/http';

export const idamCheck = async (resolve, reject) => {
  try {
    const idamWebUrl = getConfigValue(SERVICES_IDAM_LOGIN_URL);
    const result = await http.get(`${idamWebUrl}/o/.well-known/openid-configuration`);
    if (!result) {
      console.log('idam must be up to start');
      process.exit(1);
    }
  } catch (err) {
    console.log('idam must be up to start');
    process.exit(1);
    reject(err);
  }
  resolve();
};
