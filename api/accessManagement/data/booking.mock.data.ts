import { BookingResponse, BookingResponseError, Bookings } from '../models';
/* disabling linting on this file as we don't want to sort the keys or add a comma at the end of the last key */
export const bookings: Bookings = {
  'bookings':
    [
      {
        appointmentId: '1011',
        base_location_id: '765324',
        beginTime: new Date('2022-02-29T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2022-01-23T06:37:58Z'),
        endTime: new Date('2022-12-24T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },
      {
        appointmentId: '102',
        base_location_id: '231596',
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
        base_location_id: '231596',
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
        base_location_id: '512401',
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
        base_location_id: '512401',
        beginTime: new Date('2022-02-24T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2022-02-23T06:37:58Z'),
        endTime: new Date('2022-12-31T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      },
      {
        appointmentId: '103',
        base_location_id: '512401',
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
        base_location_id: '512401',
        beginTime: new Date('2021-12-22T00:00:00Z'),
        contract_type_id: '102',
        created: new Date('2021-02-23T06:37:58Z'),
        endTime: new Date('2022-02-01T00:00:00Z'),
        region_id: '104',
        roleId: 'caseworker',
        userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
      }
    ]
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
