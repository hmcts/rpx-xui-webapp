import {initAxios} from './http';

require('chai').should();

suiteSetup(async () => {
  await initAxios();
});
