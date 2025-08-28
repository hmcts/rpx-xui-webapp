
const client = require('./index');
const reportLogger = require('../../codeceptCommon/reportLogger');

// Turn undefined / null into an empty object so body-parser never sees “null”
function safeBody(payload) {
  return payload == null ? {} : payload;
}

class ServiceMock {
  async getAuthToken() {
    const authCookie = await browser.driver.manage().getCookie('__auth__');
    return authCookie.value;
  }

  async updateMockServer(apiMethod, response) {
    const authToken = await this.getAuthToken();

    // if caller passed nothing, replace with a 500 error
    if (!response) response = { status: 500, data: { error: 'No mock response supplied' } };

    // make sure data is safe for JSON
    const sanitized = {
      status: response.status ?? 200,
      data: safeBody(response.data)
    };
    return client.setUserApiData(authToken, apiMethod, sanitized);
  }

  async getRequestBodyForApiMethod(apiMethod) {
    const authToken = await this.getAuthToken();
    return await client.getRequestBody(authToken, apiMethod);
  }

  async updateCaseData(data, status) {
    const res = await this.updateMockServer('OnCaseDetails', { status: status ? status : 200, data: data });
    reportLogger.AddMessage(`Case data updated to mock, Status code ${res.status}`);
  }

  async updateSearchForCompletableTasks(data, status) {
    await this.updateMockServer('OnSearchForCompletableTasks', { status: status ? status : 200, data: data });
  }

  async setBookings(data, status) {
    await this.updateMockServer('OnBookings', { status: status ? status : 200, data: data });
  }

  async setlocations(data, status) {
    await this.updateMockServer('onServiceLocations', { status: status ? status : 200, data: data });
  }

  async setServices(data, status) {
    await this.updateMockServer('onGetOrgServices', { status: status ? status : 200, data: data });
  }

  async setCaseHearings(data, status) {
    await this.updateMockServer('OnCaseHearings', { status: status ? status : 200, data: data });
  }

  async setOnGetHearing(data, status) {
    await this.updateMockServer('OnGetHearing', { status: status ? status : 200, data: data });
  }

  async setHearingServiceHearingValues(data, status) {
    await this.updateMockServer('OnServiceHearingValues', { status: status ? status : 200, data: data });
  }

  async addRoleAssignments(data) {
    await this.updateMockServer('AddMockRoleAssignments', { status: 200, data: data });
  }
}

module.exports = new ServiceMock();
