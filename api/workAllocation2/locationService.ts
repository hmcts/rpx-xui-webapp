import {EnhancedRequest} from '../lib/models';
import {ALL_LOCATIONS} from './constants/locations';

export async function handleLocationGet(path: string, req: EnhancedRequest): Promise<any> {
  /*TODO: Implement get location - currently using given data without endpoint connection*/
  const response = {
    data: ALL_LOCATIONS,
  };
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    }, 0);
  });
}
