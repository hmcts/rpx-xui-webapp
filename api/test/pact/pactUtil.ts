import axios, {AxiosResponse} from 'axios'

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

export async function getCaseAssignments(taskUrl: string) {

  const axiosConfig = {
    headers: {
      'Authorization': 'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'ServiceAuthToken',
    },
  }

  let response: AxiosResponse
  response = await axios.get(taskUrl, axiosConfig)
  return response

}

export async function postAssignCasesToUsers(taskUrl: string, payload: any) {

  const axiosConfig = {
    headers: {
      'Authorization': 'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'ServiceAuthToken',
    },
  }

  let response: AxiosResponse
  response = await axios.post(taskUrl, payload, axiosConfig)
  return response

}

export async function getIdamUsersByEmail(taskUrl: string) {

  const axiosConfig = {
    headers: {
      'Authorization': 'Bearer some-access-token',
      'Content-Type': 'application/json',
    },
  }

  let response: AxiosResponse
  response = await axios.get(taskUrl, axiosConfig)
  return response

}

export async function getTaskById(taskUrl: string) {

  const axiosConfig = {
    headers: {
      'Authorization': 'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'some service authorisation',
    },
  }

  let response: AxiosResponse
  response = await axios.get(taskUrl, axiosConfig)
  return response
}

export async function searchTasks(taskUrl: string, payload: any) {
  const axiosConfig = {
    headers: {
      'Authorization': 'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'some service authorisation',
    },
  }

  let response: AxiosResponse
  response = await axios.post(taskUrl, payload, axiosConfig)
  return response
}

export async function markTaskAs(taskUrl: string, taskActionState: string) {

  const axiosConfig = {
    headers: {
      'Authorization': 'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'some service authorisation',
    },
  }

  let response: AxiosResponse
  response = await axios.post(taskUrl, null, axiosConfig)
  return response

}

export async function assignTaskToUser(taskUrl: string, payLoad: any) {
  const axiosConfig = {
    headers: {
      'Authorization': 'Bearer some-access-token',
      'Content-Type': 'application/json',
      'ServiceAuthorization': 'some service authorisation',
    },
  }

  let response: AxiosResponse
  response = await axios.post(taskUrl, payLoad, axiosConfig)
  return response
}
