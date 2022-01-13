import { BookingResponse, BookingResponseError, Bookings } from '../models';
/* disabling linting on this file as we don't want to sort the keys or add a comma at the end of the last key */
/* tslint:disable */
export const bookings: Bookings = {
  'bookings':
    [
      {
        appointmentId: '101',
        base_location_id: '231596',
        beginTime: new Date('2021-11-29T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2021-12-24T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },
      {
        appointmentId: '102',
        base_location_id: '366796',
        beginTime: new Date('2021-12-02T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2021-12-31T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },
      {
        appointmentId: '103',
        base_location_id: '366796',
        beginTime: new Date('2021-12-22T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2022-02-01T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },
      {
        appointmentId: '103',
        base_location_id: '324339',
        beginTime: new Date('2021-10-10T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2022-02-01T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },
      {
        appointmentId: '103',
        base_location_id: '366796',
        beginTime: new Date('2021-12-02T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2021-12-31T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },

      {
        appointmentId: '103',
        base_location_id: '324339',
        beginTime: new Date('2021-12-20T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2021-12-31T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },

      {
        appointmentId: '103',
        base_location_id: '324339',
        beginTime: new Date('2021-12-22T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2022-02-01T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },
    ],
};

export const bookingResponse: BookingResponse = {
  bookingResponse: {
    userId: '21334a2b-79ce-44eb-9168-2d49a744be9c',
    locationId: '366796',
    regionId: '104',
    beginTime: new Date('2021-01-01T00:00:00Z'),
    endTime: new Date('2021-12-02T00:00:00Z'),
    created: new Date('2021-04-01T00:00:00Z'),
    log: 'Booking record is successfully created'
  }
};

export const bookingResponseError: BookingResponseError = {
  errorCode: '400',
  status: 'BAD_REQUEST',
  errorMessage: 'Invalid Request',
  timeStamp: new Date('2021-01-01T00:00:00Z')
};

export const refreshRoleAssignmentsSuccess = {
  message: 'Role assignments have been refreshed successfully'
};

export const refreshRoleAssignmentsError = {
  errorCode: '400',
  status: 'BAD_REQUEST',
  errorMessage: 'User Ids list is empty',
  timeStamp: '2019-05-28 14:02:47.071'
};

export const createRoleAssignmentsError = {
  errorCode: '400',
  status: 'BAD_REQUEST',
  errorMessage: 'Role name is invalid',
  timeStamp: '2019-05-28 14:02:47.071'
}

export const createRoleAssignmentResponse = {
  "roleAssignmentResponse" : {
    "roleRequest" : {
      "id" : "0c6f56f5-4457-485e-a0de-828e6dfa1e33",
      "authenticatedUserId" : "***REMOVED***",
      "correlationId" : "003352d0-e699-48bc-b6f5-5810411e60af",
      "assignerId" : "***REMOVED***",
      "requestType" : "CREATE",
      "process" : "businessProcess1",
      "reference" : "cf07ea33-31c0-4442-b2df-e2032d21b496",
      "replaceExisting" : false,
      "status" : "APPROVED",
      "created" : "2021-01-28T18:16:49.100121Z",
      "log" : "Request has been approved"
    },
    "requestedRoles" : [ {
      "id" : "3ccabbf2-71fa-4c5d-af39-5675d25e9fcc",
      "actorIdType" : "IDAM",
      "actorId" : "cf07ea33-31c0-4442-b2df-e2032d21b496",
      "roleType" : "ORGANISATION",
      "roleName" : "judge",
      "classification" : "PUBLIC",
      "grantType" : "STANDARD",
      "roleCategory" : "JUDICIAL",
      "readOnly" : false,
      "beginTime" : "2021-01-01T00:00:00Z",
      "endTime" : "2023-01-01T00:00:00Z",
      "process" : "businessProcess1",
      "reference" : "cf07ea33-31c0-4442-b2df-e2032d21b496",
      "status" : "LIVE",
      "created" : "2021-01-28T18:16:49.100155Z",
      "log" : "Create requested with replace: false\nCreate approved : judicial_organisational_role_mapping_service_create\nApproved : validate_role_assignment_against_patterns",
      "attributes" : {
        "jurisdiction" : "divorce",
        "region" : "south-east",
        "contractType" : "SALARIED"
      },
      "notes" : [ {
        "userId" : "003352d0-e699-48bc-b6f5-5810411e60ag",
        "time" : "2020-01-01T00:00Z",
        "comment" : "Need Access to case number 1234567890123456 for a month"
      }, {
        "userId" : "52aa3810-af1f-11ea-b3de-0242ac130004",
        "time" : "2020-01-02T00:00Z",
        "comment" : "Access granted for 6 months"
      } ]
    } ]
  }
};
