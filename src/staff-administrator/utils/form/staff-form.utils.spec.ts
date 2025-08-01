import {
  setLocationErrorMessages
} from './staff-form.utils';

describe('StaffFormUtils', () => {
  it('set location error messages', () => {
    let mockWrongLocations = ['Manchester', 'Medway'];
    expect(setLocationErrorMessages(mockWrongLocations)).toEqual('There is a problem. Locations Manchester, Medway are not valid for the services selected');
    mockWrongLocations = ['Manchester'];
    expect(setLocationErrorMessages(mockWrongLocations)).toEqual('There is a problem. Location Manchester is not valid for the services selected');
  });
});
