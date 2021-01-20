import axios, {AxiosResponse} from 'axios';

export async function getCaseAssignments(taskUrl:string){

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'ServiceAuthToken',
      'Authorization':'Bearer some-access-token'
    }
  };

  let response: AxiosResponse;
    response = await axios.get(taskUrl, axiosConfig);
  return response;

}

export async function postAssignCasesToUsers(taskUrl:string, payload:any){

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'ServiceAuthToken',
      'Authorization':'Bearer some-access-token'
    }
  };

  let response: AxiosResponse;
  response = await axios.post(taskUrl,payload,axiosConfig);
  return response;

}

export async function getIdamUsersByEmail(taskUrl:string){

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer some-access-token'
    }
  };

  let response: AxiosResponse;
  response = await axios.get(taskUrl,axiosConfig);
  return response;

}
