import axios from 'axios'

export async function getUsers(path: string) {
  const axiosConfig = {
    headers: {
      'Authorization':  'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'serviceAuthToken',
    },
  }
  return  axios.get(path, axiosConfig)
}

export async function getOrganisationDetails(path: string) {
  const axiosConfig = {
    headers: {
      'Authorization':  'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'serviceAuthToken',
    },
  }
  const response =  axios.get(path, axiosConfig)
  return response
}
