import axios from 'axios';


export async function getUsers(path: string) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    }
};

return  axios.get(path,axiosConfig);
}

export async function getOrganisationDetails(path:string) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      "Authorization":  "Bearer some-access-token",
      "ServiceAuthorization": "serviceAuthToken"
    }
  };

const response =  axios.get(path,axiosConfig);
return response;

}

