const ALL_LOCATIONS =  {
  id: '**ALL_LOCATIONS**',
  locationName: 'All locations',
  services: []
};

const OPTIONS = {
  Caseworkers: {
    ALL: {
      idamId: '**ALL_CASEWORKERS**',
      firstName: 'All',
      lastName: 'caseworkers',
      email: undefined,
      location: ALL_LOCATIONS
    },
    UNASSIGNED: {
      idamId: '**NO_CASEWORKER_ASSIGNED**',
      firstName: 'None',
      lastName: '(unassigned tasks)',
      email: undefined,
      location: ALL_LOCATIONS
    }
  },
  Locations: {
    ALL: ALL_LOCATIONS
  }
};

// TODO: Remove these after integrating with API.
const TAYLOR_HOUSE = {
  id: 'a', locationName: 'Taylor House', services: [ 'a' ]
};
const JOHN_SMITH = {
  firstName: 'John',
  lastName: 'Smith',
  idamId: '1',
  email: 'john.smith@caseworkers.gov.uk',
  location: TAYLOR_HOUSE
};

const SESSION = {
  AvailableTasks: 'availableTasksFilter',
  TaskManager: 'taskManagerFilter'
};

export const FILTER_CONSTANTS = {
  Options: OPTIONS,
  Session: SESSION,
  Defaults: {
    LOCATION: TAYLOR_HOUSE,
    CASEWORKER: JOHN_SMITH
  }
};
